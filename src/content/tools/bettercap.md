---
name: Bettercap
tagline: Modular network attack and monitoring framework for MITM, Wi-Fi, and BLE
categories: [sniffing-spoofing, network-analysis, wireless]
platforms: [Linux, macOS]
license: GPL-3.0
lastVerified: 2026-09-04
docsUrl: https://www.bettercap.org/project/introduction
downloadUrl: https://github.com/bettercap/bettercap/releases
repoUrl: https://github.com/bettercap/bettercap
commonlyOn: [Kali Linux, Parrot Security OS, BlackArch]
gettingStarted: |
  Install via your package manager (preinstalled on Kali) or build from
  source. Start it with `sudo bettercap`, then use its interactive
  console (or the web UI module) to enable modules like `net.probe`,
  `net.sniff`, and ARP-spoofing modules against hosts on the local
  network. The official docs cover the full module list spanning
  network, Wi-Fi, and Bluetooth Low Energy attacks.
---

Bettercap is a modular framework for network attacks and monitoring,
covering man-in-the-middle traffic manipulation, Wi-Fi reconnaissance
and deauth attacks, and BLE device enumeration — a more actively
developed, broader successor to tools like Ettercap for many use cases.

Only use it on networks/devices you own or are explicitly authorized to
test — see the [disclaimer](/disclaimer).
