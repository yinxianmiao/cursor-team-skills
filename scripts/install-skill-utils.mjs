import { spawnSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs'
import { homedir, tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export const skillsDir = join(homedir(), '.agents', 'skills')

/** 本仓库根目录（scripts/ 的上一级） */
export const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const GIT_RETRIES = 3

function git(args, cwd) {
  const r = spawnSync('git', args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
    cwd,
  })
  return r.status === 0
}

export function run(cmd, args) {
  const r = spawnSync(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32' })
  return r.status === 0
}

export function skillReady(skill) {
  return existsSync(join(skillsDir, skill, 'SKILL.md'))
}

export function runNpxInstall(npxArgs) {
  if (process.env.SKILLS_CLONE_TIMEOUT_MS) {
    // 传给 skills CLI（若支持）
  }
  return run('npx', ['-y', 'skills', 'add', ...npxArgs])
}

function cloneRepo({ gitRepo, gitSubPath, gitSparse, cloneDir }) {
  for (let i = 1; i <= GIT_RETRIES; i += 1) {
    console.log(`    Git 克隆 第 ${i}/${GIT_RETRIES} 次...`)
    rmSync(cloneDir, { recursive: true, force: true })

    let ok = false
    if (gitSparse) {
      ok = git(
        [
          'clone',
          '--depth',
          '1',
          '--filter=blob:none',
          '--sparse',
          gitRepo,
          cloneDir,
        ],
        undefined,
      )
      if (ok) {
        ok = git(['sparse-checkout', 'set', gitSubPath], cloneDir)
      }
    } else {
      ok = git(['clone', '--depth', '1', '--single-branch', gitRepo, cloneDir], undefined)
    }

    if (ok) return true
  }
  return false
}

/** 浅克隆（大仓库用 sparse）并复制到 ~/.agents/skills/<skill>/ */
export function installFromGit({ gitRepo, gitSubPath, skill, gitSparse }) {
  const dest = join(skillsDir, skill)
  const tmpBase = mkdtempSync(join(tmpdir(), 'team-skills-'))
  const cloneDir = join(tmpBase, 'repo')

  console.log(
    `==> Git 回退: ${gitRepo} (${gitSubPath})${gitSparse ? ' [sparse，仅拉子目录]' : ''}`,
  )
  mkdirSync(skillsDir, { recursive: true })

  if (!cloneRepo({ gitRepo, gitSubPath, gitSparse, cloneDir })) {
    rmSync(tmpBase, { recursive: true, force: true })
    return false
  }

  const src = join(cloneDir, gitSubPath)
  if (!existsSync(join(src, 'SKILL.md'))) {
    console.error(`错误: 未找到 ${join(gitSubPath, 'SKILL.md')}`)
    rmSync(tmpBase, { recursive: true, force: true })
    return false
  }

  rmSync(dest, { recursive: true, force: true })
  cpSync(src, dest, { recursive: true })
  rmSync(tmpBase, { recursive: true, force: true })
  return true
}

/** 从本仓库 localPath 复制到 ~/.agents/skills/<skill>/（每次覆盖，便于 pull 后更新） */
export function installFromLocal({ localPath, skill }) {
  const src = resolve(repoRoot, localPath)
  const dest = join(skillsDir, skill)

  if (!existsSync(join(src, 'SKILL.md'))) {
    console.error(`错误: 本仓未找到 ${join(localPath, 'SKILL.md')}`)
    return false
  }

  console.log(`==> 本仓复制: ${localPath} → ${dest}`)
  mkdirSync(skillsDir, { recursive: true })
  rmSync(dest, { recursive: true, force: true })
  cpSync(src, dest, { recursive: true })
  return true
}

export function installOne(entry) {
  const { skill, npxAttempts = [], gitRepo, gitSubPath, gitSparse, optional, localPath } = entry

  if (process.env.SKIP_OPTIONAL_SKILLS === '1' && optional) {
    console.log(`\n==> 跳过 ${skill}（环境变量 SKIP_OPTIONAL_SKILLS=1）`)
    return true
  }

  // 自研 Skill：始终从本仓刷新
  if (localPath) {
    console.log(`\n==> 安装 ${skill}（本仓库）`)
    return installFromLocal({ localPath, skill }) && skillReady(skill)
  }

  if (skillReady(skill)) {
    console.log(`\n==> 跳过 ${skill}（已存在 SKILL.md）`)
    return true
  }

  console.log(`\n==> 安装 ${skill}${optional ? '（可选）' : ''}`)

  for (const args of npxAttempts) {
    console.log(`    尝试: npx skills add ${args.join(' ')}`)
    if (runNpxInstall(args) && skillReady(skill)) {
      return true
    }
  }

  if (gitRepo && gitSubPath) {
    if (installFromGit({ gitRepo, gitSubPath, skill, gitSparse }) && skillReady(skill)) {
      return true
    }
  }

  return false
}
