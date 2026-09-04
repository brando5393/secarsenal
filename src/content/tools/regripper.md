---
name: "regripper"
tagline: "Perform forensic analysis of registry hives"
categories: ["digital-forensics"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/regripper/"
downloadUrl: "https://github.com/keydet89/RegRipper3.0"
repoUrl: "https://salsa.debian.org/pkg-security-team/regripper"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install regripper`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

Regripper’s CLI tool can be used to surgically extract, translate, and display information (both data and metadata) from Registry-formatted files via plugins in the form of Perl-scripts. It allows the analyst to select a hive-file to parse and a plugin or a profile, which is a list of plugins to run against the given hive. The results go to STDOUT and can be redirected to a file, that the analyst designates.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
