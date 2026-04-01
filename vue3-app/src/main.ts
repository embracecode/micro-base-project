import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import { createPinia } from 'pinia'
import { MAINDATA_KEY } from './constant'
const pinia = createPinia()

// 扩展Window类型
declare global {
  interface Window {
    __POWERED_BY_QIANKUN__?: boolean
    bootstrap?: (props: any) => Promise<void>
    mount?: (props: any) => Promise<void>
    unmount?: (props: any) => Promise<void>
  }
}


let app: any = null
function render(props: any) {
  app = createApp(App)
  app.use(router)
  app.use(pinia)
  app.mount(props.container ? props.container.querySelector('#vue3') : '#vue3')
  app.provide(MAINDATA_KEY, props)
}
function mount(props: any) {
  render(props)
}

// qiankun生命周期钩子
function bootstrap() {
}
function unmount(props: any) {
  console.log('Vue3子应用卸载', props)
  if (app) {
    app.unmount()
    app = null
  }
}

function update(props: any) {
  console.log('Vue3子应用更新', props)
}

// 支持qiankun和独立运行
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  // 独立运行
  render({})
} else {
  // qiankun环境下，使用renderWithQiankun包装生命周期钩子
  renderWithQiankun({
    bootstrap,
    mount,
    unmount,
    update
  })
}