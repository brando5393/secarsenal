---
name: Ettercap
tagline: Man-in-the-middle attack suite for network sniffing and spoofing
categories: [sniffing-spoofing, network-analysis]
platforms: [Linux, Windows, macOS]
license: GPL-2.0
lastVerified: 2026-09-04
docsUrl: https://github.com/Ettercap/ettercap/wiki
downloadUrl: https://www.ettercap-project.org/downloads.html
repoUrl: https://github.com/Ettercap/ettercap
commonlyOn: [Kali Linux, Parrot Security OS, BlackArch]
gettingStarted: |
  Install via your package manager (preinstalled on Kali). The graphical
  mode (`ettercap -G`) is the easiest way to start: select a network
  interface, scan for hosts, and use ARP poisoning to position between
  two hosts for traffic interception. The official docs cover the
  plugin system and using Ettercap's filters to modify traffic in
  transit.
---

Ettercap is a comprehensive suite for man-in-the-middle attacks on a
LAN: ARP poisoning, traffic sniffing/filtering, and protocol
dissectors for inspecting intercepted traffic — used to demonstrate and
test exposure to local network interception attacks.

Only use it on networks you own or are explicitly authorized to test —
see the [disclaimer](/disclaimer).
