// CI dependency-audit gate. Replaces a bare `npm audit --audit-level=high`.
//
// Fails on any high/critical advisory in the full dependency tree
// (dev dependencies included, deliberately: the sync/discover workflows
// run `npm ci` plus scripts under a write-scoped token, so a compromised
// dev dependency is a real risk here, not a hypothetical one) UNLESS the
// advisory is listed in scripts/audit-allowlist.json with a written
// reason and an expiry date. This exists because npm audit has no native
// per-advisory ignore, and some advisories genuinely have no fix yet --
// the choice is then between a gate that's permanently red, a gate that
// ignores every dev-dependency advisory forever (`--omit=dev`), or one
// named, reasoned, expiring exception. This is the third.
//
// Gating is on the advisories themselves, not the per-package rows npm
// prints: a package like tailwindcss shows up as "high" only because it
// *depends on* a vulnerable package, and carries no advisory of its own.
// Counting those propagated rows would make every allowlisted advisory
// re-fail through each package above it in the tree.
//
// Usage (run from the directory that holds the package.json to audit):
//   node scripts/audit-gate.mjs                       full tree, default allowlist
//   node ../scripts/audit-gate.mjs --omit-dev --allowlist=./audit-allowlist.json
// The second form is how mcp-server/ uses it: its deploy workflow audits
// only runtime dependencies (the deployed Worker bundle) against its own
// allowlist, so an exception for one project can never silently cover
// the other. Unknown flags are an error rather than ignored, because a
// typo'd flag quietly weakening a security gate is worse than a failure.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const KNOWN_FLAGS = /^(--omit-dev|--allowlist=.+)$/;
const args = process.argv.slice(2);
const unknown = args.filter((a) => !KNOWN_FLAGS.test(a));
if (unknown.length > 0) {
  console.error(`FAIL: unknown argument(s): ${unknown.join(' ')}`);
  process.exit(2);
}
const omitDev = args.includes('--omit-dev');
const allowlistArg = args.find((a) => a.startsWith('--allowlist='))?.slice('--allowlist='.length);

const ALLOWLIST_PATH = allowlistArg ? resolve(allowlistArg) : new URL('./audit-allowlist.json', import.meta.url);
const GATED = new Set(['high', 'critical']);
const GHSA_RE = /GHSA-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}/i;

function runAudit() {
  // npm exits non-zero whenever it finds anything, so the exit code is
  // not a signal here -- only the JSON on stdout is. On Windows `npm` is
  // npm.cmd, which Node only spawns through a shell; the arguments are
  // fixed literals, so there is nothing to inject into.
  try {
    return execFileSync('npm', ['audit', '--json', ...(omitDev ? ['--omit=dev'] : [])], {
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
      shell: process.platform === 'win32',
    });
  } catch (err) {
    if (err.stdout) return err.stdout;
    throw err;
  }
}

const audit = JSON.parse(runAudit());
if (audit.error) {
  console.error(`FAIL: npm audit itself errored (${audit.error.summary ?? audit.error.code}). Gate cannot vouch for the dependency tree.`);
  process.exit(1);
}

const allowlist = JSON.parse(readFileSync(ALLOWLIST_PATH, 'utf8'));
const today = new Date().toISOString().slice(0, 10);

// One entry per distinct advisory, wherever it appears in the tree.
const advisories = new Map();
for (const vuln of Object.values(audit.vulnerabilities ?? {})) {
  for (const via of vuln.via) {
    if (typeof via !== 'object') continue; // string = "inherits from another package"
    const id = via.url?.match(GHSA_RE)?.[0]?.toUpperCase();
    if (!id || !GATED.has(via.severity)) continue;
    if (!advisories.has(id)) advisories.set(id, { id, package: via.name, severity: via.severity, title: via.title });
  }
}

const allowed = new Map(allowlist.map((a) => [a.id.toUpperCase(), a]));
const failures = [];
const suppressed = [];

for (const adv of advisories.values()) {
  const entry = allowed.get(adv.id);
  if (!entry) {
    failures.push(`${adv.severity.toUpperCase()}  ${adv.id}  ${adv.package}: ${adv.title}`);
  } else if (entry.expires < today) {
    failures.push(`EXPIRED ALLOWLIST ENTRY (${entry.expires})  ${adv.id}  ${adv.package}: re-review it, then renew or remove it in scripts/audit-allowlist.json`);
  } else {
    suppressed.push(`${adv.id}  ${adv.package}  (allowlisted until ${entry.expires}, reviewed ${entry.reviewed})`);
  }
}

// An entry whose advisory no longer shows up means the underlying issue
// was fixed (or the dependency removed): the exception should be deleted
// so it can't quietly cover a different future problem.
const stale = allowlist.filter((a) => !advisories.has(a.id.toUpperCase()));

if (suppressed.length > 0) {
  console.log('Allowlisted (known, reasoned, expiring):');
  for (const s of suppressed) console.log(`  - ${s}`);
}
if (stale.length > 0) {
  console.log('Stale allowlist entries (advisory no longer present; delete them):');
  for (const a of stale) console.log(`  - ${a.id} (${a.package})`);
}

if (failures.length > 0) {
  console.error(`\nFAIL: ${failures.length} high/critical advisor${failures.length === 1 ? 'y' : 'ies'} not covered by the allowlist:`);
  for (const f of failures) console.error(`  - ${f}`);
  console.error('\nRun `npm audit` for the dependency paths. Fix by upgrading, or, only if there is genuinely no fix and the code path is unreachable, add a reasoned, expiring entry to scripts/audit-allowlist.json.');
  process.exit(1);
}

console.log(`OK: no un-allowlisted high/critical advisories (${advisories.size} found, ${suppressed.length} allowlisted).`);
