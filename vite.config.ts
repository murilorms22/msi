import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ViteImageOptimizer({
      png: {
        quality: 95,
      },
      jpeg: {
        quality: 90,
      },
      jpg: {
        quality: 90,
      },
      webp: {
        lossless: false,
        quality: 90,
      },
      includePublic: true,
      logStats: true,
    }),
  ],
})
