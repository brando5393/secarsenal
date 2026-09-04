---
name: BeEF
tagline: Browser Exploitation Framework for client-side/browser-focused attacks
categories: [exploitation, web-app]
platforms: [Linux, macOS]
license: GPL-3.0-ish (custom BeEF license, source-available)
lastVerified: 2026-09-04
docsUrl: https://github.com/beefproject/beef/wiki
downloadUrl: https://github.com/beefproject/beef
repoUrl: https://github.com/beefproject/beef
commonlyOn: [Kali Linux, Parrot Security OS]
gettingStarted: |
  Install via the setup script in the repo or use the copy preinstalled
  on Kali (`beef-xss`). Once running, hook a browser by getting it to
  load BeEF's `hook.js` (e.g. via a reflected/stored XSS in an
  authorized test target), then control the hooked browser — running
  modules, social-engineering prompts, and more — from the BeEF web UI.
  The wiki covers the module system and REST API.
---

BeEF (Browser Exploitation Framework) focuses on the client side of an
assessment: once a browser is "hooked" (typically via an XSS
vulnerability in an authorized target), BeEF provides modules to probe
and demonstrate impact from within that browser context.

Only use it against browsers/applications you own or are explicitly
authorized to test — see the [disclaimer](/disclaimer).
