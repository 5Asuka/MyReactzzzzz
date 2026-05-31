/**
 * ConfirmDialog 组件 —— 确认弹窗
 *
 * 【Props 回调模式】
 *
 *   父组件通过 props 传递回调函数（onConfirm / onCancel），
 *   子组件在适当时机调用这些回调，通知父组件"用户做了什么"。
 *
 *   这就是 React 的"事件向上冒泡"模式：
 *     用户点击 → 子组件调用 onConfirm() → 父组件执行 confirmDelete()
 *
 * 【事件冒泡与阻止】
 *
 *   onClick={(e) => e.stopPropagation()}
 *
 *   点击弹窗内部区域时，stopPropagation() 阻止事件向上冒泡，
 *   这样点击弹窗内容不会触发外层 overlay 的 onCancel。
 *   这是事件委托模式中常见的技巧。
 */

/** Props 接口：定义组件需要的参数 */
interface Props {
  /** 弹窗显示的提示信息 */
  message: string
  /** 用户点击"确定"时的回调函数 */
  onConfirm: () => void
  /** 用户点击"取消"时的回调函数 */
  onCancel: () => void
}

export default function ConfirmDialog({ message, onConfirm, onCancel }: Props) {
  return (
    // 点击遮罩层关闭弹窗
    <div className="dialog-overlay" onClick={onCancel}>
      {/* stopPropagation 阻止点击事件冒泡到 overlay */}
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <p className="dialog-message">{message}</p>
        <div className="dialog-actions">
          <button className="dialog-cancel-btn" onClick={onCancel}>取消</button>
          <button className="dialog-confirm-btn" onClick={onConfirm}>确定</button>
        </div>
      </div>
    </div>
  )
}
