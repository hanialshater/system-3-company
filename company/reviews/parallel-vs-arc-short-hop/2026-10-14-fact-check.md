# Fact-check: parallel-vs-arc-short-hop, 2026-10-14

## Pass 19

Checker: fact-checker. Scope: every claim with status unverified. Method: read Demo.tsx so stage and claim agree, then re-derived or re-simulated independently in node; CLRS 4th ed. cited by section.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c5 parallel bends away more the longer and nearer the pole | verified | Own haversine script (R 6371.0088): savings 20N 18.09, 40N 95.61, 60N 398.31 km at 5,000 km; 40N 0.724 km at 1,000 km. Saving increases with distance at 20/40/60 N over the whole slider range (500-8,000 km), and with latitude for all lat < 79 N. |
| c6 sphere model; Mercator makes blue look longer though shorter | verified | On the Mercator plane red is a straight segment, so the blue curve is longer on the map (e.g. 40N 5,000 km: 1.046 vs 1.024 projected units; 60N: 1.725 vs 1.570) while shorter on the sphere (c2, c3). |

Result: 2 verified, 0 disputed, 0 withdrawn. All claims in this lesson are now verified.
