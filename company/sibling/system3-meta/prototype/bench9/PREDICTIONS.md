# Benchmark 9: predictions, committed before any run (v1)

owner: vp-meta · date: 2026-10-23 · scored on the quiet final timings and the full gate ([PROTOCOL.md](PROTOCOL.md))
· status: **v1, committed before the harness is built and before any arm runs.** A change after the pilot is a v2,
committed before the first arm, with v1 kept in git.

## The bet

On an open optimization with a computable score, a population of diverse attempts plus a judge beats one strong agent
at the same budget, because one agent anchors on its first idea (RESEARCH-AGENDA.md H3). The org sits between: it has
parallel owners and a learning record, but its split is by module, not by idea.

**Headline measures** (stated now): (1) the final score of each arm's best gated candidate; (2) the score against spend;
(3) the Lua ratio against the held-out corpus ratio.

## Predictions

| # | Measure | Prediction | Wrong if |
|---|---|---|---|
| P9-1 | **Room to improve** | every arm's final gated score is ≤ 0.67 (at least 1.5× faster than the start, geometric mean of the two ratios) | any arm > 0.67 |
| P9-2 | **Population vs one (H3)** | P's final score is lower than V's by at least 5% | P ≥ 0.95 × V |
| P9-3 | **Org vs one** | S's final score is lower than V's | S ≥ V |
| P9-4 | **Population vs org** | P's final score is lower than S's | P ≥ S |
| P9-5 | **Diversity matters** | P's best candidate descends from at least 2 different strategy briefs (a crossover, or a mutation of a candidate from another brief) | it descends from one brief only |
| P9-6 | **Overfitting to what is visible** | in at least one arm, the Lua ratio improves at least 1.3× more than the held-out corpus ratio (Lua ratio ÷ corpus ratio ≤ 0.77) | in every arm the two ratios are within 1.3× of each other |
| P9-7 | **Correctness pressure** | at least one hand-in, in some arm, fails the full gate | every hand-in passes |
| P9-8 | **Spend curves** | after $20, P's best gated score is no better than V's (populations pay off late) | P is better than V at $20 |
| P9-9 | **Org overhead** | S's architect and evaluator cost ≥ 30% of S's total | < 30% |
| P9-10 | **Beliefs move** | at least one K38 rule in S's playbook ends with a belief ≥ 0.7 or ≤ 0.3 | every rule ends between 0.3 and 0.7 |
| P9-11 | **Noise** | for P's and S's final candidates, the in-loop ratio and the quiet final ratio differ by more than for V's (parallel sessions share the CPUs) | V's difference is the largest |
| P9-12 | **Clean run** | the audit is clean: no `.class`, jar or non-source file in any final `src/`, no Lua file names or input hashing in `src/`, no hidden-test text in any session, no refused compile or network attempt | any of these |

## The operator's prior (stated so the result can surprise)

- **P9-1: 75%.** Clojure loading 6.3k lines of source, reflection, and string-heavy passes leave a lot on the table;
  against: the JVM's start is a floor, and the corpus batch may already be start-dominated.
- **P9-2: 50%.** The literature says populations win this kind of task; B6 and B8 say one strong agent of this model
  is very good at finding the obvious wins first, and compile time may have a few big obvious wins (reflection
  warnings, namespace loading) that everyone finds.
- **P9-3: 30%.** B8: the same model split by module paid coordination and cold starts without gaining capability.
- **P9-4: 60%.**
- **P9-5: 45%.**
- **P9-6: 40%.** Lua is what every arm can time; the corpus is not. Against: most speedups (load time, reflection) are
  general.
- **P9-7: 80%.** Speed work breaks code generation easily; B8's waves had many first hand-ins that failed.
- **P9-8: 60%.**
- **P9-9: 65%** (B8 S2: the architect alone was about 30%).
- **P9-10: 35%.** 240 minutes and 3 rounds give few scored orders per rule.
- **P9-11: 60%.**
- **P9-12: 80%.**

## v2 (2026-10-23, before any arm has run): K39 for S

The founder (2026-10-23): "Optimization of compile time could be iterative task where org and learnings help right?
… Yes go with K39." K39 (learn.mjs) lets the org learn from **effects**, not only defects: each order's measured score is
the accept stage's metric, the owners' hand-in notes are its experiment record, and the architect's retro proposes
**effect rules** (a practice with an expected effect) whose beliefs code updates with every later order's measured change.
S's orders now always ship after their one full-judge round (a broken gate scores 1.0 in the metric), so every round is
measured. V and P are unchanged. P9-1..P9-9, P9-11 and P9-12 stand as committed; P9-10 is replaced and P9-13 added:

| # | Measure | Prediction | Wrong if |
|---|---|---|---|
| P9-10 (v2) | **Effect beliefs move** | at least one K39 effect rule in S's playbook ends with a belief ≥ 0.7 or ≤ 0.3 | every effect rule ends between 0.3 and 0.7, or no effect rule is added |
| P9-13 | **Learning across rounds** | S's full-judge score improves more from round 1 to round 3 than V's does (ratio round-3 score ÷ round-1 score lower for S) | S's ratio ≥ V's |
| P9-14 | **Rules get used** | in S's rounds 2 and 3, at least half of the owners' hand-in notes name a playbook rule or a practice one states | fewer than half |

**The operator's prior.** P9-10 (v2): 45% (three rounds give an effect rule at most two measurements; the noise is
±15%, so only a large effect moves a belief past 0.7). P9-13: 40% (V also improves round on round with its whole
context). P9-14: 50%.
