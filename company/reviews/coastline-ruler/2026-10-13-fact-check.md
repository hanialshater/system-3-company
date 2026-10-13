# Fact-check: coastline-ruler (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; recomputed from src/kit/geo/countries-110m.json with topojson-client and d3-geo (azimuthal equidistant centred on Great Britain's centroid, R = 6371.0088 km) in artifacts/scratch/fc-aiecongeo/coast.mjs, run from repo root. Deterministic, no seeds.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Divider walk on the largest polygon of 'United Kingdom': 200 km = 2,385 km (11 steps), 100 km = 2,642, 50 km = 3,002, 25 km = 3,159. A second, independent method (resample the outline every 50 m, march until the straight distance reaches the ruler) gives exactly the same four totals. |
| c2 | verified | The ring has 48 coordinates = 47 corners; planar perimeter 3,404.0 km (3,403.1 km on the sphere). Rulers of 10 and 5 km give 3,330 and 3,359 km, below the perimeter, as a chord sum must be. |
| c3 | verified | Richardson (1961, General Systems Yearbook 6) and Mandelbrot (1967, Science 156:636-638) are the standard sources for ruler-size dependence; the computed totals show the effect directly. Two distinct authors. |
| c4 | verified | Web search confirms both figures: CIA World Factbook gives about 12,429 km for the whole UK, Ordnance Survey about 17,820 km (11,073 miles) for Great Britain alone, which is a part of the UK yet larger; a WRI figure of about 19,717 km also appears. The lesson quotes none of the numbers. I did not open the Factbook or OS pages themselves. |

Stage check: 'its total can never pass 3,404 km' is correct for the outline (a chord sum cannot exceed the polyline length). The reveal's 'published lengths for Britain disagree ... for exactly this reason' is a causal claim; scale dependence is the standard explanation (Mandelbrot), but definitions (islands, tidal inlets, high vs low water) also differ, so 'exactly' is a bit strong. Suggest 'largely for this reason' (wording, not a false claim). Unrecorded claims: none beyond the above.
