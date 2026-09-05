---
name: CSI Linux
tagline: Ubuntu-based platform for OSINT, digital forensics, and incident response
category: forensics
team: blue
basedOn: Ubuntu
lastVerified: 2026-09-05
docsUrl: https://csilinux.com/
toolListMaintenance: manual
notableTools:
  - autopsy
  - wireshark
  - maltego
  - Volatility Framework
gettingStarted: |
  CSI Linux is distributed as a set of virtual machine images with
  distinct roles (Analyst, Gateway, SIEM) rather than a single bootable
  ISO — plan for 8GB+ of RAM and 50GB+ of free disk space per the
  official system requirements. It bundles standard forensics/OSINT
  tools alongside CSI's own custom evidence-capture and case-management
  utilities, and doesn't publish a single structured tool catalog beyond
  short category descriptions on its site.
---

CSI Linux is an Ubuntu-based platform built for OSINT investigation,
digital forensics, and incident response, distributed as role-specific
VM images rather than one general-purpose desktop image.

Use it only against systems/media you own or are explicitly authorized
to examine — see the [disclaimer](/disclaimer).
