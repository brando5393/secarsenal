---
name: "redfang"
tagline: "Locates non-discoverable bluetooth devices"
categories: ["bluetooth"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/redfang/"
repoUrl: "https://gitlab.com/kalilinux/packages/redfang"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install redfang`. See the official Kali tool page linked above for full usage and configuration details."
---

fang is a small proof-of-concept application to find non discoveredable bluetooth devices. This is done by brute forcing the last six (6) bytes of the bluetooth address of the device and doing a read_remote_name().

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
