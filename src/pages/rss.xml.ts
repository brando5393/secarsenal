import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

// Scoped to the OS collection only, not tools: tools are bulk-synced
// monthly from upstream sources (thousands at a time), so a feed entry
// per tool would be noise, not signal. OS entries are the actually
// editorial, human-curated stream worth following.
//
// pubDate uses each entry's `lastVerified` field — this is a "last
// reviewed/updated" feed, not a strict "date added" one, since the
// content schema doesn't track a separate added-on date and deriving
// one from git history would be fragile against a shallow clone in CI/
// Amplify's build environment.
export async function GET(context: APIContext) {
  const entries = await getCollection('os');
  const sorted = [...entries].sort((a, b) => b.data.lastVerified.valueOf() - a.data.lastVerified.valueOf());

  return rss({
    title: 'SecArsenal — Operating Systems',
    description: 'Updates to the operating-system catalog on SecArsenal, a pentesting OS/tool reference site.',
    site: context.site!,
    items: sorted.map((entry) => ({
      title: entry.data.name,
      description: entry.data.tagline,
      pubDate: entry.data.lastVerified,
      link: `/os/${entry.id}/`,
      categories: [entry.data.category],
    })),
    customData: `<language>en-us</language>`,
  });
}
