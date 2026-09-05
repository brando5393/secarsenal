---
name: "Elasticsearch"
tagline: "An index template is a way to tell Elasticsearch how to configure an index when it is created."
categories: ["network-security-monitoring"]
platforms: ["Linux"]
lastVerified: 2026-09-05
docsUrl: "https://docs.securityonion.net/en/2.4/elasticsearch.html#elasticsearch"
downloadUrl: "https://www.elastic.co/guide/en/elasticsearch/reference/current/index-templates.html"
commonlyOn: ["Security Onion"]
gettingStarted: "Bundled with Security Onion. See Security Onion's official tool documentation and upstream website linked above for details."
---

An index template is a way to tell Elasticsearch how to configure an index when it is created. Templates are configured prior to index creation. When an index is created - either manually or through indexing a document - the template settings are used as a basis for creating the index. Index templates can contain a collection of component templates, as well as directly specify settings, mappings, and aliases.

Only use this tool against systems you own or are explicitly authorized to test — see the [disclaimer](/disclaimer).
