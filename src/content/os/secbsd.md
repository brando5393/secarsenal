---
name: SecBSD
tagline: OpenBSD-based distribution for penetration testing and ethical hacking
category: general-purpose
team: red
basedOn: OpenBSD
lastVerified: 2026-09-06
docsUrl: https://secbsd.org/
downloadUrl: https://mirror.secbsd.org/pub/SecBSD/snapshots/amd64/install20.img
toolListMaintenance: manual
notableTools:
  - metasploit-framework
  - burpsuite
  - sqlmap
  - hydra
  - aircrack-ng
  - ffuf
  - GnuPG
  - foremost
gettingStarted: |
  SecBSD tracks OpenBSD's -current branch, rebuilding pre-compiled,
  dependency-resolved security tools against OpenBSD's own hardened
  base (pledge/unveil exploit mitigations, no systemd, minimal default
  attack surface) rather than layering a pentest toolkit onto a
  GNU/Linux base like most distributions in this category. Snapshot
  ISOs are published to the project's own mirror roughly monthly; the
  site groups its bundled tools by category (recon/OSINT, scanning,
  exploitation, privacy, forensics) on its own tools page, but as
  comma-separated names within each category rather than individual
  linked entries, so this entry is maintained by hand rather than
  synced. As of this writing the project has publicly paused new
  snapshot releases pending infrastructure funding, while the site and
  existing snapshot mirror remain live and current.
---

SecBSD is a penetration-testing distribution built on OpenBSD rather
than the Linux base used by most tools in this category, inheriting
OpenBSD's proactive security architecture (code auditing, exploit
mitigations, minimal running services) as its starting point instead
of a hardening layer applied afterward.

Use it only against systems, networks, or accounts you own or are
explicitly authorized to test — see the [disclaimer](/disclaimer).
