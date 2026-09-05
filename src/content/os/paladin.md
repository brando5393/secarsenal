---
name: PALADIN
tagline: SUMURI's forensic disk-imaging and write-blocking live distribution
category: forensics
team: blue
basedOn: Ubuntu
lastVerified: 2026-09-05
docsUrl: https://sumuri.com/software/paladin/
toolListMaintenance: manual
notableTools:
  - autopsy
  - sleuthkit
  - Volatility Framework
gettingStarted: |
  PALADIN LTS (currently version 9, built on Ubuntu 24.04 LTS) ships as
  a live bootable USB in 64-bit (LTS) and 32-bit (Edge) editions, and
  also supports bringing your own ISO. It boots with write-blocking and
  auto-mount disabled from the start so connected media isn't altered
  during acquisition. It's free to use personally under a "name your
  price" model; corporate use requires a minimum donation.
---

PALADIN is a forensic-imaging distribution built by SUMURI around
preserving evidence integrity by default — disk imaging and cloning,
memory analysis via Volatility 3, mobile/vehicle forensics, data
recovery and carving, and BitLocker decryption, bundled with Autopsy
and The Sleuth Kit for analysis.

Use it only against systems/media you own or are explicitly authorized
to examine — see the [disclaimer](/disclaimer).
