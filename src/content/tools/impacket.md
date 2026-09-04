---
name: Impacket
tagline: Python library and script collection for working with network protocols, widely used for AD post-exploitation
categories: [post-exploitation]
platforms: [Linux, Windows, macOS]
license: Apache-2.0
lastVerified: 2026-09-04
docsUrl: https://github.com/fortra/impacket/wiki
downloadUrl: https://github.com/fortra/impacket
repoUrl: https://github.com/fortra/impacket
commonlyOn: [Kali Linux]
gettingStarted: |
  Install via `pip install impacket` or use the copy preinstalled on
  Kali. Impacket ships as a library plus many standalone example
  scripts (e.g. `secretsdump.py`, `psexec.py`, `GetUserSPNs.py`) that
  are the actual day-to-day tools most people use. Each script's `-h`
  output and the project wiki document usage for tasks like credential
  dumping and remote command execution against authorized Windows/AD
  targets.
---

Impacket is a Python library implementing a wide range of network
protocols used by Windows and Active Directory (SMB, Kerberos, DCERPC,
and more), and ships a large set of scripts built on it that are
staple tools for authorized Active Directory post-exploitation and
credential attacks.

Only use it against networks/accounts you own or are explicitly
authorized to test — see the [disclaimer](/disclaimer).
