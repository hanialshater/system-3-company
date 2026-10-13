# Fact-check: three-giants-in-africa, 2026-10-13

## Pass 4 (2026-10-13)

Checker: fact-checker. Scope: claims still open after builder revisions (v2 rewrites, claim fixes) or never checked. I wrote none of these claims except where marked "added". Method: re-derived numbers in node from the lesson model code (scratch scripts in the session scratchpad), compared each claim with the stage and reveal text, checked sources by web search where reachable.

| Claim | Verdict | Text (short) | Basis |
|---|---|---|---|
| c1 | verified | The US (lower 48 and Alaska), China and India together cover about 22.0 million km², about... | Re-ran in node with d3-geo geoArea x 6371.0088^2 on the kit's 110m shapes: lower 48 7.98, Alaska 1.48, China 9.41, India 3.15 = 22.01 M km2; Africa (51 shapes in africa.json) 30.04; 73.3%; room 8.03. Published areas (US 9.83 total, China 9.60, India 3.29, Africa about 30.4 M km2 incl. islands) give about 75%, so 'about 73%' on coarse shapes is within 2 points; wording says 'about' and the stage names the shapes. |
| c2 | verified | Moving a country across the globe by a rotation on the sphere does not change its size. | Rotations of the sphere are isometries and preserve area; place() composes geoRotation only. Node confirms the moved pieces' geoArea equals the originals. |
| c3 | verified | On an Equal Earth map, drawn areas are proportional to true areas. | Equal Earth is an equal-area pseudocylindrical projection (Savric, Patterson and Jenny 2018, Int. J. Geographical Information Science 33(3):454-465). |
| c4 | verified | The placement shown fits the three countries inside Africa with about 3% of the pieces ove... | placements.json outsidePct = 2.57, shown as 'About 3%' (Math.round). The lesson says the placement is a search result and the answer rests on the total area. |
| c5 | verified | On a Mercator map the US and China, farther from the equator than most of Africa, are infl... | Mercator area scale is sec^2(lat) (Snyder ch. 7): about 1.7 at 40N (contiguous US), 1.5 at 35N (China), versus about 1.0-1.5 across most of Africa (which lies mostly within 35 deg of the equator). The stage has no Mercator view; stated only in the reveal. |
| c6 | disputed | On most world maps Africa looks like one big country. | Hook, learner-visible, unsupported and doubtful as written: world maps draw Africa with its borders and, on the Mercator maps most people know, make it look smaller than it is (sec^2 lat), not like 'one big country'. The recorded misconception (Africa is about as big as one big country) is about perceived size, which is a claim about people, not maps, and has no source. The builder's own note says it needs a source or softening. Fix: 'On a Mercator map Africa looks smaller than it is. Try fitting the giants inside it.' or cite a survey of perceived size and reword as 'Many people think Africa is about the size of one big country.' |

## Result (pass 4)
5 verified, 1 disputed, 0 left unverified, 0 added unverified.
