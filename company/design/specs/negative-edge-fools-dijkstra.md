# Spec: negative-edge-fools-dijkstra

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #17 · wireframe: `negative-edge-fools-dijkstra.svg`

Brief updated 2026-10-14: graph is now four towns: S to A 2, S to B 3, B to A -2, A to C 2 (cost 2 not 1, so no tie at 3 between B and C). The question asks the true cost to C: 3. Cheapest-first reports C = 4 in every standard version (A ends 2 or 1 by version). Bellman-Ford with roads checked B-A, A-C, S-A, S-B: pass 1 A 2, B 3, C 4; pass 2 A 1, B 3, C 3. Claim 1 no longer names a label for A. The designer's four-town layout option is adopted; DOM order S, A, B, C and the two-pass road order above replace the three-town ones in this spec.

**Format: Side-by-side comparison** (stacked: two full-width panels, one above the other, since two graphs side by side at 178 px each make 44 px node targets collide). Same three towns, same roads, two methods. The misconception is "they agree"; the panels end on different labels for A.

## Brief problem (for cm-cs and the learning designer; I did not change the lesson)
Node check, 2026-10-14. True cheapest cost to A is **1** (S→B→A = 3 − 2). The question's answer (B) holds. But claim 1, "Dijkstra reports 2", is **implementation-dependent**:
- A version that never updates a settled node (a "done" set checked in relax) ends with A = 2.
- CLRS's own DIJKSTRA (24.3, cited in claim 2) relaxes every edge out of each extracted node with no membership check. When B is extracted, B→A sets A.d = 1, so it **ends with A = 1** on this graph. The error only shows when the wrongly settled node has a road onward.
- With one more road, A→C cost 1, both versions end with C = 3 while the true cost is 2. That graph makes the failure hold for every textbook version.

This spec builds the brief's graph with the rule line "Settled labels are final", which is the assumption Dijkstra's correctness rests on, and states it on the stage. The claim must then read "cheapest-first with final settled labels reports 2", not "Dijkstra (CLRS) reports 2". If cm-cs prefers the four-town graph, the layout below takes C to the right of A with one more node button (DOM order S, A, B, C); the QA path is unchanged otherwise.

## Stage at 390×844 (~340 px at predict, ~520 px in explore)
Each panel is 366 × ~200 px: a header line, the graph, and a readout row.
- **Graph** (same in both panels): S at left middle, A at top right, B at bottom right. Roads drawn as arrows with the cost on them: S→A "2", S→B "3", B→A "−2" (the negative cost is written with a true minus and a "refund" tag). Towns are 48 px circles with the name; the current label sits in a pill beside each town.
- **Panel 1, "Cheapest first"**, rule line: "Tap the unsettled town with the smallest label. Settled labels are final." (12 words). Settled towns get a heavy ring and a lock glyph.
- **Panel 2, "Check every road"**, rule line: "Each pass checks all roads: B→A, S→A, S→B." (8 words, the order is shown because it matters). The road being checked is highlighted during a pass.
- Readout row per panel: "Label at A: …".

## Controls, in DOM order (5)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Town button (panel 1) | "S" | if S is the smallest unsettled: settle it and relax its roads (A 2, B 3). Disabled once settled |
| 2 | Town button | "A" | if A is the smallest unsettled: settle at its label (2). If not (A still ∞, or larger than B), a hint line: "A's label is not the smallest yet" and nothing settles |
| 3 | Town button | "B" | same rule. On settling B, the B→A road offers 1; A is settled, so the offer is drawn as a struck "1" tag beside A's locked "2": "1 arrives too late" |
| 4 | Control | "Pass 1" (panel 2) | checks the three roads in the shown order, one highlight each, ≤ 300 ms (instant under reduced motion). Ends with A 2, B 3: B→A was checked while B was still ∞. Disabled after use |
| 5 | Control | "Pass 2" | enabled after Pass 1. Same roads; B→A now gives A 1. "n − 1 = 2 passes: done" |

Town buttons are real `<button>`s with `data-qa="control"` laid over the SVG circles, 48 px (`.tap`). Wrong taps change the hint line, so no enabled control is a no-op.

Road order in panel 2 is a design choice: with B→A checked first, one pass is not enough and the second pass is the one that finds 1. Node check: pass 1 {A 2, B 3}, pass 2 {A 1, B 3}. With the brief's order (S→A, S→B, B→A) pass 1 already gives 1 and pass 2 changes nothing, which shows less.

QA path (each once, DOM order): S (A 2, B 3) · A (A locked at 2) · B ("1 arrives too late": milestone 1) · Pass 1 (A 2) · Pass 2 (A 1: milestone 2). No button jumps to A = 1; it takes two passes.

## States
- **Predict:** both graphs with costs. Panel 1 labels S 0, A ∞, B ∞, nothing settled. Panel 2 labels S 0, A ?, B ?, "Pass 0". Readouts "Label at A: ?" in both. Controls disabled.
- **Panel 1, after S, A, B:** A locked at 2; the struck "1" tag beside it; readout "Label at A: 2 (locked)".
- **Panel 2, after Pass 1:** A 2, B 3, matching panel 1 so far. **After Pass 2:** A 1; the B→A road highlighted; readout "Label at A: 1".
- **Reveal:** both panels stay. The reveal quotes them: "Cheapest-first locked A at 2, then the −2 road offered 1, too late. Checking every road twice found 1." Then the payoff: settling assumes nothing later can make a town cheaper, which fails when a road subtracts; Bellman-Ford makes no such assumption and costs more checks. Lines are quoted only for panels the learner finished.

Milestones (`minInteractions=2`): `too-late` (B settled after A, with the struck offer shown), `two-passes` (Pass 2 run, A = 1).

## Shown, not told
The learner locks A themselves, then watches a cheaper offer arrive at a lock. The second panel reaches 1 by doing the same arithmetic without the lock. The reveal names the assumption they saw break.

## Colour and access
Roads `--fg`; the −2 road dashed plus the "refund" tag (not colour only). Locked ring `--fg` 3 px plus a lock glyph. Struck "1" in `--bad` text with a strike line. Panel 2's final A pill `--good-fill` with `--bg` ink. Labels are integers; ∞ is a glyph with `aria-label` "no label yet". Count all stage words (both rule lines, headers, tags) against the 25-word budget before build; drop the "refund" tag first if over.
