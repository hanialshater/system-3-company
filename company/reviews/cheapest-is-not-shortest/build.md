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

## Revision v3

r2: the opening caption defines label, infinity and settle; hook no longer gives away that the long way is cheaper. c5 rewritten, unverified. NOT done: the prediction is still plain addition (needs a graph with unequal costs; that is a design change for the learning designer).

## Revision v4 (wave E, r6 learner review)

- r6 #1 (the stem did the sum): the question no longer prints totals. It now asks about the BFS habit the learner brings: "When S is settled, G gets its first label from the straight road. What happens to G's label before G is settled?" (stays / goes down / goes up). The graph has unequal costs (S–G 10, S–A 3, S–B 8, A–B 4, B–G 2), so G goes 10 → 9 and B also drops 8 → 7 before it is settled.
- r6 #2 (label and ∞ gone after first tap): the definition is now a fixed line under the map.
- r6 brief (why smallest-first is safe is told): each settle prints a "why" line from the labels just before it ("Other ways to A pass B 8 or G 10: already more."), and the message shows a later route to a settled town that is not S ("B to A: 11, more than A's 3").
- The run (G's label history and the last later-route check) is recorded at the g-settled milestone; the reveal and a "Your run" row read the record, so Start again does not wipe them.
- Changed claims c1, c2, c3, c5 are unverified.

## Pre-flight v4

1. Title and hook: "One road or three?" / "The straight road to G, or a route with more roads. Which costs less?" A question, no side taken; it does not say whether G's label moves.
2. Options: "It stays the same" / "It goes down" / "It goes up". Same wording, no numbers in any.
3. Locked stage: roads with their costs (10, 3, 8, 4, 2) and towns labelled "?". No label, line or highlight marks "goes down"; a learner can work it out by adding, which is the reasoning, not a leak.
4. Reveal values: "10 then 9" is run.g, recorded from the learner's own label changes at milestone g-settled (b). "G back to B would cost 11, more than B's settled 7" is run.back, computed by backRoute() on the learner's own G settle, recorded at the same milestone (b).
5. QA path: Start again (disabled at first), S, A, B, G in DOM order is the correct settle order: first-settle at S, g-settled at G. Both quoted values stay on stage in the "Your run: G 10 → 9. G to B: 11 > 7." row.
6. Reset: Start again pressed after G clears the map labels but not the run record or the row. Reveal from that run: "G's label went 10 then 9. The first came from the one straight road; settling B found a route with three roads that costs less. First found is not final, and the fewest roads was the dearest. / Settling the smallest label is safe: any other way to that town passes a label at least as big, and costs only add. Your run showed it: G back to B would cost 11, more than B's settled 7. This is Dijkstra's algorithm (1959)."
