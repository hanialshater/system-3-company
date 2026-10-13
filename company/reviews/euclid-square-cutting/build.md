# Build note: euclid-square-cutting (demo-builder, 2026-10-13)

- Intent: a 48 x 18 floor drawn to scale. Each "Cut" chip cuts the biggest square off the rectangle that is left (euclid() in Demo.tsx): 18, 18, 12, 6, leaving a green 6 x 6 square. "Tile with the last square" then lays 8 x 3 = 24 tiles over the floor.
- Key state (one milestone): the leftover is a square. Only the next chip is enabled, so QA's in-order presses make the four cuts. The reveal reads a finished flag, so "Start over" (last control) does not erase the run it quotes.
- Numbers: cuts, leftover, tile count and the right option all come from euclid(48, 18); the distractors 9 and 12 are from the brief.
- Deviation from brief: one tap per cut became one chip per cut (QA presses each control once). The four chips show how many cuts there will be; accepted.
- After screenshots: the toggle label read "Tile with its" before the end; now "Tile with the last square". Tinted the uncut rectangle so the empty floor reads as a floor.
- All numbers recomputed with node; all claims unverified, for the fact-checker.
