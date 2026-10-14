# Fact-check: the-slowing-half-life (2026-10-14)

## Pass 19 (2026-10-14)

Checker: fact-checker (did not write or build these claims). Method: read Demo.tsx (predict, stage messages, readouts, reveal) against each claim, then re-derived every number in my own node scripts (session scratchpad fc4/). Books cited from memory were not opened; rows say where a verdict rests on derivation instead.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Derivation from 1/[A] = 1/[A]0 + kt: t1/2 = 1/(k[A]) at the start of each half, so halving [A] doubles the next half-life. Demo wait(2,n) = 10, 20, 40. Atkins edition/section not given or opened; verdict rests on the derivation. |
| c4 | verified | rate = k[A]^2: (1/2)^2 = 1/4, (1/4)^2 = 1/16; first order (1/2)^n. Demo rate() prints 1/4^n and 1/2^n. Reveal's "four times rarer ... half as many left ... twice as long" is consistent (time ~ amount/rate). |

**Result:** all claims verified (c1, c3 from 2026-10-13). Lesson fully verified.
