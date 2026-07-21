#!/bin/bash
# SessionStart hook — installs the design skills so they're available in
# Claude Code on the web sessions for this repo (без коміту 141 файлу в git).
# Runs only in the remote/web env; idempotent; never fails the session start.
set -uo pipefail

# Тільки у веб-середовищі (на локальній апці скіли вже глобальні)
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

PROJ="${CLAUDE_PROJECT_DIR:-$PWD}"
SKILLS="$PROJ/.claude/skills"
mkdir -p "$SKILLS"

# 1) ui-ux-pro-max (+ bundled skills) через npm CLI — ідемпотентно
if [ ! -f "$SKILLS/ui-ux-pro-max/SKILL.md" ]; then
  echo "[session-start] installing ui-ux-pro-max…"
  if npm install -g ui-ux-pro-max-cli >/dev/null 2>&1 \
     && ( cd "$PROJ" && uipro init --ai claude >/dev/null 2>&1 ); then
    echo "[session-start] ui-ux-pro-max ready"
  else
    echo "[session-start] WARN: ui-ux-pro-max install failed (мережа?)"
  fi
else
  echo "[session-start] ui-ux-pro-max already present"
fi

# 2) frontend-design з anthropics/skills — ідемпотентно
FD="$SKILLS/frontend-design"
if [ ! -f "$FD/SKILL.md" ]; then
  echo "[session-start] installing frontend-design…"
  mkdir -p "$FD"
  BASE="https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design"
  if curl -fsSL "$BASE/SKILL.md" -o "$FD/SKILL.md" \
     && curl -fsSL "$BASE/LICENSE.txt" -o "$FD/LICENSE.txt"; then
    echo "[session-start] frontend-design ready"
  else
    echo "[session-start] WARN: frontend-design fetch failed (мережа?)"
    rm -f "$FD/SKILL.md"
  fi
else
  echo "[session-start] frontend-design already present"
fi

exit 0
