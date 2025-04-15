import { cloudflare } from '@cloudflare/vite-plugin'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [cloudflare(), react(), tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    minify: true,
    sourcemap: true
  }
})
