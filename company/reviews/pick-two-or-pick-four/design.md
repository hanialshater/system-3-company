# Design note: pick-two-or-pick-four (math:complement-counting)

author: demo-builder (learning-designer merged into the builder, F-f) · 2026-10-22 · v1 · brief: `company/domains/briefs/math.discrete.md`, Wave J, brief 5 (cm-math) · numbers: `node company/domains/briefs/checks/math-wave-j-check.mjs` (D5)

## The payoff
Each pair that goes is also a four that stays. The learner steps through pairs and watches the four left behind move into one boxed group each time; when all 15 pairs are listed, each chip shows a pair (filled dots) and its four (hollow dots) together, so the fours counter has to read 15 too.

## Knowledge boundary (meta.json `learner`)
- knows: counting pairs (`math/handshakes-halve`).
- doesNotKnow: that choosing k of n has exactly as many ways as choosing the n − k left behind, because each choice of who goes is a choice of who stays.

## Misconception
Choosing 4 of 6 gives more possible groups than choosing 2 of 6, because the groups are bigger.

## Objective
The learner can say that taking 2 or 4 of 6 friends gives the same number of groups, 15, because each pair that goes leaves exactly one four that stays.

## Prediction
"You have 6 friends. You can take 2 of them on a trip, or else 4 of them. Which choice gives more possible groups to take?" Options: Taking 2 / Taking 4 / The same (answer C). Brief's kit text in second person.

## Interaction
- Friends row (one SVG, 340 × 104 units, ~88 px tall): six circles A to F in two bands, "go" on top and "stay" below; the stayers' band gets a dashed box (one group of four) once there is a split. Go friends are filled.
- Counters "pairs seen: n of 15" and "fours seen: n of 15", side by side. Locked and after Reset: "pairs seen: 0", "fours seen: 0" (no total, so 15 = 15 is not shown before the commit).
- Pair list: a 3 × 5 grid of chips, one per pair seen, in fixed slots. **Re-layout of the brief's letter chips (stage budget):** each chip is six small dots, two filled (go) and four hollow (stay), no letters. The brief counted 37 stage words, 15 of them the two-letter chips, and named this picture change as the way out. It also teaches: every chip is visibly a pair and its four.
- Controls in brief DOM order: "Next pair" (Step: AB, AC, … EF, then back to AB), "All pairs" (all 15; active and disabled when all are listed), "Groups of 3" (friends row shows A, B, C go and D, E, F stay; line "groups of 3: 20"; active and disabled while shown), Reset (empties the list and the counters, friends back in one band).
- Milestones: `one` (a pair and its four seen together, first Next pair), `all` (15 and 15). minInteractions 2. QA path: Next pair, All pairs, Groups of 3, Reset.
- At the reveal the stage shows what was reached even after Reset: the last pair split, every chip seen, both counters, and "groups of 3: 20" if that chip was pressed.

## Reveal (brief draft, 67 words, unchanged)
"Every pair you picked left exactly four behind, and each four left behind exactly one pair. So the groups match one to one: 15 pairs, 15 fours. Choosing who goes is the same as choosing who stays. Groups of 3 are the most, 20, where goers and stayers are the same size. In general, choosing k of n has as many ways as choosing n − k." The groups-of-3 sentence only when that chip was pressed.

## Told vs shown
The cause (go ↔ stay is one to one) is shown twice: the boxed four moves with every pair, and every chip carries both. The general n − k sentence is claim c2.

## Recall
Coach with 10 players: rest 2 or play 8 → the same, 45 (claim c1).
