# Founder decision F-31: wire the agent hooks and install the commit guard

owner: founder (recorded by chief-of-staff)
date: 2026-10-16
class: ops (session configuration and repository settings)
route: chief-of-staff (applies .claude/settings.json and core.hooksPath; runs H1 and W2) → principal-engineer-ops (re-scores R-010, R-017 after one round) → tools-lead (owns the hooks)
recorded by: chief-of-staff
status: decided, applied 2026-10-16

## What the founder said
Asked "F-31: wire the two reviewed hooks and install the commit guard? (Kenji and ops have both approved. Undo is one settings revert plus `git config --unset core.hooksPath`.)", the founder chose **"Yes, all three (Recommended)"**.

## Decided
1. `.claude/settings.json` gains: Bash PreToolUse → `.claude/hooks/no-pkill.mjs`; Agent|Task PreToolUse and PostToolUse, and SubagentStop → `.claude/hooks/agent-events.mjs` (writes only the spool; the chief of staff folds it in the integration worktree).
2. The main checkout gets `git config core.hooksPath tools/git-hooks` (the pre-commit guard).
3. Wiring-day checks: PE-ops H1 (a real dispatch shows its `hk-` dispatch and report) and W2 (pkill -f refused; explicit-path commit with "pkill -f" in the message passes; the autostash push routine passes; a tagged stash passes; a `$(cat <<'EOF' …)` message with a `git stash pop` line passes).

Approvals this rests on: company/engineering/readiness/2026-10-16-agent-events-hook-approval.md (fee2b05), 2026-10-16-commit-and-process-guards-approval.md (90fc0de), 2026-10-16-e1n1-approval.md (e1c9162, fdc1862); company/engineering/reviews/2026-10-16-agent-hooks-wiring-review.md (08ee578, 4be84f6).

## Objections
| Objection | Raised by | Status |
|---|---|---|
| Hooks may not fire for subagent tool calls (about 70% they do). | principal-engineer-ops, principal-engineer | Open: H1 includes one subagent call; if they don't fire, the backfill stays the record for subagents. |
| A false refusal from no-pkill blocks ordinary work. | principal-engineer | Accepted with a revoke rule: remove the entry if a real command is wrongly refused, and file the case as a test. |
| F5: fold crashes above ~120k events per spool file. | principal-engineer-ops | Accepted, not gating: impossible at the hook's rate; tools-lead fixes (W-1278). |

## What would make this record wrong
- H1 shows no `hk-` events for real dispatches (unwire agent-events, keep backfill).
- Open hook dispatches make dispatch-check refuse a real dispatch (PE-ops H3: unwire).
