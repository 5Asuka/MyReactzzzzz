/**
 * TodoContext —— React 全局状态管理的核心
 *
 * ┌─────────────────────────────────────────────────────────────┐
 * │ React Context API 工作原理：                                │
 * │                                                             │
 * │   TodoProvider（顶层）                                      │
 * │   ┌─────────────────────────────────────────────────────┐   │
 * │   │  useReducer 管理 todos 状态                          │   │
 * │   │  dispatch 通过 Context 向下传递                      │   │
 * │   │                                                       │   │
 * │   │   ┌──────────┐  ┌──────────┐  ┌──────────┐         │   │
 * │   │   │ TodoInput │  │ TodoList │  │ TodoItem │  ...    │   │
 * │   │   │ 调用dispatch│  │ 读取todos │  │ 调用dispatch│      │   │
 * │   │   └──────────┘  └──────────┘  └──────────┘         │   │
 * │   └─────────────────────────────────────────────────────┘   │
 * └─────────────────────────────────────────────────────────────┘
 *
 * 三大核心概念：
 *   1. createContext   —— 创建一个"上下文"容器
 *   2. Provider        —— 在组件树顶层提供数据（value={...}）
 *   3. useContext       —— 在任意子组件中读取数据
 *
 * 配合 useReducer 使用时，dispatch 也通过 Context 传递，
 * 子组件只需 dispatch(action)，不关心状态如何更新。
 */

import { createContext, useReducer, useEffect, useRef, type ReactNode, useContext } from 'react'
import type { Todo, TodoAction } from '@/types/todo'
import { fetchTodos, saveTodos } from '@/api/todos'

/**
 * 生成唯一 ID：时间戳（36 进制）+ 随机字符串
 *
 * 36 进制比 10 进制更短，Date.now().toString(36) 约 8 个字符。
 * 对于本项目这已足够；生产环境通常用 UUID 库。
 */
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

/**
 * Reducer 函数 —— 纯函数，根据 action 类型返回新的状态
 *
 * 【关键原则】reducer 必须是"纯函数"：
 *   - 输入相同 → 输出一定相同（不能有随机数、Date.now 等）
 *   - 不能修改原 state，必须返回新对象（使用展开运算符 ... ）
 *
 * 这里 generateId() 和 new Date() 不纯，但在 ADD 场景下
 * 我们需要为新代办生成 id 和时间戳，这是可接受的折衷。
 */
function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'LOAD':
      // 直接用后端返回的数据替换整个数组
      return action.payload

    case 'ADD': {
      // 创建新代办对象
      const newTodo: Todo = {
        id: generateId(),
        title: action.payload.title,
        description: action.payload.description ?? '',
        completed: false,
        createdAt: new Date().toISOString(),
      }
      // 将新代办放在数组最前面（[newTodo, ...state]）
      return [newTodo, ...state]
    }

    case 'TOGGLE':
      // map() 返回新数组，不修改原数组；用展开运算符创建新对象
      return state.map((t) =>
        t.id === action.payload.id ? { ...t, completed: !t.completed } : t
      )

    case 'EDIT':
      return state.map((t) =>
        t.id === action.payload.id
          ? { ...t, title: action.payload.title, description: action.payload.description }
          : t
      )

    case 'DELETE':
      // filter() 返回新数组，只保留 id 不匹配的项
      return state.filter((t) => t.id !== action.payload.id)

    default:
      return state
  }
}

/** Context 的值类型：包含当前状态和 dispatch 函数 */
interface TodoContextValue {
  /** 当前所有代办事项 */
  todos: Todo[]
  /** dispatch 函数，用于触发状态变更 */
  dispatch: React.Dispatch<TodoAction>
}

/**
 * createContext<T | null>(null)
 *
 * 泛型参数 <TodoContextValue | null> 说明 Context 的值可能是
 * TodoContextValue 也可能是 null（初始值）。
 * 我们在 useTodoContext() 中处理了 null 的情况。
 */
const TodoContext = createContext<TodoContextValue | null>(null)

/**
 * Provider 组件 —— 包裹在组件树顶层，向下提供 todos 和 dispatch
 *
 * 【useReducer】是 useState 的替代方案，适合管理复杂状态：
 *   const [state, dispatch] = useReducer(reducer, initialState)
 *   - reducer: 处理状态变更的纯函数
 *   - initialState: 初始状态（这里是空数组 []）
 *   - dispatch: 发送 action 来触发状态变更
 *
 * 【useEffect】是"副作用"Hook，用于处理组件渲染之外的操作：
 *   - 数据获取（fetch）
 *   - 订阅/取消订阅
 *   - 手动修改 DOM
 *   依赖数组 [] 表示只在组件挂载时执行一次
 *
 * 【useRef】创建一个"可变引用"，修改它不会触发重新渲染：
 *   - 常用于访问 DOM 元素（如 inputRef.current.focus()）
 *   - 也可以存储不需要触发渲染的变量（如 isInitialLoad）
 */
export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, dispatch] = useReducer(todoReducer, [])

  // 副作用 1：组件挂载时从后端加载代办数据
  useEffect(() => {
    fetchTodos()
      .then((data) => dispatch({ type: 'LOAD', payload: data }))
      .catch((err) => console.error('Failed to load todos:', err))
  }, []) // ← 空依赖数组 = 仅在挂载时执行一次

  // 副作用 2：每当 todos 变化时，自动保存到后端
  // 用 useRef 来跳过第一次渲染（加载数据导致的 dispatch 不需要再保存）
  const isInitialLoad = useRef(true)
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false
      return // 跳过首次渲染
    }
    saveTodos(todos).catch((err) => console.error('Failed to save todos:', err))
  }, [todos]) // ← 依赖 todos，todos 变化时重新执行

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  )
}

/**
 * 自定义 Hook：在组件中方便地访问 TodoContext
 *
 * 【useContext】读取 Context 的当前值。
 * 必须在 Provider 内部使用，否则 ctx 为 null → 抛出错误。
 * 这个错误提示能帮助开发者快速定位问题。
 */
export function useTodoContext(): TodoContextValue {
  const ctx = useContext(TodoContext)
  if (!ctx) throw new Error('useTodoContext must be used within TodoProvider')
  return ctx
}
