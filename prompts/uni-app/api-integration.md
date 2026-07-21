# 接口联调

> **日常开发请用** [`docs/prompts.md`](../prompts.md) **「接口联调」段落**（复制时 `@` 本文件）。  
> 本文件为细则附录；已 `@` 时**优先于通用 Skill**。直接改代码，优先只改 `src/api`；未授权不改页面入参 / query / 提交字段。  
> Agent 须先读取并遵守：`.cursor/rules/vue3/api-js.mdc`、`.cursor/rules/vue3/base.mdc`（用户无需再单独 `@`）。  
> 本附录真相源：`cursor-team-skills/prompts/uni-app/api-integration.md`，由 `prompts:sync --preset uni-app` 写入。

## 范围

仅改用户 `@` / 列出的文件；需动范围外文件先询问。

## 只做

1. 在 `src/api/【模块】/index.js` 新增/补齐接口（文件不存在则自动新建；GET/POST 风格与项目一致）；页面只 `import` 调用，不写 `uni.request`
2. 页面 onLoad/onShow：拉取、赋值渲染、加载态；表单：校验 → 组装 → 提交 → 反馈/返回
3. 入口跳转时透传必要 query（字段名严格按契约，不多别名兜底）
4. 未授权改参时：注释、`base.mdc` 脚本块顺序、拦截器解包后的明显赋值路径修正可以做；其余逻辑与入参不动
5. 联调完成后删除相关 mock 数据（含页面内临时 mock、api 层 mock 分支等）

## 不做（未写「可以改参数 / 允许改动字段：…」时强制）

改既有 `params`/`data` 字段名与集合、路由 query、跳转/提交业务分支；新增 query/body 或前端 `slice` 条数限制。注释与实现不一致时只在回复说明，不私自改名对齐。

## 输出

1. 改代码 + 每文件 1 句说明
2. 新增 API 方法名 + 对应接口；页面如何引入、触发、组装参数
3. 自测 3 条
4. 是否改契约（是/否）；若删/重命名符号须声明已全仓搜索无残留
