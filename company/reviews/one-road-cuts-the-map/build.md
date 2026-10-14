# Build note: one-road-cuts-the-map

Builder: algo2-b0 · 2026-10-14 · from brief cs.algorithms #76 (single card).

- Brief numbers held in node: removing each edge and flood-filling from town 1, only 3-4 leaves 3 of 6 towns reachable.
- Seven road buttons (one closed at a time; closing another reopens the previous) plus "Reopen all". Each button gains a tick or cross once tested. Towns reachable from 1 are domain-coloured, cut-off towns red.
- The reveal answers the "busiest town" misconception with the degree of towns 3 and 4 (three roads each), claim c2.
- Milestones `first-test`, `all-tested`; QA's one-press-each over the 7 road buttons reaches both.
- Not run here: build, typecheck, QA, walkthrough. Syntax-only transpile passed. All 5 claims `unverified`.

## v2 (demo-builder, 2026-10-14): r6 learner revise (2026-10-14-learner-knows-dfs-r6.md)
- Prediction leak (locked drawing showed two triangles joined by one link; title "The one road you cannot lose" said "one"): towns now sit on a circle in the order 1, 4, 2, 5, 6, 3, so the two triangles cross each other; 2-3 and 4-6 are the long diameters and 3-4 is a middle-length chord like 1-2 and 4-5. Title "Which closed road splits the map?". The stem no longer spells out the graph.
- Options "0 of 7" · "1 of 7" · "3 of 7" · "7 of 7": "3 of 7" is the degree misconception (the three roads at a busiest town).
- DFS told only: new control "Walk depth-first" (after Reopen all) draws one DFS from town 1 on the same map: per town "#visit ↑#climb", untravelled roads dotted, 3-4 thick in the domain colour, note "Bridge: 3–4". Milestone dfs-walk (minInteractions 3). Reveal quotes the walk's numbers (computed from DFS). Claims c4 reworded, c6 new.
- Not done: the "graph scrolls off at reveal" minor (kit layout).
- Objective text unchanged (same graph); it is not shown to learners.

## Pre-flight v2
1. Title and hook: "Which closed road splits the map?" / "Close any one road. Which closures actually cut the map in two?" "Which" and "closures" leave the count open; nothing says one.
2. Options: "0 of 7" · "1 of 7" · "3 of 7" · "7 of 7". All numbered the same way.
3. Locked stage: six towns on a circle, all coloured reachable, seven crossing chords, "6 of 6 towns reachable from town 1", readouts 0 / 0 / 0 of 7. No road is marked; 3-4 is a middle-length chord, like 1-2 and 4-5, so its role is not visible in the drawing.
4. Reveal values: "all 7 roads" and "6 of them left the map whole" (milestone all-tested; readouts Map stays whole 6, Map splits 1, Roads tested 7 / 7 and the ✓/✕ on each road button stay); "only 3–4 cut towns 4, 5 and 6 off" (milestone all-tested, the ✕ on the 3–4 button); towns 3 and 4 touch three roads (drawn); "town 4 was visited #3 ... ↑#3 ... Town 3 is #2" (milestone dfs-walk; the badges stay drawn).
5. QA path: 1–2, 2–3, 1–3, 3–4, 4–5, 5–6, 4–6 (first-test, then all-tested at the seventh), Reopen all, Walk depth-first (dfs-walk). Nine presses reach all three milestones; the question's case (every road closed once) is all-tested and its tallies stay visible.
6. Reset: "Reopen all" clears only the closure; tallies, button marks and the walk stay. Reveal after Reopen all then Walk: "You closed all 7 roads. 6 of them left the map whole; only 3–4 cut towns 4, 5 and 6 off from 1, 2 and 3. Towns 3 and 4 each touch three roads, but closing a triangle road beside them changed nothing: traffic went the other way round. / A road on a loop has a detour; a bridge is a road on no loop. Your depth-first walk found it in one pass: town 4 was visited #3, and from there down nothing climbs back higher than #3 (↑#3). Town 3 is #2, so no other road gets around 3–4."

## Pre-flight v3

r7 findings: DFS notation "↑highest climb back" read backwards and had no legend; quoted DFS labels off screen at reveal; singular title pointed at "1 of 7"; reveal named a triangle the drawing no longer shows. Fixes: title and hook neutral; the mark is now "↩#low" with the legend "Depth-first from 1. #visit order; ↩ earliest # it loops back to. Dotted: road back."; a stage row under the readouts after the walk, "Walk: town 4 #3 ↩#3, town 3 #2. Bridge: 3–4."; reveal says "earliest visit ... can loop back to" and "their other roads ... sit on loops". Claims c2, c4, c6 reopened. The phone scroll-off at reveal is the kit fix (platform-engineer), not worked around here.

1. **Title and hook.** "Close one road: does the map split?" / "Close one road at a time. For how many of the seven does the map fall apart?" Neither is singular or plural about the answer; 0 and 7 are not ruled out.
2. **Options.** "0 of 7" / "1 of 7" / "3 of 7" / "7 of 7": same form, all numbered.
3. **Locked stage.** Six towns on a circle in order 1, 4, 2, 5, 6, 3, seven crossing roads at equal weight, "6 of 6 towns reachable from town 1", tallies 0 / 0 / 0 of 7. No road is highlighted; DFS marks are hidden until the walk.
4. **Reveal values.** "all 7 roads", "6 of them left the map whole", "3–4", towns 4, 5, 6: (b) milestone "all-tested", on stage as the chip ticks and readouts "Map stays whole 6", "Map splits 1", "7 / 7". "town 4 #3", "↩#3", "town 3 #2", "3–4": (b) milestone "dfs-walk", on stage in the Walk row and the town badges.
5. **QA path.** DOM order: the seven road chips (first-test, then all-tested on the seventh), "Reopen all", "Walk depth-first" (dfs-walk): 3 milestones in 9 presses, under 16. When the reveal opens the Walk row and the readouts are on the stage.
6. **Reset.** "Reopen all" keeps tallies and the walk. Reveal after it: "You closed all 7 roads. 6 of them left the map whole; only 3–4 cut towns 4, 5 and 6 off from 1, 2 and 3. Towns 3 and 4 each touch three roads, but closing any of their other roads changed nothing: those roads sit on loops, so traffic went the other way round. A road on a loop has a detour; a bridge is a road on no loop. Your depth-first walk found it in one pass: town 4 was visited #3, and the earliest visit anything from there on can loop back to is #3 (↩#3). Town 3, #2, came earlier and no loop reaches it, so no other road gets around 3–4."

Not seen in a browser (no build/QA this wave).
