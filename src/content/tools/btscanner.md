---
name: "btscanner"
tagline: "Ncurses-based scanner for Bluetooth devices"
categories: ["bluetooth"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/btscanner/"
downloadUrl: "https://salsa.debian.org/pkg-security-team/btscanner"
repoUrl: "https://salsa.debian.org/pkg-security-team/btscanner"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install btscanner`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

btscanner is a tool designed specifically to extract as much information as possible from a Bluetooth device without the requirement to pair. A detailed information screen extracts HCI and SDP information, and maintains an open connection to monitor the RSSI and link quality. btscanner is based on the BlueZ Bluetooth stack, which is included with recent Linux kernels, and the BlueZ toolset. btscanner also contains a complete listing of the IEEE OUI numbers and class lookup tables. Using the information gathered from these sources it is possible to make educated guesses as to the host device type.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
