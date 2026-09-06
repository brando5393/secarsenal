---
name: "sslsniff"
tagline: "SSL/TLS man-in-the-middle attack tool"
categories: ["collection"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/sslsniff/"
downloadUrl: "https://github.com/moxie0/sslsniff"
repoUrl: "https://salsa.debian.org/pkg-security-team/sslsniff"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install sslsniff`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

sslsniff is designed to create man-in-the-middle (MITM) attacks for SSL/TLS connections, and dynamically generates certs for the domains that are being accessed on the fly. The new certificates are constructed in a certificate chain that is signed by any certificate that is provided. sslsniff also supports other attacks like null-prefix or OCSP attacks to achieve silent interceptions of connections when possible.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
