/**
 * 将本仓库 prompts/<preset>/ 同步到业务仓库 docs/（方式 B）
 *
 * 用法:
 *   node scripts/sync-prompts.mjs --preset uni-app --target /path/to/project
 *   node scripts/sync-prompts.mjs --preset admin --target /path/to/project
 *   npm run prompts:sync -- --preset uni-app --target /path/to/project
 *
 * 写入（两套 preset 目标路径相同）:
 *   docs/prompts.md
 *   docs/prompts/new-page.md
 *   docs/prompts/api-integration.md
 *   docs/prompts/normalize-code.md
 *   docs/prompts/conventions.md   # 仅 admin
 *
 * 不覆盖: docs/project-map.md 及其它非清单文件
 */
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs'
import { dirname, isAbsolute, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SCRIPT_ROOT = resolve(__dirname, '..')

/** @type {Record<string, { src: string, dest: string }[]>} */
const PRESETS = {
  'uni-app': [
    { src: 'prompts.md', dest: 'prompts.md' },
    { src: 'new-page.md', dest: 'prompts/new-page.md' },
    { src: 'api-integration.md', dest: 'prompts/api-integration.md' },
    { src: 'normalize-code.md', dest: 'prompts/normalize-code.md' },
  ],
  admin: [
    { src: 'prompts.md', dest: 'prompts.md' },
    { src: 'new-page.md', dest: 'prompts/new-page.md' },
    { src: 'api-integration.md', dest: 'prompts/api-integration.md' },
    { src: 'normalize-code.md', dest: 'prompts/normalize-code.md' },
    { src: 'conventions.md', dest: 'prompts/conventions.md' },
  ],
}

function parseArgs(argv) {
  const out = {
    preset: process.env.PROMPTS_PRESET || '',
    target: '',
    from: '',
  }
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i]
    if (a === '--preset' || a === '-p') out.preset = argv[++i]
    else if (a === '--target' || a === '-t') out.target = argv[++i]
    else if (a === '--from' || a === '-f') out.from = argv[++i]
    else if (a === '--help' || a === '-h') out.help = true
    else if (!a.startsWith('-') && !out.target) out.target = a
  }
  return out
}

function resolveSkillsRoot(fromArg) {
  if (fromArg) return resolve(fromArg)
  if (process.env.CURSOR_TEAM_SKILLS_ROOT) return resolve(process.env.CURSOR_TEAM_SKILLS_ROOT)
  if (process.env.CURSOR_SKILLS_ROOT) return resolve(process.env.CURSOR_SKILLS_ROOT)
  const pkg = join(SCRIPT_ROOT, 'package.json')
  if (existsSync(pkg)) {
    try {
      const name = JSON.parse(readFileSync(pkg, 'utf8')).name
      if (name === 'cursor-team-skills' || name === 'cursor-skills') return SCRIPT_ROOT
    } catch {
      /* ignore */
    }
  }
  return SCRIPT_ROOT
}

function resolveTarget(targetArg) {
  if (!targetArg) {
    console.error('错误: 请指定 --target <业务仓库根目录>')
    process.exit(1)
  }
  return isAbsolute(targetArg) ? targetArg : resolve(process.cwd(), targetArg)
}

function copyFile(src, dest) {
  mkdirSync(dirname(dest), { recursive: true })
  cpSync(src, dest)
}

const args = parseArgs(process.argv)
if (args.help) {
  console.log(`用法: node scripts/sync-prompts.mjs --preset uni-app|admin --target <项目根>

示例:
  cd /path/to/cursor-team-skills
  npm run prompts:sync -- --preset uni-app --target ../geological-museum-system/geological-museum-system-wx
  npm run prompts:sync -- --preset admin --target ../your-admin-project
`)
  process.exit(0)
}

const preset = args.preset
if (!preset || !PRESETS[preset]) {
  console.error(
    `错误: 请指定 --preset uni-app|admin（当前: ${preset || '(空)'}）`,
  )
  process.exit(1)
}

const skillsRoot = resolveSkillsRoot(args.from)
const targetRoot = resolveTarget(args.target)
const promptsSrc = join(skillsRoot, 'prompts', preset)
const docsDest = join(targetRoot, 'docs')
const manifest = PRESETS[preset]

if (!existsSync(join(skillsRoot, 'package.json'))) {
  console.error(`错误: 找不到 cursor-team-skills 根目录: ${skillsRoot}`)
  process.exit(1)
}
if (!existsSync(promptsSrc)) {
  console.error(`错误: 找不到 prompts 目录: ${promptsSrc}`)
  process.exit(1)
}

mkdirSync(docsDest, { recursive: true })

let synced = 0
for (const { src, dest } of manifest) {
  const from = join(promptsSrc, src)
  const to = join(docsDest, dest)
  if (!existsSync(from)) {
    console.error(`错误: 缺少源文件 ${from}`)
    process.exit(1)
  }
  copyFile(from, to)
  synced += 1
  console.log(`  + docs/${dest}`)
}

const syncNote = join(docsDest, 'PROMPTS-SYNC.md')
writeFileSync(
  syncNote,
  `# Prompts 同步说明（方式 B）

- 来源: \`${skillsRoot}/prompts/${preset}\`
- preset: \`${preset}\`
- 时间: ${new Date().toISOString()}
- 同步文件数: ${synced}

## 维护约定

| 位置 | 谁改 |
|------|------|
| \`cursor-team-skills/prompts/${preset}/**\` | 团队唯一真相源，改完再 sync |
| 业务仓 \`docs/prompts.md\`、\`docs/prompts/*\` | **勿手改**，下次 sync 会覆盖 |
| 业务仓 \`docs/project-map.md\` | 本仓库手写，sync **不覆盖** |

## 重新同步

\`\`\`bash
cd ${skillsRoot}
npm run prompts:sync -- --preset ${preset} --target ${targetRoot}
\`\`\`
`,
  'utf8',
)
console.log(`  + docs/PROMPTS-SYNC.md`)

console.log(`\n==> 完成: preset=${preset}，同步 ${synced} 个提问模板 → ${docsDest}`)
console.log('==> docs/project-map.md 未改动（各仓自维护）')
process.exit(0)
