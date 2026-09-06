---
name: "fiked"
tagline: "Cisco VPN attack tool"
categories: ["collection"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/fiked/"
downloadUrl: "https://www.roe.ch/FakeIKEd"
repoUrl: "https://gitlab.com/kalilinux/packages/fiked"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install fiked`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

FakeIKEd, or fiked for short, is a fake IKE daemon supporting just enough of the standards and Cisco extensions to attack commonly found insecure Cisco VPN PSK+XAUTH based IPsec authentication setups in what could be described as a semi MitM attack. Fiked can impersonate a VPN gateway’s IKE responder in order to capture XAUTH login credentials; it doesn’t currently do the client part of full MitM.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
