---
name: theHarvester
tagline: OSINT tool for gathering emails, subdomains, and hosts from public sources
categories: [osint, recon]
platforms: [Linux, Windows, macOS]
license: GPL-2.0
lastVerified: 2026-09-04
docsUrl: https://github.com/laramies/theHarvester#readme
downloadUrl: https://github.com/laramies/theHarvester
repoUrl: https://github.com/laramies/theHarvester
commonlyOn: [Kali Linux, Parrot Security OS]
gettingStarted: |
  Install via pip (`pip install theHarvester`) or use the copy
  preinstalled on Kali/Parrot. Basic usage:
  `theHarvester -d <domain> -b all` queries a range of public sources
  (search engines, certificate transparency logs, etc.) for emails,
  subdomains, and hosts tied to a domain. Some sources require API keys,
  configured per the README.
---

theHarvester is an OSINT reconnaissance tool that aggregates publicly
available information — emails, subdomains, hostnames, open ports — for
a target domain from search engines and other public data sources,
commonly used in the early reconnaissance phase of an assessment.

Only use it as part of an authorized engagement or against domains you
own — see the [disclaimer](/disclaimer).
