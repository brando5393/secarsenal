---
name: "extundelete"
tagline: "Utility to recover deleted files from ext3/ext4 partition"
categories: ["forensic-carving-tools"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/extundelete/"
downloadUrl: "http://extundelete.sourceforge.net/"
repoUrl: "https://salsa.debian.org/pkg-security-team/extundelete"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install extundelete`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

extundelete uses the information stored in the partition’s journal to attempt to recover a file that has been deleted. There is no guarantee that any particular file will be able to be undeleted.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
