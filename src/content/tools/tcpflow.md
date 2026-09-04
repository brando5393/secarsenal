---
name: "tcpflow"
tagline: "TCP flow recorder"
categories: ["network-sniffing"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/tcpflow/"
downloadUrl: "https://github.com/simsong/tcpflow"
repoUrl: "https://salsa.debian.org/debian/tcpflow"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page and upstream homepage linked above for installation and usage details."
---

tcpflow is a program that captures data transmitted as part of TCP connections (flows), and stores the data in a way that is convenient for protocol analysis or debugging. A program like ’tcpdump’ shows a summary of packets seen on the wire, but usually doesn’t store the data that’s actually being transmitted. In contrast, tcpflow reconstructs the actual data streams and stores each flow in a separate file for later analysis.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
