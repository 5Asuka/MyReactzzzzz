---
name: openspec-initialize
overview: 在当前项目 e:\Project\MyReactzzzzz 下初始化 OpenSpec 工具，并建立对应的 .codebuddy 目录结构。
todos:
  - id: install-openspec-cli
    content: 全局安装 OpenSpec CLI：执行 npm install -g @fission-ai/openspec@latest
    status: completed
  - id: verify-openspec-installation
    content: 验证安装：执行 openspec --version 确认版本号
    status: completed
    dependencies:
      - install-openspec-cli
  - id: initialize-openspec-project
    content: 初始化 OpenSpec 并集成 CodeBuddy：执行 openspec init --tools codebuddy
    status: completed
    dependencies:
      - verify-openspec-installation
  - id: verify-generated-structure
    content: 验证生成的目录结构：确认 openspec/ 和 .codebuddy/ 目录已正确创建
    status: completed
    dependencies:
      - initialize-openspec-project
---

## 产品概述

在当前项目目录 (e:/Project/MyReactzzzzz) 中初始化 OpenSpec 工具，并建立对应的 .codebuddy 文件夹，为后续规范驱动的 AI 开发流程做准备。

## 核心功能

- 全局安装 OpenSpec CLI 工具
- 在项目根目录执行初始化命令，生成 OpenSpec 目录结构
- 生成 .codebuddy/ 文件夹，包含 OpenSpec 注入的 AI 技能和斜杠命令

## 技术栈

- **OpenSpec CLI**: @fission-ai/openspec（最新版）
- **运行时**: Node.js v25.6.1（已安装，满足 >= 20.19.0 要求）
- **包管理器**: npm（随 Node.js 自带）

## 实现方案

通过 npm 全局安装 OpenSpec CLI 工具，然后在项目根目录执行 `openspec init --tools codebuddy` 命令进行初始化。

### 具体步骤

1. **全局安装 OpenSpec**: 执行 `npm install -g @fission-ai/openspec@latest`，安装 OpenSpec 命令行工具
2. **验证安装**: 执行 `openspec --version` 确认安装成功
3. **初始化项目**: 执行 `openspec init --tools codebuddy`，该命令会通过交互式流程引导完成初始化，指定 --tools codebuddy 参数会将 OpenSpec 的技能注入到 .codebuddy 目录中

### 关键决策

- 使用全局安装而非本地安装，便于后续在其他项目中使用 OpenSpec 命令
- 使用 --tools codebuddy 参数确保 OpenSpec 与 CodeBuddy 深度集成，生成 .codebuddy/skills/ 和 .codebuddy/commands/ 目录

### 初始化后的目录结构

```
e:/Project/MyReactzzzzz/
├── README.md
├── openspec/
│   ├── specs/        # 系统规范目录
│   └── changes/      # 变更管理目录
└── .codebuddy/
    ├── skills/       # OpenSpec 注入的 AI 技能
    └── commands/     # OpenSpec 注入的斜杠命令
```