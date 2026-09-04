---
name: "fping"
tagline: "Sends ICMP ECHO_REQUEST packets to network hosts"
categories: ["remote-system-discovery"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/fping/"
downloadUrl: "https://www.fping.org/"
repoUrl: "https://salsa.debian.org/debian/fping"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install fping`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

fping is a ping like program which uses the Internet Control Message Protocol (ICMP) echo request to determine if a target host is responding. fping differs from ping in that you can specify any number of targets on the command line, or specify a file containing the lists of targets to ping. Instead of sending to one target until it times out or replies, fping will send out a ping packet and move on to the next target in a round-robin fashion.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
