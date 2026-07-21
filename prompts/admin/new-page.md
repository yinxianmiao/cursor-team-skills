# 新建后台管理页（通用）

> 填空模板见 `docs/prompts.md`「新增页面」；任务细则与组件化原则见本文。
> 本文优先于通用 skill `vue3-admin-page-api`；冲突以本文为准。

## 执行约定

- 按我要求直接改代码，不要扩展需求，不要做无关重构
- **栈**（用户模板不填）：先自动识别 **若依 Vue3** / **PIGX** / **自研**（对照 `docs/prompts/conventions.md` 栈表与仓库特征），列表写法跟同模块、同栈参考页
- 仅改/新建任务列出的文件；多改先问

## 前置

1. 识别栈：**若依 Vue3** / **PIGX** / **自研**（见 `docs/prompts/conventions.md` 栈表；勿混用列表模式）
2. 找**同模块、同栈**最接近的列表页作参考
3. @ 规则：`vue3/base.mdc` + `admin/pages.mdc` + `admin/api.mdc`（样式涉及则加 `admin/style.mdc`）

## 任务

1. 新建页面：`src/views/【业务目录】/index.vue`
2. 若需要接口，在 `src/api/【模块名】/` 补充 API 方法（`.js` 或 `.ts` 跟同模块现有文件）
3. 页面只 import API 调用；暂无接口可用 mock，字段与预期契约一致
4. 保持现有后台风格（Element Plus 表单、表格、按钮、间距）
5. 可组件化区块优先拆到 `components/`

## 目录约定

| 类型 | 路径 |
|------|------|
| 列表壳 | `src/views/<模块>/index.vue` |
| 子组件 | `src/views/<模块>/components/<模块>-*.vue` 或同级 `*Dialog.vue` |
| API | `src/api/<模块>/` |
| 跨页组件 | `src/components/com-*`（跟项目既有命名） |

## 页面组件化

- `index.vue`：列表壳（筛选、分页、行操作、子组件显隐）
- 表单/详情弹窗 → `components/<模块>-form-dialog.vue` 等
- 父：列表与刷新；子：弹窗 UI、表单、该弹窗相关逻辑
- 通信：`v-model` + `props` + `emit('confirm'/'close')`

## 列表页骨架（跟同模块参考页，二选一）

**A. 封装表格壳（com-table / useTable 等）**

```javascript
const queryForm = reactive({ current: 1, size: 10, total: 0 });
const tableData = ref([]);

const loadList = async () => {
  const res = await fetchList({ ...queryForm });
  tableData.value = res.data.records; // 字段以 doc/参考页为准
  queryForm.total = res.data.total;
};
onMounted(() => loadList());
```

**B. 标准 el-table + 分页（若依常见）**

```javascript
const queryParams = reactive({ pageNum: 1, pageSize: 10 });
const tableList = ref([]);
const total = ref(0);

const getList = async () => {
  const res = await listXxx(queryParams);
  tableList.value = res.rows;
  total.value = res.total;
};
onMounted(() => getList());
```

## 规范

- 脚本顺序：import → props/emits → 数据模型 → computed → watch → 生命周期 → 业务方法
- `async/await`；`<style scoped lang="scss">`，按 DOM 层级嵌套
- API 只在 `src/api/**`，页面不直接写 request/axios
- 字段按后端契约，不多别名兜底
- 页面不写重复全局错误提示（除非我明确要求）

## 页面头注释（建议）

```html
<!-- 页面名：一句业务说明（主接口方法名），主要交互。 -->
<!-- 接口封装见 @/api/模块；契约见 doc/api/xxx.md；字段与后端返回一致。 -->
```

## 自检

- [ ] 无页面内直接 request/axios
- [ ] 响应直接赋值（字段名以契约为准）
- [ ] 查询、重置、分页、空列表已覆盖
- [ ] 列表模式与同模块参考页一致

## 输出

1. 直接改代码
2. 每文件 1～2 句改动说明
3. 自测点 3～5 条
4. 注明本次【栈】与列表模式
