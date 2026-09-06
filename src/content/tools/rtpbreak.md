---
name: "rtpbreak"
tagline: "Detects, reconstructs, and analyzes RTP sessions"
categories: ["voip"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/rtpbreak/"
downloadUrl: "http://dallachiesa.com/code/rtpbreak/"
repoUrl: "https://gitlab.com/kalilinux/packages/rtpbreak"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install rtpbreak`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

With rtpbreak you can detect, reconstruct and analyze any RTP session. It doesn’t require the presence of RTCP packets and works independently form the used signaling protocol (SIP, H.323, SCCP, …). The input is a sequence of packets, the output is a set of files you can use as input for other tools (wireshark/tshark, sox, grep/awk/cut/ cat/sed, …). It supports also wireless (AP_DLT_IEEE802_11) networks.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
