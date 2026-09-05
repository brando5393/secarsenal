---
name: Kali Purple
tagline: Kali Linux's defensive/purple-team security operations platform
category: specialized
basedOn: Kali Linux
lastVerified: 2026-09-05
docsUrl: https://www.kali.org/get-kali/
toolListMaintenance: manual
notableTools:
  - openvas
  - suricata
  - zeek
  - CyberChef
gettingStarted: |
  Kali Purple isn't a separate distro — it's installed via a dedicated
  `kali-linux-purple-amd64.iso` on the standard Kali installer, or
  layered onto an existing Kali install via `kali-tools-*` metapackages.
  It's organized around the NIST Cybersecurity Framework 2.0 functions
  (Identify/Protect/Detect/Respond/Recover) rather than Kali's usual
  offense-oriented tool menu. Install/setup walkthroughs for its
  defensive stack live on a community-run wiki, linked from the get-kali
  page above, rather than Kali's polished per-tool docs.
---

Kali Purple is Kali Linux's defensive/blue-team counterpart to its
usual offensive tooling — it doesn't maintain a separate tool catalog
of its own, it inherits Kali's, which is already covered by this
site's Kali sync (GVM/OpenVAS, Suricata, Zeek, CyberChef, and more).
It also layers in a handful of additional "SOC-in-a-box" components —
Malcolm, TheHive, Arkime, OpenCTI — not yet in this site's tool
catalog.

Use it only against systems/networks you own or are explicitly
authorized to monitor — see the [disclaimer](/disclaimer).
