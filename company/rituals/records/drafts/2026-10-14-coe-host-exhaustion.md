# Correction of Error: 2026-10-14: shared host exhausted (disk full several times, load 25 to 60 on 4 CPUs)

owner: principal-engineer (author, W-524) · reviewers: evaluation-steward, pattern-librarian
status: DRAFT. Timeline and evidence by principal-engineer-ops. **Ops is inside this incident's area** (W-486, the disk-full item, was assigned to ops), so this draft is testimony from the affected area: the author verifies each fact before using it. Five whys, "What allowed it" and actions are the author's alone.
incident: ev-d362239a23 (SEV2, declared 2026-10-14 15:27 UTC in company/engineering/operations/2026-10-14-ops-review.md)
final path: company/rituals/records/2026-10-14-coe-host-exhaustion.md (the author moves this file there with `git mv` and sets `status: final`; `tools/dispatch-check.mjs` R2 only sees files directly in company/rituals/records/)

## What happened (facts, timestamps, links)
All times UTC, 2026-10-14. Sources: the retro and its corrections, the ops review, the operating audit, board items, the host.
- All day: up to 20 agents in flight, 18 of them builders (event log peak, retro corrections). operating-loop.md said about 8 agents and 3 builders; the accepted usage-upgrade record said 30/10; neither was set from the 4-CPU host.
- All day: load average 25 to 60 on 4 CPUs (retro). Dev pages took 15 s to 12 min; `reveal-fit` timed out on the shared dev server (W-664: 50 to 105 s per load against a fixed 15 s wait). Official QA could not run until load fell to about 5 at 18:00.
- Builders shared the main tree; one half-written `Demo.tsx` broke the dev server for every agent for 10 to 20 min, at least twice (retro, "What hurt" 2).
- Several times: disk full. About 15:10, `/` at 100% with about 15 MB free; git could not write refs and tools failed with ENOSPC (W-486). Causes named on the board: 20+ stale `.next-*` build dirs and 11 to 12 git worktrees (W-524, ops review scorecard).
- Between 15:10 and 15:25: about 11 GB of caches cleared by hand; `/` at 65%, 14 GB free. **Sources disagree on who:** the ops review kudos credits the founder, the retro ("What hurt" 6) says the chief of staff. Author to settle it. Removing merged worktrees was blocked as destructive, correctly; they remain.
- 15:25: load 26.8 / 25.1 / 22.1; 12 worktrees; 8 `.next*` dirs on disk (ops review scorecard). 15:27: SEV2 declared.
- 18:25 `99573b8`: `tools/dispatch-check.mjs` added (C1 at most 8 agents, C2 at most 3 builders, C3 worktree-only builds, C4 load and disk guard).
- 17:51 `0225fba`: `REVEAL_FIT_TIMEOUT_MS` added to `tools/reveal-fit.mjs` (W-664), a workaround for the slow host, not a fix.
- 18:58 (while drafting): load 2.9 / 4.1 / 7.5; `df -h /` shows 7.7 GB available (81%). `dispatch-check --kind=build` fails C4 disk (under 10 GB) as well as R2. **Disk is falling again** after the clean-up.

## Impact (learners affected, lessons, claims)
- No learner impact found. No lost commit found.
- Throughput: builders spent much of their 12-minute median run waiting; official QA was deferred to 18:00; every builder needed raised timeouts or a private tool copy.
- Lessons: at least two dev-server outages from one broken file in the shared tree; QA results from the overloaded period ran with raised timeouts (author to say whether any QA verdict needs a rerun).
- Spend: 1.98M tokens per hour over 386 runs in the last 24 h (ops review section 4), much of it waiting.

## Five whys (stop when the answers stop being about people)
Author to write. Questions the evidence leaves open:
- What sets concurrency today: the host, the token budget, or the operator's judgement? Which of the three caps on record was in force?
- Why do build dirs accumulate (`.next-<tag>` per run?) and nothing prunes them?
- Why did no tool refuse a build at load 25 or with 15 MB free before 18:25?
- Who owns the host? No role does today (W-533).

## What allowed it
Author to write.

## Actions (each changes a mechanism; tracked on the board until done)
Author to keep, change or drop each row, and add the root-cause fix. Rows below are mechanisms already in place or on the board today, listed so they are linked, not as conclusions.

| Action | Mechanism changed | Owner | Board id |
|---|---|---|---|
| Preflight refuses dispatch over 8 agents / 3 builders, at load above 2 x CPUs, or under 10 GB free | `tools/dispatch-check.mjs` C1, C2, C4 (in place, proposed in the operating audit; founder to ratify W-712; review and tests W-715) | tools-lead (review), chief-of-staff (runs it) | W-715, W-712 |
| Builders only in worktrees, own dev port and dist dir; the main tree serves evaluators | `isolation: worktree` + dispatch-check C3; worktree lifecycle tooling | tools-lead | W-526 |
| Build-dir and disk policy: one `.next` per worktree, prune stale dirs, refuse builds under 10 GB | build/QA tooling | tools-lead | W-525 |
| Interim cap: at most 2 concurrent builds/QA runs; disk checked before each wave | dispatch checklist | chief-of-staff | W-532 |
| QA tooling tolerates a slow host without false errors | `REVEAL_FIT_TIMEOUT_MS` in `tools/reveal-fit.mjs` (done; a workaround) | platform-engineer | W-664 |
| Spend is visible per run and project, so "more agents" has a cost on the page | token ledger `tools/ledger.mjs` + `[project:<id>]` tags in dispatch | chief-of-staff (loop), chief-of-staff-ceo-office (preflight rule) | W-721, W-720 |
| Second machine or self-hosted runner against a hard cap (targets: load < 8, page < 5 s) | capacity decision record | principal-engineer; founder approves spend | W-531 |
| Name a permanent owner for the host | org | chief-of-staff-ceo-office | W-533 |

## Claims and decisions to send back to review
- QA verdicts recorded during the overload with raised timeouts: author to decide whether any must be rerun (qa-tester).
- `company/decisions/2026-10-14-usage-upgrade.md` (30/10 cap) rested on token budget alone; the proposed `2026-10-14-operating-caps-and-intake.md` (8/3) replaces it once ratified (W-712).

## Pattern update
Pattern librarian, after the author's root cause. This is the second case for the 10-13 COE's candidate "capacity is a budget, not a CPU count"; the ops review proposes "every shared resource needs an allocator before it needs a cleanup".
