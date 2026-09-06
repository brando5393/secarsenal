---
name: "firewalk"
tagline: "Active reconnaissance network security tool"
categories: ["network-security-appliances"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/firewalk/"
downloadUrl: "http://packetfactory.openwall.net/projects/firewalk/"
repoUrl: "https://salsa.debian.org/pkg-security-team/firewalk"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page and upstream homepage linked above for installation and usage details."
---

Firewalk is an active reconnaissance network security tool that attempts to determine what layer 4 protocols a given IP forwarding device will pass. It works by sending out TCP or UDP packets with a TTL one hop greater than the targeted gateway. If the gateway allows the traffic, it will forward the packets to the next hop where they will expire and elicit an ICMP_TIME_EXCEEDED message. Otherwise, it will likely drop the packets and there will be no response.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
