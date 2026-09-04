---
name: OpenVAS (Greenbone Vulnerability Manager)
tagline: Full-featured open-source network vulnerability scanner
categories: [vulnerability-scanning, recon]
platforms: [Linux]
license: GPL-2.0 (AGPL-3.0 for newer components)
lastVerified: 2026-09-04
docsUrl: https://greenbone.github.io/docs/latest/
downloadUrl: https://github.com/greenbone/openvas-scanner#readme
repoUrl: https://github.com/greenbone
commonlyOn: [Kali Linux]
gettingStarted: |
  On Kali, install with `apt install openvas` (or the `gvm` package
  depending on release) and run the setup script, which downloads the
  vulnerability feed on first run — this can take a while. Once set up,
  manage scans through the Greenbone Security Assistant web UI. The
  official docs cover feed synchronization, scan configs/policies, and
  scaling scans across a network.
---

OpenVAS, now developed as part of the Greenbone Vulnerability
Management stack, is a full network vulnerability scanner that checks
hosts against a large, regularly updated feed of known vulnerability
tests (NVTs) — heavier-weight and broader in scope than a single-purpose
scanner like Nikto.

Only scan networks/hosts you own or are explicitly authorized to test —
see the [disclaimer](/disclaimer).
