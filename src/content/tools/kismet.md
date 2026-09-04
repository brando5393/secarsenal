---
name: Kismet
tagline: Wireless network and device detector, sniffer, and intrusion detection tool
categories: [wireless, network-analysis]
platforms: [Linux, macOS]
license: GPL-2.0
lastVerified: 2026-09-04
docsUrl: https://www.kismetwireless.net/docs/
downloadUrl: https://www.kismetwireless.net/download/
repoUrl: https://github.com/kismetwireless/kismet
commonlyOn: [Kali Linux, Parrot Security OS]
gettingStarted: |
  Install via your package manager (preinstalled on Kali) or build from
  source; requires a wireless adapter supporting monitor mode for Wi-Fi
  capture (also supports Bluetooth, SDR, and other capture sources).
  Run `kismet` to start the capture engine and web UI (default
  http://localhost:2501), which shows discovered networks and devices
  in real time. The docs cover data sources, alerts, and the REST API.
---

Kismet is a passive wireless detector, sniffer, and WIDS (wireless
intrusion detection system) that identifies networks and devices across
Wi-Fi, Bluetooth, and other RF protocols without actively transmitting,
making it useful for wireless site surveys and monitoring.

Only use it on networks you own or are explicitly authorized to survey
— see the [disclaimer](/disclaimer).
