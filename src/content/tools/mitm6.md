---
name: "mitm6"
tagline: "Pwning IPv4 via IPv6"
categories: ["collection"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/mitm6/"
downloadUrl: "https://github.com/dirkjanm/mitm6"
repoUrl: "https://gitlab.com/kalilinux/packages/mitm6"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install mitm6`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

mitm6 is a pentesting tool that exploits the default configuration of Windows to take over the default DNS server. It does this by replying to DHCPv6 messages, providing victims with a link-local IPv6 address and setting the attackers host as default DNS server.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
