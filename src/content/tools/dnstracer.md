---
name: "dnstracer"
tagline: "Trace DNS queries to the source"
categories: ["network-information-dns"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/dnstracer/"
downloadUrl: "http://www.mavetju.org/unix/dnstracer.php"
repoUrl: "https://salsa.debian.org/creekorful/dnstracer"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install dnstracer`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

dnstracer determines where a given Domain Name Server (DNS) gets its information from for a given hostname, and follows the chain of DNS servers back to the authoritative answer.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
