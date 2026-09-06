---
name: "ccrypt"
tagline: "Secure encryption and decryption of files and streams"
categories: ["defense-evasion"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/ccrypt/"
downloadUrl: "https://ccrypt.sourceforge.net/"
repoUrl: "https://salsa.debian.org/pkg-security-team/ccrypt"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install ccrypt`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

ccrypt is a utility for encrypting and decrypting files and streams. It was designed as a replacement for the standard unix crypt utility, which is notorious for using a very weak encryption algorithm. ccrypt is based on the Rijndael cipher, which is the U.S. government’s chosen candidate for the Advanced Encryption Standard (AES, see http://www.nist.gov/aes). This cipher is believed to provide very strong security.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
