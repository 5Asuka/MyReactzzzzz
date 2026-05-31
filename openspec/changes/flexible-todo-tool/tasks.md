## 1. 项目初始化与环境搭建

- [x] 1.1 创建项目目录结构：初始化 package.json、tsconfig.json、vite.config.ts
- [x] 1.2 安装前端依赖：React 19、ReactDOM、TypeScript、Vite、@vitejs/plugin-react
- [x] 1.3 安装后端依赖：Express、TypeScript、tsx、concurrently
- [x] 1.4 配置 Vite：React 插件、proxy 代理后端 API (/api → localhost:3001)
- [x] 1.5 配置 TypeScript：严格模式、路径别名 (@/ → src/)
- [x] 1.6 配置 package.json scripts：dev（concurrently 同时启动前后端）、server、client

## 2. 后端服务 (JSON 文件持久化)

- [x] 2.1 创建 `server/index.ts`：Express 服务监听 3001 端口
- [x] 2.2 实现 GET /api/todos：读取 `data/todos.json` 返回 JSON
- [x] 2.3 实现 POST /api/todos：接收 JSON body，原子写入 `data/todos.json`
- [x] 2.4 创建 `data/` 目录和空 `data/todos.json`（自动初始化）
- [x] 2.5 添加数据校验：写入前检查 JSON 总字符数不超过 1000

## 3. 数据类型与状态管理

- [x] 3.1 定义 Todo 数据模型 (TypeScript interface)：id, title, description, completed, createdAt
- [x] 3.2 实现 API 工具函数：fetchTodos()、saveTodos()
- [x] 3.3 实现 TodoContext + todoReducer：覆盖增/改/删/切换完成
- [x] 3.4 实现 TodoProvider：启动时从 API 加载数据，变更时自动同步到后端
- [x] 3.5 实现自定义 hooks (useTodos, useTodoDispatch)

## 4. 代办核心 UI

- [x] 4.1 实现添加代办输入组件：标题输入框、可选描述展开区、"添加"按钮
- [x] 4.2 实现代办列表组件：展示所有代办，按创建时间倒序排列
- [x] 4.3 实现代办项组件：显示标题、描述、完成状态（strikethrough）、操作按钮
- [x] 4.4 实现完成/未完成切换：checkbox 点击切换状态并同步到后端
- [x] 4.5 实现删除功能：删除按钮 + 确认弹窗
- [x] 4.6 实现编辑功能：双击/点击编辑图标进入编辑模式，Escape 取消、Enter 保存
- [x] 4.7 实现空状态提示：无待办时显示引导文案

## 5. 样式与界面美化

- [x] 5.1 设计并实现全局 CSS 变量：颜色、间距、字体方案
- [x] 5.2 实现代办输入区样式：圆角输入框、聚焦动画
- [x] 5.3 实现代办列表项样式：卡片风格、悬浮效果、过渡动画
- [x] 5.4 实现深色模式支持（跟随系统偏好）
- [x] 5.5 实现响应式布局：窗口缩小时内容自适应
- [x] 5.6 添加键盘快捷键：Enter 快速添加
