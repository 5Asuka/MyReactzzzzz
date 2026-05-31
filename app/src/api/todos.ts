/**
 * API 工具函数 —— 封装与后端的 HTTP 通信
 *
 * 这个文件把所有"发请求"的逻辑集中在一起，组件不需要关心
 * 请求地址、请求方法等细节，只需要调用 fetchTodos() 或 saveTodos()。
 *
 * 这种模式叫做"数据访问层"（Data Access Layer），好处是：
 *   - 修改 API 地址时只需改一处
 *   - 方便统一处理错误（如网络断开、服务器异常）
 *   - 组件代码更简洁，只关注 UI 逻辑
 */

import type { Todo } from '@/types/todo'

/** API 基础路径，Vite 开发服务器会将 /api 请求代理到后端 3001 端口 */
const API_BASE = '/api/todos'

/**
 * 从后端获取所有代办数据
 *
 * @returns Promise<Todo[]> - 异步返回代办数组
 *
 * React 中常用 async/await 配合 useEffect 来在组件加载时获取数据。
 * fetch() 是浏览器内置的 HTTP 请求 API，比 XMLHttpRequest 更简洁。
 */
export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(API_BASE)
  // res.ok 检查 HTTP 状态码是否在 200-299 范围内
  if (!res.ok) throw new Error('Failed to fetch todos')
  // res.json() 也是异步的，将响应体解析为 JSON 对象
  return res.json()
}

/**
 * 将代办数据保存到后端
 *
 * @param todos - 要保存的代办数组
 *
 * 这里使用 POST 方法将整个数组发送给后端，后端会写入本地 JSON 文件。
 * 这是"全量替换"策略——每次保存都把完整数据发过去，适合小数据量场景。
 */
export async function saveTodos(todos: Todo[]): Promise<void> {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todos),
  })
  if (!res.ok) {
    // 尝试从响应中提取服务器返回的错误信息
    const data = await res.json()
    throw new Error(data.error || 'Failed to save todos')
  }
}
