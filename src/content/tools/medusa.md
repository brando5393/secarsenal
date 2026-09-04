---
name: Medusa
tagline: Speedy, parallel, modular login brute-forcing tool
categories: [password-attacks]
platforms: [Linux, macOS]
license: GPL-2.0
lastVerified: 2026-09-04
docsUrl: https://github.com/jmk-foofus/medusa#readme
downloadUrl: https://github.com/jmk-foofus/medusa
repoUrl: https://github.com/jmk-foofus/medusa
commonlyOn: [Kali Linux, BlackArch]
gettingStarted: |
  Install via your package manager (preinstalled on Kali) or build from
  source. Basic usage against SSH:
  `medusa -h <target> -u <user> -P <wordlist> -M ssh`. Medusa's module
  system (`-M`) covers a wide range of services similar to Hydra; the
  README documents available modules and options for parallel host/user
  brute-forcing.
---

Medusa is a fast, modular, parallel network login brute-forcer, often
mentioned alongside Hydra as an alternative with a different module
architecture and threading model.

Only use it against systems/accounts you own or are explicitly
authorized to test — see the [disclaimer](/disclaimer).
