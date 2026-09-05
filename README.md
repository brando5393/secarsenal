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

- **`src/content/tools/`** is entirely **generated**, from four
  official sources:
  - `scripts/sync-kali-tools.mjs` — [Kali's own tool pages](https://www.kali.org/tools/all-tools/)
    (779 tools), one fetch per tool page.
  - `scripts/sync-blackarch-tools.mjs` — [BlackArch's own tool table](https://blackarch.org/tools.html)
    (~2,500 additional tools not already covered by Kali, out of ~2,858
    total — one single-page fetch). BlackArch's own data has a
    non-trivial amount of link rot in its homepage column (~10-15%
    dead on a full check), so this sync verifies each homepage URL and
    omits `downloadUrl` rather than publish a dead link — the entry's
    `docsUrl` (BlackArch's own category page) is unaffected either way.
  - `scripts/sync-remnux-tools.mjs` — [REMnux's "Discover the Tools" docs](https://docs.remnux.org/discover-the-tools/analyze+documents)
    (~195 additional tools not already covered by Kali/BlackArch).
    REMnux's docs (GitBook) expose a Markdown version of every page via
    a `.md` suffix and a page index at `/llms.txt`, so this sync reads
    structured Markdown fields (Website/Author/License) directly
    instead of scraping rendered HTML — REMnux's own link health is
    much better than BlackArch's (~5% dead on a full check).
  - `scripts/sync-tails-tools.mjs` — [Tails' official included-software page](https://tails.net/doc/about/features/index.en.html)
    (~19 additional tools not already covered). Tails ships a small,
    fixed set of applications rather than a large tool catalog, so this
    is a modest addition, but a genuine official source with excellent
    link health (mainstream, actively maintained software).

  Earlier sources are treated as authoritative over later ones wherever
  they list the same tool (Kali > BlackArch > REMnux > Tails): each
  sync skips any slug already owned by an earlier one (tracked via
  `scripts/manifests/*.json`) rather than overwriting richer existing
  data. Each sync script only ever deletes
  files *it* previously created (tracked in its own manifest), so
  running one never clobbers another's entries.
  **Don't hand-edit files in `src/content/tools/`** —
  they get overwritten by the next sync. To fix a bad entry, fix the
  relevant sync script instead. Categories are free-form strings taken
  directly from each source's own taxonomy (see `src/content.config.ts`),
  not a hardcoded enum, so this collection never needs manual updates
  to stay in sync with any of these distros' tool sets.
  Adding another source means writing a new
  `scripts/sync-<name>-tools.mjs` following the same manifest pattern —
  but check first that one exists: Parrot Security OS was evaluated and
  doesn't publish one (its docs explicitly say so — see
  `www.parrotsec.org/docs/tools/` — and point to upstream `man` pages
  instead), so there's nothing to sync there.
- **`src/content/os/`** stays **hand-curated** — there's no single
  official index of "all pentest operating systems" the way Kali
  indexes its own tools, so someone has to decide which distros belong
  here. Add a Markdown file under `src/content/os/` matching the schema
  in `src/content.config.ts`; every entry needs `lastVerified` (the
  date you personally confirmed the URLs/details), `docsUrl`, and
  `downloadUrl`/`repoUrl` where applicable. The Markdown body is the
  page's main description; `gettingStarted` is a short plain-text blurb.

## Content freshness

- **Tools:** `npm run sync-tools` (Kali), `npm run sync-tools:blackarch`
  (BlackArch), `npm run sync-tools:remnux` (REMnux), and
  `npm run sync-tools:tails` (Tails) each re-fetch and regenerate their
  respective share of the tools collection.
  `.github/workflows/sync-tools.yml` runs all four, in that order,
  monthly and opens a PR with the diff — it never pushes straight to
  `main`, so a parsing bug or an unannounced page-structure change on
  any site gets caught in review, not published.
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
