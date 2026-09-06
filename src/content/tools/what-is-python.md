---
name: "what-is-python"
tagline: "Symlinks /usr/bin/python-config to python3-config"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/what-is-python/"
repoUrl: "https://pkg.kali.org/pkg/what-is-python"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page linked above for installation and usage details."
---

Starting with the Debian 11 (bullseye) and Ubuntu 20.04 LTS (focal) releases, all python packages use explicit python3 or python2 interpreter and do not use unversioned /usr/bin/python-config at all. Some third-party code is now predominantly python3 based, yet may use /usr/bin/python-config.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
