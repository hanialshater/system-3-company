# Fact-check: horizon-ruler (2026-10-14)

## Pass 26 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: claims open after the wave G revision. Method: read Demo.tsx (and model.ts) for every reachable branch, Reset and reduced motion before the claim sources, then re-ran the numbers in my own node scripts (scratchpad fc26-b1/). No build run.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | d = sqrt(2Rh + h^2); sqrt(2Rh) within 0.004% to 1,000 m. Drawn right angle is exact (dot product 0). |

**Non-claim finding (routed to demo-builder):** Demo.tsx passes `names={["eyes", "hundred"]}` to Milestones but sets `minInteractions={3}`; reach("tower") is ignored, so interact() fires at most twice and the reveal cannot unlock. build.md v2 says three milestones.

**Result:** every claim open at this pass is now verified.
