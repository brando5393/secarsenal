---
name: "sqlmap"
tagline: "Automatic SQL injection tool"
categories: ["initial-access"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/sqlmap/"
downloadUrl: "https://sqlmap.org/"
repoUrl: "https://salsa.debian.org/pkg-security-team/sqlmap"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install sqlmap`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

sqlmap goal is to detect and take advantage of SQL injection vulnerabilities in web applications. Once it detects one or more SQL injections on the target host, the user can choose among a variety of options to perform an extensive back-end database management system fingerprint, retrieve DBMS session user and database, enumerate users, password hashes, privileges, databases, dump entire or user’s specific DBMS tables/columns, run his own SQL statement, read specific files on the file system and more.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
