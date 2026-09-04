---
name: "evil-ssdp"
tagline: "Spoof SSDP replies to phish for NTLM hashes on a network"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/evil-ssdp/"
downloadUrl: "https://github.com/initstring/evil-ssdp"
repoUrl: "https://gitlab.com/kalilinux/packages/evil-ssdp"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install evil-ssdp`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

This tool responds to SSDP multicast discover requests, posing as a generic UPNP device on a local network. Your spoofed device will magically appear in Windows Explorer on machines in your local network. Users who are tempted to open the device are shown a configurable webpage.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
