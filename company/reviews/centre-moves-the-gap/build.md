# Build notes: centre-moves-the-gap

## v1 (2026-10-13, wave 3)
- Equirectangular WorldMap (scale W/2π) with Tokyo (Haneda) and Los Angeles (LAX) as markers. The gap readout is measured from the projected x positions (gapDegrees). The question's 258° and the option's "about 100°" (102° on the map) come from the same function at centres 0 and 180.
- I used LAX instead of the brief's downtown LA, so both ends are airports: 258.19° / 101.81° (the brief has 258.02 / 101.98). The rounding is the same.
- Key state (milestone "pacific"): any centre where the cut falls between them on the Atlantic side (gap < 180°). The "Centre on the Pacific" chip comes first in DOM order, so QA reaches the key state on its first press. Then come the Greenwich chip and a 10° slider for finding where the jump happens.
- The great-circle distance (8,810 km) is shown and never changes. That carries the "nothing moved" half of the payoff on the stage.
- Iteration after the phone screenshot: the km figure had no thousands separator. Fixed.
