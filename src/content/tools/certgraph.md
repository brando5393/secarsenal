---
name: "certgraph"
tagline: "Tool to crawl the graph of certificate Alternate Names"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/certgraph/"
downloadUrl: "https://github.com/lanrat/certgraph"
repoUrl: "https://gitlab.com/kalilinux/packages/certgraph"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page and upstream homepage linked above for installation and usage details."
---

This package contains a tool to crawl the graph of certificate Alternate Names. CertGraph crawls SSL certificates creating a directed graph where each domain is a node and the certificate alternative names for that domain’s certificate are the edges to other domain nodes. New domains are printed as they are found. In Detailed mode upon completion the Graph’s adjacency list is printed.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
