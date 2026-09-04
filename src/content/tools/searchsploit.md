---
name: searchsploit
tagline: Offline command-line search tool for the Exploit Database
categories: [exploitation, recon]
platforms: [Linux, Windows, macOS]
license: GPL-2.0
lastVerified: 2026-09-04
docsUrl: https://www.exploit-db.com/searchsploit
downloadUrl: https://github.com/offensive-security/exploitdb
repoUrl: https://github.com/offensive-security/exploitdb
commonlyOn: [Kali Linux, Parrot Security OS, BlackArch]
gettingStarted: |
  Install via your package manager (preinstalled on Kali) or clone the
  exploitdb repository, which ships `searchsploit` alongside a local
  mirror of the Exploit Database. Basic usage:
  `searchsploit <software name/version>` searches the local database for
  matching known exploits/PoCs; `-m <id>` copies a specific one locally
  for review. The official page covers keeping the local mirror updated
  and using it alongside Nmap's version-detection output.
---

searchsploit is the command-line search tool for Exploit-DB, letting you
query a locally mirrored copy of the exploit/PoC database without
needing network access — useful for quickly checking whether a
fingerprinted service version has a known public exploit.

Only use it, and any exploit it surfaces, against systems you own or
are explicitly authorized to test — see the [disclaimer](/disclaimer).
