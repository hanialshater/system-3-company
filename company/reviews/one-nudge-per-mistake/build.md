# Build note: one-nudge-per-mistake

- Intent: one square plot with the five labelled points, the current line (clipped to the box) and its "+" side shaded. Ring colour = right/wrong under the current line; dashed ring = next point to check. Caption narrates the last check ("(−1,0) −: score 0 → wrong, nudge"). Controls in order: Check next point, Rest of sweep (only mid-sweep), Full sweep (only at a sweep start), Start over. Readouts: nudges, sweep.
- QA press once each, so stepping is split into three buttons: Check next (nudge 1 at (1,1)) → Rest of sweep (nudge 2 at (−1,0)) → Full sweep (sweep 2 clean) → Start over.
- Key states (milestones): "second-nudge" and "clean-sweep". Locked: no line, no shade, black rings, readouts hidden.
- Node check (checkOne as in Demo.tsx, rule w ← w + l·(x,y,1) when l·score ≤ 0): [1,1,1] after (1,1), [2,1,0] after (−1,0); sweep 2 has 0 mistakes. Option "2" computed by untilClean().
- Zero score counts as wrong: toy convention, stated in the locked caption and c2.
