---
name: T-Pot
tagline: All-in-one multi-honeypot platform with 20+ honeypots and Elastic Stack visualization
category: specialized
team: blue
basedOn: Debian
lastVerified: 2026-09-05
docsUrl: https://github.com/telekom-security/tpotce
downloadUrl: https://github.com/telekom-security/tpotce/releases
toolListMaintenance: auto-synced
notableTools: []
gettingStarted: |
  T-Pot installs onto a dedicated Debian host (bare metal or VM,
  amd64/arm64) via the official installer script — it needs real
  public IP exposure to attract traffic, so it's typically run
  standalone or as a distributed sensor feeding a central "Hive." Once
  installed, it runs 20+ dockerized honeypots side by side (Cowrie,
  Dionaea, Honeytrap, and newer LLM-based ones like Beelzebub and
  Galah), all fronted by Elastic Stack dashboards and a live animated
  attack map.
---

T-Pot, from Deutsche Telekom Security, is a deployable multi-honeypot
platform rather than a pentest toolkit: it's built to attract and log
real-world attacker activity across dozens of honeypot services at
once, correlating everything through a unified Elastic Stack interface
for research and threat-intelligence purposes.

Use it only on infrastructure you own or are explicitly authorized to
expose — see the [disclaimer](/disclaimer).
