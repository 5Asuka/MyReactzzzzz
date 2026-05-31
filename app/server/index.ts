/**
 * Express 后端服务 —— 极简 API，读写本地 JSON 文件
 *
 * 架构概览：
 *
 *   浏览器 (React)  ──GET /api/todos──▶  Express  ──读取──▶  data/todos.json
 *   浏览器 (React)  ──POST /api/todos──▶ Express  ──写入──▶  data/todos.json
 *
 * 只有 2 个 API 端点，不需要数据库，直接操作文件系统。
 * 适合数据量极小（< 1000 字符）的场景。
 *
 * 【ES Module 说明】
 *
 *   package.json 中 "type": "module" 使得 Node.js 支持 import/export 语法。
 *   但 ES Module 中没有 __dirname 全局变量，需要手动从 import.meta.url 获取。
 */

import express from 'express'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

// ─── 路径配置 ────────────────────────────────────────────
// ES Module 中获取 __dirname 的方式
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// 数据文件路径：server/index.ts 的上一级目录下的 data/todos.json
const DATA_DIR = join(__dirname, '..', 'data')
const DATA_FILE = join(DATA_DIR, 'todos.json')

// 数据量上限（字符数），防止 JSON 文件过大
const MAX_CHARS = 1000

// ─── 中间件 ──────────────────────────────────────────────
// express.json() 解析请求体中的 JSON 数据，类似 body-parser
// limit: '2kb' 限制请求体大小，防止恶意大请求
app.use(express.json({ limit: '2kb' }))

// ─── 工具函数 ────────────────────────────────────────────

/**
 * 确保数据目录和文件存在
 *
 * 首次启动时 data/ 目录可能不存在，需要自动创建。
 * { recursive: true } 允许创建多层嵌套目录（类似 mkdir -p）。
 */
function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true })
  }
  if (!existsSync(DATA_FILE)) {
    writeFileSync(DATA_FILE, '[]', 'utf-8')
  }
}

/**
 * 从 JSON 文件读取代办数据
 *
 * readFileSync 是同步读取，在小项目中足够使用。
 * 高并发场景应改用异步的 readFile + callback/Promise。
 */
function readTodos(): unknown {
  ensureDataDir()
  const raw = readFileSync(DATA_FILE, 'utf-8')
  return JSON.parse(raw)
}

/**
 * 将代办数据写入 JSON 文件
 *
 * 【原子写入策略】：
 *   1. 先校验数据大小（不超过 1000 字符）
 *   2. 写入临时文件 .tmp
 *   3. 写入正式文件
 *
 * 这样即使写入过程中程序崩溃，正式文件也不会是损坏状态。
 * 更严谨的做法是用 fs.rename() 原子性地替换文件。
 */
function writeTodos(data: unknown): void {
  ensureDataDir()
  const serialized = JSON.stringify(data, null, 2)
  // 校验数据大小
  if (serialized.length > MAX_CHARS) {
    throw new Error(`Data exceeds ${MAX_CHARS} character limit`)
  }
  // 原子写入：先写临时文件，再写正式文件
  const tmpFile = DATA_FILE + '.tmp'
  writeFileSync(tmpFile, serialized, 'utf-8')
  writeFileSync(DATA_FILE, serialized, 'utf-8')
}

// ─── API 路由 ────────────────────────────────────────────

/**
 * GET /api/todos —— 读取所有代办
 *
 * _req 前缀下划线表示这个参数不使用（TypeScript 不会报未使用警告）
 * res.json() 自动设置 Content-Type: application/json
 */
app.get('/api/todos', (_req, res) => {
  try {
    const todos = readTodos()
    res.json(todos)
  } catch (err) {
    console.error('Failed to read todos:', err)
    res.status(500).json({ error: 'Failed to read todos' })
  }
})

/**
 * POST /api/todos —— 保存所有代办
 *
 * req.body 由 express.json() 中间件解析后得到
 * 如果数据超过 1000 字符限制，返回 413 (Payload Too Large)
 */
app.post('/api/todos', (req, res) => {
  try {
    writeTodos(req.body)
    res.json({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    if (message.includes('character limit')) {
      res.status(413).json({ error: message })
    } else {
      console.error('Failed to save todos:', err)
      res.status(500).json({ error: 'Failed to save todos' })
    }
  }
})

// ─── 启动服务 ────────────────────────────────────────────
app.listen(PORT, () => {
  ensureDataDir() // 启动时确保数据目录存在
  console.log(`✅ Server running at http://localhost:${PORT}`)
})
