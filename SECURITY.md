# Security

## Site security model

SecArsenal ships as a fully static site (`output: 'static'` in
`astro.config.mjs`): no server-side runtime, no database, no user
accounts, no comments, no file uploads. This is a deliberate choice —
it keeps the deployed attack surface limited to static file serving
plus the headers below.

## Required response headers

Set at the hosting layer via `customHttp.yml` in the repo root — AWS
Amplify Hosting reads this file automatically on every build and
applies it to every response, no console configuration needed. This
was a documented "once deployed" TODO here that had gone stale: the
site went live on Amplify before this file was ever added, so every
response was missing all of these until it was.

| Header | Value |
|---|---|
| `Content-Security-Policy` | `default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'wasm-unsafe-eval'; object-src 'none'; base-uri 'self'; frame-ancestors 'none';` |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `geolocation=(), microphone=(), camera=()` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains` |

No `preload` directive: submitting to browsers' HSTS preload list is
effectively permanent (removal takes months even after reverting the
header), so that stays a separate, later decision once the
`secarsenal.org` domain/subdomain setup has proven stable long-term.
The header as set is fully reversible — just change or remove it.

A baseline CSP is also set via a `<meta http-equiv>` tag in
`src/layouts/BaseLayout.astro`, for defense-in-depth and so it's also
present under `astro dev`/`astro preview`, which don't read
`customHttp.yml` (that's an Amplify-hosting-specific mechanism) — the
header above is still the authoritative version once deployed.

## Client-side scripts and CSP

`script-src` is `'self'` with **no** `'unsafe-inline'`, deliberately —
we'd rather keep that protection against inline-script injection than
make CSP configuration easier for ourselves. That has one consequence
to know about: Astro's default `<script>` processing inlines small,
page-local scripts directly into that page's HTML for performance,
which our CSP then silently blocks from running at all (no error is
thrown; the listener just never attaches).

All interactive client-side behavior therefore lives in one file,
`public/scripts/site.js`, referenced from `BaseLayout.astro` via
`<script is:inline src="/scripts/site.js">`. Because it's in `public/`
and marked `is:inline`, Astro serves it byte-for-byte as a real
external same-origin file instead of running it through its bundler —
guaranteeing it's never inlined, so `script-src 'self'` covers it. Each
feature in that file feature-detects its own markup (e.g. checks for
`#filter-bar` before wiring up filter behavior) and no-ops on pages
that don't have it, rather than each page shipping its own script.

`script-src` also carries `'wasm-unsafe-eval'` — narrower than
`'unsafe-eval'` (which it does not otherwise grant: no string-`eval()`,
no `Function()` constructor, no CSP bypass for either), it permits only
WebAssembly compilation/instantiation. Pagefind's search index runs as
WASM in a Worker, and without this, `WebAssembly.instantiate()` throws
a CSP violation and full-text search silently stops working (the
per-page name-based filters in `public/scripts/site.js` keep working
regardless, since those never touch Pagefind) — caught by testing
search on the actual deployed site with the browser console open, not
just a local build.

**If you add new client-side interactivity:** add it to
`public/scripts/site.js` (plain JS, not processed by Astro/TypeScript)
rather than an inline `<script>` in a page/layout — the latter will
silently fail under this CSP.

## Client-side storage (privacy)

The site has no backend, no analytics, and no cookies. A small number
of `localStorage` entries are written directly in the visitor's own
browser and are never transmitted anywhere:

| Key | Purpose | Written by |
|---|---|---|
| `sa_disclaimer_ack_v1` | Remembers that the visitor dismissed the first-visit acknowledgment dialog, so it isn't shown again. The `_v1` suffix lets us force it to reappear in the future if the acknowledgment text changes materially — bump the suffix and old values stop matching. | `initAckModal()` in `public/scripts/site.js` |
| `sa_category_visits` | Per-category visit counts used only to re-rank the homepage's "top categories" widget toward what that visitor actually browses. | `trackCategoryVisit()` in `public/scripts/site.js` |
| `sa_a11y_prefs_v1` | The visitor's accessibility panel toggles (larger text, extra spacing, high contrast, always-underline links, strong focus outline, reduced motion), so they persist across visits. | `public/scripts/a11y.js` |

Both are read/write-wrapped in `try/catch` and no-op if storage is
unavailable (private browsing, disabled storage, etc.) rather than
blocking the page. Clearing browser data for the site resets both.

## Dependency hygiene

