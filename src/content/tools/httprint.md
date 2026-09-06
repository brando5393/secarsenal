---
name: "httprint"
tagline: "Web server fingerprinting tool"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/httprint/"
downloadUrl: "https://www.net-square.com/httprint.html"
repoUrl: "https://gitlab.com/kalilinux/packages/httprint"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install httprint`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

httprint is a web server fingerprinting tool. It relies on web server characteristics to accurately identify web servers, despite the fact that they may have been obfuscated by changing the server banner strings, or by plug-ins such as mod_security or servermask. httprint can also be used to detect web enabled devices which do not have a server banner string, such as wireless access points, routers, switches, cable modems, etc. httprint uses text signature strings and it is very easy to add signatures to the signature database.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
