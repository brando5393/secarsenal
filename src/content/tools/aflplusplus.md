---
name: "aflplusplus"
tagline: "Instrumentation-driven fuzzer for binary formats"
categories: ["resource-development"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/aflplusplus/"
downloadUrl: "https://github.com/AFLplusplus/AFLplusplus"
repoUrl: "https://salsa.debian.org/pkg-security-team/aflplusplus"
commonlyOn: ["Kali Linux"]
gettingStarted: "See the official Kali tool page and upstream homepage linked above for installation and usage details."
---

American fuzzy lop is a fuzzer that employs compile-time instrumentation and genetic algorithms to automatically discover clean, interesting test cases that trigger new internal states in the targeted binary. This substantially improves the functional coverage for the fuzzed code. The compact synthesized corpora produced by the tool are also useful for seeding other, more labor- or resource-intensive testing regimes down the road.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
