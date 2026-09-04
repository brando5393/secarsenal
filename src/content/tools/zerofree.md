---
name: "zerofree"
tagline: "Zero free blocks from ext2, ext3 and ext4 file-systems"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/zerofree/"
downloadUrl: "https://frippery.org/uml/"
repoUrl: "https://salsa.debian.org/debian/zerofree"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page and upstream homepage linked above for installation and usage details."
---

Zerofree finds the unallocated blocks with non-zero value content in an ext2, ext3 or ext4 file-system and fills them with zeroes (zerofree can also work with another value than zero). This is mostly useful if the device on which this file-system resides is a disk image. In this case, depending on the type of disk image, a secondary utility may be able to reduce the size of the disk image after zerofree has been run. Zerofree requires the file-system to be unmounted or mounted read-only.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
