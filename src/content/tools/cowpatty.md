---
name: "cowpatty"
tagline: "Brute-force WPA dictionary attack"
categories: ["wifi-credential-access"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/cowpatty/"
downloadUrl: "https://www.willhackforsushi.com/?page_id=50"
repoUrl: "https://salsa.debian.org/pkg-security-team/cowpatty"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install cowpatty`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

If you are auditing WPA-PSK or WPA2-PSK networks, you can use this tool to identify weak passphrases that were used to generate the PMK. Supply a libpcap capture file that includes the 4-way handshake, a dictionary file of passphrases to guess with, and the SSID for the network.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
