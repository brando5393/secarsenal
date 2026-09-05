---
name: Pwnagotchi
tagline: Raspberry Pi companion that automates WPA/WPA2 handshake capture via bettercap
category: wireless
basedOn: Raspberry Pi OS
lastVerified: 2026-09-05
docsUrl: https://github.com/jayofelony/pwnagotchi/wiki
repoUrl: https://github.com/jayofelony/pwnagotchi
toolListMaintenance: manual
notableTools:
  - bettercap
gettingStarted: |
  Pwnagotchi flashes onto a Raspberry Pi Zero W/W2 or 3/4 as a
  dedicated image (via the official flashing tool linked from the wiki)
  rather than installing on general hardware. It instruments bettercap
  in the background to passively capture and deauth-trigger WPA/WPA2
  handshakes, displaying status on an attached e-paper/OLED screen. The
  original creator's repository is no longer maintained; the community
  fork linked above (jayofelony/pwnagotchi) is the actively updated
  successor and is what this entry documents.
---

Pwnagotchi is a single-purpose Raspberry Pi tool rather than a
general-purpose OS: it wraps bettercap to automate WPA/WPA2 handshake
capture, learning from its surrounding Wi-Fi environment to maximize
what it collects over time. It's a companion device for wireless
auditing, not a platform for running arbitrary pentest tools.

Use it only against networks you own or are explicitly authorized to
test — see the [disclaimer](/disclaimer).
