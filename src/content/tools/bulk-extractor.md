---
name: "bulk-extractor"
tagline: "Extracts information without parsing filesystem"
categories: ["forensics"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/bulk-extractor/"
downloadUrl: "https://github.com/simsong/bulk_extractor"
repoUrl: "https://gitlab.com/kalilinux/packages/bulk-extractor"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install bulk-extractor`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

bulk_extractor is a C++ program that scans a disk image, a file, or a directory of files and extracts useful information without parsing the file system or file system structures. The results are stored in feature files that can be easily inspected, parsed, or processed with automated tools. bulk_extractor also creates histograms of features that it finds, as features that are more common tend to be more important.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
