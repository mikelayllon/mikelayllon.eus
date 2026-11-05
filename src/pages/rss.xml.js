import rss from '@astrojs/rss';
import { getPosts, excerpt } from '../lib/content';

export async function GET(context) {
  const posts = await getPosts();
  return rss({
    title: 'Koadernoa · Mikel Ayllon',
    description: 'Mikel Ayllonen koadernoa',
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.izenburua,
      pubDate: p.data.data,
      description: p.data.sarrera || excerpt(p.body, 300),
      link: `/koadernoa/${p.id}/`,
      categories: p.data.etiketak,
    })),
    customData: '<language>eu</language>',
  });
}
