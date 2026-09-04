---
name: "sucrack"
tagline: "Multithreaded su bruteforcer"
categories: ["password-cracking"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/sucrack/"
downloadUrl: "https://labs.portcullis.co.uk/tools/sucrack/"
repoUrl: "https://salsa.debian.org/pkg-security-team/sucrack"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install sucrack`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

sucrack is a multithreaded Linux/UNIX tool for cracking local user accounts via wordlist bruteforcing su. This tool comes in handy when you’ve gained access to a low-privilege user account but are allowed to su to other users. Many su implementations require a pseudo terminal to be attached in order to take the password from the user. This can’t be easily achieved with a simple shell script. This tool, written in C, is highly efficient and can attempt multiple logins at the same time.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
