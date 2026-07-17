import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { TEAM_SKILLS } from './skills-config.mjs'
import { skillsDir } from './install-skill-utils.mjs'

let requiredOk = 0
let requiredMissing = 0
let optionalOk = 0
let optionalMissing = 0

console.log('全局目录:', skillsDir, '\n')

for (const { skill, optional } of TEAM_SKILLS) {
  const skillFile = join(skillsDir, skill, 'SKILL.md')
  const installed = existsSync(skillFile)

  if (optional) {
    if (installed) {
      console.log(`  [OK]   ${skill}（可选）`)
      optionalOk += 1
    } else {
      console.log(`  [可选缺失] ${skill}`)
      optionalMissing += 1
    }
  } else if (installed) {
    console.log(`  [OK]   ${skill}`)
    requiredOk += 1
  } else {
    console.log(`  [缺失] ${skill}`)
    requiredMissing += 1
  }
}

const requiredTotal = TEAM_SKILLS.filter((s) => !s.optional).length
console.log(`\n必选: ${requiredOk}/${requiredTotal} 已安装`)
if (optionalMissing > 0) {
  console.log(`可选 excalidraw-diagram-generator: 未安装（可 VPN 后补装或离线包）`)
}

if (requiredMissing === 0) {
  console.log(
    optionalMissing > 0
      ? '必选已全部就绪，可重启 Cursor。可选 Skill 可稍后补装。'
      : '全部就绪。若 Cursor 仍无技能，请重启 Cursor。',
  )
  process.exit(0)
}

console.log('请重跑: npm run skills:install')
process.exit(1)
