import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { initGlobalState, registerMicroApps, start } from 'qiankun'
import router from './router/index'
import { createPinia } from 'pinia'
import { baseState, setBaseState } from './globleState/index'

const pinia = createPinia()
// 扩展Window接口
declare global {
  interface Window {
    globalState?: {
      user: {
        name: string
        role: string
      }
      theme: string
      setUser: (user: any) => void
      setTheme: (theme: string) => void
      notifySubApps: (event: string, data: any) => void
    }
  }
}



// 全局状态管理
// const globalState = {
//   user: {
//     name: '张三',
//     role: 'admin'
//   },
//   theme: 'light',
//   setUser(user: any) {
//     this.user = user
//     // 通知所有子应用状态变化
//     this.notifySubApps('userChange', user)
//   },
//   setTheme(theme: string) {
//     this.theme = theme
//     // 通知所有子应用状态变化
//     this.notifySubApps('themeChange', theme)
//   },
//   notifySubApps(event: string, data: any) {
//     // 这里可以实现更复杂的通讯机制，比如使用事件总线
//     console.log('通知子应用:', event, data)
//   }
// }

const globalState = initGlobalState({
  test: '全局状态示例',
  name: '张三',
})

// 2. 基座应用可以监听状态变化
globalState.onGlobalStateChange((state, prev) => {
  console.log('基座监听到全局状态变化', state, prev);
}, true); // true 表示首次立即执行
const VUE3_APP_ENTRY = import.meta.env.DEV ? '//localhost:3001' : '//localhost:4173'
const REACT_APP_ENTRY = import.meta.env.DEV ? '//localhost:3003' : '//localhost:4174'
console.log('主应用环境变量:', {
  VUE3_APP_ENTRY,
  REACT_APP_ENTRY
}, import.meta.env.DEV)
const microApps = [
  {
    name: 'vue3-app',
    entry: VUE3_APP_ENTRY,
    container: '#micro-app',
    activeRule: '/vue3',
    props: {
      baseState,
      onCusetomStateChange(state: any) {
        console.log('vue-app在主应用的监听函数:', state)
        setBaseState(state)
      },
    }
  },
  {
    name: 'react-app',
    entry: REACT_APP_ENTRY,
    container: '#micro-app',
    activeRule: '/react',
    props: {
      baseState,
      onCusetomStateChange(state: any, prev: any) {
        console.log('主应用监听到全局状态变化:', state, prev)
      },
    }
  }
]

registerMicroApps(microApps)

start({
  sandbox: {
    experimentalStyleIsolation: true
  }
})


const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')


