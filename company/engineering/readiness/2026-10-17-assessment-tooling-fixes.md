# Operational readiness: external-assessment tooling fixes (dispatch-check hard refusals and B1 budget, mailbox reserve-before-launch, memory citations and --craft-only, ritual held-by-record)

```
change: dispatch-check refuses an unknown role and a missing batch file in every slot mode and gates a source's project through ledger.mjs gate (B1); the mailbox drain reserves a request (run id, lease) before launch, with launched/release and lease-expiry recovery; memory citations must resolve, read --craft-only; a ritual is held only by a committed record (launch-review also by publish events)
change-tier: 1
paths: tools/dispatch-check.mjs, tools/lib/slots.mjs, tools/lib/ledger.mjs, tools/ledger.mjs, tools/lib/mailbox.mjs, tools/mailbox.mjs, tools/memory.mjs, tools/org/memory-policy.mjs, tools/lib/rituals.mjs, tools/lib/rituals.d.mts, tools/lib/ritual-records.mjs, tools/lib/ritual-records.d.mts, tools/rituals-due.mjs, src/lib/hq.ts, company/rituals/triggers.json, company/ops/runbook-mailbox.md, company/ops/changelog.md, tests/dispatch/hard-budget.test.mjs, tests/mailbox/mailbox.test.mjs, tests/memory/memory.test.mjs, tests/rituals/rituals.test.mjs
author: tools-lead
self-check: tools-lead
board: none yet (chief of staff to file; source: company/reviews/org/2026-10-17-external-assessment.md §1 findings 2, 3, 5; §2; §3)
risks: proposes none; see 7
links: company/reviews/org/2026-10-17-external-assessment.md; company/engineering/readiness/2026-10-16-slot-ledger-tier-confirmation.md (dispatch-check is tier 1 by the path map); package.json wiring is separate, tier 2: company/engineering/readiness/2026-10-17-assessment-verify-scripts.md
```

Tier 1: no rule in company/engineering/readiness/paths.json matches these code paths (default 1; company/** is 0). Nothing here touches deploy, the event API, auth, learner data or a protected path. `src/lib/hq.ts` is HQ, which is off in production (`hqEnabled`). principal-engineer-ops classified dispatch-check as service `dispatch-control` (T2). This change makes it refuse more, so it can now block a dispatch that it let through before. Sections 1 and 3 cover that.

## 1. What can fail
- **B1 refuses live work today.** On 2026-10-17 `ledger.mjs gate` fails `history` (6.5M of 2.5M), `behavioral-econ` (2.9M of 1.8M) and `lifehacks-engine-v2` (3.1M of 3.0M). Every batch item tagged to them is now refused, in warn mode too. This is token-budget.md section 4 ("100%: gate fails for new dispatches") working as written. It was not enforced before, because nothing called the gate. Who sees it: the chief of staff, at dispatch.
- **The ledger is stale or wrong.** The gate reads today's register and ledger (assessment §5, budgeting). A missing top-up record blocks a project that the founder has funded. The remedy is the register (portfolio-manager), not the tool.
- **The mailbox lease is too short.** If the chief of staff takes more than 30 minutes between the drain and the start, the lease expires. dispatch-check then refuses the run ("drain again"). Nothing is lost: drain again, or use `--lease=<min>`.
- **Memory add refuses a citation.** It refuses a path that does not exist in the worktree, such as a file on another branch. The agent gets a clear error and can cite a path that exists in its checkout.
- **Worst case:** an R1 false positive. Records are timed by their last non-merge commit (75 of 77 agree with the old reader; 2 are earlier by 33 min and 1.5 h), and the WBR, retro and digest still block builds. On 2026-10-17 the result is the same for those three (wbr and founder-digest due, retro ok). demo-crit turns due, but it does not block anything.

## 2. How we would know
dispatch-check prints each refusal with its rule (`B1 budget <id> … (node tools/ledger.mjs gate --project=<id>)`, `S1/S2 … [refused in every slot mode]`, `M1 … reserved by run …`). `mailbox.mjs status` shows reserved and lease-expired counts. `node tools/rituals-due.mjs` shows `[held: record …]` for each ritual. There is no meter for refusals per day. That is a gap. Proposed below, not added.

## 3. How to roll back
`git revert <sha>` of this commit, with no data loss. Markers written by the new mailbox (`*.claimed` with a state, `*.released-*.json`, `*.expired-*.json`) are gitignored spool. The old code reads a `.claimed` file as "claimed", so a revert keeps refusing a second launch. The chief of staff can roll back without the founder. Faster, narrower rollback for B1 alone: none is built. B1 has no off switch on purpose, because the founder's budget rule has none.

## 4. Capacity
dispatch-check reads projects.json and ledger.jsonl once per call when a source names a project, which adds well under 0.1 s. rituals-due now runs one `git log` over two folders instead of 77 per-file calls. The drain writes one small marker per request. No build, no dev server, no new process.

## 5. Security
No new routes. HQ's `ritualsDue()` runs one local `git log` (15 s timeout), and only where HQ runs (off in production). `/*turbopackIgnore: true*/` is on its `process.cwd()`. Build tracing was **not** verified in this run (no `npm run build` by brief).

## 6. Data
Writes only gitignored mailbox markers (company/ops/mailboxes/, main checkout) and memory run files (unchanged). No learner data.

## 7. Risks
Proposed to principal-engineer-ops, not written: (a) re-score dispatch-control "a false refusal freezes dispatch" for B1 on stale ledger data (L3 I2 while History and Behavioral are over budget); (b) no meter for dispatch-check refusals per rule. The mailbox design closes assessment finding 3's duplicate-launch path. A crash after the start with no event written is still offered again (runbook §2, recovery).

Tests: `npm run test:dispatch` 122 pass, 3 skipped (slow), 0 fail; `npm run test:mailbox` 11/11; `npm run test:memory` 11/11; `node --test tests/rituals/*.test.mjs` 6/6; `npm run test:hq` 65/65; `npm run check` passed; `npm run typecheck` passed.
