# Build note: wave-from-the-corner (demo-builder, 2026-10-12)

- Design intent: a 5x5 grid; 'Next ring' grows a BFS wave and labels each cell with its distance, shading by ring; tapping cells builds walls and the labels bend around them. The goal shows 'G 8' on the open grid.
- Reveal gate: interact() only when the wave first reaches G, so the learner sees the goal's label.
- After the first QA run: wall toggles at ring 0 changed only a CSS class, which counts as 'nothing observable' (and was hard to see); walls now render a brick element.
- After screenshots: the grid fits the phone with 56px cells; the controls above the grid keep the wave and the walls in one place.
