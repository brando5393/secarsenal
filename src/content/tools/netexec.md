---
name: NetExec
tagline: Network service exploitation and Active Directory post-exploitation tool (CrackMapExec successor)
categories: [post-exploitation, password-attacks]
platforms: [Linux, Windows, macOS]
license: BSD-2-Clause
lastVerified: 2026-09-04
docsUrl: https://www.netexec.wiki/
downloadUrl: https://github.com/Pennyw0rth/NetExec/releases
repoUrl: https://github.com/Pennyw0rth/NetExec
commonlyOn: [Kali Linux]
gettingStarted: |
  Install via `pipx install netexec` or use the copy preinstalled on
  recent Kali releases. Basic usage against SMB:
  `netexec smb <target-range> -u <user> -p <password>` checks
  credentials across a range of hosts and reports admin access, then
  further modules support command execution, credential dumping, and
  Active Directory enumeration. The wiki covers protocol support (SMB,
  WinRM, LDAP, SSH, and more) and its module system.
---

NetExec (the actively maintained successor to CrackMapExec) is a
network service exploitation tool built for large Windows/Active
Directory environments: validating credentials across many hosts at
once, then enumerating and exploiting what those credentials grant
access to.

Only use it against networks/accounts you own or are explicitly
authorized to test — see the [disclaimer](/disclaimer).
