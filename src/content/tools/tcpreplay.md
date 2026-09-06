---
name: "tcpreplay"
tagline: "Tool to replay saved tcpdump files at arbitrary speeds"
categories: ["network-security-appliances"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/tcpreplay/"
downloadUrl: "http://tcpreplay.appneta.com/"
repoUrl: "https://git.in-ulm.de/cbiedl/tcpreplay"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install tcpreplay`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

Tcpreplay is aimed at testing the performance of a NIDS by replaying real background network traffic in which to hide attacks. Tcpreplay allows you to control the speed at which the traffic is replayed, and can replay arbitrary tcpdump traces. Unlike programmatically-generated artificial traffic which doesn’t exercise the application/protocol inspection that a NIDS performs, and doesn’t reproduce the real-world anomalies that appear on production networks (asymmetric routes, traffic bursts/lulls, fragmentation, retransmissions, etc.), tcpreplay allows for exact replication of real traffic seen on real networks. It included the following executables tcpprep, tcprewrite, tcpreplay-edit, tcpbridge and pcap based captures are possible.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
