---
name: Linux Kodachi
tagline: Debian-based privacy and anonymity platform
category: specialized
basedOn: Debian
lastVerified: 2026-09-05
docsUrl: https://sourceforge.net/projects/linuxkodachi/
toolListMaintenance: manual
notableTools:
  - tor
  - OnionShare
  - nmap
gettingStarted: |
  Linux Kodachi boots into a pre-configured privacy environment with no
  manual setup — it automatically layers a VPN, then Tor, encrypted DNS,
  and firewall rules on startup. The current release (Kodachi 9) rebased
  onto Debian 13 with an XFCE desktop and added a dashboard GUI that
  orchestrates its bundled networking, hardening, and monitoring
  utilities alongside standard tools like VeraCrypt, KeePassXC, and Tor
  Browser. Tools are documented in categorized "Exhibits" across its
  site rather than one structured catalog page.
---

Linux Kodachi is a privacy-focused live distribution that automatically
sets up a layered anonymity stack (VPN + Tor + encrypted DNS) on boot,
rather than functioning as a general pentest toolkit.

Use it only against systems you own or are explicitly authorized to
test — see the [disclaimer](/disclaimer).
