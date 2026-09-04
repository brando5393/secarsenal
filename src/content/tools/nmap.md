---
name: Nmap
tagline: Network discovery and port scanning utility
categories: [recon, network-analysis]
platforms: [Linux, Windows, macOS]
license: GPL-2.0
lastVerified: 2026-09-04
docsUrl: https://nmap.org/docs.html
downloadUrl: https://nmap.org/download.html
repoUrl: https://github.com/nmap/nmap
commonlyOn: [Kali Linux, Parrot Security OS, BlackArch]
gettingStarted: |
  Install via your distro's package manager (`apt install nmap`,
  `pacman -S nmap`) or grab an installer from the official downloads page.
  A basic scan of a host you're authorized to test:
  `nmap -sV -sC <target>` runs service/version detection plus default
  scripts. The official reference guide and `nmap -h` cover scan types
  (SYN, connect, UDP), timing templates, and the Nmap Scripting Engine
  (NSE) for more advanced enumeration.
---

Nmap ("Network Mapper") is the standard open-source tool for host
discovery and port scanning, widely used in the reconnaissance phase of
an authorized penetration test to map what services are reachable on a
target network.

Only scan systems you own or have explicit written authorization to
test — see the [disclaimer](/disclaimer).
