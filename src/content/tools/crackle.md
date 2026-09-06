---
name: "crackle"
tagline: "Crack and decrypt BLE encryption"
categories: ["password-cracking"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/crackle/"
downloadUrl: "https://github.com/mikeryan/crackle"
repoUrl: "https://gitlab.com/kalilinux/packages/crackle"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page and upstream homepage linked above for installation and usage details."
---

crackle exploits a flaw in the BLE pairing process that allows an attacker to guess or very quickly brute force the TK (Temporary Key). With the TK and other data collected from the pairing process, the STK (Short Term Key) and later the LTK (Long Term Key) can be collected.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
