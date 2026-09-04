---
name: Volatility
tagline: Memory forensics framework for analyzing RAM captures
categories: [forensics]
platforms: [Linux, Windows, macOS]
license: VSL-1.0 (GPL-derivative)
lastVerified: 2026-09-04
docsUrl: https://volatility3.readthedocs.io/
downloadUrl: https://github.com/volatilityfoundation/volatility3
repoUrl: https://github.com/volatilityfoundation/volatility3
commonlyOn: [CAINE]
gettingStarted: |
  Install via pip (`pip install volatility3`) or clone the repository.
  Point it at a memory capture with a command like
  `vol -f <memory-dump> windows.pslist` to list running processes at
  capture time. The documentation covers the plugin system (process
  listing, network connections, malware-detection plugins) and supported
  capture formats across Windows, Linux, and macOS.
---

Volatility is the standard open-source framework for memory forensics:
extracting running processes, network connections, loaded modules, and
other artifacts from a RAM capture. It's a core tool in incident
response and malware analysis for examining what was happening on a
system at the moment memory was captured.

Only use it on memory captures you own or are explicitly authorized to
examine — see the [disclaimer](/disclaimer).
