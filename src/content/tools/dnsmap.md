---
name: "dnsmap"
tagline: "DNS domain name brute forcing tool"
categories: ["network-information-dns"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/dnsmap/"
downloadUrl: "https://github.com/resurrecting-open-source-projects/dnsmap"
repoUrl: "https://salsa.debian.org/pkg-security-team/dnsmap"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page and upstream homepage linked above for installation and usage details."
---

dnsmap scans a domain for common subdomains using a built-in or an external wordlist (if specified using -w option). The internal wordlist has around 1000 words in English and Spanish as ns1, firewall servicios and smtp. So will be possible search for smtp.example.com inside example.com automatically. Results can be saved in CSV and human-readable format for further processing. dnsmap does NOT require root privileges to be run, and should NOT be run with such privileges for security reasons.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
