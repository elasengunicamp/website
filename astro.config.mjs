// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // TODO: update once domain is finalized (elasnaengenharia.fem.unicamp.br vs registro.br)
  site: 'https://elasnaengenharia.com.br',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap(), mdx(), react()]
});