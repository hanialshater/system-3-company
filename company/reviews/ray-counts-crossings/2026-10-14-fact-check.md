# Fact-check: ray-counts-crossings (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, question, reveal) against each open claim, re-ran the lesson's own model in node (scratch scripts extracting or re-implementing it), and tried each named source. Most source hosts are blocked to fetch; where only a web-search extract was available, the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-ran Demo.tsx crossings(): (3,4) crosses at x = 4, 6; (1,4) 3; (5,4) 1; (3,1) 1; (7,4) 0. |
| c2 | verified | Parity of crossings() equals an independent inside test for the U on 25,521 snapped stage points (0 mismatches). Derivation from the Jordan curve theorem for polygons; Shimrat 1962 and Haines 1994 cited from memory, not opened; sentence rests on the derivation. |
| c3 | verified | snap() never returns y in {0, 2, 6} or a boundary point (checked on the same 25,521 points). |

## Pass 24 (2026-10-14)

Checker: fact-checker (did not write these claims). Wave E revision. Method: read Demo.tsx first (every learner-visible string, every reachable branch and the state after any reset control), then build.md Pre-flight; re-ran every number in my own node scripts using the lesson's own logic (scratchpad fc24/). No builds. Web egress to source hosts is blocked (proxy 403); no claim below is verified on an unopened source alone.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Own node over a 0.1 grid of points: for every stretch the label (crossings to the right odd = in) matches true inside/outside of the U, 0 mismatches; last stretch always 0 to the right = out. All 800 gap points (2<x<4, 2<y<6) cross exactly x = 4 and x = 6. |

**Result:** all open claims verified; no disputes.

## Pass 35 (2026-10-14, batch 3)

Checker: fact-checker (fresh instance; drafted none of this wording). Artifact: cs/ray-counts-crossings v4. Method: read Demo.tsx first, tracing every reachable path, Reset (where present) and reduced motion; re-ran the numbers in node/Python with independent re-implementations; checked how-chosen notes. Web sources could not be opened from this host (web fetch DNS failure, proxy 403), so nothing here is verified on an unopened source. No screenshots: the dev server at localhost:3530 did not respond. Scripts: scratchpad fc35-3/.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Re-derived (Jordan curve theorem for polygons): far right is outside; each proper crossing switches region. Own node: parity of the Demo's half-open crossings() equals an independent winding-number test on all 188 snapped stage points of the U (0 mismatches) and on 60,000 random points in 300 random simple star polygons (0 mismatches). Shimrat 1962 / Haines 1994 not opened; not needed. Nit (builder): support could be 'derivation'. |
| c4 | verified | Own node: for every snapped point, each stretch's label ((hits − i) odd = in) matches the winding-number test at the stretch midpoint (0 mismatches); the last stretch is always out. All 21 snapped gap points (2 < x < 4, 2 < y < 6) cross exactly x = 4 and x = 6. Presets: (1,4) 3, (3,4) 2, (5,4) 1, (3,1) 1, (7,4) 0. Replay: the reveal needs inside-odd, so odd ≠ null; at the reveal pt = odd.p with readout 'Point (again)' until go() sets movedInReveal (any preset tap or drag). |
