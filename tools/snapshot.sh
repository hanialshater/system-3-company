#!/usr/bin/env bash
# Commit and push whatever agents have written so far (chief-of-staff housekeeping).
cd "$(dirname "$0")/.." || exit 1
git checkout -q tsconfig.json 2>/dev/null
node tools/events.mjs backfill >/dev/null 2>&1 || echo "events backfill failed (continuing)"
git add -A .gitignore company content src .claude tools package.json package-lock.json next.config.mjs tsconfig.json vercel.json playwright.config.ts tests README.md CLAUDE.md .github 2>/dev/null
if git diff --cached --quiet; then git push -q origin HEAD 2>/dev/null; echo "nothing new to commit; pushed $(git rev-parse --short HEAD)"; exit 0; fi
git commit -qm "${1:-Snapshot: work in progress from running agents}

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01WqifbxDhiWUBZLHjLh8HSF"
for i in 1 2 3 4; do git push -q origin HEAD 2>/dev/null && { echo "pushed $(git rev-parse --short HEAD)"; exit 0; }; sleep $((2**i)); done
echo "push failed"; exit 1
