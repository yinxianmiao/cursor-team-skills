# 新增页面

> **日常开发请用** [`docs/prompts.md`](../prompts.md) **「新增页面」段落**（复制时 `@` 本文件）。  
> 本文件为细则附录；已 `@` 时**优先于通用 Skill**。直接改代码，不扩展需求、不做无关重构。  
> Agent 须先读取并遵守 `.cursor/rules/**`（尤其 uni-app / vue3 / style，含 `project.local.mdc`）；用户无需再单独 `@`。通用 mdc 由 `cursor-team-skills` 的 `rules:sync` 同步，勿在业务仓手改非 local 文件。  
> 本附录真相源：`cursor-team-skills/prompts/uni-app/new-page.md`，由 `prompts:sync --preset uni-app` 写入。

## 范围

仅改用户 `@` / 列出的文件（页面、页内 components、`src/api` 模块、`pages.json`、tab-bar 等）；需动范围外文件先询问。

## 只做

1. 新建页面并注册 `pages.json`；若进 Tab，同步 tab-bar 配置
2. 在 `src/api/【模块】/index.js` 建接口；暂无真实接口用 mock，方法名/入参/返回按预期契约；页面只 import 调用，不写 `uni.request`
3. 有设计图则高保真还原；样式 `<style scoped lang="scss">`，按 DOM 层级嵌套（见 `uni-app/style.mdc`）
4. 按业务区块适度组件化（见下）；风格对齐参考页与现有交互，不新增无关依赖

## 组件化（适度，勿过度）

- 粒度以页面业务区块为准，不按 DOM 原子拆；页内专用组件放【页面目录】/`components/`，跨页复用放公共组件目录
- 入口只保留：路由/参数、请求与状态编排、子组件拼装、页面级跳转
- **应拆**：≥2 个独立大块；单块模板/逻辑明显偏大（约 80+ 行）；有独立交互/内部状态；结构重复或将跨页复用
- **不必拆**：一次性标题/「查看全部」/空态；简单列表项；拆完过碎（十几行无 props/逻辑）
- 相对路径引入，命名体现业务含义

## 不做

扩需求、无关重构、页面内硬编码 request、改用户「不要改」列出的模块。

## 输出

1. 改代码 + 每文件 1 句说明
2. mock 位置、后续换真实接口改哪
3. 自测 3～5 条；拆了哪些子组件及职责（未拆说明原因）
4. 结构顺序是否对齐 `vue3/base.mdc`；是否改契约（默认否）
