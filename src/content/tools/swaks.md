---
name: "swaks"
tagline: "SMTP command-line test tool"
categories: ["smtp"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/swaks/"
downloadUrl: "https://www.jetmore.org/john/code/swaks/"
repoUrl: "https://salsa.debian.org/debian/swaks"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page and upstream homepage linked above for installation and usage details."
---

swaks (Swiss Army Knife SMTP) is a command-line tool written in Perl for testing SMTP setups; it supports STARTTLS and SMTP AUTH (PLAIN, LOGIN, CRAM-MD5, SPA, and DIGEST-MD5). swaks allows one to stop the SMTP dialog at any stage, e.g to check RCPT TO: without actually sending a mail.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
