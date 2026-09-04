---
name: Mimikatz
tagline: Windows credential extraction tool for post-exploitation
categories: [post-exploitation, password-attacks]
platforms: [Windows]
license: CC BY 4.0 (mixed; see project license notes)
lastVerified: 2026-09-04
docsUrl: https://github.com/gentilkiwi/mimikatz/wiki
downloadUrl: https://github.com/gentilkiwi/mimikatz/releases
repoUrl: https://github.com/gentilkiwi/mimikatz
commonlyOn: [Kali Linux]
gettingStarted: |
  Mimikatz runs on the Windows target itself (it's typically staged
  there from Kali as part of a post-exploitation workflow, not run on
  Kali directly). Basic usage from an elevated prompt:
  `privilege::debug` then `sekurlsa::logonpasswords` dumps credentials
  held in memory by LSASS on supported Windows versions/patch levels.
  The wiki documents its many other modules (Kerberos ticket abuse,
  DPAPI, and more).
---

Mimikatz is a Windows post-exploitation tool for extracting plaintext
passwords, hashes, and Kerberos tickets from memory, widely used (and
just as widely detected/mitigated by modern EDR) in authorized
Active Directory penetration tests to demonstrate credential exposure.

Only use it on systems you own or are explicitly authorized to test —
see the [disclaimer](/disclaimer).
