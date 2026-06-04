# 工作流：新页面开发

## 前置

@ 项目 `uni-app/project.mdc`、`vue3/base.mdc`、`uni-app/style.mdc`

## 步骤

1. **注册路由** — 在 `src/pages.json` 的 `pages` 增加项；若进 Tab，同步改 `tabBar.list`
2. **API 层** — 新建 `src/api/<模块>/index.js`，方法签名 `(params) => http.get/post(url, params)`，注释指向 `doc/api/<文档>.md`
3. **页面** — `src/pages/<模块>/<name>.vue` 或 `.../index.vue`；`<script setup>` 块顺序见 base 规则
4. **组件化** — 仅本页用的子组件 → `<页面目录>/components/`；跨页复用 → `src/components/com-*`
5. **Mock** — 契约字段与 doc 一致；页面只调 API，后续联调只改 api 文件
6. **样式** — `<style scoped lang="scss">`，SCSS 按 DOM 层级嵌套

## 页面头注释（固定两条）

```html
<!-- 页面名：一句业务说明（主接口方法名），主要交互。 -->
<!-- 接口封装见 @/api/模块；契约见 doc/api/xxx.md；字段与后端返回一致。 -->
```

## 组件化边界

**应拆：** 2+ 独立业务区块；单块模板/逻辑明显偏大（约 80 行+）；独立交互状态；同结构重复 2 次+

**不必拆：** 区块内标题/空态；简单列表项无独立状态；十几行无 props 的碎片组件

## 自检

- [ ] pages.json 已注册
- [ ] 无页面内 `uni.request`
- [ ] 生命周期在业务方法之前
- [ ] mock 覆盖正常/空/加载态
