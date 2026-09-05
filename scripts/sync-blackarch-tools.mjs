// Generates src/content/tools/*.md entries for tools that ship on
// BlackArch but not on Kali, from BlackArch's own official tool table
// (https://blackarch.org/tools.html — a single page listing every
// package in the BlackArch repository with name/description/category/
// homepage). Run via `npm run sync-tools:blackarch`.
//
// Kali's sync (scripts/sync-kali-tools.mjs) is treated as authoritative
// for any tool it already covers — this script never creates or
// overwrites a file for a slug Kali already owns (tracked via
// scripts/manifests/kali.json), it only fills in the gap of
// BlackArch-exclusive tools. Both scripts track their own "owned"
// slugs in separate manifest files so re-running either one only ever
// deletes files it previously created itself.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import * as cheerio from 'cheerio';
import { readManifest, writeManifest, pruneStale, mapWithConcurrency, isUrlReachable } from './sync-utils.mjs';

const TOOLS_PAGE = 'https://blackarch.org/tools.html';
const CONTENT_DIR = join('src', 'content', 'tools');
const KALI_MANIFEST_PATH = join('scripts', 'manifests', 'kali.json');
const MANIFEST_PATH = join('scripts', 'manifests', 'blackarch.json');
const HOMEPAGE_CHECK_CONCURRENCY = 10;
const REQUEST_TIMEOUT_MS = 30_000;
const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) SecArsenal-sync-bot (+https://github.com/brando5393/secarsenal)',
};

function kebab(label) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function textOf($el) {
  return $el.text().replace(/\s+/g, ' ').trim();
}

