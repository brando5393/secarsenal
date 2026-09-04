---
name: Wifite
tagline: Automated wireless network auditing tool built on Aircrack-ng and related tools
categories: [wireless]
platforms: [Linux]
license: GPL-2.0
lastVerified: 2026-09-04
docsUrl: https://github.com/derv82/wifite2#readme
downloadUrl: https://github.com/derv82/wifite2
repoUrl: https://github.com/derv82/wifite2
commonlyOn: [Kali Linux, Parrot Security OS, BlackArch]
gettingStarted: |
  Install via your package manager (preinstalled on Kali) or clone the
  repo; requires a wireless adapter supporting monitor mode, plus
  Aircrack-ng and related tools it wraps. Running `wifite` with no
  arguments scans for nearby networks and walks through attacking each
  selected target automatically (handshake capture, PMKID, WEP attacks
  as applicable). The README covers command-line flags for narrowing
  scope and attack types.
---

Wifite automates the wireless auditing workflow — scanning for
networks, capturing handshakes/PMKIDs, and attempting cracks — by
orchestrating Aircrack-ng, Reaver, and other underlying tools so an
operator doesn't have to run each step by hand.

Only use it against wireless networks you own or are explicitly
authorized to test — see the [disclaimer](/disclaimer).
