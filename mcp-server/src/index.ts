import { McpAgent } from 'agents/mcp';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { Env } from './env';

interface CatalogEntry {
  slug: string;
  type: 'os' | 'tool';
  name: string;
  tagline: string;
  category?: string;
  categories?: string[];
  platforms?: string[];
  team?: string;
  docsUrl: string;
  repoUrl?: string;
  downloadUrl?: string;
  lastVerified: string;
}

const CATALOG_URL = 'https://secarsenal.org/catalog.json';
const CATALOG_KV_KEY = 'catalog';
// Safety-net TTL only -- the cron trigger below normally keeps this fresh
// well before it would expire; this just bounds staleness if a cron run
// ever fails.
const CATALOG_KV_TTL_SECONDS = 60 * 60 * 6;
const MAX_RESULTS = 50;
// Every real name/slug/category in the catalog is well under 100 chars.
// 200 leaves headroom for anything legitimate while blocking a caller
// from sending a multi-KB string purely to inflate what recordUsage
// logs (Analytics Engine's blob size cap) or to do needless work in the
// substring-match filters below -- this is a public, unauthenticated
// endpoint, so input size is a real (if minor) lever an abusive caller
// has, not just a theoretical one.
const boundedString = (description: string) => z.string().max(200).optional().describe(description);
const boundedSlug = (description: string) => z.string().max(200).describe(description);

async function refreshCatalog(env: Env): Promise<CatalogEntry[]> {
  const res = await fetch(CATALOG_URL);
  if (!res.ok) throw new Error(`catalog.json fetch failed: ${res.status}`);
  const data = (await res.json()) as CatalogEntry[];
  await env.CATALOG_KV.put(CATALOG_KV_KEY, JSON.stringify(data), {
    expirationTtl: CATALOG_KV_TTL_SECONDS,
  });
  return data;
}

async function loadCatalog(env: Env): Promise<CatalogEntry[]> {
  const cached = await env.CATALOG_KV.get<CatalogEntry[]>(CATALOG_KV_KEY, 'json');
  if (cached) return cached;
  return refreshCatalog(env);
}

// Aggregate only: tool name + the params it was called with. Never an IP
// or any other caller identity -- matches the site's own minimal-data
// posture (see SECURITY.md / privacy.astro). Feeds a future public
// "trending tools/OS" page; not required for that page to exist yet.
//
// Analytics Engine caps a data point's total blob size at 16KB; without
// the MAX_QUERY_LEN guard on tool inputs below, a caller could send an
// oversized string specifically to blow that limit. writeDataPoint can
// throw synchronously on an oversized/malformed payload, and since this
// runs inline in every tool handler (not backgrounded), an uncaught
// throw here would fail the actual tool call over a logging problem --
// wrapped so a bad analytics write never breaks the real response.
function recordUsage(env: Env, tool: string, params: Record<string, unknown>) {
  try {
    env.ANALYTICS?.writeDataPoint({
      blobs: [tool, JSON.stringify(params)],
      indexes: [tool],
    });
  } catch {
    // Logging is best-effort; the tool call itself must still succeed.
  }
}

function matchesQuery(entry: CatalogEntry, query?: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  return entry.name.toLowerCase().includes(q) || entry.tagline.toLowerCase().includes(q);
}

export class SecArsenalMCP extends McpAgent<Env, unknown, {}> {
  server = new McpServer({ name: 'secarsenal', version: '1.0.0' });

  async init() {
    this.server.tool(
      'search_tools',
      {
        query: boundedString('Free-text match against name/tagline'),
        category: boundedString('Exact category tag, e.g. "recon"'),
        platform: boundedString('Exact platform, e.g. "Linux"'),
      },
      async ({ query, category, platform }) => {
        recordUsage(this.env, 'search_tools', { query, category, platform });
        const catalog = await loadCatalog(this.env);
        const results = catalog
          .filter((e) => e.type === 'tool')
          .filter((e) => matchesQuery(e, query))
          .filter((e) => !category || e.categories?.includes(category))
          .filter((e) => !platform || e.platforms?.includes(platform))
          .slice(0, MAX_RESULTS);
        return { content: [{ type: 'text', text: JSON.stringify(results, null, 2) }] };
      },
    );

    this.server.tool(
      'get_tool',
      { slug: boundedSlug('Tool slug, e.g. "nmap"') },
      async ({ slug }) => {
        recordUsage(this.env, 'get_tool', { slug });
        const catalog = await loadCatalog(this.env);
        const entry = catalog.find((e) => e.type === 'tool' && e.slug === slug);
        return {
          content: [{ type: 'text', text: entry ? JSON.stringify(entry, null, 2) : `No tool found for slug "${slug}"` }],
        };
      },
    );

    this.server.tool(
      'search_os',
      {
        query: boundedString('Free-text match against name/tagline'),
        category: boundedString('One of: general-purpose, wireless, forensics, specialized'),
        team: boundedString('One of: red, blue'),
      },
      async ({ query, category, team }) => {
        recordUsage(this.env, 'search_os', { query, category, team });
        const catalog = await loadCatalog(this.env);
        const results = catalog
          .filter((e) => e.type === 'os')
          .filter((e) => matchesQuery(e, query))
          .filter((e) => !category || e.category === category)
          .filter((e) => !team || e.team === team)
          .slice(0, MAX_RESULTS);
        return { content: [{ type: 'text', text: JSON.stringify(results, null, 2) }] };
      },
    );

    this.server.tool(
      'get_os',
      { slug: boundedSlug('OS slug, e.g. "kali-linux"') },
      async ({ slug }) => {
        recordUsage(this.env, 'get_os', { slug });
        const catalog = await loadCatalog(this.env);
        const entry = catalog.find((e) => e.type === 'os' && e.slug === slug);
        return {
          content: [{ type: 'text', text: entry ? JSON.stringify(entry, null, 2) : `No OS found for slug "${slug}"` }],
        };
      },
    );

    this.server.tool('list_categories', {}, async () => {
      recordUsage(this.env, 'list_categories', {});
      const catalog = await loadCatalog(this.env);
      const osCategories = new Set<string>();
      const toolCategories = new Set<string>();
      for (const e of catalog) {
        if (e.type === 'os' && e.category) osCategories.add(e.category);
        if (e.type === 'tool') e.categories?.forEach((c) => toolCategories.add(c));
      }
      const payload = { os: [...osCategories].sort(), tools: [...toolCategories].sort() };
      return { content: [{ type: 'text', text: JSON.stringify(payload, null, 2) }] };
    });
  }
}

export default {
  fetch(request: Request, env: Env, ctx: ExecutionContext) {
    // .serve()'s default lookup is the literal binding name "MCP_OBJECT" --
    // has to be told explicitly since wrangler.jsonc's binding is named
    // after the class instead (see wrangler.jsonc's comment on why).
    return SecArsenalMCP.serve('/mcp', { binding: 'SecArsenalMCP' }).fetch(request, env, ctx);
  },
  async scheduled(_event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(refreshCatalog(env));
  },
};
