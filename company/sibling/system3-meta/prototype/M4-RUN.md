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
