---
name: "recoverdm"
tagline: "Recover files on disks with damaged sectors"
categories: ["forensic-carving-tools"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/recoverdm/"
downloadUrl: "https://www.vanheusden.com/recoverdm"
repoUrl: "https://salsa.debian.org/pkg-security-team/recoverdm"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page and upstream homepage linked above for installation and usage details."
---

recoverdm recover disks with bad sectors. You can recover files as well complete devices. In case it finds sectors which simply cannot be recovered, it writes an empty sector to the output file and continues.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
