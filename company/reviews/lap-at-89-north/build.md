# Build notes: lap-at-89-north

## v1 (2026-10-13, wave 4)
- Brief #39. Re-run: 2πR cos φ gives 698.6 km at 89°N, 3,488.9 at 85°N, 40,030.2 at the equator, 69.9 at 89.9°N.
- Brief wrong in passing: its key state "above 88.5°N, so the lap is under 1,000 km" fails at 88.5°N, where the lap is 1,048 km. Under 1,000 km needs above about 88.57°N. The gate is 89°N (the question's latitude). The brief's payoff ("circle the Earth in an afternoon") is not used: 700 km is not an afternoon's walk.
- Stage: an azimuthal equidistant map centred on the pole, zoomed so the chosen parallel is always 95 px in radius. A computed scale bar shows how far the zoom went. Presets (Equator, 60°N, 85°N, 89°N) come first, then a 0 to 89.9° slider.
- Key state: `big-lap` (a latitude of 60° or less) and `at-89`. The 85°N figure appears in the reveal only if it was visited (the QA path visits it).
- c6 (drifting sea ice) is from memory.
