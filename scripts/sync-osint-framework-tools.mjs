// Generates src/content/tools/*.md entries from OSINT Framework's own
// data file (https://github.com/lockfale/OSINT-Framework,
// public/arf.json) — a real, structured, official, actively maintained
// (touched as recently as April 2026) tree of ~1,100 OSINT resources,
// each carrying its own `url`, `description`, and metadata (pricing,
// opsec posture, whether it needs a local install, etc.). Unlike most
// of this project's sources, OSINT Framework isn't a specific distro's
// bundled tool list — it's a curated third-party inventory (the same
// role Rawsec plays for OS discovery) — so entries here get
// `commonlyOn: []` rather than being attributed to a distro, and there
// is no corresponding `src/content/os/*.md` entry to flip via
// ensureAutoSyncedTag(). Run via `npm run sync-tools:osint-framework`.
//
// Filtered out before ever becoming a candidate:
// - `deprecated: true` entries — OSINT Framework's own dead-project flag.
// - `googleDork: true` entries — a saved search query string, not a
//   tool with its own homepage; the "url" field for these is a Google
//   search URL, not an official source to link to.
// - The "Training" category — courses/guides/practice sites (e.g. a
//   geolocation guessing game), not tools, a genuine schema mismatch
//   the same way Tsurugi Linux's tool-name list or Pentoo's overlay
//   were rejected for a different kind of mismatch.
// A tool listed under more than one OSINT Framework category (~40 of
// them) is merged into one entry carrying every category it appears
// under, rather than picked arbitrarily or duplicated.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  readManifest,
  writeManifest,
  pruneStale,
  mapWithConcurrency,
  isUrlReachable,
} from './sync-utils.mjs';

const DATA_URL = 'https://raw.githubusercontent.com/lockfale/OSINT-Framework/master/public/arf.json';
const CONTENT_DIR = join('src', 'content', 'tools');
const CLAIMED_MANIFEST_PATHS = ['kali', 'blackarch', 'remnux', 'tails', 'security-onion', 'archstrike', 'flare-vm', 'tpot'].map((n) =>
  join('scripts', 'manifests', `${n}.json`)
);
const MANIFEST_PATH = join('scripts', 'manifests', 'osint-framework.json');
const EXCLUDED_CATEGORIES = new Set(['Training']);
const REQUEST_TIMEOUT_MS = 20_000;
const LINK_CHECK_CONCURRENCY = 10;
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

