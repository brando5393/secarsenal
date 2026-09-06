---
name: review-os-candidates
description: >-
  Process a SecArsenal "discover/os-candidates" PR (opened by
  .github/workflows/discover-os.yml) into merge-ready content: decide
  real sync script vs. hand-curated manual entry per distro, verify
  maintenance status, write real content, and merge. Triggers on:
  discover-os PR, OS candidate PR, new OS candidates from Rawsec,
  review PR (when it's a discover/os-candidates branch).
version: 1
---

# Review OS candidates

## When to use this

`discover-os.yml` runs monthly (or on manual dispatch) and opens a PR
from branch `discover/os-candidates` with draft `src/content/os/*.md`
stubs — one per new distro found in
[Rawsec's CyberSecurity Inventory](https://github.com/noraj/rawsec-cybersecurity-inventory)
that isn't already in the OS collection. Each draft has a guessed
`category` (flagged `# TODO`), an empty `notableTools`, and a
placeholder `gettingStarted`. This skill is the procedure for turning
that raw PR into something mergeable — do NOT merge the PR as-is.

Read `scripts/discover-os.mjs` first to see exactly what it guessed and
why (category heuristic, reachability check already done at draft
time).

## Per-distro procedure

For every drafted file in the PR, work through these in order. Do not
skip the research steps even if a distro looks familiar — this project
has been burned twice by trusting a listing at face value (see
"Known pitfalls" below).

### 1. Scope check

Is this genuinely a pentest/security-relevant OS, or a general-purpose
distro that happens to appear in Rawsec's list (used as a container
base, etc.)? If it's clearly out of scope (e.g. Alpine Linux), drop the
file (`git rm`) — no category fix makes an out-of-scope entry belong.

### 2. Maintenance-status check (don't trust Rawsec's maintained/unmaintained split)

WebSearch/WebFetch the project's own site and GitHub repo for its most
recent release, commit, or public statement. If it's actually archived,
dormant (no activity in years), or the official site is down —
**drop the file entirely**, don't merge it as if it were current. This
already happened for CLIP OS, Subgraph OS, and Tamer Platform, all
listed as "maintained" by Rawsec but actually archived/dead.

### 3. Tool-list research — the real decision point

Check the distro's official docs/site/GitHub for a tool listing. The
bar for "build a sync script" is:

- **Genuinely structured**: a table, per-item pages, or similarly
  parseable format — not a prose paragraph.
- **Official**: the project's own docs, not a third-party roundup.
- **Has something to link to per tool**: our schema requires a real
  `docsUrl` per tool entry. A list of bare names with zero links fails
  this even if it's huge and official (Tsurugi Linux: 500+ tools,
  official, structured — but zero per-tool links, so it's a manual
  entry, not a sync candidate).
- **Not mixed with generic packages you can't filter out**: if the
  "tool list" is actually a full package manifest or install profile
  that mixes real security tools with generic OS/runtime/productivity
  packages (fonts, browsers, PDF readers, build dependencies) with no
  reliable field to separate them, reject it — same reasoning as
  Pentoo's overlay and CommandoVM's VM-Packages/install profile, both
  investigated and rejected for exactly this. A repo/tag column that's
  *specific to that distro's own curated tool repo* (not shared with
  upstream Arch/Debian/etc.) is the kind of signal that clears this bar
  (ArchStrike's `/packages` table, tagged to the `archstrike` repo
  specifically, passed; a generic Fedora RPM manifest with ~4,000
  packages failed the same test for NST).

**If yes** — build `scripts/sync-<slug>-tools.mjs`:
- Copy the shape of the closest existing script (`sync-tails-tools.mjs`
  for a single-page source, `sync-security-onion-tools.mjs` for an
  index-page-plus-per-item-detail-page source, `sync-archstrike-tools.mjs`
  for a paginated table needing a secondary fetch for homepage/category).
- Use `readManifest`/`writeManifest`/`pruneStale`/`mapWithConcurrency`/
  `isUrlReachable`/`ensureAutoSyncedTag` from `scripts/sync-utils.mjs` —
  don't reinvent these.
