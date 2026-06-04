# 工作流：接口联调与调试

## 前置

@ `vue3/api-js.mdc`（及 base、element 规则）；范围冲突取更严。

## 步骤

### 1. 读契约

来源优先级：

1. 用户/task 指定的 `doc/api/*.md`（**仅改文档内出现的接口**）
2. 已有 API 文件注释
3. 同模块已通接口的命名与路径风格

记录：Method、Path、Query/Body 字段、响应层级（PIGX 常见 `data.records`/`data.total`；若依常见 `rows`/`total`，以 doc 为准）。

**无 doc 或未写明的数据源**（树/下拉/字典）：用静态或 mock，**不得**擅自调其它模块真接口；不够用先问用户。

### 2. 写/改 API（`src/api/<模块>/`）

- GET：`params: query`
- POST/PUT：`data`
- 路径参数仅契约明确要求时用 `/xxx/${id}`
- 参数签名跟项目现有文件走（`query` 或 `params`），不要混用
- 页面只 import API 方法

```typescript
/** GET /business/xxx/page */
export function fetchXxxPage(query) {
  return request({ url: '/business/xxx/page', method: 'get', params: query });
}
```

### 3. 页面接入

```javascript
// PIGX 示例
const loadList = async () => {
  const res = await fetchXxxPage({
    current: pageData.current,
    size: pageData.size,
    ...filters,
  });
  tableData.value = res.data.records;
  pageData.total = res.data.total;
};

// 若依示例（字段名以 doc 为准）
const getList = async () => {
  const res = await listXxx(queryParams);
  tableData.value = res.rows;
  total.value = res.total;
};
```

- 直接赋值，避免无依据 `map`
- 错误交给 `utils/request` 全局拦截，页面默认不重复 catch/toast
- 子组件所需数据默认在子组件内请求（除非业务要求页面统一编排）
- `components/` 内弹窗/表单优先在子组件改接口

### 4. 联调排查

| 现象 | 查什么 |
|------|--------|
| 404 | API `url` vs doc；`.env` 代理 `VITE_*_PROXY` |
| 401/424 | token、租户头；request 拦截器 |
| 参数未生效 | Network 看实际 query/body；字段名是否与 doc 一致 |
| 有响应无数据 | `res.data` 层级；表格 `prop` 与字段名 |
| 分页异常 | PIGX: `current`/`size`；若依: `pageNum`/`pageSize`；`total` 是否与后端一致 |
| 解密/乱码 | request 加密开关、`Enc-Flag` header |

验证顺序：Network 对比实际请求 → 列表 → 详情 → 提交 → 空数据。

### 5. Mock → 真实

1. 页面调用不变
2. 仅改 API 实现
3. 字段对齐后删多余 normalize 层

### 6. 清理文档外请求

页面旧代码含 doc 未列出的 import/请求 → 去掉或恢复占位，不因「原来就有」保留。

## 禁止（除非用户明确授权）

- 调用 doc 未出现的 URL
- 改已有 params/data 字段名
- import/改动 doc 未涉及的其它 `src/api/**`
- 为对齐注释私自改参；猜测式多别名兜底

## 删 helper / 重命名

1. 全仓搜索符号 → 改齐引用 → 再删定义 → 再搜确认零残留

## 输出必须包含

- 新增/修改 API 方法名 ↔ doc 章节 ↔ HTTP 路径
- 页面何时触发、参数从哪来（表单/query/store）
- 手动验证步骤 3～5 条
- 是否已检查 lints
