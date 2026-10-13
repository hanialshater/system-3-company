# Build note: powers-of-two-plus-one (demo-builder, 2026-10-13)

- Intent: blocks 1, 2, 4 ... 128 packed into a 16 x 16 grid by repeated halving, leaving one cell empty (dashed red). "Add one more unit" fills it; then eight chips (1 ... 128) join the pile to each block in turn, so the green pile doubles 2, 4 ... 256 until it fills the square.
- Key state (one milestone): the pile fills the whole square. Only the next chip is enabled, so QA's in-order press (Add, 1, 2 ... 128) walks the whole cascade. "Start over" comes last; the reveal reads a reachedFull flag, so a reset does not erase the run it quotes.
- Numbers: SIZES, TOTAL and the grid come from one layout() in Demo.tsx; the question is built from SIZES. No total readout before the end (only the pile size).
- Deviation from brief: "one control, one merge step per tap" became one chip per merge (QA presses each control once).
- After screenshots: the 1- and 2-cell blocks are small but distinct; unlabelled below 4 to avoid clutter. No change.
- All numbers recomputed with node; all claims unverified, for the fact-checker.
