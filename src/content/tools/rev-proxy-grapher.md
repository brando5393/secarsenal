---
name: "rev-proxy-grapher"
tagline: "Reverse proxy grapher"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/rev-proxy-grapher/"
downloadUrl: "https://github.com/mricon/rev-proxy-grapher"
repoUrl: "https://gitlab.com/kalilinux/packages/rev-proxy-grapher"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install rev-proxy-grapher`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

This package contains a useful little tool that will generate a nice graphviz graph illustrating your reverse proxy flow. It takes a manually curated YAML file describing the topology of your network, proxy definitions, and optionally a collection of nmap output files for additional port/service information and output a graph in any format supported by graphviz.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
