# Build note: the-contrary-program (demo-builder, 2026-10-13)

- Design intent: the learner plays the checker H. Three programs (D, A, B), each with two verdict buttons ("H: halts" / "H: loops forever"). Pressing one runs that program on the code card: the branch taken is highlighted and the outcome says whether H was right; each verdict button keeps a tick or cross.
- Key state: both verdicts given on D, both wrong. Milestones ["d-halts", "d-loops"], minInteractions 2. QA path: D halts, D loops, A halts (right), A loops, B halts, B loops (right), so the learner sees a verdict be right on ordinary programs.
- Reveal quotes the learner's D verdicts and names the programs on which they were right.
- Simplification (claim c2): "D runs H on its own description" is shown as "ask H: does D halt?".
- After first screenshots: v1 had one verdict pair plus program tabs; the QA path never judged A or B, so the reveal told "a verdict can be right" without showing it. Rebuilt as one row of verdict buttons per program.
