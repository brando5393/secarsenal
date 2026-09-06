---
name: "fuzzdiff"
tagline: "A simple tool designed to help out with crash analysis during fuzz testing. It selectively 'un-fuzzes' portions of a fuz"
categories: ["fuzzer"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://blackarch.org/fuzzer.html"
commonlyOn: ["BlackArch"]
gettingStarted: "Install on BlackArch with `pacman -S fuzzdiff` (or add the BlackArch repository to an existing Arch Linux install). See the official BlackArch tool listing linked above for details."
---

A simple tool designed to help out with crash analysis during fuzz testing. It selectively 'un-fuzzes' portions of a fuzzed file that is known to cause a crash, re-launches the targeted application, and sees if it still crashes.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
