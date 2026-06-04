# 工作流：接口联调

## 前置

@ `vue3/api-js.mdc`、`vue3/base.mdc`（范围冲突取更严）

## 步骤

1. **读契约** — `doc/api/<模块>.md`（字段名、Query/Body、响应结构）
2. **写 API** — `src/api/<模块>/index.js` 增/改方法；GET 用 `http.get(url, params)`，参数名统一 `params`，不写 `params = {}`
3. **页面接入** — `import { xxx } from '@/api/<模块>'`；`onLoad`/`onShow`/`onMounted` 拉数；直接赋值，避免多余 `map`
4. **错误** — 依赖 `utils/request.js` 全局拦截器，页面默认不写重复 toast/catch
5. **透传** — 路由 query / 多步流程字段与契约唯一字段名一致，不多别名兜底

## 禁止（除非用户明确授权）

- 改已有 params/data 字段名或集合
- 新增 query/body 字段或前端 `slice` 限条
- 改路由 query 名、跳转、提交分支
- 为「对齐 api 注释」私自改名

## 删 helper / 内联

1. 全仓搜索符号 → 改齐所有引用 → 再删定义 → 再搜确认零残留

## 输出必须包含

- 新增 API 方法名 ↔ doc 章节 ↔ HTTP 路径
- 页面如何触发请求、参数从哪来（query/store/表单）
- lints 是否已检查
