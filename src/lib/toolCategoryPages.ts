import type { CollectionEntry } from 'astro:content';

// Shared by tools/index.astro, tools/[slug].astro, and
// tools/category/[category].astro: which raw category strings actually
// have a dedicated /tools/category/<slug> landing page. A category with
// only one tool has nothing to browse beyond that tool's own page, so
// tools/category/[category].astro's getStaticPaths skips it — this
// same threshold has to be checked before linking to one anywhere else,
// or the link 404s. Computed once per build (~4,000 entries) rather
// than recounting inside every one of the ~4,000 tool detail pages.
export function getLinkableToolCategories(entries: CollectionEntry<'tools'>[]): Set<string> {
  const counts = new Map<string, number>();
  for (const entry of entries) {
    for (const c of entry.data.categories) {
      counts.set(c, (counts.get(c) ?? 0) + 1);
    }
  }
  return new Set([...counts.entries()].filter(([, n]) => n >= 2).map(([c]) => c));
}
