# Pending patches (saved 2026-10-17 by the chief of staff)

Work that is finished but waits on an approval, saved here so it survives the session's container. Apply with `git am <dir>/*.patch` on a branch from the then-current head; resolve conflicts by re-running the generators, not by hand.

| Dir | What | Waits on | Board |
|---|---|---|---|
| `onboarding-reconciliation/` | CEO office: one writer for board/progress, 14/3 caps from tools/org/caps.mjs, Sonnet builders, generator drift test, portfolio-manager scope, handoff shape, COE mechanism states, lean-lane proposal (4 commits, base c31c1fab) | founder ratifies the CLAUDE.md and working-agreement text in the patch's company/decisions/2026-10-17-onboarding-reconciliation.md. Note: the COE template, handoff shape and lean-lane proposal in this series are not yet on the branch either | W-1687 |
| `tools-verify-scripts/` | tools-lead tier 2: package.json `verify` runs test:rituals and an informational ledger summary (commit 9824b61bc) | principal-engineer-ops approval (company/engineering/readiness/2026-10-17-assessment-verify-scripts.md, inside the patch) | W-1682 |
