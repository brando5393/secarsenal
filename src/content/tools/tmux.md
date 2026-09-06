---
name: "tmux"
tagline: "Terminal multiplexer"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/tmux/"
downloadUrl: "https://github.com/tmux/tmux/wiki"
repoUrl: "https://salsa.debian.org/debian/tmux"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install tmux`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

tmux enables a number of terminals (or windows) to be accessed and controlled from a single terminal like screen. tmux runs as a server-client system. A server is created automatically when necessary and holds a number of sessions, each of which may have a number of windows linked to it. Any number of clients may connect to a session, or the server may be controlled by issuing commands with tmux. Communication takes place through a socket, by default placed in /tmp. Moreover tmux provides a consistent and well-documented command interface, with the same syntax whether used interactively, as a key binding, or from the shell. It offers a choice of vim or Emacs key layouts.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
