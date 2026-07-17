/**
 * 团队全局 Skills 一键安装（Windows / macOS / Linux）
 */
import { mkdirSync } from 'node:fs'
import { TEAM_SKILLS } from './skills-config.mjs'
import { installOne, run, skillsDir } from './install-skill-utils.mjs'

const continueOnError = process.env.CONTINUE_ON_ERROR === '1'

function need(cmd) {
  if (!run(cmd, ['--version'])) {
    console.error(`错误: 未找到 ${cmd}，请先安装。`)
    process.exit(1)
  }
}

need('node')
need('npx')
need('git')

console.log('==> 全局 Skills 目录:', skillsDir)
mkdirSync(skillsDir, { recursive: true })

if (!process.env.npm_config_registry) {
  console.log('==> 提示: npx skills 异常时可设 npm_config_registry=https://registry.npmjs.org')
}

console.log('==> 探测 GitHub...')
if (!run('git', ['ls-remote', '--heads', 'https://github.com/vercel-labs/skills.git', 'HEAD'])) {
  console.warn('警告: 无法稳定连接 GitHub。请开 VPN / 配置 Git 代理，或使用 README「离线分发」。')
  console.warn('       excalidraw-diagram-generator 来自超大仓库 awesome-copilot，国内常失败，可先跳过。')
  console.warn('       自研 uni-app / admin Skill 来自本仓库，不依赖 GitHub。')
}

let ok = 0
let fail = 0
let optionalFail = 0

for (const entry of TEAM_SKILLS) {
  if (installOne(entry)) {
    ok += 1
  } else if (entry.optional) {
    optionalFail += 1
    console.warn(`\n[可选] 未装上 ${entry.skill}（不影响其余必选）`)
    console.warn('  → 开 VPN 后重跑 npm run skills:install')
    console.warn('  → 或请已装成功的同事发离线包（pack-global-skills-bundle.sh）')
    console.warn('  → 或暂时跳过: SKIP_OPTIONAL_SKILLS=1 npm run skills:install')
  } else {
    fail += 1
    console.error(`失败: ${entry.skill}`)
    if (!continueOnError) process.exit(1)
  }
}

console.log(`\n==> 完成: 成功 ${ok} 项, 必选失败 ${fail} 项, 可选未装 ${optionalFail} 项`)
console.log('==> 下一步: npm run skills:verify')
console.log('==> 业务仓请再跑: npm run rules:sync -- --preset <uni-app|admin> --target <业务仓>')
console.log('==> 必选 Skills 全部 [OK] 后即可重启 Cursor；可选 excalidraw 可稍后补装')

if (fail > 0) process.exit(1)
process.exit(0)
