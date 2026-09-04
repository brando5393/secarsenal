---
name: "braa"
tagline: "Mass SNMP scanner"
categories: ["snmp"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/braa/"
downloadUrl: "https://github.com/mteg/braa"
repoUrl: "https://salsa.debian.org/pkg-security-team/braa"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page and upstream homepage linked above for installation and usage details."
---

Braa is a mass snmp scanner. The intended usage of such a tool is of course making SNMP queries - but unlike snmpget or snmpwalk from net-snmp, it is able to query dozens or hundreds of hosts simultaneously, and in a single process. Thus, it consumes very few system resources and does the scanning VERY fast.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
