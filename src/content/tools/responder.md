---
name: Responder
tagline: LLMNR/NBT-NS/mDNS poisoner for capturing Windows network credentials
categories: [sniffing-spoofing, post-exploitation]
platforms: [Linux, Windows]
license: GPL-3.0
lastVerified: 2026-09-04
docsUrl: https://github.com/lgandx/Responder#readme
downloadUrl: https://github.com/lgandx/Responder
repoUrl: https://github.com/lgandx/Responder
commonlyOn: [Kali Linux, Parrot Security OS]
gettingStarted: |
  Install via your package manager (preinstalled on Kali) or clone the
  repo (Python 3). Basic usage: `responder -I <interface>` listens on
  the local network and answers LLMNR/NBT-NS/mDNS name-resolution
  requests, capturing NTLM authentication attempts from Windows hosts
  in the process. The README covers analysis mode (passive-only) versus
  poisoning mode and integration with cracking the captured hashes.
---

Responder poisons common Windows name-resolution protocols (LLMNR,
NBT-NS, mDNS) on a local network to intercept authentication attempts,
capturing NTLM password hashes for offline cracking — a staple
technique in internal network penetration tests.

Only use it on networks you own or are explicitly authorized to test —
see the [disclaimer](/disclaimer).
