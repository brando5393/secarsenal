---
name: "unix-privesc-check"
tagline: "Script to check for simple privilege escalation vectors"
categories: ["privilege-escalation"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/unix-privesc-check/"
downloadUrl: "http://pentestmonkey.net/tools/audit/unix-privesc-check"
repoUrl: "https://gitlab.com/kalilinux/packages/unix-privesc-check"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page and upstream homepage linked above for installation and usage details."
---

Unix-privesc-checker is a script that runs on Unix systems (tested on Solaris 9, HPUX 11, Various Linuxes, FreeBSD 6.2). It tries to find misconfigurations that could allow local unprivileged users to escalate privileges to other users or to access local apps (e.g. databases).

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
