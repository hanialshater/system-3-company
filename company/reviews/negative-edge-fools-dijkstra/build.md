# Build note: negative-edge-fools-dijkstra

builder: algo-pair-11 · 2026-10-14 · status draft · claims all unverified

Built from brief #17 and spec `company/design/specs/negative-edge-fools-dijkstra.md`, with the category manager's change: the extra road is A to C costing 2 (not the 1 the spec suggests).

## Graph and node checks
Roads S>A 2, S>B 3, B>A -2, A>C 2. True costs: A 1, C 3.
- Settle-once Dijkstra ends A 2, B 3, C 4.
- CLRS-style relax-all-out-edges (no membership check) ends A 1, B 3, C 4. It repairs A but not C, so the error holds for both versions.
- Every-road passes in order B>A, A>C, S>A, S>B: pass 1 A 2, B 3, C inf; pass 2 A 1, B 3, C 3; pass 3 no change.
- With A>C = 2 the settle order is forced (S, A, B, C): after A, B (3) beats C (4). No tie.

## Deviations from the spec
- Fourth town C (button after B); the spec allows this.
- Panel 2 shows labels as infinity (not "?") at start; the rule line omits the road order, the highlighted roads show what changed. No "refund" tag, only the dashed -2 road in the accent colour (word budget).
- Pass 3 button not built: two passes reach A 1 and C 3; the reveal does not claim more.
- Question asks about A (brief). C, the payoff of the changed graph, appears only in the reveal and on the stage.

## Controls (DOM order): S, A, B, C, Pass 1, Pass 2. Milestones: too-late (B settled after A), two-passes.
Wrong taps change the rule line to a hint. Nothing jumps to the answer.

## Known risks for evaluators
- Stage word count (two rule lines, headers, hint) is near 25; the late tag adds "too late".
- Claim c3 (CLRS ends A = 1) depends on extraction order S, A, B, C; the cited edition section numbers (4th ed. 22.1, 22.3) are mine, not checked against the book.
- QA: see progress entry.
