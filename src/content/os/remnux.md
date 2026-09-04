---
name: REMnux
tagline: Ubuntu-based toolkit for reverse-engineering and analyzing malicious software
category: specialized
basedOn: Ubuntu
lastVerified: 2026-09-04
docsUrl: https://docs.remnux.org/
downloadUrl: https://docs.remnux.org/install-distro/get-virtual-appliance
repoUrl: https://github.com/REMnux
notableTools:
  - ghidra
  - binwalk
  - yara
gettingStarted: |
  REMnux is distributed as a pre-built virtual appliance (OVA) for
  VMware/VirtualBox, or it can be layered onto an existing Ubuntu
  installation via an install script. The virtual appliance is the
  fastest way to start: import it into your hypervisor and boot into a
  desktop with malware analysis tooling preinstalled. The official docs
  cover both installation paths, plus running individual tools as
  Docker containers instead of installing the full distro.
---

REMnux is a Linux toolkit, created by Lenny Zeltser, focused on
reverse-engineering and analyzing malicious software: static and
dynamic binary analysis, memory forensics, network traffic inspection,
and deobfuscation tools for scripts and documents used in malware
delivery.

REMnux is intended for malware analysis, incident response, and
security research. Only analyze samples/systems you own or are
explicitly authorized to examine — see the [disclaimer](/disclaimer).
