---
name: OWASP Amass
tagline: In-depth attack surface mapping and subdomain enumeration tool
categories: [recon, osint]
platforms: [Linux, Windows, macOS]
license: Apache-2.0
lastVerified: 2026-09-04
docsUrl: https://github.com/owasp-amass/amass/wiki
downloadUrl: https://github.com/owasp-amass/amass/releases
repoUrl: https://github.com/owasp-amass/amass
commonlyOn: [Kali Linux, Parrot Security OS]
gettingStarted: |
  Install a release binary, via `go install`, or use the copy
  preinstalled on Kali. Basic usage: `amass enum -d <domain>` performs
  passive and active subdomain enumeration combining OSINT sources,
  certificate transparency logs, and DNS techniques. The wiki covers
  configuring API keys for additional data sources and the intel/viz
  subcommands for further analysis.
---

OWASP Amass is a reconnaissance tool for in-depth DNS enumeration and
external attack surface mapping, combining open-source intelligence,
active DNS techniques, and web archives to discover subdomains and
related infrastructure for a target organization.

Only use it as part of an authorized engagement or against domains you
own — see the [disclaimer](/disclaimer).
