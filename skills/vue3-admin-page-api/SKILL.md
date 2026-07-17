---
name: vue3-admin-page-api
description: >-
  Guides Vue3 Element Plus admin development (PIGX or RuoYi-Vue3): new pages
  under src/views, API modules in src/api, backend-controlled routes, CRUD
  list/dialog flows. Use when user mentions 后台管理、新页面、列表页、Element Plus、
  PIGX、若依、RuoYi、src/views、接口联调、doc/api. Not for uni-app or pages.json.
  RuoYi-Vue2 (Element UI) is out of scope unless user says otherwise.
---

# Vue3 后台管理：新页面与接口联调（PIGX / 若依）

Vue3 + Element Plus + Pinia 管理后台（**PIGX** 或 **若依 RuoYi-Vue3**）。本 Skill 管**工作流**；编码细则以项目 `.cursor/rules/` 为准（由团队 `cursor-team-skills` 仓库 `rules:sync --preset admin` 同步 vue3 公用规则；有则必须 @ 并遵守）。

## 先识别项目栈（任务开始前）

| 栈 | 常见特征 | 列表参考写法 |
|----|----------|--------------|
| **PIGX** | `src/router/backEnd.ts`、`hooks/table.ts`、`com-table`、`TENANT-ID`/加密 request | `com-table` 或 `useTable`，跟同模块参考页 |
| **若依 Vue3** | `permission.js`、`getRouters`、`useDict`、`views/tool/gen`、API 常 `listXxx`/`getXxx` | `el-table` + 分页/`queryParams`，跟同模块参考页 |
| **若依 Vue2** | Vue2 + Element UI | 本 skill 以 Vue3 为主；用户未说明时先确认版本 |

若项目或专用 skill 内已有填好的 `reference/project-map.md`，优先读；否则读 [project-map.template.md](reference/project-map.template.md) 并扫目录自建对照。

## 项目速览（两栈共用）

```text
src/
├── api/<模块>/           # HTTP 唯一出口
├── views/<模块>/         # 业务页（动态菜单 component 常对应此目录）
├── components/           # 跨页组件（PIGX 常见 com-*；若依常见项目内封装）
└── utils/request.*       # token、拦截器（PIGX 可能含租户/加密）

doc/api/*.md              # 后端契约（联调前必读，有则优先）
```

栈差异（路由、列表模式、权限文件）见 [reference/project-map.template.md](reference/project-map.template.md)。

## 通用约束

- HTTP 只走 API 层；页面禁止硬编码 `axios` / `fetch`
- 字段名与后端契约一致，不写 `a ?? b ?? c` 式猜测兜底
- 删/重命名 API 或函数：全仓搜索 → 改引用 → 再删 → 再搜确认零残留
- 未获用户授权：**不得**改请求参数字段、query 名、业务分支

## 配合 Rules（按项目实际 @）

| 任务 | 常见 Rules |
|------|------------|
| 任意 `.vue` | `vue3/base.mdc` |
| `src/api/**`、页面接数据 | `vue3/api-js.mdc` |
| Element 表格/表单/`:deep` | 项目 element 规则 |

Rules 与 Skill 冲突时取**更严**；用户明确收窄范围（如「只改注释」）时不得扩改业务。

## 工作流路由（只读当前任务对应文件）

| 用户意图 | 读取 |
|----------|------|
| 新建管理页、CRUD、列表+弹窗 | [workflows/new-page.md](workflows/new-page.md) |
| 接口联调、mock 转真实、修接口 | [workflows/api-integration.md](workflows/api-integration.md) |
| 查模块归属（无现成 map 时） | 先读 [reference/project-map.template.md](reference/project-map.template.md)，再扫 `src/views`、`src/api`、`doc/api` 自建对照 |

## 输出要求

1. 改动文件清单 + 每项 1～2 句说明
2. 注明识别的栈（PIGX / 若依 Vue3）
3. 动 `.vue`：脚本块顺序已对齐 base 规则
4. 动 API：方法名 ↔ HTTP 路径 ↔ doc 章节
5. 联调：请求参数来源、预期响应字段、验证步骤
6. 删/重命名：声明已全仓搜索无残留
