# 工作流：新建后台管理页

## 前置

1. @ 项目 `vue3/base.mdc`（及 element 等 UI 规则）
2. 识别栈：**PIGX**（`backEnd.ts` / `com-table` / `useTable`）或 **若依 Vue3**（`permission.js` / `listXxx` / `queryParams`）
3. 找同模块、**同栈**最接近的列表页作参考（勿在若依项目套 PIGX 的 com-table/useTable）

## 步骤

### 1. 定目录

| 类型 | 路径 |
|------|------|
| 列表壳 | `src/views/<模块>/index.vue` |
| 子组件 | `src/views/<模块>/components/<模块>-*.vue` |
| API | `src/api/<模块>/<entity>.ts` 或 `.js`（跟项目现有模块一致） |
| 跨页组件 | `src/components/com-*` |

**组件化边界：**

- `index.vue`：筛选、分页、行操作、子组件显隐
- 表单/详情弹窗 → `components/<模块>-form-dialog.vue` 等
- 父：列表与刷新；子：弹窗 UI、表单、该弹窗相关逻辑
- 通信：`v-model` + `props` + `emit('confirm'/'close')`

### 2. API 层

标准 CRUD（命名跟同模块已有文件走）：

| 能力 | 常见命名 | HTTP |
|------|----------|------|
| 分页 | PIGX: `fetchList`；若依: `listXxx` | GET + params |
| 详情 | `getObj` / `getXxx` | GET |
| 新增/保存 | `addObj` / `addXxx` | POST |
| 修改 | `putObj` / `updateXxx` | PUT |
| 删除 | `delObjs` / `delXxx` | DELETE/GET |

```typescript
import request from '/@/utils/request';

/** GET /xxx/page */
export function fetchList(query) {
  return request({ url: '/xxx/page', method: 'get', params: query });
}
```

注释写清路径；有 doc 则指向 `doc/api/xxx.md`。

### 3. 页面骨架

**A. com-table 模式（业务模块常用）**

```javascript
// 数据模型
const filters = reactive({ /* 查询字段 */ });
const pageData = reactive({ current: 1, size: 10, total: 0 });
const tableData = ref([]);
const labelData = [ /* { prop, title } */ ];

// 生命周期
onMounted(() => loadList());

// 业务方法
const loadList = async () => {
  const res = await fetchList({ ...filters, current: pageData.current, size: pageData.size });
  tableData.value = res.data.records;
  pageData.total = res.data.total;
};

const onQuery = () => { pageData.current = 1; loadList(); };
const onReset = () => { /* 清空 filters */ pageData.current = 1; loadList(); };
const onChangePage = (page) => { pageData.current = page; loadList(); };
```

**B. useTable 模式（PIGX 系统页）**

```javascript
const state = reactive({
  queryForm: { /* 筛选 */ },
  pageList: fetchList,
  pagination: { current: 1, size: 10, total: 0 },
});
const { getDataList, currentChangeHandle, sizeChangeHandle, tableStyle } = useTable(state);
```

**C. 若依标准列表（Vue3）**

```javascript
const queryParams = reactive({ pageNum: 1, pageSize: 10, /* 筛选 */ });
const tableData = ref([]);
const total = ref(0);

const getList = async () => {
  const res = await listXxx(queryParams);
  tableData.value = res.rows;   // 以 doc/同模块参考页为准
  total.value = res.total;
};
onMounted(() => getList());
```

### 4. 路由/菜单

- **PIGX**：后端菜单，`views` 路径与菜单 component 一致（`backEnd.ts`）
- **若依 Vue3**：`permission.js` + 后端 `getRouters`，`views` 与路由 component 一致
- **静态后台**：在 `router` 手动注册

### 5. Mock（可选）

- Mock 放 API 文件或 `src/mock/`，字段与 doc 一致
- 页面只调 API 方法；联调时只改 API 层

## 页面头注释（建议）

```html
<!-- 页面名：一句业务说明（主接口方法名），主要交互。 -->
<!-- 接口封装见 src/api/<模块>；契约见 doc/api/xxx.md。 -->
```

## 脚本顺序（强制）

import → props/emits → 数据模型 → computed → watch → 生命周期 → 业务方法

## 自检

- [ ] 无页面内直接 request/axios
- [ ] 响应直接赋值（字段名以契约为准）
- [ ] 查询、重置、分页、空列表、loading 已覆盖
- [ ] Element 插槽用 `#default`；样式覆盖用 `:deep(.el-xxx)`
- [ ] 仅改任务列出的文件；多改先问用户
