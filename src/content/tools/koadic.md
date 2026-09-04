---
name: "koadic"
tagline: "Windows post-exploitation rootkit"
categories: ["command-and-control"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/koadic/"
downloadUrl: "https://github.com/zerosum0x0/koadic"
repoUrl: "https://gitlab.com/kalilinux/packages/koadic"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page and upstream homepage linked above for installation and usage details."
---

This package contains Koadic, or COM Command & Control. It is a Windows post-exploitation rootkit similar to other penetration testing tools such as Meterpreter and Powershell Empire. The major difference is that Koadic does most of its operations using Windows Script Host (a.k.a. JScript/VBScript), with compatibility in the core to support a default installation of Windows 2000 with no service packs (and potentially even versions of NT4) all the way through Windows 10.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
