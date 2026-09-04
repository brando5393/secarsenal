---
name: "powershell-empire"
tagline: "PowerShell and Python post-exploitation agent"
categories: ["command-and-control","system-services"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/powershell-empire/"
downloadUrl: "https://github.com/BC-SECURITY/Empire"
repoUrl: "https://gitlab.com/kalilinux/packages/powershell-empire"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install powershell-empire`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

This package contains a post-exploitation framework that includes a pure-PowerShell2.0 Windows agent, and a pure Python Linux/OS X agent. It is the merge of the previous PowerShell Empire and Python EmPyre projects. The framework offers cryptologically-secure communications and a flexible architecture. On the PowerShell side, Empire implements the ability to run PowerShell agents without needing powershell.exe, rapidly deployable post-exploitation modules ranging from key loggers to Mimikatz, and adaptable communications to evade network detection, all wrapped up in a usability-focused framework.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
