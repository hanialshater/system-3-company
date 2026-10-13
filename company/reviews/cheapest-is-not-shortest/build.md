# Build note: cheapest-is-not-shortest (demo-builder, 2026-10-13)

- Design intent: four towns, with the direct S–G road (10) drawn as the short straight bottom line and S–A–B–G (2 each) drawn as the long way round. Each town is a button showing its label (cheapest cost from S found so far; "?" while locked, ∞ before it is reached). Tapping the unsettled town with the smallest label settles it and updates its neighbours. The message shows the sums ("B settled at 4. G: 4 + 2 = 6 (was 10)."). A wrong tap says whose label is smaller. "Start again" comes first in the DOM, disabled before any settle, and is shown last.
- Key state: the first settle, then G settled (after its label dropped 10 to 6). Milestones ["first-settle", "g-settled"], minInteractions 2. QA path: S, A, B, G in DOM order, which is the correct settle order. The reveal quotes G's label history ("10 then 6") as recorded from the learner's run.
- Numbers: 10, 2 and 6 come from ROADS/runAll() in Demo.tsx; Node re-run: S 0, A 2, B 4, G 6.
- Retitled: the slug gives the answer; title "One road or three?".
- Known weakness: the prediction is plain arithmetic (2+2+2 < 10), as briefed. The lesson's value is the settling procedure, not the surprise. Flag for learning-designer if reviewers find it too easy.
- After screenshots: reads on phone. No changes.