async function fetchTree() {
  const res = await fetch(DATA_URL, { headers: HEADERS, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  if (!res.ok) throw new Error(`${res.status} fetching ${DATA_URL}`);
  return res.json();
}

// Walks the {name, type: "folder"|"url", children} tree, collecting
// every "url" leaf along with the top-level category folder it's
// nested under (arf.json is currently 3-4 levels deep under each
// top-level category, but only the top-level grouping is meaningful
// as a browsable category here — the same reasoning the review-os-
// candidates skill applies when it says pick what the distro actually
// does over a discovery script's finer-grained guess).
function collectLeaves(tree) {
  const leaves = [];
  function walk(node, topCategory) {
    if (node.type === 'folder') {
      const nextTop = topCategory ?? node.name;
      for (const child of node.children ?? []) walk(child, topCategory === undefined ? undefined : nextTop);
    } else if (node.type === 'url') {
      leaves.push({ ...node, topCategory });
    }
  }
  // The root node itself is a folder named "OSINT Framework"; its
  // direct children are the real top-level categories.
  for (const child of tree.children ?? []) walk(child, child.name);
  return leaves;
}

function mergeByName(leaves) {
  const byName = new Map();
  for (const leaf of leaves) {
    if (leaf.deprecated || leaf.googleDork) continue;
    if (EXCLUDED_CATEGORIES.has(leaf.topCategory)) continue;
    if (!leaf.url) continue;
    // ~8% of arf.json's entries carry no `description` at all — without
    // one, the only honest tagline is the bare tool name repeated back
    // (e.g. "Bing Videos" / "Bing Videos"), which is thinner than this
    // catalog's other entries and adds nothing a reader doesn't already
    // get from the name itself. Skipped rather than padded.
    if (!leaf.description || !leaf.description.trim()) continue;
    const existing = byName.get(leaf.name);
    if (existing) {
      existing.categories.add(kebab(leaf.topCategory));
    } else {
      byName.set(leaf.name, {
        name: leaf.name,
        url: leaf.url,
        description: leaf.description,
        bestFor: leaf.bestFor,
        categories: new Set([kebab(leaf.topCategory)]),
      });
    }
  }
  return [...byName.values()];
}

function toTagline(description) {
  if (description.length <= 150) return description;
  const cut = description.slice(0, 150);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 100 ? lastSpace : 150)}…`;
}

function toFrontmatterYaml(item) {
  const lines = [
    `name: ${JSON.stringify(item.name)}`,
    `tagline: ${JSON.stringify(toTagline(item.description))}`,
    `categories: ${JSON.stringify([...item.categories].sort())}`,
    // These are overwhelmingly web-based OSINT resources rather than
    // installable Linux/Windows software (the two platform values
    // every other source in this project uses) — "Web" is a genuinely
    // new, more accurate value for this shape of entry rather than a
    // forced fit into the existing two.
    `platforms: ${JSON.stringify(['Web'])}`,
    `lastVerified: ${new Date().toISOString().slice(0, 10)}`,
    `docsUrl: ${JSON.stringify(item.url)}`,
    // Not bundled with any of the 8 distros this project already
    // tracks — see the file header for why this is `[]` rather than
    // guessed.
    `commonlyOn: []`,
    `gettingStarted: ${JSON.stringify(
      item.bestFor
        ? `Best for: ${item.bestFor}. See the official site linked above for details.`
        : 'See the official site linked above for details.'
    )}`,
  ];
  return lines.join('\n');
}

function toMarkdown(item) {
  // A body line that's exactly `---` would prematurely close the YAML
  // frontmatter fence below — escape it, same as every other sync
  // script in this project does for scraped body text.
  const body = item.description.replace(/^---$/gm, '\\-\\-\\-');
  return `---\n${toFrontmatterYaml(item)}\n---\n\n${body}\n\nOnly use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).\n`;
}

async function main() {
  console.log("Fetching OSINT Framework's arf.json...");
  const tree = await fetchTree();
  const leaves = collectLeaves(tree);
  const merged = mergeByName(leaves);
  console.log(`Parsed ${leaves.length} raw entries -> ${merged.length} unique tools after filtering/merging.`);

  const claimedSlugs = new Set(CLAIMED_MANIFEST_PATHS.flatMap((p) => readManifest(p)));
  mkdirSync(CONTENT_DIR, { recursive: true });
  const oldSlugs = readManifest(MANIFEST_PATH);

  const candidates = [];
  let skippedClaimed = 0;
  const seenSlugs = new Set();
  for (const item of merged) {
    const slug = kebab(item.name);
    if (!slug || seenSlugs.has(slug)) continue;
    seenSlugs.add(slug);
    if (claimedSlugs.has(slug)) {
      skippedClaimed++;
      continue;
    }
    candidates.push({ slug, item });
  }

  console.log(`Verifying ${candidates.length} links (this takes a while)...`);
  let checked = 0;
  let dead = 0;
  await mapWithConcurrency(candidates, LINK_CHECK_CONCURRENCY, async (candidate) => {
    candidate.reachable = await isUrlReachable(candidate.item.url);
    if (!candidate.reachable) dead++;
    checked++;
    if (checked % 200 === 0 || checked === candidates.length) {
      console.log(`  ${checked}/${candidates.length} links checked (${dead} dead so far)`);
    }
  });

  const written = [];
  for (const { slug, item, reachable } of candidates) {
    if (!reachable) continue;
    writeFileSync(join(CONTENT_DIR, `${slug}.md`), toMarkdown(item), 'utf8');
    written.push(slug);
  }

  const removed = pruneStale(CONTENT_DIR, oldSlugs, written);
  writeManifest(MANIFEST_PATH, written);

  console.log(
    `\nWrote ${written.length} OSINT-Framework-exclusive tool entries to ${CONTENT_DIR}` +
      ` (skipped ${skippedClaimed} already covered, ${dead} dead links${removed ? `, removed ${removed} stale entr${removed === 1 ? 'y' : 'ies'}` : ''}).`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
