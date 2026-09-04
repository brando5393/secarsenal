---
name: "fierce"
tagline: "Domain DNS scanner"
categories: ["remote-system-discovery","discovery"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/fierce/"
downloadUrl: "https://github.com/mschwager/fierce"
repoUrl: "https://salsa.debian.org/pkg-security-team/fierce"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page and upstream homepage linked above for installation and usage details."
---

Fierce is a semi-lightweight scanner that helps locate non-contiguous IP space and hostnames against specified domains. It’s really meant as a pre-cursor to nmap, unicornscan, nessus, nikto, etc, since all of those require that you already know what IP space you are looking for. This does not perform exploitation and does not scan the whole internet indiscriminately. It is meant specifically to locate likely targets both inside and outside a corporate network.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