- `CLAIMED_MANIFEST_PATHS` must include every manifest that already
  exists in `scripts/manifests/` at the time you write the script
  (check the directory — don't hardcode a stale list from this doc).
- Add an npm script (`"sync-tools:<slug>": "node scripts/sync-<slug>-tools.mjs"`)
  and a step in `.github/workflows/sync-tools.yml`, in the same order
  position as the other steps (order matters for manifest precedence).
- Run it locally, spot-check 2-3 generated tool files for sane
  category/tagline/homepage, and specifically check for infrastructure/
  meta-packages that shouldn't be cataloged as tools (e.g. a distro's
  own installer/keyring/desktop-config packages sharing the same repo
  as real tools — filter these by name pattern, as done for
  ArchStrike's `archstrike-*` packages).
- Confirm the OS file's `toolListMaintenance` flipped to `auto-synced`
  automatically after the run (`grep toolListMaintenance src/content/os/<slug>.md`).
  If it didn't, don't hand-edit it — figure out why `ensureAutoSyncedTag`
  didn't fire (this bit us once already: a CRLF line-ending bug on
  Windows checkouts made it silently no-op — see git history on
  `scripts/sync-utils.mjs` for the fix if it recurs).
- Document the new script in `README.md`'s "Content freshness" section,
  `SECURITY.md`'s "Content integrity" section, and `CONTRIBUTING.md`'s
  numbered script list — including the running *total* script count
  each of the three mentions in prose (e.g. "eight official sources");
  it's easy to update the list itself but miss the count elsewhere,
  which is exactly what happened after FLARE VM and T-Pot were added.

**If no** — write real content directly into the drafted `.md` file,
replacing every TODO:
- `notableTools`: only tools that actually exist in `src/content/tools/`
  with an *exact* `name:` field match (case-sensitive) — grep for it
  first, don't assume a human-readable name maps to a slug. An entry
  that doesn't match silently renders nothing, with no build error.
  It's fine to leave this empty (`[]`) if nothing legitimately
  cross-references.
  Sourcing tool names: use the actual project's own documentation, not
  general knowledge or invention.
- `gettingStarted`: 2-4 factual sentences based on the project's real
  official docs (install format — ISO/VM/script, what desktop
  environment, what's architecturally distinct) in the same neutral
  technical tone as existing entries (read a couple of `src/content/os/*.md`
  files for calibration).
- `category`: pick from the actual enum
  (`general-purpose`/`wireless`/`forensics`/`specialized`) based on
  what the distro actually does, not the discovery script's keyword
  guess. `general-purpose` is for broad, Kali-style multi-purpose
  toolkits; a narrowly-scoped tool (SDR, network monitoring, VM
  compartmentalization, anonymity) is `specialized` even if it doesn't
  match another enum value more specifically. If you find a systematic
  gap in `guessCategory()` in `scripts/discover-os.mjs` (a whole class
  of distro consistently falling through to the wrong default), fix the
  regex there too so future runs don't repeat it — don't just
  hand-correct this one instance.
- `basedOn`: verify against the current version's actual docs, not
  Rawsec's field — it can be stale (Linux Kodachi's `base` field said
  "Xubuntu" when the current release had moved to Debian).
- `team` (optional, `red`/`blue`/`purple`): set it if the distro is
  genuinely a security-team tool, judged by what it actually does, not
  the project's stated mission — OSINT/recon tooling counts as `red`
  per MITRE ATT&CK's own Reconnaissance tactic even for an
  investigative project (Trace Labs OSINT VM, whose mission is finding
  missing persons, is still `red`); malware-analysis/reverse-engineering
  tooling is `blue` (investigative/defensive), not `red`, matching this
  project's own CommandoVM-vs-FLARE-VM split. Leave it unset for
  anything that isn't a security-team tool at all — general privacy/
  opsec OSes (Tails, Whonix, Kodachi, Qubes) and general rescue distros
  (SystemRescue) — rather than forcing a guess. See `src/lib/toolTeam.ts`'s
  header comment for the full reasoning and the equivalent (best-effort,
  category-keyword-derived) logic used for individual tools.
