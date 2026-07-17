/**
 * 团队全局 Skills（install / verify 共用）
 *
 * optional: true → 安装失败不中断（多为 github/awesome-copilot 体积大 + 国内网络不稳）
 * gitSparse: true → Git 回退时用 sparse-checkout，只拉单个 skill 目录
 * localPath: 相对本仓库根目录，安装时直接复制（自研 Skill，无需再拉 GitHub）
 */
export const TEAM_SKILLS = [
  {
    skill: 'find-skills',
    gitRepo: 'https://github.com/vercel-labs/skills.git',
    gitSubPath: 'skills/find-skills',
    npxAttempts: [
      ['https://github.com/vercel-labs/skills/tree/main/skills/find-skills', '-g', '-y', '--copy'],
      ['vercel-labs/skills', '--skill', 'find-skills', '-g', '-y', '--copy'],
      ['vercel-labs/skills', '--skill', 'find-skills', '-g', '-y'],
    ],
  },
  {
    skill: 'web-design-guidelines',
    gitRepo: 'https://github.com/vercel-labs/agent-skills.git',
    gitSubPath: 'skills/web-design-guidelines',
    npxAttempts: [
      ['https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines', '-g', '-y'],
      ['vercel-labs/agent-skills', '--skill', 'web-design-guidelines', '-g', '-y'],
    ],
  },
  {
    skill: 'webapp-testing',
    gitRepo: 'https://github.com/anthropics/skills.git',
    gitSubPath: 'skills/webapp-testing',
    npxAttempts: [['anthropics/skills', '--skill', 'webapp-testing', '-g', '-y']],
  },
  {
    skill: 'frontend-design',
    gitRepo: 'https://github.com/anthropics/skills.git',
    gitSubPath: 'skills/frontend-design',
    npxAttempts: [['anthropics/skills', '--skill', 'frontend-design', '-g', '-y']],
  },
  {
    skill: 'ui-ux-pro-max',
    gitRepo: 'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git',
    gitSubPath: 'skills/ui-ux-pro-max',
    npxAttempts: [['nextlevelbuilder/ui-ux-pro-max-skill', '--skill', 'ui-ux-pro-max', '-g', '-y']],
  },
  {
    skill: 'self-improving-agent',
    gitRepo: 'https://github.com/charon-fan/agent-playbook.git',
    gitSubPath: 'skills/self-improving-agent',
    npxAttempts: [['charon-fan/agent-playbook', '--skill', 'self-improving-agent', '-g', '-y']],
  },
  {
    skill: 'excalidraw-diagram-generator',
    optional: true,
    gitSparse: true,
    gitRepo: 'https://github.com/github/awesome-copilot.git',
    gitSubPath: 'skills/excalidraw-diagram-generator',
    npxAttempts: [
      ['https://github.com/github/awesome-copilot/tree/main/skills/excalidraw-diagram-generator', '-g', '-y'],
      ['github/awesome-copilot', '--skill', 'excalidraw-diagram-generator', '-g', '-y'],
    ],
  },
  {
    skill: 'uni-app-vue3-wx',
    localPath: 'skills/uni-app-vue3-wx',
    npxAttempts: [],
  },
  {
    skill: 'vue3-admin-page-api',
    localPath: 'skills/vue3-admin-page-api',
    npxAttempts: [],
  },
]

/** @deprecated 兼容旧引用 */
export const REQUIRED_SKILLS = TEAM_SKILLS
