---
name: "medusa"
tagline: "Fast, parallel, modular, login brute-forcer for network services"
categories: ["brute-force","credential-access"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/medusa/"
downloadUrl: "http://foofus.net/?page_id=51"
repoUrl: "https://salsa.debian.org/pkg-security-team/medusa"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install medusa`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

Medusa is intended to be a speedy, massively parallel, modular, login brute-forcer. The goal is to support as many services which allow remote authentication as possible. The author considers following items as some of the key features of this application: * Thread-based parallel testing. Brute-force testing can be performed against multiple hosts, users or passwords concurrently. * Flexible user input. Target information (host/user/password) can be specified in a variety of ways. For example, each item can be either a single entry or a file containing multiple entries. Additionally, a combination file format allows the user to refine their target listing. * Modular design. Each service module exists as an independent .mod file. This means that no modifications are necessary to the core application in order to extend the supported list of services for brute-forcing.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
