---
name: CAINE
tagline: Ubuntu-based digital forensics live distribution
category: forensics
basedOn: Ubuntu
lastVerified: 2026-09-04
docsUrl: https://www.caine-live.net/page5/page5.html
downloadUrl: https://www.caine-live.net/page8/page8.html
toolListMaintenance: manual
notableTools:
  - autopsy
  - sleuthkit
  - testdisk
gettingStarted: |
  CAINE ("Computer Aided INvestigative Environment") ships as a bootable
  ISO. It's built around forensic soundness by default — write-blocking
  for connected drives and read-only mounting so evidence isn't altered
  by the analysis process itself. The official documentation covers
  booting in forensic mode, the bundled interface for managing acquired
  disk images, and the individual forensic tools included.
---

CAINE is a digital forensics distribution built around a full
forensic-investigation environment: acquisition, analysis, and reporting
tools with careful attention to not modifying evidence during
examination. It's aimed at incident responders and forensic examiners
rather than general penetration testing.

Use it only against systems/media you own or are explicitly authorized
to examine — see the [disclaimer](/disclaimer).
