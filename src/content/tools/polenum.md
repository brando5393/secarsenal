---
name: "polenum"
tagline: "Extracts the password policy from a Windows system"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/polenum/"
downloadUrl: "https://github.com/Wh1t3Fox/polenum/"
repoUrl: "https://salsa.debian.org/pkg-security-team/polenum"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install polenum`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

polenum is a Python script which uses the Impacket Library from CORE Security Technologies to extract the password policy information from a windows machine. This allows a non-windows (Linux, Mac OSX, BSD etc..) user to query the password policy of a remote windows box without the need to have access to a windows machine.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
