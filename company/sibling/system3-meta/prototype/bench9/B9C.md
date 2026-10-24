# Benchmark 9c: the autonomous org (AO), against V and PF

owner: vp-meta · date: 2026-10-24 · status: **protocol and predictions, committed before any run** · founder: "Yes keep
going" (2026-10-24), the plan "B9b first, then B9c" · design: [PRINCIPLES.md](../../PRINCIPLES.md) · results go to
BENCH9C.md

## The question

B9b (PF) asks whether warm, diverse, unrestricted agents beat one strong agent when **one winner is picked**. B9c asks
the org question: can such agents **build on each other**, with their separate changes combined into one tree, credit
measured per change, and the whole run in proportion (V's budget, $70)? PF cannot combine; V cannot parallelise. If
neither wins, the org has no case on this problem.

## The arm (AO), lean by design

Same start tree, judge, rules, tools, model and caps as B9's arms ($70, 240 active minutes); run alone on the machine.

- **Warm start (principle 3).** No new scout: AO forks B9b's scout session (the same 25-minute understanding and
  NOTES.md, its cost charged to AO too). This keeps PF and AO equal up to the point where they differ.
- **Three workers** (principle 2), forked once from the scout, each with one generic temperament (measure, bold, lean)
  and no assigned area. They are **persistent**: rounds 2 and 3 resume each worker's own session, so it keeps its
  memory of its area and its earlier results (stewardship that is earned, not assigned).
- **Claims, not scopes (principle 1).** Before editing, a worker posts a short, visible claim (`board.mjs claim
  --area=… --text=…`), and drops it when done; claims expire after 40 minutes. Claims prevent collisions; they do not
  allocate work. Anyone may work anywhere.
- **The findings board (principle 4).** As in B9b: findings, dead ends and hypotheses, each with evidence and a wrong-if.
  Code also posts each merge's measured result there.
- **Rounds.** Three rounds of 35 minutes; the workers run in parallel, each on its own clone, starting each round from
  the org's current **main**.
- **Integration and credit (principle 5), by code, after each round.** Each worker's head is fast-judged alone; the
  heads are then merged into main in order of that score. After each merge, the fast judge measures main again: the
  merge stays if the check passes and main's score is no worse than 1% above the score before it, or it is reverted.
  Each kept merge's credit is the drop in score it caused. Every result (kept, reverted, why) goes to the board under
  `by=judge`.
- **The architect as arbiter, not allocator.** A fourth fork of the scout, in main's folder. It is called only when a
  merge conflicts (at most 10 minutes per conflict) to resolve it so that both sides' intent survives. It also owns the
  interfaces between areas. It assigns no work.
- **Coverage map** (PRINCIPLES.md): per area, which workers claimed it or posted on it, which merged changes touched it
  (by file: driver = main.clj; frontend = lexer, preproc; parser = parser, types; backend = codegen), its kept credit
  and its reverted merges.
- **Result:** main after round 3, by the full judge; then scored with V and PF on the quiet machine (5 repetitions).

Budget: scout (shared) $4-8, about 3 × 3 × $6 for the workers, and at most $6 for the arbiter: under $70.
Time: 3 × (35 + about 20 for integration) = about 165 active minutes.

## Predictions (committed before any run)

| # | Prediction | Wrong if |
|---|---|---|
| B9c-1 | AO's final quiet score beats V's 0.542 by at least 3% (≤ 0.526) | AO > 0.526 |
| B9c-2 | AO beats PF on the quiet final (combining beats picking) | AO ≥ PF |
| B9c-3 | the final main holds kept merges from at least 2 different workers, each with positive credit | fewer than 2 |
| B9c-4 | coverage: kept merges touch at least 3 of the 4 areas | fewer than 3 |
| B9c-5 | AO improves across rounds: main after round 3 is at least 3% better than after round 1 (V's rounds: 2%) | less than 3% |
| B9c-6 | at least one merge is reverted by the referee (the org catches its own regressions) | none |
| B9c-7 | AO costs no more than $70 | above $70 |

**The operator's prior.** B9c-1: 40%. B9c-2: 45% (merges of separately tuned changes can cancel each other, as with
B9 P's crossovers). B9c-3: 70%. B9c-4: 55%. B9c-5: 55%. B9c-6: 50%. B9c-7: 85%.

"A philosophy of emergence should be willing to lose an A/B test." A loss to V is a result, and is written up as one.
