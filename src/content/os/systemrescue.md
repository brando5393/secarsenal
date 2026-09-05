---
name: SystemRescue
tagline: Arch-based live system for disk repair, imaging, and data recovery
category: forensics
basedOn: Arch Linux
lastVerified: 2026-09-05
docsUrl: https://www.system-rescue.org/manual/
downloadUrl: https://www.system-rescue.org/Download/
toolListMaintenance: manual
notableTools:
  - testdisk
  - ddrescue
  - gparted
gettingStarted: |
  SystemRescue ships as a bootable ISO (also installable to a USB
  stick) and boots into a lightweight Xfce desktop or a text console.
  Its own "detailed package list" is a flat, alphabetical dump of every
  Arch package on the image — including ordinary system libraries with
  no security relevance and no per-package description or link — so
  it isn't a source this site can sync from; the notable tools above
  were cross-checked by hand instead. The official manual covers boot
  options, network configuration, and its bundled disk/partition/data-
  recovery toolset.
---

SystemRescue is a general system-repair and rescue distribution — not
pentest-focused — but its bundled data-recovery and disk-imaging
tooling (TestDisk, PhotoRec, GParted, ddrescue) gives it a
legitimate niche in forensic acquisition and incident-response
workflows, alongside CAINE and SIFT.

Use it only against systems/media you own or are explicitly authorized
to access — see the [disclaimer](/disclaimer).
