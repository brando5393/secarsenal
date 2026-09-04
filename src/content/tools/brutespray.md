---
name: "brutespray"
tagline: "Bruteforcing from various scanner output"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/brutespray/"
downloadUrl: "https://github.com/x90skysn3k/brutespray"
repoUrl: "https://gitlab.com/kalilinux/packages/brutespray"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install brutespray`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

Brutespray has been re-written in Golang, eliminating the requirement for additional tools. This enhanced version is more extensive and operates at a significantly faster pace than its Python counterpart. As of now, Brutespray accepts input from Nmap’s GNMAP/XML output, newline-separated JSON files, Nexpose’s XML Export feature, Nessus exports in .nessus format, and various lists.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
