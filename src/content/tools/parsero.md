---
name: "parsero"
tagline: "Robots.txt audit tool"
categories: ["web-scanning"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/parsero/"
downloadUrl: "https://github.com/behindthefirewalls/Parsero"
repoUrl: "https://gitlab.com/kalilinux/packages/parsero"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install parsero`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

Parsero is a free script written in Python which reads the Robots.txt file of a web server and looks at the Disallow entries. The Disallow entries tell the search engines what directories or files hosted on a web server mustn’t be indexed. For example, “Disallow: /portal/login” means that the content on www.example.com/portal/login it’s not allowed to be indexed by crawlers like Google, Bing, Yahoo… This is the way the administrator have to not share sensitive or private information with the search engines.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
