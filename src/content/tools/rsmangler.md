---
name: "rsmangler"
tagline: "Wordlist mangling tool"
categories: ["password-profiling-wordlists"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/rsmangler/"
downloadUrl: "https://digi.ninja/projects/rsmangler.php"
repoUrl: "https://gitlab.com/kalilinux/packages/rsmangler"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install rsmangler`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

RSMangler will take a wordlist and perform various manipulations on it similar to those done by John the Ripper the main difference being that it will first take the input words and generate all permutations and the acronym of the words (in order they appear in the file) before it applies the rest of the mangles.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
