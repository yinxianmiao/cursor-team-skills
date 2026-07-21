# 按规范整理已有代码

> 已有页面/API 规范化；**不改契约与业务分支**。模板见 `docs/prompts.md`。
> 须遵守：`.cursor/rules/vue3/base.mdc`、`.cursor/rules/vue3/api-js.mdc`。

## 只做

1. 补 `base` 注释与脚本顺序（分区注释、SFC 头注释、业务方法 / computed / watch / 生命周期单行用途注释；生命周期在业务方法前）
2. 请求改 `async/await`；按 `api-js`：不重复 catch toast、方法空行
3. 仅改我列出的文件

## 不做

改入参字段、路由 query、业务分支、扩需求、无关重构。

## 输出

每文件 1 句说明；未改入参/分支一句话带过即可。
