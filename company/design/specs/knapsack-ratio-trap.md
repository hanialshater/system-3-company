# Spec: knapsack-ratio-trap

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #4 · wireframe: `knapsack-ratio-trap.svg`

**Brief check (node, 2026-10-14): correct.** All 8 subsets: the best that fits 50 kg is 20 + 30 kg = $220. Ratio first, whole items: 10 kg ($6/kg) then 20 kg ($5/kg) = $160 with 20 kg empty; the 30 kg item ($4/kg) no longer fits. Ratio first, items can be cut: 10 + 20 + two thirds of 30 = $240.

**One change to the brief's interaction:** "drag items in and out of the bag" becomes **tap** an item to move it in or out. Drag cannot be reached on the QA path and is harder for a thumb in a vertical feed.

## Why this format: Before / after toggle
One change, "items can be cut", flips which strategy wins, and the "after" ($240, ratio first is now best) is half the lesson. Before the toggle the learner beats ratio-first with their own hands. After it, ratio-first beats anything they can pack. One bag, one picture, one switch.

## Stage at 390×844 (~320 px at predict, ~470 px in explore)
1. Model line (muted, 9 words): "Bag holds 50 kg. Tap an item to pack it."
2. **Bag**, left, 120 px wide × 250 px tall: a vertical column drawn to scale, 5 px per kg, with tick marks at 10 kg steps and "50 kg" at the top. Packed items stack from the bottom as blocks whose height is their weight, each labelled "20 kg · $100". Empty space is a hatched gap labelled with its size ("20 kg empty").
3. **Shelf**, right: items not in the bag, same block sizes, each with "$6/kg" style ratio under it.
4. **Readouts** above the bag: "Packed 30/50 kg · $160". Below: the record line "Best whole-item bag so far: …" (see states). The value has no axis or limit anywhere on the stage.
5. Item buttons and the toggle (two rows) under the picture.

## Controls, in DOM order (4)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control toggle | "10 kg · $60" (`aria-pressed` = in bag) | in bag: take it out. On shelf: put it in if it fits; if not, it hovers over the bag and the gap reads "needs 10 kg, 0 kg empty" (the stage changes, the bag does not) |
| 2 | Control toggle | "30 kg · $120" | same |
| 3 | Control toggle | "20 kg · $100" | same |
| 4 | Control toggle | "Items can be cut: off" / "on" | **on:** shows a second bag state, packed ratio first with cutting: 10, 20, then as much of the 30 kg item as fits (drawn as a block cut at its two-thirds line, "20 of 30 kg · $80"). In cut mode, an item button pours as much as fits, or takes the item out. **off:** returns to the learner's own whole-item bag exactly as they left it. Each mode keeps its own bag |

The item order 10 · 30 · 20 is deliberate and is the only order where pressing each control once reaches the full $220 bag: take out 10, put in 30. (Ratio order 10 · 20 · 30 would take out 10, then 20, then add 30, never reaching it.) The ratio is printed on every item, so the button order does not need to teach it. All 4 controls render at first paint, disabled while `locked`, `.tap` 44 px, about 120 px wide.

QA path: 10 kg (out: 20 kg in bag, $100, 30 kg empty) · 30 kg (in: 50/50 kg, $220: milestone 1, record set) · 20 kg (out: $120, record stays $220) · cut on (ratio-first-with-cutting bag, $240: milestone 2). The reveal stage is the cut bag with the record line showing the learner's $220.

No jump control: there is no "best", "solve" or "swap" button. $220 only appears when the learner has packed it.

## States
- **Predict:** the bag as the question describes it, packed ratio first: 10 kg and 20 kg in, "Packed 30/50 kg · $160", hatched "20 kg empty"; the 30 kg item on the shelf. Record line "Best whole-item bag so far: $160 (ratio first)". Controls disabled.
- **Explore, a too-big item:** pressing 30 kg while the gap is 20 kg shows it hovering, "needs 30 kg, 20 kg empty". This is exactly where ratio-first got stuck.
- **Explore, the swap:** 10 kg out, 30 kg in: the bag reads "Packed 50/50 kg · $220", no hatch. Record line: "Best whole-item bag so far: $220 (20 + 30 kg)". Other bags ($180, $120 …) change the readout; the record only changes when a whole-item bag beats it.
- **Cut on:** the bag shows ratio first with cutting, full, "$240", with the cut line on the 30 kg block. The record line stays visible underneath, so both numbers are on the stage.
- **Reveal:** stage as left; if the learner turned cut off again, their whole bag shows and the record still reads $220. The reveal quotes only reached states: "Ratio first left 20 kg empty: $160. Your bag of 20 + 30 kg filled it: $220. When items could be cut, ratio first poured in two thirds of the 30 kg item and got $240, and nothing beats that. Whole items leave gaps, so the best bag has to be found by trying combinations; dynamic programming does that without trying all of them." If the learner's record is a different value, the reveal uses their record (the milestone guarantees $220 was reached).

Milestones (`minInteractions=2`): `whole-220` (whole-item mode, the bag holds $220), `cut-seen` (cut mode turned on at least once).

## Shown, not told
The gap is drawn: the learner sees 20 kg of hatched air beside a 30 kg item that will not go in. They make the $220 bag themselves. Then one switch turns the same items into a bag where ratio-first is best, and the cut line on the 30 kg block shows why: the gap is filled by a piece.

## Answer visibility
Locked stage: $160 and the gap only (both given in the question). No value axis, no "max", no $220 or $240 anywhere; the record line starts at the question's $160. Title must not name $220 or "combinations".

## Colour and access
Item blocks in three tints of `--domain` with distinct hatching (none, diagonal, dots) and their weight text inside, so items are told apart without colour. Gap hatch `--line`. Readout value `--fg`; the record line `--muted` label with `--fg` value. Cut line dashed `--fg`. Money as whole dollars; kilograms as integers ("20 of 30 kg").

## Claims this spec touches
None new. "$6/kg, $5/kg, $4/kg" are arithmetic from the brief's items (derivation); the builder adds them as claims.
