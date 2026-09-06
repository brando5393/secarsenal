---
name: "Logstash"
tagline: "By default, Logstash uses in-memory bounded queues between pipeline stages (inputs → pipeline workers) to buffer events."
categories: ["network-security-monitoring"]
platforms: ["Linux"]
lastVerified: 2026-09-06
docsUrl: "https://docs.securityonion.net/en/2.4/logstash.html#logstash"
downloadUrl: "https://www.elastic.co/guide/en/logstash/current/persistent-queues.html"
commonlyOn: ["Security Onion"]
gettingStarted: "Bundled with Security Onion. See Security Onion's official tool documentation and upstream website linked above for details."
---

By default, Logstash uses in-memory bounded queues between pipeline stages (inputs → pipeline workers) to buffer events. The size of these in-memory queues is fixed and not configurable.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
