---
name: "p0f"
tagline: "Passive OS fingerprinting tool"
categories: ["remote-system-discovery"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/p0f/"
downloadUrl: "https://lcamtuf.coredump.cx/p0f3/"
repoUrl: "https://salsa.debian.org/pkg-security-team/p0f"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install p0f`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

p0f performs passive OS detection based on SYN packets. Unlike nmap and queso, p0f does recognition without sending any data. Additionally, it is able to determine the distance to the remote host, and can be used to determine the structure of a foreign or local network. When running on the gateway of a network it is able to gather huge amounts of data and provide useful statistics. On a user-end computer it could be used as powerful IDS add-on. p0f supports full tcpdump-style filtering expressions, and has an extensible and detailed fingerprinting database.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
