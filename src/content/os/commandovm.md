---
name: CommandoVM
tagline: PowerShell-provisioned Windows red-team toolkit
category: general-purpose
team: red
basedOn: Windows
lastVerified: 2026-09-05
docsUrl: https://github.com/fireeye/commando-vm
toolListMaintenance: manual
notableTools:
  - bloodhound
  - CyberChef
  - wireshark
  - mimikatz
  - ida-free
  - ghidra
gettingStarted: |
  CommandoVM is installed by running a PowerShell script against a
  fresh Windows VM (after disabling Defender/Tamper Protection), rather
  than booting a dedicated ISO. It pulls 300+ packages from Mandiant's
  companion VM-Packages repository, but that install list mixes
  genuine offensive-security tools with general productivity software
  (browsers, editors, PDF readers) and shared runtime dependencies with
  no clean automatic way to separate the two — the same reason this
  site doesn't auto-sync from Pentoo's package overlay.
---

CommandoVM is a Windows-based red-team toolkit maintained by Mandiant
(formerly FireEye), for tools that don't have good equivalents on
Kali/Linux — filling a gap for testers who need a Windows-native attack
platform.

Use it only against systems you own or are explicitly authorized to
test — see the [disclaimer](/disclaimer).
