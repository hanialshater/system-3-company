# Fact-check: cards-do-remember (2026-10-14)

## Pass 10 (2026-10-14) (re-check of reworded claim)

Checker: fact-checker (did not write these claims; any claim marked 'recorded by the fact-checker' is a quote of the builder's stage text). Method: re-check of a reworded claim, so I read the current Demo.tsx text where the claim appears (the builder changed it after the last walkthrough) before the claim source, then re-derived every number in my own node scripts (own copies of mulberry32 and of each algorithm; scratchpad fc10/a.mjs, b.mjs, c.mjs, d.mjs) and checked citations. Egress to most publisher pages is blocked, so book passages I could not open are said so per claim.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Re-check: claim text matches the reveal ('a coin has no pile to run out of, so its odds never shift. For cards, what changed is the mix of the remaining deck, not any due-ness'). Fair independent flips: P(H / any history) = 1/2; card dependence is c2 (16/42). |

**Result:** all claims in this pass verified.

## Pass 12 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read each Demo.tsx as rendered text first (predict, stage messages, reveal), then re-derived every number in my own node script (scratchpad fc12/check.mjs: own greedy/DP, brute-force spanning trees and grid paths, BFS Hanoi, Dijkstra, bisect over all 999 positions, IEEE double round trips). Web egress is blocked (proxy 403), so book and spec passages were not opened; each row says so where it relies on one.

| Claim | Verdict | Basis |
|---|---|---|
| c1-c6 | verified (unchanged) | Re-checked on request: Demo.tsx/model.ts unchanged since pass 10. node: 16/42 = 38.1%, 25/51 = 49.0%, 26/52 = 50%, C(26,10)/C(52,10) = 3.4e-4 (not shown). Predict options 50% / about 38% / about 62% match. No unrecorded claims found. |

**Result:** all claims in this pass verified.
