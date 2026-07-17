# cursor-team-skills

Cursor **Skills + Rules** 唯一入口（clone 即可用，无需 `npm install`）。

仓库：https://github.com/yinxianmiao/cursor-team-skills

| 做什么 | 命令 |
|--------|------|
| 装全局 Skills | `npm run skills:install` → `~/.agents/skills/` |
| 同步 Rules | `npm run rules:sync -- --preset uni-app --target <业务仓>` |

Skill 管工作流；细则在本仓 `rules/`，业务仓只手写 `*.local.mdc`。

## 安装

前置：Node.js 18+、Git；第三方 Skill 需能访问 GitHub。

```bash
git clone https://github.com/yinxianmiao/cursor-team-skills.git
cd cursor-team-skills

npm run skills:install
# 国内可跳过可选 excalidraw：
# SKIP_OPTIONAL_SKILLS=1 npm run skills:install

npm run skills:verify   # 期望 8 项必选 [OK]
```

然后**完全退出并重启 Cursor**。

同步 Rules：

```bash
npm run rules:sync -- --preset uni-app --target /path/to/uni-app-project
npm run rules:sync -- --preset admin --target /path/to/admin-project
```

业务仓首次自备：`uni-app/project.local.mdc`（或后台等价 local）。

## 更新

```bash
cd cursor-team-skills
git pull
npm run skills:install
npm run skills:verify
```

改了 `rules/` 后，对各业务仓再跑一次 `rules:sync`。勿在业务仓手改非 local 的 `.mdc`。

## 说明

- 离线包：`bash scripts/pack-global-skills-bundle.sh`
- 环境变量：`CURSOR_TEAM_SKILLS_ROOT`（或旧名 `CURSOR_SKILLS_ROOT`）指向本仓根目录。
- 安装配置：`scripts/skills-config.mjs`

## Skills 清单（8 必选 + 1 可选）

| Skill | 来源 | 必选 | 用途 |
|-------|------|:----:|------|
| find-skills | vercel-labs/skills | ✓ | 发现、安装其它 Skills |
| web-design-guidelines | vercel-labs/agent-skills | ✓ | Web/UX、可访问性审查 |
| webapp-testing | anthropics/skills | ✓ | Playwright 本地 H5/Web 测试 |
| frontend-design | anthropics/skills | ✓ | 高辨识度前端界面 |
| ui-ux-pro-max | nextlevelbuilder/ui-ux-pro-max-skill | ✓ | 设计系统 / UX（高级能力需 Python 3） |
| self-improving-agent | charon-fan/agent-playbook | ✓ | Agent 技能演进与自改进 |
| uni-app-vue3-wx | 本仓 `skills/` | ✓ | uni-app Vue3：新页面、接口联调 |
| vue3-admin-page-api | 本仓 `skills/` | ✓ | PIGX / 若依 Vue3 后台：新页面、联调 |
| excalidraw-diagram-generator | github/awesome-copilot | 可选 | Excalidraw 流程图（国内常装失败可跳过） |
