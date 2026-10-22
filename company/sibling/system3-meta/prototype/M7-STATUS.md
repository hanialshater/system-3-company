# M7 status: built, first cycle slice run, full 24 h cycle deferred to the big run (2026-10-22)

owner: vp-meta · plan: [plans/2026-10-21-m4-m7-plan.md](../plans/2026-10-21-m4-m7-plan.md) §M7 (with its dated "Built" and "Finish review" notes) · record: `live/m7-record/` · branch: `meta/m7` (pushed)

## Built and tested

| K | Feature |
|---|---|
| K18 | Ritual scheduler: `rituals.mjs due` reads the company's `rituals-due.mjs --json` and places one ritual order per DUE ritual, in operating-loop order. Each record is scaffolded with the company's own template or `company ritual`, checked (a decision; every objection answered or carried; a stand-in stated) and committed on the integration branch. |
| K19 | Several flows per spec (`lesson`, `ritual`), plus `order new --flow`. |
| K20 | Launch gate: the company's `dispatch-check.mjs` runs before every builder launch. A refusal reserves nothing, logs a `launch-gate` event and sends one notice to the chief of staff. |
| K21 | Event export at the company's units: one review or verify per agent session, one publish per tick, one merge per lesson. Launches go out as dispatch and report. |
| K22 | Resumable serve: a stop or resume is recorded; jobs and leases are re-adopted or marked stale. Tested with a forced restart. |
| K23 | A code stage's acts on other orders: Demo Crit's keep/revise/kill table maps to `order reopen` and `order cancel`, with the chair's authority checked. |
| Other | **Handoff:** after the second WBR, a handoff order writes the dated entry at the top of progress.md, and the run ends. **Board mirror:** with a merge-time renumber of W ids. **Cleanup:** workspace cleanup on done. **Ritual workspaces:** capped at 2 at once. |

Tests: prototype 262/262, adapters 197 passing and 3 skipped (the env-gated real builds). Every step was adversarially reviewed: M7 build 23 findings and M7 finish 14, all fixed or recorded for the founder.

## The live slice (15:32 to 15:50 UTC, stopped by the founder: "we are still developing")

- **Spec:** `specs/s3c-m7.json`, kernel f7b8361e22c7.
- **Orders:** 5 cs lesson orders (the founder approved A-1..A-5) plus the 8 rituals the scheduler placed at the first tick.
- **Cost:** $8.08, 6 finished sessions. Then the launcher was stopped and the stray QA jobs killed.

**4 overdue rituals held and committed by Meta in 17 min.** Founder digest (98 h late), WBR, design review (chaired by head-of-product, standing in for design-lead) and Demo Crit. Each has a real company-format record on `meta/m7`, and `rituals-due.mjs` shows all four as **ok**, where they were DUE before.

**Where the rest was when stopped:**
- **Rituals:** vertical-review at check; ops-review, rnd-review and project-review being run.
- **Lessons:** O-1..O-3 built and in QA; O-4 and O-5 in build.

**The exports ran on every tick.** The founder inbox, the company events and the board mirror were each committed on `meta/m7` by the chief of staff's code step.

**Found live:**
1. **The design review saw no artifacts.** Walkthrough sheets live only in an order's worktree (`artifacts/` is gitignored), and I had removed the M6 worktrees to free disk. Rituals that judge lessons need the walkthroughs kept somewhere durable, for example copied to the integration worktree or a run artifact dir at ship.
2. **The host guard held sessions** (`host:hold`) while three `next build`s ran on 4 CPUs. Expected, and it recovered by itself.

## Exit criteria: where M7 stands

| # | Criterion | State |
|---|---|---|
| 1 | Every ritual DUE at cycle start held and committed | 4 of 8 in the slice; the rest were in progress when stopped |
| 2 | Rituals triggered by the cycle's events held too | not reached |
| 3 | dispatch-check before every builder launch (R1 restored) | wired, and it ran before every build launch in the slice; the full count is not scored |
| 4 | Every order mirrored on the board, `company check` clean | the mirror ran on every tick; not scored at the end |
| 5 | A progress.md handoff by the chief-of-staff role | built; not reached (it needs the second WBR, about 24 h) |
| 6 | Demo Crit decisions map onto orders | built (K23); this Demo Crit decided about lessons from earlier runs, so its acts go to the chief of staff |

**Verdict: M7 is built, and its machinery has worked live once. M7 is *not* reached as a milestone.** The exit needs one full event-driven cycle, about 24 h of wall clock, which is deferred to the big run on the founder's call.

## Before the big run

1. Keep the walkthrough artifacts durable (finding 1).
2. Decide the event units: merges per lesson, or per batch (plan, "Finish review").
3. Decide whether the main checkout's dispatch-check should see Meta's builders (the events spool).
4. Ratify the restatements in the plan's §M4 to §M7 notes:
   - the M4 dry-run gate;
   - dispatch-check `--source=§4:…`;
   - stand-in chairs;
   - the title block restored at the top of progress.md.
5. Resume from `/home/user/meta-runs/m7` (K22), or start a fresh cycle from `meta/m7`.
