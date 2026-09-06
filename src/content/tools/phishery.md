---
name: "phishery"
tagline: "Basic Auth Credential Harvester with Word Doc Template Injector"
categories: ["uncategorized"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://www.kali.org/tools/phishery/"
downloadUrl: "https://github.com/ryhanson/phishery"
repoUrl: "https://gitlab.com/kalilinux/packages/phishery"
commonlyOn: ["Kali Linux"]
gettingStarted: "Install on Kali Linux with `sudo apt install phishery`. See the official Kali tool page and upstream homepage linked above for full usage and configuration details."
---

This package contains a Simple SSL Enabled HTTP server with the primary purpose of phishing credentials via Basic Authentication. The power of phishery is best demonstrated by setting a Word document’s template to a phishery URL. This causes Microsoft Word to make a request to the URL, resulting in an Authentication Dialog being shown to the end-user. The ability to inject any .docx file with a URL is possible using phishery’s -i [in docx], -o [out docx], and -u [url] options.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
