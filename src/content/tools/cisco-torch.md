---
name: "cisco-torch"
tagline: "Cisco device scanner"
categories: ["cisco-tools"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/cisco-torch/"
repoUrl: "https://gitlab.com/kalilinux/packages/cisco-torch"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install cisco-torch`. See the official Kali tool page linked above for full usage and configuration details."
---

The main feature that makes cisco-torch different from similar tools is the extensive use of forking to launch multiple scanning processes on the background for maximum scanning efficiency. Also, it uses several methods of application layer fingerprinting simultaneoulsy, if needed. We wanted something fast to discover remote Cisco hosts running Telnet, SSH, Web, NTP, TFTP and SNMP services and launch dicitionary attacks against the services discovered, including SNMP community attack (you would like the community.txt list :-) and TFTP servers (configuration file name bruteforcing with following config leeching). The tool can also get device configurationfiles automatically if SNMP RW community is found.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
