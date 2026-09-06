---
name: "ridenum"
tagline: "Null session RID cycle attack tool"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/ridenum/"
downloadUrl: "https://github.com/trustedsec/ridenum"
repoUrl: "https://gitlab.com/kalilinux/packages/ridenum"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install ridenum`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

Rid Enum is a RID cycling attack that attempts to enumerate user accounts through null sessions and the SID to RID enum. If you specify a password file, it will automatically attempt to brute force the user accounts when its finished enumerating.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
