---
name: "ddrescue"
tagline: "Data recovery and protection tool"
categories: ["forensic-imaging-tools"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/ddrescue/"
downloadUrl: "http://www.garloff.de/kurt/linux/ddrescue/"
repoUrl: "https://gitlab.com/kalilinux/packages/ddrescue"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install ddrescue`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

When your disk has crashed and you try to copy it over to another one, standard Unix tools like cp, cat, and dd will abort on every I/O error, dd_rescue does not. It optimizes copying by using large blocks as long as no errors occur and falls back to smaller blocks. It supports reverse direction copying (to approach a bad spot from the top), sparse copying, preallocating space, splice zerocopy, and bypassing the kernel pagecache with O_DIRECT. dd_rescue provides safe deletion of data by overwriting files (or better partitions/disks) multiple times with fast random numbers. With the ddr_hash plugin, it supports calculating a hash value (such as a sha256sum) or an HMAC during copying.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
