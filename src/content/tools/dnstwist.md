---
name: "dnstwist"
tagline: "Domain name permutation engine"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/dnstwist/"
downloadUrl: "https://github.com/elceef/dnstwist"
repoUrl: "https://salsa.debian.org/pkg-security-team/dnstwist"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install dnstwist`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

dnstwist generates a list of similarly looking domain names for a given domain name and performs DNS queries for them (A, AAAA, NS and MX). For MX records it checks whether there is an active mail server which could be used to intercept misdirected emails. Additionally it estimates webpage similarity based on fuzzy hashes. This functionality might be helpful in detecting typosquatters, phishing attacks, fraud and corporate espionage.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
