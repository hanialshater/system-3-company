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

## Pass 24 (2026-10-14)

Checker: fact-checker (did not write these claims). Wave E revision. Method: read Demo.tsx first (every learner-visible string, every reachable branch and the state after any reset control), then build.md Pre-flight; re-ran every number in my own node scripts using the lesson's own logic (scratchpad fc24/). No builds. Web egress to source hosts is blocked (proxy 403); no claim below is verified on an unopened source alone.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own copy of play(41): powFrame 9, 32 left, skip seat 19; formula line '41 = 32 + 9 → start 2 × 9 + 1 = 19' shown once made >= powFrame (either button path). |
| c3 | verified | Own run: laps for 41 = 32/16/8/4/2 left, skip 19 each time; independent Josephus recurrence J(41) = 19. Derivation: with an even count each lap removes every second seat and returns the count to the starter. |
| c4 | verified | 41 = 101001b, rotated 010011b = 19; 7 = 111b -> 111b = 7; 10 = 1010b -> 0101b = 5. Matches rotated() and survivors J(7) = 7, J(10) = 5 (own recurrence). |
| c5 | verified | Own play(): 7 -> powFrame 3, pow 4, survivor 7; 10 -> powFrame 2, pow 8, survivor 5. Readout template '→ {survivor} ({pow} + {powFrame})' gives '→ 7 (4 + 3)' and '→ 5 (8 + 2)'. |

**Result:** all open claims verified; no disputes.
