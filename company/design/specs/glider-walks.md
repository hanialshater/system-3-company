# Spec: glider-walks

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #22 · wireframe: `glider-walks.svg`

**Brief check (node, 2026-10-14): correct.** Glider at gen 0 = (1,0) (2,1) (0,2) (1,2) (2,2) (x right, y down). Live cells per generation: 5, 5, 5, 5, 5. Gen 4 is gen 0 shifted by (+1, +1), one cell right and one down. Step one, cell by cell: live counts (1,0):1 and (0,2):1 die; (2,1):3, (1,2):3 and (2,2):2 live; (0,1) and (1,3) are born with exactly 3.

**Two changes to the brief's interaction:**
- **No cell toggling.** QA presses the first 16 controls in DOM order. Tappable cells would either come first and scribble over the glider before any step, or come after and scribble over the gen-4 state the reveal quotes. It also takes the card past 60 seconds. The brief's "[exploration]" tag is served by the neighbour counts and the frames instead. If the learning designer wants drawing, it is a second lesson (open sandbox), not this one.
- **"Step" becomes four frame buttons** (Gen 1 … Gen 4), each one generation, each enabled only once the one before exists. A single Step button pressed once (the QA path) reaches only gen 1. Four one-generation buttons give a one-press path to gen 4 without any button that skips ahead.

## Why this format: Storyboard / scrub
The payoff is a moment in time: at gen 4, and not before, the original shape is back, one cell over. A filmstrip of key frames lets the learner make each frame with one press, then scrub back and forth across frames they made, which is how they notice gens 1–3 look different and gen 4 does not.

## Stage at 390×844 (~360 px at predict, ~500 px in explore)
1. Rule line (muted, 20 words): "Each step: live with 2 or 3 live neighbours stays; empty with exactly 3 is born; the rest die."
2. **Main grid**, 7×7, 40 px cells (280 px square), centred. Glider placed at offset (1,1), so gen 4 lands at (2..4, 2..4), inside the grid with a free row and column. Live = filled square. **Gen 0 ghost:** the starting five cells stay drawn as dashed outlines on every frame.
3. **Neighbour counts** (when on): a small number in each cell that has at least one live neighbour, the number the rule uses. On the frame just made, cells that died show a "×" and cells that were born a "+" for the length of the frame.
4. Readout line: "Gen 2 · 5 live".
5. **Filmstrip**: five frames in a row, 60 px each (7×7 at ~8 px), labelled Gen 0 … Gen 4. Gen 0 shows the glider. Frames not yet made show "?".
6. Counts toggle under the filmstrip.

## Controls, in DOM order (5)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control (frame) | "Gen 1" | not made: computes gen 1 from gen 0, fills the frame, shows it on the main grid with × and + marks. Made: shows it (scrub). The frame on show is `active` and disabled |
| 2 | Control (frame) | "Gen 2" | same, from gen 1. Disabled until gen 1 is made |
| 3 | Control (frame) | "Gen 3" | same, from gen 2 |
| 4 | Control (frame) | "Gen 4" | same, from gen 3 |
| 5 | Control toggle | "Counts: on" / "off" | shows or hides the neighbour counts. Starts **on** |

Gen 0 is not a button: it is always visible as the dashed ghost, and a Gen 0 button after the toggle would be pressed last on the QA path and leave the stage on the start. Each frame computes exactly one generation from the previous; none can be made out of order, so no button skips to the answer. Frame changes settle in ≤ 250 ms (instant under reduced motion). All controls render at first paint, disabled while `locked`; frames are 60 × 72 px, `.tap`.

QA path: Gen 1 (2 die, 2 born, still 5 live: milestone 1) · Gen 2 · Gen 3 · Gen 4 (the original shape, one right and one down from its dashed ghost: milestone 2) · Counts off (a clean picture of gen 4 over the ghost). The reveal stage is gen 4.

## States
- **Predict:** gen 0 on the main grid, counts shown (they help a careful predictor; they do not give the answer), ghost hidden behind the live cells, filmstrip with frames 1–4 as "?". Readout "Gen 0 · 5 live". Controls disabled.
- **Gen 1:** two end cells drop (×, they had 1 neighbour), two cells appear (+, exactly 3). The shape is a different-looking five. The ghost now shows where it started.
- **Gen 2, Gen 3:** the shape flips and leans; it is drifting off its ghost, still 5 live each time.
- **Gen 4:** the gen-0 shape, exactly, one cell right and one cell down from the dashed ghost.
- **Scrub:** tapping a made frame (1–4) shows it on the main grid; the active frame is outlined. The Gen 0 frame is a picture, not a button.
- **Reveal:** the main grid pins to gen 4 with the ghost (label "Your gen 4"), even if the learner scrubbed back. The reveal quotes what they made: "In your four steps it was always 5 cells. At gen 4 it was the starting shape again, one cell right and one down. No rule says move: each cell only counts its neighbours, and the pattern travels. It is called a glider. These rules are Conway's Game of Life, and patterns in it can be built to compute anything a computer can."

Milestones (`minInteractions=2`): `gen-1` (the first generation made, with its deaths and births marked), `gen-4` (gen 4 made).

## Shown, not told
The learner makes each generation and sees it land in the filmstrip. The dashed ghost turns "it moved" into something they can see, not a sentence: four frames later, the same five cells sit one square down-right of their outline. The reveal only gives it a name.

## Answer visibility
Locked stage: gen 0 only, frames 1–4 "?". The ghost does not show any displacement until a step exists. Title must not say "walk", "move" or "travel" (the slug does; URL only). No axis.

## Colour and access
Live cells `--fg` fill; ghost dashed `--muted`; counts `--muted`; "×" in `--bad` and "+" in `--good`, as symbols (shape carries meaning, colour is second). Filmstrip frames outlined `--line`; active frame 2 px `--fg`. Grid `aria-label`: "Gen 4: 5 live cells, starting shape moved one right and one down".

## Claims this spec touches
None new. The cell-by-cell counts above are part of brief claim (1) (simulation); the builder records them with it.
