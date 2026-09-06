---
name: "princeprocessor"
tagline: "Standalone password candidate generator using the PRINCE algorithm"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/princeprocessor/"
downloadUrl: "https://github.com/hashcat/princeprocessor"
repoUrl: "https://salsa.debian.org/pkg-security-team/princeprocessor"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install princeprocessor`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

Princeprocessor is a password candidate generator and can be thought of as an advanced combinator attack. Rather than taking as input two different wordlists and then outputting all the possible two word combinations though, princeprocessor only has one input wordlist and builds “chains” of combined words. These chains can have 1 to N words from the input wordlist concatenated together. The name PRINCE is used as an acronym and stands for PRobability INfinite Chained Elements, which are the building blocks of the algorithm.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
