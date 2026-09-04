---
name: "wapiti"
tagline: "Web application vulnerability scanner"
categories: ["web-vulnerability-scanning"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/wapiti/"
downloadUrl: "https://wapiti.sourceforge.net/"
repoUrl: "https://salsa.debian.org/pkg-security-team/wapiti"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page and upstream homepage linked above for installation and usage details."
---

Wapiti allows you to audit the security of your web applications. It performs “black-box” scans, i.e. it does not study the source code of the application but will scan the web pages of the deployed web applications, looking for scripts and forms where it can inject data. Once it gets this list, Wapiti acts like a fuzzer, injecting payloads to see if a script is vulnerable.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
