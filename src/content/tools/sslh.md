---
name: "sslh"
tagline: "Applicative protocol multiplexer"
categories: ["protocol-tunneling"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/sslh/"
downloadUrl: "http://www.rutschle.net/tech/sslh/README.html"
repoUrl: "https://salsa.debian.org/debian/sslh.git"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install sslh`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

sslh lets one accept HTTPS, SSH, OpenVPN, tinc and XMPP connections on the same port. This makes it possible to connect to any of these servers on port 443 (e.g. from inside a corporate firewall, which almost never block port 443) while still serving HTTPS on that port.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