async function fetchToolRows() {
  const res = await fetch(TOOLS_PAGE, { headers: HEADERS, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  if (!res.ok) throw new Error(`${res.status} fetching ${TOOLS_PAGE}`);
  const html = await res.text();
  const $ = cheerio.load(html);

  const rows = [];
  $('#tbl-minimalist tbody tr, #tbl-minimalist tr').each((_, el) => {
    const $row = $(el);
    if ($row.attr('id') === 'idx-tool') return; // header row

    const name = textOf($row.find('.tbl-name'));
    if (!name) return;

    const description = textOf($row.find('.tbl-description'));
    const categoryLink = $row.find('.tbl-categorie a').first();
    const categoryRaw = (categoryLink.attr('title') || textOf(categoryLink)).trim();
    const category = categoryRaw ? kebab(categoryRaw.replace(/^blackarch-/, '')) : 'uncategorized';
    // A handful of rows use a literal href="none" placeholder instead
    // of omitting the link when no homepage is known.
    const homepageRaw = $row.find('.tbl-homepage a').first().attr('href');
    const homepage = homepageRaw && /^https?:\/\//i.test(homepageRaw) ? homepageRaw : undefined;
    const categoryPage = categoryLink.attr('href');

    rows.push({ name, description, category, homepage, categoryPage });
  });

  return rows;
}

function toFrontmatterYaml(tool) {
  const lines = [
    `name: ${JSON.stringify(tool.name)}`,
    `tagline: ${JSON.stringify(tool.tagline)}`,
    `categories: ${JSON.stringify([tool.category])}`,
    `platforms: ${JSON.stringify(['Linux'])}`,
    `lastVerified: ${new Date().toISOString().slice(0, 10)}`,
    `docsUrl: ${JSON.stringify(tool.docsUrl)}`,
  ];
  if (tool.downloadUrl) lines.push(`downloadUrl: ${JSON.stringify(tool.downloadUrl)}`);
  lines.push(`commonlyOn: ${JSON.stringify(['BlackArch'])}`);
  const seeAlso = tool.downloadUrl
    ? 'the official BlackArch tool listing and upstream homepage linked above'
    : 'the official BlackArch tool listing linked above';
  lines.push(
    `gettingStarted: ${JSON.stringify(`Install on BlackArch with \`pacman -S ${tool.name}\` (or add the BlackArch repository to an existing Arch Linux install). See ${seeAlso} for details.`)}`
  );
  return lines.join('\n');
}

function toMarkdown(tool) {
  const body = (tool.description || `${tool.name} is a tool included in the BlackArch repository.`).replace(
    /^---$/gm,
    '\\-\\-\\-'
  );
  return `---\n${toFrontmatterYaml(tool)}\n---\n\n${body}\n\nOnly use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).\n`;
}

async function main() {
  console.log('Fetching BlackArch tool list...');
  const rows = await fetchToolRows();
  console.log(`Found ${rows.length} rows on the BlackArch tools page.`);

  const kaliSlugs = new Set(readManifest(KALI_MANIFEST_PATH));
  mkdirSync(CONTENT_DIR, { recursive: true });
  const oldSlugs = readManifest(MANIFEST_PATH);

  const seenSlugs = new Set();
  let skippedKaliOwned = 0;
  let skippedDuplicate = 0;
  const candidates = [];

  for (const row of rows) {
    const slug = kebab(row.name);
    if (!slug) continue;

    if (kaliSlugs.has(slug)) {
      // Kali already documents this tool with a richer per-tool page —
      // treat that as authoritative and don't shadow it.
      skippedKaliOwned++;
      continue;
    }
    if (seenSlugs.has(slug)) {
      skippedDuplicate++;
      continue;
    }
    seenSlugs.add(slug);
    candidates.push({ slug, row });
  }

  // BlackArch's own listing has a non-trivial amount of link rot
  // (dead/moved project homepages). Rather than publish those dead
  // links, verify each one and simply omit downloadUrl when it
  // doesn't resolve — the tool's docsUrl (BlackArch's own category
  // page) still works either way.
  console.log(`Verifying ${candidates.length} homepage links (this takes a while)...`);
  let checked = 0;
  let deadHomepages = 0;
  await mapWithConcurrency(candidates, HOMEPAGE_CHECK_CONCURRENCY, async (candidate) => {
    if (candidate.row.homepage) {
      const ok = await isUrlReachable(candidate.row.homepage);
      if (!ok) {
        candidate.row.homepage = undefined;
        deadHomepages++;
      }
    }
    checked++;
    if (checked % 250 === 0 || checked === candidates.length) {
      console.log(`  ${checked}/${candidates.length} homepage links checked (${deadHomepages} dead so far)`);
    }
  });

  const written = [];
  for (const { slug, row } of candidates) {
    const tool = {
      name: row.name,
      tagline: row.description ? row.description.slice(0, 120) : row.name,
      description: row.description,
      category: row.category,
      docsUrl: row.categoryPage ? new URL(row.categoryPage, TOOLS_PAGE).toString() : TOOLS_PAGE,
      downloadUrl: row.homepage,
    };

    writeFileSync(join(CONTENT_DIR, `${slug}.md`), toMarkdown(tool), 'utf8');
    written.push(slug);
  }

  // Only remove files this script previously created and that are now
  // either gone from BlackArch's list or have been picked up by Kali's
  // sync in the meantime (Kali takes precedence) — never touches files
  // owned by another source.
  const stillBlackArchOnly = written;
  const removed = pruneStale(CONTENT_DIR, oldSlugs, stillBlackArchOnly);
  writeManifest(MANIFEST_PATH, stillBlackArchOnly);

  console.log(
    `\nWrote ${written.length} BlackArch-exclusive tool entries to ${CONTENT_DIR}` +
      ` (skipped ${skippedKaliOwned} already covered by Kali, ${skippedDuplicate} duplicate names, ` +
      `omitted ${deadHomepages} dead homepage link${deadHomepages === 1 ? '' : 's'}` +
      `${removed ? `, removed ${removed} stale entr${removed === 1 ? 'y' : 'ies'}` : ''}).`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
