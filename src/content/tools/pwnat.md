---
name: "pwnat"
tagline: "NAT to NAT client-server communication"
categories: ["protocol-tunneling"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/pwnat/"
downloadUrl: "https://samy.pl/pwnat/"
repoUrl: "https://gitlab.com/kalilinux/packages/pwnat"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install pwnat`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

pwnat, pronounced “poe-nat”, is a tool that allows any number of clients behind NATs to communicate with a server behind a separate NAT with no port forwarding and no DMZ setup on any routers in order to directly communicate with each other. The server does not need to know anything about the clients trying to connect.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
