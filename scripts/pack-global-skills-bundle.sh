#!/usr/bin/env bash
# 将已安装的全局 Skills 打包，供无法访问 GitHub 的同事离线安装
set -euo pipefail

SKILLS_DIR="${HOME}/.agents/skills"
OUT_DIR="dist"
BUNDLE="${OUT_DIR}/cursor-global-skills-bundle.tar.gz"

if [[ ! -d "${SKILLS_DIR}" ]]; then
  echo "错误: 未找到 ${SKILLS_DIR}，请先安装 Skills。" >&2
  exit 1
fi

echo "==> 先验证本机是否装全"
bash "$(dirname "$0")/verify-global-skills.sh"

mkdir -p "${OUT_DIR}"
echo "==> 打包 ${SKILLS_DIR} -> ${BUNDLE}"
tar -czf "${BUNDLE}" -C "${HOME}/.agents" skills

echo "==> 完成。请将 ${BUNDLE} 发给同事。"
echo "    接收方: mkdir -p ~/.agents && tar -xzf cursor-global-skills-bundle.tar.gz -C ~/.agents"
