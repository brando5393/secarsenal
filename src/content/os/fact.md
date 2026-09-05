---
name: FACT
tagline: Fraunhofer FKIE's firmware analysis and comparison platform for routers, IoT, and UEFI images
category: specialized
basedOn: Docker Compose (any Linux host)
lastVerified: 2026-09-05
docsUrl: https://fkie-cad.github.io/FACT_core/
repoUrl: https://github.com/fkie-cad/FACT_core
toolListMaintenance: manual
notableTools:
  - binwalk
gettingStarted: |
  FACT (Firmware Analysis and Comparison Tool) isn't a bootable
  distro — it's deployed via Docker Compose (pre-built images, or
  building from source) onto any Linux host, the same
  host-agnostic model as Malcolm already in this catalog. Once running,
  its web UI lets you upload firmware images (router, IoT, UEFI,
  webcam, drone, and similar embedded targets) for automated unpacking
  and static analysis through a plugin system, with a REST API for
  integration and built-in diffing between firmware versions.
---

FACT is maintained by Fraunhofer FKIE specifically for firmware
security analysis — unpacking, static analysis, and cross-version
comparison of embedded-device firmware — rather than general
penetration testing.

Use it only against firmware/systems you own or are explicitly
authorized to analyze — see the [disclaimer](/disclaimer).
