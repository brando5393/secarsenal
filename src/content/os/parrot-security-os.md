---
name: Parrot Security OS
tagline: Debian-based distribution for pentesting, digital forensics, and privacy
category: general-purpose
basedOn: Debian
lastVerified: 2026-09-04
docsUrl: https://parrotsec.org/docs/
downloadUrl: https://parrotsec.org/download/
repoUrl: https://github.com/ParrotSec
toolListMaintenance: manual
notableTools:
  - nmap
  - metasploit-framework
  - wireshark
  - burpsuite
  - john
gettingStarted: |
  Parrot offers several editions: Security (full pentest tool set), Home
  (everyday use with privacy tooling), and a small HTC edge/IoT edition.
  Most people evaluating it for pentesting want the Security edition,
  available as an installer ISO or a virtual machine image. The official
  docs walk through installation, the MATE desktop layout, and Parrot's
  "AnonSurf" and sandboxing tools that distinguish it from other pentest
  distributions.
---

Parrot Security OS is a Debian-based distribution aimed at penetration
testers, security researchers, and privacy-conscious users. It overlaps
heavily with Kali's tool catalog but is lighter on system resources by
default and ships additional privacy/anonymity tooling and a sandboxed
architecture for running untrusted tools more safely.

Use it only against systems you own or are explicitly authorized to
test — see the [disclaimer](/disclaimer).
