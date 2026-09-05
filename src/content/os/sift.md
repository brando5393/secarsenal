---
name: SIFT
tagline: SANS forensic workstation for digital forensics and incident response
category: forensics
team: blue
basedOn: Ubuntu
lastVerified: 2026-09-05
docsUrl: https://www.sans.org/tools/sift-workstation/
toolListMaintenance: manual
notableTools:
  - Volatility Framework
  - sleuthkit
  - bulk-extractor
  - plaso
gettingStarted: |
  SIFT (SANS Investigative Forensic Toolkit) ships as a VM appliance
  (OVA), a native Ubuntu 22.04 installer package, or via WSL on Windows.
  SANS' own site lists roughly 30 bundled tools by name, but without
  per-tool links or descriptions, so there's no structured catalog to
  point to beyond that list. It's commonly paired with REMnux for
  combined forensics and malware-analysis workflows.
---

SIFT is a forensic workstation maintained by SANS, distributed as a
ready-to-use environment for digital forensics and incident response
work rather than a full standalone desktop distribution.

Use it only against systems/media you own or are explicitly authorized
to examine — see the [disclaimer](/disclaimer).
