import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Shared source-tracking fields used by the freshness-check workflow:
// lastVerified + the URLs below let the scheduled Action detect stale
// or dead-linked entries without a live scraper/backend.
const sourceTracking = {
  lastVerified: z.coerce.date(),
  docsUrl: z.string().url(),
  downloadUrl: z.string().url().optional(),
  repoUrl: z.string().url().optional(),
};

const os = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/os' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    category: z.enum([
      'general-purpose',
      'wireless',
      'forensics',
      'specialized',
    ]),
    basedOn: z.string(),
    gettingStarted: z.string(),
    notableTools: z.array(z.string()).default([]),
    ...sourceTracking,
  }),
});

const tools = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tools' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    categories: z.array(
      z.enum([
        'recon',
        'exploitation',
        'post-exploitation',
        'password-attacks',
        'wireless',
        'forensics',
        'osint',
        'web-app',
        'reverse-engineering',
        'network-analysis',
        'vulnerability-scanning',
        'sniffing-spoofing',
        'social-engineering',
      ])
    ),
    platforms: z.array(z.string()),
    license: z.string(),
    gettingStarted: z.string(),
    commonlyOn: z.array(z.string()).default([]),
    ...sourceTracking,
  }),
});

export const collections = { os, tools };
