# Spec: new-road-slower-trip

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.systems.md` N1 · wireframe: `new-road-slower-trip.svg` · board: S2-20

**Design review (design lead, 2026-10-14): approved with changes.** The A→B link stays dotted in After (not solid); arrowheads ≥ 8 px at every road width, ending at the rim; the readout keeps fixed slots. Details in `company/design/reviews/2026-10-14-design-review-ncm-specs.md` §1.

**Format: Before / after toggle** (`company/design/formats.md`, by hand), with a **step-run** pair inside the "after" view, on the interim **network stage** (`company/design/reviews/2026-10-14-design-lead-ncm-rulings.md` §2). 4 named nodes and 5 roads, none tappable. The road network is fixed and hand-placed, with no randomness and no seed.

**Why this interaction:** the misconception is "at worst nobody uses the new road". The learner opens the link and sees the new route at 40 vs 65. Then they move drivers onto it 1,000 at a time and see it stay faster at every step, until all 4,000 are on it at 80. Nobody gets told that drivers flock to the link. The learner moves them there because each time it is the faster choice.

## Brief problems (for cm-cs-systems; I did not change the lesson)
1. **Formula typo in the node check.** With s drivers on the new route and the rest split evenly, roads S–A and B–E each carry 2,000 + s/2 cars. So the new route takes **40 + s/100** (the brief says 20 + s/100), and the old route takes 65 + s/200. The new route is faster while **s < 5,000** (the brief says 9,000). The conclusion does not change. The brief's own milestones (40 vs 65, 60 vs 75, 80 vs 85) already use 40 + s/100. Fix the check line before the meta copies it.
2. **The slider cannot reach 4,000 on the QA path.** QA gives a slider two arrow presses. From 0 in steps of 500 that lands on 1,000, so the brief's statement "every value the reveal names is reachable by pressing each control once" fails for 4,000. I replaced the slider with **Switch 1,000** (Step) and **Run** (to the end). The learner still sets the number of drivers on the link, and the QA path now ends at 4,000.
3. **The 2,000 milestone is not on the QA path.** The QA path goes 0 → 1,000 → 4,000. The 2,000 state (60 vs 75) can still be reached by pressing Switch 1,000 twice, but it is not a gating milestone, and the reveal quotes it only if the learner visited it.

The equilibrium is unchanged and holds for uneven splits as well. A driver on S–A–E who moves to the new route pays (s+u)/100 + (s+v+1)/100 instead of (s+u)/100 + 45. That is less whenever s+v+1 < 4,500, which is always true here, so every driver on an old route moves. s = 4,000 is the only equilibrium.

## The rule (disclosed on the card, identical in code, meta and fact-check)
4,000 drivers go from S to E. Roads S→A and B→E take cars ÷ 100 minutes. Roads A→E and S→B take 45 minutes. The new link A→B takes 0. Before the link, 2,000 drivers take each route. With the link, s drivers take S→A→B→E and the rest split evenly over the two old routes. The new route then takes 40 + s/100 and each old route 65 + s/200. **Switch 1,000** moves 1,000 drivers (500 from each old route) onto the new route, and only if the new route is faster than the old one at the current split. **Run** repeats that until no move is allowed.

Designer's node check of this exact rule (2026-10-14):
- Before: 65 and 65.
- s = 0: 40 vs 65. 1,000: 50 vs 70. 2,000: 60 vs 75. 3,000: 70 vs 80. 4,000: 80 vs 85.
- The step run stops at 4,000 after 4 moves.
- Enumerating every integer s with unilateral deviation finds only one equilibrium, s = 4,000.
- The planner's best average is 64.69 at s = 500. That is for the meta only and is not on the card.

All values are integers. The builder re-runs the check and records the numbers as claims.

## Stage at 390×844 (~360 px at predict, ~440 px in explore)
1. **Rule line** (muted, 2 short lines): "4,000 drivers, each on the fastest route. Solid roads: cars ÷ 100 min. Dashed: 45 min."
2. **Diamond graph**, SVG `viewBox` 340 × 300:
   - Nodes: S (40,170), A (170,70), B (170,270), E (300,170). Each is r 16 with a 1-letter name inside. The closest pair is 128 px apart.
   - Directed roads with arrowheads that end at the node rim:
     - Busy roads S→A and B→E: solid, with stroke width 2 px + 4 px × cars / 4,000, so traffic thickens the road.
     - Fixed roads A→E and S→B: dashed 2 px.
     - New link A→B: dotted `--line` ghost in Before, solid in After, with the same width rule.
   - Each road has one value pill at its midpoint, holding the road's current minutes ("20", "45", "0"). Pill centres are ≥ 80 px apart.
3. **Readout row** (one line under the graph): "On new route 1,000 · New route 50 ▲ · Old route 70". The ▲ glyph and bold mark whichever route is faster now, so the cue is not colour alone. In Before mode it reads "On new route – · New route – · Old route 65".
4. **Controls row** (4 buttons, 44 px high).

Hero (bridge, ≤ 96 × 96, predict only) goes in the SVG's empty top-right corner (x ≥ 244, y ≤ 96). The nearest label is the A→E pill centred at (235,120), so the hero clears it. The hero is removed on unlock.

## Controls, in DOM order (4)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Chip | "Before" | Starts active (disabled). In After it shows the network without the link: 2,000 per route, every road pill at its before value, readout "Old route 65". The After run is kept |
| 2 | Chip | "After" | Opens the link. The first time, s = 0: new route 40 ▲, old route 65 (milestone `link-open`). Later, it returns to the last s reached. Disabled while active |
| 3 | Control | "Switch 1,000" | One step (rule above). Disabled in Before mode and once no move is allowed (s = 4,000) |
| 4 | Control | "Run" | Computes the steps to the end, then shows them at ≤ 100 ms per step (≤ 400 ms in total, instant under `prefers-reduced-motion`). The milestone fires on press, from the computed result. Disabled in Before mode and at s = 4,000 |

All 4 controls render at first paint and are disabled while `locked`. No control empties the stage: there is no Reset, and Before only hides the link without losing the run. The `.tap` class gives 44 px targets: chips about 80 px wide, Switch 1,000 about 100 px.

**QA path:**
1. Before: disabled at start, not pressed.
2. After: s = 0, 40 vs 65. Milestone 1.
3. Switch 1,000: s = 1,000, 50 vs 70.
4. Run: s = 4,000, 80 vs 85. Switch 1,000 and Run are disabled. Milestone 2.

**End state:** After, all 4,000 drivers on the new route, S→A and B→E pills at 40, readout "On new route 4,000 · New route 80 ▲ · Old route 85". This is the state the reveal describes. Every press changes the stage: pills, widths and readouts.

## States
- **Predict:** Before view. Road pills 20 / 45 / 45 / 20. The link is ghosted with its "0" pill. Readout "On new route – · New route ? · Old route 65". 65 is the question's given. **No after value (40, 80, 85) is on the stage.**
- **Explore, After at s = 0:** the link solid but thin. New route 40 ▲ vs old 65: one driver gains 25 minutes by switching.
- **Each Switch 1,000:** the busy roads thicken and their pills rise by 5. The new route is still ▲ at every step (50/70, 60/75, 70/80).
- **s = 4,000:** both old routes carry no one. The new route takes 80. The old-route readout, 85, is what one driver would get by switching back. Both step buttons are disabled.
- **Before after a run:** 65 everywhere. The learner can flip Before and After to compare 65 with 80.
- **Reveal:** the stage pins to **After at the furthest s reached** (4,000 once milestone 2 is reached), even if the learner left it on Before. The reveal quotes only reached states. Example: "With nobody on it, the new route took 40, so drivers moved. At 4,000 it takes 80, and switching back takes 85, so nobody leaves. Before the link it was 65." It adds the 2,000 line only if visited. Then one sentence saying this is a model with these numbers, not every network. Reveal pair (4:3, two frames ≤ 160 px): the diamond without and with the link.

Milestones (`minInteractions=2`): `link-open` (After shown at s = 0) and `nobody-gains` (s = 4,000 reached by Step or Run).

## Shown, not told
The learner's own presses move the drivers, one batch at a time, and each press is justified by the ▲ on the faster route. The 80 in the reveal is the number on their readout. The 65 is the one they saw before opening the link. The reveal only names it: each choice was best for the driver, and everyone lost 15 minutes.

## Stage words (numbers and 1-letter node names not counted)
- Rule line: 12 (drivers, each, on, the, fastest, route, Solid, roads, cars, min, Dashed, min)
- Chips: 2 (Before, After)
- Step and Run: 2 (Switch, Run)
- Readout labels: 7 (On new route, New route, Old route)
- **Total: 23 of 25.** No legend line: the rule line names solid and dashed. If review asks for a legend, drop "each on the" from the rule line first.

## Colour and access
- Roads use `--fg`. Busy and fixed roads differ by line style (solid vs dashed) and by pill behaviour (changing vs fixed 45). The ghost link uses `--line`, dotted.
- The faster route is marked with ▲ plus bold. `--accent` is used only for one step: the pills that just changed carry an `--accent` ring.
- The `aria-label` on the SVG states the reveal's counts: "With the link: 4,000 drivers on the new route, 80 minutes; switching back takes 85; before the link, 65".
- Transitions are ≤ 300 ms and node positions never move (§2.7).
