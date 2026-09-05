// Generates src/content/tools/*.md entries for tools that ship in
// Mandiant's FLARE VM reverse-engineering/malware-analysis toolkit but
// aren't already covered by Kali/BlackArch/REMnux/Tails/ArchStrike/
// Security Onion, from FLARE VM's own package list
// (https://github.com/mandiant/flare-vm/blob/main/config.xml) plus
// each package's nuspec on Mandiant's own VM-Packages repo for its
// real upstream homepage (`projectUrl`) and category (`tags`). Run via
// `npm run sync-tools:flare-vm`.
//
// Checked before building this: unlike CommandoVM's install profile
// (rejected as a sync source — see project docs), config.xml's package
// list is 135/137 entries in Mandiant's own `.vm`-namespaced package
// repo (mandiant/VM-Packages), exclusive to FLARE VM/CommandoVM and
// not shared with the public Chocolatey community feed. The other 2
// entries (`dotnet3.5`, `vcredist-all`) are plain runtime prerequisites
// with no `.vm` suffix, filtered out below. A small denylist further
// excludes generic desktop utilities (editors, archivers, VCS tooling)
// that ride along in Mandiant's namespace but aren't RE/malware-
// analysis tools in their own right.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import * as cheerio from 'cheerio';
import { readManifest, writeManifest, pruneStale, mapWithConcurrency, isUrlReachable, ensureAutoSyncedTag } from './sync-utils.mjs';

const CONFIG_URL = 'https://raw.githubusercontent.com/mandiant/flare-vm/main/config.xml';
const NUSPEC_BASE = 'https://raw.githubusercontent.com/mandiant/VM-Packages/main/packages';
const DOCS_BASE = 'https://github.com/mandiant/VM-Packages/tree/main/packages';
const CONTENT_DIR = join('src', 'content', 'tools');
const CLAIMED_MANIFEST_PATHS = ['kali', 'blackarch', 'remnux', 'tails', 'archstrike', 'security-onion'].map((n) =>
  join('scripts', 'manifests', `${n}.json`)
);
const MANIFEST_PATH = join('scripts', 'manifests', 'flare-vm.json');
const FETCH_CONCURRENCY = 10;
const REQUEST_TIMEOUT_MS = 20_000;
const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) SecArsenal-sync-bot (+https://github.com/brando5393/secarsenal)',
};

// Generic desktop/dev utilities riding in Mandiant's own `.vm` namespace
// alongside genuine RE/malware-analysis tools — not cataloged as security
// tools in their own right, same spirit as ArchStrike's `archstrike-*`
// infrastructure-package filter.
const DENYLIST = new Set([
  'notepadplusplus.vm',
  'vscode.vm',
  'windows-terminal.vm',
  'cmder.vm',
  '7zip.vm',
  'vcbuildtools.vm',
  'advanced-installer.vm',
  'innoextract.vm',
  'innounp.vm',
  'cygwin.vm',
  'chrome.extensions.vm',
  'microsoft-office.vm',
  'ipython.vm',
]);

