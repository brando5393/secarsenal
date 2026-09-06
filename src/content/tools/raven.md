---
name: "raven"
tagline: "Python tool that extends the capabilities of the http.server Python module"
categories: ["exfiltration"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/raven/"
downloadUrl: "https://github.com/gh0x0st/raven"
repoUrl: "https://salsa.debian.org/pkg-security-team/raven"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install raven`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

This package contains a Python tool that extends the capabilities of the http.server Python module by offering a self-contained file upload web server. While the common practice is to use python3 -m http.server 80 to serve files for remote client downloads, Raven addresses the need for a similar solution when you need the ability to receive files from remote clients. This becomes especially valuable in scenarios such as penetration testing and incident response procedures when protocols such as SMB may not be a viable option.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
