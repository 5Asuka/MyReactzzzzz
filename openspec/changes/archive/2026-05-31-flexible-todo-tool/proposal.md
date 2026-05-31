## Why

这是一个尝试性项目，目的是使用 TypeScript + React 框架创建快速、轻量的小工具。当前设想的第一个工具是一个**网页端灵活代办工具**，通过 Vite 开发服务器运行，浏览器打开即可使用。数据以 JSON 文件形式存储在本地（总数据量不超过 1000 字符），刷新不丢失，但可随时删除文件重置。强调"即开即用、轻量便捷"的体验。

## What Changes

- 新建一个 Vite + React + TypeScript 前端项目
- 提供简单的 Node.js 后端（Express），用于读写本地 JSON 文件实现持久化
- 实现代办事项的增、改、标记完成、删除等核心功能（不包含筛选/搜索）
- 数据总量不超过 1000 字符，存储在本地 `data/todos.json` 文件中
- 界面采用现代化、简约风格

## Capabilities

### New Capabilities
- `todo-core`: 核心代办功能，包括添加待办、标记完成/未完成、编辑内容、删除待办、列表展示
- `local-file-storage`: 本地 JSON 文件持久化存储，数据通过简单 HTTP API 读写

### Modified Capabilities
- (无现有规范需要修改)

## Impact

- 新建项目目录，使用 Vite + React + TypeScript 作为前端构建
- 引入 Express 作为极简后端，提供 2 个 API 端点：获取/保存代办数据
- 项目根目录新增文件和配置：
  - `package.json`, `tsconfig.json`, `vite.config.ts`
  - `server/index.ts` — 后端服务（读写 JSON 文件）
  - `src/` — React 前端源码
  - `data/todos.json` — 本地持久化文件（自动创建）
