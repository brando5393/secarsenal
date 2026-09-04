---
name: ffuf
tagline: Fast web fuzzer for directories, parameters, and virtual hosts
categories: [web-app, recon]
platforms: [Linux, Windows, macOS]
license: MIT
lastVerified: 2026-09-04
docsUrl: https://github.com/ffuf/ffuf#readme
downloadUrl: https://github.com/ffuf/ffuf/releases
repoUrl: https://github.com/ffuf/ffuf
commonlyOn: [Kali Linux, Parrot Security OS, BlackArch]
gettingStarted: |
  Install via `go install`, a release binary, or the copy preinstalled
  on Kali. Basic usage fuzzes any part of a request by replacing it with
  `FUZZ`: `ffuf -u https://target/FUZZ -w <wordlist>` for directory
  discovery, or `-H "Host: FUZZ.target"` for vhost fuzzing. The README
  covers filtering responses by size/status/words, which is essential
  for cutting down false positives on noisy targets.
---

ffuf ("Fuzz Faster U Fool") is a fast, flexible web fuzzer that can
substitute a `FUZZ` keyword into any part of an HTTP request — URL
path, headers, POST body — making it useful well beyond directory
brute-forcing, including parameter discovery and vhost enumeration.

Only use it against applications you own or are explicitly authorized
to test — see the [disclaimer](/disclaimer).
