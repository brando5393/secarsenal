---
name: WhatWeb
tagline: Web technology fingerprinting scanner
categories: [recon, web-app]
platforms: [Linux, macOS]
license: GPL-2.0
lastVerified: 2026-09-04
docsUrl: https://github.com/urbanadventurer/WhatWeb/wiki
downloadUrl: https://github.com/urbanadventurer/WhatWeb
repoUrl: https://github.com/urbanadventurer/WhatWeb
commonlyOn: [Kali Linux, Parrot Security OS, BlackArch]
gettingStarted: |
  Install via your package manager (preinstalled on Kali) or clone the
  repo (Ruby). Basic usage: `whatweb <url>` identifies the CMS, web
  server, JavaScript libraries, and hundreds of other fingerprints via
  its plugin system; add `-a 3` for more aggressive (and slower)
  detection. The wiki covers the plugin format for adding custom
  fingerprints.
---

WhatWeb identifies the technologies behind a website — CMS, server
software, analytics packages, JavaScript frameworks, and more — using a
large library of fingerprint plugins, commonly used early in web app
recon to decide which specialized tools to bring to bear next.

Only use it against sites you own or are explicitly authorized to test
— see the [disclaimer](/disclaimer).
