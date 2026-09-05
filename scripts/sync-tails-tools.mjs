// Generates src/content/tools/*.md entries for software documented on
// Tails' own official "Features and included software" page
// (https://tails.net/doc/about/features/index.en.html) that isn't
// already covered by Kali, BlackArch, or REMnux's syncs. Tails ships a
// small, fixed set of applications (it's a lean, focused OS, not a
// tool-catalog distro like Kali/BlackArch), so this is a modest
// addition — but a genuine official source. Run via
// `npm run sync-tools:tails`.
//
// tails.net's robots.txt sets `Crawl-delay: 20`; this script only ever
// fetches this one page per run, so that's trivially respected.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import * as cheerio from 'cheerio';
import { readManifest, writeManifest, pruneStale, mapWithConcurrency, isUrlReachable } from './sync-utils.mjs';

const PAGE_URL = 'https://tails.net/doc/about/features/index.en.html';
const CONTENT_DIR = join('src', 'content', 'tools');
const CLAIMED_MANIFEST_PATHS = ['kali', 'blackarch', 'remnux'].map((n) => join('scripts', 'manifests', `${n}.json`));
const MANIFEST_PATH = join('scripts', 'manifests', 'tails.json');
const REQUEST_TIMEOUT_MS = 20_000;
const HOMEPAGE_CHECK_CONCURRENCY = 10;
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
  return $el.text().replace(/\s+/g, ' ').replace(/\(More\.\.\.\)/g, '').trim();
}

async function fetchTools() {
  const res = await fetch(PAGE_URL, { headers: HEADERS, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  if (!res.ok) throw new Error(`${res.status} fetching ${PAGE_URL}`);
  const $ = cheerio.load(await res.text());

  const h1 = $('h1')
    .filter((_, el) => $(el).text().trim() === 'Included software')
    .first();
  if (h1.length === 0) throw new Error('Could not find the "Included software" section — page structure may have changed.');

  const tools = [];
  let category = 'general';
  let el = h1.next();
  while (el.length && el.get(0).tagName !== 'h1') {
    if (el.get(0).tagName === 'h2') {
      category = kebab(textOf(el));
    } else if (el.get(0).tagName === 'ul') {
      el.children('li').each((_, li) => {
        const $li = $(li);
        const $link = $li.children('a').first().length ? $li.children('a').first() : $li.find('p').first().find('a').first();
        const name = textOf($link);
        const homepage = $link.attr('href');
        if (!name || !homepage || !/^https?:\/\//.test(homepage)) return;

        const fullText = textOf($li.clone().find('ul').remove().end());
        const description = fullText.startsWith(name) ? fullText.slice(name.length).replace(/^[,:\s]+/, '').trim() : fullText;

        tools.push({ name, description, website: homepage, category, docsUrl: PAGE_URL });
      });
    }
    el = el.next();
  }
  return tools;
}

function toFrontmatterYaml(tool) {
  const lines = [
    `name: ${JSON.stringify(tool.name)}`,
    `tagline: ${JSON.stringify((tool.description || tool.name).slice(0, 120))}`,
    `categories: ${JSON.stringify([tool.category])}`,
    `platforms: ${JSON.stringify(['Linux'])}`,
    `lastVerified: ${new Date().toISOString().slice(0, 10)}`,
    `docsUrl: ${JSON.stringify(tool.docsUrl)}`,
  ];
  if (tool.website) lines.push(`downloadUrl: ${JSON.stringify(tool.website)}`);
  lines.push(`commonlyOn: ${JSON.stringify(['Tails'])}`);
  const seeAlso = tool.website
    ? "Tails' official included-software page and upstream website linked above"
    : "Tails' official included-software page linked above";
  lines.push(`gettingStarted: ${JSON.stringify(`Preinstalled on Tails. See ${seeAlso} for details.`)}`);
  return lines.join('\n');
}

function toMarkdown(tool) {
  const body = (tool.description || `${tool.name} is included by default on Tails.`).replace(/^---$/gm, '\\-\\-\\-');
  return `---\n${toFrontmatterYaml(tool)}\n---\n\n${body}\n\nOnly use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).\n`;
}

async function main() {
  console.log('Fetching Tails included-software page...');
  const allTools = await fetchTools();
  console.log(`Parsed ${allTools.length} entries.`);

  const claimedSlugs = new Set(CLAIMED_MANIFEST_PATHS.flatMap((p) => readManifest(p)));
  mkdirSync(CONTENT_DIR, { recursive: true });
  const oldSlugs = readManifest(MANIFEST_PATH);

  const seenSlugs = new Set();
  let skippedClaimed = 0;
  let skippedDuplicate = 0;
  const candidates = [];

  for (const tool of allTools) {
    const slug = kebab(tool.name);
    if (!slug) continue;
    if (claimedSlugs.has(slug)) {
      skippedClaimed++;
      continue;
    }
    if (seenSlugs.has(slug)) {
      skippedDuplicate++;
      continue;
    }
    seenSlugs.add(slug);
    candidates.push({ slug, tool });
  }

  console.log(`Verifying ${candidates.length} website links...`);
  let deadWebsites = 0;
  await mapWithConcurrency(candidates, HOMEPAGE_CHECK_CONCURRENCY, async (candidate) => {
    if (candidate.tool.website) {
      const ok = await isUrlReachable(candidate.tool.website);
      if (!ok) {
        candidate.tool.website = undefined;
        deadWebsites++;
      }
    }
  });

  const written = [];
  for (const { slug, tool } of candidates) {
    writeFileSync(join(CONTENT_DIR, `${slug}.md`), toMarkdown(tool), 'utf8');
    written.push(slug);
  }

  const removed = pruneStale(CONTENT_DIR, oldSlugs, written);
  writeManifest(MANIFEST_PATH, written);

  console.log(
    `\nWrote ${written.length} Tails-exclusive tool entries to ${CONTENT_DIR}` +
      ` (skipped ${skippedClaimed} already covered, ${skippedDuplicate} duplicate names, ` +
      `omitted ${deadWebsites} dead website link${deadWebsites === 1 ? '' : 's'}` +
      `${removed ? `, removed ${removed} stale entr${removed === 1 ? 'y' : 'ies'}` : ''}).`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
