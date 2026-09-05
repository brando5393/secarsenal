// Generates src/content/tools/*.md entries for tools documented on
// REMnux's own official "Discover the Tools" pages
// (https://docs.remnux.org/discover-the-tools/...) that aren't already
// covered by Kali or BlackArch's syncs. REMnux's docs site (GitBook)
// exposes a clean Markdown version of every page via a `.md` suffix
// and a full page index at /llms.txt — no HTML scraping needed. Run
// via `npm run sync-tools:remnux`.
//
// Kali and BlackArch are treated as authoritative for any tool they
// already cover (tracked via their manifests) — this script only
// fills in the gap of REMnux-exclusive tools. All three scripts track
// their own owned slugs in separate manifest files so re-running any
// one of them only ever deletes files it previously created itself.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { readManifest, writeManifest, pruneStale, mapWithConcurrency, isUrlReachable, ensureAutoSyncedTag } from './sync-utils.mjs';

const DOCS_BASE = 'https://docs.remnux.org';
const CONTENT_DIR = join('src', 'content', 'tools');
const KALI_MANIFEST_PATH = join('scripts', 'manifests', 'kali.json');
const BLACKARCH_MANIFEST_PATH = join('scripts', 'manifests', 'blackarch.json');
const MANIFEST_PATH = join('scripts', 'manifests', 'remnux.json');
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

// GitBook's Markdown export backslash-escapes characters like `_` and
// `*` in plain text (e.g. "bulk\_extractor") — undo that for display.
function unescapeMarkdown(text) {
  return text.replace(/\\([\\`*_{}[\]()#+\-.!])/g, '$1');
}

async function fetchText(url) {
  const res = await fetch(url, { headers: HEADERS, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  if (!res.ok) throw new Error(`${res.status} fetching ${url}`);
  return res.text();
}

async function getToolPageUrls() {
  const llms = await fetchText(`${DOCS_BASE}/llms.txt`);
  const urls = [...llms.matchAll(/\((https:\/\/docs\.remnux\.org\/discover-the-tools\/[^)]+\.md)\)/g)].map(
    (m) => m[1]
  );
  return [...new Set(urls)];
}

// Pulls the href out of either a `<https://...>` autolink or a
// `[text](https://...)` markdown link — REMnux's docs use both.
function extractUrl(value) {
  const angle = value.match(/<(https?:\/\/[^>]+)>/);
  if (angle) return angle[1];
  const md = value.match(/\]\((https?:\/\/[^)]+)\)/);
  if (md) return md[1];
  const bare = value.match(/https?:\/\/\S+/);
  return bare ? bare[0] : undefined;
}

function parseToolsFromPage(markdown, pageUrl) {
  const h1Match = markdown.match(/^# (.+)$/m);
  const category = h1Match ? kebab(h1Match[1]) : 'uncategorized';

  const tools = [];
  // Each tool is a level-2 heading followed by free text and a block
  // of "**Field**: value\" lines, up to the next level-2 heading.
  const blocks = markdown.split(/^## /m).slice(1);
  for (const block of blocks) {
    const lines = block.split('\n');
    const name = unescapeMarkdown(lines[0].trim());
    if (!name) continue;

    const bodyLines = lines.slice(1);
    const descLines = [];
    const fields = {};
    for (const line of bodyLines) {
      const fieldMatch = line.match(/^\*\*([^*]+)\*\*:\s*(.+?)\\?$/);
      if (fieldMatch) {
        fields[fieldMatch[1].trim().toLowerCase()] = fieldMatch[2].trim();
      } else if (Object.keys(fields).length === 0 && line.trim()) {
        descLines.push(line.trim());
      }
    }

    tools.push({
      name,
      description: unescapeMarkdown(descLines.join(' ').trim()),
      website: fields.website ? extractUrl(fields.website) : undefined,
      license: fields.license ? fields.license.replace(/:\s*<https?:\/\/[^>]+>/, '').trim() : undefined,
      category,
      // The '+' characters are literal parts of GitBook's page URLs
      // here, not space-encoding — don't decode them.
      docsUrl: pageUrl.replace(/\.md$/, ''),
    });
  }
  return tools;
}

function toFrontmatterYaml(tool) {
  const lines = [
    `name: ${JSON.stringify(tool.name)}`,
    `tagline: ${JSON.stringify((tool.description || tool.name).slice(0, 120))}`,
    `categories: ${JSON.stringify([tool.category])}`,
    `platforms: ${JSON.stringify(['Linux'])}`,
  ];
  if (tool.license) lines.push(`license: ${JSON.stringify(tool.license)}`);
  lines.push(
    `lastVerified: ${new Date().toISOString().slice(0, 10)}`,
    `docsUrl: ${JSON.stringify(tool.docsUrl)}`
  );
  if (tool.website) lines.push(`downloadUrl: ${JSON.stringify(tool.website)}`);
  lines.push(`commonlyOn: ${JSON.stringify(['REMnux'])}`);
  const seeAlso = tool.website
    ? 'the official REMnux tool listing and upstream website linked above'
    : 'the official REMnux tool listing linked above';
  lines.push(
    `gettingStarted: ${JSON.stringify(`Preinstalled on REMnux. See ${seeAlso} for details.`)}`
  );
  return lines.join('\n');
}

function toMarkdown(tool) {
  const body = (tool.description || `${tool.name} is a tool documented as part of the REMnux malware analysis toolkit.`).replace(
    /^---$/gm,
    '\\-\\-\\-'
  );
  return `---\n${toFrontmatterYaml(tool)}\n---\n\n${body}\n\nOnly use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).\n`;
}

async function main() {
  console.log('Fetching REMnux tool page index...');
  const pageUrls = await getToolPageUrls();
  console.log(`Found ${pageUrls.length} "Discover the Tools" pages.`);

  const claimedSlugs = new Set([...readManifest(KALI_MANIFEST_PATH), ...readManifest(BLACKARCH_MANIFEST_PATH)]);
  mkdirSync(CONTENT_DIR, { recursive: true });
  const oldSlugs = readManifest(MANIFEST_PATH);

  const allTools = [];
  for (const pageUrl of pageUrls) {
    try {
      const markdown = await fetchText(pageUrl);
      allTools.push(...parseToolsFromPage(markdown, pageUrl));
    } catch (err) {
      console.log(`  Failed to fetch ${pageUrl}: ${err.message}`);
    }
  }
  console.log(`Parsed ${allTools.length} tool entries across all pages.`);

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
  ensureAutoSyncedTag(join('src', 'content', 'os', 'remnux.md'));

  console.log(
    `\nWrote ${written.length} REMnux-exclusive tool entries to ${CONTENT_DIR}` +
      ` (skipped ${skippedClaimed} already covered by Kali/BlackArch, ${skippedDuplicate} duplicate names, ` +
      `omitted ${deadWebsites} dead website link${deadWebsites === 1 ? '' : 's'}` +
      `${removed ? `, removed ${removed} stale entr${removed === 1 ? 'y' : 'ies'}` : ''}).`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
