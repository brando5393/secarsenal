---
name: "whatmask"
tagline: "Helper for network settings"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/whatmask/"
downloadUrl: "http://www.laffeycomputer.com/whatmask.html"
repoUrl: "https://gitlab.com/kalilinux/packages/whatmask"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install whatmask`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

This package contains a small C program that will help you with network settings. Whatmask can work in two modes. The first mode is to invoke Whatmask with only a subnet mask as the argument. In this mode Whatmask will echo back the subnet mask in four formats, plus the number of useable addresses in the range. The second mode is to invoke Whatmask with any ip address within the subnet, followed by a slash (’/’), followed by the subnet mask in any format. Whatmask will echo back the following:

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
