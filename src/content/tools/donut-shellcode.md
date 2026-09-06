---
name: "donut-shellcode"
tagline: "Generates position-independent shellcode from memory and runs them"
categories: ["resource-development","defense-evasion"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/donut-shellcode/"
downloadUrl: "https://github.com/TheWover/donut"
repoUrl: "https://gitlab.com/kalilinux/packages/donut-shellcode"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install donut`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

Donut is a position-independent code that enables in-memory execution of VBScript, JScript, EXE, DLL files and dotNET assemblies. A module created by Donut can either be staged from a HTTP server or embedded directly in the loader itself. The module is optionally encrypted using the Chaskey block cipher and a 128-bit randomly generated key. After the file is loaded and executed in memory, the original reference is erased to deter memory scanners. The generator and loader support the following features: - Compression of input files with aPLib and LZNT1, Xpress, Xpress Huffman via RtlCompressBuffer. - Using entropy for API hashes and generation of strings. - 128-bit symmetric encryption of files. - Patching Antimalware Scan Interface (AMSI) and Windows Lockdown Policy (WLDP). - Patching command line for EXE files. - Patching exit-related API to avoid termination of host process. - Multiple output formats: C, Ruby, Python, PowerShell, Base64, C#, Hexadecimal.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
