# Build note: cheapest-is-not-shortest (demo-builder, 2026-10-13)

- Design intent: four towns, with the direct S–G road (10) drawn as the short straight bottom line and S–A–B–G (2 each) drawn as the long way round. Each town is a button showing its label (cheapest cost from S found so far; "?" while locked, ∞ before it is reached). Tapping the unsettled town with the smallest label settles it and updates its neighbours. The message shows the sums ("B settled at 4. G: 4 + 2 = 6 (was 10)."). A wrong tap says whose label is smaller. "Start again" comes first in the DOM, disabled before any settle, and is shown last.
- Key state: the first settle, then G settled (after its label dropped 10 to 6). Milestones ["first-settle", "g-settled"], minInteractions 2. QA path: S, A, B, G in DOM order, which is the correct settle order. The reveal quotes G's label history ("10 then 6") as recorded from the learner's run.
- Numbers: 10, 2 and 6 come from ROADS/runAll() in Demo.tsx; Node re-run: S 0, A 2, B 4, G 6.
- Retitled: the slug gives the answer; title "One road or three?".
- Known weakness: the prediction is plain arithmetic (2+2+2 < 10), as briefed. The lesson's value is the settling procedure, not the surprise. Flag for learning-designer if reviewers find it too easy.
- After screenshots: reads on phone. No changes.

## Revision v2 (wave C, learner review)

- Label and infinity undefined: the starting message says a label is the cheapest cost found so far and that the infinity sign means not reached yet (c5).
- Safe-order reason was told: settling G now shows the later route back to S costing more than S's settled label (c3).
- DISAGREE: 'make the prediction about the procedure'. The question tests whether the long way is cheaper; I judged a procedure question (which town is settled second) would be answerable by reading the smallest label. Left as is; the learner review's real complaint (arithmetic is easy) stands for the designer.

All changed claims are unverified, awaiting a fact-checker.
