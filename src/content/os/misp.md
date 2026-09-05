---
name: MISP
tagline: Open-source threat intelligence and sharing platform, with an official test VM
category: specialized
basedOn: Ubuntu
lastVerified: 2026-09-05
docsUrl: https://www.misp-project.org/documentation/
downloadUrl: https://www.misp-project.org/download/
repoUrl: https://github.com/MISP/MISP
toolListMaintenance: manual
notableTools: []
gettingStarted: |
  MISP publishes a VirtualBox/VMware VM image, rebuilt automatically
  from every commit to its core repository, as the fastest way to try
  it — the project's own documentation is explicit that this image is
  for evaluation only, not production use. For a real deployment, MISP
  documents dedicated installers for Ubuntu, plus Docker-based options.
  Either way you land on the same web UI for creating, correlating, and
  sharing structured threat-intelligence events (IOCs, TTPs, galaxies)
  with other MISP instances or feeds.
---

MISP is a platform for collecting, correlating, and sharing threat
intelligence between organizations and communities, rather than a
tool bundle for running attacks. It's included here because its
official downloadable test VM gives it the same "boot it and try it"
on-ramp as the pentest/forensics distros in this catalog, even though
its actual use case is defensive intelligence sharing.

Use it only in environments you own or are explicitly authorized to
operate in — see the [disclaimer](/disclaimer).
