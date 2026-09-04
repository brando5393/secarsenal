---
name: Netdiscover
tagline: Active/passive ARP-based network host discovery tool
categories: [recon, network-analysis]
platforms: [Linux]
license: GPL-3.0
lastVerified: 2026-09-04
docsUrl: https://github.com/netdiscover-scanner/netdiscover#readme
downloadUrl: https://github.com/netdiscover-scanner/netdiscover
repoUrl: https://github.com/netdiscover-scanner/netdiscover
commonlyOn: [Kali Linux, Parrot Security OS, BlackArch]
gettingStarted: |
  Install via your package manager (preinstalled on Kali). Basic usage:
  `netdiscover -r <ip-range>` actively ARP-scans a range to list live
  hosts and their MAC vendor, or run with no arguments for passive mode
  to just listen for ARP traffic on the local network. The README
  covers its scan modes and output options.
---

Netdiscover is a lightweight tool for discovering live hosts on a local
network segment via ARP requests/replies, useful as a fast first step
on an internal network engagement before more detailed scanning with
Nmap.

Only use it on networks you own or are explicitly authorized to scan —
see the [disclaimer](/disclaimer).
