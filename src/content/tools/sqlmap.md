---
name: sqlmap
tagline: Automated SQL injection detection and exploitation tool
categories: [web-app, exploitation]
platforms: [Linux, Windows, macOS]
license: GPL-2.0
lastVerified: 2026-09-04
docsUrl: https://github.com/sqlmapproject/sqlmap/wiki
downloadUrl: https://github.com/sqlmapproject/sqlmap
repoUrl: https://github.com/sqlmapproject/sqlmap
commonlyOn: [Kali Linux, Parrot Security OS, BlackArch]
gettingStarted: |
  Clone the repository or install via your package manager (preinstalled
  on Kali/Parrot). Basic usage against an authorized target:
  `sqlmap -u "<url>" --dbs` to enumerate databases behind a vulnerable
  parameter. The project wiki covers detection techniques, tamper
  scripts for evading filtering, and options for extracting data once
  injection is confirmed.
---

sqlmap is an open-source penetration testing tool that automates
detecting and exploiting SQL injection vulnerabilities, including
database fingerprinting, data extraction, and in some cases
underlying OS access via the database connection.

Only use it against applications/databases you own or are explicitly
authorized to test — see the [disclaimer](/disclaimer).
