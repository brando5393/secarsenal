---
name: WPScan
tagline: WordPress-specific vulnerability and enumeration scanner
categories: [web-app, vulnerability-scanning]
platforms: [Linux, macOS]
license: GPL-3.0 (vulnerability database has separate terms)
lastVerified: 2026-09-04
docsUrl: https://github.com/wpscanteam/wpscan/wiki
downloadUrl: https://github.com/wpscanteam/wpscan
repoUrl: https://github.com/wpscanteam/wpscan
commonlyOn: [Kali Linux, Parrot Security OS]
gettingStarted: |
  Install via the `gem install wpscan` Ruby gem or use the copy
  preinstalled on Kali. A free WPScan API token (from wpscan.com)
  enables vulnerability-database lookups. Basic usage:
  `wpscan --url <target> --api-token <token>` enumerates the WordPress
  version, plugins, themes, and users, and cross-references known
  vulnerabilities. The wiki covers enumeration options and brute-force
  modules for login pages.
---

WPScan is a black-box vulnerability scanner purpose-built for
WordPress sites: it identifies the WordPress core version, installed
plugins/themes, and usernames, then checks them against a maintained
vulnerability database.

Only use it against WordPress sites you own or are explicitly
authorized to test — see the [disclaimer](/disclaimer).
