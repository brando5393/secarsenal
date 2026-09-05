---
name: "httpbog"
tagline: "A slow HTTP denial-of-service tool that works similarly to other attacks, but rather than leveraging request headers or "
categories: ["windows"]
platforms: ["Linux"]
lastVerified: 2026-09-05
docsUrl: "https://blackarch.org/windows.html"
downloadUrl: "http://sourceforge.net/projects/httpbog/"
commonlyOn: ["BlackArch"]
gettingStarted: "Install on BlackArch with `pacman -S httpbog` (or add the BlackArch repository to an existing Arch Linux install). See the official BlackArch tool listing and upstream homepage linked above for details."
---

A slow HTTP denial-of-service tool that works similarly to other attacks, but rather than leveraging request headers or POST data Bog consumes sockets by slowly reading responses.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
