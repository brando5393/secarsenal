---
name: "rsakeyfind"
tagline: "Locates BER-encoded RSA private keys in memory images"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/rsakeyfind/"
downloadUrl: "https://citp.princeton.edu/our-work/memory/code/"
repoUrl: "https://salsa.debian.org/pkg-security-team/rsakeyfind"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page and upstream homepage linked above for installation and usage details."
---

rsakeyfind is a tool that locates BER-encoded RSA private keys in MEMORY-IMAGE. If a MODULUS-FILE is specified, it will locate private and public keys matching the hex-encoded modulus read from this file.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
