// Generates src/content/tools/*.md entries for tools that ship in
// ArchStrike's own package repository but aren't already covered by
// Kali/BlackArch/REMnux/Tails/Security Onion, from ArchStrike's own
// official package table (https://archstrike.org/packages, paginated,
// ~750 entries) plus each package's PKGBUILD on GitHub for its real
// upstream homepage (`url=`) and category (`groups=`). Run via
// `npm run sync-tools:archstrike`.
//
// Checked before building this: unlike Pentoo's overlay or
// CommandoVM's install profile (both rejected as sync sources — see
// project docs), every row on archstrike.org/packages is tagged with
// "archstrike" as its Repository column, meaning this table is
// ArchStrike's own curated security-tool repo, not mixed with generic
// Arch Linux packages. archstrike.org's robots.txt has no Disallow
// rules.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import * as cheerio from 'cheerio';
import { readManifest, writeManifest, pruneStale, mapWithConcurrency, isUrlReachable, ensureAutoSyncedTag } from './sync-utils.mjs';

const PACKAGES_BASE = 'https://archstrike.org/packages';
const PKGBUILD_BASE = 'https://raw.githubusercontent.com/ArchStrike/ArchStrike/master/archstrike';
const CONTENT_DIR = join('src', 'content', 'tools');
const CLAIMED_MANIFEST_PATHS = ['kali', 'blackarch', 'remnux', 'tails', 'security-onion'].map((n) =>
  join('scripts', 'manifests', `${n}.json`)
);
const MANIFEST_PATH = join('scripts', 'manifests', 'archstrike.json');
const PAGE_COUNT = 15;
const FETCH_CONCURRENCY = 10;
const REQUEST_TIMEOUT_MS = 20_000;
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

