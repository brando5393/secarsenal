---
name: "hostapd-wpe"
tagline: "Modified hostapd to facilitate AP impersonation attacks"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/hostapd-wpe/"
downloadUrl: "https://github.com/aircrack-ng/aircrack-ng/tree/master/patches/wpe"
repoUrl: "https://gitlab.com/kalilinux/packages/hostapd-wpe"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page and upstream homepage linked above for installation and usage details."
---

This package contains hostapd modified with hostapd-wpe.patch. It implements IEEE 802.1x Authenticator and Authentication Server impersonation attacks to obtain client credentials, establish connectivity to the client, and launch other attacks where applicable.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
