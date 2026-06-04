# 项目地图模板（每个项目复制一份填内容，或改名为 project-map.md）

首行建议：`栈: PIGX` 或 `栈: 若依 Vue3`

## API 模块

| 目录 | 业务 | doc/api | 栈 | 列表模式 |
|------|------|---------|-----|----------|
| `src/api/xxx` | （填写） | xxx.md | PIGX / 若依 | 见下表 |

## 主要页面

| 路径 | 说明 | 菜单 component（动态路由时） |
|------|------|------------------------------|
| `src/views/xxx/index.vue` | （填写） | `/xxx/index` 或项目约定路径 |

## 基础设施（按栈勾选本项目实际文件）

### PIGX

| 文件 | 职责 |
|------|------|
| `src/utils/request.ts` | token、租户、加密、全局错误 |
| `src/router/backEnd.ts` | 后端菜单 → 动态路由 |
| `src/router/route.ts` | 静态路由（login、404 等） |
| `src/stores/` | Pinia（userInfo、routesList 等） |
| `src/hooks/table.ts` | `useTable`（系统模块常用） |
| `src/components/com-table` | 业务列表壳（如有） |

### 若依 Vue3

| 文件 | 职责 |
|------|------|
| `src/utils/request.js` 或 `.ts` | token、拦截器、错误提示 |
| `src/permission.js` | 路由守卫、动态路由加载 |
| `src/router/index.js` | 路由实例 |
| `src/store/modules/permission.js` | 菜单路由生成（常见） |
| `src/plugins/auth.js` | 按钮权限（如有） |
| `src/views/tool/gen` | 代码生成（如有） |

## 列表模式速查

| 栈 | 模式 | 特征 | 勿混用 |
|----|------|------|--------|
| **PIGX** | com-table | `filters` + `pageData` + `loadList` + `<com-table>` | 与同模块参考页一致 |
| **PIGX** | useTable | `useTable(state)` + `<el-table>` | 系统模块（admin、gen、flow） |
| **若依** | 标准列表 | `queryParams` + `getList()` + `<el-table>` + 分页组件 | API 常 `listXxx`，响应用 `rows`/`total`（以契约为准） |
| **若依** | 生成器页 | `views/tool/gen` 产出结构 | 改生成配置或同 gen 目录参考页 |

新页**跟同模块、同栈**参考页走；若依项目**不要**默认套用 PIGX 的 `com-table`/`useTable`。

## 分页响应字段（联调时以 doc/Network 为准）

| 栈 | 常见列表字段 |
|----|--------------|
| PIGX | `data.records`、`data.total`；请求 `current`、`size` |
| 若依 | `rows`、`total`；请求 `pageNum`、`pageSize`（或项目约定） |

## 联调时查找顺序

1. 确认 `栈: PIGX` 或 `栈: 若依 Vue3`（见本文件首行或扫仓库特征）
2. 用户说的功能 → 上表找 `src/views/<模块>/`
3. 打开同模块 `src/api/<模块>/` 看是否已有 CRUD 方法
4. 读 `doc/api/<对应>.md` 核对字段与路径
5. 无 doc 时：以现有 api 注释和页面实现为准，**不私自改参**
6. 无现成 map 时：`grep` 模块名或接口 path → 扫 `src/views`、`src/api`、`doc/api` 填上表
