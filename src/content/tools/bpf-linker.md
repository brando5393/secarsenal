---
name: "bpf-linker"
tagline: "Simplify building modern BPF programs"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/bpf-linker/"
downloadUrl: "https://github.com/aya-rs/bpf-linker"
repoUrl: "https://gitlab.com/kalilinux/packages/bpf-linker"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install bpf-linker`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

This package contains bpd-linker which can be used to statically link multiple BPF object files together and optionally perform optimizations needed to target older kernels. It operates on LLVM bitcode, so the inputs must be bitcode files (.bc) or object files with embedded bitcode (.o), optionally stored inside ar archives (.a).

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
