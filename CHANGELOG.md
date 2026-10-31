# Changelog

Code, infrastructure, and process changes to SecArsenal, newest first.
Dates are merge dates. Format follows [Keep a Changelog](https://keepachangelog.com).

This file does **not** track catalog content. Which OS and tool entries
were added or removed each month is computed from git history at build
time and shown on [/changelog](./src/pages/changelog.astro).

**Every PR that changes code, workflows, scripts, dependencies with
user-visible effect, or docs policy adds an entry here in the same PR.**
Routine Dependabot bumps and scheduled content syncs can be folded into
one line per month. See CONTRIBUTING.md.

## 2026-10-31

### Added
- `amplify.yml` pins the Amplify build to Node 22.23.4 (the console default
  is 22.18.0), a prerequisite for astro 7.4+ (#50).
- This changelog, a PR-template checkbox, and a standing rule in
  CONTRIBUTING.md, AGENTS.md, and CLAUDE.md to update it with every change
  (#55).

### Fixed
- Dependency advisories: patched undici and zod, and removed the `braces`
  audit exception because GitHub withdrew that advisory on 2026-10-23
  (#52).
- MCP server: upgraded `agents` 0.22 to 0.32, which pins patched MCP SDK
  versions. This cleared the server-side SDK advisories and emptied
  `mcp-server/audit-allowlist.json` (#53).

### Changed
- Monthly tools sync (#54): 106 entries added, 6 removed, 2 renamed. Two
  scrape-artifact slugs now have clean names. Link checks in the sync
  run under the rules from #40 and #41, so 129 OSINT Framework entries
  and 281 BlackArch URLs that bot-block CI were kept or linked instead
  of dropped.
- Dependency bumps: autoprefixer 10.6.2 (#48), postcss 8.5.32 (#49),
  lucide-static 1.63.0 (#51), actions/setup-node 7.1.0 (#42).

### Held
- astro 7.4.4 (#50) requires Node 22.23.4 or newer. Not merged until the
  Amplify build Node version is confirmed.

## 2026-10-12

### Added
- `scripts/audit-gate.mjs`: CI fails on any high or critical advisory
  that is not in a reasoned, expiring allowlist (#38, #39).

### Fixed
- Sync no longer deletes live entries. An entry is removed only when its
  link is definitely dead (NXDOMAIN, connection refused, 404, 410). Blocked,
  rate-limited, or timed-out responses count as unknown and the entry is
  kept (#40).
- Entries whose host answered but refused the bot (401, 403, 429, 451)
  keep their homepage link (#41).
- MCP deploy had been failing on production-dependency advisories; the
  audit step now goes through the shared gate (#39).
- Restored 31 live sites that the September sync PR would have deleted
  (#31).

### Changed
- Dependency bumps: wrangler-action 4.1.3 (#32), astro 7.3.8 (#36),
  postcss 8.5.29 (#35), lucide-static 1.53.0 (#37).

## 2026-09-23

### Added
- Public read-only MCP server at `mcp.secarsenal.org/mcp` (Cloudflare
  Worker) and the `/mcp` page (#24, #25).

### Security
- Hardening pass across scripts, MCP server, headers, and Cloudflare
  TLS: strict CSP (`style-src 'self'`), SSL strict, Always Use HTTPS,
  minimum TLS 1.2, rate limiting on the MCP host (#27).

### Fixed
- Tools sync lost data when a tool migrated between sources (#23).

### Changed
- README refresh: hero image, badges, humanized prose (#26).

## 2026-09-08

### Changed
- Logo ground rule enforced in CI (`npm run check-logos`); 31 more
  branded tools got logos (#12, #13, #14).
- README no longer describes the Route 53 / AWS Support setup (#11).

## 2026-09-07

### Added
- Tool-sync sources: OSINT Framework, Exegol, Kali NetHunter App Store,
  bringing the total to 11 (#8, #9).
- Pages: category landing pages, browse-by-goal index, data-freshness
  status, a first-party accessibility panel, accessibility statement,
  print styles, and the build-time `/changelog`.

### Changed
- secarsenal.org went live; HSTS enabled without preload (#10).
- NIST CSF audit fixes: privacy disclosure and GitHub Actions pinned to
  commit SHAs.

### Fixed
- Site search: CSP was blocking Pagefind's WASM module.
- Auth header collision between checkout and create-pull-request.

## 2026-09-05 to 2026-09-06

### Added
- Initial site: OS entries, tool entries from eight sync sources,
  monthly sync and OS-discovery workflows, freshness check, SecBSD entry,
  official logos for 34 OS entries, red/blue team classification
  grounded in NIST and MITRE sources (purple dropped).
