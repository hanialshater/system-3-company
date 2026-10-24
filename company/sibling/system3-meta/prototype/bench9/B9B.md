# Benchmark 9b: a population forked from a warm session (P-fork), against V

owner: vp-meta · date: 2026-10-24 · status: **protocol and predictions, committed before any run** · founder: "Yes keep
going" (2026-10-24) after B9 and [PRINCIPLES.md](../../PRINCIPLES.md) · results go to BENCH9B.md

## The question

B9's population (P) used cold, narrowly briefed 25-minute sessions that peaked at about 35k tokens of context, against V's
442k. Is the population idea weak, or was the population starved? B9b keeps everything else equal and changes only that,
the lean way PRINCIPLES.md's proportion section asks for: **warm forks of one session that already understands the
system, generic temperaments instead of assigned directions, and a shared findings board.**

## The arm (PF)

Same start tree, judge, rules, tools, model and caps as B9's arms ($70, 240 active minutes); run alone on the machine.

1. **Scout** (one session, at most 25 minutes, $8): the same task text as V, with one instruction first: understand the
   whole system before changing anything. Read the code, profile the Lua batch by phase, and write NOTES.md (where the
   time goes, with numbers). It does not change the compiler.
2. **Round 1:** 4 forks of the scout's session (`forkSession`), each in its own copy of the start tree with NOTES.md,
   each with one generic temperament and no assigned area (principle 2):
   - **measure**: "measure before you change anything; let the numbers pick each next move";
   - **bold**: "look for the one restructuring that removes a whole class of cost";
   - **sceptic**: "assume a speedup breaks something until you have shown it does not; check others' claims on the
     board";
   - **lean**: "the smallest change with the largest effect; stop when the returns fall".
   Each writes its own PLAN.md before it reads the findings board (R1: independence before sharing), and posts every
   measured finding and every dead end there with its evidence and a wrong-if line (R2: findings, not feathers). At most
   45 minutes and $8 each.
3. **Selection** (code): the fast judge on each fork, serially, with nothing else running; the best goes to the full
   judge (on its committed head).
4. **Round 2:** 3 forks of the round-1 winner's session (warm with its own work and context), temperaments rotated, the
   board's entries summarised in the prompt. At most 40 minutes and $7 each. Selection as in round 1.
5. **Result:** the best fork whose full gate passes; scored with V again on the quiet machine (5 repetitions each).

Budget at most about $8 + 4 × $8 + 3 × $7 = $61; time about 25 + 45 + 20 + 40 + 20 = 150 active minutes.

**The findings board** (`board.mjs post|read`): one JSON line per entry {by, kind: finding | dead-end | hypothesis,
area, text, evidence, wrongIf, t}; an entry without evidence and a wrong-if is refused. Agents reach it only through
the script, never the file.

## Predictions (committed before any run)

| # | Prediction | Wrong if |
|---|---|---|
| B9b-1 | PF's final quiet score is lower (better) than V's 0.542 by at least 3% (≤ 0.526) | PF > 0.526 |
| B9b-2 | PF's forks each use far more context than B9 P's: median peak ≥ 150k tokens (P's was 35k) | median < 150k |
| B9b-3 | PF costs no more than V × 3 ($54) | PF > $54 |
| B9b-4 | the board is used: ≥ 8 entries, ≥ 2 of them dead ends, and ≥ 1 round-2 fork names a round-1 board entry it used | fewer |
| B9b-5 | the round-1 winner is not the "measure" temperament (the bold or lean one finds V's large structural wins faster) | the measure fork wins round 1 |
| B9b-6 | the gains are general: Lua ratio ÷ corpus ratio between 0.9 and 1.1 | outside |

**The operator's prior.** B9b-1: 45% (V's round 1 already found the large wins; forks start from the same
understanding, and the gain is in the tail V never reached). B9b-2: 85%. B9b-3: 70%. B9b-4: 60%. B9b-5: 55%. B9b-6: 75%.