- Remove the `_Drafted automatically..._` line and any review-flag
  notes once resolved.

### 3b. Logo check (ground rule — every candidate, sync or manual)

Check the distro's own site favicon, header/nav logo, and GitHub/GitLab
org or repo avatar for a genuine, distinctive official logo. If one
exists, add it to `src/lib/osLogos.ts` and `public/logos/os/<slug>.<ext>`
before merging — see the "Adding or updating an OS entry" ground rule
in `CONTRIBUTING.md` for the full how-to (cropping wordmark banners,
`needsLightBg`, sourcing comments). Don't defer this to a follow-up PR;
a merged entry with a discoverable logo it isn't using is exactly the
gap this rule exists to prevent. If there's genuinely no distinctive
logo (only a generic Tux/SourceForge/stock icon), say so in the commit
message the same way existing `osLogos.ts` entries note it.

### 4. Flag genuine open questions instead of silently deciding

If a candidate raises a real scope question — a non-Linux platform, a
sub-project of an existing entry (e.g. an OS's own mobile/Android
variant), a project of uncertain notability — say so explicitly
(in a PR comment or to whoever is reviewing) rather than merging or
dropping it unilaterally. Proceed once you have an explicit answer, not
a guess.

## Known pitfalls (from the first real run of this pipeline)

- Rawsec's "maintained" classification is a starting signal, not ground
  truth — verify independently (see step 2).
- Rawsec's inventory scope is broader than "pentest distros" — expect
  some out-of-scope candidates (general-purpose distros, non-security
  OSs) in every batch; that's normal, not a bug in the discovery
  script.
- "Official and structured" isn't sufficient on its own if there's no
  per-tool URL (Tsurugi Linux).
- A distro's own install profile/package manifest can look
  tool-specific at a glance but still mix in generic software —
  actually check a handful of entries near the edges of the list
  (dependency-looking names, non-security software) before committing
  to a sync script (this is exactly what caught CommandoVM after an
  initial pass wrongly cleared it).
- **Don't let a large batch erode per-candidate rigor.** When processing
  10+ candidates at once, it's tempting to classify most of them from
  general knowledge/search-result summaries instead of actually reading
  each one's own README/docs page — this happened for real: T-Pot was
  defaulted to `manual` in an 11-candidate batch without ever reading
  its README, which turned out to have a clean, official, per-item
  linked tool list (~40 honeypots/tools) that clearly passed step 3's
  bar. Caught only after a direct question ("did you check the tool
  lists the same way as before?"). Apply step 3's full research — fetch
  and actually read the primary source — to every single candidate
  regardless of batch size; if that's genuinely impractical for the
  batch size, say so explicitly rather than silently doing a lighter
  pass and reporting it as equivalent.
- A structured, official-looking list (a YAML/JSON menu file, a
  category taxonomy) can still fail step 3's bar if it has no per-item
  URL field — this is the same failure mode as Tsurugi Linux's
  link-less 500+ tool list, and caught NetHydra's `menu.yaml`
  (structured, real, but plain application names with no homepage
  field) and SamuraiWTF's Katana `module.yml` files (same shape).
  Structure alone isn't sufficient — check specifically for a
  resolvable link per item before building a sync script.

## After all candidates are resolved

1. `npm run build` — must pass (schema validation catches most
   mistakes).
2. `npm run check-links` — verifies every URL you kept.
3. `npm audit` — should stay at 0 vulnerabilities (new sync scripts
   only use existing dependencies).
4. Commit with a message explaining the sync/manual/drop decision for
   each distro (future readers — including a future run of this skill
   — need to know *why*, not just *what*).
5. Push, comment on the PR with a summary (sync scripts added / manual
   entries written / entries dropped and why), and merge.
6. Restart the local dev server (`.astro` cache can go stale across a
   branch switch — `astro dev stop && rm -rf .astro && astro dev --background`
   if anything looks off).
