---
name: "chaosreader"
tagline: "Trace network sessions and export it to html format"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/chaosreader/"
downloadUrl: "https://www.brendangregg.com/chaosreader.html"
repoUrl: "https://salsa.debian.org/pkg-security-team/chaosreader"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page and upstream homepage linked above for installation and usage details."
---

Chaosreader traces TCP/UDP/others sessions and fetches application data from snoop or tcpdump logs (or other libpcap compatible programs). This is a type of “any-snarf” program, as it will fetch telnet sessions, FTP files, HTTP transfers (HTML, GIF, JPEG etc) and SMTP emails from the captured data inside network traffic logs. A html index file is created to that links to all the session details, including realtime replay programs for telnet, rlogin, IRC, X11 and VNC sessions. Chaosreader reports such as image reports and HTTP GET/POST content reports.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
