---
name: "termineter"
tagline: "Smart meter testing framework"
categories: ["non-application-layer-protocol"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/termineter/"
downloadUrl: "https://github.com/rsmusllp/termineter"
repoUrl: "https://salsa.debian.org/pkg-security-team/termineter"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install termineter`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

This package contains a Python framework which provides a platform for the security testing of smart meters. It implements the C1218 and C1219 protocols for communication over an optical interface. Currently supported are Meters using C1219-2007 with 7-bit character sets. This is the most common configuration found in North America. Termineter communicates with Smart Meters via a connection using an ANSI type-2 optical probe with a serial interface.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
