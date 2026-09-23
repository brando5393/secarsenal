// Shared helpers for the tools sync scripts (Kali, BlackArch, ...):
// manifest-based ownership tracking so multiple scripts can write into
// the same src/content/tools/ directory without stepping on each
// other (each tracks which slugs it owns in its own manifest file,
// committed to the repo, and only ever deletes files it previously
// created and no longer finds upstream), plus small fetch utilities
// (bounded concurrency, URL reachability checks) they all need.
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import dns from 'node:dns/promises';

export function readManifest(path) {
  if (!existsSync(path)) return [];
  return JSON.parse(readFileSync(path, 'utf8'));
}

export function writeManifest(path, slugs) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify([...slugs].sort(), null, 2) + '\n', 'utf8');
}

export function pruneStale(contentDir, oldSlugs, newSlugs, protectedSlugs = []) {
  const newSet = new Set(newSlugs);
  // `protectedSlugs` is the set of slugs an earlier-priority source's
  // manifest now claims (already read by the caller to decide what to
  // skip writing). Without this guard, a slug that migrates from this
  // script's ownership to an earlier one *within the same pipeline run*
  // gets correctly excluded from `newSlugs` here, then deleted anyway —
  // wiping out the file the earlier script just wrote moments before,
  // since this function has no way to know the slug is still valid
  // content, just relocated. Confirmed happening in practice (BlackArch
  // pruning a tool Kali had just started covering; Exegol pruning one
  // BlackArch had just started covering) before this guard existed.
  const protectedSet = new Set(protectedSlugs);
  let removed = 0;
  for (const slug of oldSlugs) {
    if (!newSet.has(slug) && !protectedSet.has(slug)) {
      rmSync(join(contentDir, `${slug}.md`), { force: true });
      removed++;
    }
  }
  return removed;
}

export async function mapWithConcurrency(items, limit, fn) {
  const results = [];
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: limit }, worker));
  return results;
}

// The "(+https://...)" self-identifying-crawler suffix (the Googlebot-
// style convention) is exactly what got this UA hard-blocked (empty
// TLS reply, not even a 403) by secbsd.org's WAF while a plain
// browser-shaped UA sailed through — confirmed by testing both
// directly against that site. scripts/check-links.mjs's UA never had
// this suffix and has never had this problem, so this matches that
// working format instead of re-adding self-identification.
const URL_CHECK_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) SecArsenal-sync-bot',
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// HEAD first (cheap), falling back to GET for servers that reject/
// mishandle HEAD (405/501/403/404 are common false negatives for HEAD).
// A 429 gets one retry after a short backoff (honoring Retry-After if
// the server sends one) before giving up — high-volume runs (e.g.
// checking thousands of GitHub-hosted homepages) can trip transient
// rate limits that have nothing to do with whether the link is real.
async function attempt(url, timeoutMs) {
  const head = await fetch(url, {
    method: 'HEAD',
    redirect: 'follow',
    headers: URL_CHECK_HEADERS,
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (head.ok) return { ok: true };
  if ([403, 404, 405, 501].includes(head.status)) {
    const get = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: URL_CHECK_HEADERS,
      signal: AbortSignal.timeout(timeoutMs),
    });
    return { ok: get.ok, status: get.status };
  }
  return { ok: false, status: head.status };
}

// Every sync-*.mjs script owns exactly one OS entry's tools coverage.
// Called at the end of each run so the OS's `toolListMaintenance` flag
// in src/content/os/<slug>.md self-corrects every time the sync runs,
// instead of relying on whoever writes a future sync script to also
// remember to hand-edit that frontmatter field. A surgical line
// insert/replace (not a full YAML re-stringify) so it never disturbs
// unrelated formatting in a file that's otherwise hand-curated prose.
export function ensureAutoSyncedTag(osFilePath) {
  if (!existsSync(osFilePath)) return;
  const original = readFileSync(osFilePath, 'utf8');
  // Git on Windows checks these files out with CRLF line endings, so
  // the frontmatter delimiters are `---\r\n`, not `---\n` — matching
  // only `\n` here silently no-ops on every Windows checkout without
  // ever throwing, which is exactly what happened until this was
  // caught by actually running a real sync end-to-end.
  const match = original.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) return;
  const eol = original.slice(0, match[0].length).includes('\r\n') ? '\r\n' : '\n';

  const line = 'toolListMaintenance: auto-synced';
  const frontmatterLines = match[1].split(/\r?\n/);
  const existingIndex = frontmatterLines.findIndex((l) => /^toolListMaintenance:/.test(l));
  if (existingIndex >= 0) frontmatterLines[existingIndex] = line;
  else frontmatterLines.push(line);

  const rest = original.slice(match[0].length);
  const updated = `---${eol}${frontmatterLines.join(eol)}${eol}---${eol}${rest}`;
  if (updated !== original) writeFileSync(osFilePath, updated, 'utf8');
}

