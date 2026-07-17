/**
 * 可选：用本仓库 skill-overlays/ 覆盖对应全局 Skill。
 * 自研 Skill 已由 skills/ 本仓复制安装；无 skill-overlays/ 时跳过。
 */
import { cpSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { skillsDir } from './install-skill-utils.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const overlaysRoot = join(root, 'skill-overlays')

function copyTree(src, dest) {
  if (!existsSync(src)) return 0
  mkdirSync(dest, { recursive: true })
  let n = 0
  for (const name of readdirSync(src)) {
    const s = join(src, name)
    const d = join(dest, name)
    if (statSync(s).isDirectory()) {
      n += copyTree(s, d)
    } else {
      cpSync(s, d)
      n += 1
    }
  }
  return n
}

export function applySkillOverlays() {
  if (!existsSync(overlaysRoot)) {
    console.log('==> 无 skill-overlays，跳过覆盖')
    return
  }
  console.log('==> 应用 skill-overlays →', skillsDir)
  for (const skill of readdirSync(overlaysRoot)) {
    const src = join(overlaysRoot, skill)
    if (!statSync(src).isDirectory()) continue
    const dest = join(skillsDir, skill)
    if (!existsSync(join(dest, 'SKILL.md')) && !existsSync(dest)) {
      console.warn(`  跳过 ${skill}（全局尚未安装）`)
      continue
    }
    const n = copyTree(src, dest)
    console.log(`  + ${skill} (${n} files)`)
  }
}

const isDirect = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]
if (isDirect) {
  applySkillOverlays()
}
