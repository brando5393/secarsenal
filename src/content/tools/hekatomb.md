---
name: "hekatomb"
tagline: "Extract and decrypt all credentials from all domain computers"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/hekatomb/"
downloadUrl: "https://github.com/ProcessusT/HEKATOMB"
repoUrl: "https://gitlab.com/kalilinux/packages/hekatomb"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install hekatomb`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

Hekatomb is a Python script that connects to an LDAP directory to retrieve all computers and users’ information. From there, it will download all DPAPI blobs of all users from all computers and use Domain backup keys to decrypt them.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
