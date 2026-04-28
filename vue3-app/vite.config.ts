import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  console.log('当前模式:', mode)
  const isProduction = mode === 'production'
  return {
    plugins: [
      vue(),
      qiankun('vue3-app', {
        useDevMode: true
      }),
      Components({
        // 配置 Element Plus 解析器，它会自动处理组件的按需导入和样式
        resolvers: [ElementPlusResolver()],
      }),
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
