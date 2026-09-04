---
name: "feroxbuster"
tagline: "Fast, simple, recursive content discovery tool written in Rust"
categories: ["web-scanning"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/feroxbuster/"
downloadUrl: "https://github.com/epi052/feroxbuster"
repoUrl: "https://gitlab.com/kalilinux/packages/feroxbuster"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install feroxbuster`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

feroxbuster is a tool designed to perform Forced Browsing. Forced browsing is an attack where the aim is to enumerate and access resources that are not referenced by the web application, but are still accessible by an attacker. feroxbuster uses brute force combined with a wordlist to search for unlinked content in target directories. These resources may store sensitive information about web applications and operational systems, such as source code, credentials, internal network addressing, etc… This attack is also known as Predictable Resource Location, File Enumeration, Directory Enumeration, and Resource Enumeration.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
