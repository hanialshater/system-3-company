# Build notes: atlantic-to-pacific-heading

v1 (2026-10-13, Wave 5 geography, sonnet build, EXP-003). Brief 48 (`canal-runs-southeast`), renamed because the slug gave the answer.

- Mercator map zoomed on Panama, 94 px per degree of longitude. Ends are drawn only after the prediction (the two markers would show the answer on a locked stage). Node check: 141.50 deg (shown as 142) (the brief's 140.9 differs by the end coordinates), 58.2 km, 0.33 deg east.
- The ship triangle, readout and reveal use one bearing() function. The heading is the straight-line bearing, and the stage and reveal say "overall".
- Colon falls just outside the 1:110m Panama polygon (geoContains false); noted in claim c1 rather than hidden.
- Gate: ship sailed to the Pacific end. Heading readout "?" while locked. All claims unverified; end coordinates from memory.
