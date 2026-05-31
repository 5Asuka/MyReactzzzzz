## Context

当前项目根目录混合了应用代码和工具配置，结构混乱：
- `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `vite-env.d.ts`
- `src/`, `server/`, `data/`
- `openspec/`, `.codebuddy/`
- `node_modules/`, `README.md`

用户是 React 学习者，现有代码缺少注释，不利于理解框架概念。

## Goals / Non-Goals

**Goals:**
- 将所有应用代码移入 `app/` 子目录，根目录只保留 `app/`、`openspec/`、`.codebuddy/`、`README.md`
- 为每个 React 源码文件添加中文教学注释，覆盖：组件、Props、State、Hooks（useState/useEffect/useReducer/useCallback/useMemo/useRef/useContext）、Context API、事件处理
- 为后端代码添加中文注释，覆盖 Express 路由、中间件、文件 I/O

**Non-Goals:**
- 不改变任何功能逻辑
- 不引入新依赖
- 不改变 UI 样式

## Decisions

| 决策 | 选择 | 理由 | 替代方案 |
|------|------|------|----------|
| 子目录名称 | **app/** | 语义清晰，表示应用主体 | src/（容易和 src/ 内部混淆）、project/（不够具体） |
| 迁移策略 | **文件整体移动** | 移动所有应用文件到 app/，在 app/ 下重新 npm install | 软链接（不直观）、workspaces（过度设计） |
| 注释语言 | **中文** | 用户是中文使用者，学习更友好 | 英文（不符合用户需求） |
| 注释风格 | **JSDoc + 行内注释** | 既有类型文档又有逻辑解释，适合学习 | 纯行内注释（缺少类型说明） |

## Risks / Trade-offs

| 风险 | 缓解措施 |
|------|----------|
| 移动文件后 Vite/TypeScript 路径别名需重新配置 | 修改 tsconfig.json 和 vite.config.ts 中的 @/ 别名路径 |
| node_modules 需重新安装 | 在 app/ 下重新执行 npm install |
| 旧根目录残留文件 | 迁移后清理根目录，仅保留 app/、openspec/、.codebuddy/、README.md |

## Migration Plan

1. 在根目录创建 `app/` 子目录
2. 将所有应用文件（package.json、src/、server/、data/、vite.config.ts 等）移入 `app/`
3. 在 `app/` 下重新 `npm install`
4. 更新 vite.config.ts 和 tsconfig.json 中的路径配置
5. 为所有源码文件添加中文注释
6. 清理根目录旧文件
7. 验证 `npm run dev` 在 `app/` 下正常运行
