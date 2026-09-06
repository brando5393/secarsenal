---
name: "gsocket"
tagline: "Allows two machines on different networks to communicate with each other"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/gsocket/"
downloadUrl: "https://github.com/hackerschoice/gsocket"
repoUrl: "https://salsa.debian.org/debian/gsocket"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page and upstream homepage linked above for installation and usage details."
---

Abandon the thought of IP Addresses and Port Numbers. Instead start thinking that two programs should be able to communicate with each other as long as they know the same secret (rather than each other’s IP Address and Port Number). The Global Socket library facilitates this: It locally derives temporary session keys and IDs and connects two programs through the Global Socket Relay Network (GSRN) regardless and independent of the local IP Address or geographical location.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
