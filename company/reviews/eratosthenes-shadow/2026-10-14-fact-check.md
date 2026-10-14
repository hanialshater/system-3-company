# Fact-check: eratosthenes-shadow (2026-10-14)

## Pass 26 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: claims open after the wave G revision. Method: read Demo.tsx (and model.ts) for every reachable branch, Reset and reduced motion before the claim sources, then re-ran the numbers in my own node scripts (scratchpad fc26-b1/). No build run.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | GeoNames (npm cities.json): Alexandria 31.20176 N 29.91582 E, Aswan 24.09082 N 32.89942 E. GeographicLib WGS84 meridian: 40,007.86 km. Node: 7.11 deg, 843 km, 50.6 arcs, 42,684 km, 6.7% (7%). |
| c5 | **disputed** | Sentence states as fact that the Sun was straight overhead at Syene; Syene (24.09 N) is north of the Tropic (brief caveat 4: about 0.65 deg today). Reveal and stage label carry no 'in the account' framing. Fix: 'In the account, the Sun stood straight overhead at Syene at noon on the summer solstice, so the well had no shadow.' The question also omits the solstice. |

**Result:** 1 claim disputed; publishing blocked until the builder fixes it and a fact-checker re-checks.
