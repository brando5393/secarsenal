---
name: "binwalk"
tagline: "Tool library for analyzing binary blobs and executable code"
categories: ["forensics"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/binwalk/"
downloadUrl: "https://github.com/ReFirmLabs/binwalk"
repoUrl: "https://salsa.debian.org/pkg-security-team/binwalk"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page and upstream homepage linked above for installation and usage details."
---

Binwalk is a tool for searching a given binary image for embedded files and executable code. Specifically, it is designed for identifying files and code embedded inside of firmware images. Binwalk uses the libmagic library, so it is compatible with magic signatures created for the Unix file utility.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
