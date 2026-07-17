# 工作流：接口联调

## 前置

@ `vue3/api-js.mdc`、`vue3/base.mdc`、`uni-app/api.mdc`（范围冲突取更严；细则以 rules 为准）

## 步骤

1. **读契约** — `doc/api/<模块>.md`（字段名、Query/Body、响应结构）
2. **写 API** — `src/api/<模块>/index.js` 增/改方法（签名与写法见 `uni-app/api.mdc` / `vue3/api-js.mdc`）
3. **页面接入** — `import { xxx } from '@/api/<模块>'`；生命周期拉数；直接赋值
4. **错误** — 依赖 `utils/request.js` 全局拦截器
5. **透传** — 路由 query / 多步流程字段与契约唯一字段名一致

## 禁止 / 删 helper / 输出

一律遵守 `@vue3/api-js.mdc`（禁止私自改参、删前搜改后搜、输出清单）。
