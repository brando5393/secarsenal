---
name: Steghide
tagline: Steganography tool for hiding/extracting data in image and audio files
categories: [forensics]
platforms: [Linux, Windows]
license: GPL-2.0
lastVerified: 2026-09-04
docsUrl: https://github.com/StefanoDeVuono/steghide#readme
downloadUrl: https://github.com/StefanoDeVuono/steghide
repoUrl: https://github.com/StefanoDeVuono/steghide
commonlyOn: [Kali Linux, Parrot Security OS, BlackArch]
gettingStarted: |
  Install via your package manager (preinstalled on Kali) or build from
  source. Basic usage: `steghide embed -cf <cover-file> -ef <secret-
  file>` hides data inside a JPEG/BMP/WAV/AU cover file, and
  `steghide extract -sf <stego-file>` pulls it back out (optionally
  passphrase-protected). The README covers supported formats and
  options for adjusting the embedding algorithm.
---

Steghide embeds and extracts data within common image and audio file
formats using steganography, and is frequently encountered from the
other direction too — as a tool for extracting hidden data during
forensic analysis or CTF challenges, using tools like `stegcracker` to
brute-force a passphrase.

Only use it on files you own or are explicitly authorized to examine —
see the [disclaimer](/disclaimer).
