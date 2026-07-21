/**
 * 将本仓库 rules/ 同步到业务仓库 .cursor/rules/
 *
 * 用法:
 *   node scripts/sync-rules.mjs --preset uni-app --target /path/to/project
 *   node scripts/sync-rules.mjs --preset uni-app --target .
 *   CURSOR_TEAM_SKILLS_ROOT=/path/to/cursor-team-skills node scripts/sync-rules.mjs --preset uni-app --target .
 *
 * 环境变量:
 *   CURSOR_TEAM_SKILLS_ROOT / CURSOR_SKILLS_ROOT  本仓库根目录
 *   RULES_PRESET        默认 uni-app（亦可 admin → shared/vue3 + rules/admin）
 *
 * 始终同步: rules/shared/00-encoding.mdc → .cursor/rules/00-encoding.mdc
 * 不会覆盖: *.local.mdc
 */
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import { dirname, isAbsolute, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SCRIPT_ROOT = resolve(__dirname, '..')

function parseArgs(argv) {
  const out = { preset: process.env.RULES_PRESET || 'uni-app', target: '', from: '' }
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

function listFiles(dir, base = dir) {
  if (!existsSync(dir)) return []
  const out = []
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) out.push(...listFiles(full, base))
    else out.push(full.slice(base.length + 1).replace(/\\/g, '/'))
  }
  return out
}

const args = parseArgs(process.argv)
if (args.help) {
  console.log(`用法: node scripts/sync-rules.mjs --preset uni-app|admin --target <项目根>

示例:
  cd /path/to/cursor-team-skills
  npm run rules:sync -- --target ../geological-museum-system/geological-museum-system-wx

  # 或在业务仓:
  CURSOR_TEAM_SKILLS_ROOT=../../cursor-team-skills npm run rules:sync
`)
  process.exit(0)
}

const skillsRoot = resolveSkillsRoot(args.from)
const targetRoot = resolveTarget(args.target)
const rulesSrc = join(skillsRoot, 'rules')
const rulesDest = join(targetRoot, '.cursor', 'rules')

if (!existsSync(join(skillsRoot, 'package.json'))) {
  console.error(`错误: 找不到 cursor-team-skills 根目录: ${skillsRoot}`)
  process.exit(1)
}
if (!existsSync(rulesSrc)) {
  console.error(`错误: 找不到 rules 目录: ${rulesSrc}`)
  process.exit(1)
}

const preset = args.preset
const copies = []

// shared 根级（如编码）→ .cursor/rules/
const sharedRoot = join(rulesSrc, 'shared')
if (existsSync(sharedRoot)) {
  for (const name of readdirSync(sharedRoot)) {
    const full = join(sharedRoot, name)
    if (!statSync(full).isFile()) continue
    if (!name.endsWith('.mdc') || name.endsWith('.local.mdc')) continue
    copies.push({ src: full, dest: join(rulesDest, name) })
  }
}

// shared vue3 → .cursor/rules/vue3/
const sharedVue3 = join(rulesSrc, 'shared', 'vue3')
for (const rel of listFiles(sharedVue3)) {
  copies.push({
    src: join(sharedVue3, rel),
    dest: join(rulesDest, 'vue3', rel),
  })
}

if (preset === 'uni-app') {
  const uni = join(rulesSrc, 'uni-app')
  for (const rel of listFiles(uni)) {
    if (rel.endsWith('.local.mdc')) continue
    copies.push({
      src: join(uni, rel),
      dest: join(rulesDest, 'uni-app', rel),
    })
  }
} else if (preset === 'admin') {
  // 后台：vue3 公用 + rules/admin/*
  const admin = join(rulesSrc, 'admin')
  if (!existsSync(admin)) {
    console.error(`错误: 找不到 rules/admin/: ${admin}`)
    process.exit(1)
  }
  for (const rel of listFiles(admin)) {
    if (rel.endsWith('.local.mdc')) continue
    copies.push({
      src: join(admin, rel),
      dest: join(rulesDest, 'admin', rel),
    })
  }
} else {
  console.error(`错误: 未知 preset「${preset}」，可用: uni-app | admin`)
  process.exit(1)
}

mkdirSync(rulesDest, { recursive: true })

let synced = 0
for (const { src, dest } of copies) {
  if (dest.endsWith('.local.mdc')) {
    console.log(`跳过 local: ${dest}`)
    continue
  }
  copyFile(src, dest)
  synced += 1
  console.log(`  + ${dest.replace(targetRoot + '/', '')}`)
}

const syncNote = join(rulesDest, 'SYNC.md')
writeFileSync(
  syncNote,
  `# Rules 同步说明

- 来源: \`${skillsRoot}/rules\`
- preset: \`${preset}\`
- 时间: ${new Date().toISOString()}
- 同步文件数: ${synced}

## 维护约定

| 位置 | 谁改 |
|------|------|
| \`cursor-team-skills/rules/**\` | 团队唯一真相源，改完再 sync |
| 业务仓 \`.cursor/rules/**/*.mdc\`（非 local） | **勿手改**，下次 sync 会覆盖 |
| 业务仓 \`.cursor/rules/**/*.local.mdc\` | 本仓库手写，sync **不覆盖** |

## 重新同步

\`\`\`bash
cd ${skillsRoot}
npm run rules:sync -- --preset ${preset} --target ${targetRoot}
\`\`\`
`,
  'utf8',
)

console.log(`\n==> 完成: 同步 ${synced} 个文件 → ${rulesDest}`)
if (preset === 'uni-app') {
  console.log('==> 请确认已有 uni-app/project.local.mdc，承载本项目差异')
} else {
  console.log('==> 请确认已有 admin/project.local.mdc（可选），承载本项目差异')
}
process.exit(0)
