---
name: "spire"
tagline: "Toolchain of APIs for establishing trust between software systems"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-04
docsUrl: "https://www.kali.org/tools/spire/"
downloadUrl: "https://github.com/spiffe/spire"
repoUrl: "https://gitlab.com/kalilinux/packages/spire"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install spire`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

This package contains SPIRE (the SPIFFE Runtime Environment). It is a toolchain of APIs for establishing trust between software systems across a wide variety of hosting platforms. SPIRE exposes the SPIFFE Workload API, which can attest running software systems and issue SPIFFE IDs and SVIDs to them. This in turn allows two workloads to establish trust between each other, for example by establishing an mTLS connection or by signing and verifying a JWT token. SPIRE can also enable workloads to securely authenticate to a secret store, a database, or a cloud provider service.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
