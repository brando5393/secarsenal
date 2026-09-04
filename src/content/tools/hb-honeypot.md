---
name: "hb-honeypot"
tagline: "Heartbleed Honeypot Script"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/hb-honeypot/"
downloadUrl: "https://packetstormsecurity.com/files/126068/Heartbleed-Honeypot-Script.html"
repoUrl: "https://gitlab.com/kalilinux/packages/hb-honeypot"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install hb-honeypot`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

This Perl script listens on TCP port 443 and responds with completely bogus SSL heartbeat responses, unless it detects the start of a byte pattern similar to that used in Jared Stafford’s ([email protected]) demo for CVE-2014-0160 ‘Heartbleed’. Run as root for the privileged port. Outputs IPs of suspected heartbleed scan to the console. Rickrolls scanner in the hex dump.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
