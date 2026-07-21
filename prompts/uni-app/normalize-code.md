# 按规范整理已有代码

> **日常开发请用** [`docs/prompts.md`](../prompts.md) **「按规范整理」段落**（复制时 `@` 本文件）。  
> 已有页面/API 规范化；**不改契约与业务分支**。直接改代码，不扩展需求。  
> Agent 须先读取并遵守：`.cursor/rules/vue3/base.mdc`、`.cursor/rules/vue3/api-js.mdc`（用户无需再单独 `@`）。  
> 本附录真相源：`cursor-team-skills/prompts/uni-app/normalize-code.md`，由 `prompts:sync --preset uni-app` 写入。

## 范围

仅改用户 `@` / 列出的文件；需动范围外文件先询问。

## 只做

1. 按 `base.mdc`：**注释分级**（必须/建议/默认不写）与 `<script setup>` 块顺序；文件头固定两条；生命周期在业务方法前；勿为每个简单函数堆注释
2. 请求改 `async/await`；按 `api-js`：不重复 catch toast、方法空行；拦截器已解包后的明显赋值路径修正（如 `page.data.records` → `page.records`）
3. 样式只按 `uni-app/style.mdc` 调整（若用户同时要求动样式）

## 不做

改入参字段、路由 query、业务分支、扩需求、无关重构；不要加判空/防御性分支（除非用户明确要求）。

## 输出

每文件 1 句说明；未改入参/分支一句话带过；回报「结构顺序已对齐 base」。
