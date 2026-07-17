#!/usr/bin/env bash
# 委托给跨平台 Node 脚本（与 npm run skills:install 一致）
set -euo pipefail
cd "$(dirname "$0")/.."
exec node scripts/install-global-skills.mjs
