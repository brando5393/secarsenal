---
name: "udptunnel"
tagline: "Tunnel UDP packets over a TCP connection"
categories: ["protocol-tunneling"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/udptunnel/"
downloadUrl: "http://www1.cs.columbia.edu/~lennox/udptunnel/"
repoUrl: "https://salsa.debian.org/debian/udptunnel"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install udptunnel`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

UDPTunnel is a small program which can tunnel UDP packets bi-directionally over a TCP connection. Its primary purpose (and original motivation) is to allow multi-media conferences to traverse a firewall which allows only outgoing TCP connections. UDPTunnel also can be used for security tests in networks.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
