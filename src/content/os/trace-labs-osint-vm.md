---
name: Trace Labs OSINT VM
tagline: Debian-based virtual machine purpose-built for OSINT investigations
category: specialized
basedOn: Debian
lastVerified: 2026-09-05
docsUrl: https://github.com/tracelabs/tlosint-vm
downloadUrl: https://github.com/tracelabs/tlosint-vm/releases
toolListMaintenance: manual
notableTools:
  - sherlock
  - spiderfoot
  - maltego
  - theharvester
  - phoneinfoga
  - sn0int
gettingStarted: |
  The 2026.07 release ships as prebuilt VirtualBox/VMware OVA images
  and an ARM64 qcow2 image, with a choice of XFCE or GNOME desktops
  (default login `osint`/`osint`). Its tools can also be layered onto
  an existing Kali or Debian install via the standalone
  `tlosint-tools.sh` script instead of importing the full VM. As of the
  2026.05 release it was rebuilt from scratch on Debian rather than
  Kali, specifically to drop red-team/exploit tooling and focus purely
  on OSINT.
---

Trace Labs OSINT VM is maintained by the nonprofit behind the Trace
Labs Search Party CTF — crowdsourced open-source-intelligence
gathering used to help locate missing persons — and bundles OSINT
tooling for domain, email, phone-number, username, and social-media
reconnaissance.

Use it only against people/organizations you own or are explicitly
authorized to investigate — see the [disclaimer](/disclaimer).
