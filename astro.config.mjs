// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL / SITE_BASE are set by the GitHub Pages workflow while the site lives on
// mikelayllon.github.io. On the final domain they stay empty.
const site = process.env.SITE_URL || 'https://mikelayllon.eus';
const base = process.env.SITE_BASE || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'eu',
        locales: { eu: 'eu', en: 'en' },
      },
    }),
  ],
});
