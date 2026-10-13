# Decision: builders pull work from a locked queue

owner: chief-of-staff · date: 2026-10-13 · status: accepted (founder suggestion: "a lock file or ask-for-work mechanism")

## Context
Waves gave one builder per domain, with a fixed "next 10 briefs" each. Two builders in one domain would pick the same briefs. So parallelism was capped at 9 (the number of domains), and the domains with briefs left idled, waiting for their one builder.

## Decision
- `tools/claim.mjs` hands out briefs one at a time under an exclusive lock: a file created with O_EXCL in `company/ops/claims/` in the main checkout, which every worktree shares. Locks are coordination state and are not committed. The event log and git record what was built.
- Known-wrong briefs are listed in `company/ops/brief-skips.json` and never handed out.
- Stale locks (more than 6 h, not done) can be re-taken. `seed-worktrees` reconstructs claims after a restart. `--from-end` lets a queue builder share a domain with an older builder that does not use the queue.
- Builders' onboarding docs (`tools/org/roles.mjs`) and the operating loop now describe the queue. The 2026-10-12 waves section is replaced.

## Consequences
- Parallelism is bounded by the budget, not by the domain count.
- A builder can no longer be told "the next 10". It is told "up to N from the queue".

## Objections that travel
- **Local file locks only work on one machine.** At EDD-003 stage 2 (domain-split repos or several machines) the queue needs a shared store. Owner: tools-lead, tracked in EDD-003.
- **A builder that dies holds its brief for 6 h.** Accepted; a restart runs `seed-worktrees`.
