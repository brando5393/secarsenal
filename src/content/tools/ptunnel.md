---
name: "ptunnel"
tagline: "Tunnel TCP connections over ICMP packets"
categories: ["protocol-tunneling"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/ptunnel/"
downloadUrl: "http://www.mit.edu/afs.new/sipb/user/golem/tmp/ptunnel-0.61.orig/web/"
repoUrl: "https://salsa.debian.org/alteholz/ptunnel"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page and upstream homepage linked above for installation and usage details."
---

ptunnel is an application that allows you to reliably tunnel TCP connections to a remote host using ICMP echo request and reply packets, commonly known as ping requests and replies. It acts as a proxy and can handle sockets and secured identification.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
