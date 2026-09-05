---
name: Qubes OS
tagline: Security-by-compartmentalization OS built on the Xen hypervisor
category: specialized
basedOn: Xen (Fedora dom0)
lastVerified: 2026-09-05
docsUrl: https://www.qubes-os.org/
toolListMaintenance: manual
notableTools: []
gettingStarted: |
  Qubes OS isolates applications by running each one in a separate,
  disposable virtual machine ("qube") on top of the Xen hypervisor, so a
  compromised browser tab or PDF reader can't reach your other qubes'
  files or credentials. Each qube is based on a read-only TemplateVM —
  Fedora and Debian ship by default, and a Whonix template is included
  for Tor-routed qubes. It installs like a Fedora-based system but
  requires hardware virtualization support (Intel VT-x/VT-d or AMD-V/
  AMD-Vi), and doesn't publish a tool catalog since it's an isolation
  architecture rather than a bundled toolkit.
---

Qubes OS is a security-focused operating system built around
virtual-machine compartmentalization rather than a bundled pentest
toolkit — its value is architectural isolation, not a curated tool set.

Use it only against systems you own or are explicitly authorized to
test — see the [disclaimer](/disclaimer).
