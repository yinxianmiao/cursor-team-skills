# 后台提问约定（通用）

> 复制模板见 `docs/prompts.md`。本文供 Agent / 人类查阅：优先级、编码、栈识别。

## 优先级

任务硬约束 → `docs/prompts/*.md`（**优先**，含 new-page / api-integration / normalize-code / conventions）；通用流程 → 全局 skill `vue3-admin-page-api`（若已安装）；编码细则 → `.cursor/rules/`；冲突以 `docs/prompts` 为准。

## 编码

仓库统一 UTF-8（无 BOM）。若 Agent 读 rules 出现乱码，以编辑器/`head` 所见为准，任务约束仍以 `docs/prompts/*.md` 为准（见 `.cursor/rules/00-encoding.mdc`）。

## 栈识别（Agent 自动识别，用户模板不填）

不同后台项目列表写法不同；对照下表与仓库特征识别，**勿混用**列表模式。

| 栈 | 常见特征 | 列表/分页习惯（跟同模块参考页） |
|----|----------|--------------------------------|
| **若依 RuoYi-Vue3** | `permission.js`、`getRouters`、`useDict`、`listXxx` | `queryParams` + `getList` + `el-table`；常 `pageNum`/`pageSize`，响应常 `rows`/`total` |
| **PIGX / 衍生** | `backEnd.ts`、`useTable`、`com-table` | `com-table` 或 `useTable`；常 `current`/`size`，响应常 `data.records`/`data.total` |
| **自研后台** | 跟同模块参考页的 request 与列表壳 | 以该仓库同业务域已有页为准 |

项目模块地图见 `docs/project-map.md`（换项目时改该文件即可）。
