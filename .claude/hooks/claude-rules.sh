#!/bin/bash
# SessionStart hook — CLAUDE START.
# Injects a hardcoded, non-negotiable directive into every session so that
# Claude treats "Part II. Rules for Claude" from CLAUDE-CODE-GUIDE.md as
# binding design law. Runs in ALL environments (web + desktop). Idempotent,
# never fails the session start.
set -uo pipefail

PROJ="${CLAUDE_PROJECT_DIR:-$PWD}"
GUIDE="$PROJ/CLAUDE-CODE-GUIDE.md"

cat <<'DIRECTIVE'

============================================================================
 CLAUDE START — MANDATORY PROJECT DESIGN RULES (auto-loaded — DO NOT DEVIATE)
============================================================================

This project is governed by a fixed design ruleset. Before producing or
editing ANY design, layout, CSS, component, page, or visual output, you MUST
read and obey "Part II. Rules for Claude" from CLAUDE-CODE-GUIDE.md
(reproduced verbatim below).

These rules are BINDING and NON-NEGOTIABLE. They override your own defaults,
habits, and general "best practices". Specifically:

  1. Apply every rule in Part II exactly as written. Do not reinterpret,
     soften, "improve", or skip any of them.
  2. Never fall back to generic AI / template defaults (default fonts,
     default spacing, default blue links, centered everything, etc.). If a
     value or pattern is defined in Part II, that value wins — always.
  3. If a design decision is not covered by Part II, choose the option that
     is most consistent with the spirit and existing tokens of Part II, and
     state briefly which rule you extrapolated from.
  4. If a user request conflicts with Part II, follow the user's explicit
     request, but flag the conflict in one sentence so the deviation is a
     conscious choice — never a silent drift.
  5. Treat the breakpoints, section structure, naming, colors, typography,
     spacing/radius, and component rules in Part II as the single source of
     truth for this repository.

Do not restate these rules back to the user unless asked. Just follow them.

--------------------- BEGIN: Part II. Rules for Claude ------------------
DIRECTIVE

if [ -f "$GUIDE" ]; then
  awk '/^# Part II\./{f=1} /^# Part III\./{f=0} f' "$GUIDE"
else
  echo "(!) CLAUDE-CODE-GUIDE.md not found at $GUIDE — rules could not be loaded."
fi

cat <<'DIRECTIVE'
---------------------- END: Part II. Rules for Claude -------------------
============================================================================
DIRECTIVE

exit 0
