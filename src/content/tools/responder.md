---
name: "responder"
tagline: "LLMNR/NBT-NS/mDNS Poisoner"
categories: ["credential-access"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/responder/"
downloadUrl: "https://github.com/lgandx/Responder"
repoUrl: "https://gitlab.com/kalilinux/packages/responder"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page and upstream homepage linked above for installation and usage details."
---

This package contains Responder/MultiRelay, an LLMNR, NBT-NS and MDNS poisoner. It will answer to specific NBT-NS (NetBIOS Name Service) queries based on their name suffix (see: http://support.microsoft.com/kb/163409). By default, the tool will only answer to File Server Service request, which is for SMB.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
