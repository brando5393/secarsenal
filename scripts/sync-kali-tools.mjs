// Generates src/content/tools/*.md from Kali's own official tool pages
// (https://www.kali.org/tools/<slug>/). This is the single source of
// truth for the tools collection — do not hand-edit files in
// src/content/tools/, they get overwritten on the next sync. Run via
// `npm run sync-tools`; also run on a schedule by
// .github/workflows/sync-tools.yml, which opens a PR for review
// rather than publishing unreviewed changes directly.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import * as cheerio from 'cheerio';
import { readManifest, writeManifest, pruneStale, mapWithConcurrency } from './sync-utils.mjs';

const BASE = 'https://www.kali.org';
const CONTENT_DIR = join('src', 'content', 'tools');
const MANIFEST_PATH = join('scripts', 'manifests', 'kali.json');
const CONCURRENCY = 6;
const REQUEST_TIMEOUT_MS = 20_000;
const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) SecArsenal-sync-bot (+https://github.com/brando5393/secarsenal)',
};

async function fetchText(url) {
  const res = await fetch(url, { headers: HEADERS, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  if (!res.ok) throw new Error(`${res.status} fetching ${url}`);
  return res.text();
}

async function getToolSlugs() {
  const sitemap = await fetchText(`${BASE}/sitemap.xml`);
  const urls = [...sitemap.matchAll(/<loc>(https:\/\/www\.kali\.org\/tools\/[^<]+)<\/loc>/g)].map((m) => m[1]);
  const slugs = urls
    .map((u) => u.replace(`${BASE}/tools/`, '').replace(/\/$/, ''))
    .filter((slug) => slug && !slug.includes('/') && slug !== 'all-tools' && slug !== 'kali-meta');

  const robots = await fetchText(`${BASE}/robots.txt`);
  const disallowed = new Set(
    [...robots.matchAll(/Disallow:\s*\/tools\/([^/\s]+)\//g)].map((m) => m[1])
  );

  return [...new Set(slugs)].filter((slug) => !disallowed.has(slug)).sort();
}

function kebab(label) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function textOf($el) {
  return $el.text().replace(/\s+/g, ' ').trim();
}

async function parseTool(slug) {
  const url = `${BASE}/tools/${slug}/`;
  const html = await fetchText(url);
  const $ = cheerio.load(html);

  const name = textOf($('aside ul li h3').first()) || slug;

  let homepageUrl, packageTrackerUrl, repoUrl;
  $('#package-links a[target=_blank]').each((_, el) => {
    const $el = $(el);
    const href = $el.attr('href');
    const label = textOf($el);
    if (/homepage/i.test(label)) homepageUrl = href;
    else if (/package tracker/i.test(label)) packageTrackerUrl = href;
    else if (/source code/i.test(label)) repoUrl = href;
  });

  const categories = [];
  $('#categories a[title]').each((_, el) => {
    const label = $(el).attr('title');
    if (label) categories.push(kebab(label));
  });

  // The tool's own package block usually shares its id with the URL
  // slug; fall back to the first package block on the page otherwise.
  let $descBlock = $(`#packages-info h3`).filter((_, el) => $(el).attr('id') === slug).first();
  if ($descBlock.length === 0) $descBlock = $('#packages-info h3').first();

  const $descP = $descBlock.nextAll('p').first();
  const tagline = textOf($descP.find('strong').first()) || undefined;
  const fullText = textOf($descP);
  const description = tagline ? fullText.replace(tagline, '').trim() : fullText;

  const $installP = $descP.nextAll('p').first();
  let installCmd;
  const installMatch = textOf($installP).match(/How to install:\s*(.+)$/);
  if (installMatch) installCmd = installMatch[1].trim();

  return {
    slug,
    name,
    tagline: tagline || description.slice(0, 120) || name,
    description: description || `${name} is a tool included in Kali Linux. See the official Kali tool page for details.`,
    categories: categories.length > 0 ? categories : ['uncategorized'],
    docsUrl: url,
    downloadUrl: homepageUrl,
    repoUrl: repoUrl || packageTrackerUrl,
    installCmd,
  };
}

function toFrontmatterYaml(tool) {
  const lines = [
    `name: ${JSON.stringify(tool.name)}`,
    `tagline: ${JSON.stringify(tool.tagline)}`,
    `categories: ${JSON.stringify(tool.categories)}`,
    `platforms: ${JSON.stringify(['Linux'])}`,
    `lastVerified: ${new Date().toISOString().slice(0, 10)}`,
    `docsUrl: ${JSON.stringify(tool.docsUrl)}`,
  ];
  if (tool.downloadUrl) lines.push(`downloadUrl: ${JSON.stringify(tool.downloadUrl)}`);
  if (tool.repoUrl) lines.push(`repoUrl: ${JSON.stringify(tool.repoUrl)}`);
  lines.push(`commonlyOn: ${JSON.stringify(['Kali Linux'])}`);
  const seeAlso = tool.downloadUrl
    ? 'the official Kali tool page and upstream homepage linked above'
    : 'the official Kali tool page linked above';
  const gettingStarted = tool.installCmd
    ? `Install on Kali Linux with \`${tool.installCmd}\`. See ${seeAlso} for full usage and configuration details.`
    : `See ${seeAlso} for installation and usage details.`;
  lines.push(`gettingStarted: ${JSON.stringify(gettingStarted)}`);
  return lines.join('\n');
}

function toMarkdown(tool) {
  const body = tool.description.replace(/^---$/gm, '\\-\\-\\-');
  return `---\n${toFrontmatterYaml(tool)}\n---\n\n${body}\n\nOnly use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).\n`;
}

async function main() {
  console.log('Fetching Kali tool sitemap...');
  const slugs = await getToolSlugs();
  console.log(`Found ${slugs.length} tool pages to sync.`);

  mkdirSync(CONTENT_DIR, { recursive: true });
  const oldSlugs = readManifest(MANIFEST_PATH);

  let done = 0;
  const failures = [];
  const written = [];

  await mapWithConcurrency(slugs, CONCURRENCY, async (slug) => {
    try {
      const tool = await parseTool(slug);
      writeFileSync(join(CONTENT_DIR, `${slug}.md`), toMarkdown(tool), 'utf8');
      written.push(slug);
    } catch (err) {
      failures.push({ slug, error: err.message });
    } finally {
      done++;
      if (done % 25 === 0 || done === slugs.length) {
        console.log(`  ${done}/${slugs.length} processed (${failures.length} failed so far)`);
      }
    }
  });

  // Only remove files this script previously created and no longer
  // finds on kali.org — never touches files owned by another source
  // (e.g. BlackArch's sync) that happen to live in the same directory.
  const removed = pruneStale(CONTENT_DIR, oldSlugs, written);
  writeManifest(MANIFEST_PATH, written);

  console.log(`\nWrote ${written.length} tool entries to ${CONTENT_DIR}${removed ? `, removed ${removed} stale entr${removed === 1 ? 'y' : 'ies'}` : ''}.`);
  if (failures.length > 0) {
    console.log(`${failures.length} tool page(s) failed to sync:`);
    for (const f of failures) console.log(`  - ${f.slug}: ${f.error}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
