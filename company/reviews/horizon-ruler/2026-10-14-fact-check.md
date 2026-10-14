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

