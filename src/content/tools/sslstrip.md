---
name: "sslstrip"
tagline: "SSL/TLS man-in-the-middle attack tool"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/sslstrip/"
downloadUrl: "https://github.com/L1ghtn1ng/sslstrip"
repoUrl: "https://gitlab.com/kalilinux/packages/sslstrip"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install sslstrip`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

sslstrip is a tool that transparently hijacks HTTP traffic on a network, watch for HTTPS links and redirects, and then map those links into look-alike HTTP links or homograph-similar HTTPS links. It also supports modes for supplying a favicon which looks like a lock icon, selective logging, and session denial.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
