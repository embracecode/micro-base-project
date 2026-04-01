import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000
  },
  preview: {
    port: 4175,
    proxy: {
      '/vue3': {
        target: 'http://localhost:4173',
        changeOrigin: true,
        // rewrite: (path: string) => path.replace(/^\/vue3/, '')
      },
      '/react': {
        target: 'http://localhost:4174',
        changeOrigin: true,
        // rewrite: (path: string) => path.replace(/^\/react/, '')
      }
    }
  },

})
