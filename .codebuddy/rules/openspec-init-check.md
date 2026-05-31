# OpenSpec & CodeBuddy 初始化检查规则

每次打开项目时，必须执行以下检查：

## 检查项

1. **openspec/ 目录**：确认项目根目录下存在 `openspec/` 目录，且包含 `specs/` 和 `changes/` 子目录。
2. **.codebuddy/ 目录**：确认项目根目录下存在 `.codebuddy/` 目录，且包含 `skills/` 和 `commands/` 子目录。
3. **OpenSpec 技能**：确认 `.codebuddy/skills/` 下存在以下 4 个技能：
   - `openspec-apply-change/SKILL.md`
   - `openspec-archive-change/SKILL.md`
   - `openspec-explore/SKILL.md`
   - `openspec-propose/SKILL.md`
4. **OpenSpec 命令**：确认 `.codebuddy/commands/opsx/` 下存在以下 4 个命令：
   - `apply.md`
   - `archive.md`
   - `explore.md`
   - `propose.md`

## 未初始化的处理方式

如果以上任一检查项缺失，需立即提示用户执行初始化：

```bash
cd 项目根目录
openspec init --tools codebuddy
```

初始化完成后，重新验证上述检查项是否全部通过。
