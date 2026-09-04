---
name: "proxychains-ng"
tagline: "Runtime shared library for proxychains-ng"
categories: ["protocol-tunneling"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/proxychains-ng/"
downloadUrl: "https://github.com/rofl0r/proxychains-ng"
repoUrl: "https://salsa.debian.org/debian/proxychains-ng"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page and upstream homepage linked above for installation and usage details."
---

Proxychains is a UNIX program, that hooks network-related libc functions in dynamically linked programs via a preloaded DLL (dlsym(), LD_PRELOAD) and redirects the connections through SOCKS4a/5 or HTTP proxies. It supports TCP only (no UDP/ICMP etc).

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