- Lockfile (`package-lock.json`) is committed.
- Run `npm audit` before every release; fix or accept-with-reason any
  high/critical finding before merging.
- Dependabot is configured (`.github/dependabot.yml`) for weekly
  dependency update PRs.

## Content integrity

- All content lives in version-controlled Markdown files reviewed via
  pull request — there is no CMS or admin panel that could be
  compromised to alter published content.
- The freshness-check (`.github/workflows/freshness-check.yml`), tools
  sync (`.github/workflows/sync-tools.yml`), and OS discovery
  (`.github/workflows/discover-os.yml`) workflows all only ever open an
  issue/PR for human review; none of them publishes content changes
  automatically.
- `scripts/discover-os.mjs` only reads a single public JSON file from
  [Rawsec's CyberSecurity Inventory](https://github.com/noraj/rawsec-cybersecurity-inventory)
  over HTTPS and writes new local Markdown files — it never edits or
  deletes an existing `src/content/os/*.md` entry, so it can't silently
  overwrite hand-curated content, and each drafted file is clearly
  marked with the fields it had to guess for a reviewer to verify.
- The sync scripts (`scripts/sync-kali-tools.mjs`,
  `scripts/sync-blackarch-tools.mjs`, `scripts/sync-remnux-tools.mjs`,
  `scripts/sync-tails-tools.mjs`, `scripts/sync-security-onion-tools.mjs`,
  `scripts/sync-archstrike-tools.mjs`, `scripts/sync-flare-vm-tools.mjs`,
  `scripts/sync-tpot-tools.mjs`, `scripts/sync-osint-framework-tools.mjs`,
  `scripts/sync-exegol-tools.mjs`, `scripts/sync-nethunter-store-tools.mjs`)
  only read each source's own
  published pages (plus, for ArchStrike, each package's own `PKGBUILD`
  on its GitHub repo, and for FLARE VM, each package's own nuspec on
  `mandiant/VM-Packages`) over HTTPS and write
  local Markdown files — no credentials, no writes to any third-party
  system, and each runs read-only against a site whose `robots.txt`
  explicitly permits
  crawling. Each tracks which files it owns in its own manifest
  (`scripts/manifests/*.json`) and only ever deletes files it
  previously created itself, so the two sources can't clobber each
  other's entries when run independently or out of order.
- Outbound links to third-party tool/OS sites use
  `rel="noopener noreferrer"`.
- `docsUrl`/`downloadUrl`/`repoUrl` (`src/content.config.ts`) require
  an explicit `http(s)://` scheme — `z.string().url()` alone accepts
  `javascript:...` as a "valid URL" since it only checks syntax, and
  every one of these fields renders straight into an `<a href>`.
- The homepage search (`initHomeSearch()` in `public/scripts/site.js`)
  builds results via `innerHTML` from Pagefind's indexed excerpt/title
  text. Astro escapes that text once at build time, but Pagefind
  extracts *decoded* plain text from the rendered page for its
  excerpts — so it's escaped a second time client-side
  (`escapeHtml`/`escapeExcerpt`) before insertion, re-allowing only
  Pagefind's own `<mark>` match-highlighting after escaping everything
  else.
- JSON-LD structured data (`BaseLayout.astro`'s `structuredData` prop)
  is inserted via `set:html` into a `<script type="application/ld+json">`
  tag — required, since `<script>` is an HTML "raw text" element and
  never decodes entities, so Astro's normal escaping would corrupt the
  JSON. Every less-than sign in the serialized data is replaced with
  its 6-character unicode escape first, which prevents a
  closing-`</script>`-tag breakout while staying valid inside any JSON
  string.

## Public JSON export and MCP server

`src/pages/catalog.json.ts` publishes both collections as public JSON —
no different in sensitivity from the rendered HTML pages, just
machine-readable. `mcp-server/` (a separate Cloudflare Worker, own
`package.json`/`wrangler.jsonc`/CI job) exposes the same data as
read-only MCP tools at `mcp.secarsenal.org`. Neither surface adds any
data beyond what's already public on the site, collects no PII, and
accepts no writes. The MCP route is rate-limited at the Cloudflare edge
(a zone-level Rate Limiting rule scoped to `mcp.secarsenal.org`, 20
requests per 10 seconds per client IP with a 10-second block — the
tightest counting/mitigation window available on the Free plan) since
it's reachable from the open internet with no auth; this bounds the
Durable-Object/compute cost a single abusive caller could otherwise
run up, not just abuse in the usual sense. Input strings on every tool
are capped at 200 characters, and usage logging can never fail the
underlying tool call (see `mcp-server/src/index.ts`). Aggregate
tool-call analytics (tool name + params only, never an IP or caller
identity) are logged to Workers Analytics Engine — see
`mcp-server/README.md`.

## Security audit log

**2026-09-23** — full pass over the site, all sync scripts, the MCP
server, CI workflows, and the Cloudflare zone's own settings (not just
this repo's config). Real findings, each independently verified before
fixing rather than assumed:

- **YAML frontmatter injection** in `scripts/discover-os.mjs`: the one
  spot where a candidate name (sourced from Rawsec's community-editable
  inventory) was interpolated raw into a block-literal scalar instead
  of through the existing `yamlString()`/`JSON.stringify` escaping used
  everywhere else in that file. A name containing a newline could have
  broken out of the intended field and injected sibling YAML keys into
  the drafted file, before a human ever reviews it. Fixed by switching
  that field to the same escaped-flow-scalar pattern as the rest.
- **SSRF via DNS rebinding** in `scripts/sync-utils.mjs`'s
  `isUrlReachable`: the SSRF guard only checked the hostname *string*
  against a private-IP pattern, which a hostname that resolves to a
  private/link-local address (rather than being one literally) sails
  through untouched. Reachable with attacker-influenced input via
  `discover-os.mjs`. Fixed by resolving the hostname and validating the
  actual returned IP(s), not just the written form — verified against
  both literal private IPs and a real public domain that resolves to
  `127.0.0.1` (`localtest.me`) before and after the fix.
- **No rate limiting actually existed** on `mcp.secarsenal.org` despite
  being documented as a requirement — confirmed via the Cloudflare API
  (`GET /zones/{id}/rulesets` returned no `http_ratelimit` phase at
  all) before creating one, rather than trusting the docs. See above.
- **MCP tool inputs had no length cap** and `recordUsage`'s Analytics
  Engine write wasn't fault-tolerant — an oversized `query` string
  could have both inflated logged data past Analytics Engine's blob
  limit and thrown synchronously inside a tool handler, failing the
  real response over a logging problem. Fixed with a 200-character cap
  on every string input and a try/catch around the analytics write.
- **Cloudflare zone TLS settings** (not this repo's code, but this
  project's infrastructure): SSL mode was `Full` rather than
  `Full (strict)` (doesn't validate the origin's certificate), "Always
  Use HTTPS" was off (a first-ever visit to the bare `http://` URL,
  before any HSTS header has been cached, wasn't redirected at the
  edge), and minimum TLS was 1.0 (deprecated, no compatibility need in
  2026). All three tightened; verified the live site and
  `mcp.secarsenal.org` both still resolve correctly afterward and that
  plain HTTP now redirects.
- **`style-src 'self' 'unsafe-inline'`** in the CSP: grepped every
  `.astro` file and the live HTML of five representative page types —
  zero inline `style` attributes or `<style>` blocks exist anywhere on
  the site. `'unsafe-inline'` for styles was dead weight, not a real
  requirement. Removed; verified with a real browser against a
  production build (console clear across page load, search, the
  accessibility panel, and the new `/mcp` page) rather than trusting a
  clean build alone — this project has been burned before by a CSP
  issue that only shows up at runtime, not build time (see
  `wasm-unsafe-eval` above).

Reviewed and found already correct, not touched: path traversal in the
tools-sync scripts (all eleven share one `kebab()`-style slugifier that
strips anything but `[a-z0-9]`, independently confirmed identical
across every file); no `pull_request_target` or unescaped
`github.event.*` interpolation in any workflow; `contents`/
`pull-requests` permissions scoped per-workflow to only what each
actually does; the Worker's `workers.dev` subdomain is disabled
(confirmed via the API, not assumed), so the zone-scoped rate limit
can't be bypassed by hitting that URL directly.

Not changed, and why: `scripts/check-links.mjs` has its own
unguarded `fetch()` rather than reusing `isUrlReachable`'s SSRF
protections — lower priority than `discover-os.mjs`'s case, since it
only ever processes URLs already reviewed and merged into
`src/content/os/`, not raw third-party input.

## Reporting a vulnerability

Please open a [private security advisory](https://github.com/brando5393/secarsenal/security/advisories/new)
on the GitHub repository rather than a public issue, or contact the
maintainer directly.
