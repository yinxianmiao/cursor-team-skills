# 项目地图模板（每个项目复制一份填内容，或改名为 project-map.md）

## API 模块

| 目录 | 业务 | doc/api |
|------|------|---------|
| `src/api/xxx` | （填写） | xxx.md |

## 主要页面

| 路径 | 说明 |
|------|------|
| `pages/xxx/index` | （填写） |

## 基础设施

| 文件 | 职责 |
|------|------|
| `src/utils/request.js` | http 封装、token、拦截器 |
| `src/store/modules/` | Pinia 模块 |
| `src/pages.json` | 路由与 tabBar |
| `src/styles/common.scss` | 公共样式（如有） |

## 联调时查找顺序

1. 用户说的功能 → 上表找页面目录
2. 打开同模块 `src/api/<模块>/index.js` 看是否已有方法
3. 读 `doc/api/<对应>.md` 核对字段
4. 无 doc 时：以现有 api 注释和页面实现为准，**不私自改参**
