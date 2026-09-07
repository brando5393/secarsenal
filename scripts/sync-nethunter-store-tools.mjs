// Generates src/content/tools/*.md entries from the Kali NetHunter App
// Store's own repository index (https://store.nethunter.com/repo/) —
// an official F-Droid-format Android app repository, "official
// binaries built by the original application developers" per its own
// about page. Like OSINT Framework and Exegol, this isn't a specific
// distro's bundled tool list — it's a curated third-party app
// inventory — so entries here get `commonlyOn: []` rather than being
// attributed to a distro, and there is no corresponding
// `src/content/os/*.md` entry to flip via ensureAutoSyncedTag(). Run
// via `npm run sync-tools:nethunter-store`.
//
// Platforms: these are Android-native APKs, not Linux/Windows software
// or browser-based resources — a genuinely new platform value the
// same way OSINT Framework introduced "Web". `platforms` has no fixed
// enum in src/content.config.ts (`z.array(z.string())`), so this needs
// no schema change.
//
// Filtered out before ever becoming a candidate — apps that only
// extend/customize the terminal itself or do generic device chores,
// not security work in their own right:
// - Termux:Boot, Termux:Styling, Termux:Tasker, Termux:Widget,
//   Termux:Float — Termux customization/automation add-ons. Termux
//   itself is kept (it's the foundational shell NetHunter's Android
//   tooling runs inside, not a customization of something else).
// - ConnectBot — a generic SSH client with no security-specific
//   feature set (categories: System, Utilities).
// - aLogcat — a generic Android system/app log viewer.
// - Opaque — a generic oVirt/RHEV/Proxmox remote-desktop client.
// - Hacker's Keyboard — despite the name and its "NetHunter" category
//   tag, this is literally just a virtual keyboard layout.
// index-v2.json's own `categories` array is real per-app taxonomy (not
// guessed) — used directly, kebab-cased, multi-category apps keep
// every category they're tagged with.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  readManifest,
  writeManifest,
  pruneStale,
  mapWithConcurrency,
  isUrlReachable,
} from './sync-utils.mjs';

const INDEX_URL = 'https://store.nethunter.com/repo/index-v2.json';
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
  'exegol',
].map((n) => join('scripts', 'manifests', `${n}.json`));
const MANIFEST_PATH = join('scripts', 'manifests', 'nethunter-store.json');
const EXCLUDED_APP_IDS = new Set([
  'com.termux.boot',
  'com.termux.styling',
  'com.termux.tasker',
  'com.termux.widget',
  'com.termux.window', // Termux:Float
  'org.connectbot',
  'org.jtb.alogcat',
  'com.undatech.opaque',
  'org.pocketworkstation.pckeyboard', // Hacker's Keyboard
]);
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

async function fetchJson(url) {
  const res = await fetch(url, { headers: HEADERS, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  if (!res.ok) throw new Error(`${res.status} fetching ${url}`);
  return res.json();
}

function localized(field) {
  if (!field) return undefined;
  return field['en-US'] ?? Object.values(field)[0];
}

function parseApps(index) {
  const apps = [];
  for (const [appId, pkg] of Object.entries(index.packages ?? {})) {
    if (EXCLUDED_APP_IDS.has(appId)) continue;
    const m = pkg.metadata ?? {};
    const name = localized(m.name);
    const summary = localized(m.summary);
    if (!name || !summary) continue;
    const description = localized(m.description);
    // Prefer the app's own homepage, then its source repo, then its
    // issue tracker — the same "most official, most specific" fallback
    // chain FLARE VM/OSINT Framework use for a missing preferred field.
    const docsUrl = m.webSite || m.sourceCode || m.issueTracker;
    if (!docsUrl) continue;
    apps.push({
      appId,
      name,
      summary,
      body: description && description.trim() ? description : summary,
      categories: [...new Set((m.categories ?? []).map(kebab))].filter(Boolean),
      docsUrl,
      license: m.license,
    });
  }
  return apps;
}

function toTagline(summary) {
  const trimmed = summary.trim();
  if (trimmed.length <= 150) return trimmed;
  const cut = trimmed.slice(0, 150);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 100 ? lastSpace : 150)}…`;
}

function toFrontmatterYaml(app) {
  const lines = [
    `name: ${JSON.stringify(app.name)}`,
    `tagline: ${JSON.stringify(toTagline(app.summary))}`,
    `categories: ${JSON.stringify(app.categories)}`,
    // Real Android-native APKs, not desktop Linux/Windows software or a
    // browser-based resource — see file header for why "Android" is a
    // new value rather than a forced fit into the existing ones.
    `platforms: ${JSON.stringify(['Android'])}`,
    `lastVerified: ${new Date().toISOString().slice(0, 10)}`,
    `docsUrl: ${JSON.stringify(app.docsUrl)}`,
    // Not bundled with any of the 10 distros/sources this project
    // already tracks — see the file header for why this is `[]`
    // rather than guessed.
    `commonlyOn: []`,
    `gettingStarted: ${JSON.stringify(
      'Install from the Kali NetHunter App Store (store.nethunter.com) or NetHunter\'s own app repository on an Android device.'
    )}`,
  ];
  if (app.license) lines.push(`license: ${JSON.stringify(app.license)}`);
  return lines.join('\n');
}

function toMarkdown(app) {
  // A body line that's exactly `---` would prematurely close the YAML
  // frontmatter fence below — escape it, same as every other sync
  // script in this project does for scraped body text.
  const body = app.body.replace(/^---$/gm, '\\-\\-\\-');
  return `---\n${toFrontmatterYaml(app)}\n---\n\n${body}\n\nOnly use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).\n`;
}

async function main() {
  console.log("Fetching Kali NetHunter App Store's repo index...");
  const index = await fetchJson(INDEX_URL);
  const apps = parseApps(index);
  console.log(`Parsed ${apps.length} candidate apps after excluding ${EXCLUDED_APP_IDS.size} generic/utility add-ons.`);

  const claimedSlugs = new Set(CLAIMED_MANIFEST_PATHS.flatMap((p) => readManifest(p)));
  mkdirSync(CONTENT_DIR, { recursive: true });
  const oldSlugs = readManifest(MANIFEST_PATH);

  const candidates = [];
  let skippedClaimed = 0;
  const seenSlugs = new Set();
  for (const app of apps) {
    const slug = kebab(app.name);
    if (!slug || seenSlugs.has(slug)) continue;
    seenSlugs.add(slug);
    if (claimedSlugs.has(slug)) {
      skippedClaimed++;
      continue;
    }
    candidates.push({ slug, app });
  }

  console.log(`Verifying ${candidates.length} links...`);
  let dead = 0;
  await mapWithConcurrency(candidates, LINK_CHECK_CONCURRENCY, async (candidate) => {
    candidate.reachable = await isUrlReachable(candidate.app.docsUrl);
    if (!candidate.reachable) dead++;
  });

  const written = [];
  for (const { slug, app, reachable } of candidates) {
    if (!reachable) continue;
    writeFileSync(join(CONTENT_DIR, `${slug}.md`), toMarkdown(app), 'utf8');
    written.push(slug);
  }

  const removed = pruneStale(CONTENT_DIR, oldSlugs, written);
  writeManifest(MANIFEST_PATH, written);

  console.log(
    `\nWrote ${written.length} NetHunter-App-Store-exclusive tool entries to ${CONTENT_DIR}` +
      ` (skipped ${skippedClaimed} already covered, ${dead} dead links${removed ? `, removed ${removed} stale entr${removed === 1 ? 'y' : 'ies'}` : ''}).`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
