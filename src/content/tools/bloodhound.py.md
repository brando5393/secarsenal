---
name: "bloodhound.py"
tagline: "Ingestor for BloodHound, based on Impacket (Python 3)"
categories: ["active-directory"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/bloodhound.py/"
downloadUrl: "https://github.com/dirkjanm/bloodhound.py"
repoUrl: "https://gitlab.com/kalilinux/packages/bloodhound.py"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page and upstream homepage linked above for installation and usage details."
---

This package contains a Python based ingestor for BloodHound, based on Impacket. BloodHound.py currently has the following limitations: * Supports most, but not all BloodHound (SharpHound) features. Primary missing features are GPO local groups and some differences in session resolution between BloodHound and SharpHound. * Kerberos authentication support is not yet complete, but can be used from the updatedkerberos branch.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
