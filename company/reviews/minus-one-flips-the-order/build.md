# Build note: minus-one-flips-the-order

builder: demo-builder (builder-wavej-math) · 2026-10-14 · v1 draft · brief: company/domains/briefs/math.algebra.md, Wave J, brief 4

- Intent: one number line −10 to 10 (16 px per unit, ticks every 1, labels every 5 at 12 px), a filled circle at 2 and a hollow square at 5 (told apart by shape), each with its value above it. A chip applies its operation to the original pair and tweens both shapes along an arc (320 ms, under the 450 ms QA wait; instant with reduced motion). A negative multiplier also draws a dashed "mirror" line at 0, the cause the reveal names. Readout: "circle 4 < square 10" with the true sign.
- Chips in brief order: "× 2", "− 3", "× (−1)", "× (−2)", Reset.
- Milestones (minInteractions 2): "kept" (first order-keeping chip recorded: its name and the two values), "flipped" (× (−1)).
- Trace: a log line lists every operation tried with its result ("× 2: 4 < 10 · × (−1): −2 > −5 …"), so Reset (back to 2 and 5) keeps the evidence.
- Title and hook are mine: "Times −1 on both sides" / "An equation stays true when you do the same to both sides. What about 2 < 5?" (hook claim c5).

## Pre-flight v1

1. Title and hook: neither says the sign flips.
2. Options: "−2 < −5" / "−2 > −5" / "−2 = −5": same form.
3. Locked stage: circle at 2, square at 5, "circle 2 < square 5" (the question's given), no mirror line.
4. Reveal values: the first order-keeping operation and its two values (milestone "kept"; log line); −2 and −5 (milestone "flipped"; log line).
5. QA path: × 2 (kept), − 3, × (−1) (flipped), × (−2), Reset: both by press 3.
6. Reset: reveal reads "Times 2 moved the dots to 4 and 10, and the circle stayed on the left. Times −1 mirrored both through 0: the circle landed on −2 and the square on −5, to its left. So −2 > −5. ..."; the log line still shows "× 2: 4 < 10" and "× (−1): −2 > −5".
7. Phone fit: see the measurement section below.
