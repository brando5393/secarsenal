// Generates src/content/tools/*.md entries from Exegol's own installed-
// tools CSVs (https://github.com/ThePorgs/Exegol, docs source repo
// ThePorgs/Exegol-docs) — Exegol is a Docker-based offensive-security
// environment, not a bootable distro, shipped as several image
// variants (full/ad/web/osint/light). Its docs site (docs.exegol.com)
// publishes a real, CI-generated `Tool,Link,Description` CSV per image
// build, refreshed on every release. Like OSINT Framework, Exegol
// isn't a specific distro's bundled tool list — it's a curated,
// actively maintained third-party inventory — so entries here get
// `commonlyOn: []` rather than being attributed to a distro, and there
// is no corresponding `src/content/os/*.md` entry to flip via
// ensureAutoSyncedTag(). Run via `npm run sync-tools:exegol`.
//
// Source selection: `releases_amd64.csv` (tagged, stable releases) is
// used instead of `nightly.csv` (dev builds refreshed on every commit)
// — same preference this project's other sources already have for a
// project's official/stable channel over a bleeding-edge one (Kali's
// live tool pages and BlackArch's live table are themselves the
// stable, published state, not a dev branch). `releases_amd64.csv` is
// an index of {image tag, version, build date, link to that build's
// real per-tool CSV}; the latest build date per image tag is resolved
// here, then each of that release's five variant CSVs (full/ad/web/
// osint/light) is fetched — full for the tool data itself, the other
// four purely to derive real per-tool categories (see below).
//
// Categories: unlike OSINT Framework's arf.json, Exegol's per-tool CSV
// carries no category field of its own. Exegol's narrower image
// variants (ad/web/osint/light) are themselves real, maintained
// subsets of the full tool list — which variant(s) a tool ships in is
// genuine category information, not a guess, so a tool's categories
// here are the set of narrower variants its name appears in (merged,
// same spirit as OSINT Framework's mergeByName() for tools listed
// under multiple upstream categories). A tool that appears in `full`
// but none of the four narrower variants falls back to the single
// category "general" rather than being dropped — real cases include
// broad utilities (e.g. shells, generic recon tooling) that don't fit
// Exegol's own narrower slicing but are still genuine tools.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  readManifest,
  writeManifest,
  pruneStale,
  mapWithConcurrency,
  isUrlReachable,
} from './sync-utils.mjs';

const RELEASES_INDEX_URL =
  'https://raw.githubusercontent.com/ThePorgs/Exegol-docs/main/docs/src/public/installed_tools/releases_amd64.csv';
const LISTS_BASE_URL = 'https://raw.githubusercontent.com/ThePorgs/Exegol-docs/main/docs/src/public/installed_tools/lists';
const CONTENT_DIR = join('src', 'content', 'tools');
const CLAIMED_MANIFEST_PATHS = [
  'kali',
  'blackarch',
  'remnux',
  'tails',
  'security-onion',
  'archstrike',
  'flare-vm',
  'tpot',
  'osint-framework',
].map((n) => join('scripts', 'manifests', `${n}.json`));
const MANIFEST_PATH = join('scripts', 'manifests', 'exegol.json');
// The narrower image variants used to derive real per-tool categories.
// "full" is the master tool list, not a category signal in itself.
const VARIANT_TAGS = ['ad', 'web', 'osint', 'light'];
const GENERAL_CATEGORY = 'general';
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

