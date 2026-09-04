---
name: "smbmap"
tagline: "Handy SMB enumeration tool"
categories: ["pass-the-hash","network-share-discovery"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/smbmap/"
downloadUrl: "https://github.com/ShawnDEvans/smbmap"
repoUrl: "https://salsa.debian.org/pkg-security-team/smbmap"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install smbmap`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

SMBMap allows users to enumerate samba share drives across an entire domain. List share drives, drive permissions, share contents, upload/download functionality, file name auto-download pattern matching, and even execute remote commands. This tool was designed with pen testing in mind, and is intended to simplify searching for potentially sensitive data across large networks. Features: Pass-the-Hash Support File upload/download/delete Permission enumeration (writable share, meet Metasploit) Remote Command Execution Distrubted file content searching (beta!) File name matching (with an auto downoad capability) Host file parser supports IPs, host names, and CIDR SMB sigining detection Server version output Kerberos support! (super beta)

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
