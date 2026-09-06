---
name: SigintOS
tagline: Ubuntu-based distro for SDR-driven signals intelligence operations
category: specialized
team: red
basedOn: Ubuntu
lastVerified: 2026-09-06
docsUrl: https://www.sigintos.com/sigintos-linux/
toolListMaintenance: manual
notableTools:
  - hackrf
  - gnuradio
  - gr-gsm
  - wireshark
gettingStarted: |
  SigintOS ships as an Ubuntu-based live/installable image with a
  built-in GUI for common SIGINT workflows against software-defined
  radios (RTL-SDR, HackRF, BladeRF, USRP) — an FM/GPS transmitter, a
  jammer, a GSM base station search tool, and an IMSI catcher, layered
  on top of standard SDR tooling like GNU Radio, gr-gsm, and Wireshark.
  Developed by SigintOS High Technology & Defence Products Corporation
  (Teknopark Istanbul, Turkey); the official site doesn't publish a
  structured per-tool list, so the tools above were cross-checked
  individually from its own product pages.
---

SigintOS occupies the same SDR/radio-security niche as DragonOS already
in this catalog, but is purpose-built around signals-intelligence
operations (interception, jamming, base-station analysis) rather than
DragonOS's broader SDR-research scope.

Use it only against systems/spectrum you own or are explicitly
authorized to test — see the [disclaimer](/disclaimer).
