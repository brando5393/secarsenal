---
name: Apktool
tagline: Reverse engineering tool for decoding and rebuilding Android APK files
categories: [reverse-engineering]
platforms: [Linux, Windows, macOS]
license: Apache-2.0
lastVerified: 2026-09-04
docsUrl: https://apktool.org/documentation/
downloadUrl: https://apktool.org/
repoUrl: https://github.com/iBotPeaches/Apktool
commonlyOn: [Kali Linux, Parrot Security OS]
gettingStarted: |
  Install via your package manager (preinstalled on Kali) or download
  the wrapper script and JAR from the official site (requires a JDK).
  Basic usage: `apktool d <app.apk>` decodes an APK into readable
  resources and Smali bytecode you can inspect or modify, and
  `apktool b <folder>` rebuilds it. The official docs cover framework
  resource handling and common decode/build issues.
---

Apktool decodes Android APK files into near-original resources and
Smali (disassembled Dalvik bytecode), lets you edit them, and rebuilds
a working APK — a core tool for Android app reverse engineering and
mobile security assessments.

Use it only on applications you own, have rights to analyze, or are
explicitly authorized to examine — see the [disclaimer](/disclaimer).
