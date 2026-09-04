---
name: "portspoof"
tagline: "Enhance OS security through a set of techniques"
categories: ["system-services"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/portspoof/"
downloadUrl: "https://github.com/drk1wi/portspoof"
repoUrl: "https://gitlab.com/kalilinux/packages/portspoof"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page and upstream homepage linked above for installation and usage details."
---

This package contains a service to enhance OS security through a set of following techniques: * All 65535 TCP ports are always open Instead of informing an attacker that a particular port is in a CLOSED or FILTERED state Portspoof will return SYN+ACK for every port connection attempt/ * Every open TCP port emulates a service Portspoof has a huge database of dynamic service signatures, that will be used to generate fake banners and fool scanners.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
