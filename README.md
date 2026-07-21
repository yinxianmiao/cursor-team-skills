# cursor-team-skills

Cursor **Skills + Rules** 唯一入口（clone 即可用，无需 `npm install`）。

仓库：https://github.com/yinxianmiao/cursor-team-skills

| 做什么 | 在哪执行 | 频率 |
|--------|----------|------|
| 装全局 Skills | Cursor 打开本仓库 → 终端 `npm run skills:install` | 每台电脑一次；更新 Skill 后再跑 |
| 同步 Rules | Cursor 打开本仓库 → 终端 `npm run rules:sync …` | 每个业务仓首次一次；团队改了 `rules/` 后再跑 |

Skill 管工作流（装到 `~/.agents/skills/`）；细则在本仓 `rules/`，再 sync 到业务仓。业务仓只手写 `*.local.mdc`。

> **重要：** 用 Cursor **打开本仓库**，在本仓库终端里跑 `skills:install` / `skills:verify` / `rules:sync`。  
> 打开业务项目再跑会报 `Missing script: "rules:sync"`——业务仓没有这些脚本。

## 1. 安装全局 Skills（每台电脑）

前置：Node.js 18+、Git；第三方 Skill 需能访问 GitHub。

```bash
git clone https://github.com/yinxianmiao/cursor-team-skills.git
cd cursor-team-skills          # 必须先进入本仓库

npm run skills:install
# 国内可跳过可选 excalidraw：
# SKIP_OPTIONAL_SKILLS=1 npm run skills:install

npm run skills:verify          # 期望 8 项必选 [OK]
```

然后**完全退出并重启 Cursor**。装一次即可，所有业务项目共用。

## 2. 同步 Rules 到业务仓

用 Cursor **打开本仓库（cursor-team-skills）**，在本仓库的终端里执行（不要打开业务仓再跑）：

```bash
# uni-app 小程序/H5 → 写入业务仓 .cursor/rules/vue3/* + uni-app/*
npm run rules:sync -- --preset uni-app --target /真实路径/你的-uni-app项目

# 后台（PIGX/若依等）→ 写入 vue3/*；有 rules/admin/ 时一并同步
npm run rules:sync -- --preset admin --target /真实路径/你的-后台项目
```

注意：

- `--target` 必须换成**业务仓的真实绝对路径**；文档里的占位路径直接复制会失败。
- 示例（地质博物馆小程序；在本仓库终端执行）：

```bash
npm run rules:sync -- --preset uni-app --target /Users/你的用户名/Desktop/云畔/geological-museum-system/geological-museum-system-wx
```

同步结果（业务仓内）：

```text
业务仓/.cursor/rules/
├── vue3/base.mdc、api-js.mdc     # sync，勿手改
├── uni-app/*.mdc                 # uni-app preset 才有；勿手改
├── uni-app/project.local.mdc     # 本仓手写，sync 不覆盖
└── SYNC.md
```

业务仓首次请自备：`uni-app/project.local.mdc`（或后台等价 local）。

## 更新

用 Cursor 打开本仓库，在本仓库终端执行：

```bash
git pull
npm run skills:install    # 刷新本机全局 Skills
npm run skills:verify
```

若本次 pull 改了 `rules/`，再对各业务仓跑一遍第 2 节的 `rules:sync`。勿在业务仓手改非 local 的 `.mdc`。

## 说明

- 离线包：`bash scripts/pack-global-skills-bundle.sh`
- 环境变量：`CURSOR_TEAM_SKILLS_ROOT`（或旧名 `CURSOR_SKILLS_ROOT`）指向本仓根目录。
- 安装配置：`scripts/skills-config.mjs`

## 3. 模式提问词速查（写给 Agent）

开场用固定前缀，减少每次复述；细则仍以业务仓已 sync 的 `vue3/base.mdc`、`vue3/api-js.mdc` 为准。

| 模式 | 可直接粘贴 |
|------|------------|
| 联调 | `【模式：联调】只换 mock→http，不改方法名/字段；对齐 doc/api/xxx；@vue3/api-js.mdc` |
| 只样式 | `【模式：只样式】不动 script；遵循 uni-app/style.mdc` |
| 只规范 | `【模式：只规范】对齐 base；逻辑一行别动；不要加判空；@vue3/base.mdc` |
| 新页面 | `【模式：新页面】按 uni-app Skill；先列结构再写代码` |
| 排查 | `【模式：排查】先定位根因，未确认前不改代码` |

**范围锁（可选一行）**

```text
只动：A.vue、B.js；禁止动路由/query/其它页
diff 目标：<30 行；超了先停下来问我
```

**收窄触发语（与 base.mdc 一致，含同义）**

- `不要加代码` / `只规范注释` / `逻辑一行别动` / `只动样式不动 script`
- `不要加判空` / `不要防御性分支` / `不需要加判断条件`

**结束时建议要求 Agent 回报**

```text
改动文件 | 是否改契约（是/否）| 结构顺序是否对齐 base | 全仓搜索符号结果（若有删/重命名）
```

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
