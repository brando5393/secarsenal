---
name: Malcolm
tagline: CISA/Idaho National Laboratory network traffic analysis tool suite
category: specialized
basedOn: Docker Compose (any Linux, macOS, or Windows host)
lastVerified: 2026-09-05
docsUrl: https://idaholab.github.io/Malcolm/docs/
repoUrl: https://github.com/idaholab/Malcolm
toolListMaintenance: manual
notableTools:
  - zeek
  - suricata
  - CyberChef
gettingStarted: |
  Malcolm isn't installed as a distro — it's a cluster of Docker
  containers deployed via `docker compose up`, ingesting full packet
  captures (PCAP), Zeek logs, and Suricata alerts through a
  browser-based upload interface or lightweight forwarders. The
  official docs (linked above) cover the container-by-container
  architecture, first-run configuration, and its Kibana-based dashboard
  for hunting and visualization.
---

Malcolm is a joint CISA/Idaho National Laboratory project for
deployable network traffic analysis, particularly aimed at
industrial-control-system (ICS) environments. It bundles Zeek and
Suricata for parsing and detection, Arkime for full-packet search, and
CyberChef for ad-hoc data manipulation, all fronted by a unified
OpenSearch/Kibana-based interface — similar in spirit to Security
Onion, but container-based and host-OS-agnostic rather than a bootable
distro of its own.

Use it only against networks you own or are explicitly authorized to
monitor — see the [disclaimer](/disclaimer).
