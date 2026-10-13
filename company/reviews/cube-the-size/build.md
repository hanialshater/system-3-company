# Build note: cube-the-size (demo-builder, 2026-10-13)

- Intent: one 2-inch cube (green, 1 kg) at a fixed screen size. The width slider (2, 4, 6, 8 inches) fills a cube k times as wide with k x k x k of the small cubes, drawn isometric. "Split into layers" lifts the layers apart and labels each one k x k.
- Key state (one milestone): width 6 inches (k = 3), 27 small cubes, 27 kg. QA's two slider presses go 2 -> 4 -> 6 inches. The split toggle (the next control) then shows 3 layers of 9.
- Numbers: the question, the options (3, 9, 27), the readouts and the reveal come from k and TARGET_K. Recomputed in node.
- Locked: the cube count and weight read "?".
- Deviation from brief: layers appear through a toggle, not an animation (QA waits 450 ms, and the standard prefers manipulation to animation).
- After screenshots: the split view drew lower layers over upper ones (painter's order by x+y+z). It now sorts layer by layer, back to front.
- All claims unverified, for the fact-checker.
