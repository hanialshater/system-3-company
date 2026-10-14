# Fact-check: shake-faster-same-speed

Independent claim checks for src/demos/physics/shake-faster-same-speed. Newest pass at the bottom.

## Pass 35 (2026-10-14)

Checker: fact-checker, a fresh instance that did not write these claims. Method: I read Demo.tsx first, covering every reachable path, the reset and reduced-motion states and every learner-visible string. Then I read the claim text and support, and only then the source fields. I re-ran the numbers in my own node ports of the lesson logic (session scratchpad fc35b1/), using the repo's own d3-geo, topojson-client and TypeScript where the lesson does. No builds and no screenshots. No verdict rests on an unopened source: every external host failed (WebFetch DNS failure, proxy 403).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Derivation: the transverse wave equation for a string element (net tension force T ∂²y/∂x² = μ ∂²y/∂t²) gives v = √(T/μ), with no frequency term. Own port: √(0.4/0.1) = 2 m/s, so the trip L/v is 2.0 s at 0.5, 1 and 2 per second. In Demo.tsx, rec.trip = L/vv is independent of the rate. The 'crest trip' label is min(L/v, tt − t0), which reads 2.0 s at the end. The reveal quotes seen.f1 and seen.f2, both needed by milestones; L/a.trip = '2' m/s. |
| c2 | verified | Own port: λ = v/f = 4, 2 and 1 m at 0.5, 1 and 2 per second for 2 m/s. The ruler is drawn only when the first crest has arrived and λ ≤ L, from L − λ (the second crest's position, v(t − t0 − 1/f)) to L, labelled λ.toFixed(0). The reveal m(a) = '2 m', m(b) = '1 m'. On the tight rope at 0.5/s, λ = 8 m > 4 m, so no ruler, which is correct. |
| c3 | verified | Own port: √(1.6/0.1) = 4 m/s, trip 4/4 = 1.0 s at every rate. seen.tight records the trip only ('tight: 1.0 s'). The reveal sec(c) = '1.0 s', and 'twice as fast' = 2.0/1.0. Four times T gives √4 = 2 times v. |
| c4 | verified | Follows from c1: v = √(T/μ) depends only on the rope's tension and mass per length. On stage, the rate chips leave the trip at 2.0 s and only the tension chip changes it. |
| c5 | verified | Convention. The Demo.tsx model y = A sin(2πf(t − x/v)) for x ≤ vt has no damping term and a single speed v for every f (no dispersion). L = 4, MU = 0.1 and TENSION 0.4/1.6 are constants. This is not on the stage text; it is a model note in the header. The animation lasts at most 2.5 s × 160 ms = 400 ms of wall time and the reported values are simulated, so reduced motion changes no number. |

**Result:** 5 verified, 0 disputed, 0 held unverified.
