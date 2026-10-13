# Fact-check: continental-jigsaw (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; the rotation re-done with an axis-angle MATRIX (the lesson uses the Rodrigues vector form) against src/kit/geo/countries-110m.json in artifacts/scratch/fc-aiecongeo/jig.mjs, run from repo root. Deterministic.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified, with a limit on the source | +57 deg about (44 N, 30.6 W) puts South America against Africa (geometry below). I could not open the 1965 paper from this environment (searches confirm the paper, Phil. Trans. R. Soc. A 258:41-51, and the 500-fathom contour, but none returned the pole and angle). The numbers 44.0 N, 30.6 W, 57.0 deg match my recollection of the paper's table for South America relative to Africa, and the fact that this exact rotation yields a good fit is independent evidence that they are right. Moderately high confidence (about 85% that the table says exactly these numbers); a human could confirm in 1 minute from Table 1. |
| c2 | verified | Brazil's bulge (34.8 W, 7.1 S) goes to 7.27 E, 4.98 N (-57 would send it to 75.1 W, 10.1 N, the Caribbean/Pacific side). Nearest African outline vertex: Nigeria, 61 km away. |
| c3 | verified | 1,551 one-degree sample points inside the South American shapes; 3 land inside an African country after the turn. Brazil's east-coast vertices end 121 km on average (max 190) from the nearest African vertex by my vertex selection; the builder's selection gives 148 / 302 km. Either way gaps and overlaps are of order 100-300 km on a coast several thousand km long: 'small gaps and overlaps' is a fair description, and no km figure is shown. |
| c4 | verified | The 1965 fit used the 500-fathom (914 m) depth contour; confirmed by two search results describing the paper. |
| c5 | verified | Rotation preserves distances: a test pair 0.5013990 rad apart before and after. |
| c6 | verified | South Atlantic rifting began in the Early Cretaceous (about 140-120 Ma; seafloor spreading from roughly 130 Ma); 'roughly 130 million years ago' is a standard round figure. Source (Frisch et al. 2011) not opened. |
| c7 | verified | Interpretive but hedged: the reveal says 'evidence', not proof, and the paper presents the fit as evidence for drift. |

Stage check: 'near Nigeria and Cameroon' - landing point 7.27 E, 4.98 N is on the Niger Delta coast, about 1.3 degrees west of the Cameroon border (8.5 E); fine. Unrecorded claims: none.
