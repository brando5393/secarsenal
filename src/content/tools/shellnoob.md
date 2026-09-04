---
name: "shellnoob"
tagline: "Shellcode writing toolkit"
categories: ["resource-development"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/shellnoob/"
downloadUrl: "https://github.com/reyammer/shellnoob"
repoUrl: "https://gitlab.com/kalilinux/packages/shellnoob"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install shellnoob`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

Features: * convert shellcode between different formats and sources. Formats currently supported: asm, bin, hex, obj, exe, C, Python, ruby, pretty, safeasm, completec, shellstorm. (All details in the “Formats description” section.) * interactive asm-to-opcode conversion (and viceversa) mode. This is useful when you cannot use specific bytes in the shellcode and you want to figure out if a specific assembly instruction will cause problems. * support for both ATT & Intel syntax. Check the –intel switch. * support for 32 and 64 bits (when playing on x86_64 machine). Check the –64 switch. * resolve syscall numbers, constants, and error numbers * portable and easily deployable (it only relies on gcc/as/objdump and Python) And it just one self-contained Python script! * in-place development: you run ShellNoob directly on the target architecture * built-in support for Linux/x86, Linux/x86_64, Linux/ARM, FreeBSD/x86, FreeBSD/x86_64. * “prepend breakpoint” option. Check the -c switch. * read from stdin / write to stdout support (use “-” as filename) * uber cheap debugging: check the –to-strace and –to-gdb option! * Use ShellNoob as a Python module in your scripts! Check the “ShellNoob as a library” section. * Verbose mode shows the low-level steps of the conversion: useful to debug / understand / learn * Extra plugins: binary patching made easy with the –file-patch, –vm-patch, –fork-nopper options

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
