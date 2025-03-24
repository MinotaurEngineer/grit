import preact from '@preact/preset-vite'
import { defineConfig } from 'vite'
import viteSSIPlugin from './scripts/vite-plugin-ssi'

// https://vite.dev/config/
export default defineConfig({
  base: '/grit/',
  server: {
    port: 3000
  },
  plugins: [viteSSIPlugin(), preact()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
    assetsDir: 'assets'
  }
})
