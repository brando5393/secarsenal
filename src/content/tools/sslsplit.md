---
name: "sslsplit"
tagline: "Transparent and scalable SSL/TLS interception"
categories: ["collection"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/sslsplit/"
downloadUrl: "https://www.roe.ch/SSLsplit"
repoUrl: "https://salsa.debian.org/debian/sslsplit"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install sslsplit`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

SSLsplit is a tool for man-in-the-middle attacks against SSL/TLS encrypted network connections. Connections are transparently intercepted through a network address translation engine and redirected to SSLsplit. SSLsplit terminates SSL/TLS and initiates a new SSL/TLS connection to the original destination address, while logging all data transmitted. SSLsplit is intended to be useful for network forensics and penetration testing.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
