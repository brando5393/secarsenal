---
name: "magicrescue"
tagline: "Recover files by looking for magic bytes"
categories: ["forensic-carving-tools"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/magicrescue/"
downloadUrl: "https://github.com/jbj/magicrescue"
repoUrl: "https://salsa.debian.org/pkg-security-team/magicrescue"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page and upstream homepage linked above for installation and usage details."
---

Magic Rescue scans a block device for file types it knows how to recover and calls an external program to extract them. It looks at “magic bytes” (file patterns) in file contents, so it can be used both as an undelete utility and for recovering a corrupted drive or partition. As long as the file data is there, it will find it.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
