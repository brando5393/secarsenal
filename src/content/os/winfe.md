---
name: WinFE
tagline: Windows Forensic Environment — a forensically sound Windows PE boot environment
category: forensics
team: blue
basedOn: Windows PE
lastVerified: 2026-09-05
docsUrl: https://winfe.wordpress.com/
downloadUrl: https://www.winfe.net/download
toolListMaintenance: manual
notableTools: []
gettingStarted: |
  Unlike this catalog's other forensic distros, WinFE isn't a
  ready-made downloadable ISO — it's built from a licensed Windows
  installation/ADK using scripts and guidance published on the official
  blog and winfe.net, since redistributing a modified Windows image
  isn't legally possible the way a Linux respin is. The resulting boot
  environment mounts local disks read-only by default (registry writes
  disabled) so an examiner can run Windows-native forensic and
  imaging tools against a system without altering evidence.
---

WinFE (Windows Forensic Environment) is a community project, run in
collaboration with Arsenal Recon, for building a forensically sound
Windows PE-based boot environment — useful specifically when a case
calls for Windows-native tools (or hardware/driver support Linux-based
forensic distros like CAINE or SIFT don't have) without booting the
suspect drive's own installed OS.

Use it only against systems/media you own or are explicitly authorized
to examine — see the [disclaimer](/disclaimer).
