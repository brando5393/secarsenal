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
  const frontmatterEnd = original.indexOf('\n---', 4);
  if (!original.startsWith('---\n') || frontmatterEnd === -1) return;

  const line = 'toolListMaintenance: auto-synced';
  let frontmatter = original.slice(4, frontmatterEnd);
  if (/^toolListMaintenance:.*$/m.test(frontmatter)) {
    frontmatter = frontmatter.replace(/^toolListMaintenance:.*$/m, line);
  } else {
    frontmatter = `${frontmatter}${frontmatter.endsWith('\n') ? '' : '\n'}${line}\n`;
  }

  const updated = `---\n${frontmatter}${original.slice(frontmatterEnd + 1)}`;
  if (updated !== original) writeFileSync(osFilePath, updated, 'utf8');
}

export async function isUrlReachable(url, timeoutMs = 8_000) {
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
