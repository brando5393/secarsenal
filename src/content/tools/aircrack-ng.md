---
name: Aircrack-ng
tagline: Wi-Fi network security assessment suite
categories: [wireless]
platforms: [Linux, Windows]
license: GPL-2.0
lastVerified: 2026-09-04
docsUrl: https://www.aircrack-ng.org/documentation.html
downloadUrl: https://www.aircrack-ng.org/downloads.html
repoUrl: https://github.com/aircrack-ng/aircrack-ng
commonlyOn: [Kali Linux, Parrot Security OS, BlackArch]
gettingStarted: |
  Install via your package manager or build from the official source
  release; a wireless adapter that supports monitor mode is required.
  The typical workflow uses `airmon-ng` to enable monitor mode,
  `airodump-ng` to capture traffic/handshakes, and `aircrack-ng` to test
  a captured handshake against a wordlist. The official documentation
  and tutorials cover this full workflow plus WEP-specific attacks.
---

Aircrack-ng is a suite of tools for assessing Wi-Fi network security,
covering monitoring, packet capture, and testing WPA/WPA2 handshakes or
WEP keys against a wordlist or attack.

Only use it against wireless networks you own or are explicitly
authorized to test — see the [disclaimer](/disclaimer).
