---
name: "dhcpig"
tagline: "DHCP exhaustion script using scapy network library"
categories: ["impact"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/dhcpig/"
downloadUrl: "https://github.com/kamorin/DHCPig"
repoUrl: "https://salsa.debian.org/pkg-security-team/dhcpig"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page and upstream homepage linked above for installation and usage details."
---

DHCPig initiates an advanced DHCP exhaustion attack. It will consume all IPs on the LAN, stop new users from obtaining IPs, release any IPs in use, then for good measure send gratuitous ARP and knock all windows hosts offline.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
