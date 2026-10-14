# Fact-check: the-slowing-half-life (2026-10-14)

## Pass 19 (2026-10-14)

Checker: fact-checker (did not write or build these claims). Method: read Demo.tsx (predict, stage messages, readouts, reveal) against each claim, then re-derived every number in my own node scripts (session scratchpad fc4/). Books cited from memory were not opened; rows say where a verdict rests on derivation instead.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Derivation from 1/[A] = 1/[A]0 + kt: t1/2 = 1/(k[A]) at the start of each half, so halving [A] doubles the next half-life. Demo wait(2,n) = 10, 20, 40. Atkins edition/section not given or opened; verdict rests on the derivation. |
| c4 | verified | rate = k[A]^2: (1/2)^2 = 1/4, (1/4)^2 = 1/16; first order (1/2)^n. Demo rate() prints 1/4^n and 1/2^n. Reveal's "four times rarer ... half as many left ... twice as long" is consistent (time ~ amount/rate). |

**Result:** all claims verified (c1, c3 from 2026-10-13). Lesson fully verified.

## Pass 22 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Method: read Demo.tsx learner-visible text (predict, stage captions/readouts, reveal) before the claim sources, then re-derived each number with my own node scripts (session scratchpad fc22/: bm.mjs, kn.mjs, kmp.mjs, nash.mjs, bid.mjs, sg.mjs, apply.mjs) or by hand. All external source hosts were blocked by the proxy (403); where a row cites a paper or book, only web-search snippets were seen and the row says so. Verdicts rest on the re-derivation, not on the unopened citation.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Pass 22 re-check of v3: own Euler integration of dA/dt = -kA (k = ln2/10): waits 10.00, 10.00, 10.00 min; t1/2 = ln2/k has no concentration term. "Radioactive decay is first order" confirmed only via web-search snippets of general-chemistry texts (LibreTexts/Averill 14.5); Atkins and the IUPAC Gold Book entry were NOT opened (hosts blocked). |
| c4 | verified | Pass 22: rate = k[A]^2: (1/2)^2 = 1/4, (1/4)^2 = 1/16; first order 1/2, 1/4. Matches rate() readout in Demo.tsx. Own integration of dA/dt = -kA^2 (k = 1/800): waits 10, 20, 40 min. |
| c5 | verified | Pass 22: derivation. Each halving of a power-law decay is the previous one rescaled: concentration x1/2 at every matching point, so rate x(1/2)^m throughout; time = amount/rate scales by (1/2)/(1/2)^m = 2^(m-1): x2 for m = 2, x1 for m = 1. Exact, not an approximation. Matches the .why line text in Demo.tsx and own integration (c4). |

**Result:** every claim in this lesson is now verified.

## Pass 24 (2026-10-14)

Checker: fact-checker (did not write these claims). Wave E revision. Method: read Demo.tsx first (every learner-visible string, every reachable branch and the state after any reset control), then build.md Pre-flight; re-ran every number in my own node scripts using the lesson's own logic (scratchpad fc24/). No builds. Web egress to source hosts is blocked (proxy 403); no claim below is verified on an unopened source alone.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Derivation: second order in A means rate = k[A]^2 (mass action for a bimolecular step: meetings scale with [A]·[A]); halving gives (1/2)^2 = 1/4, then 1/16; first order 1/2, 1/4. Own node: waits 10, 20, 40 min (2nd) and 10, 10, 10 (1st). Rate rows rateRow() print '1/4 → 1/16' and '1/2 → 1/4'; gate guarantees seen[2] >= 2 and seen[1] >= 2 before reveal. Atkins not opened; not needed for the definition. |

**Result:** all open claims verified; no disputes.
