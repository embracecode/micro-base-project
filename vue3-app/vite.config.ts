import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  console.log('当前模式:', mode)
  const isProduction = mode === 'production'
  return {
    plugins: [
      vue(),
      qiankun('vue3-app', {
        useDevMode: true
      })
    ],
    server: {
      port: 3001,
      cors: true
    },
    preview: {
      port: 4173,
      cors: true
    },
    base: isProduction
      ? '/vue3/'  // 生产环境部署路径
      : '/',
    }
})
