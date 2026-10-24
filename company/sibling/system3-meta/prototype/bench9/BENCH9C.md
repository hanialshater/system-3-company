# Benchmark 9c results: the autonomous org (AO), against V and PF

owner: vp-meta · date: 2026-10-24 · status: **final** · protocol and predictions: [B9C.md](B9C.md) (committed before
the run) · principles tested: [../../PRINCIPLES.md](../../PRINCIPLES.md), lean version

## Result (quiet final scoring: 5 interleaved runs each, nothing else on the machine)

| Arm | Score | Lua | Held-out corpus | Cost | Active minutes |
|---|---|---|---|---|---|
| **V** (one agent, B9; re-judged in B9b's session) | **0.529** | 0.515 | 0.544 | **$18.00** | 114 |
| B9 P (cold population) | 0.613 | 0.571 | 0.658 | $21.26 | 227 |
| PF (warm forks, B9b) | 0.624 | 0.641 | 0.608 | $60.53 | 109 |
| **AO** (the autonomous org, 2 rounds) | **0.637** | 0.687 | 0.591 | **$66.54** (true; the ledger said $47.71) | 108 + the scout's 25 |
| start (re-judged in AO's session) | 1.001 | | | | |

**AO lost to V by 20%, at 3.7× its cost; it tied PF and B9's cold population within the judge's noise (±2%).** Its
in-loop curve, by the full judge: start 0.963 (fast) → round 1 0.689 → round 2 0.612 (0.637 quietly).

## Deviation (operator, 2026-10-24, during the run)

**AO ran two rounds, not three.** Two of round 1's three workers were cut at their 35-minute cap, and a turn cut that
way gets no result message from the SDK, so the ledger logged it at $0 (round 1: $12.84 logged, about $31.70 true,
from the transcripts' token usage, calibrated on the one completed turn). The harness's cap rule (no round unless
spent + $18 ≤ $70) would therefore have let round 3 start at a true $66.54. The operator stopped AO when round 2 ended,
which is what the rule says on true costs, and logged it (`operator` row). Fixed for later runs: `turn()` now estimates a
cut turn's cost from its transcript (commit "bench9: estimate a time-capped turn's cost").

## Predictions

| # | Prediction | Verdict |
|---|---|---|
| B9c-1 | AO ≤ 0.526 | **wrong** (0.637) |
| B9c-2 | AO beats PF | **wrong** (0.637 against 0.624: a tie within noise, not a win) |
| B9c-3 | kept merges from ≥ 2 workers, each with positive credit | **held** (all three: bold 0.158; lean 0.125 and 0.069; measure 0.005) |
| B9c-4 | kept merges touch ≥ 3 of 4 areas | **held** (all four: driver, frontend, parser, backend) |
| B9c-5 | main after round 3 ≥ 3% better than after round 1 | **held on two rounds** (round 1 0.689 → round 2 0.612, 11% by the full judge; round 3 did not run) |
| B9c-6 | ≥ 1 merge reverted by the referee | **held** (2: measure's round-1 parser change, bold's round-2 loader) |
| B9c-7 | AO ≤ $70 | **held** ($66.54 true), only because the operator stopped it |

Operator's priors: B9c-1 40% (wrong), B9c-2 45% (wrong), B9c-3 70% (held), B9c-4 55% (held), B9c-5 55% (held, on two
rounds), B9c-6 50% (held), B9c-7 85% (held, with the deviation).

## The coverage map

| Area | Claimed by | Posted by | Kept merges | Reverted | Credit |
|---|---|---|---|---|---|
| driver (main.clj) | bold | measure, bold | r1 bold (startup restructure), r2 measure (direct linking) | r2 bold (parallel form loader) | 0.163 |
| frontend (lexer, preproc) | lean, measure | lean, measure | r1 lean (caches, punctuation by first char) | | 0.125* |
| parser (parser, types) | measure | measure | r1 lean (number parsing without reflection) | r1 measure (thread-local token access) | 0.125* |
| backend (codegen) | lean | lean | r2 lean (drop-redundant-ext fast path, analyses) | | 0.069 + 0.125* |

Claims and posts are mapped by hand from their topics (preproc, lexer, parser-tokens …); the harness's map matched only
the area names and missed them. \* lean's round-1 merge touched three areas; its 0.125 is shown in each (the referee credits a merge, not a file).

Coverage and reach both appeared: every area had a steward in practice (lean took the frontend and backend, measure
the parser, bold the driver), nobody piled onto one hotspot after the first minutes, and the explorer's changes
crossed areas (lean's round-1 merge touched three).

## What happened

- **Claims and the board did their job.** 10 claims, 41 entries (17 findings, 6 dead ends; 6 of them the referee's).
  In the first minute, lean and measure both claimed the preprocessor caches; at 10:09 lean posted "@w-measure: the
  preproc caches you claimed … are already done" and measure reverted its duplicate (#24) and moved to the parser.
  No merge conflicted, so the arbiter was never called.
- **The referee caught real regressions.** Measure's parser change looked good alone (its own head 0.961 was its fast
  score under load) but made main slower after lean's merge; bold's round-2 parallel loader made main slower
  (0.606 → 0.647) and was reverted. Measure then re-measured its own change on the new main with a warm harness and
  posted it as a dead end (#29): the board learned from the referee.
- **Combination worked.** Main holds work from all three, in all four areas; the gains added up (0.963 → 0.605 by the
  fast judge) instead of cancelling, as B9 P's crossovers often did.
- **The same two handicaps as PF:** three parallel sessions made each other's timings noise (lean: "identical runs
  range 6.7 to 17 s; my fast judge swung 0.771 then 1.131", #17), and a warm context is expensive to carry: $0.62 a
  minute for the org against V's $0.16.

## What this says

1. **The principled org's mechanisms work; on this problem they cost more than they return.** Claims prevented every
   collision, the board prevented duplicate work, the referee kept main monotone, and the gains combined across areas
   and workers. But one agent found the same kinds of wins (startup, direct linking, faster tokens, caches) alone, in
   one context, for a quarter of the money, and went further.
2. **Three designs, one result.** A cold population (0.613), warm forks (0.624) and the autonomous org (0.637) all land
   at about 0.62, at 1.2-3.7× V's cost, against V's 0.53. The ceiling is not the org design. It is the setting: one
   bounded problem that fits one context, a referee measured in wall-clock time on one shared machine, and parallel
   sessions that make each other's measurements noise.
3. **The proportion principle predicted this, and it held.** "The default is one strong agent. An organisation is
   formed only where the work gives a reason: it does not fit one context, it runs over a long horizon, it recurs, or
   its risk needs independent checking." B9's task gives none of those reasons. A fair test of the principled org needs
   work that does: too big for one context or long-running (the lesson company's thousands of demos is the candidate),
   with measurement that parallel workers do not disturb.
4. **Not tested here, and still open:** ownership as long-run stewardship, K38/K39 beliefs feeding the board, more than
   one model family, and per-worker machines. These are what the principles say matter most over long horizons, which
   is what B9 was not.
