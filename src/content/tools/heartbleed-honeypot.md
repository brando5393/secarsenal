---
name: "heartbleed-honeypot"
tagline: "Script that listens on TCP port 443 and responds with completely bogus SSL heartbeat responses, unless it detects the st"
categories: ["honeypot"]
platforms: ["Linux"]
lastVerified: 2026-09-05
docsUrl: "https://blackarch.org/honeypot.html"
downloadUrl: "http://packetstormsecurity.com/files/126068/hb_honeypot.pl.txt"
commonlyOn: ["BlackArch"]
gettingStarted: "Install on BlackArch with `pacman -S heartbleed-honeypot` (or add the BlackArch repository to an existing Arch Linux install). See the official BlackArch tool listing and upstream homepage linked above for details."
---

Script that listens on TCP port 443 and responds with completely bogus SSL heartbeat responses, unless it detects the start of a byte pattern similar to that used in Jared Stafford's

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
