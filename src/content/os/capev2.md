---
name: CAPEv2
tagline: Automated malware sandbox for dynamic analysis and config/payload extraction
category: specialized
team: blue
basedOn: Ubuntu
lastVerified: 2026-09-05
docsUrl: https://capev2.readthedocs.io/en/latest/introduction/what.html
repoUrl: https://github.com/kevoreilly/CAPEv2
toolListMaintenance: manual
notableTools:
  - yara
gettingStarted: |
  CAPE isn't a downloadable ISO — it's installed onto an Ubuntu host
  via the official `cape2.sh` installer script, which sets up the CAPE
  server alongside Windows guest VMs used as detonation targets for
  submitted samples. Malware run inside those VMs is monitored and its
  behavior, extracted configuration, and payloads are reported back
  through CAPE's web interface, with detection driven heavily by YARA
  signatures.
---

CAPEv2 (Config And Payload Extraction) is a malware sandbox derived
from the original Cuckoo Sandbox, purpose-built to automate dynamic
malware analysis: detonating a sample in an instrumented Windows VM and
extracting its unpacked payloads, C2 configuration, and behavioral
indicators. It's the dynamic-analysis complement to REMnux's static
toolset already in this catalog.

Use it only against samples/systems you're authorized to analyze — see
the [disclaimer](/disclaimer).
