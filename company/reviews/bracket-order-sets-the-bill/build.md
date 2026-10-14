# Build note: bracket-order-sets-the-bill (demo-builder, algo2-sa, 2026-10-14)

- Design intent (spec `company/design/specs/bracket-order-sets-the-bill.md`): two stacked panels, (AB)C and A(BC), each matrix a box drawn at 2 px per row or column (A 60×20, B 10×60, C 120×10 px). Step 1 replaces the pair with its middle product (tinted `--domain`): AB is a 10×20 px sliver, BC a 120×60 px slab. Step 2 gives the hatched 10×60 result R. Each step's cost (p·q·r) is printed at the right of its panel. A shared cost ruler below holds one bar per panel on 0 to 27,000 with ticks every 4,500 (tick labels appear after the first price), so bar 2 is six ticks. When both are done, panel 2 shows "✓ same 10×60 as above".
- Controls in DOM order: Multiply A·B, Then (AB)·C, Multiply B·C, Then A·(BC). Each step button is enabled only when it is next; no reset.
- Key state: milestones `ab-first-priced`, `bc-first-priced`, minInteractions 2. QA path: the four buttons in order (1,500, 4,500, 9,000, 27,000).
- Numbers: every cost on the stage and in the reveal is computed by mul() from the box sizes (TOP, BOT, RATIO); re-ran in node: 1500 + 3000 = 4500, 9000 + 18000 = 27000, ratio 6. Recall: 2x50, 50x2, 2x50 gives 400 vs 10,000. Brief answer C held.
- Deviations from spec: the 200 ms merge animation is not built (the pair is replaced on the press). Bars labelled "top"/"bottom".
- Not run (by instruction): build, typecheck, QA, walkthrough. Screenshots not yet looked at; the 27,000 label sits inside the bar end in dark text, check contrast on the domain colour.
