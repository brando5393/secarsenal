---
name: NST
tagline: Fedora-based network security monitoring and analysis toolkit
category: specialized
basedOn: Fedora
lastVerified: 2026-09-05
docsUrl: https://sourceforge.net/projects/nst/
toolListMaintenance: manual
notableTools:
  - wireshark
  - snort
  - nmap
  - kismet
gettingStarted: |
  NST (Network Security Toolkit) ships as a large (~6GB) bootable Live
  ISO/USB image built on Fedora, oriented around a web-based UI for
  network monitoring, analysis, and remote administration rather than a
  traditional desktop. It bundles most of Insecure.org's "Top 125
  Security Tools," with particular emphasis on packet capture/analysis,
  monitoring, and intrusion detection. Its own package manifest lists
  every OS package rather than a curated tool catalog, so it isn't a
  source we can sync from directly.
---

NST is a Fedora-based toolkit focused on network security monitoring
and analysis, built around a web UI rather than a general desktop
pentest environment.

Use it only against systems/networks you own or are explicitly
authorized to test — see the [disclaimer](/disclaimer).
