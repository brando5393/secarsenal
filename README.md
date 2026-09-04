# SecArsenal

A searchable reference site for infosec professionals: pentesting
operating systems (Kali, Parrot, BlackArch, ...) and individual tools —
what they are, what they're for, brief getting-started notes, and links
to the official docs and download pages. Educational/informational only;
see [`/disclaimer`](./src/pages/disclaimer.astro).

## Stack

- **Astro** (static output, no server runtime — see `astro.config.mjs`)
- **Tailwind CSS v3** + **Material Tailwind**'s HTML/utility-class
  patterns for styling (`tailwind.config.cjs`, `postcss.config.cjs`,
  `src/styles/global.css`) — no React; Material Tailwind's HTML flavor
  is just documented Tailwind class conventions, which keeps the site
  framework-free
- **Content collections** (`src/content.config.ts`) for the `os` and
  `tools` datasets, validated with Zod at build time
- **Pagefind** for static, client-side full-text search (indexed as a
  `postbuild` step — only available after `npm run build`, not in `dev`)
- All client-side interactivity lives in one plain-JS file,
  `public/scripts/site.js` — see the "Client-side scripts and CSP"
  section of `SECURITY.md` for why (short version: our CSP blocks
  Astro's default inline-script bundling)

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

## Content model

The two collections are sourced very differently:

- **`src/content/tools/`** is entirely **generated** by
  `scripts/sync-kali-tools.mjs` from
  [Kali's own official tool pages](https://www.kali.org/tools/all-tools/)
  (779 tools as of the last sync) — name, description, categories,
  homepage, and package/source links all come straight from kali.org,
  which is the canonical source for "what tools does Kali ship and what
  do they do." **Don't hand-edit files in `src/content/tools/`** — they
  get overwritten by the next sync. To fix a bad entry, fix the parser
  in `scripts/sync-kali-tools.mjs` instead. Categories are free-form
  strings taken directly from Kali's own category taxonomy (see
  `src/content.config.ts`), not a hardcoded enum, so this collection
  never needs manual updates to stay in sync with Kali's tool set.
- **`src/content/os/`** stays **hand-curated** — there's no single
  official index of "all pentest operating systems" the way Kali
  indexes its own tools, so someone has to decide which distros belong
  here. Add a Markdown file under `src/content/os/` matching the schema
  in `src/content.config.ts`; every entry needs `lastVerified` (the
  date you personally confirmed the URLs/details), `docsUrl`, and
  `downloadUrl`/`repoUrl` where applicable. The Markdown body is the
  page's main description; `gettingStarted` is a short plain-text blurb.

## Content freshness

- **Tools:** `npm run sync-tools` re-fetches and regenerates the entire
  tools collection from kali.org. `.github/workflows/sync-kali-tools.yml`
  runs this monthly and opens a PR with the diff — it never pushes
  straight to `main`, so a parsing bug or an unannounced page-structure
  change on kali.org gets caught in review, not published.
- **OS entries:** `npm run check-links` (`scripts/check-links.mjs`)
  checks every OS entry's URLs for reachability and flags anything not
  verified in the last 180 days. `.github/workflows/freshness-check.yml`
  runs this weekly and opens an issue for a human to look at.

Neither workflow runs a live backend — both are scheduled, one-shot
jobs that commit/PR static files, keeping the deployed site itself
100% static.

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
