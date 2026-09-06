---
name: "rubilyn"
tagline: "64bit Mac OS-X kernel rootkit that uses no hardcoded address to hook the BSD subsystem in all OS-X Lion & below. It uses"
categories: ["backdoor"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://blackarch.org/backdoor.html"
downloadUrl: "http://nullsecurity.net/tools/backdoor.html"
commonlyOn: ["BlackArch"]
gettingStarted: "Install on BlackArch with `pacman -S rubilyn` (or add the BlackArch repository to an existing Arch Linux install). See the official BlackArch tool listing and upstream homepage linked above for details."
---

64bit Mac OS-X kernel rootkit that uses no hardcoded address to hook the BSD subsystem in all OS-X Lion & below. It uses a combination of syscall hooking and DKOM to hide activity on a host.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
