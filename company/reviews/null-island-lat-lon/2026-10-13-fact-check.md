# Fact-check: null-island-lat-lon (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; geoContains/geoDistance against src/kit/geo/countries-110m.json and land-110m.json in artifacts/scratch/fc-aiecongeo/null.mjs (run from repo root). Deterministic.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | (0,0) is in no country shape and not in the land layer; none of 36 points on rings of 0.5, 1, 2 and 3 degrees radius is on land either, so the result does not depend on coastline detail. It is in the Gulf of Guinea by any atlas. |
| c2 | verified | Nearest outline vertex: Ghana at 4.71 N, 1.96 W, 567.4 km (next: Cote d'Ivoire 640, Togo 670, Benin 714, Nigeria 757). The lesson says 'on this map', and the shown 570 km is the 10-km rounding. Small islands such as Annobon (about 650 km) are absent at 1:110m but would be farther anyway. |
| c3 | verified | Definitions; the prime meridian was adopted at the 1884 International Meridian Conference in Washington. |
| c4 | verified | Quito 0.18 S 78.47 W (about 20 km from the equator); Nairobi 1.29 S 36.82 E (about 143 km); Greenwich Royal Observatory 51.48 N, on the meridian by definition. These coordinates are the standard gazetteer values from my knowledge; I could not open GeoNames. 'Close to latitude 0' is a fair description of 0.2 and 1.3 degrees. |
| c5 | verified | The equator is fixed by the rotation axis; the zero of longitude is a convention. Framing sentence. |

Stage check: the Demo.tsx targets (Quito -0.2, -78.5; Nairobi -1.3, 36.8) are rounded versions of the gazetteer values. Unrecorded claims: none. The stage text 'the grid does not care what is underneath' is a framing sentence.
