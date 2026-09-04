---
name: BlackArch
tagline: Arch Linux-based distribution with one of the largest pentest tool repositories
category: specialized
basedOn: Arch Linux
lastVerified: 2026-09-04
docsUrl: https://blackarch.org/guide.html
downloadUrl: https://blackarch.org/downloads.html
repoUrl: https://github.com/BlackArch/blackarch
notableTools:
  - nmap
  - aircrack-ng
  - john
gettingStarted: |
  BlackArch is available as a standalone live/installer ISO, a NetInstall
  image, or as a repository overlay you can add to an existing Arch Linux
  install. Adding it as a repository to Arch is the common path for
  people who already run Arch and just want the tool catalog. The guide
  covers both paths, plus how to install tools individually or by category
  group (e.g. `blackarch-webapp`, `blackarch-wireless`) rather than pulling
  in the full 2,800+ tool repository at once.
---

BlackArch is an Arch Linux-based distribution with an independent
repository holding thousands of security tools, organized into dozens of
category groups. It targets users already comfortable with Arch's
rolling-release model and package management, trading Kali/Parrot's
polish for a much larger and more granular tool catalog.

Use it only against systems you own or are explicitly authorized to
test — see the [disclaimer](/disclaimer).
