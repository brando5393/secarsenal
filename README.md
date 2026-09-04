# SecArsenal

A searchable reference site for infosec professionals: pentesting
operating systems (Kali, Parrot, BlackArch, ...) and individual tools —
what they are, what they're for, brief getting-started notes, and links
to the official docs and download pages. Educational/informational only;
see [`/disclaimer`](./src/pages/disclaimer.astro).

## Stack

- **Astro** (static output, no server runtime — see `astro.config.mjs`)
- **Content collections** (`src/content.config.ts`) for the `os` and
  `tools` datasets, validated with Zod at build time
- **Pagefind** for static, client-side full-text search (indexed as a
  `postbuild` step — only available after `npm run build`, not in `dev`)

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build + Pagefind index
npm run preview   # serve the production build locally
npm run check-links   # verify every content entry's URLs are reachable
                       # and flag entries not verified in 180+ days
```

Requires Node >= 22.12 (see `engines` in `package.json`).

## Adding an OS or tool entry

Add a Markdown file under `src/content/os/` or `src/content/tools/`. The
frontmatter schema is defined in `src/content.config.ts` — the build
fails if a required field is missing or malformed. Every entry needs:

- `lastVerified` — the date you personally confirmed the URLs/details
  below are accurate
- `docsUrl` — the official documentation
- `downloadUrl` / `repoUrl` — where applicable

The Markdown body becomes the page's main description; `gettingStarted`
in the frontmatter is a short plain-text getting-started blurb.

**Scope:** the catalog aims to cover Kali Linux's major tool categories
well (info gathering, vulnerability analysis, web app, password
attacks, wireless, reverse engineering, sniffing/spoofing,
exploitation, post-exploitation, forensics, social engineering) with
solid representative entries per category, not to enumerate every one
of Kali's 600+ packages — a reference that deep would be mostly
redundant with `apt list --installed` and harder to keep accurate than
useful. New entries should fill a category gap or replace a
stale/superseded tool, not just add volume.

## Content freshness

There is no live scraping backend. Instead:

- `npm run check-links` (also `scripts/check-links.mjs`) checks every
  entry's URLs for reachability and flags anything not verified in the
  last 180 days.
- `.github/workflows/freshness-check.yml` runs the same check on a
  weekly schedule once this repo has a GitHub remote, and opens an issue
  listing anything that needs a human look. It never auto-edits content.

## Security

See [`SECURITY.md`](./SECURITY.md) for the site's security model,
header configuration for whichever static host is used, and how to
report a vulnerability.

## License

Code is licensed under [MIT](./LICENSE). Content under `src/content/`
(the OS and tool write-ups) is licensed under
[CC BY 4.0](./LICENSE-CONTENT).

## Deployment (not yet enabled)

This project currently only runs locally (`npm run dev` / `preview`).
When ready to deploy:

- **Cloudflare Pages** (primary planned target, near-zero cost): connect
  the GitHub repo, build command `npm run build`, output directory
  `dist`. Add the headers in `SECURITY.md` via a `public/_headers` file.
  Attach a custom domain once one is purchased.
- **AWS alternative**: S3 (static website hosting or as a CloudFront
  origin) + CloudFront for CDN/TLS, with the same security headers set
  via a CloudFront response headers policy. More setup than Cloudflare
  Pages for the same result, but noted here since AWS tooling is already
  available if preferred later.
