/**
 * 一次同步 Rules + Prompts 到业务仓
 *
 * 用法:
 *   npm run sync -- --preset uni-app --target /path/to/project
 *   npm run sync -- --preset admin --target /path/to/project
 *
 * 等价于依次执行 rules:sync 与 prompts:sync（相同 --preset / --target / --from）。
 * 仅同步其一仍可用: npm run rules:sync / npm run prompts:sync
 */
import { spawnSync } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

function parseArgs(argv) {
  const out = { preset: '', target: '', from: '', help: false, rest: [] }
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i]
    if (a === '--preset' || a === '-p') out.preset = argv[++i]
    else if (a === '--target' || a === '-t') out.target = argv[++i]
    else if (a === '--from' || a === '-f') out.from = argv[++i]
    else if (a === '--help' || a === '-h') out.help = true
    else out.rest.push(a)
  }
  return out
}

const args = parseArgs(process.argv)
if (args.help) {
  console.log(`用法: npm run sync -- --preset uni-app|admin --target <项目根>

一次写入:
  .cursor/rules/**   （rules:sync）
  docs/prompts*      （prompts:sync）

示例:
  npm run sync -- --preset uni-app --target /真实路径/你的-uni-app项目
  npm run sync -- --preset admin --target /真实路径/你的-后台项目

仅同步其一:
  npm run rules:sync -- --preset … --target …
  npm run prompts:sync -- --preset … --target …
`)
  process.exit(0)
}

if (!args.preset || !['uni-app', 'admin'].includes(args.preset)) {
  console.error(
    `错误: 请指定 --preset uni-app|admin（当前: ${args.preset || '(空)'}）`,
  )
  process.exit(1)
}
if (!args.target) {
  console.error('错误: 请指定 --target <业务仓库根目录>')
  process.exit(1)
}

const forward = ['--preset', args.preset, '--target', args.target]
if (args.from) forward.push('--from', args.from)
forward.push(...args.rest)

function run(script) {
  console.log(`\n======== ${script} ========`)
  const r = spawnSync(process.execPath, [resolve(root, 'scripts', script), ...forward], {
    cwd: root,
    stdio: 'inherit',
    env: process.env,
  })
  if (r.status !== 0) {
    process.exit(r.status ?? 1)
  }
}

run('sync-rules.mjs')
run('sync-prompts.mjs')

console.log(`\n==> 全部完成: preset=${args.preset} → ${args.target}`)
console.log('    rules → .cursor/rules/  |  prompts → docs/')
process.exit(0)
