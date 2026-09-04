---
name: "davtest"
tagline: "Testing tool for WebDAV servers"
categories: ["web-vulnerability-scanning"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/davtest/"
downloadUrl: "https://github.com/cldrn/davtest"
repoUrl: "https://gitlab.com/kalilinux/packages/davtest"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install davtest`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

DAVTest tests WebDAV enabled servers by uploading test executable files, and then (optionally) uploading files which allow for command execution or other actions directly on the target. It is meant for penetration testers to quickly and easily determine if enabled DAV services are exploitable.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
