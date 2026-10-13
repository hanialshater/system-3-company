# Build note: which-order-is-allowed (demo-builder, 2026-10-13)

- Design intent: one arrow diagram (A→B, A→C, B→D, C→D; free tasks tinted green). Below it are four task buttons and a four-slot line, with ⇄ swap buttons between neighbouring slots. A task goes into the line only if everything before it is already placed; otherwise the stage says what it waits for. A full line is a valid order and goes into "Orders found". A swap is refused if it breaks an arrow. "Add arrow: D before A" draws a red dashed loop, clears the line, and leaves no task free. "Clear the line" comes first in the DOM, disabled while empty, and is shown last.
- Key state: two different valid orders found, then the loop added. Milestones ["two-orders", "cycle"], minInteractions 2. QA path: A, B, C, D (A B C D found); swap 1-2 refused (A before B); swap 2-3 gives A C B D (found 2); swap 3-4 refused (B before D); then the loop. The reveal quotes both found orders and the loop, all on the stage at reveal.
- Deviation from brief: swap buttons were added so a second order is reachable in one DOM-order pass. A learner can also clear the line and build A C B D directly.
- Numbers: "2 orders" comes from VALID (brute force over 24 permutations) in Demo.tsx; Node re-run gave [ABCD, ACBD].
- Retitled: "How many ways to order four tasks?". "Topological order" is not named on the stage or in the reveal.
- After screenshots: reads on phone. No changes.
