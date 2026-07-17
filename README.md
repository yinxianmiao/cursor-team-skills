# cursor-team-skills

云畔团队 **Cursor Skills + Rules** 唯一维护入口（公网 GitHub，clone 即可用，**无需** `npm install`）。

仓库：https://github.com/yinxianmiao/cursor-team-skills

## 怎么用（两件事）

| 做什么 | 命令 | 结果 |
|--------|------|------|
| 装全局 Skills | `npm run skills:install` | 写入 `~/.agents/skills/` |
| 同步编码 Rules | `npm run rules:sync -- --preset uni-app --target <业务仓根>` | 写入业务仓 `.cursor/rules/` |

Skill 管**工作流**；编码细则只维护在本仓 `rules/`，再 sync 到各业务项目。业务仓只手写 `*.local.mdc`。

---

## 目录结构

```text
cursor-team-skills/
├── scripts/                 # skills:install / rules:sync
├── rules/
│   ├── shared/vue3/         # base.mdc、api-js.mdc
│   ├── uni-app/             # pages / api / style / project
│   └── admin/               # 预留
├── skills/
│   ├── uni-app-vue3-wx/     # 自研：uni-app 新页 / 联调
│   └── vue3-admin-page-api/ # 自研：PIGX / 若依后台
├── package.json
└── README.md
```

---

## 团队标准 Skills（8 必选 + 1 可选）

| Skill | 来源 | 必选 | 用途 |
|-------|------|:----:|------|
| find-skills | vercel-labs/skills | ✓ | 发现、安装其它 Skills |
| web-design-guidelines | vercel-labs/agent-skills | ✓ | Web/UX、可访问性 |
| webapp-testing | anthropics/skills | ✓ | Playwright 本地测试 |
| frontend-design | anthropics/skills | ✓ | 高辨识度前端界面 |
| ui-ux-pro-max | nextlevelbuilder/ui-ux-pro-max-skill | ✓ | 设计系统 / UX |
| self-improving-agent | charon-fan/agent-playbook | ✓ | Agent 技能演进 |
| uni-app-vue3-wx | **本仓库** `skills/` | ✓ | uni-app Vue3 新页、联调 |
| vue3-admin-page-api | **本仓库** `skills/` | ✓ | PIGX/若依后台新页、联调 |
| excalidraw-diagram-generator | github/awesome-copilot | 可选 | Excalidraw 流程图 |

Skills 只装本机全局 `~/.agents/skills/`，不复制进业务仓库。

---

## 安装步骤

**前置**：Node.js 18+、Git；第三方 Skill 需能访问 GitHub；Python 3 仅 `ui-ux-pro-max` 高级能力需要。

### 1. 拉取本仓库

```bash
git clone https://github.com/yinxianmiao/cursor-team-skills.git
cd cursor-team-skills
```

### 2. 一键安装全局 Skills

```bash
npm run skills:install
```

跳过可选 excalidraw（国内常因 awesome-copilot 过大失败）：

```bash
# macOS / Linux
SKIP_OPTIONAL_SKILLS=1 npm run skills:install

# Windows PowerShell
$env:SKIP_OPTIONAL_SKILLS = "1"
npm run skills:install
```

自研两个 Skill 从本仓 `skills/` 直接复制，**不再**二次拉取 GitHub。

### 3. 验证

```bash
npm run skills:verify
```

期望 8 项必选均为 `[OK]`，然后**完全退出并重启 Cursor**。

### 4. 同步 Rules 到业务仓

```bash
npm run rules:sync -- --preset uni-app --target /path/to/your-uni-app-project
npm run rules:sync -- --preset admin --target /path/to/your-admin-project
```

业务仓首次自备（手写，sync 不覆盖）：

- uni-app：`.cursor/rules/uni-app/project.local.mdc`
- 后台：按需 `.cursor/rules/admin/project.local.mdc`

---

## 更新

```bash
cd cursor-team-skills
git pull
npm run skills:install   # 自研 Skill 每次都会从本仓覆盖
npm run skills:verify
```

---

## 离线分发

```bash
bash scripts/pack-global-skills-bundle.sh
# → dist/cursor-global-skills-bundle.tar.gz
```

接收方：`mkdir -p ~/.agents && tar -xzf cursor-global-skills-bundle.tar.gz -C ~/.agents`

---

## 日常维护

1. 改本仓 `rules/` 或 `skills/`
2. `git push`
3. 同事 `git pull` + `npm run skills:install`（若改了 Skill）
4. 各业务仓重新 `rules:sync`
5. 项目差异只写 `*.local.mdc`

**不要**在业务仓手改非 local 的 `.mdc`。

---

## 从旧仓迁移

原内网 `cursor-skills` 已并入本仓库。请改用本 GitHub 地址。

兼容环境变量：`CURSOR_TEAM_SKILLS_ROOT` 或 `CURSOR_SKILLS_ROOT`（指向本仓库根目录）。
