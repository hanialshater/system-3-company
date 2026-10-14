# Fact-check: every-second-seat-out (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-ran the lesson's own logic in my own node scripts (scratchpad fc21/). Sources were opened where egress allowed, otherwise corroborated by web search or marked as not opened.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own copy of play() (fc21/jo.mjs): order 2, 4, ..., 40, 1, 5, 9, 13, ...; survivor 19; after 38 removals 3, 19, 35 remain; recurrence J gives 19. |
| c2 | verified | play(41): powFrame 9, 32 left, frames[9].skip = 19; reveal and key-frame label '32 left' match. |
| c3 | verified | Simulation: play(2^m) survivor 1 for m = 1..5, i.e. the starter. Induction argument holds. Concrete Mathematics 2e section 1.3 (Josephus problem, J(2^m) = 1) not opened; placement matches my knowledge. |
| c4 | verified | node: 41 = 0b101001, rotated 0b010011 = 19; 2 x 9 + 1 = 19; formula J(2^m + l) = 2l + 1 checked against play(n) for every n < 200. GKP section 1.3 not opened (own knowledge agrees). |
| c5 | verified | play(7) -> 7 (4 left after 3 removals, starter 7); play(10) -> 5 (8 left after 2, starter 5); both match 2l + 1. |

**Result:** all open claims verified; the lesson has no unverified or disputed claims.
