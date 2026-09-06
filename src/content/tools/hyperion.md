---
name: "hyperion"
tagline: "Runtime encrypter for 32-bit portable executables"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/hyperion/"
downloadUrl: "http://www.nullsecurity.net/tools/binary.html"
repoUrl: "https://gitlab.com/kalilinux/packages/hyperion"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install hyperion`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

This package contains a runtime encrypter for 32-bit portable executables. It is a reference implementation and bases on the paper “Hyperion: Implementation of a PE-Crypter”. The paper describes the implementation details which aren’t in the scope of this readme file. The crypter is started via the command line and encrypts an input executable with AES-128. The encrypted file decrypts itself on startup (bruteforcing the AES key which may take a few seconds) and generates a log file for debug purpose.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
