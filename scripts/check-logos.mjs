// Enforces the logo ground rule (see CONTRIBUTING.md "Logos and
// icons"): every OS entry must be accounted for in exactly one of
// OS_LOGOS or OS_NO_LOGO_FOUND (src/lib/osLogos.ts) — never silently
// falling back to the generic CategoryBadge because nobody checked.
// Run via `npm run check-logos`; wired into .github/workflows/ci.yml
// so a newly added OS entry that's in neither list fails the build
// instead of quietly shipping unreviewed.
//
// The tools collection (~4,200 entries, auto-synced from 11 sources)
// can't get the same per-entry enforcement — most small utilities
// genuinely have no distinct branding, and TOOL_LOGOS is deliberately
// a small curated set of well-known flagship tools (see its own file
// header). What *is* checked here for tools: every TOOL_LOGOS path
// points at a real file, and every file actually under
// public/logos/tools is referenced by some entry — catching a broken
// reference or an orphaned asset left behind by a rename, which is a
// real regression class distinct from "should this tool have a logo."
import { readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { OS_LOGOS, OS_NO_LOGO_FOUND } from '../src/lib/osLogos.ts';
import { TOOL_LOGOS } from '../src/lib/toolLogos.ts';

const OS_CONTENT_DIR = join('src', 'content', 'os');
const TOOL_LOGO_DIR = join('public', 'logos', 'tools');
const OS_LOGO_DIR = join('public', 'logos', 'os');

let failed = false;

function fail(message) {
  console.error(`FAIL: ${message}`);
  failed = true;
}

// 1. Every OS slug is in OS_LOGOS or OS_NO_LOGO_FOUND, never both, never neither.
const osSlugs = readdirSync(OS_CONTENT_DIR)
  .filter((f) => f.endsWith('.md'))
  .map((f) => f.replace(/\.md$/, ''));
const noLogoSet = new Set(OS_NO_LOGO_FOUND);
const dupes = OS_NO_LOGO_FOUND.filter((s, i) => OS_NO_LOGO_FOUND.indexOf(s) !== i);
if (dupes.length) fail(`OS_NO_LOGO_FOUND has duplicate entries: ${dupes.join(', ')}`);

for (const slug of osSlugs) {
  const hasLogo = slug in OS_LOGOS;
  const markedNone = noLogoSet.has(slug);
  if (hasLogo && markedNone) {
    fail(`${slug} is in both OS_LOGOS and OS_NO_LOGO_FOUND — pick one`);
  } else if (!hasLogo && !markedNone) {
    fail(
      `${slug} has no logo decision recorded — add it to OS_LOGOS with a real logo, or to ` +
        `OS_NO_LOGO_FOUND in src/lib/osLogos.ts with a comment on what you checked`
    );
  }
}
// Entries in the lists that no longer correspond to a real OS file (renamed/removed) are stale, not silent failures elsewhere.
const osSlugSet = new Set(osSlugs);
for (const slug of OS_NO_LOGO_FOUND) {
  if (!osSlugSet.has(slug)) fail(`OS_NO_LOGO_FOUND references "${slug}", which no longer exists under ${OS_CONTENT_DIR}`);
}
for (const slug of Object.keys(OS_LOGOS)) {
  if (!osSlugSet.has(slug)) fail(`OS_LOGOS references "${slug}", which no longer exists under ${OS_CONTENT_DIR}`);
}

// 2. Every OS_LOGOS / TOOL_LOGOS path points at a real file.
for (const [slug, logo] of Object.entries(OS_LOGOS)) {
  const filePath = join('public', ...logo.path.split('/').filter(Boolean));
  if (!existsSync(filePath)) fail(`OS_LOGOS["${slug}"] points at ${logo.path}, which doesn't exist`);
}
for (const [slug, logo] of Object.entries(TOOL_LOGOS)) {
  const filePath = join('public', ...logo.path.split('/').filter(Boolean));
  if (!existsSync(filePath)) fail(`TOOL_LOGOS["${slug}"] points at ${logo.path}, which doesn't exist`);
}

// 3. No orphaned logo files sitting in public/logos/{os,tools} unreferenced by anything.
const referencedOsFiles = new Set(Object.values(OS_LOGOS).map((l) => l.path.split('/').pop()));
for (const file of readdirSync(OS_LOGO_DIR)) {
  if (!referencedOsFiles.has(file)) fail(`${join(OS_LOGO_DIR, file)} isn't referenced by any OS_LOGOS entry — orphaned asset?`);
}
const referencedToolFiles = new Set(Object.values(TOOL_LOGOS).map((l) => l.path.split('/').pop()));
for (const file of readdirSync(TOOL_LOGO_DIR)) {
  if (!referencedToolFiles.has(file)) fail(`${join(TOOL_LOGO_DIR, file)} isn't referenced by any TOOL_LOGOS entry — orphaned asset?`);
}

if (failed) {
  console.error(`\n${osSlugs.length} OS entries checked, ${Object.keys(TOOL_LOGOS).length} tool logos checked. See failures above.`);
  process.exit(1);
}
console.log(
  `OK: all ${osSlugs.length} OS entries accounted for (${Object.keys(OS_LOGOS).length} logo'd, ${OS_NO_LOGO_FOUND.length} confirmed none); ` +
    `${Object.keys(TOOL_LOGOS).length} tool logos verified, no orphaned assets.`
);
