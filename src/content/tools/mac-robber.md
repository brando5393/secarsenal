---
name: "mac-robber"
tagline: "Collects data about allocated files in mounted filesystems"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/mac-robber/"
downloadUrl: "https://www.sleuthkit.org/mac-robber"
repoUrl: "https://salsa.debian.org/pkg-security-team/mac-robber"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page and upstream homepage linked above for installation and usage details."
---

mac-robber is a digital investigation tool (digital forensics) that collects metadata from allocated files in a mounted filesystem. This is useful during incident response when analyzing a live system or when analyzing a dead system in a lab. The data can be used by the mactime tool in The Sleuth Kit (TSK or SleuthKit only) to make a timeline of file activity. The mac-robber tool is based on the grave-robber tool from TCT (The Coroners Toolkit).

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
