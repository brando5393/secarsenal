---
name: Exegol
tagline: Community-driven Docker hacking environment with 100+ pre-installed offensive tools
category: general-purpose
team: red
basedOn: Debian
lastVerified: 2026-09-05
docsUrl: https://docs.exegol.com/
repoUrl: https://github.com/ThePorgs/Exegol
toolListMaintenance: manual
notableTools:
  - nmap
  - hashcat
  - wireshark
  - ghidra
gettingStarted: |
  Exegol isn't a bootable ISO — it's a Python CLI wrapper (`pip install
  exegol`) around a set of official Docker images, each aimed at a
  different engagement type (full, ad, web, osint, light). The install
  scripts behind those images are plain shell (not a structured,
  linkable per-tool registry like a package manager's metadata), so its
  catalog is hand-maintained here rather than sync-scripted, same as
  CommandoVM. `exegol start` pulls the chosen image and drops into a
  containerized environment with a shared workspace on the host.
---

Exegol is a Docker-based pentest environment aimed at engagements where
spinning up a full Kali VM is overkill — it layers 100+ offensive tools
across categories (Active Directory, web, OSINT, cracking, reverse
engineering, RFID, SDR, and more) onto a lightweight Debian base image,
managed through its own CLI rather than a system package manager.

Use it only against systems/networks you own or are explicitly
authorized to test — see the [disclaimer](/disclaimer).
