---
name: "hotpatch"
tagline: "Hot patches Linux executables with .so file injection"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/hotpatch/"
downloadUrl: "https://github.com/vikasnkumar/hotpatch"
repoUrl: "https://gitlab.com/kalilinux/packages/hotpatch"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install hotpatch`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

Hotpatch is a library that can be used to dynamically load a shared library (.so) file on Linux from one process into another already running process, without affecting the execution of the target process. The API is a C API, but also supported in C++.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
