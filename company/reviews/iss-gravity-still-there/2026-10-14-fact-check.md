# Fact-check: iss-gravity-still-there (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, reveal, model) against each open claim; re-ran the numbers in node with own re-implementations of the lesson's model (mulberry32 copied from src/kit/random.ts); web sources by search only (the proxy blocked every primary host tried: dl.acm.org, wikipedia, os-book.com, nasa.gov, university hosts). Search-result text is marked as such below.

Walkthrough transcript (recorded 08:21Z) predates the v2 throw stage; claims checked against Demo.tsx only. A fresh walkthrough is needed before launch review.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Own velocity-Verlet re-run of fly(): 3 and 7 km/s land; 7.67 km/s (sqrt(GM/6771) = 7.673) keeps r = 6771.000 km for 93 min, matching the station's circle (same start, same clockwise direction in Demo.tsx). Same position gives same gravity for ball and station (inverse square, no mass dependence). NASA 'What Is Microgravity?' not opened (nasa.gov blocked); secondary search-result text agrees (free fall, falling around Earth). Walkthrough transcript (08:21Z) predates v2 and shows no throw; checked against Demo.tsx only. |
| c6 | verified | near = k <= 1 zooms to the ISS orbit (NEAR_KPX), else to geostationary (FAR_KPX); chips 'Zoomed in, to scale. Round Earth, no air.' / 'To scale. Round Earth, spin ignored.' Model has no spin or drag. WGS 84 g 9.780 to 9.832 m/s^2 is about 0.5% (my knowledge). |
| c7 | verified | Own re-run, 1 s steps: 3 km/s lands at 5.45 min, 961 km arc; 7 km/s at 12.57 min, 5,176 km; 0.1 s steps give 960 km / 5,172 km (step size changes km by under 0.1%). Circular period 92.4 min. Readout strings match ballText. With 3-minute steps the 3 km/s readout first shows 'landed' at 6 min. |
| c8 | verified | (6371/12742)^2 = 0.25, shown 25.0%; 400/6371 = 0.063. Reveal branch on seen.stops.includes(2) matches the source note. |
