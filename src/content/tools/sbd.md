---
name: "sbd"
tagline: "Secure backdoor for Linux and Windows"
categories: ["non-application-layer-protocol"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/sbd/"
downloadUrl: "https://mirrors.kernel.org/gentoo/distfiles/sbd-1.37.tar.gz"
repoUrl: "https://gitlab.com/kalilinux/packages/sbd"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install sbd`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

sbd is a Netcat-clone, designed to be portable and offer strong encryption. It runs on Unix-like operating systems and on Microsoft Win32. sbd features AES-CBC-128 + HMAC-SHA1 encryption (by Christophe Devine), program execution (-e option), choosing source port, continuous reconnection with delay, and some other nice features. sbd supports TCP/IP communication only.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
