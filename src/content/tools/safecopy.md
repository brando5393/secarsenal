---
name: "safecopy"
tagline: "Data recovery tool for problematic or damaged media"
categories: ["forensic-carving-tools"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/safecopy/"
downloadUrl: "http://safecopy.sf.net"
repoUrl: "https://salsa.debian.org/pkg-security-team/safecopy"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page and upstream homepage linked above for installation and usage details."
---

Safecopy tries to get as much data from SOURCE as possible, even resorting to device specific low level operations if applicable. This is achieved by identifying problematic or damaged areas, skipping over them and continuing reading afterwards. The corresponding area in the destination file is either skipped (on initial creation that means padded with zeros) or deliberately filled with a recognizable pattern to later find affected files on a corrupted device. The work is similar to ddrescue, generating an image of the original media. This media can be floppy disks, harddisk partitions, CDs, DVDs, tape devices, where other tools like dd would fail due to I/O errors.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
