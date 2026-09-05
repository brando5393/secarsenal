---
name: Security Onion
tagline: Ubuntu-based network security monitoring and threat hunting platform
category: specialized
team: blue
basedOn: Ubuntu
lastVerified: 2026-09-05
docsUrl: https://securityonion.net/
toolListMaintenance: auto-synced
notableTools: []
gettingStarted: |
  Security Onion installs from a bootable ISO onto dedicated hardware or
  a VM, configured as a sensor/manager rather than a general desktop.
  Setup walks through a guided wizard that provisions its detection
  stack — Suricata and Zeek for network traffic analysis, Elasticsearch
  and Kibana for storage and dashboards, and Strelka for file inspection
  — into one integrated platform for network security monitoring and
  threat hunting.
---

Security Onion is a defensive network-security-monitoring and
threat-hunting platform, not an offensive pentest toolkit — it's built
for detecting and investigating attacks, not carrying them out.

Use it only against systems/networks you own or are explicitly
authorized to monitor — see the [disclaimer](/disclaimer).
