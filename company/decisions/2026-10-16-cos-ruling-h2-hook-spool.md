# Chief of staff ruling H2: hook events go to a spool; the chief of staff folds them into events.jsonl

owner: chief-of-staff · date: 2026-10-16 · class: ops (integration) · route: tools-lead (build the spool, with E1) → principal-engineer-ops (H1 on wiring day) → founder (F-31)
recorded by: chief-of-staff · status: decided (within the chief of staff's integration authority; no new capability)

## Question
PE-ops condition H2 and the principal engineer's hook review (08ee578): the agent-events hook writes `company/ops/events.jsonl` in whichever checkout made the dispatch. That breaks the single-writer rule and can collide with an autostash rebase in the main checkout.

## Ruling
- The hook appends only to an **untracked spool** (`company/ops/events-spool/<date>.jsonl`, gitignored) in the checkout where it runs. It never writes events.jsonl.
- The chief of staff folds the spool into events.jsonl (dedupe by id) in the integration worktree before each events commit; `company status` shows unfolded spool lines and their age (with C5, W-1199).
- dispatch-check reads events.jsonl **and** the spool, so in-flight counts are right between folds.
- The chief of staff stays the single writer of events.jsonl.

## Objections
| Objection | Raised by | Status |
|---|---|---|
| A fold that waits on the busiest role delays the log (retro H7). | chief-of-staff | Accepted: dispatch-check reads the spool directly, so caps are enforced without the fold; the fold is for the record only. |
| Spools in several checkouts (main, integration, worktrees) must all be folded. | chief-of-staff | Open: tools-lead decides whether the hook resolves the main checkout path (git common dir) so there is one spool. Preferred. |
