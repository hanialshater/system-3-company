# Build notes: equinox-twelve-everywhere

## v1 (2026-10-13, wave 3)
- Changed from the brief: an Equirectangular world map at noon GMT replaces the orthographic globe. On a globe, half of every parallel is on the hidden side, so "half lit" cannot be seen. On Equirectangular a parallel is one horizontal line, so its lit share is visible end to end. The night side is drawn as screen polygons from the terminator formula. It is not a geoCircle, which degenerates when δ = 0.
- Date: a slider with five stops 1/8 year apart, using the simple model δ = -23.44° cos(angle). "early Feb" and "early May" are model dates (δ = ±16.6°); claim c3 says so. Latitude: 0-80°N in 10° steps.
- Key state: "equinox" plus "two-latitudes" (two different latitudes looked at while on the equinox). QA's path is: date 21 Dec → early Feb → equinox (at 40°N), then latitude 50°, 60°. So 60°N on the equinox, the question's value, is on the QA path.
- The reveal lists the latitudes the learner actually tried on the equinox. It quotes June's 18.5 h at 60°N only if the learner saw it.
- Iteration after the phone screenshot: the model caption was cut off at the right edge. Split it over two lines and grew the SVG to 184 px.
- Bug avoided: I first called reach() inside a setState updater. Moved it out, so interact() never runs during render.

## Revision v2

Why: learner review (2026-10-13, v1, revise).
- Title no longer says 12 ("Day length at 60 N in March"); hook rewritten to a neutral question.
- The stage opens at 60 N (the asked latitude) on 21 Dec and its readouts are visible from the start (5.5 h), so there is a "before". New claim c7 for 5.5 h.
- "Line lit" is now "Share of the day in sunlight"; "geometric day" jargon dropped.
