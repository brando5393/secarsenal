---
name: TheHive
tagline: Incident-response case management platform with an official demo VM
category: specialized
team: blue
basedOn: Debian
lastVerified: 2026-09-05
docsUrl: https://docs.strangebee.com/resources/howto-vm-demo/
repoUrl: https://github.com/TheHive-Project/TheHive
toolListMaintenance: manual
notableTools: []
gettingStarted: |
  TheHive's maintainer, StrangeBee, publishes a ready-to-import OVA
  (currently Debian-based) bundling TheHive, Cortex, and Elasticsearch
  for a quick demo — explicitly for evaluation, not production, per its
  own documentation. It boots straight to a working instance with no
  setup. For real deployments, the official docs instead cover
  Docker-based and package-based installs of TheHive and its Cortex
  analyzer engine separately.
---

TheHive is a scalable case-management platform for security incident
response — organizing alerts, cases, tasks, and observables for an
IR team, paired with Cortex for running enrichment/analysis jobs
against those observables. It's a defensive/blue-team platform,
included here for its official downloadable demo VM rather than any
offensive tooling.

Use it only in environments you own or are explicitly authorized to
operate in — see the [disclaimer](/disclaimer).
