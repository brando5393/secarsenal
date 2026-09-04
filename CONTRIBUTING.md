# Contributing

Contributions that add or correct an OS/tool entry, fix a broken link,
or improve the site itself are welcome.

## Adding or updating an OS/tool entry

1. Add or edit a Markdown file under `src/content/os/` or
   `src/content/tools/`. Match the schema in `src/content.config.ts` —
   `npm run dev` / `npm run build` will fail with a clear error if a
   field is missing or the wrong type.
2. Set `lastVerified` to the date you personally confirmed the
   description and links below are accurate.
3. Link only to official sources: the project's own documentation,
   official download page, and/or its canonical source repository.
4. Run `npm run check-links` locally before opening a PR to confirm
   your new links resolve.
5. Keep descriptions factual and neutral — what the tool/OS is, what
   category it belongs to, and how to get started with it from the
   official source. No exploit code, no step-by-step attack
   walkthroughs against real/example targets.

## Content scope

This project is a reference catalog, not a tutorial site. "Getting
started" sections should point readers to the *official* documentation
for depth, not attempt to replace it here.

## Reporting issues

Use GitHub Issues for broken links, stale entries, or factual
corrections. See `SECURITY.md` for how to report a security
vulnerability instead of a content issue.
