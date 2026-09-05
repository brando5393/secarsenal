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

- **`src/content/tools/`** is entirely **generated**, from six
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
  - `scripts/sync-security-onion-tools.mjs` — [Security Onion's official tools docs](https://docs.securityonion.net/en/2.4/tools.html)
    (~10 additional components not already covered). A small, fixed
    list (15 total) — each entry links to its own doc page with a
    consistent "From `<homepage>`:" + description pattern this sync
    parses directly.
  - `scripts/sync-archstrike-tools.mjs` — [ArchStrike's official package table](https://archstrike.org/packages)
    (~400 additional tools not already covered, out of ~750 total,
    paginated across 15 pages). Every row is tagged with ArchStrike's
    own repo in the Repository column (not mixed with generic Arch
    packages), but the table itself has no homepage/category columns —
    this sync fetches each package's `PKGBUILD` from ArchStrike's GitHub
    for its `url=` (homepage) and `groups=` (category) fields, and
    skips ArchStrike's own `archstrike-*` infrastructure/branding
    packages (installer, keyring, desktop configs) rather than
    cataloging them as tools.
  - `scripts/sync-flare-vm-tools.mjs` — [FLARE VM's own package list](https://github.com/mandiant/flare-vm/blob/main/config.xml)
    (~90 additional tools not already covered). 135 of the list's 137
    entries live in Mandiant's own `.vm`-namespaced package repo
    (`mandiant/VM-Packages`, exclusive to FLARE VM/CommandoVM, not
    shared with the public Chocolatey feed) — unlike CommandoVM's
    install profile, which mixes that namespace with unfilterable
    generic Chocolatey packages and was rejected as a sync source, this
    list is cleanly separable by its `.vm` suffix. This sync fetches
    each package's nuspec from that repo for its description, category
    (`tags`), and homepage (`projectUrl`, optional), and excludes both
    the 2 non-`.vm` runtime prerequisites and a small denylist of
    generic desktop utilities riding in the same namespace.

  Earlier sources are treated as authoritative over later ones wherever
  they list the same tool (Kali > BlackArch > REMnux > Tails >
  Security Onion > ArchStrike > FLARE VM): each
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
  (BlackArch), `npm run sync-tools:remnux` (REMnux),
  `npm run sync-tools:tails` (Tails), `npm run sync-tools:security-onion`
  (Security Onion), `npm run sync-tools:archstrike` (ArchStrike), and
  `npm run sync-tools:flare-vm` (FLARE VM) each
  re-fetch and regenerate their respective share of the tools collection.
  `.github/workflows/sync-tools.yml` runs all seven, in that order, monthly
  and opens a PR with the diff — it never pushes straight to `main`, so
  a parsing bug or an unannounced page-structure change on any site gets
  caught in review, not published.
- **OS entries:** `npm run check-links` (`scripts/check-links.mjs`)
  checks every OS entry's URLs for reachability and flags anything not
  verified in the last 180 days. `.github/workflows/freshness-check.yml`
  runs this weekly and opens an issue for a human to look at.
- **Distros without a syncable tool list:** Parrot, CAINE, Pentoo, and
  several distros added from the Rawsec discovery pipeline (Athena OS,
  BackBox, Demon Linux, Fedora Security Lab, CSI Linux, SIFT, Tsurugi
  Linux, Wifislax, DragonOS, Whonix, Linux Kodachi, Qubes OS, NST,
  CommandoVM, Kali NetHunter) have no official, structured, per-tool
  listing upstream — either nothing dedicated at all, a list with no
  per-tool links (can't populate `docsUrl`), or one that mixes real
  tools with generic OS packages/software with no reliable way to tell
  them apart (the same reason Pentoo's overlay was rejected). Their
  `notableTools` are hand-maintained and can't be freshness-checked
  automatically. Their `os/*.md` entries are marked
  `toolListMaintenance: manual`, which the site surfaces as
  a visible warning on their pages — this is also the default for any
  newly added OS entry, so a new distro is never silently presented as
  auto-verified. `scripts/sync-utils.mjs`'s `ensureAutoSyncedTag()` is
  called by each `sync-*.mjs` script to stamp its own OS entry
  `auto-synced` on every run — adding a new sync script for a new
  distro (see the pattern in any existing `scripts/sync-*.mjs`) is what
  flips that distro's tag automatically, no separate edit needed.
- **Discovering new OS candidates:** `npm run discover-os`
  (`scripts/discover-os.mjs`) checks
  [Rawsec's CyberSecurity Inventory](https://github.com/noraj/rawsec-cybersecurity-inventory)'s
  maintained operating-systems list for any distro not already in
  `src/content/os/`, and drafts a stub entry for each one found
  (`toolListMaintenance: manual`, with a guessed `category` and a
  placeholder `gettingStarted` clearly marked with a `# TODO`/`TODO`
  comment). `.github/workflows/discover-os.yml` runs this monthly and
  opens a PR — same review gate as the other workflows: a human
  verifies the guessed fields, writes a real getting-started summary,
  and decides whether the distro belongs on the site at all before
  merging. This only ever adds candidate files; it never edits or
  removes an existing OS entry.

None of the above workflows runs a live backend — they're scheduled,
one-shot jobs that commit/PR static files, keeping the deployed site
itself 100% static. `.github/workflows/ci.yml` runs on every push/PR
(build + `npm audit`) so a broken build or a malformed content entry is
caught before merge rather than by a monthly/weekly schedule.

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
