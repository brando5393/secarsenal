---
name: Gobuster
tagline: Fast directory, file, DNS, and vhost brute-forcing tool
categories: [web-app, recon]
platforms: [Linux, Windows, macOS]
license: Apache-2.0
lastVerified: 2026-09-04
docsUrl: https://github.com/OJ/gobuster#readme
downloadUrl: https://github.com/OJ/gobuster/releases
repoUrl: https://github.com/OJ/gobuster
commonlyOn: [Kali Linux, Parrot Security OS, BlackArch]
gettingStarted: |
  Install via `go install`, a release binary, or the copy preinstalled
  on Kali. Basic directory brute force:
  `gobuster dir -u <url> -w <wordlist>`. Gobuster also supports `dns`
  mode for subdomain brute-forcing and `vhost` mode for virtual host
  discovery. The README covers all modes and their specific flags.
---

Gobuster is a fast, Go-based brute-forcing tool for discovering hidden
directories/files on a web server, subdomains via DNS brute force, and
virtual hosts — a common step after initial recon to map out an
application's real attack surface.

Only use it against applications/domains you own or are explicitly
authorized to test — see the [disclaimer](/disclaimer).
