---
name: "pspy"
tagline: "Monitor Linux processes without root permissions"
categories: ["process-discovery"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/pspy/"
downloadUrl: "https://github.com/DominicBreuker/pspy"
repoUrl: "https://gitlab.com/kalilinux/packages/pspy"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install pspy`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

pspy is a command line tool designed to snoop on processes without need for root permissions. It allows you to see commands run by other users, cron jobs, etc. as they execute. Great for enumeration of Linux systems in CTFs. Also great to demonstrate your colleagues why passing secrets as arguments on the command line is a bad idea.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