function kebab(label) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function fetchPackageIds() {
  const res = await fetch(CONFIG_URL, { headers: HEADERS, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  if (!res.ok) throw new Error(`${res.status} fetching ${CONFIG_URL}`);
  const $ = cheerio.load(await res.text(), { xmlMode: true });

  const ids = [];
  $('package').each((_, el) => {
    const name = $(el).attr('name');
    if (!name) return;
    if (!name.endsWith('.vm')) return; // drop dotnet3.5/vcredist-all prereqs
    if (name.startsWith('vscode.extension.')) return;
    if (DENYLIST.has(name)) return;
    ids.push(name);
  });
  return ids;
}

async function fetchNuspecDetails(id) {
  const url = `${NUSPEC_BASE}/${encodeURIComponent(id)}/${encodeURIComponent(id)}.nuspec`;
  const res = await fetch(url, { headers: HEADERS, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  if (!res.ok) return null;
  const $ = cheerio.load(await res.text(), { xmlMode: true });
  const description = $('metadata > description').first().text().trim();
  const tags = $('metadata > tags').first().text().trim();
  const projectUrl = $('metadata > projectUrl').first().text().trim() || undefined;
  return {
    description: description || undefined,
    category: tags ? kebab(tags) : 'uncategorized',
    projectUrl,
  };
}

function toFrontmatterYaml(tool) {
  const lines = [
    `name: ${JSON.stringify(tool.name)}`,
    `tagline: ${JSON.stringify((tool.description || tool.name).slice(0, 150))}`,
    `categories: ${JSON.stringify([tool.category])}`,
    `platforms: ${JSON.stringify(['Windows'])}`,
    `lastVerified: ${new Date().toISOString().slice(0, 10)}`,
    `docsUrl: ${JSON.stringify(tool.docsUrl)}`,
  ];
  if (tool.homepage) lines.push(`downloadUrl: ${JSON.stringify(tool.homepage)}`);
  lines.push(`commonlyOn: ${JSON.stringify(['FLARE VM'])}`);
  const seeAlso = tool.homepage
    ? 'the official VM-Packages listing and upstream homepage linked above'
    : 'the official VM-Packages listing linked above';
  lines.push(
    `gettingStarted: ${JSON.stringify(`Included by default in a FLARE VM install (\`${tool.name}\` package). See ${seeAlso} for details.`)}`
  );
  return lines.join('\n');
}

function toMarkdown(tool) {
  const body = (tool.description || `${tool.name} is a tool included in FLARE VM.`).replace(/^---$/gm, '\\-\\-\\-');
  return `---\n${toFrontmatterYaml(tool)}\n---\n\n${body}\n\nOnly use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).\n`;
}

async function main() {
  console.log('Fetching FLARE VM package list...');
  const packageIds = await fetchPackageIds();
  console.log(`Found ${packageIds.length} FLARE VM-exclusive packages.`);

  const claimedSlugs = new Set(CLAIMED_MANIFEST_PATHS.flatMap((p) => readManifest(p)));
  mkdirSync(CONTENT_DIR, { recursive: true });
  const oldSlugs = readManifest(MANIFEST_PATH);

  const seenSlugs = new Set();
  let skippedClaimed = 0;
  const candidates = [];
  for (const id of packageIds) {
    const bareName = id.slice(0, -'.vm'.length);
    const slug = kebab(bareName);
    if (!slug) continue;
    if (claimedSlugs.has(slug)) {
      skippedClaimed++;
      continue;
    }
    if (seenSlugs.has(slug)) continue;
    seenSlugs.add(slug);
    candidates.push({ id, slug, name: bareName });
  }

  console.log(`Fetching nuspec details for ${candidates.length} packages...`);
  let checked = 0;
  let missingNuspec = 0;
  await mapWithConcurrency(candidates, FETCH_CONCURRENCY, async (candidate) => {
    const details = await fetchNuspecDetails(candidate.id);
    if (!details) {
      missingNuspec++;
      candidate.skip = true;
      return;
    }
    candidate.description = details.description;
    candidate.category = details.category;
    candidate.homepage = details.projectUrl;
    checked++;
    if (checked % 25 === 0 || checked === candidates.length) {
      console.log(`  ${checked}/${candidates.length} nuspecs fetched`);
    }
  });

  console.log('Verifying homepage links...');
  let deadHomepages = 0;
  await mapWithConcurrency(candidates, FETCH_CONCURRENCY, async (candidate) => {
    if (candidate.skip || !candidate.homepage) return;
    const ok = await isUrlReachable(candidate.homepage);
    if (!ok) {
      candidate.homepage = undefined;
      deadHomepages++;
    }
  });

  const written = [];
  for (const candidate of candidates) {
    if (candidate.skip) continue;
    const tool = {
      name: candidate.name,
      description: candidate.description,
      category: candidate.category ?? 'uncategorized',
      docsUrl: `${DOCS_BASE}/${candidate.id}`,
      homepage: candidate.homepage,
    };
    writeFileSync(join(CONTENT_DIR, `${candidate.slug}.md`), toMarkdown(tool), 'utf8');
    written.push(candidate.slug);
  }

  const removed = pruneStale(CONTENT_DIR, oldSlugs, written);
  writeManifest(MANIFEST_PATH, written);
  ensureAutoSyncedTag(join('src', 'content', 'os', 'flare-vm.md'));

  console.log(
    `\nWrote ${written.length} FLARE VM-exclusive tool entries to ${CONTENT_DIR}` +
      ` (skipped ${skippedClaimed} already covered, ${missingNuspec} missing nuspec, ` +
      `omitted ${deadHomepages} dead homepage link${deadHomepages === 1 ? '' : 's'}` +
      `${removed ? `, removed ${removed} stale entr${removed === 1 ? 'y' : 'ies'}` : ''}).`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
