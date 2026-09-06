---
name: "dns2tcp"
tagline: "TCP-over-DNS tunnel server and client"
categories: ["protocol-tunneling"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/dns2tcp/"
repoUrl: "https://salsa.debian.org/debian/dns2tcp"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install dns2tcp`. See the official Kali tool page linked above for full usage and configuration details."
---

dns2tcp is a set of tools to encapsulate a TCP session in DNS packets. This type of encapsulation generates smaller packets than IP-over-DNS, improving throughput. The client does not need root privileges.1

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
