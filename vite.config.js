import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  build: {
    // Raise the warning threshold — we're intentionally code-splitting
    chunkSizeWarningLimit: 600,

    // Minify with esbuild (default, fastest)
    minify: 'esbuild',

    // Inline tiny assets as base64 to save round-trips (default 4KB, raise slightly)
    assetsInlineLimit: 8192,

    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (!id.includes('node_modules')) return

          // React core — tiny, loaded first, cache long-term
          if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/scheduler/')) {
            return 'vendor-react'
          }

          // Framer Motion is large (~100 KB gz) — split so it loads in parallel
          // and can be cached independently of your app code
          if (id.includes('framer-motion')) {
            return 'vendor-motion'
          }

          // Everything else from node_modules
          return 'vendor-misc'
        },
      },
    },
  },

  // Improve dev-server cold start — pre-bundle heavy deps
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  },
})
