---
name: "ssldump"
tagline: "SSLv3/TLS network protocol analyzer"
categories: ["collection"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/ssldump/"
downloadUrl: "https://github.com/adulau/ssldump"
repoUrl: "https://salsa.debian.org/pkg-security-team/ssldump"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page and upstream homepage linked above for installation and usage details."
---

This program will dump the traffic on a network and analyze it for SSLv3/TLS network traffic, typically used to secure TCP connections. When it identifies this traffic, it decodes the results. When provided with the appropriate keying material, it will also decrypt the connections and display the application data traffic.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
