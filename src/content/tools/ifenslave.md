---
name: "ifenslave"
tagline: "Configure network interfaces for parallel routing (bonding)"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/ifenslave/"
repoUrl: "https://salsa.debian.org/debian/ifenslave"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page linked above for installation and usage details."
---

This is a tool to attach and detach slave network interfaces to a bonding device. A bonding device will act like a normal Ethernet network device to the kernel, but will send out the packets via the slave devices using a simple round-robin scheduler. This allows for simple load-balancing, identical to “channel bonding” or “trunking” techniques used in switches.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
