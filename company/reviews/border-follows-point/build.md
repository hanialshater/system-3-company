# Build note: border-follows-point

- Intent: a plane with A (movable) and B fixed at (4, 0), each region shaded by the nearer point, the border line, the A–B segment with its midpoint, and the axis crossing marked. Sliders: A across (x from -4 to 0) and A up (y from -2 to 2).
- Key state: A at (-2, 0) (milestone "a-at-minus-2"). The x slider starts at its maximum (0), so QA's two left presses land exactly on -2.
- One point per class, not the brief's "handful of dots", so the stage matches the question exactly; the reveal names the many-point case (Voronoi pieces) in words only.
- After screenshots: A's region was drawn over B's and blended to grey; each region is now its own clipped polygon.
