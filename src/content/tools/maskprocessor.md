---
name: "maskprocessor"
tagline: "High-performance word generator with a per-position configurable charset"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/maskprocessor/"
downloadUrl: "https://github.com/hashcat/maskprocessor"
repoUrl: "https://salsa.debian.org/pkg-security-team/maskprocessor"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install maskprocessor`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

Maskprocessor is a fast word list generator. It enumerates all combinations from a given user-defined keyspace and outputs the results. Since it supports different alphabets (which also can be combined) at different positions in the generation template (‘mask’), this approach allows a more fine-tunable generation of candidates than using ’naive’ brute force enumeration of words. Masks are defined using the description also used in the Hashcat password recovery utility.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
