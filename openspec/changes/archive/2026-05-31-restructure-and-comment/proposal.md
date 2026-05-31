## Why

项目根目录目前混合了应用代码（package.json、vite.config.ts、src/、server/、data/）和工具配置（openspec/、.codebuddy/），层次混乱不便浏览。此外，代码缺少注释，用户作为 React 学习者难以理解框架核心概念和数据流。

## What Changes

- **BREAKING** 将所有应用代码移入 `app/` 子目录，根目录仅保留 `openspec/`、`.codebuddy/`、`app/`、`README.md`
- 为所有 React 源码文件添加中文注释，解释框架核心概念（组件、Props、State、Context、Hooks、Effect 等）
- 为后端代码添加注释，解释 Express 路由、中间件、文件操作逻辑

## Capabilities

### New Capabilities
- `code-comments`: 代码注释规范，为所有源码文件添加面向 React 学习者的中文教学注释

### Modified Capabilities
- `local-file-storage`: 目录结构从根目录迁移至 `app/` 子目录，API 路径和文件引用需相应调整

## Impact

- 项目根目录结构大幅简化：`app/`、`openspec/`、`.codebuddy/`、`README.md`
- `app/` 内部包含完整的 Node 项目（package.json、vite.config.ts、src/、server/、data/）
- 所有 `.ts/.tsx` 文件新增中文注释
- 启动命令不变（在 `app/` 目录下执行 `npm run dev`）
