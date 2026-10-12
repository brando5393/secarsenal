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

Not configured in code — enforced by a zone-level Cloudflare Rate
Limiting rule scoped to `http.host eq "mcp.secarsenal.org"`: 20
requests per 10 seconds per client IP (`characteristics: ["cf.colo.id",
"ip.src"]` — Cloudflare requires `cf.colo.id` in the characteristics
list; counting is colo-scoped, not global), blocking for 10 seconds
past that. 10s is the tightest counting/mitigation window the Free
plan allows; a Durable-Object token-bucket is a documented fallback
only if this turns out too coarse once there's real traffic to judge
by. The `workers.dev` subdomain for this script is disabled, so this
rule can't be bypassed by hitting that URL directly instead.

## Known accepted advisory

The earlier dev-only `sharp`/`miniflare` advisory is resolved (wrangler
4.149 pulls a patched sharp). What remains is GHSA-6qxp-vccf-f47h in the
MCP SDK's OAuth *client*, which the advisory says does not affect
SDK-built MCP servers like this one; patched releases exist but
`agents` pins the SDK exactly, so it is carried in
`audit-allowlist.json` with a reason and a short expiry. CI runs
`node ../scripts/audit-gate.mjs --omit-dev --allowlist=./audit-allowlist.json`.

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
