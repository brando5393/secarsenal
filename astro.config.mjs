// @ts-check
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import matter from 'gray-matter';

// @astrojs/sitemap doesn't know about content-collection frontmatter, so
// `lastmod` is blank by default for every URL — and per current Google
// guidance, lastmod is the one sitemap field it still actually uses (to
// decide whether a known URL is worth recrawling), while priority/
// changefreq are ignored outright. Every os/tools entry already tracks a
// genuine `lastVerified` date for the freshness-check workflow, so this
// reads that same frontmatter (same readdirSync + gray-matter pattern as
// scripts/check-links.mjs) to key it by URL for sitemap's serialize()
// hook below, rather than fabricating a date for pages that don't have
// one.
function loadLastVerifiedByUrl() {
  const map = new Map();
  for (const collection of ['os', 'tools']) {
    const dir = join('src', 'content', collection);
    for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
      const { data } = matter(readFileSync(join(dir, file), 'utf8'));
      const slug = file.replace(/\.md$/, '');
      map.set(`https://secarsenal.org/${collection}/${slug}/`, data.lastVerified);
    }
  }
  return map;
}

const lastVerifiedByUrl = loadLastVerifiedByUrl();

// https://astro.build/config
export default defineConfig({
  // No server runtime: the whole site ships as static files, which keeps
  // the deployed attack surface limited to headers + static file serving.
  output: 'static',
  site: 'https://secarsenal.org',
  integrations: [
    sitemap({
      serialize(item) {
        const lastVerified = lastVerifiedByUrl.get(item.url);
        if (lastVerified) {
          item.lastmod = new Date(lastVerified).toISOString();
        }
        return item;
      },
    }),
  ],
});
