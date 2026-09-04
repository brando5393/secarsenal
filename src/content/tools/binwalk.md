---
name: Binwalk
tagline: Firmware analysis tool for identifying and extracting embedded files/filesystems
categories: [reverse-engineering, forensics]
platforms: [Linux, macOS]
license: MIT
lastVerified: 2026-09-04
docsUrl: https://github.com/ReFirmLabs/binwalk/wiki
downloadUrl: https://github.com/ReFirmLabs/binwalk/releases
repoUrl: https://github.com/ReFirmLabs/binwalk
commonlyOn: [Kali Linux, Parrot Security OS, BlackArch]
gettingStarted: |
  Install via your package manager (preinstalled on Kali) or a release
  binary. Basic usage: `binwalk <firmware-image>` scans the file for
  signatures of known file types and filesystems embedded inside it;
  add `-e` to extract everything it finds. The wiki covers signature
  scanning options, entropy analysis for finding compressed/encrypted
  regions, and the extraction module system.
---

Binwalk analyzes firmware images and other binary blobs to identify and
extract embedded files, compressed data, and filesystems packed inside
them — a starting point for firmware reverse engineering and IoT
security research.

Use it only on firmware/binaries you own or are explicitly authorized
to analyze — see the [disclaimer](/disclaimer).
