---
name: Hashcat
tagline: GPU-accelerated password hash cracking tool
categories: [password-attacks]
platforms: [Linux, Windows, macOS]
license: MIT
lastVerified: 2026-09-04
docsUrl: https://hashcat.net/wiki/
downloadUrl: https://hashcat.net/hashcat/
repoUrl: https://github.com/hashcat/hashcat
commonlyOn: [Kali Linux, Parrot Security OS, BlackArch]
gettingStarted: |
  Download the binary release or install via your package manager; a
  compatible GPU (with up-to-date drivers/OpenCL or CUDA runtime) is
  where hashcat gets most of its speed advantage over CPU-only crackers.
  Basic usage: `hashcat -m <hash-type> -a 0 <hashfile> <wordlist>` for a
  dictionary attack. The wiki covers hash-type identification, attack
  modes (dictionary, mask, hybrid), and rule-based mangling.
---

Hashcat is the standard GPU-accelerated password hash cracking tool,
supporting a very large number of hash algorithms and attack modes.
It's commonly used alongside John the Ripper during authorized
assessments to test recovered password hash strength.

Only use it against credentials/systems you own or are explicitly
authorized to test — see the [disclaimer](/disclaimer).
