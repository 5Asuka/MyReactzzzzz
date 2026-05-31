/**
 * React 应用入口文件
 *
 * 这是整个前端应用的起点，Vite 会以这个文件为入口打包。
 *
 * 核心概念：
 *   1. createRoot() —— React 18 的新 API，创建"渲染根"
 *      旧 API 是 ReactDOM.render()，已废弃
 *
 *   2. <StrictMode> —— 开发模式下的检查工具
 *      会故意让组件渲染两次来帮助发现副作用问题
 *      只在开发环境生效，生产构建时自动移除
 *
 *   3. <TodoProvider> —— 我们自定义的 Context Provider
 *      包裹在最外层，让所有子组件都能访问代办数据
 *      这就是"状态提升到顶层"的模式
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TodoProvider } from '@/context/TodoContext'
import App from './App'
import './styles/global.css'

// document.getElementById('root') 对应 index.html 中的 <div id="root">
// 末尾的 ! 是 TypeScript 的"非空断言"，告诉编译器这个元素一定存在
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TodoProvider>
      <App />
    </TodoProvider>
  </StrictMode>,
)
