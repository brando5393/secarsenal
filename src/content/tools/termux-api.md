---
name: "Termux:API"
tagline: "Add-on app which exposes device functionality as API to command line programs."
categories: ["development","system"]
platforms: ["Android"]
lastVerified: 2026-09-07
docsUrl: "https://termux.com/"
commonlyOn: []
gettingStarted: "Install from the Kali NetHunter App Store (store.nethunter.com) or NetHunter's own app repository on an Android device."
license: "GPL-3.0-only"
---

Expose basic Android functionality like sending SMS or accessing GPS data to the
https://f-droid.org/packages/com.termux app. This is an add-on which requires that the main Termux app is
installed to use.

* Read and send sms messages from your terminal.
* Access device GPS location sensor from scripts.
* Pipe the result of commands into the device text-to-speech engine.
* Vibrate the device when something interesting happens.
* Access the system clipboard from shell scripts.
* List contacts from the system contact list.

Besides installing this app an additional package is required to install inside
Termux:

$ apt install termux-api

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
