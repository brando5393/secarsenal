---
name: "pdfid"
tagline: "Scans PDF files for certain PDF keywords"
categories: ["pdf-forensics-tools"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/pdfid/"
downloadUrl: "https://blog.didierstevens.com/programs/pdf-tools/"
repoUrl: "https://gitlab.com/kalilinux/packages/pdfid"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install pdfid`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

This tool is not a PDF parser, but it will scan a file to look for certain PDF keywords, allowing you to identify PDF documents that contain (for example) JavaScript or execute an action when opened. PDFiD will also handle name obfuscation.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
