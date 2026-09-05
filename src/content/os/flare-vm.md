---
name: FLARE VM
tagline: Windows-based reverse-engineering and malware-analysis distribution
category: specialized
basedOn: Windows
lastVerified: 2026-09-05
docsUrl: https://github.com/mandiant/flare-vm
toolListMaintenance: auto-synced
notableTools: []
gettingStarted: |
  FLARE VM isn't a bootable ISO — it's a PowerShell script (`install.ps1`,
  using Chocolatey and Boxstarter) run against a fresh Windows 10 or
  later VM, with Windows Defender/Tamper Protection disabled first so
  the installer can run unhindered. A GUI lets you customize which
  packages to install before running, or it can be driven entirely from
  the CLI. Its package list is pulled from Mandiant's own VM-Packages
  repository, linked above.
---

FLARE VM is Mandiant's Windows distribution purpose-built for reverse
engineering and malware analysis — narrower in scope than its sibling
CommandoVM, which targets general red-team work instead.

Use it only against samples/systems you own or are explicitly
authorized to analyze — see the [disclaimer](/disclaimer).