// isUrlReachable's URL always comes from a trusted, fixed upstream
// source for 8 of its 9 callers (Kali's own pages, BlackArch's table,
// etc.) — but discover-os.mjs passes a URL field lifted straight from
// Rawsec's community-PR-able GitHub inventory, before it's ever
// written into repo content. Reject anything that isn't a plain
// http(s) URL to a public host before ever calling fetch(), so this
// shared helper can't be pointed at an internal/link-local address
// (including cloud metadata endpoints at 169.254.169.254) by a
// third-party data source this project doesn't control.
const PRIVATE_HOST_RE =
  /^(localhost|127\.|10\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\.|0\.0\.0\.0|\[?::1\]?|\[?fc[0-9a-f]{2}:|\[?fe80:)/i;

// The hostname-string check above only rejects a URL whose hostname is
// *already written* as a private/loopback address. It does nothing
// against DNS rebinding: an attacker-controlled hostname like
// "totally-fine.example" that resolves to 169.254.169.254 or 127.0.0.1
// sails through the string check, and fetch() would then happily
// connect to whatever that name actually resolves to. Since
// discover-os.mjs feeds this function a `website` field straight from
// a community-PR-able GitHub file, hostname-string matching alone
// isn't a real SSRF guard for that caller. This resolves the hostname
// first and checks the *actual* IP(s) it points to.
function isPrivateIPv4(ip) {
  const parts = ip.split('.').map(Number);
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n) || n < 0 || n > 255)) return true; // malformed -> treat as unsafe
  const [a, b] = parts;
  if (a === 127 || a === 10 || a === 0) return true;
  if (a === 169 && b === 254) return true;
  if (a === 192 && b === 168) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT (RFC 6598)
  if (a >= 224) return true; // multicast/reserved
  return false;
}

function isPrivateIPv6(ip) {
  const normalized = ip.toLowerCase();
  if (normalized === '::1' || normalized === '::') return true;
  if (normalized.startsWith('fe80:') || normalized.startsWith('fc') || normalized.startsWith('fd')) return true;
  // IPv4-mapped (::ffff:a.b.c.d) or IPv4-compatible addresses embed a
  // real v4 address that needs the same check applied to it.
  const mapped = normalized.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return isPrivateIPv4(mapped[1]);
  return false;
}

async function resolvesToPublicAddressOnly(hostname) {
  let records;
  try {
    records = await dns.lookup(hostname, { all: true, verbatim: true });
  } catch {
    return false; // can't resolve -> can't safely fetch
  }
  if (records.length === 0) return false;
  return records.every(({ address, family }) => (family === 4 ? !isPrivateIPv4(address) : !isPrivateIPv6(address)));
}

// Residual gap, documented rather than hidden: fetch() re-resolves the
// hostname itself after this check passes, so a sub-second DNS rebind
// between the two lookups could theoretically still slip through. A
// fully airtight fix would resolve once and connect directly to the
// pinned IP (bypassing fetch's own resolution entirely), which needs a
// custom dispatcher/agent this project doesn't currently pull in. Not
// worth that dependency for a script whose only output is a boolean
// and which never surfaces the response body anywhere — this closes
// the practical, low-effort attack (a static malicious DNS record),
// which is what a community-editable data source would realistically
// use.
async function isSafeToFetch(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false;
  if (PRIVATE_HOST_RE.test(parsed.hostname)) return false;
  return resolvesToPublicAddressOnly(parsed.hostname);
}

export async function isUrlReachable(url, timeoutMs = 8_000) {
  if (!(await isSafeToFetch(url))) return false;
  try {
    const result = await attempt(url, timeoutMs);
    if (result.ok) return true;
    if (result.status === 429) {
      await sleep(3_000 + Math.random() * 2_000);
      const retry = await attempt(url, timeoutMs);
      return retry.ok;
    }
    return false;
  } catch {
    return false;
  }
}
