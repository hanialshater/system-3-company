# Fact-check: shoelace-order-matters (2026-10-14)

## Pass 21

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage, reveal) against each open claim, then re-derived every number in my own node scripts (scratchpad fc21: own mulberry32, outbreak/Poisson and negative-binomial fixed points, shoelace, matrix-chain DP vs brute force, doubling search, Newton with a BigInt reference root, Kruskal plus spanning-tree enumeration, copying model, Snell/Fresnel, heterozygote-advantage recursion). Sources recalled and not opened are marked; nature.com, PubMed, OpenStax and the Easley & Kleinberg host were unreachable from this sandbox.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node shoelace (fc21/shoe.mjs): 12, -12, 0; all 6 orders from (0,0) give 12, 0, 0, 0, 0, -12. Question and reveal use shoelace() values. |
| c2 | verified | Trapezoid identity checked: per-edge strips sum to the shoelace value for every order tried. With all y >= 0 on this stage, an edge going left adds and one going right subtracts (edges along y = 0 or vertical give 0, drawn as no strip). |
| c3 | verified | Own node per-edge strips for the bow-tie order: [-6, 0, +6, 0], total 0. |
| c4 | verified | Diagonals cross at (2, 1.5). Own shoelace: left lobe (2,1.5)(0,3)(0,0) = +3, right lobe (2,1.5)(4,3)(4,0) = -3; each triangle base 3, height 2, area 3. |
| c5 | verified | Stage maps y up (sy = OY - y*U); the boundary order (0,0)(4,0)(4,3)(0,3) is anticlockwise and gives +12; reversing negates. Standard Green's-theorem orientation; derivation, no external source needed. |
| c6 | verified | Shoelace sum = sum of winding number x area over regions; c4 shows +3 and -3 lobes for the crossing path. |

**Result:** 6 verified, 0 disputed, 0 withdrawn.
