---
name: "ngrep"
tagline: "Grep for network traffic"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/ngrep/"
downloadUrl: "https://github.com/jpr5/ngrep"
repoUrl: "https://salsa.debian.org/debian/ngrep"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install ngrep`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

ngrep strives to provide most of GNU grep’s common features, applying them to the network layer. ngrep is a pcap-aware tool that will allow you to specify extended regular expressions to match against data payloads of packets. It currently recognizes TCP, UDP and ICMP across Ethernet, PPP, SLIP and null interfaces, and understands bpf filter logic in the same fashion as more common packet sniffing tools, such as tcpdump and snoop.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
