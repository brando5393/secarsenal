---
name: "melkor"
tagline: "An ELF fuzzer that mutates the existing data in an ELF sample given to create orcs (malformed ELFs), however, it does no"
categories: ["fuzzer"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://blackarch.org/fuzzer.html"
downloadUrl: "http://packetstormsecurity.com/files/127924/Melkor-ELF-Fuzzer.0.html"
commonlyOn: ["BlackArch"]
gettingStarted: "Install on BlackArch with `pacman -S melkor` (or add the BlackArch repository to an existing Arch Linux install). See the official BlackArch tool listing and upstream homepage linked above for details."
---

An ELF fuzzer that mutates the existing data in an ELF sample given to create orcs (malformed ELFs), however, it does not change values randomly (dumb fuzzing), instead, it fuzzes certain metadata with semi-valid values through the use of fuzzing rules (knowledge base).

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
