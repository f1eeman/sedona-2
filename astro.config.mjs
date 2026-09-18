import { defineConfig, fontProviders } from 'astro/config'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://example.invalid',
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'kk', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'ru',
        locales: { ru: 'ru-RU', kk: 'kk-KZ', en: 'en-US' },
      },
    }),
  ],
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'PT Sans',
      cssVariable: '--font-pt-sans',
      fallbacks: ['Arial', 'sans-serif'],
      options: {
        variants: [
          {
            weight: 400,
            style: 'normal',
            src: [
              './src/assets/fonts/ptsans.woff2',
              './src/assets/fonts/ptsans.woff',
            ],
          },
          {
            weight: 700,
            style: 'normal',
            src: [
              './src/assets/fonts/ptsansbold.woff2',
              './src/assets/fonts/ptsansbold.woff',
            ],
          },
        ],
      },
    },
  ],
})
