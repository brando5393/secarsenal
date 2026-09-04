---
name: "tlssled"
tagline: "Evaluates the security of a target SSL/TLS (HTTPS) server"
categories: ["ssl-tls"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/tlssled/"
downloadUrl: "http://www.taddong.com/en/lab.html"
repoUrl: "https://gitlab.com/kalilinux/packages/tlssled"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install tlssled`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

TLSSLed is a Linux shell script whose purpose is to evaluate the security of a target SSL/TLS (HTTPS) web server implementation. It is based on sslscan, a thorough SSL/TLS scanner that is based on the openssl library, and on the “openssl s_client” command line tool. The current tests include checking if the target supports the SSLv2 protocol, the NULL cipher, weak ciphers based on their key length (40 or 56 bits), the availability of strong ciphers (like AES), if the digital certificate is MD5 signed, and the current SSL/TLS renegotiation capabilities.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
