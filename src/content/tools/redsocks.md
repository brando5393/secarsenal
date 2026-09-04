---
name: "redsocks"
tagline: "Arbitrary TCP connection redirector to a SOCKS or HTTPS proxy server"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/redsocks/"
downloadUrl: "http://darkk.net.ru/redsocks/"
repoUrl: "https://salsa.debian.org/debian/redsocks"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page and upstream homepage linked above for installation and usage details."
---

Redsocks is a daemon running on the local system, that will transparently tunnel any TCP connection via a remote SOCKS4, SOCKS5 or HTTP proxy server. It uses the system firewall’s redirection facility to intercept TCP connections, thus the redirection is system-wide, with fine-grained control, and does not depend on LD_PRELOAD libraries.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
