---
name: John the Ripper
tagline: Password hash cracking tool
categories: [password-attacks]
platforms: [Linux, Windows, macOS]
license: GPL-2.0
lastVerified: 2026-09-04
docsUrl: https://www.openwall.com/john/doc/
downloadUrl: https://www.openwall.com/john/
repoUrl: https://github.com/openwall/john
commonlyOn: [Kali Linux, Parrot Security OS, BlackArch]
gettingStarted: |
  Install via your package manager (Kali/Parrot ship it by default) or
  build the "jumbo" community edition from source for the widest format
  support. Basic usage: `john --wordlist=<list> <hashfile>` for a
  dictionary attack, or `john --show <hashfile>` to view cracked
  passwords. The official docs cover cracking modes (single, wordlist,
  incremental), supported hash formats, and rule-based mangling.
---

John the Ripper is a widely used password hash cracking tool, applied
during authorized assessments to test password strength against
recovered hash dumps using dictionary, rule-based, and brute-force
attack modes.

Only use it against credentials/systems you own or are explicitly
authorized to test — see the [disclaimer](/disclaimer).
