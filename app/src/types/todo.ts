/**
 * Todo 数据类型定义
 *
 * 在 TypeScript + React 项目中，我们用 interface 来定义数据模型的"形状"。
 * 这样做的好处是：
 *   1. 编辑器会自动提示字段名，减少拼写错误
 *   2. 类型不匹配时编译报错，提前发现问题
 *   3. 代码即文档，一眼看出数据长什么样
 */

/** 单条代办事项的数据模型 */
export interface Todo {
  /** 唯一标识符，由时间戳 + 随机字符串生成 */
  id: string
  /** 代办标题（必填） */
  title: string
  /** 代办详细描述（选填） */
  description: string
  /** 是否已完成 */
  completed: boolean
  /** 创建时间，ISO 8601 格式的字符串，如 "2026-05-31T08:00:00.000Z" */
  createdAt: string
}

/**
 * Action 类型定义 —— "联合类型"（Union Type）
 *
 * useReducer 的工作方式类似 Redux：
 *   - 用户操作 → dispatch(action) → reducer 处理 → 返回新状态
 *
 * 每个 action 是一个对象，必须有 type 字段来区分操作类型，
 * payload 字段携带该操作需要的数据。
 *
 * TypeScript 的"可辨识联合"（Discriminated Union）让我们在
 * switch(action.type) 的每个 case 里自动获得对应 payload 的类型提示。
 */
export type TodoAction =
  /** 添加新代办 */
  | { type: 'ADD'; payload: { title: string; description?: string } }
  /** 切换完成/未完成状态 */
  | { type: 'TOGGLE'; payload: { id: string } }
  /** 编辑代办内容 */
  | { type: 'EDIT'; payload: { id: string; title: string; description: string } }
  /** 删除代办 */
  | { type: 'DELETE'; payload: { id: string } }
  /** 从后端加载数据（初始化时使用） */
  | { type: 'LOAD'; payload: Todo[] }
