---
name: "fsnoop"
tagline: "A tool to monitor file operations on GNU/Linux systems by using the Inotify mechanism. Its primary purpose is to help de"
categories: ["scanner"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://blackarch.org/scanner.html"
commonlyOn: ["BlackArch"]
gettingStarted: "Install on BlackArch with `pacman -S fsnoop` (or add the BlackArch repository to an existing Arch Linux install). See the official BlackArch tool listing linked above for details."
---

A tool to monitor file operations on GNU/Linux systems by using the Inotify mechanism. Its primary purpose is to help detecting file race condition vulnerabilities and since version 3, to exploit them with loadable DSO modules (also called "payload modules" or "paymods").

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
