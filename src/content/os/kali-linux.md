---
name: Kali Linux
tagline: Debian-based distribution built for penetration testing and security auditing
category: general-purpose
basedOn: Debian
lastVerified: 2026-09-04
docsUrl: https://www.kali.org/docs/
downloadUrl: https://www.kali.org/get-kali/
repoUrl: https://gitlab.com/kalilinux/build-scripts/kali-live
notableTools:
  - nmap
  - metasploit-framework
  - wireshark
  - burpsuite
  - john
  - aircrack-ng
  - hydra
  - nikto
  - ettercap
  - impacket
  - autopsy
  - set
gettingStarted: |
  Kali ships as installer ISOs, a live image, ARM images, WSL, and pre-built
  virtual machine images for VMware/VirtualBox. For most newcomers, the
  official virtual machine images are the fastest safe way to start: import
  the image into VirtualBox or VMware and boot straight into a full
  desktop with the tool set pre-installed. The official documentation
  covers installation, the `kali-tweaks` configuration tool, and how to
  install specific tool metapackages (e.g. `kali-tools-wireless`) instead
  of the full set.
---

Kali Linux is the most widely used penetration testing distribution,
maintained by Offensive Security. It bundles several hundred security
tools spanning reconnaissance, exploitation, forensics, wireless
auditing, and reverse engineering, organized into installable
metapackages so you can pull in only the categories you need.

Kali is intended for authorized security testing, security research, and
education. Only use it against systems you own or are explicitly
authorized to test — see the [disclaimer](/disclaimer).
