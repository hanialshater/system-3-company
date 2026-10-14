# Fact-check: whose-cutoff-wins (2026-10-14)

## Pass 19 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc3/: knap.mjs, interp.mjs, ways.mjs and one-liners). Sources checked by web search where a claim rests on one; sources not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Own copy of the model: mistakes(40) = A 9, B 1 (B at 35); mistakes(50) = A 0, B 2 (35, 45). 50 -> 40 fixes B at 45, breaks the 9 A in 40-50: total 10 vs 2. Reveal sentence matches. |

**Result:** all open claims verified; lesson has no unverified or disputed claims.

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-ran the lesson's own logic in my own node scripts (scratchpad fc21/). Sources were opened where egress allowed, otherwise corroborated by web search or marked as not opened.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Own copy of mistakes(): 40 -> A 9, B 1 (B at 35), total 10; 50 -> A 0, B 2 (35, 45). 40 -> 50 breaks B at 45, fixes nine A in 40-50. The reveal's 'You stopped at 40' is guaranteed by the 300 ms 'at-40' milestone. |
| c6 | verified | step(): +10 if cut < BEST else -10, disabled at BEST (50). Totals 0..100: 48, 38, 28, 18, 10, 2, 12, 22, 32, 42, 52 (falls monotonically toward 50 from both sides), so 30->40: 18->10 and 40->50: 10->2 as message() prints. |

**Result:** all open claims verified; the lesson has no unverified or disputed claims.
