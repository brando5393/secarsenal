---
name: "blueranger"
tagline: "Simple Bash script to locate Bluetooth devices"
categories: ["bluetooth"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/blueranger/"
downloadUrl: "http://www.hackfromacave.com/projects/blueranger.html"
repoUrl: "https://gitlab.com/kalilinux/packages/blueranger"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page and upstream homepage linked above for installation and usage details."
---

BlueRanger is a simple Bash script which uses Link Quality to locate Bluetooth device radios. It sends l2cap (Bluetooth) pings to create a connection between Bluetooth interfaces, since most devices allow pings without any authentication or authorization. The higher the link quality, the closer the device (in theory).

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
