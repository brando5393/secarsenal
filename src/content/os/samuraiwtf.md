---
name: SamuraiWTF
tagline: OWASP-maintained web-app pentest training environment
category: specialized
basedOn: Ubuntu
lastVerified: 2026-09-05
docsUrl: https://owasp.org/www-project-samuraiwtf/
repoUrl: https://github.com/SamuraiWTF/samuraiwtf
toolListMaintenance: manual
notableTools:
  - zaproxy
  - burpsuite
  - sqlmap
  - nikto
  - ffuf
  - trufflehog
gettingStarted: |
  SamuraiWTF is distributed as a prebuilt VirtualBox OVA or Hyper-V
  VHDX image (or built yourself via Vagrant) on Ubuntu — there's no
  installer ISO. Both its tools and its deliberately vulnerable target
  apps are managed through its own Katana package tool
  (`katana install <name>`, `katana list`) rather than a system package
  manager, and targets resolve under a local `.test` domain via a
  self-signed root CA.
---

SamuraiWTF ("Web Training Framework") is an OWASP project bundling
web-application pentest tools — ZAP, Burp Suite Community Edition,
sqlmap, ffuf, Nikto, TruffleHog — alongside deliberately vulnerable
target apps (OWASP Juice Shop, DVWA, Mutillidae, crAPI, and others) for
practicing against.

Use it only against the bundled training targets or systems you own or
are explicitly authorized to test — see the [disclaimer](/disclaimer).
