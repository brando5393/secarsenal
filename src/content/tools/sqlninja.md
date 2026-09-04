---
name: "sqlninja"
tagline: "SQL server injection and takeover tool"
categories: ["initial-access"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/sqlninja/"
downloadUrl: "https://sqlninja.sourceforge.net/"
repoUrl: "https://gitlab.com/kalilinux/packages/sqlninja"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install sqlninja`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

Fancy going from a SQL Injection on Microsoft SQL Server to a full GUI access on the DB? Take a few new SQL Injection tricks, add a couple of remote shots in the registry to disable Data Execution Prevention, mix with a little Perl that automatically generates a debug script, put all this in a shaker with a Metasploit wrapper, shake well and you have just one of the attack modules of sqlninja!

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
