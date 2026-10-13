# Build notes: high-satellite-view

v1 (2026-10-13, Wave 5 geography, sonnet build, EXP-003). Brief 41 (`satellite-sees-42-percent`), renamed because the slug gave the answer.

- Orthographic globe; visible cap is `geoCircle` of half-angle acos(R/(R+h)); readout, drawn circle and the reveal's numbers come from the same two functions (capAngleDeg, share). Verified in node: 81.31 deg, 42.44% at 35,786 km; 6.78% at 1,000 km.
- Options reworded (50% / under half, about 40% / 25%) so the option text does not carry the exact answer. Start height is 1,000 km so every preset button changes the stage.
- Gate: milestone `geostationary` (height exactly 35,786 via preset or slider). Readout hidden ("?") while locked.
- Phone screenshot: reveal was clipped, so it was cut to ~50 words.
- Model label on the stage (spherical Earth, equator); no usable-service claim beyond "on the horizon at the edge".
- Claims c1 and c8 are from memory (ISS/GPS/geostationary heights); c1-c9 all unverified.
