---
name: "restrict-egress"
tagline: "Restrict outbound network access to an allowlist of domains and CIDRs using an nftables default-deny egress policy. It i"
categories: ["general-utilities"]
platforms: ["Linux"]
license: "MIT"
lastVerified: 2026-09-06
docsUrl: "https://docs.remnux.org/discover-the-tools/general+utilities"
downloadUrl: "https://github.com/REMnux/distro/blob/master/files/restrict-egress"
commonlyOn: ["REMnux"]
gettingStarted: "Preinstalled on REMnux. See the official REMnux tool listing and upstream website linked above for details."
---

Restrict outbound network access to an allowlist of domains and CIDRs using an nftables default-deny egress policy. It installs a persistent, self-refreshing lockdown on a VM or host, or enforces a one-shot lockdown inside a container with the apply command. Where dnsmasq and systemd-resolved are present, domain entries are coupled to DNS: a local dnsmasq inserts each answered IP into the allow set before the client sees it, so rotating load-balancer addresses never miss.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
