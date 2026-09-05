---
name: Tsurugi Linux
tagline: Ubuntu-based distribution for digital forensics, OSINT, and malware analysis
category: forensics
team: blue
basedOn: Ubuntu
lastVerified: 2026-09-05
docsUrl: https://tsurugi-linux.org/
toolListMaintenance: manual
notableTools:
  - mimikatz
gettingStarted: |
  Tsurugi Linux is built on Ubuntu 24.04 LTS with a custom kernel,
  intended primarily as an installed forensics lab (a live mode is also
  supported), with kernel-level write-blocking and a dedicated
  computer-vision analysis mode. Its official documentation lists over
  500 bundled tools by category (imaging, hashing, and more) at
  tsurugi-linux.org's tools listing, but as bare names with no per-tool
  links or descriptions — genuinely large and official, but not
  structured enough to link out to individual sources here.
---

Tsurugi Linux is a forensics-focused distribution bundling several
hundred curated DFIR, OSINT, and malware-analysis tools, built around
forensic soundness (write-blocking, non-destructive analysis modes) by
default.

Use it only against systems/media you own or are explicitly authorized
to examine — see the [disclaimer](/disclaimer).
