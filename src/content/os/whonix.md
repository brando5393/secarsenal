---
name: Whonix
tagline: Debian-based anonymity platform routing traffic through Tor
category: specialized
basedOn: Debian
lastVerified: 2026-09-05
docsUrl: https://www.whonix.org/
toolListMaintenance: manual
notableTools:
  - tor
gettingStarted: |
  Whonix runs as a pair of Debian-based virtual machines — a Gateway
  that routes all traffic through Tor, and a Workstation that can only
  reach the network through that Gateway — so an application compromise
  on the Workstation can't leak your real IP even if Tor itself is
  bypassed. It ships as VirtualBox/KVM images plus a Qubes OS template,
  not a standalone bootable ISO. Its documentation is organized as
  security guides (browsing, communications, hardening) rather than a
  tool-by-tool reference.
---

Whonix is an anonymity-focused platform built around a two-VM
architecture that isolates your applications from your real network
identity, rather than a general-purpose pentest toolkit.

Use it only against systems you own or are explicitly authorized to
test — see the [disclaimer](/disclaimer).
