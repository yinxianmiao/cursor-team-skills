---
name: uni-app-vue3-wx
description: >-
  Guides uni-app + Vue3 + Pinia mini-program/H5 development: new pages,
  API layer, mock-to-real integration from doc/api. Use when working on uni-app
  projects with src/pages, src/api, pages.json, doc/api, Pinia, or when user
  mentions 新页面、接口联调、mock、tabBar、pages.json.
---

# uni-app Vue3 通用开发

uni-app + Vue3 + Pinia。本 Skill 管**工作流**；编码细则以项目 `.cursor/rules/` 为准，执行时必须一并遵守。

## 配合 Rules（按项目实际路径 @）

| 任务 | Rules |
|------|-------|
| 任意 `.vue` | `vue3/base.mdc`、`uni-app/style.mdc`（或项目等价规则） |
| `src/api/**`、联调 | `vue3/api-js.mdc` |
| 路由 / Tab / request / store | `uni-app/project.mdc`（或项目等价规则） |

## 工作流路由（只读当前任务对应文件）

| 用户意图 | 读取 |
|----------|------|
| 新建页面、pages.json、mock | [workflows/new-page.md](workflows/new-page.md) |
| 接口联调、对接 doc/api | [workflows/api-integration.md](workflows/api-integration.md) |
| 查模块归属（无现成 map 时） | 先读 [reference/project-map.template.md](reference/project-map.template.md)，再扫 `src/pages`、`src/api`、`doc/api` 自建对照 |

## 项目速览（通用结构）

```text
src/
├── api/<模块>/index.js    # 唯一 HTTP 出口（@/utils/request）
├── pages/                 # 业务页（pages.json 注册）
├── components/com-*       # 跨页通用组件
├── store/modules/         # Pinia
└── utils/request.js       # baseURL、token、拦截器

doc/api/*.md               # 后端契约（联调前必读）
```

- 使用原生 `tabBar` 时勿在页内嵌自定义底栏
- 页面/API 禁止直接 `uni.request`（极特殊需注明）
- 页面头两条 HTML 注释：职责 + api/doc 指向（见 base 规则）

## 输出要求

1. 改动文件清单 + 每项 1～2 句说明
2. 动 `.vue`：声明结构顺序已对齐 base 规则
3. 动接口：列出 API 方法名与 doc 章节
4. 删/重命名函数：声明已全仓搜索、无残留
5. 未获用户授权：**不得**改请求参数字段、query 名、业务分支
