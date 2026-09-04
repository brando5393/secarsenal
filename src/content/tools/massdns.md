---
name: "massdns"
tagline: "High-performance DNS stub resolver"
categories: ["network-information-dns"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/massdns/"
downloadUrl: "https://github.com/blechschmidt/massdns"
repoUrl: "https://gitlab.com/kalilinux/packages/massdns"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install massdns`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

This package contains a simple high-performance DNS stub resolver targeting those who seek to resolve a massive amount of domain names in the order of millions or even billions. Without special configuration, MassDNS is capable of resolving over 350,000 names per second using publicly available resolvers.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
