# Fact-check: seesaw-sit-closer (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed and state-dependent ones) before the claim sources; re-ran every number in my own node scripts (scratchpad fc21/); checked sources by web search where reachable (most hosts, including the Easley-Kleinberg book site, are blocked; sources not opened are marked in each row).

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | 20 x 9.81 x 3.0 = 588.6 -> '589 N·m'; 40 x 9.81 x 2.0 = 784.8 -> '785 N·m' (toFixed(0)); net < 0 tips the 40 kg side down; beyond 4.0 m the 20 kg side. Demo `other` starts at 3.0 (on screen at unlock) and updates only after a 300 ms rest at a non-balanced spot, so the quoted spot was seen; every slider spot 0.5-5.0 gives the right side. |
| c6 | verified | Torque about the pivot = m g d for a weight at horizontal distance d; tilt multiplies both sides by cos(theta), so the comparison is unchanged. kg x m/s^2 x m = N·m. Stage caption 'turning effect = kg × 9.81 × m from the middle' matches. |

**Result:** all open claims verified.

## Pass 24 (2026-10-14)

Checker: fact-checker (did not write these claims). Wave E revision. Method: read Demo.tsx first (every learner-visible string, every reachable branch and the state after any reset control), then build.md Pre-flight; re-ran every number in my own node scripts using the lesson's own logic (scratchpad fc24/). No builds. Web egress to source hosts is blocked (proxy 403); no claim below is verified on an unopened source alone.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Own node: 20 × 9.81 × 3.5 = 686.7 -> '687 N·m'; 40 × 9.81 × 2.0 = 784.8 -> '785 N·m'; net < 0 tilts the 40 kg (left) end down. 'tried-other' sets other on every non-4.0 move, so at reveal other is set and the dashed label 'dashed: last tipped at 3.5 m, 687 N·m' shows whenever d differs. |

**Result:** all open claims verified; no disputes.
