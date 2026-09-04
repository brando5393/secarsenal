---
name: "statsprocessor"
tagline: "Word generator based on per-position Markov chains"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/statsprocessor/"
downloadUrl: "https://github.com/hashcat/statsprocessor"
repoUrl: "https://salsa.debian.org/pkg-security-team/statsprocessor"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install statsprocessor`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

Statsprocessor is a word generator based on per-position Markov chains packed into a single stand-alone binary. It generates candidate words based on a Hashcat format .hcstat file by using this information to determine which letter is following which letter based on the analysis of the original input dictionary used to generate the .hcstat. The resulting words can then, for example, be postprocessed and fed into Hashcat or other password recovery tools.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
