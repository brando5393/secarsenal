---
name: "cymothoa"
tagline: "Stealth backdooring tool"
categories: ["persistence"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/cymothoa/"
downloadUrl: "https://cymothoa.sourceforge.net/"
repoUrl: "https://gitlab.com/kalilinux/packages/cymothoa"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install cymothoa`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

Cymothoa is a stealth backdooring tool, that inject backdoor’s shellcode into an existing process. The tool uses the ptrace library (available on nearly all * nix), to manipulate processes and infect them.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
