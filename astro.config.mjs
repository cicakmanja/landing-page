// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://nikahindong.site',

  // site: 'https://cicakmanja.github.io',
  // base: 'landing-page',
  vite: {
    plugins: [tailwindcss()]
  },

  server: {
    host: true
  },

  integrations: [react()]
});