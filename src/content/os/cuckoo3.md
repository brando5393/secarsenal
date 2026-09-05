---
name: Cuckoo3
tagline: CERT-EE's Python 3 rewrite of Cuckoo Sandbox for automated malware analysis
category: specialized
basedOn: Ubuntu
lastVerified: 2026-09-05
docsUrl: https://cuckoo-hatch.cert.ee/static/docs/
repoUrl: https://github.com/cert-ee/cuckoo3
toolListMaintenance: manual
notableTools: []
gettingStarted: |
  Cuckoo3 installs onto an Ubuntu host via an official "quickstart"
  script for a quick opinionated setup, or a manual install for control
  over virtualization backend, networking, and node count. It pairs
  with the companion VMCloak tool to build the Windows guest VMs
  samples are actually detonated in, then reports back extracted
  behavior through its own web dashboard.
---

Cuckoo3 is CERT-EE's actively developed successor to the original
Cuckoo Sandbox (whose 2.x branch is no longer maintained) — a distinct
project and lineage from the community CAPEv2 fork also in this
catalog, though both automate dynamic malware detonation and analysis.

Use it only against samples/systems you're authorized to analyze — see
the [disclaimer](/disclaimer).
