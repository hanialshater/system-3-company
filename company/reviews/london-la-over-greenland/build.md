# Build notes: london-la-over-greenland

## v1 (2026-10-13, wave 3)
- Gnomonic map centred on the route's midpoint (clipped at 52°), with a Mercator toggle. Changed from the brief: there is no draggable LA pin. Instead a "Fly from London" slider moves a marker along the great circle, and a "Below the route" readout runs geoContains on the kit's 1:110m countries, prefiltered by geoBounds. The highlighted country is whatever is under the marker. This makes the learner find Greenland rather than be told about it.
- Re-computed in node: the route is 8,755.6 km. Greenland lies about 2,780-3,156 km out. The 250 km slider stops are Sea at 2,500 and Greenland at 3,000. The rhumb (straight on Mercator) line is 9,733 km (rhumbKm in Demo.tsx, shown on Mercator only).
- Key states: "greenland" (marker over Greenland) and "mercator" (route seen on Mercator). The slider starts at 2,500 km and comes first, so QA's two presses reach 3,000 km (Greenland). The toggle follows.
- Bug found in QA: I first started the slider at 2,000 km, thinking two presses meant +1,000. They mean +500 (two steps of 250), so the gate never opened. Fixed by starting at 2,500.
- Locked: the route, the marker and the readout are hidden, because the route drawn straight on the gnomonic map is the answer.
- The stage says "Shows under half the globe" and "No winds" (brief claims 5 and 4).
