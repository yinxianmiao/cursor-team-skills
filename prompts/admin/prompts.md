## 后台管理提问模板（Vue3 + Element Plus · 跨项目通用）

> 真相源：`cursor-team-skills/prompts/admin/`；本文件由 `prompts:sync --preset admin` 写入业务仓 `docs/`，勿在业务仓手改。
> 复制下面整段到 Cursor，**只改 `【】` 里的内容。** 约定 / 栈识别见 `docs/prompts/conventions.md`。

---

### 新增页面（复制这段）

```text
@docs/prompts/new-page.md

页面做什么：【改：简述功能】
页面目标：
- 【改：src/views/业务目录/index.vue】
- 【改：src/views/业务目录/components/xxx.vue】（按需）
接口文档：【改：doc/api/xxx.md 或「暂无，mock」】
仅改/新建：【改：同上 + src/api/xxx/】
```

---

### 接口联调（复制这段）

```text
@docs/prompts/api-integration.md

页面做什么：【改：简述功能】
联调目标：
- 【改：src/views/xxx/index.vue】
- 【改：src/views/xxx/components/yyy.vue】（按需）
接口文档：doc/api/【改：xxx.md 及章节】
仅改：【改：同上 + src/api/xxx/】
```

---

### 按规范整理（复制这段）

```text
@docs/prompts/normalize-code.md

仅改：【改：文件列表】
```
