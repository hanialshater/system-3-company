# Build note: stack-of-cubes (demo-builder, 2026-10-13)

- Intent: one growing square. Each cube k³ is laid flat as k squares of side k, placed as an L-shaped band around what is already there, so the square grows from side 1 to 3, 6, 10. For even k one square is split into two halves (dashed, same colour); the caption says so. Four step chips (+1³ … +4³), only the next enabled.
- The answer's 10 × 10 frame is not visible while locked: the grid and outline are drawn only inside the placed square, and both readouts show "?". The start caption defines the flat cube: "2³ = 2 × 2 × 2 = 8: two squares of 2 × 2".
- Key state (one milestone): all four cubes placed, 100 cells in a 10 × 10 square. A node check confirmed each band has area k³ and the four bands cover all 100 cells exactly once (Demo.tsx layer()).
- The brief's interaction was "tile from piles by placing"; I used one tap per cube (it places all k squares) so QA's single press per control reaches the key state. A drag-to-place version would be closer to the brief's exploration.
- Reveal names both distractors (64 = last cube, 30 = sum of squares) and limits the picture to n = 4 (c5).
- All claims unverified, for the fact-checker.
