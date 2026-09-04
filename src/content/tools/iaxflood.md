---
name: "iaxflood"
tagline: "VoIP flooder tool"
categories: ["impact"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/iaxflood/"
downloadUrl: "http://www.hackingexposedvoip.com/sec_tools.html"
repoUrl: "https://gitlab.com/kalilinux/packages/iaxflood"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install iaxflood`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

A UDP Inter-Asterisk_eXchange (i.e. IAX) packet was captured from an IAX channel between two Asterisk IP PBX’s. The content of that packet is the source of the payload for the attack embodied by this tool. While the IAX protocol header might not match the Asterisk PBX you’ll attack with this tool, it may require more processing on the part of the PBX than a simple udpflood without any payload that even resembles an IAX payload.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
