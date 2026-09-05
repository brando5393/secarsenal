---
name: NetHydra
tagline: Debian-based pentest distro running a real-time (PREEMPT_RT) kernel by default
category: general-purpose
basedOn: Debian
lastVerified: 2026-09-05
docsUrl: https://github.com/NetHydra/NetHydra
downloadUrl: https://nethydra.github.io
toolListMaintenance: manual
notableTools: []
gettingStarted: |
  NetHydra (formerly HydraPWK) ships as a live/installable ISO with an
  Xfce desktop. Its defining feature is running a PREEMPT_RT real-time
  Linux kernel by default, aimed at timing-sensitive testing work where
  a standard kernel's scheduling jitter matters. Tools are organized
  into desktop-menu categories (information gathering, scanning, stress
  testing, exploitation, cracking, reverse engineering, forensics)
  rather than a structured, linkable manifest.
---

NetHydra is a Debian-based penetration-testing distro whose main
distinguishing feature — a real-time kernel — sets it apart from the
Kali/Parrot/BlackArch family it otherwise resembles in scope and tool
categories.

Use it only against systems/networks you own or are explicitly
authorized to test — see the [disclaimer](/disclaimer).
