---
name: Foremost
tagline: File carving tool for recovering files from disk images based on headers/footers
categories: [forensics]
platforms: [Linux, macOS]
license: Public domain (US government work)
lastVerified: 2026-09-04
docsUrl: https://github.com/korczis/foremost#readme
downloadUrl: https://github.com/korczis/foremost
repoUrl: https://github.com/korczis/foremost
commonlyOn: [Kali Linux, CAINE]
gettingStarted: |
  Install via your package manager (preinstalled on Kali/CAINE) or
  build from source. Basic usage: `foremost -i <image-or-device> -o
  <output-dir>` carves recognizable file types (based on the config
  file's header/footer signatures) out of raw disk data, useful for
  recovering deleted or fragmented files. The README/config file
  documents the supported file types and how to add custom signatures.
---

Foremost is a file-carving tool originally developed for the US Air
Force: it scans raw disk images or devices for known file signatures
and recovers matching files without needing an intact filesystem,
useful in data recovery and forensic examinations.

Only use it on media you own or are explicitly authorized to examine —
see the [disclaimer](/disclaimer).
