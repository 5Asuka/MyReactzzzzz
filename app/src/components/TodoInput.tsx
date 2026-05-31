/**
 * TodoInput 组件 —— 代办输入表单
 *
 * 【useState】—— React 最核心的 Hook
 *
 *   const [value, setValue] = useState(初始值)
 *
 *   - value: 当前状态值
 *   - setValue: 更新状态的函数（调用后组件自动重新渲染）
 *   - 初始值只在首次渲染时使用
 *
 * 每个状态都是独立的，改变 title 不会影响 description。
 * React 推荐"一个状态对应一个 useState"，而不是把所有状态
 * 放在一个大对象里（那是 class 组件时代的方式）。
 *
 * 【受控组件】
 *
 *   <input value={title} onChange={e => setTitle(e.target.value)} />
 *
 *   input 的值由 React 状态（title）控制，而不是 DOM 自己管理。
 *   这叫"受控组件"—— React 是"唯一数据源"。
 *   好处：可以实时验证、格式化输入、阻止非法输入。
 */
import { useState, type KeyboardEvent } from 'react'
import { useDispatch } from '@/hooks/useTodos'

export default function TodoInput() {
  // 四个独立的状态，分别管理表单的不同部分
  const [title, setTitle] = useState('')          // 标题输入
  const [description, setDescription] = useState('') // 描述输入
  const [showDescription, setShowDescription] = useState(false) // 是否展开描述区
  const [error, setError] = useState('')          // 校验错误信息

  // 从自定义 Hook 获取 addTodo 函数
  const { addTodo } = useDispatch()

  /** 提交新代办 */
  function handleSubmit() {
    const trimmed = title.trim()
    if (!trimmed) {
      setError('请输入代办标题') // 空标题时显示错误提示
      return
    }
    addTodo(trimmed, description) // 调用 dispatch 添加代办
    // 清空表单，重置状态
    setTitle('')
    setDescription('')
    setShowDescription(false)
    setError('')
  }

  /**
   * 键盘事件处理
   *
   * type KeyboardEvent 来自 React，不是原生 DOM 事件。
   * React 用"合成事件"（SyntheticEvent）封装了原生事件，
   * 保证跨浏览器行为一致。
   */
  function handleKeyDown(e: KeyboardEvent) {
    // Enter 键提交，Shift+Enter 换行（在 textarea 中有用）
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault() // 阻止默认的换行行为
      handleSubmit()
    }
  }

  return (
    <div className="todo-input">
      <div className="input-row">
        {/* 受控输入框：value 由 title 状态控制 */}
        <input
          type="text"
          className="title-input"
          placeholder="添加一个新的代办..."
          value={title}
          onChange={(e) => { setTitle(e.target.value); setError('') }}
          onKeyDown={handleKeyDown}
          autoFocus // 页面加载后自动聚焦到此输入框
        />
        <button className="add-btn" onClick={handleSubmit}>
          添加
        </button>
      </div>

      {/* 条件渲染：error 有值时才显示错误提示 */}
      {error && <p className="input-error">{error}</p>}

      {/* 切换描述区域的展开/收起 */}
      <button
        className="expand-desc-btn"
        onClick={() => setShowDescription(!showDescription)}
      >
        {showDescription ? '收起描述 ▲' : '添加描述 ▼'}
      </button>

      {/* 条件渲染：showDescription 为 true 时才显示描述输入框 */}
      {showDescription && (
        <textarea
          className="desc-input"
          placeholder="添加详细描述（可选）"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      )}
    </div>
  )
}
