import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import qiankun from 'vite-plugin-qiankun'

const useDevMode = true // 开发模式，启用 HMR 热更新

const env = process.env.NODE_ENV || 'development'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // 注意：当 useDevMode = true 时，HMR 热更新会失效，但可以正常作为子应用加载
    // 当 useDevMode = false 时，HMR 生效，但无法被 qiankun 加载
    ...(useDevMode ? [] : [react()]),
    qiankun('react-app', {  // ⚠️ 名称必须与基座 registerMicroApps 中的 name 完全一致
      useDevMode,
    }),
    // react(),
    // qiankun('react-app', {  // ⚠️ 名称必须与基座 registerMicroApps 中的 name 完全一致
    //   useDevMode: true,
    // }),
  ],
  server: {
    port: 3003,
    open: env === 'development' ? '/react/' : false, // 仅在开发模式下自动打开浏览器并导航到子应用路径
    cors: true
  },
  preview: {
    port: 4174,
    cors: true
  },
  base: process.env.NODE_ENV === 'production' 
    ? '/react/'  // 生产环境部署路径
    : '/',
})