async function fetchText(url) {
  const res = await fetch(url, { headers: HEADERS, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  if (!res.ok) throw new Error(`${res.status} fetching ${url}`);
  return res.text();
}

// A minimal quote-aware CSV line splitter — releases_amd64.csv quotes
// its Build date field (`"2026-08-05T13:30:17Z"`, no embedded comma),
// and the per-tool CSVs' Description field was verified (against a
// real fetch, before writing this) to never contain a comma or quote
// of its own, so this doesn't need to handle escaped quotes inside a
// field, just "skip commas while inside a quoted field".
function splitCsvLine(line) {
  const fields = [];
  let field = '';
  let inQuotes = false;
  for (const char of line) {
    if (char === '"') inQuotes = !inQuotes;
    else if (char === ',' && !inQuotes) {
      fields.push(field);
      field = '';
    } else field += char;
  }
  fields.push(field);
  return fields;
}

function parseCsvRows(text) {
  const lines = text.split('\n').map((l) => l.trimEnd()).filter(Boolean);
  const [, ...rows] = lines; // drop header
  return rows.map(splitCsvLine);
}

// releases_amd64.csv has one row per (image tag, version) release —
// "Image tag,Version,Build date,Tools list" — not sorted in any
// documented order, so the newest build per tag is resolved by
// comparing Build date rather than assuming row order.
function resolveLatestReleasePerTag(csvText) {
  const latestByTag = new Map();
  for (const [tag, , buildDate, downloadCell] of parseCsvRows(csvText)) {
    const existing = latestByTag.get(tag);
    if (existing && new Date(buildDate) <= new Date(existing.buildDate)) continue;
    const linkMatch = downloadCell.match(/\(<([^>]+)>\)/);
    if (!linkMatch) continue;
    latestByTag.set(tag, { buildDate, path: linkMatch[1] });
  }
  return latestByTag;
}

function parseToolCsv(csvText) {
  return parseCsvRows(csvText).map(([name, url, description]) => ({ name, url, description }));
}

async function main() {
  console.log("Fetching Exegol's releases index...");
  const releasesByTag = resolveLatestReleasePerTag(await fetchText(RELEASES_INDEX_URL));

  const fullRelease = releasesByTag.get('full');
  if (!fullRelease) throw new Error('No "full" image release found in releases_amd64.csv');
  console.log(`Latest full-image release build date: ${fullRelease.buildDate}`);

  const fullTools = parseToolCsv(await fetchText(`${LISTS_BASE_URL}${fullRelease.path.replace(/^\/installed_tools\/lists/, '')}`));
  console.log(`Parsed ${fullTools.length} tools from the full image.`);

  const variantNameSets = {};
  for (const tag of VARIANT_TAGS) {
    const release = releasesByTag.get(tag);
    if (!release) {
      console.log(`  (no "${tag}" variant release found — skipping as a category source)`);
      continue;
    }
    const tools = parseToolCsv(await fetchText(`${LISTS_BASE_URL}${release.path.replace(/^\/installed_tools\/lists/, '')}`));
    variantNameSets[tag] = new Set(tools.map((t) => t.name));
    console.log(`  "${tag}" variant: ${tools.length} tools`);
  }

  const claimedSlugs = new Set(CLAIMED_MANIFEST_PATHS.flatMap((p) => readManifest(p)));
  mkdirSync(CONTENT_DIR, { recursive: true });
  const oldSlugs = readManifest(MANIFEST_PATH);

  const candidates = [];
  let skippedClaimed = 0;
  const seenSlugs = new Set();
  let generalFallbackCount = 0;
  for (const tool of fullTools) {
    if (!tool.name || !tool.url || !tool.description) continue;
    const slug = kebab(tool.name);
    if (!slug || seenSlugs.has(slug)) continue;
    seenSlugs.add(slug);
    if (claimedSlugs.has(slug)) {
      skippedClaimed++;
      continue;
    }
    const categories = VARIANT_TAGS.filter((tag) => variantNameSets[tag]?.has(tool.name));
    if (categories.length === 0) {
      categories.push(GENERAL_CATEGORY);
      generalFallbackCount++;
    }
    candidates.push({ slug, tool, categories });
  }

  console.log(`Verifying ${candidates.length} links (this takes a while)...`);
  let checked = 0;
  let dead = 0;
  await mapWithConcurrency(candidates, LINK_CHECK_CONCURRENCY, async (candidate) => {
    candidate.reachable = await isUrlReachable(candidate.tool.url);
    if (!candidate.reachable) dead++;
    checked++;
    if (checked % 200 === 0 || checked === candidates.length) {
      console.log(`  ${checked}/${candidates.length} links checked (${dead} dead so far)`);
    }
  });

  const written = [];
  for (const { slug, tool, categories, reachable } of candidates) {
    if (!reachable) continue;
    writeFileSync(join(CONTENT_DIR, `${slug}.md`), toMarkdown(tool, categories), 'utf8');
    written.push(slug);
  }

  const removed = pruneStale(CONTENT_DIR, oldSlugs, written);
  writeManifest(MANIFEST_PATH, written);

  console.log(
    `\nWrote ${written.length} Exegol-exclusive tool entries to ${CONTENT_DIR}` +
      ` (${generalFallbackCount} fell back to "${GENERAL_CATEGORY}" with no variant match,` +
      ` skipped ${skippedClaimed} already covered, ${dead} dead links${removed ? `, removed ${removed} stale entr${removed === 1 ? 'y' : 'ies'}` : ''}).`
  );
}

function toTagline(description) {
  if (description.length <= 150) return description;
  const cut = description.slice(0, 150);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 100 ? lastSpace : 150)}…`;
}

function toFrontmatterYaml(tool, categories) {
  const lines = [
    `name: ${JSON.stringify(tool.name)}`,
    `tagline: ${JSON.stringify(toTagline(tool.description))}`,
    `categories: ${JSON.stringify([...categories].sort())}`,
    // Real installed Linux CLI/GUI tools inside Exegol's Docker image —
    // unlike OSINT Framework's browser-based resources ("Web"), these
    // are genuine Linux software.
    `platforms: ${JSON.stringify(['Linux'])}`,
    `lastVerified: ${new Date().toISOString().slice(0, 10)}`,
    `docsUrl: ${JSON.stringify(tool.url)}`,
    // Not bundled with any of the 9 distros this project already
    // tracks — see the file header for why this is `[]` rather than
    // guessed.
    `commonlyOn: []`,
    `gettingStarted: ${JSON.stringify('See the official site linked above for details.')}`,
  ];
  return lines.join('\n');
}

function toMarkdown(tool, categories) {
  // A body line that's exactly `---` would prematurely close the YAML
  // frontmatter fence below — escape it, same as every other sync
  // script in this project does for scraped body text.
  const body = tool.description.replace(/^---$/gm, '\\-\\-\\-');
  return `---\n${toFrontmatterYaml(tool, categories)}\n---\n\n${body}\n\nOnly use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).\n`;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
