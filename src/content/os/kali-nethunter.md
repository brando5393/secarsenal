---
name: Kali NetHunter
tagline: Kali Linux's penetration testing platform for Android devices
category: general-purpose
team: red
basedOn: Android
lastVerified: 2026-09-05
docsUrl: https://www.kali.org/get-kali/#kali-mobile
toolListMaintenance: manual
notableTools:
  - aircrack-ng
  - hashcat
  - nmap
gettingStarted: |
  NetHunter runs a Kali Linux container on top of Android, giving you
  the same Kali tool set on a phone or tablet plus Android-specific
  attack classes documented individually (HID keyboard attacks, BadUSB,
  Evil AP/MANA). It doesn't maintain a separate tool catalog of its
  own — it inherits Kali's, which is already covered by this site's
  Kali sync. Install via the official Kali NetHunter app/images linked
  above, on supported devices or as a generic ARM64 image.
---

Kali NetHunter is Kali Linux's Android platform — the same Kali tool
set inside an Android container, plus a set of mobile-specific attack
techniques (HID injection, BadUSB, rogue AP) that don't apply to a
desktop install.

Use it only against systems/networks you own or are explicitly
authorized to test — see the [disclaimer](/disclaimer).
