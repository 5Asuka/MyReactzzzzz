/**
 * TodoList 组件 —— 代办列表展示
 *
 * 【useMemo】—— 缓存计算结果，避免不必要的重复计算
 *
 *   const result = useMemo(() => 计算函数, [依赖数组])
 *
 *   - 只有依赖数组中的值变化时，才会重新执行计算函数
 *   - 否则直接返回上次的缓存结果
 *
 * 本例中，排序是一个 O(n log n) 操作。如果 todos 没有变化，
 * 就不需要重新排序。useMemo 让我们只在 todos 变化时才重新计算。
 *
 * 对于小数据量，useMemo 的优化效果不明显，但这是 React
 * 性能优化的基础模式，值得养成习惯。
 *
 * 【条件渲染】
 *
 *   {condition ? <A /> : <B />}   —— 三元表达式，二选一
 *   {condition && <A />}          —— 逻辑与，条件为真才渲染
 *
 * 本组件根据 todos 是否为空，显示不同的 UI。
 */
import { useMemo } from 'react'
import { useTodos } from '@/hooks/useTodos'
import TodoItem from './TodoItem'

export default function TodoList() {
  const todos = useTodos()

  /**
   * 排序逻辑：
   *   1. 未完成的排前面，已完成的排后面
   *   2. 同一状态内，按创建时间从新到旧排列
   */
  const sorted = useMemo(() => {
    return [...todos].sort((a, b) => {
      // 先按完成状态分组
      if (a.completed !== b.completed) return a.completed ? 1 : -1
      // 再按创建时间倒序
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }, [todos]) // ← 只在 todos 变化时重新排序

  // 空状态：显示引导文案
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-icon">📝</p>
        <p className="empty-text">还没有代办，在上方添加一条吧！</p>
      </div>
    )
  }

  /**
   * 列表渲染：使用 map() 将数据数组转换为 JSX 元素数组
   *
   * 【key 属性】—— React 列表渲染的必需品
   *
   *   key 帮助 React 识别哪些元素发生了变化（添加/删除/重排）。
   *   必须在兄弟元素中唯一，通常用数据的 id。
   *   不要用数组索引（index）作为 key，否则删除中间元素时
   *   会导致渲染错误和性能问题。
   */
  return (
    <div className="todo-list">
      {sorted.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}
