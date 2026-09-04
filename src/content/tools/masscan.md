---
name: "masscan"
tagline: "TCP port scanner"
categories: ["network-service-discovery","discovery"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/masscan/"
downloadUrl: "https://github.com/robertdavidgraham/masscan"
repoUrl: "https://salsa.debian.org/pkg-security-team/masscan"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install masscan`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

MASSCAN is TCP port scanner which transmits SYN packets asynchronously and produces results similar to nmap, the most famous port scanner. Internally, it operates more like scanrand, unicornscan, and ZMap, using asynchronous transmission. It’s a flexible utility that allows arbitrary address and port ranges.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
