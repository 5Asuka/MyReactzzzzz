/**
 * TodoItem 组件 —— 单条代办事项的展示与交互
 *
 * 这个组件演示了 React 中最常见的交互模式：
 *
 * 【Props】—— 父组件向子组件传递数据
 *
 *   interface Props { todo: Todo }
 *   function TodoItem({ todo }: Props) { ... }
 *
 *   Props 是只读的，子组件不能修改父组件传来的数据。
 *   如果需要修改，子组件通过回调函数通知父组件。
 *   这叫"数据向下流动，事件向上冒泡"的单向数据流。
 *
 * 【useRef】—— 获取 DOM 元素的引用
 *
 *   const inputRef = useRef<HTMLInputElement>(null)
 *   <input ref={inputRef} />
 *   inputRef.current?.focus()  // 聚焦输入框
 *
 *   useRef 返回的对象在组件生命周期内保持不变，
 *   修改 .current 不会触发重新渲染（与 useState 的区别）。
 *
 * 【useEffect】—— 处理"副作用"
 *
 *   useEffect(() => { ... }, [editing])
 *   当 editing 变为 true 时，自动聚焦编辑输入框。
 *   这是一种"响应状态变化执行操作"的模式。
 */
import { useState, useRef, useEffect, type KeyboardEvent } from 'react'
import type { Todo } from '@/types/todo'
import { useDispatch } from '@/hooks/useTodos'
import ConfirmDialog from './ConfirmDialog'

/** Props 接口：定义组件接收的参数 */
interface Props {
  /** 要展示的代办事项数据 */
  todo: Todo
}

export default function TodoItem({ todo }: Props) {
  // 编辑模式相关状态
  const [editing, setEditing] = useState(false)    // 是否处于编辑模式
  const [editTitle, setEditTitle] = useState(todo.title)    // 编辑中的标题
  const [editDesc, setEditDesc] = useState(todo.description) // 编辑中的描述
  const [showConfirm, setShowConfirm] = useState(false)      // 是否显示删除确认框

  // useRef：获取编辑输入框的 DOM 引用，用于自动聚焦
  const inputRef = useRef<HTMLInputElement>(null)

  // 从自定义 Hook 获取操作函数
  const { toggleTodo, editTodo, deleteTodo } = useDispatch()

  /**
   * 副作用：进入编辑模式时自动聚焦输入框
   *
   * 依赖数组 [editing] 表示只在 editing 变化时执行。
   * 当用户点击编辑按钮 → setEditing(true) → 组件重新渲染
   * → useEffect 检测到 editing 变化 → 执行 focus()
   */
  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  /** 进入编辑模式，用当前 todo 的值初始化编辑框 */
  function startEdit() {
    setEditTitle(todo.title)
    setEditDesc(todo.description)
    setEditing(true)
  }

  /** 取消编辑 */
  function cancelEdit() {
    setEditing(false)
  }

  /** 保存编辑 */
  function saveEdit() {
    const trimmed = editTitle.trim()
    if (!trimmed) return // 标题为空则不保存
    editTodo(todo.id, trimmed, editDesc)
    setEditing(false)
  }

  /** 键盘快捷键：Enter 保存，Escape 取消 */
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      saveEdit()
    }
    if (e.key === 'Escape') {
      cancelEdit()
    }
  }

  /** 点击删除按钮 → 显示确认框 */
  function handleDelete() {
    setShowConfirm(true)
  }

  /** 确认删除 */
  function confirmDelete() {
    deleteTodo(todo.id)
    setShowConfirm(false)
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {/* 自定义复选框 */}
      <label className="todo-checkbox">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        <span className="checkmark" />
      </label>

      {/* 条件渲染：编辑模式 vs 展示模式 */}
      {editing ? (
        <div className="todo-edit-area">
          {/* ref={inputRef} 将 DOM 引用保存到 inputRef.current */}
          <input
            ref={inputRef}
            className="edit-title-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={saveEdit}
          />
          <textarea
            className="edit-desc-input"
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
          />
          <div className="edit-actions">
            <button className="save-btn" onClick={saveEdit}>保存</button>
            <button className="cancel-btn" onClick={cancelEdit}>取消</button>
          </div>
        </div>
      ) : (
        /* onDoubleClick：双击进入编辑模式 */
        <div className="todo-content" onDoubleClick={startEdit}>
          <span className="todo-title">{todo.title}</span>
          {/* 条件渲染：有描述时才显示 */}
          {todo.description && <p className="todo-desc">{todo.description}</p>}
          <span className="todo-time">
            {new Date(todo.createdAt).toLocaleString('zh-CN')}
          </span>
        </div>
      )}

      {/* 操作按钮：鼠标悬停时显示 */}
      <div className="todo-actions">
        <button className="icon-btn edit-btn" onClick={startEdit} title="编辑">✏️</button>
        <button className="icon-btn delete-btn" onClick={handleDelete} title="删除">🗑️</button>
      </div>

      {/* 删除确认弹窗 */}
      {showConfirm && (
        <ConfirmDialog
          message="确定要删除这条代办吗？"
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  )
}
