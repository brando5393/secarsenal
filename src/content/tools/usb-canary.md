---
name: "usb-canary"
tagline: "A Linux or OSX tool that uses psutil to monitor devices while your computer is locked. In the case it detects someone pl"
categories: ["defensive"]
platforms: ["Linux"]
lastVerified: 2026-09-05
docsUrl: "https://blackarch.org/defensive.html"
commonlyOn: ["BlackArch"]
gettingStarted: "Install on BlackArch with `pacman -S usb-canary` (or add the BlackArch repository to an existing Arch Linux install). See the official BlackArch tool listing linked above for details."
---

A Linux or OSX tool that uses psutil to monitor devices while your computer is locked. In the case it detects someone plugging in or unplugging devices it can be configured to send you an SMS or alert you via Slack or Pushover.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
