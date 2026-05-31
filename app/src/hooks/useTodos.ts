/**
 * 自定义 Hooks —— 封装业务逻辑，让组件更简洁
 *
 * 【为什么需要自定义 Hook？】
 *
 * 如果每个组件都直接调用 useTodoContext() + dispatch({type:...})，
 * 代码会非常冗长。我们把"添加/编辑/删除"等操作封装成函数，
 * 组件只需调用 addTodo('标题') 即可。
 *
 * 【useCallback 的作用】—— 性能优化
 *
 * 每次组件重新渲染时，函数会重新创建（新的引用）。
 * 如果把函数传给子组件，子组件会因为 props 变化而跟着重新渲染。
 * useCallback(fn, [deps]) 会缓存函数引用，只有 deps 变化时才重新创建。
 *
 * 对于本项目规模，不用 useCallback 也不会有性能问题，
 * 这里是为了演示 React 的最佳实践。
 */

import { useCallback } from 'react'
import { useTodoContext } from '@/context/TodoContext'

/** 获取代办列表（只读） */
export function useTodos() {
  const { todos } = useTodoContext()
  return todos
}

/** 获取操作函数（增删改） */
export function useDispatch() {
  const { dispatch } = useTodoContext()

  /**
   * 添加代办
   *
   * useCallback 第二个参数 [dispatch] 是依赖数组：
   *   - dispatch 在组件生命周期内是稳定的（不会变）
   *   - 所以 addTodo 函数引用也始终不变
   */
  const addTodo = useCallback(
    (title: string, description?: string) => {
      const trimmed = title.trim()
      if (!trimmed) return // 空标题不添加
      dispatch({ type: 'ADD', payload: { title: trimmed, description: description?.trim() } })
    },
    [dispatch]
  )

  /** 切换完成/未完成 */
  const toggleTodo = useCallback(
    (id: string) => dispatch({ type: 'TOGGLE', payload: { id } }),
    [dispatch]
  )

  /** 编辑代办内容 */
  const editTodo = useCallback(
    (id: string, title: string, description: string) => {
      const trimmed = title.trim()
      if (!trimmed) return
      dispatch({ type: 'EDIT', payload: { id, title: trimmed, description: description.trim() } })
    },
    [dispatch]
  )

  /** 删除代办 */
  const deleteTodo = useCallback(
    (id: string) => dispatch({ type: 'DELETE', payload: { id } }),
    [dispatch]
  )

  return { addTodo, toggleTodo, editTodo, deleteTodo }
}
