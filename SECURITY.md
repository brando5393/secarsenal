# Security

## Site security model

SecArsenal ships as a fully static site (`output: 'static'` in
`astro.config.mjs`): no server-side runtime, no database, no user
accounts, no comments, no file uploads. This is a deliberate choice —
it keeps the deployed attack surface limited to static file serving
plus the headers below.

## Required response headers (apply at the hosting layer once deployed)

| Header | Value |
|---|---|
| `Content-Security-Policy` | `default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none';` |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `geolocation=(), microphone=(), camera=()` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` (once a custom domain + TLS is in place) |

A baseline CSP is also set via a `<meta http-equiv>` tag in
`src/layouts/BaseLayout.astro` for defense-in-depth while running
locally with no server to emit real headers, but the header above is
the authoritative version and should be set at the hosting layer
(e.g. a `public/_headers` file for Cloudflare Pages, or a CloudFront
response headers policy on AWS).

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
- The freshness-check (`.github/workflows/freshness-check.yml`) and
  tools sync (`.github/workflows/sync-tools.yml`) workflows both only
  ever open an issue/PR for human review; neither publishes content
  changes automatically.
- The sync scripts (`scripts/sync-kali-tools.mjs`,
  `scripts/sync-blackarch-tools.mjs`) only read each source's own
  published pages over HTTPS and write local Markdown files — no
  credentials, no writes to any third-party system, and both run
  read-only against sites whose `robots.txt` explicitly permits
  crawling. Each tracks which files it owns in its own manifest
  (`scripts/manifests/*.json`) and only ever deletes files it
  previously created itself, so the two sources can't clobber each
  other's entries when run independently or out of order.
- Outbound links to third-party tool/OS sites use
  `rel="noopener noreferrer"`.

## Reporting a vulnerability

Please open a private security advisory on the GitHub repository (once
published) rather than a public issue, or contact the maintainer
directly.
