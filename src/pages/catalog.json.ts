import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

// Public, machine-readable export of both collections. Unlike rss.xml.ts
// (OS only, editorial feed) this covers tools too, since it's meant as a
// stable data source for external consumers — most notably the MCP server
// under mcp-server/, which polls this endpoint on a cron trigger rather
// than scraping rendered pages. Anyone else is free to consume it too.
export async function GET(_context: APIContext) {
  const [os, tools] = await Promise.all([getCollection('os'), getCollection('tools')]);

  const osEntries = os.map((entry) => ({
    slug: entry.id,
    type: 'os' as const,
    name: entry.data.name,
    tagline: entry.data.tagline,
    category: entry.data.category,
    team: entry.data.team,
    docsUrl: entry.data.docsUrl,
    repoUrl: entry.data.repoUrl,
    downloadUrl: entry.data.downloadUrl,
    lastVerified: entry.data.lastVerified.toISOString(),
  }));

  const toolEntries = tools.map((entry) => ({
    slug: entry.id,
    type: 'tool' as const,
    name: entry.data.name,
    tagline: entry.data.tagline,
    categories: entry.data.categories,
    platforms: entry.data.platforms,
    docsUrl: entry.data.docsUrl,
    repoUrl: entry.data.repoUrl,
    downloadUrl: entry.data.downloadUrl,
    lastVerified: entry.data.lastVerified.toISOString(),
  }));

  return new Response(JSON.stringify([...osEntries, ...toolEntries]), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
