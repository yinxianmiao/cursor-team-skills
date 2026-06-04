# cursor-team-skills

云畔团队 Cursor Agent Skills（全局安装，不放进业务仓库）。

## 包含

| Skill | 用途 |
|-------|------|
| [uni-app-vue3-wx](./skills/uni-app-vue3-wx/) | uni-app + Vue3：新页面、接口联调 |
| [vue3-admin-page-api](./skills/vue3-admin-page-api/) | PIGX / 若依 Vue3 后台：新页面、接口联调 |

## 安装（同事）

在业务项目根目录（含 `scripts/skills-config.mjs`）：

```bash
npm run skills:install
npm run skills:verify
```

安装到 `~/.agents/skills/<skill-name>/`，然后**完全退出并重启 Cursor**。

## 更新

维护者 push 本仓库后，同事删除本机旧目录再重装：

```bash
rm -rf ~/.agents/skills/uni-app-vue3-wx ~/.agents/skills/vue3-admin-page-api
npm run skills:install
```

## 仓库

https://github.com/yinxianmiao/cursor-team-skills
