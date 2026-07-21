# 提问模板（方式 B）

团队真相源，按栈分目录。同步到业务仓后路径仍为 `docs/prompts.md`、`docs/prompts/*.md`，提问时继续 `@docs/...`。

| preset | 本仓路径 | 适用 |
|--------|----------|------|
| `uni-app` | `prompts/uni-app/` | uni-app 小程序 / H5 |
| `admin` | `prompts/admin/` | Vue3 + Element Plus 后台（PIGX / 若依等） |

**不同步**：各仓自维护的 `docs/project-map.md`（用 Skill 内 `project-map.template.md` 自建）。

## 同步到业务仓

推荐与 Rules **一次同步**（在本仓库终端）：

```bash
npm run sync -- --preset uni-app --target /真实路径/你的-uni-app项目
npm run sync -- --preset admin --target /真实路径/你的-后台项目
```

仅同步 prompts：

```bash
npm run prompts:sync -- --preset uni-app --target /真实路径/你的-uni-app项目
npm run prompts:sync -- --preset admin --target /真实路径/你的-后台项目
```

业务仓结果（两套 preset 目标路径相同；`conventions.md` 仅 admin）：

```text
docs/
├── prompts.md              # sync，勿手改
├── prompts/
│   ├── new-page.md         # sync
│   ├── api-integration.md  # sync
│   ├── normalize-code.md   # sync
│   └── conventions.md      # admin 才有
└── project-map.md          # 本仓手写，sync 不碰
```

## 维护

| 位置 | 谁改 |
|------|------|
| `cursor-team-skills/prompts/uni-app/**`、`prompts/admin/**` | 团队唯一真相源 |
| 业务仓 `docs/prompts.md`、`docs/prompts/*` | 勿手改，下次 sync 覆盖 |
| 业务仓 `docs/project-map.md` | 各项目手写 |

改完对应 preset 目录后，对各业务仓再跑一遍 `npm run sync`（或 `prompts:sync`）。
