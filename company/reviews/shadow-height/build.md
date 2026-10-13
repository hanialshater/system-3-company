# Build note: shadow-height (demo-builder, 2026-10-13)

- Intent: the stick's triangle and the tree's triangle share one shadow tip, so both tops sit on the same dashed sun ray. Seven chips set the tree's shadow (3, 6, ... 21 m). The stage draws the tree on the ray plus a green staircase of stick-sized steps (3 across, 2 up), so 21 m reads as 7 steps and 14 m.
- Key state (one milestone): the tree's shadow is 21 m, the question's value. The chips are in increasing order, so QA's in-order presses visit 21 last and end on it.
- Numbers: the question, the options (14; 20 = add-the-difference; 31.5 = inverted ratio), the captions and the reveal all come from STICK_H, STICK_S and TREE_S in Demo.tsx. Recomputed in node.
- Locked: the tree height readout shows "?" and no tree is drawn.
- Deviation from brief: "drag the shadow length" became seven chips. QA presses each control once, and a slider's two arrow presses could not reach 21. The word "similar" is not used anywhere.
- After screenshots: chip labels shortened to plain numbers under one "Tree's shadow (m)" label, to stay inside the text budget. Dropped a duplicate shadow readout.
- All claims unverified, for the fact-checker.
