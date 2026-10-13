# Build notes: fingernail-ocean

## v1 (2026-10-13, wave 2)
- Map: Equal Earth rotated to centre on 30 W (geoEqualEarth().rotate([30, 0]), 320 x 170), 1:110m countries in a custom SVG, because WorldMap cannot leave a country out.
- Toy, labelled on the stage: South America (the 1:110m shapes of its 13 countries and territories, plus the French Guiana part of the France MultiPolygon) is rotated about the Earth's axis by (2.5 cm/yr x time) / (R cos 10 degrees). The stated km is exact along 10 S and smaller farther south. It is not a plate reconstruction. A dashed ghost marks today's position. Panama is left in place. The land polygon could not be used for the shape: at 1:110m it joins the Americas, and Africa to Eurasia.
- Brief answer holds by arithmetic: 3,000 km / 2.5 cm a year = 120 million years (TARGET_MYR in Demo.tsx).
- Fingernail rate: I recall about 3.5 mm/month (about 4 cm a year), so the hook and question say "about as fast as". Claim c2 is flagged.
- Key state: 3,000 km of new ocean on the readout, with the strip of new ocean visible. One milestone, "ocean". The controls are add-time chips (+100, +20, +5 million years, then Back to today). +100 then +20 lands exactly on 120, so QA reaches the key state on its second press.
- Locked: the "New ocean" readout shows "?".
- Iteration: the QA phone shot ends on "Back to today", where the moved shape covers its ghost. That is expected, and I made no change.
