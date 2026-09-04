---
name: Hydra (THC-Hydra)
tagline: Parallelized network login brute-forcing tool
categories: [password-attacks]
platforms: [Linux, Windows, macOS]
license: AGPL-3.0
lastVerified: 2026-09-04
docsUrl: https://github.com/vanhauser-thc/thc-hydra#readme
downloadUrl: https://github.com/vanhauser-thc/thc-hydra
repoUrl: https://github.com/vanhauser-thc/thc-hydra
commonlyOn: [Kali Linux, Parrot Security OS, BlackArch]
gettingStarted: |
  Install via your package manager (preinstalled on Kali/Parrot) or
  build from source. Basic usage against SSH:
  `hydra -l <user> -P <wordlist> ssh://<target>`. Hydra supports dozens
  of protocols (SSH, FTP, HTTP forms, RDP, SMB, and more) — the README
  and `hydra -h` cover per-protocol syntax and tuning parallelism/timing
  to avoid overwhelming a target.
---

Hydra is a fast, parallelized network login brute-forcer supporting a
very wide range of protocols, used during authorized assessments to
test the strength of authentication on network services.

Only use it against systems/accounts you own or are explicitly
authorized to test — see the [disclaimer](/disclaimer).
