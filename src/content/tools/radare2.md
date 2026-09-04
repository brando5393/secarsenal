---
name: radare2
tagline: Command-line reverse engineering framework for disassembly, debugging, and binary analysis
categories: [reverse-engineering]
platforms: [Linux, Windows, macOS]
license: LGPL-3.0
lastVerified: 2026-09-04
docsUrl: https://book.rada.re/
downloadUrl: https://github.com/radareorg/radare2/releases
repoUrl: https://github.com/radareorg/radare2
commonlyOn: [Kali Linux, Parrot Security OS, BlackArch]
gettingStarted: |
  Install via the official `sys/install.sh` script, your package manager
  (preinstalled on Kali), or build from source. Open a binary with
  `r2 <file>`, then `aaa` to auto-analyze it before using commands like
  `pdf @main` to disassemble a function. The learning curve is steep;
  the official book covers the command syntax in depth, and the Cutter
  GUI (a separate project) provides a graphical front end.
---

radare2 is a free and open-source framework for reverse engineering
and binary analysis, providing disassembly, debugging, binary
diffing, and scripting through a dense but powerful command-line
interface, widely used in malware analysis and CTF work.

Use it only on binaries you own, have rights to analyze, or are
explicitly authorized to examine — see the [disclaimer](/disclaimer).
