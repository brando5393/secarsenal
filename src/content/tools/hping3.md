---
name: "hping3"
tagline: "Active Network Smashing Tool"
categories: ["remote-system-discovery","discovery"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/hping3/"
downloadUrl: "http://www.hping.org/"
repoUrl: "https://salsa.debian.org/debian/hping3"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install hping3`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

hping3 is a network tool able to send custom ICMP/UDP/TCP packets and to display target replies like ping does with ICMP replies. It handles fragmentation and arbitrary packet body and size, and can be used to transfer files under supported protocols. Using hping3, you can test firewall rules, perform (spoofed) port scanning, test network performance using different protocols, do path MTU discovery, perform traceroute-like actions under different protocols, fingerprint remote operating systems, audit TCP/IP stacks, etc. hping3 is scriptable using the Tcl language.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
