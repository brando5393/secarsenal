---
name: "dumpzilla"
tagline: "Mozilla browser forensic tool"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/dumpzilla/"
downloadUrl: "http://www.dumpzilla.org/"
repoUrl: "https://gitlab.com/kalilinux/packages/dumpzilla"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install dumpzilla`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

Dumpzilla application is developed in Python 3.x and has as purpose extract all forensic interesting information of Firefox, Iceweasel and Seamonkey browsers to be analyzed. Due to its Python 3.x development, might not work properly in old Python versions, mainly with certain characters. Works under Unix and Windows 32/64 bits systems. Works in command line interface, so information dumps could be redirected by pipes with tools such as grep, awk, cut, sed… Dumpzilla allows one to visualize following sections, search customization and extract certain content.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
