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
| `Content-Security-Policy` | `default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none';` |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `geolocation=(), microphone=(), camera=()` |

`Strict-Transport-Security` (with `preload`) is deliberately not set
yet, even though `customHttp.yml` is live — it's a hard-to-reverse
commitment better made once the real `secarsenal.org` domain is
attached, not on the interim `*.amplifyapp.com` hostname. Add
`max-age=63072000; includeSubDomains; preload` to `customHttp.yml`
once that domain is live.

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

**If you add new client-side interactivity:** add it to
`public/scripts/site.js` (plain JS, not processed by Astro/TypeScript)
rather than an inline `<script>` in a page/layout — the latter will
silently fail under this CSP.

## Client-side storage (privacy)

The site has no backend, no analytics, and no cookies. Two small
`localStorage` entries are written directly in the visitor's own
browser and are never transmitted anywhere:

| Key | Purpose | Written by |
|---|---|---|
| `sa_disclaimer_ack_v1` | Remembers that the visitor dismissed the first-visit acknowledgment dialog, so it isn't shown again. The `_v1` suffix lets us force it to reappear in the future if the acknowledgment text changes materially — bump the suffix and old values stop matching. | `initAckModal()` in `public/scripts/site.js` |
| `sa_category_visits` | Per-category visit counts used only to re-rank the homepage's "top categories" widget toward what that visitor actually browses. | `trackCategoryVisit()` in `public/scripts/site.js` |

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
  `scripts/sync-tpot-tools.mjs`)
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

## Reporting a vulnerability

Please open a [private security advisory](https://github.com/brando5393/secarsenal/security/advisories/new)
on the GitHub repository rather than a public issue, or contact the
maintainer directly.
