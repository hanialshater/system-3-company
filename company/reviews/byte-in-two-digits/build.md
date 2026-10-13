# Build note: byte-in-two-digits (demo-builder, 2026-10-13)

- Design intent: eight switch buttons in two boxed groups of four, place values 8 4 2 1 above each group, and under each group its value and one big hex symbol. The stage starts at the question's byte 11010110; the values and symbols show "?" until the prediction, so the answer is not on the locked stage.
- Key state: a flip in the left group (only the left symbol changes) and a flip in the right group (only the right one changes). Milestones ["high-only", "low-only"], minInteractions 2. QA path: all eight switches left to right: D6 → 56 → 16 → 36 → 26 → 2E → 2A → 28 → 29. The reveal quotes the start (D6), the first change in each group as seen, and the byte now on the stage ("0010 1001 = 29 in hex").
- Numbers: 13, 6, D6, the wrong options (C6, 6D) and every quoted change come from START/sym() in Demo.tsx. Node: parseInt('11010110', 2).toString(16) = 'd6'.
- Hook first named "D6" as an example (the answer) and then "3F" (the recall answer); now "A0 or 7C".
- After screenshots: reads on phone. "= 29" was ambiguous with decimal; now "29 in hex".
