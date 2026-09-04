---
name: Wireshark
tagline: Network protocol analyzer for live capture and offline inspection
categories: [network-analysis, forensics]
platforms: [Linux, Windows, macOS]
license: GPL-2.0
lastVerified: 2026-09-04
docsUrl: https://www.wireshark.org/docs/
downloadUrl: https://www.wireshark.org/download.html
repoUrl: https://gitlab.com/wireshark/wireshark
commonlyOn: [Kali Linux, Parrot Security OS, BlackArch]
gettingStarted: |
  Install via your package manager or the official Windows/macOS
  installers. Select a network interface to start a live capture, or open
  a `.pcap` file for offline analysis. Display filters (e.g. `http`,
  `tcp.port == 443`) are the core skill to learn first — the official
  User's Guide has a full filter reference and walkthroughs for common
  protocols.
---

Wireshark is the standard open-source packet analyzer, used to capture
and inspect live traffic or replay saved captures during network
troubleshooting, protocol analysis, and the traffic-analysis phase of a
security assessment.

Only capture traffic on networks you own or are explicitly authorized to
monitor — see the [disclaimer](/disclaimer).
