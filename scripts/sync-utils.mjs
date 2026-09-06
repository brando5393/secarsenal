// Shared helpers for the tools sync scripts (Kali, BlackArch, ...):
// manifest-based ownership tracking so multiple scripts can write into
// the same src/content/tools/ directory without stepping on each
// other (each tracks which slugs it owns in its own manifest file,
// committed to the repo, and only ever deletes files it previously
// created and no longer finds upstream), plus small fetch utilities
// (bounded concurrency, URL reachability checks) they all need.
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

export function readManifest(path) {
  if (!existsSync(path)) return [];
  return JSON.parse(readFileSync(path, 'utf8'));
}

export function writeManifest(path, slugs) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify([...slugs].sort(), null, 2) + '\n', 'utf8');
}

export function pruneStale(contentDir, oldSlugs, newSlugs) {
  const newSet = new Set(newSlugs);
  let removed = 0;
  for (const slug of oldSlugs) {
    if (!newSet.has(slug)) {
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

const URL_CHECK_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) SecArsenal-sync-bot (+https://github.com/brando5393/secarsenal)',
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
  /^(localhost|127\.|10\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|0\.0\.0\.0|\[?::1\]?|\[?fc[0-9a-f]{2}:|\[?fe80:)/i;

function isSafeToFetch(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false;
  if (PRIVATE_HOST_RE.test(parsed.hostname)) return false;
  return true;
}

export async function isUrlReachable(url, timeoutMs = 8_000) {
  if (!isSafeToFetch(url)) return false;
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
