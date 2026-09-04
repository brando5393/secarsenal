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
  Kali tools sync (`.github/workflows/sync-kali-tools.yml`) workflows
  both only ever open an issue/PR for human review; neither publishes
  content changes automatically.
- The Kali tools sync script only reads kali.org's own published pages
  over HTTPS and writes local Markdown files — it has no credentials,
  makes no writes to any third-party system, and runs read-only against
  a site whose `robots.txt` explicitly permits crawling.
- Outbound links to third-party tool/OS sites use
  `rel="noopener noreferrer"`.

## Reporting a vulnerability

Please open a private security advisory on the GitHub repository (once
published) rather than a public issue, or contact the maintainer
directly.
