// Generates src/content/tools/*.md entries for the honeypots and
// supporting tools listed in T-Pot's own README
// (https://github.com/telekom-security/tpotce), under the "Honeypots
// and Tools" heading. That section is a genuine structured, official,
// per-item list — each honeypot/tool is a markdown link straight to
// its own upstream homepage or repo — so unlike most single-purpose
// appliances in this catalog, T-Pot clears the bar for a real sync
// script rather than a hand-maintained entry. Run via
// `npm run sync-tools:tpot`.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { readManifest, writeManifest, pruneStale, isUrlReachable, ensureAutoSyncedTag } from './sync-utils.mjs';

const README_URL = 'https://raw.githubusercontent.com/telekom-security/tpotce/master/README.md';
const CONTENT_DIR = join('src', 'content', 'tools');
const CLAIMED_MANIFEST_PATHS = ['kali', 'blackarch', 'remnux', 'tails', 'security-onion', 'archstrike', 'flare-vm'].map((n) =>
  join('scripts', 'manifests', `${n}.json`)
);
const MANIFEST_PATH = join('scripts', 'manifests', 'tpot.json');
const REQUEST_TIMEOUT_MS = 20_000;
const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) SecArsenal-sync-bot (+https://github.com/brando5393/secarsenal)',
};
const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

function kebab(label) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function fetchReadme() {
  const res = await fetch(README_URL, { headers: HEADERS, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  if (!res.ok) throw new Error(`${res.status} fetching ${README_URL}`);
  return res.text();
}

// The "Honeypots and Tools" section has two parts: a comma-separated
// run of [name](url) links (the honeypots) followed by a "* [name](url)
// description" bullet list (supporting tools) — bounded by their own
// marker lines so a future README rewrite that removes these markers
// fails loudly instead of silently parsing nothing.
function parseSection(readme) {
  const start = readme.indexOf('## Honeypots and Tools');
  const toolsMarker = readme.indexOf('Alongside the following tools:', start);
  const end = readme.indexOf('## Technical Architecture', start);
  if (start === -1 || toolsMarker === -1 || end === -1 || !(start < toolsMarker && toolsMarker < end)) {
    throw new Error('Could not find the "Honeypots and Tools" section markers — README structure may have changed.');
  }

  const honeypotsBlock = readme.slice(start, toolsMarker);
  const toolsBlock = readme.slice(toolsMarker, end);

  const honeypots = [...honeypotsBlock.matchAll(LINK_RE)].map(([, name, url]) => ({
    name,
    url,
    tagline: `${name} honeypot, bundled with T-Pot's multi-honeypot platform.`,
    category: 'honeypot',
  }));

  const tools = [];
  for (const line of toolsBlock.split('\n')) {
    const m = line.match(/^\*\s*\[([^\]]+)\]\(([^)]+)\)\s*(.*)$/);
    if (!m) continue;
    const [, name, url, rest] = m;
    tools.push({
      name,
      url,
      tagline: rest.trim().replace(/\.$/, '.') || `${name}, bundled with T-Pot.`,
      category: 'network-monitoring',
    });
  }

  if (honeypots.length === 0 || tools.length === 0) {
    throw new Error(`Parsed ${honeypots.length} honeypots and ${tools.length} tools — expected both non-empty.`);
  }
  return [...honeypots, ...tools];
}

function toFrontmatterYaml(item) {
  const lines = [
    `name: ${JSON.stringify(item.name)}`,
    `tagline: ${JSON.stringify(item.tagline)}`,
    `categories: ${JSON.stringify([item.category])}`,
    `platforms: ${JSON.stringify(['Linux'])}`,
    `lastVerified: ${new Date().toISOString().slice(0, 10)}`,
    `docsUrl: ${JSON.stringify(item.url)}`,
    `commonlyOn: ${JSON.stringify(['T-Pot'])}`,
    `gettingStarted: ${JSON.stringify(`Bundled with T-Pot. See T-Pot's official README (linked above, under "Honeypots and Tools") and this project's own homepage for details.`)}`,
  ];
  return lines.join('\n');
}

function toMarkdown(item) {
  return `---\n${toFrontmatterYaml(item)}\n---\n\n${item.tagline}\n\nOnly use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).\n`;
}

async function main() {
  console.log("Fetching T-Pot's README...");
  const readme = await fetchReadme();
  const items = parseSection(readme);
  console.log(`Parsed ${items.length} honeypots/tools; verifying links...`);

  const claimedSlugs = new Set(CLAIMED_MANIFEST_PATHS.flatMap((p) => readManifest(p)));
  mkdirSync(CONTENT_DIR, { recursive: true });
  const oldSlugs = readManifest(MANIFEST_PATH);

  let skippedClaimed = 0;
  const written = [];
  for (const item of items) {
    const slug = kebab(item.name);
    if (!slug) continue;
    if (claimedSlugs.has(slug)) {
      skippedClaimed++;
      continue;
    }
    const ok = await isUrlReachable(item.url);
    if (!ok) continue;
    writeFileSync(join(CONTENT_DIR, `${slug}.md`), toMarkdown(item), 'utf8');
    written.push(slug);
  }

  const removed = pruneStale(CONTENT_DIR, oldSlugs, written);
  writeManifest(MANIFEST_PATH, written);
  ensureAutoSyncedTag(join('src', 'content', 'os', 't-pot.md'));

  console.log(
    `\nWrote ${written.length} T-Pot-exclusive tool entries to ${CONTENT_DIR}` +
      ` (skipped ${skippedClaimed} already covered${removed ? `, removed ${removed} stale entr${removed === 1 ? 'y' : 'ies'}` : ''}).`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
