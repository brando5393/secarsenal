---
name: ExifTool
tagline: Metadata reader/writer for images, documents, and many other file formats
categories: [forensics, osint]
platforms: [Linux, Windows, macOS]
license: GPL-1.0 (Artistic License option)
lastVerified: 2026-09-04
docsUrl: https://exiftool.org/
downloadUrl: https://exiftool.org/
repoUrl: https://github.com/exiftool/exiftool
commonlyOn: [Kali Linux, Parrot Security OS, CAINE]
gettingStarted: |
  Install via your package manager (preinstalled on Kali) or download
  from the official site. Basic usage: `exiftool <file>` dumps all
  embedded metadata (camera details, GPS coordinates, authorship,
  timestamps, and more depending on file type). The official site's
  documentation covers batch processing, writing/stripping metadata,
  and its extensive per-format tag support.
---

ExifTool reads, writes, and edits metadata across a very wide range of
file formats. In security and OSINT work it's commonly used to extract
metadata (like GPS location or authoring software) left behind in
images and documents, or to scrub that metadata before releasing files.

Only use it on files you own or are explicitly authorized to examine —
see the [disclaimer](/disclaimer).
