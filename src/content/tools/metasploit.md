---
name: Metasploit Framework
tagline: Exploit development and execution framework
categories: [exploitation, post-exploitation]
platforms: [Linux, Windows, macOS]
license: BSD-3-Clause
lastVerified: 2026-09-04
docsUrl: https://docs.metasploit.com/
downloadUrl: https://www.metasploit.com/download
repoUrl: https://github.com/rapid7/metasploit-framework
commonlyOn: [Kali Linux, Parrot Security OS]
gettingStarted: |
  Metasploit comes preinstalled on Kali and Parrot; elsewhere, use the
  official installer or `docker run` image linked from the docs. Launch
  the console with `msfconsole`, then `search`, `use`, `set`, and `run`
  are the core workflow for selecting and firing a module against an
  authorized target. The official docs cover module types (exploits,
  auxiliary, post, payloads), Meterpreter, and how to write your own
  modules.
---

Metasploit is the most widely used framework for developing, testing,
and executing exploit code against a target system in an authorized
engagement, and for managing post-exploitation activity via Meterpreter.

Only use it against systems you own or are explicitly authorized to
test — see the [disclaimer](/disclaimer).
