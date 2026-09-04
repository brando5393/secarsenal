---
name: "bruteforce-luks"
tagline: "Try to find a password of a LUKS encrypted volume"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/bruteforce-luks/"
downloadUrl: "https://github.com/glv2/bruteforce-luks"
repoUrl: "https://salsa.debian.org/pkg-security-team/bruteforce-luks"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page and upstream homepage linked above for installation and usage details."
---

The program is used to try discovery a password for encrypted LUKS volume used to security reasons. It works trying decrypt at least one of the key slots by trying all the possible passwords. It is used in forensics and is especially useful if you know something about the password (i.e. you forgot a part of your password but still remember most of it).

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
