---
name: "monocle"
tagline: "A local network host discovery tool. In passive mode, it will listen for ARP request and reply packets. In active mode, "
categories: ["recon"]
platforms: ["Linux"]
lastVerified: 2026-09-05
docsUrl: "https://blackarch.org/recon.html"
downloadUrl: "http://packetstormsecurity.com/files/99823/Monocle-Host-Discovery-Tool.0.html"
commonlyOn: ["BlackArch"]
gettingStarted: "Install on BlackArch with `pacman -S monocle` (or add the BlackArch repository to an existing Arch Linux install). See the official BlackArch tool listing and upstream homepage linked above for details."
---

A local network host discovery tool. In passive mode, it will listen for ARP request and reply packets. In active mode, it will send ARP requests to the specific IP range. The results are a list of IP and MAC addresses present on the local network.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
