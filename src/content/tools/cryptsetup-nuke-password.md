---
name: "cryptsetup-nuke-password"
tagline: "Erase the LUKS keys with a special password on the unlock prompt"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/cryptsetup-nuke-password/"
downloadUrl: "https://salsa.debian.org/pkg-security-team/cryptsetup-nuke-password"
repoUrl: "https://salsa.debian.org/pkg-security-team/cryptsetup-nuke-password"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page and upstream homepage linked above for installation and usage details."
---

Installing this package lets you configure a special “nuke password” that can be used to destroy the encryption keys required to unlock the encrypted partitions. This password can be entered in the usual early-boot prompt asking the passphrase to unlock the encrypted partition(s).

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
