# Build note: connect-the-towns-cheaply (demo-builder, 2026-10-13)

- Design intent: one map of four towns (a square plus both diagonals) with each cable's cost on it. Below it is a list of cable buttons, cheapest first (AB 1, CD 1, BC 2, BD 3, AC 4, AD 5). Tapping the cheapest undecided cable lays it (solid line), unless its towns are already joined. Then it is refused: dashed red, struck through in the list, and the message says why. Tapping a dearer cable while a cheaper one is undecided says "Cheapest first". Readouts show cables laid and total cost. "Start again" comes first in the DOM, disabled before any tap, and is shown last.
- Key state: the first cable laid, then all four towns joined. Milestones ["first-cable", "connected"], minInteractions 2. QA path: AB, CD, BC (joined, total 4), then BD, AC, AD each refused. The reveal quotes the laid cables, the total and the refusals the learner saw.
- Numbers: 4 comes from bruteMin() (all 3-cable sets) in Demo.tsx; the question's cable list is generated from CABLES_RAW. Node re-run: 4.
- Retitled: "Cheapest cables to join four towns" (the slug states the task, not the answer).
- Design choice: enforcing cheapest-first leaves the learner a choice only between ties, and refusing loops. The lesson is about trusting the rule, not finding it. A free-order variant would let a learner see a 5 or 7 network; flagged as an option for learning-designer.
- After screenshots: reads on phone. The diagonal cost labels sit nearer their first town to avoid the crossing point.

## Revision v2 (wave C, learner review)

- Greedy was never at risk: costs changed to AB 1, BC 2, AC 2, CD 3, BD 4, AD 5. The third-cheapest cable (AC) closes a loop mid-build and is refused, so the total is 6, not the tempting 5 (now an option). c1 to c3 rewritten.
- Hook assumed the coins lesson: now 'Should you always lay the cheapest cable first?'; the 'unlike coins' sentence is gone (c5).
- Loop defined on the stage message. Clipping left to the kit.

All changed claims are unverified, awaiting a fact-checker.
