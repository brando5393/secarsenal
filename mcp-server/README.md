# secarsenal-mcp

A public, read-only [MCP](https://modelcontextprotocol.io) server for the
[SecArsenal](https://secarsenal.org) catalog, deployed as a Cloudflare
Worker at `https://mcp.secarsenal.org/mcp`. This is a separate deployment
from the main Astro site — its own `package.json`/`wrangler.jsonc`, own CI
job (`.github/workflows/deploy-mcp.yml`), own Cloudflare Worker.

## Tools

- `search_tools({ query?, category?, platform? })`
- `get_tool({ slug })`
- `search_os({ query?, category?, team? })`
- `get_os({ slug })`
- `list_categories()`

All read-only — this server never writes anything back to the catalog.

## Data flow

`src/index.ts` never talks to the site's content collections directly. It
polls `https://secarsenal.org/catalog.json` (a public export the main site
publishes at build time — see `src/pages/catalog.json.ts` in the repo root)
on an hourly Cron Trigger, caching the parsed result in the `CATALOG_KV`
namespace. Tool calls read from that cache, so they never block on origin
fetches and a site redeploy never affects this Worker's uptime.

## Usage analytics

Each tool call logs its tool name and the params it was called with (never
an IP or any other caller identity) to the `ANALYTICS` Analytics Engine
binding — aggregate counts only, matching the main site's minimal-data
posture (see the root `SECURITY.md`). Nothing currently reads this data
back out; a public "trending tools" page fed by it is a natural follow-up,
not yet built.

## Rate limiting

Not configured in code. Apply a Cloudflare Rate Limiting rule to the
`mcp.secarsenal.org/*` route from the dashboard (or via Terraform/the API)
— start around 30 req/min per IP. A Durable-Object token-bucket is a
fallback only if the dashboard rule turns out too coarse.

## Known accepted advisory

`npm audit` flags a high-severity `sharp`/libheif issue reachable only
through `wrangler`'s local-dev simulator (`miniflare`) — a devDependency
never bundled into the deployed Worker. CI runs
`npm audit --omit=dev --audit-level=high`, which is clean; the full
(including dev) audit will keep showing this until wrangler ships a fix
upstream.

## First-time setup

```sh
cd mcp-server
npm install
npx wrangler kv namespace create CATALOG_KV
# paste the returned id into wrangler.jsonc's kv_namespaces[0].id
npx wrangler dev   # exercise tools locally, e.g. with the MCP inspector:
                    #   npx @modelcontextprotocol/inspector@latest
npx wrangler deploy
```

Deploys after that go through `.github/workflows/deploy-mcp.yml` on every
push to `master` that touches this directory — it needs a
`CLOUDFLARE_API_TOKEN` repo secret (Workers Scripts: Edit permission),
which has to be created by hand in the Cloudflare dashboard and added to
the GitHub repo's secrets; nothing here creates it automatically.
