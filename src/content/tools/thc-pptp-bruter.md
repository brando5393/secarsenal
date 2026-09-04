---
name: "thc-pptp-bruter"
tagline: "THC PPTP Brute Force"
categories: ["brute-force"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/thc-pptp-bruter/"
downloadUrl: "http://www.thc.org/releases.php"
repoUrl: "https://gitlab.com/kalilinux/packages/thc-pptp-bruter"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install thc-pptp-bruter`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

Brute force program against pptp vpn endpoints (tcp port 1723). Fully standalone. Supports latest MSChapV2 authentication. Tested against Windows and Cisco gateways. Exploits a weakness in Microsoft’s anti-brute force implementation which makes it possible to try 300 passwords the second.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
