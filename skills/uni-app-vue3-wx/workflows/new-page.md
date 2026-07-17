# 工作流：新页面开发

## 前置

@ 项目 `uni-app/project.mdc`、`uni-app/project.local.mdc`（有则必读）、`vue3/base.mdc`、`uni-app/style.mdc`

## 步骤

1. **注册路由** — `pages.json` 的 `pages` / `subPackages`；若进 Tab，同步 Tab 配置（见 `project.local.mdc`）
2. **API 层** — `src/api/<模块>/index.js`（写法见 `uni-app/api.mdc`）
3. **页面** — `src/pages/...` 或分包页；`<script setup>` 块顺序见 `vue3/base.mdc`
4. **组件化** — 本页专用 → 页内 `components/`；跨页 → `src/components/com-*`
5. **Mock** — 契约字段与 doc 一致；页面只调 API
6. **样式** — 见 `uni-app/style.mdc`

## 自检

- [ ] pages.json 已注册
- [ ] 无页面内 `uni.request`
- [ ] 生命周期在业务方法之前
- [ ] Tab / 分包约定符合 `project.local.mdc`
