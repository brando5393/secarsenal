---
name: Recon-ng
tagline: Modular web reconnaissance framework with a Metasploit-like console
categories: [recon, osint]
platforms: [Linux, Windows, macOS]
license: GPL-3.0
lastVerified: 2026-09-04
docsUrl: https://github.com/lanmaster53/recon-ng/wiki
downloadUrl: https://github.com/lanmaster53/recon-ng
repoUrl: https://github.com/lanmaster53/recon-ng
commonlyOn: [Kali Linux, Parrot Security OS]
gettingStarted: |
  Install via pip (`pipx install recon-ng`) or use the copy preinstalled
  on Kali. Launch with `recon-ng`, create a workspace, then `marketplace
  install all` to pull in modules and `modules load <name>` /
  `options set SOURCE <domain>` / `run` to execute a module against a
  target. The wiki covers the module system, API key configuration for
  modules that need one, and reporting modules.
---

Recon-ng is a full-featured web reconnaissance framework with a
command-line interface modeled on Metasploit's console, organizing
OSINT/recon techniques (subdomain enumeration, contact harvesting,
etc.) into independent, installable modules.

Only use it as part of an authorized engagement or against domains you
own — see the [disclaimer](/disclaimer).
