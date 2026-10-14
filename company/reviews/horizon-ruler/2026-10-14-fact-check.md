# Fact-check: horizon-ruler (2026-10-14)

## Pass 26 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: claims open after the wave G revision. Method: read Demo.tsx (and model.ts) for every reachable branch, Reset and reduced motion before the claim sources, then re-ran the numbers in my own node scripts (scratchpad fc26-b1/). No build run.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | d = sqrt(2Rh + h^2); sqrt(2Rh) within 0.004% to 1,000 m. Drawn right angle is exact (dot product 0). |

**Non-claim finding (routed to demo-builder):** Demo.tsx passes `names={["eyes", "hundred"]}` to Milestones but sets `minInteractions={3}`; reach("tower") is ignored, so interact() fires at most twice and the reveal cannot unlock. build.md v2 says three milestones.

**Result:** every claim open at this pass is now verified.

## Pass 27 (2026-10-14): code check of v3 (W-250), not a claim

Checker: fact-checker. I read Demo.tsx v3. MILESTONES = STOPS.map(key) = ['eyes', 'hundred', 'tower'], and both minInteractions and Milestones names come from STOPS (3 and 3). Each stop chip calls set(st.m) with the exact stop value, so its key matches and reach(key) fires once per stop (Milestones counts each name once). The chips start enabled (START_M = 30 equals no stop), and a chip is disabled only while m equals its own stop, so all three can be pressed in any order. The slider alone never hits a stop: own node, 10^(0.03 v) for v = 0..100 is never within 1e-9 of 1.7, 170 or 828. The chips are the only route, and they are on stage. Simulated the three chip presses: 3 interactions >= 3, so canReveal is true. Reveal values re-run: 4.7, 47, 103 km, ratio 10.

**Result:** all three milestones are reachable, and the reveal can open. Confirmed by reading the code and simulating it, not in a browser. The runtime check is QA (W-257). No claim changed.


## Pass 35 (2026-10-14, batch 2)

Checker: fact-checker. I did not write or build these claims. Scope: every claim in this lesson that was neither verified nor withdrawn. Method: I read Demo.tsx (and any model.ts) first on every reachable path, including replays, reduced motion and the lack of a Reset where there is none, then the claims. I re-ran the numbers in my own node scripts (session scratchpad fc35/), not imported from the lesson. No screenshot: the dev server on :3530 was not running. Web hosts are blocked from this session (proxy 403 / DNS failure), so no verdict rests on a source I could not open; the only outside sources I opened are PyPI packages (ht 1.2.0 property tables, pint 0.26.1 unit definitions), named where used.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | (R + h)^2 = R^2 + d^2 -> d = sqrt(2Rh + h^2) ~ sqrt(2Rh); own node R = 6,371.0088 (src/kit/geo): 1.7 m 4.654 km, 170 m 46.542, 828 m 102.715 vs exact 102.718. The tick is drawn at the tangent point between sight direction and radius stub (orthogonal by construction); v4 draws the stub and 'radius' label at every height. |
| c3 | verified | Rests on derivation now: the stage no longer names the tower ('Tower: 828 m' is stipulated), so the CTBUH height is not needed. sqrt(2 x 6,371.0088 x 0.828) = 102.7 -> '103 km' (fmtKm rounds above 10). Support could be derivation. |
| c4 | held (unverified) | Atmospheric refraction lengthening the horizon (k ~ 0.13, ~8%) needs an opened source (Young, SDSU, not reachable; web blocked). Not derivable from the stage. |

**Result:** 2 verified, 0 disputed, 1 held (unverified), 0 withdrawn.
