import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',         // auto updates SW in the background
      devOptions: { enabled: false },     // SW off during `npm run dev`

      manifest: {
        name: 'Pitstop',
        short_name: 'Pitstop',
        description: 'React E‑Commerce PWA',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0d6efd',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
          // optional but recommended for Android’s install UI
          { src: '/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },

      // Defaults are fine for the module; we can add runtime caching later
      workbox: {},
    }),
  ],
});