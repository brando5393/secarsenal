---
name: Reaver
tagline: WPS PIN brute-force attack tool for recovering WPA/WPA2 passphrases
categories: [wireless]
platforms: [Linux]
license: GPL-2.0
lastVerified: 2026-09-04
docsUrl: https://github.com/t6x/reaver-wps-fork-t6x#readme
downloadUrl: https://github.com/t6x/reaver-wps-fork-t6x
repoUrl: https://github.com/t6x/reaver-wps-fork-t6x
commonlyOn: [Kali Linux, Parrot Security OS, BlackArch]
gettingStarted: |
  Install via your package manager (preinstalled on Kali) or build from
  source; requires a monitor-mode-capable wireless adapter. Basic usage:
  `reaver -i <monitor-interface> -b <target-bssid> -vv` attempts to
  brute-force the target access point's WPS PIN, which can then recover
  the WPA/WPA2 passphrase on vulnerable routers. The README covers
  timing/delay options needed against APs with lockout protections.
---

Reaver exploits weaknesses in the WPS (Wi-Fi Protected Setup) PIN
mechanism on many consumer routers to brute-force the PIN and recover
the underlying WPA/WPA2 passphrase, without needing to crack the
passphrase directly.

Only use it against wireless networks you own or are explicitly
authorized to test — see the [disclaimer](/disclaimer).
