# Build notes: centre-moves-the-gap

## v1 (2026-10-13, wave 3)
- Equirectangular WorldMap (scale W/2π) with Tokyo (Haneda) and Los Angeles (LAX) as markers. The gap readout is measured from the projected x positions (gapDegrees). The question's 258° and the option's "about 100°" (102° on the map) come from the same function at centres 0 and 180.
- I used LAX instead of the brief's downtown LA, so both ends are airports: 258.19° / 101.81° (the brief has 258.02 / 101.98). The rounding is the same.
- Key state (milestone "pacific"): any centre where the cut falls between them on the Atlantic side (gap < 180°). The "Centre on the Pacific" chip comes first in DOM order, so QA reaches the key state on its first press. Then come the Greenwich chip and a 10° slider for finding where the jump happens.
- The great-circle distance (8,810 km) is shown and never changes. That carries the "nothing moved" half of the payoff on the stage.
- Iteration after the phone screenshot: the km figure had no thousands separator. Fixed.

## Revision v2

Why: learner review (2026-10-13, v1, revise).
- Hook rewritten to stop leaning to "not far"; option 1 now reads "The same, 258 degrees" and the "2.5 times closer" is out of option 2.
- The shortest route (dashed blue) is drawn on the map and wraps off one edge and back on the other when the map is centred on Greenwich, so 8,810 km is shown, not asserted. Real distance and route are hidden while locked (they used to show from the first frame).
- Caption now says the map is 360 degrees wide and the red bar is the part between the cities; new convention claim c5. c3 reworded ("shortest route"); unverified.
