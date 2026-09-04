---
name: "quark-engine"
tagline: "Android Malware (Analysis | Scoring System)"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/quark-engine/"
downloadUrl: "https://github.com/ev-flow/quark-engine"
repoUrl: "https://gitlab.com/kalilinux/packages/quark-engine"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install quark-engine`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

Quark-Engine is a full-featured Android analysis framework written in Python for hunting threat intelligence inside the APK, DEX files. Since it is rule-based, you can use the ones built-in or customize as needed. With ideas decoded from criminal law, Quark-Engine has its unique angles for Android analysis. A Dalvik bytecode loader has been developed that has tainted analysis inside but also defeats the obfuscation techniques used against reverse engineering. And surprisingly, the loader matches perfectly the design of the malware scoring system. Quark-Engine is very easy to use and also provides flexible output formats. There are three types of output reports: detail report, call graph, and summary report. With these reports in mind, you can get an overview of the high-risk behavior inside Android within seconds. Also, by integrating with other Android analysis tools such as Ghidra, APKLAB, Jadx, Quark-Engine can greatly improve the efficiency of reverse engineers.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
