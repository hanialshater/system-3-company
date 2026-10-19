### 2026-10-17 · assessment-2026-10-17-tooling · tools-lead
- did: Acted on the external assessment: dispatch-check hard S1/S2 + B1 ledger gate, mailbox reserve-before-launch, memory citations must exist + read --craft-only, rituals held by committed record; commits d11cfca7c, 9733f993e (tier 1) and 9824b61bc (package.json, tier 2, held)
- learned: B1 refuses history, behavioral-econ and lifehacks-engine-v2 dispatches today: the gate existed but nothing called it (company/engineering/readiness/2026-10-17-assessment-tooling-fixes.md)
- learned: Old rituals-due timed records by git log -1 per file, which can return a merge commit; one git log --name-only skips merges: 75 of 77 agree (tools/lib/ritual-records.mjs)
- know: The worktree guard refuses heredocs and loops with variables around npm or git: use Write/Edit and plain one-line commands (company/engineering/readiness/2026-10-17-assessment-tooling-fixes.md)
- know: package.json is tier 2 in the path map: keep script wiring in its own commit with its own readiness record (company/engineering/readiness/paths.json)
- open: PE-ops approval of the verify-scripts record before merge (company/engineering/readiness/2026-10-17-assessment-verify-scripts.md)
- open: Decision F-42 design point 3 still says mark claimed after start; the runbook now reserves first, so the CoS should annotate it (company/decisions/2026-10-16-founder-mailbox-dispatch.md)
- open: next build not run for the new recordEvents import in HQ; check function traces before a deploy branch takes it (src/lib/hq.ts)
