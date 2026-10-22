# M4 live run: one builder, three real lessons (2026-10-22)

owner: vp-meta (on the founder's "decide for me") · plan: [plans/2026-10-21-m4-m7-plan.md](../plans/2026-10-21-m4-m7-plan.md) §M4 · record: `live/m4-record/` (state, launches, serve log, launcher output, the operator fix)

## What ran

- **Spec:** `specs/s3c-lessons.json` (8 roles, the 9-stage lesson flow on the real adapters), kernel hash 38aaa5f3080a, frozen per run.
- **Repo:** `meta/m4` at 23aaeba66, in worktrees under `/home/user/s3c-wt/base/.claude/worktrees/<task>`.
- **Orders:** chief-of-staff to cm-math, 3M tokens each. The founder approved the three budgets in chat (A-1..A-3).
  - O-1 `one-metre-more-rope` (math.geometry #1)
  - O-2 `three-sticks-one-triangle` (#3)
  - O-3 `four-cards-one-rule` (math.discrete #1)
- **Launcher:** `--max-parallel=3 --workdir-from=order`.

## Result

All 3 orders `done` in **45 min** of wall clock for **$9.75** ($3.25 a lesson), over 9 sessions.

| Session | Role | $ | Cumulative tokens | Peak context | Turns | Min |
|---|---|---|---|---|---|---|
| 1 | cm-math (delegates all 3) | 0.41 | 239k | 43k | 6 | 0.8 |
| 2 | demo-builder (builds all 3) | 4.32 | 8.55M | 190k | 85 | 29.2 |
| 3 | fact-checker (3 lessons; revises O-1) | 1.33 | 1.45M | 86k | 33 | 4.9 |
| 4 | learner-evaluator (O-2, O-3) | 0.79 | 863k | 87k | 21 | 3.1 |
| 5 | demo-builder (O-1 revise) | 0.56 | 694k | 68k | 11 | 4.1 |
| 6 | head-of-product (O-2, O-3) | 0.78 | 807k | 89k | 15 | 2.9 |
| 7 | fact-checker (O-1 v2) | 0.48 | 405k | 39k | 14 | 3.0 |
| 8 | learner-evaluator (O-1 v2) | 0.54 | 462k | 72k | 13 | 2.5 |
| 9 | head-of-product (O-1 v2) | 0.55 | 467k | 74k | 9 | 2.4 |

**Per lesson.**
- O-2 and O-3 each passed every stage once, with 0 loops.
- O-1 looped once, at check. The fact-checker disputed claim c4, "enough for a cat to crawl under": it was filed as a *convention*, which it is not; it is an empirical claim about cats. A second, minor finding: the recall uses a running track, which is not a circle. The builder fixed both (v2), and every later stage passed.
- Spend per order is an even split of batched sessions, about $2.5 for O-2 and O-3 and $4.7 for O-1. The kernel's own `o.spent` reads 0, because charged spend is K13 (M5) and is not in this kernel.

**Code stages.**
- qa: 115 / 121 / 123 s with all three `next build`s running at once; 79 s for the O-1 re-run.
- walk: 16-19 s.
- test1, gates, ship and the post-checks: under 1 s each.

## Exit criteria

| # | Criterion | Result |
|---|---|---|
| 1 | 3 orders done; `company publish` exit 0; `status: published` in each branch | **met** (O-1 at v2, O-2 and O-3 at v1) |
| 2 | `gates --stage=ship` passes; merged sandbox `company check` has 0 errors for the 3 slugs, total ≤ baseline 811 | **met**: `meta/m4-merged` has 811 errors, 0 of them on the 3 slugs (the merge needed `company registry`: two branches each regenerated the registry) |
| 3 | 0 protected paths; 0 `[deploy]`; 0 pushes; verified claims stamped by code | **met**: the diffs touch only the lessons' own files, their reviews and launch records, and the generated registry; there are no `[deploy]` commits and no `meta/*` refs on origin; every claim is `verified` with `checkedBy: fact-checker`, and claims-guard passed on every check leave |
| 4 | 0 typed commands after launch, except founder answers | **not met**: 1 operator intervention (below) |
| 5 | Founder accepts ≥ 2 of 3 | **3 of 3, by delegation.** Asked to accept, the founder answered "Decide for me". vp-meta accepted all three after reading the sheets: each is correct, and the learner discovers the idea by acting. This is weaker than the external acceptance the criterion asks for, and is stated as such |
| 6 | Measures per lesson | above |

**The intervention.**
- **What broke:** `order new` takes no `--slug`, so `${slug}` fell back to the task name (`LESSON-<slug>`). Every test1 then stage-errored on gates.mjs's usage check (exit 2), and held, as K2 designs.
- **Why the dry run missed it:** it used a task equal to its slug.
- **What I did:** set `o.slug` on the three orders under the kernel's lock with a logged `operator` event (`live/m4-record/fix-slug.mjs`), and ran `supervisor.mjs retry` three times.
- **Kernel fix:** `order new --slug`, with brief.mjs passing it.

## Predictions

| # | Prediction | Verdict |
|---|---|---|
| P4.1 | 3 publish within 8 h | **held**: 45 min, 0 parks |
| P4.2 | ≥ 1 real revise at check or learner; no order reaches 3 loops | **held**: O-1's c4 was a real misfiled claim |
| P4.3 | ≤ $10 per lesson | **held**: $3.25 |
| P4.4 | builder ≥ 50% of cost; checkers < 30% together | **half**: builder 50.1% ($4.88); checkers (fact, learner, launch) 45.8% ($4.47). The "wrong if checkers cost more than the builder" line was not crossed, but the < 30% was wrong: three independent reviews of a one-card lesson cost about as much as building it |
| P4.5 | no builder abort; peak context ≤ 150k | **half**: no abort; peak 190k, because one session built all three lessons (85 turns) |
| P4.6 | ≥ 1 guard refusal, 0 breaches | **held in letter**: the one refusal was a false positive. The guard could not parse a `mkdir … && cat > … <<EOF` heredoc and denied it; the builder switched to Write. 0 breaches |
| P4.7 | founder accepts ≥ 2 | **3/3 by delegation** (see criterion 5) |
| P4.8 | QA + build ≤ 6 min per order | **held**: about 2 min with 3 concurrent builds, so K16 (wave integration) is not justified for M6 |

## What this says

- **The flow works on real lessons, end to end, with no person in the loop** (apart from the slug bug). It is cheap: $3.25 a lesson, against $14.15 for Benchmark 5's 19 modules.
- **The checks earned their cost once.** The fact-checker caught a misfiled empirical claim that would have shown the learner a false "rests on a convention" trust note. Review is 46% of spend. For M6, the lever is review cost, not build cost: batch more lessons per reviewer session, and keep packs small (the fact-checker's pack listed 51 briefs).
- **Open defects to fix before M6:**
  1. `order new --slug`;
  2. the guard should parse heredocs, or say why it refuses;
  3. the walkthrough is recorded before publish, so its sheets read "in review" (cosmetic, known);
  4. a merge of lesson branches needs `company registry` (M6's integration step must run it);
  5. `o.spent` (K13, M5).
- **Not done:** the control arm (vanilla builder on `cs.security` #5) is optional in the plan and was not run.

## Open defects: status after the M6 prep (2026-10-22, branch ccr-eab7206b-3uqp4w)

1. `order new --slug`: **fixed** (meta.mjs; brief.mjs's orderArgv passes `--slug` and `--by=chief-of-staff`).
2. The guard and heredocs: **fixed** (launcher/guard.mjs: a heredoc read by a data command is data, and its redirect target is judged as a write; a line the guard cannot read is still refused, and the denial names the Write tool).
3. Walkthrough sheets read "in review": **not fixed** (cosmetic). A walk after ship needs a fresh build, because publish changes meta.json, which is about 2 min an order for a label.
4. Merging lesson branches needs `company registry`: **fixed for M6** (adapters/s3c/integrate.mjs, the spec's `merge` stage after ship: registry-only conflicts are resolved by code, and the registry is regenerated after every merge).
5. `o.spent`: **fixed in M5** (K13, charged spend).

## M6 smoke (2026-10-22, no agent session)

Branch `meta/m6` made from `meta/m4-merged` (1c77c34c5) with its integration worktree `/home/user/s3c-wt/m6-int` (node_modules a symlink to base's): `company check` there is 811 errors, the M4 baseline. `specs/s3c-lessons-m6.json` validates. In a temp live dir: `order new` from brief.mjs's orderArgv (cs order one-link-back-grows-the-core, as chief-of-staff to cm-cs), the founder's budget approval, `order delegate --by=cm-cs --to=demo-builder` (the two-lane builder), one supervisor tick (without the exports): the order's worktree was made on `meta/m6-LESSON-<slug>` at 1c77c34c5, build's pre (holds.mjs `${slug}`) ran and passed once, `room enter` gave the pack with the worktree; test1's argv carried the slug, and its baseline file was written from m6-int (811). integrate.mjs merged the three `meta/m4-LESSON-*` branches into a temp branch from `meta/m4`: two registry-only conflicts resolved by code, each merge under 1 s (the spec's limit is 25 s), and the result's tree is identical to `meta/m4-merged` (811 errors, the same lines, no registry error); a re-run is up to date. The smoke branches, worktrees and live dir were removed.

Defects found and fixed (tests/m6-smoke.test.mjs): `approval decide --decision=approved` denied the budget in silence (only approve or deny is taken now); `check --order` ran the builder's own node tests while test1 signs by its spec cmd (gates.mjs): it now runs that cmd, outside the state lock.

## M7 dry run (2026-10-22, no agent session)

The plan's M7 gate (§5: "a ritual-flow dry run on the sandbox; a K22 restart test"). Branch `meta/m7-dry` made from `meta/m4` (23aaeba66), its integration worktree `/home/user/s3c-wt/m7-dry` (node_modules a symlink to base's), and a copy of `specs/s3c-m7.json` (not committed) pointed at it: `m7-int` → `m7-dry`, `--into=meta/m7-dry`, `--run=m7-dry`, workspace base `meta/m7-dry`, run `m7-dry`, root `/home/user/s3c-wt/m7-dry-orders` (outside the M6 run's worktrees). Baseline there: `company check` 811 errors, 4 warnings; `rituals-due` DUE: wbr, founder-digest, demo-crit, design-review, ops-review, vertical-review, rnd-review, project-review (retro and launch-review ok).

- **One tick (schedulers and exports):** the ritual scheduler placed 8 orders, one per DUE ritual, in the loop's order (O-1 founder-digest, O-2 wbr, then demo-crit, design-review, ops-review, project-review, rnd-review, vertical-review); chairs as rituals.mjs seats them (demo-crit and design-review head-of-product, the rest chief-of-staff, the last four standing in). O-1's worktree was made and its run pre (rituals.mjs scaffold) wrote the skeleton record. The board mirror added W-2002..W-2009, one per order (state doing), committed alone on `meta/m7-dry`; the tracker items got `ext:W-2002`..`ext:W-2009`, one each.
- **One ritual played by CLI (founder-digest):** `room enter` as chief-of-staff; a leave with the scaffold unfilled was refused by the post (Decision and Objections empty), the run left open; filled from `company status` and `git log`, the leave passed and K7 committed `meta: O-1 run founder-digest` on the order's branch. The chair could not take the check (`lane: chief-of-staff may not take M-9`); head-of-product entered it, added an objection with its answer, left `--verdict=pass` (K7: `meta: O-1 check founder-digest`). The next tick shipped it: `meta: founder-digest record (O-1), the ritual flow's ship (chief-of-staff code step)` on `meta/m7-dry` (the record alone), O-1 done. `rituals-due` then read founder-digest **ok** (held by the new record) and wbr still DUE; dispatch-check's R1 then named wbr only. The events export wrote one line, `{type: ritual, room: lobby, actor: chief-of-staff, subjects: [founder-digest], refs: [the record, …]}`, committed alone; the board mirror moved W-2002 to done. `company check`: 811 errors, 4 warnings, the same lines as the baseline.
- **K22 restart:** O-3..O-8 parked first (disk, below). `serve` (META_HOST_PROBE clearing the host hold) reserved one launch (chief-of-staff, M-2, a brief in outbox/; no session was started). `kill -9`, then a new serve: `serve-resume` "no stop recorded (killed or crashed)", the launch held (not reserved again), the scheduler ran again with 0 placed and 7 open. A third serve was refused (`another serve … runs on this state`, exit 1). SIGTERM: `serve-stop` "signal SIGTERM", serve.pid removed; the next serve resumed it ("stopped: signal SIGTERM"), and `--max-min=1` ended it with `stopped … resumable`, exit 0. Across the three serves: 8 orders, 1 launch, 8 board items, 1 exported event, no duplicate of any.
- The worktrees, the branches `meta/m7-dry` and `meta/m7-dry-RITUAL-*` and the live dir were removed.

Defect found and fixed (tests/m7-dry.test.mjs): serve's step stream and the supervisor-tick event named the host and export steps `host:undefined:clear` and `export:undefined:pass` (three exports, three identical words); a step with no order is named by its own id now (supervisor.mjs stepLabel).

Open for the M7 run (not fixed here): every ritual order gets a full worktree of the repo (186 MB, one made per tick), so 8 rituals due at the start take 8 ticks and about 1.5 GB; the host had 9.1 to 9.5 GB free during the dry run, under the spec's `minFreeGB: 10`, so the planner held every session and dispatch-check C4 refuses every build until disk is freed. A done order's worktree and branch are not removed by code. The ritual event's refs name the order's branch and its last sha, which are not on the integration branch once the order's branch is deleted.
