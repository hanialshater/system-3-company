# Fact-check: continental-jigsaw, 2026-10-14

## Pass 11 (2026-10-14)

Checker: fact-checker. c1 skipped by instruction and left unverified: it needs a human source check (Bullard, Everett and Smith 1965 table of rotation parameters, Phil. Trans. R. Soc. A 258, unreachable; c4 rests on the same paper). No status change.

## Pass 17 (2026-10-14)

| Claim | Verdict | Basis |
|---|---|---|
| c1 | unverified (skipped) | Needs a human source check of the primary table (network access to the source is blocked for agents; see the claim's earlier FACT-CHECK notes). Not touched in pass 17. |

## Pass 21 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, question, reveal) against each open claim, re-ran the lesson's own model in node (scratch scripts extracting or re-implementing it), and tried each named source. Most source hosts are blocked to fetch; where only a web-search extract was available, the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | disputed | Pass 21: still not opened (royalsocietypublishing, geologie.ens.fr OCR copy and Morgan 1968 PDF all blocked to fetch). Web-search extracts: an OCR of the paper lists fit 9 (500 fm) as '44.0 30.6 57.0', and Morgan (1968) cites Bullard et al. for a 44.0 N, 30.6 W pole; but Virtual Explorer (2007) lists Bullard et al. (1965) as 42.9, -30.1, 57.1 and gives 44/-30.6/57 to Smith and Hallam (1970). The learner sentence depends on the unopened table and secondary sources conflict, so disputed. To clear: a human opens Table 1 (fit 9) in Phil. Trans. R. Soc. A 258: 41-51 (copy at geologie.ens.fr/50years_plate_tectonics/phil-trans-r-soc-lond-a.pdf). |

## Pass 23 (2026-10-14)

Checker: fact-checker (did not write these claims; sentences recorded by an earlier fact-checker session were reworded by the builder or are the builder's own reveal text). Method: read Demo.tsx (predict, stage strings, reveal and every reachable branch) against each open claim, then re-ran every number in my own node copies of the lesson logic (own mulberry32, BigInt roots and modpow, exact Markov chain, union-find). Every external host failed to resolve or was refused, so no source was opened; a claim whose learner content rests only on an outside source is held unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | disputed | Still disputed, unchanged since pass 21 (claim and stage not edited). The source host (geologie.ens.fr) does not resolve from this sandbox, so Table 1 of Bullard, Everett and Smith (1965) is still unopened. To clear: a human opens Table 1, fit 9. |

**Result:** 0 verified, 1 disputed, 0 held unverified, 0 withdrawn.

## Pass 24 (2026-10-14)

Checker: fact-checker (did not write these claims). Wave E revision. Method: read Demo.tsx first (every learner-visible string, every reachable branch and the state after any reset control), then build.md Pre-flight; re-ran every number in my own node scripts using the lesson's own logic (scratchpad fc24/). No builds. Web egress to source hosts is blocked (proxy 403); no claim below is verified on an unopened source alone.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Describes the stage only: POLE [-30.6, 44] (lon, lat), ANGLE 57 in Demo.tsx; 44°N 30.6°W is open North Atlantic. Own node Rodrigues rotation + countries-110m: bulge (34.8 W, 7.1 S) -> 7.27 E, 4.98 N, 61 km from an African vertex (2,928 km before); Brazil east-coast vertices (25) end mean 128 km, max 199 km from the West/South African coast. No longer attributes the parameters to Bullard et al. |
| c4 | disputed | Rests only on Bullard, Everett and Smith (1965), not opened: royalsocietypublishing, pmc.ncbi.nlm.nih.gov, earthguide.ucsd.edu, open.edu all blocked (proxy 403). Search-result text (not opened) says the best fit was at the 500-fathom contour, 'on the steep part of the continental edge', i.e. on the continental slope (~900 m), not the shelf edge (~100-200 m). So the wording may also be off. Fix (builder): 'Published fits use the continental margin, a depth contour on the steep slope offshore, not today's shoreline'; to clear, a human opens the paper's abstract. |

**Result:** disputed: c4 (blocks publishing; fix in the Basis column, builder owns it). Others verified.

## Pass 25 (2026-10-14, W-238)

Checker: fact-checker (did not write these claims). Re-check after the pass 24 fixes. Method: read Demo.tsx first (every learner-visible string, every reachable branch including reduced motion and the state after any reset or list/tree switch), then the build.md Pre-flight; re-ran the numbers in my own node ports of the lesson's logic (session scratchpad fc25/). No builds. No sentence below is verified on an unopened source.

| Claim | Verdict | Basis |
|---|---|---|
| c4 (deleted) | n/a | Confirmed gone: meta.json has c1, c2, c3, c5, c6 (withdrawn), c7, and no shelf, fathom or slope sentence remains in Demo.tsx or the reveal. The new reveal clause 'The fit here is rough: these outlines are coarse.' is covered by c3 (verified). No open claims. |

**Result:** 0 open claims; c4 deleted as the pass 24 fix asked. Nothing blocks on facts.

## Pass 26 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: claims left unverified or disputed by the wave G revision (build.md Pre-flight, latest). Method: read Demo.tsx (stem, stage strings, every control path, Reset or its absence, reduced-motion branches, reveal) against each claim, then re-ran the numbers in my own node ports of the lesson logic (scratchpad fc26-b0/). No outside source was opened; no claim below rests only on one.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node port (fc26-b0/jig.mjs, d3-geo + kit countries-110m, kit projection rotate [18,10] fitExtent): projection(POLE) = (129.2, -6.05), above the 270-px frame, so the branch pivot[1] < 8 draws the top-edge arrow labelled 'pivot just above (44 N)' (only when unlocked). The trail points rotation(POLE, 57k/100)(TIP) stay 51.241 deg from the pole at every k, so the trail is an arc of a circle about the pivot. deg(pct) = round(57*pct/100): slider format and Turned readout show 0..57 deg. Bulge ends at 7.27 E, 4.98 N (pass 24 fit check unchanged: POLE, ANGLE, TIP, outlines not edited). SyncOnReveal sets 100% on reveal after a fit. |
| c8 | verified | Same script: geoArea x R^2 (R 6371.0088) of the 12 countries + French Guiana = 17.886 million km^2, '17.9' at every integer slider value 0..100 (min = max to float precision), as a rotation must give. Squash: orthographic radial scale = cos c (rho = R sin c, d rho/dc = R cos c; tangential scale 1), so drawn area scales by cos c; the piece centroid moves from 41.7 deg to 12.1 deg off the view centre, predicted ratio cos12.1/cos41.7 = 1.31, measured projected path area 9,264 -> 12,128 px^2 (x1.31). Re-derived, not resting on the unopened Snyder text. |

**Result:** 2 verified, 0 disputed, 0 held unverified, 0 withdrawn.