async function fetchPage(pageNum) {
  const url = pageNum === 1 ? PACKAGES_BASE : `${PACKAGES_BASE}/page/${pageNum}`;
  const res = await fetch(url, { headers: HEADERS, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  if (!res.ok) throw new Error(`${res.status} fetching ${url}`);
  const $ = cheerio.load(await res.text());

  const rows = [];
  $('table.packages-table tbody tr').each((_, el) => {
    const $row = $(el);
    const name = textOf($row.find('td.pcks-col a'));
    const description = textOf($row.find('td.desc-col'));
    if (!name) return;
    rows.push({ name, description });
  });
  return rows;
}

async function fetchPkgbuildDetails(pkgname) {
  const url = `${PKGBUILD_BASE}/${encodeURIComponent(pkgname)}/PKGBUILD`;
  const res = await fetch(url, { headers: HEADERS, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  if (!res.ok) return { homepage: undefined, category: 'uncategorized' };
  const text = await res.text();

  const urlMatch = text.match(/^\s*url\s*=\s*['"]([^'"]+)['"]/m);
  const homepage = urlMatch && /^https?:\/\//i.test(urlMatch[1]) ? urlMatch[1] : undefined;

  const groupsMatch = text.match(/^\s*groups\s*=\s*\(([^)]*)\)/m);
  let category = 'uncategorized';
  if (groupsMatch) {
    const groups = [...groupsMatch[1].matchAll(/['"]([^'"]+)['"]/g)].map((m) => m[1]);
    const specific = groups.find((g) => g !== 'archstrike');
    if (specific) category = kebab(specific.replace(/^archstrike-/, ''));
  }

  return { homepage, category };
}

function toFrontmatterYaml(tool) {
  const lines = [
    `name: ${JSON.stringify(tool.name)}`,
    `tagline: ${JSON.stringify((tool.description || tool.name).slice(0, 150))}`,
    `categories: ${JSON.stringify([tool.category])}`,
    `platforms: ${JSON.stringify(['Linux'])}`,
    `lastVerified: ${new Date().toISOString().slice(0, 10)}`,
    `docsUrl: ${JSON.stringify(tool.docsUrl)}`,
  ];
  if (tool.homepage) lines.push(`downloadUrl: ${JSON.stringify(tool.homepage)}`);
  lines.push(`commonlyOn: ${JSON.stringify(['ArchStrike'])}`);
  const seeAlso = tool.homepage
    ? "the official ArchStrike package listing and upstream homepage linked above"
    : "the official ArchStrike package listing linked above";
  lines.push(
    `gettingStarted: ${JSON.stringify(`Install by adding the ArchStrike repository to an existing Arch Linux install, then \`pacman -S ${tool.name}\`. See ${seeAlso} for details.`)}`
  );
  return lines.join('\n');
}

function toMarkdown(tool) {
  const body = (tool.description || `${tool.name} is a tool included in the ArchStrike repository.`).replace(
    /^---$/gm,
    '\\-\\-\\-'
  );
  return `---\n${toFrontmatterYaml(tool)}\n---\n\n${body}\n\nOnly use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).\n`;
}

async function main() {
  console.log(`Fetching ${PAGE_COUNT} pages of ArchStrike's package table...`);
  const pages = await mapWithConcurrency(
    Array.from({ length: PAGE_COUNT }, (_, i) => i + 1),
    5,
    fetchPage
  );
  const rows = pages.flat();
  console.log(`Found ${rows.length} packages.`);

  const claimedSlugs = new Set(CLAIMED_MANIFEST_PATHS.flatMap((p) => readManifest(p)));
  mkdirSync(CONTENT_DIR, { recursive: true });
  const oldSlugs = readManifest(MANIFEST_PATH);

  const seenSlugs = new Set();
  let skippedClaimed = 0;
  let skippedDuplicate = 0;
  const candidates = [];
  for (const row of rows) {
    const slug = kebab(row.name);
    if (!slug) continue;
    // ArchStrike's own distro infrastructure/branding packages (installer,
    // keyring, mirrorlist, desktop configs, wallpapers), not third-party
    // security tools — same repo, but not something to catalog as a tool.
    if (row.name.startsWith('archstrike-')) continue;
    if (claimedSlugs.has(slug)) {
      skippedClaimed++;
      continue;
    }
    if (seenSlugs.has(slug)) {
      skippedDuplicate++;
      continue;
    }
    seenSlugs.add(slug);
    candidates.push({ slug, row });
  }

  console.log(`Fetching PKGBUILD details for ${candidates.length} packages (this takes a while)...`);
  let checked = 0;
  await mapWithConcurrency(candidates, FETCH_CONCURRENCY, async (candidate) => {
    const details = await fetchPkgbuildDetails(candidate.row.name);
    candidate.homepage = details.homepage;
    candidate.category = details.category;
    checked++;
    if (checked % 250 === 0 || checked === candidates.length) {
      console.log(`  ${checked}/${candidates.length} PKGBUILDs fetched`);
    }
  });

  console.log('Verifying homepage links...');
  let deadHomepages = 0;
  await mapWithConcurrency(candidates, FETCH_CONCURRENCY, async (candidate) => {
    if (candidate.homepage) {
      const ok = await isUrlReachable(candidate.homepage);
      if (!ok) {
        candidate.homepage = undefined;
        deadHomepages++;
      }
    }
  });

  const written = [];
  for (const { slug, row, homepage, category } of candidates) {
    const tool = {
      name: row.name,
      description: row.description,
      category: category ?? 'uncategorized',
      docsUrl: `${PACKAGES_BASE}/${row.name}`,
      homepage,
    };
    writeFileSync(join(CONTENT_DIR, `${slug}.md`), toMarkdown(tool), 'utf8');
    written.push(slug);
  }

  const removed = pruneStale(CONTENT_DIR, oldSlugs, written);
  writeManifest(MANIFEST_PATH, written);
  ensureAutoSyncedTag(join('src', 'content', 'os', 'archstrike.md'));

  console.log(
    `\nWrote ${written.length} ArchStrike-exclusive tool entries to ${CONTENT_DIR}` +
      ` (skipped ${skippedClaimed} already covered, ${skippedDuplicate} duplicate names, ` +
      `omitted ${deadHomepages} dead homepage link${deadHomepages === 1 ? '' : 's'}` +
      `${removed ? `, removed ${removed} stale entr${removed === 1 ? 'y' : 'ies'}` : ''}).`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
