---
name: "bully"
tagline: "Implementation of the WPS brute force attack, written in C"
categories: ["wifi-credential-access"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/bully/"
downloadUrl: "https://github.com/kimocoder/bully"
repoUrl: "https://salsa.debian.org/pkg-security-team/bully"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install bully`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

Bully is a new implementation of the WPS brute force attack, written in C. It is conceptually identical to other programs, in that it exploits the (now well known) design flaw in the WPS specification. It has several advantages over the original reaver code. These include fewer dependencies, improved memory and cpu performance, correct handling of endianness, and a more robust set of options.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
