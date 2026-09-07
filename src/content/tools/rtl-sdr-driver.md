---
name: "Rtl-sdr driver"
tagline: "rtl_tcp & libusb-1.0 port supporting opening devices from Linux file descriptors"
categories: ["development","rf"]
platforms: ["Android"]
lastVerified: 2026-09-07
docsUrl: "https://github.com/martinmarinov/rtl_tcp_andro-"
commonlyOn: []
gettingStarted: "Install from the Kali NetHunter App Store (store.nethunter.com) or NetHunter's own app repository on an Android device."
license: "GPL-2.0-or-later"
---

rtl_tcp and libusb-1.0 port for Android modified to support opening devices from Linux file descriptors.
This driver implements an extension of the rtl-tcp protocol. It is fully compatible with any rtl-tcp capable client. However it also adds a number of additional commands that can allow Android clients to use the same API to control other SDR hardware devices such as the SDRplay or HackRF.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
