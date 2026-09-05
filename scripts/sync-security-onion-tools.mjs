// Generates src/content/tools/*.md entries for the components listed on
// Security Onion's own official "Tools" documentation page
// (https://docs.securityonion.net/en/2.4/tools.html) that aren't
// already covered by Kali/BlackArch/REMnux/Tails. Security Onion ships
// a small, fixed set of components (it's a network-security-monitoring
// platform, not a tool-catalog distro like Kali/BlackArch), so this is
// a modest addition — but a genuine official, structured source: the
// index page links to one doc page per tool, and each of those pages
// has a consistent "From <homepage>:" + description blockquote. Run
// via `npm run sync-tools:security-onion`.
//
// docs.securityonion.net has no robots.txt (404s to the homepage), and
// this only ever fetches the index page plus ~15 per-tool sub-pages, so
// there's no meaningful crawl-load concern.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import * as cheerio from 'cheerio';
import { readManifest, writeManifest, pruneStale, mapWithConcurrency, isUrlReachable, ensureAutoSyncedTag } from './sync-utils.mjs';

const INDEX_URL = 'https://docs.securityonion.net/en/2.4/tools.html';
const BASE_URL = 'https://docs.securityonion.net/en/2.4/';
const CONTENT_DIR = join('src', 'content', 'tools');
const CLAIMED_MANIFEST_PATHS = ['kali', 'blackarch', 'remnux', 'tails'].map((n) => join('scripts', 'manifests', `${n}.json`));
const MANIFEST_PATH = join('scripts', 'manifests', 'security-onion.json');
const REQUEST_TIMEOUT_MS = 20_000;
const PAGE_FETCH_CONCURRENCY = 6;
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

async function fetchIndex() {
  const res = await fetch(INDEX_URL, { headers: HEADERS, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  if (!res.ok) throw new Error(`${res.status} fetching ${INDEX_URL}`);
  const $ = cheerio.load(await res.text());

  const items = [];
  $('section#tools ul.simple li a').each((_, el) => {
    const $el = $(el);
    const name = $el.text().trim();
    const href = $el.attr('href');
    if (!name || !href) return;
    items.push({ name, docsUrl: new URL(href, BASE_URL).toString() });
  });
  if (items.length === 0) throw new Error('Could not find any tool links under section#tools — page structure may have changed.');
  return items;
}

async function fetchDetail(item) {
  const res = await fetch(item.docsUrl, { headers: HEADERS, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  if (!res.ok) return { ...item, description: '', homepage: undefined };
  const $ = cheerio.load(await res.text());

  // The consistent pattern across sub-pages is a paragraph reading
  // "From <external homepage>:" immediately followed by a <blockquote>
  // whose first <p> is the tool's own description.
  let homepage;
  let description = '';
  $('div[itemprop="articleBody"] p').each((_, p) => {
    const $p = $(p);
    if (!/^From\s*:?$/.test($p.text().trim()) && !/^From\b/.test($p.text().trim())) return;
    const $link = $p.find('a.reference.external').first();
    if ($link.length === 0) return;
    homepage = $link.attr('href');
    const blockquote = $p.next('blockquote');
    description = blockquote.find('p').first().text().replace(/\s+/g, ' ').trim();
  });

  return { ...item, description, homepage };
}

// First sentence if it fits, else the longest whole-word prefix that
// fits within maxLen — never cuts a word (or a description) in half.
function shortenTagline(text, maxLen = 150) {
  const firstSentence = text.match(/^.*?[.!?](?=\s|$)/)?.[0];
  if (firstSentence && firstSentence.length <= maxLen) return firstSentence;
  if (text.length <= maxLen) return text;
  const truncated = text.slice(0, maxLen);
  const lastSpace = truncated.lastIndexOf(' ');
  return `${truncated.slice(0, lastSpace > 0 ? lastSpace : maxLen)}…`;
}

function toFrontmatterYaml(tool) {
  const lines = [
    `name: ${JSON.stringify(tool.name)}`,
    `tagline: ${JSON.stringify(shortenTagline(tool.description || tool.name))}`,
    `categories: ${JSON.stringify(['network-security-monitoring'])}`,
    `platforms: ${JSON.stringify(['Linux'])}`,
    `lastVerified: ${new Date().toISOString().slice(0, 10)}`,
    `docsUrl: ${JSON.stringify(tool.docsUrl)}`,
  ];
  if (tool.homepage) lines.push(`downloadUrl: ${JSON.stringify(tool.homepage)}`);
  lines.push(`commonlyOn: ${JSON.stringify(['Security Onion'])}`);
  const seeAlso = tool.homepage
    ? "Security Onion's official tool documentation and upstream website linked above"
    : "Security Onion's official tool documentation linked above";
  lines.push(`gettingStarted: ${JSON.stringify(`Bundled with Security Onion. See ${seeAlso} for details.`)}`);
  return lines.join('\n');
}

function toMarkdown(tool) {
  const body = (tool.description || `${tool.name} is bundled with Security Onion.`).replace(/^---$/gm, '\\-\\-\\-');
  return `---\n${toFrontmatterYaml(tool)}\n---\n\n${body}\n\nOnly use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).\n`;
}

async function main() {
  console.log("Fetching Security Onion's tools index...");
  const index = await fetchIndex();
  console.log(`Found ${index.length} tools; fetching each detail page...`);
  const detailed = await mapWithConcurrency(index, PAGE_FETCH_CONCURRENCY, fetchDetail);

  const claimedSlugs = new Set(CLAIMED_MANIFEST_PATHS.flatMap((p) => readManifest(p)));
  mkdirSync(CONTENT_DIR, { recursive: true });
  const oldSlugs = readManifest(MANIFEST_PATH);

  let skippedClaimed = 0;
  const written = [];
  for (const tool of detailed) {
    const slug = kebab(tool.name);
    if (!slug) continue;
    if (claimedSlugs.has(slug)) {
      skippedClaimed++;
      continue;
    }
    if (tool.homepage) {
      const ok = await isUrlReachable(tool.homepage);
      if (!ok) tool.homepage = undefined;
    }
    writeFileSync(join(CONTENT_DIR, `${slug}.md`), toMarkdown(tool), 'utf8');
    written.push(slug);
  }

  const removed = pruneStale(CONTENT_DIR, oldSlugs, written);
  writeManifest(MANIFEST_PATH, written);
  ensureAutoSyncedTag(join('src', 'content', 'os', 'security-onion.md'));

  console.log(
    `\nWrote ${written.length} Security Onion-exclusive tool entries to ${CONTENT_DIR}` +
      ` (skipped ${skippedClaimed} already covered${removed ? `, removed ${removed} stale entr${removed === 1 ? 'y' : 'ies'}` : ''}).`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
