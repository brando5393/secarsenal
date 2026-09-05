---
name: DShield Sensor
tagline: SANS Internet Storm Center's honeypot sensor for contributing threat data, with an ELK dashboard
category: specialized
basedOn: Raspberry Pi OS or Ubuntu
lastVerified: 2026-09-05
docsUrl: https://isc.sans.edu/honeypot.html
repoUrl: https://github.com/DShield-ISC/dshield
downloadUrl: https://github.com/bruneaug/DShield-SIEM
toolListMaintenance: manual
notableTools: []
gettingStarted: |
  DShield Sensor installs via the official script onto a Raspberry Pi
  (running Raspberry Pi OS) or an Ubuntu 24.04/26.04 LTS host. It runs
  the Cowrie honeypot underneath to log attacker activity against the
  sensor and forwards that data to SANS ISC's DShield project for
  aggregate threat-intelligence research. The separate, community-run
  DShield-SIEM project adds a local Elastic Stack dashboard so you can
  review your own sensor's data directly instead of only contributing
  it upstream.
---

DShield Sensor is a lightweight honeypot built to contribute real
attacker traffic to SANS ISC's DShield threat-intelligence project,
positioned differently from the full-scale, locally-analyzed platform
T-Pot already covers in this catalog — smaller footprint, single
honeypot (Cowrie), and centralized reporting to a third party by
default.

Use it only on infrastructure you own or are explicitly authorized to
expose — see the [disclaimer](/disclaimer).
