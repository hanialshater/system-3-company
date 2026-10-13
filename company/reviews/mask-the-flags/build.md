# Build note: mask-the-flags (demo-builder, 2026-10-13)

- Design intent: three aligned rows of five: settings 10110 (fixed), mask (five tap buttons, starts at the question's 00110), and "AND gives" result (shows ????? while locked). AND / OR / XOR buttons under it; the line above states the current rule in one short sentence ("AND: 1 only where both are 1."). Result cells under a marked mask place are outlined, so the learner sees which places the mask touches.
- Key state: a mask change under AND, then OR used, then XOR used. Milestones ["and-mask", "or", "xor"], minInteractions 3. QA path: mask places 1-5 (under AND), OR (10110 OR 11001 = 11111), XOR (10110 XOR 11001 = 01111). The reveal quotes the start (00110) and the OR/XOR equations the learner actually produced; the stage at reveal shows the XOR one.
- Deviation from brief: the settings row is fixed (not tappable) so the question's 10110 stays on the stage; only the mask is manipulated.
- Numbers: 00110 and every quoted equation come from combine() in Demo.tsx. Node: 0b10110 & 0b00110 = 0b110.
- Retitled: "Which settings survive the mask?"; hook no longer promises a yes.
- After screenshots: reads on phone; no changes.
