## Cursor 提问模板（uni-app + Vue3）

> 真相源：`cursor-team-skills/prompts/uni-app/`；本文件由 `prompts:sync --preset uni-app` 写入业务仓 `docs/`，勿在业务仓手改。

选场景，**连同 `@` 行**整段粘贴；`【改：…】` 换成实际内容，无则删。大任务可加 `@docs/project-map.md`（各仓自维护，不在本次 sync 内）。细则见各附录（已 `@` 时优先于 Skill；rules 由附录/globs 带上，不必再手 `@`）。

也可先用短前缀（见团队仓 README「模式提问词速查」），复杂任务再用下方完整模板。

---

### §1 新增页面（复制）

```text
@docs/prompts/new-page.md

需求：【改：页面做什么】
仅改/新建：【改：页面、components、api、pages.json、tab-bar（按需）】
不要改：【改：无关模块；无则删】
路由：【改：是否 Tab】
契约：【改：doc/api/xxx.md 或「暂无，mock」】
```

---

### §2 接口联调（复制）

```text
@docs/prompts/api-integration.md

@【改：页面路径，纯改 api 可删】
@【改：doc/api/xxx.md，无则「暂无」】
@【改：src/api/模块/index.js，无则自动添加】

授权改参（无则删）：【改：允许改的字段】
```

---

### §3 按规范整理（复制）

```text
@docs/prompts/normalize-code.md
@【改：文件1】
@【改：文件2】
```

---

### 相关

- 附录：[new-page.md](./prompts/new-page.md) · [api-integration.md](./prompts/api-integration.md) · [normalize-code.md](./prompts/normalize-code.md)
- 索引：各仓自备 [project-map.md](./project-map.md)（无则按 Skill `project-map.template.md` 新建）
