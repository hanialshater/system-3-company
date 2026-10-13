# Fact-check: mercator-greenland, second check (2026-10-13)

Checker: fact-checker (a different checker from the 2026-10-12 record, which verified c1-c2, c4-c7 and added c10 and c12, so I check those additions). Scope: open claims c3, c8, c9, c10, c12. Method: transcript + Demo.tsx; recomputed with topojson-client and d3-geo against src/kit/geo/countries-110m.json in artifacts/scratch/fc-aiecongeo/mg.mjs (run from repo root); the slide is re-implemented with an axis-angle rotation matrix instead of the kit's moveToLatitude. Deterministic.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | With the lesson's projection (geoMercator, scale W/2pi, translate [160,166], clip to 320 x 236) the drawn area of Greenland over DR Congo is 15.387 at its real position (rounded to 15 in the question). The map spans 85.6 N to 61.6 S and Greenland's drawn bounds (y 18.8 to 98.9) are inside the frame, so nothing is clipped. Unclipped gives the same 15.387. |
| c8 | verified | Mercator's 1569 world map was titled 'Nova et aucta orbis terrae descriptio ad usum navigantium emendate accommodata' ('for the use of navigators'). I am confident of the title but did not open it this session; the lesson's explanation (angles kept true, rhumb lines straight) is the c5 claim already verified. |
| c9 | verified, loose | On a Mercator map Greenland's drawn area is 1.08 times that of all of Africa (51 African shapes) while its true area is 0.073 times (computed). So on Mercator-style wall maps it does look enormous. 'Wall maps' in general is broader than Mercator (several modern wall maps use Winkel Tripel or Robinson, which inflate less); the hook is a rhetorical opener and the stage shows the Mercator case. A wording of 'Mercator wall maps' would be exact. |
| c10 | verified | A rigid rotation about the axis perpendicular to Greenland's meridian leaves its area unchanged at every slide from 0 to 73 degrees: 2,189,757 km2 each time (differences below 0.001 km2). Sliding south moves the centroid from 73.15 N to 0.15 N. Sliding by the same amount leaves the drawn Mercator ratio at 15.39, 5.12 (10 deg), 1.81 (30), 0.99 (60) and 0.94 (73); on Equal Earth it is 0.938 both ways. I did not write c10 (a previous checker added it), so this is an independent check. |
| c12 | verified | Lesson data: Greenland 2,189,757 km2, DR Congo 2,333,678 km2, ratio 0.938; Factbook areas 2,166,086 and 2,344,858 give 0.924. Greenland is slightly smaller than Congo, as the reveal says. |

## Note on an already-verified claim (c4)
c4 is marked verified (earlier checker) with a source note that 'the lesson's own readout 10.73x'. In the current build the area-weighted stretch of the Greenland shape is 16.4 times that of Congo (drawn ratio 15.39 over true ratio 0.938), because Greenland reaches 83 N where sec^2 is far above the 11.7 at its 73 N centroid. 'More than ten times' is true, but the source note's 10.73 is stale and the centroid-latitude shortcut understates the effect. Suggest demo-builder refresh that sentence. I have not changed c4's status.

Unrecorded claims: none beyond those above.
