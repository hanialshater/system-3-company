# Build note: outlier-flattens-line

- Intent: one scatter of five points, the least-squares line, and each point's squared miss drawn as a square (equal px per unit on both sides). Controls in order: "Drop to y = 0", "Compare: y = x" toggle (draws the old line and its squares in red), red-point height slider (0..5, step 0.5), "Back to 5". The red point can also be dragged. Readouts: slope, sum of squares. Line, squares and readouts hidden while locked.
- Key states: "flat" (fifth point at (5,0)) and "compare" (old line shown with the point at 0). QA path reaches both with the first two controls.
- Node check (fit() as in Demo.tsx): y5 = 5 → slope 1; 4 → 0.8; 2 → 0.4; 0 → slope 0, intercept 2, SSE 10 (1,0,1,4,4); y = x at y5 = 0 costs 25.
- The fifth point starts at (5,5), so the slope 1 named in the question is what the stage shows first (at (5,4) the fit would be 0.8).
