---
name: Nikto
tagline: Web server scanner for known vulnerable files, outdated software, and misconfigurations
categories: [web-app, vulnerability-scanning]
platforms: [Linux, Windows, macOS]
license: GPL-2.0
lastVerified: 2026-09-04
docsUrl: https://github.com/sullo/nikto/wiki
downloadUrl: https://github.com/sullo/nikto
repoUrl: https://github.com/sullo/nikto
commonlyOn: [Kali Linux, Parrot Security OS, BlackArch]
gettingStarted: |
  Install via your package manager (preinstalled on Kali/Parrot) or run
  the Perl script directly from a clone of the repo. Basic usage:
  `nikto -h <target>` runs the full battery of checks against a web
  server, flagging outdated server software, dangerous files/CGIs, and
  common misconfigurations. The wiki covers tuning scan scope and
  output formats for reporting.
---

Nikto is a web server scanner that checks for thousands of known
dangerous files/CGIs, outdated server and component versions, and
common misconfigurations — a quick first pass before deeper manual or
tool-assisted web application testing.

Only use it against servers you own or are explicitly authorized to
test — see the [disclaimer](/disclaimer).
