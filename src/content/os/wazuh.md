---
name: Wazuh
tagline: Open-source SIEM/XDR platform distributed as an official VM appliance
category: specialized
basedOn: Amazon Linux 2023
lastVerified: 2026-09-05
docsUrl: https://documentation.wazuh.com/current/deployment-options/virtual-machine/virtual-machine.html
downloadUrl: https://github.com/wazuh/wazuh-virtual-machines
repoUrl: https://github.com/wazuh/wazuh
toolListMaintenance: manual
notableTools: []
gettingStarted: |
  Wazuh ships an official all-in-one OVA (built on Amazon Linux 2023)
  that bundles the Wazuh indexer, server, and dashboard on a single
  VM — import it into VirtualBox/VMware and it's ready with no separate
  install step, though it doesn't provide high availability out of the
  box. Endpoints run a lightweight Wazuh agent that ships logs,
  file-integrity, and vulnerability data back to the server for
  correlation. The official docs cover both this VM path and
  distributed/cluster deployment for production use.
---

Wazuh is a free, open-source SIEM and XDR platform for log analysis,
intrusion detection, file-integrity monitoring, and vulnerability
detection across endpoints. Like Security Onion and Malcolm, it's a
defensive/blue-team platform rather than an offensive toolkit, included
here for its official downloadable VM appliance.

Use it only in environments you own or are explicitly authorized to
monitor — see the [disclaimer](/disclaimer).
