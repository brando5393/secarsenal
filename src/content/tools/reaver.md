---
name: "reaver"
tagline: "Brute force attack tool against Wi-Fi Protected Setup PIN number"
categories: ["wifi","wifi-credential-access"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/reaver/"
downloadUrl: "https://github.com/t6x/reaver-wps-fork-t6x"
repoUrl: "https://salsa.debian.org/pkg-security-team/reaver"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install reaver`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

Reaver performs a brute force attack against an access point’s Wi-Fi Protected Setup pin number. Once the WPS pin is found, the WPA PSK can be recovered and alternately the AP’s wireless settings can be reconfigured. This package also provides the Wash executable, an utility for identifying WPS enabled access points. See documentation in /usr/share/doc/reaver/README.WASH.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
