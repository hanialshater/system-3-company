# Fact-check: shrinking-degree (2026-10-14)

## Pass 26 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: claims left unverified or disputed by the wave G revision (build.md Pre-flight, latest). Method: read Demo.tsx (stem, stage strings, every control path, Reset or its absence, reduced-motion branches, reveal) against each claim, then re-ran the numbers in my own node ports of the lesson logic (scratchpad fc26-b0/). No outside source was opened; no claim below rests only on one.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | disputed | DISPUTED. The sphere arithmetic is right (node: pi*6371.0088/180*cos(lat) = 55.598 at 60 N, 19.309 at 80 N, 111.195 at the equator; readouts print 55.6, 19.3, 111.2 and the reveal quotes them). But the sentence states one-decimal values as the length on Earth, and on the WGS84 ellipsoid they are 55.80 km at 60 N, 19.39 km at 80 N and 111.32 km at the equator (pi*a*cos(lat)/(180*sqrt(1-e^2 sin^2 lat))); the lesson's own c4 tells learners the equator degree is 111.3 km, while c2 calls it 111.2. Nothing on the stage or in the reveal says the globe is a sphere (caption: 'A globe.'). Pass 9 verified the old 'about 56' / 'about 19', which hold for the real Earth. Fix (builder): either say the model on stage and in the claim (e.g. caption 'A globe, treated as a sphere of radius 6,371 km' and claim 'On a sphere of radius 6,371 km, ...'), or drop to the precision that holds for Earth ('about 56 km', 'about 19 km', 'about 111 km'). |
| c7 | verified | Readout = Math.round(10 x degLonKm(lat)): 556 at 60 N (10 x 55.598), 1,112 at 0, 193 at 80 N (node); labelled 'Box width, 10 deg of longitude', computed on the box's middle parallel. 'About 556 km' also holds on WGS84 (558 km). |

**Result:** 1 verified, 1 disputed, 0 held unverified, 0 withdrawn. The lesson cannot publish until the builder fixes the disputed claim and it is re-checked.

## Pass 27 (2026-10-14, re-check of pass 26 disputes and rewordings, W-254)

Checker: fact-checker (wrote and built none of these claims). Method: read the pass 26 dispute, then the new Demo.tsx on every reachable branch, including the exact path that failed in pass 26, plus Reset and reduced motion where they exist. Then I re-ran the numbers in my own node scripts (session scratchpad fc27/). No builds. External source hosts were refused (proxy 403 / DNS), so nothing below is verified on an unopened source.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Pass 26 dispute resolved. The caption ('A globe, treated as a sphere of radius 6,371 km.') and the reveal ('on this sphere of radius 6,371 km') now name the model the one-decimal values hold for. Own node, R = 6371.0088 and 6371: 111.195, 55.598, 19.309 km, printing 111.2, 55.6, 19.3. Half holds exactly (cos 60 = 0.5). 19.3 is printed only after a stop at 80 N. |

**Result:** 1 verified, 0 disputed, 0 held unverified.
