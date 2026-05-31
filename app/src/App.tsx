/**
 * App 根组件 —— 整个应用的页面骨架
 *
 * React 组件本质上就是"返回 JSX 的函数"。
 * JSX 是 JavaScript 的语法扩展，看起来像 HTML 但有区别：
 *   - className 代替 class（因为 class 是 JS 保留字）
 *   - {} 中可以写任意 JavaScript 表达式
 *   - 组件名必须大写开头（小写会被当成 HTML 标签）
 *
 * 组件组合（Composition）：
 *   App 组件不直接实现功能，而是把 TodoInput 和 TodoList
 *   "组合"在一起。每个组件只负责自己的事情，这就是
 *   React 的"关注点分离"思想。
 */
import TodoInput from '@/components/TodoInput'
import TodoList from '@/components/TodoList'

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>📋 灵活代办</h1>
        <p className="app-hint">数据存储于本地文件，关闭后不丢失</p>
      </header>
      <main className="app-main">
        {/* 自关闭标签 <TodoInput /> —— 渲染 TodoInput 组件 */}
        <TodoInput />
        <TodoList />
      </main>
    </div>
  )
}
