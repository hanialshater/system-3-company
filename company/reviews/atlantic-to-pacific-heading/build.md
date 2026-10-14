# Build notes: atlantic-to-pacific-heading

v1 (2026-10-13, Wave 5 geography, sonnet build, EXP-003). Brief 48 (`canal-runs-southeast`), renamed because the slug gave the answer.

- Mercator map zoomed on Panama, 94 px per degree of longitude. Ends are drawn only after the prediction (the two markers would show the answer on a locked stage). Node check: 141.50 deg (shown as 142) (the brief's 140.9 differs by the end coordinates), 58.2 km, 0.33 deg east.
- The ship triangle, readout and reveal use one bearing() function. The heading is the straight-line bearing, and the stage and reveal say "overall".
- Colon falls just outside the 1:110m Panama polygon (geoContains false); noted in claim c1 rather than hidden.
- Gate: ship sailed to the Pacific end. Heading readout "?" while locked. All claims unverified; end coordinates from memory.

## Revision v2

Why: learner review (2026-10-14, v1, revise).
- Zoomed out (scale 2700) so the isthmus is seen running east-west; both seas labelled on the stage, always (Caribbean Sea (Atlantic side), Pacific Ocean).
- The track now grows with the ship (it used to draw the whole line at once), and the heading readout reads "not sailed yet" at 0% instead of 142 (zero state).
- "0.33 degrees of longitude" removed from the reveal and claim c3; c4 reworded to say what the map shows. c3, c4 are unverified again.
- Not done: letting the learner aim the heading first. The reveal still says the Atlantic end is "north" of the Pacific end only through the map labels.

## Revision v3 (wave C builder 13, 2026-10-14)

- Review (r2): Panama was filled sea-blue, the Pacific label sat on land, the slider changed nothing, 58 km was never on stage. Fix: no highlight (grey land, pale sea, with a legend line), Pacific label moved into the water, a 'Straight-line distance so far' readout grows with the slider and reaches the 58 km the reveal quotes.
- Edited claims were reset to unverified and match the stage text; version bumped. Local QA run; walkthrough sheet looked at.
