# Spec: shell-gaps-shrink-the-shuffles

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #41 · wireframe: `shell-gaps-shrink-the-shuffles.svg`

**Format: Side-by-side comparison, as two stacked lanes.** The same 16 reversed cards in two lanes: plain insertion sort on top, Shell sort below. Each lane is a full-width row, not a half-width panel, because 16 cards at half width would be 10 px each. Both lanes stay on the stage, so the 120 and the 32 are read off one picture at the reveal.

## Brief check (re-run in node, 2026-10-14)
Reversed hand 16 15 … 1. Insertion sort that copies the moving card one gap over per shift.
- Gap 1 only: **120 shifts**. Gaps 8, 4, 2, 1: **32 shifts, 8 in every pass**. Gaps 4, 1: 48 (not used on the stage). **The brief is right.**
- New stage readout, checked in the same run: "farthest card from its place" is **15** at the start, then **7** after 8 apart, **3** after 4 apart, **1** after 2 apart and **0** after 1 apart. After the 2-apart pass the hand reads 2 1 4 3 … 16 15, so the last pass is 8 neighbour swaps. This number is the payoff on the stage, so it is a claim (simulation).

## Stage at 390×844 (~300 px at predict, ~440 px in explore)
1. Rule line (muted, 16 words): "A shift copies one card one gap to the right. Gap 1 is ordinary insertion sort."
2. **Lane "Plain insertion"**: 16 card tiles, 20 × 30 px with a 1 px gap (336 px), the value printed in each card. Card fill shades from light (1) to dark (16), so a sorted lane reads as a smooth ramp. Readout on the right of the lane title: "Shifts: 0" and "Farthest from its place: 15".
3. **Lane "Shell: 8, 4, 2, 1 apart"**: the same 16 tiles and the same two readouts. While a pass runs, the cards of the group being sorted (every g-th card) are raised 4 px, and each shift is drawn as a thin arc from the old place to the new. The arcs of the last pass stay until the next pass.
4. **Pass tally** under the Shell lane, one line: "8 apart: 8 · 4 apart: 8 · 2 apart: 8 · 1 apart: 8 · total 32". Each entry reads "?" until that pass runs.
5. Controls, below.

Stage words at the busiest moment: rule line 16 + lane titles 7 + readout labels 2 (numbers not counted) = 25.

## Controls, in DOM order (5)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control | "Plain insertion sort" | sorts the top lane with gap 1. It replays each card's insertion in order (15 insertions, about 25 ms each, ≤ 400 ms; instant under reduced motion). The shift counter climbs to 120 and the "farthest" readout falls to 0. Disabled when done |
| 2 | Control | "Sort 8 apart" | Shell lane: insertion-sorts the cards 8 apart. Replays its 8 shifts with arcs (≤ 400 ms). Disabled after it runs |
| 3 | Control | "Sort 4 apart" | as #2 with gap 4. Enabled only after #2 has run |
| 4 | Control | "Sort 2 apart" | as #2 with gap 2. Enabled only after #3 has run |
| 5 | Control | "Sort 1 apart" | as #2 with gap 1 (ordinary insertion sort). Enabled only after #4 has run |

All 5 controls render at first paint, disabled while `locked`, class `.tap` (44 px). The Shell lane does not depend on the plain lane: a learner may run Shell first. The passes run in a fixed order, because the brief teaches this gap sequence and not "any gaps".

QA path (each control once, DOM order): Plain insertion sort (120, farthest 0: milestone `plain-sorted`) · Sort 8 apart (8, farthest 7) · Sort 4 apart (16, farthest 3) · Sort 2 apart (24, farthest 1) · Sort 1 apart (32, farthest 0: milestone `shell-sorted`). Each of #3–5 is enabled by the press just before it, so QA always finds it enabled.

## States
- **Predict:** both lanes show 16 15 … 1, the shift counters at 0, both "farthest" readouts at 15, the tally all "?". No total, no maximum, nothing that hints at 32.
- **On unlock:** nothing moves until a press. Exploration hint: "Run plain insertion, then the four Shell passes."
- **Plain sorted:** top lane is a ramp 1 … 16, "Shifts: 120".
- **After 8 apart:** bottom lane 8 7 6 5 4 3 2 1 16 15 … 9, eight long arcs, "Shifts: 8", farthest 7.
- **After 4 apart:** 4 3 2 1 8 7 6 5 12 11 10 9 16 15 14 13, "Shifts: 16", farthest 3.
- **After 2 apart:** 2 1 4 3 6 5 … 16 15, "Shifts: 24", farthest 1. Every card is one step from home.
- **After 1 apart:** a ramp like the top lane, "Shifts: 32", farthest 0, eight short arcs.
- **Reveal:** the stage stays as left: both lanes sorted, counters 120 and 32, the tally full. The reveal: "Plain insertion made 120 shifts: the 1 had to walk 15 places, one at a time. Shell sort made 8 per pass, 32 in all. Watch 'farthest from its place': 15, then 7, 3, 1. When the gap reached 1, every card was a step from home, so ordinary insertion sort had only 8 swaps left. The far passes did the long carrying in big jumps. The last pass is plain insertion sort, so the result is sorted whatever came before."

Milestones (`minInteractions=2`): `plain-sorted`, `shell-sorted`.

## Shown, not told
The learner presses one button and the top counter runs to 120. Then four presses each add exactly 8, and the "farthest" readout halves and halves again. The idea ("far moves first leave little for the last pass") is a number falling under their hands. The 2 1 4 3 … hand before the last pass shows the "almost sorted" state without the word.

## Colour and access
Card shade by value plus the printed number, so order is never colour alone. Raised cards (position) mark the group being sorted. Arcs `--fg` thin. Lane `aria-label`: "Shell lane: 24 shifts, farthest card 1 place from home".

## Notes for others
- **Builder:** the shift count is "one card copied one gap over". The node check uses `while (j >= g && a[j-g] > v) { a[j] = a[j-g]; j -= g; shifts++ }`. The "farthest" readout is max |position − sorted position|.
- **Brief owner (cm-cs-algorithms):** "tap next gap" is four labelled buttons, because QA presses each control once. The shuffled-hand comparison (63 vs 33) and gaps 4, 1 (48) are not on the stage and must not be in the reveal. The teaching is unchanged.
- No illustration (CS).
