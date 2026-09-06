---
name: "sqlsus"
tagline: "MySQL injection tool"
categories: ["initial-access"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/sqlsus/"
downloadUrl: "https://sqlsus.sourceforge.net/"
repoUrl: "https://gitlab.com/kalilinux/packages/sqlsus"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install sqlsus`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

sqlsus is an open source MySQL injection and takeover tool, written in perl. Via a command line interface, you can retrieve the database(s) structure, inject your own SQL queries (even complex ones), download files from the web server, crawl the website for writable directories, upload and control a backdoor, clone the database(s), and much more… Whenever relevant, sqlsus will mimic a MySQL console output.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
