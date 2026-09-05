// Discovers new pentest/security operating systems from Rawsec's
// CyberSecurity Inventory (github.com/noraj/rawsec-cybersecurity-inventory,
// MPL-2.0) and drafts a stub src/content/os/<slug>.md for anything not
// already in our hand-curated OS collection. This never edits or
// removes an existing OS entry and never merges anything itself — it
// only ever proposes new files, with the fields it had to guess
// clearly flagged, for a human to fill in and merge via PR (see
// .github/workflows/discover-os.yml). Whether a newly-added OS gets
// its own tools sync script afterward stays a separate, manual
// per-source evaluation, same as it was for Kali/BlackArch/REMnux/
// Tails vs. Parrot/CAINE/Pentoo.
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { isUrlReachable } from './sync-utils.mjs';

const SOURCE_URL =
  'https://raw.githubusercontent.com/noraj/rawsec-cybersecurity-inventory/master/data/operating_systems/maintained.json';
const CONTENT_DIR = join('src', 'content', 'os');

// Stripped before comparing names so "BlackArch Linux" (Rawsec) matches
// our existing "BlackArch" entry, "Parrot Security OS" matches "Parrot
// Security OS", etc., without needing an exact-string maintained list.
const FILLER_WORDS = new Set(['linux', 'os', 'security', 'distribution', 'distro']);

function normalize(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w && !FILLER_WORDS.has(w))
    .join(' ')
    .trim();
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Best-effort only — Rawsec's data doesn't carry our category enum, so
// this is a keyword guess flagged with a TODO comment in the drafted
// file rather than trusted outright.
function guessCategory(description, base) {
  const text = `${description} ${base}`.toLowerCase();
  if (/forensic|incident response|evidence/.test(text)) return 'forensics';
  if (/wireless|wifi|wi-fi/.test(text)) return 'wireless';
  if (/anonymit|privacy|malware|revers|hardened|minimalist|container/.test(text)) return 'specialized';
  return 'general-purpose';
}

function loadExistingNormalizedNames() {
  return readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data } = matter(readFileSync(join(CONTENT_DIR, f), 'utf8'));
      return normalize(data.name ?? '');
    });
}

function yamlString(value) {
  return JSON.stringify(value);
}

async function main() {
  const res = await fetch(SOURCE_URL, {
    headers: { 'User-Agent': 'SecArsenal-discover-os-bot (+https://github.com/brando5393/secarsenal)' },
  });
  if (!res.ok) throw new Error(`Failed to fetch Rawsec inventory: ${res.status} ${res.statusText}`);
  const { operating_systems: candidates } = await res.json();

  const existingNormalized = new Set(loadExistingNormalizedNames());
  const newCandidates = candidates.filter((c) => !existingNormalized.has(normalize(c.name)));

  if (newCandidates.length === 0) {
    console.log("No new operating systems found — every entry in Rawsec's maintained list matches an existing OS entry.");
    return;
  }

  const today = new Date().toISOString().slice(0, 10);
  const drafted = [];
  const skipped = [];

  for (const candidate of newCandidates) {
    const slug = slugify(candidate.name);
    const filePath = join(CONTENT_DIR, `${slug}.md`);
    if (existsSync(filePath)) {
      skipped.push(`${candidate.name} (slug "${slug}" already exists — name-matching missed this one)`);
      continue;
    }

    const reachable = await isUrlReachable(candidate.website);
    if (!reachable) {
      skipped.push(`${candidate.name} (${candidate.website} unreachable, not drafting a dead docsUrl)`);
      continue;
    }

    const category = guessCategory(candidate.description ?? '', candidate.base ?? '');
    const rawTagline = candidate.description
      ? candidate.description.charAt(0).toUpperCase() + candidate.description.slice(1)
      : `${candidate.base}-based security distribution`;

    const content = `---
name: ${yamlString(candidate.name)}
tagline: ${yamlString(rawTagline)}
category: ${category} # TODO: guessed from Rawsec's description — verify against the docs
basedOn: ${yamlString(candidate.base ?? 'unknown')}
lastVerified: ${today}
docsUrl: ${candidate.website}
toolListMaintenance: manual
notableTools: []
gettingStarted: |
  TODO (needs a human): write a short getting-started summary based on
  ${candidate.name}'s official documentation linked above.
---

_Drafted automatically from [Rawsec's CyberSecurity Inventory](https://github.com/noraj/rawsec-cybersecurity-inventory) — needs a human-written description and a verified category before merging._
`;

    mkdirSync(CONTENT_DIR, { recursive: true });
    writeFileSync(filePath, content, 'utf8');
    drafted.push(filePath);
    console.log(`Drafted ${filePath}`);
  }

  console.log(`\nDrafted ${drafted.length} new OS entr${drafted.length === 1 ? 'y' : 'ies'}.`);
  if (skipped.length > 0) {
    console.log(`Skipped ${skipped.length}:`);
    for (const s of skipped) console.log(`  - ${s}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
