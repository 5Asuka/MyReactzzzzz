## 1. 项目文件迁移至 app/ 子目录

- [x] 1.1 创建 `app/` 子目录
- [x] 1.2 移动所有应用文件到 `app/`：package.json、tsconfig.json、tsconfig.server.json、vite.config.ts、vite-env.d.ts、index.html、src/、server/、data/
- [x] 1.3 在 `app/` 下执行 `npm install` 重新安装依赖
- [x] 1.4 更新 `app/vite.config.ts` 中 @/ 别名路径（__dirname 已在 app/ 下，无需改）
- [x] 1.5 清理根目录：删除旧 node_modules/ 和已迁移的文件
- [x] 1.6 验证 `cd app && npm run dev` 正常运行

## 2. React 前端代码添加中文注释

- [x] 2.1 为 `src/types/todo.ts` 添加类型定义注释
- [x] 2.2 为 `src/api/todos.ts` 添加 API 调用注释
- [x] 2.3 为 `src/context/TodoContext.tsx` 添加 Context + useReducer + 自动同步注释
- [x] 2.4 为 `src/hooks/useTodos.ts` 添加自定义 Hooks 注释
- [x] 2.5 为 `src/main.tsx` 添加 React 入口注释
- [x] 2.6 为 `src/App.tsx` 添加根组件注释
- [x] 2.7 为 `src/components/TodoInput.tsx` 添加表单组件 + useState 注释
- [x] 2.8 为 `src/components/TodoList.tsx` 添加列表组件 + useMemo 注释
- [x] 2.9 为 `src/components/TodoItem.tsx` 添加交互组件 + useRef/useEffect/编辑模式注释
- [x] 2.10 为 `src/components/ConfirmDialog.tsx` 添加 Props 接口与事件注释

## 3. 后端代码添加中文注释

- [x] 3.1 为 `server/index.ts` 添加 Express 路由、中间件、文件 I/O 注释
