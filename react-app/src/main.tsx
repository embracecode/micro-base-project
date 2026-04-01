import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import { GlobalContext } from './context/index'

// 扩展Window类型
declare global {
  interface Window {
    __POWERED_BY_QIANKUN__?: boolean
    bootstrap?: (props: any) => Promise<void>
    mount?: (props: any) => Promise<void>
    unmount?: (props: any) => Promise<void>
  }
}

let root: any = null


function render(props: any) {
  const { setGlobalState } = props
  const container = props.container ? props.container.querySelector('#root') : document.getElementById('root')
  root = createRoot(container!)
  root.render(
    <StrictMode>
      <GlobalContext.Provider value={props}>
        <App />
      </GlobalContext.Provider>
    </StrictMode>
  )
  setGlobalState && setGlobalState({
    text: '来自 React 18 子应用的全局状态',
    name: 'React 18 子应用'
  })
}
// qiankun生命周期钩子
function bootstrap() {

}

function mount(props: any) {
  console.log('React 18子应用挂载', props)
  render(props)
}

function unmount(props: any) {
  console.log('React 18子应用卸载', props)
  if (root) {
    root.unmount()
    root = null
  }
}

function update(props: any) {
  console.log('React 18子应用更新', props)
}



// 支持qiankun和独立运行
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  // 独立运行
  render({})
} else {
  renderWithQiankun({
    bootstrap,
    mount,
    unmount,
    update
  })
}
