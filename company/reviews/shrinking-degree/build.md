# Build notes: shrinking-degree

## v1 (2026-10-12, wave 1)
- Arithmetic only: 111.195 km x cos(lat); 55.6 km at 60°N, 19.3 at 80°N. Brief answer (56 km) holds. The readout uses the along-parallel length, not geoDistance's chord.
- Reveal unlocks when the box reaches 60°N (slider or chip).
- Iteration 1: the box polygon had to be clockwise in (lon, lat), or d3 fills the whole globe minus the box.
- Iteration 2 (after looking at the phone screenshot): at a fixed globe view the 60°N box was too small to see narrowing, and the Oslo/Helsinki labels overlapped. The globe now tilts to follow the box and is zoomed 1.4x, a dashed copy of the box stays at the equator for comparison, and Oslo's label sits to the left.
