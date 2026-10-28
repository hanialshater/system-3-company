# Spec: flatten-the-cube-to-a-dot

owner: interaction-designer (Rafael) · 2026-10-25 · board W-2042 (lane M step 2, under W-2037) · status: **build spec, awaiting design review** · brief: `src/demos/math/flatten-the-cube-to-a-dot/meta.json` → `brief` (category-curator, math) · format: multi-card sequence, kit `src/kit/sequence.tsx` (EDD-006), reference lesson `src/demos/math/euclid-three-steps/Demo.tsx` · mockup: `flatten-the-cube-to-a-dot.svg`, drawn by `flatten-the-cube-to-a-dot-mockup.mjs` (run it from the repo root; it also checks every count below and throws if the removal order breaks).

**Format: three sub-cards, one tap each for the first two and a hand-then-finish pair for the third.** Slice shows the total survive one change on the solid. Flatten shows where the "missing 1" goes. Shrink shows the total survive every removal down to a dot. The learner presses; the readout and a row of twelve cells keep the count, so the reveal names what is already on the stage.

## Decision on the curator's open doubt: 12 removals do not fit by hand, so the learner does the first few and "Remove the rest" finishes them

- **Time budget at learner pace** (taps about 1.5 s each including reading the change line, reveal read at about 240 words a minute):

  | Part | Seconds |
  |---|---|
  | Predict | 12 |
  | Slice: 1 tap and read the change line | 6 |
  | Flatten: 1 tap, 0.7 s animation, read the caption | 7 |
  | Next × 2 | 2 |
  | Shrink: 3 taps by hand, then "Remove the rest" with 2 s of playback | 8 |
  | Reveal, 72 words | 18 |
  | **Total** | **about 53** |

  Twelve single taps would add 9 more taps, about 13 s, for about 66 s, and the last seven taps would teach nothing new.
- **The chip stays, with one change to the order behind it.** The brief's order (4 outer edges, then 1 inner edge, then 7 loose edges) puts the first corner removal on press 6. A learner who taps "Remove an edge" two or three times then sees only regions go. Corners would go only inside the fast playback, which leaves claim c4's "either way" half shown. So this spec reorders the 12 removals so that a corner goes on **press 3**. The same 12 edges are removed, 5 with a region and 7 with a corner, the total is 1 after every step, and it ends on one dot. The script checks all of this.
- **What this changes for others.**
  - The brief's `subCards[2].picture` order text and claim c5's `source` ("the 4 outer edges, then one inner edge…") no longer describe the order on the stage. **Claim c5's learner text is unchanged.**
  - The category-curator should update the c5 source to cite this spec's order or `flatten-the-cube-to-a-dot-mockup.mjs` (board item filed).
  - The lesson still teaches the same thing. Only the order of removals changes.
- "Remove the rest" is **disabled until the first removal**. So at least one removal is always done by hand, and the playback never replaces the hand.

## Removal order (fixed; vertices 0-3 are the outer square = the top face's rim, 4-7 the inner square = the bottom face, spokes i–(i+4))

| Press | Edge | Goes with | corners − edges + regions |
|---|---|---|---|
| start | | | 8 − 12 + 5 = 1 |
| 1 | outer 0–1 | region (side face) | 8 − 11 + 4 = 1 |
| 2 | outer 3–0 | region | 8 − 10 + 3 = 1 |
| 3 | spoke 0–4 | **corner 0** (first loose end) | 7 − 9 + 3 = 1 |
| 4 | outer 1–2 | region | 7 − 8 + 2 = 1 |
| 5 | spoke 1–5 | corner 1 | 6 − 7 + 2 = 1 |
| 6 | outer 2–3 | region | 6 − 6 + 1 = 1 |
| 7 | spoke 2–6 | corner 2 | 5 − 5 + 1 = 1 |
| 8 | spoke 3–7 | corner 3 | 4 − 4 + 1 = 1 |
| 9 | inner 4–5 | region (bottom face) | 4 − 3 + 0 = 1 |
| 10 | inner 5–6 | corner 5 | 3 − 2 + 0 = 1 |
| 11 | inner 6–7 | corner 6 | 2 − 1 + 0 = 1 |
| 12 | inner 7–4 | corner 7; corner 4 is the dot | 1 − 0 + 0 = 1 |

No removal ever merges two regions or cuts the drawing in two, so the learner sees only the two cases claim c4 names.

## Stage, per sub-card (top to bottom; DOM order = this order)

The trail is the kit's, with titles **Slice · Flatten · Shrink**. The brief's third title, "Shrink to a dot", becomes "Shrink":
- EDD-006 asks for one or two words.
- At 390 px each trail cell is 98 px wide, and "3 Shrink to a dot ✓" wraps to three lines there.
- The sub-card's `aria-label` keeps the full name through the kit.

Traces (≤ 12 characters, shown under a done step): `10−15+7=2`, `8−12+5=1`, `1−0+0=1`. Each trace is passed only once that card's animation or playback has finished, so a trace never runs ahead of the picture.

**The readout** (all three cards) is one equation line: numbers 20 px bold with tabular figures, and keys 11 px muted under each number ("corners", "edges", "faces" or "regions"). It has `role="status"` and `aria-live="polite"`, and its accessible text is the full sentence, e.g. "10 corners minus 15 edges plus 7 faces equals 2". A number that just changed shows in `--warn` until the next change. The total never changes colour: it is the thing that does not move.

### 1. Slice (milestone `slice.done`)
1. **Picture**, viewBox 0 0 300 174:
   - The cube in oblique view, edges 2 units in `--fg`, corners as 3.6-unit dots so they can be counted.
   - The three edges at the hidden back-bottom-left corner are dashed at 60 % opacity, and that corner's dot is drawn at 50 %.
   - The slice cuts the front-top-right corner at a third of each edge. The corner goes; the triangle (3 corners, 3 edges, the face filled `--warn` at 45 %) appears in `--warn`.
   - Motion: the corner dot fades out and the triangle grows from the corner point, 300 ms. Under reduced motion it is instant.
2. **Readout**: `8 − 12 + 6 = 2`, then after the slice `10 − 15 + 7 = 2`, with the first three numbers in `--warn`.
3. **Change line** (space always reserved): after the slice, "+2 corners, +3 edges, +1 face".
4. **Control**: `Slice a corner`. After the press it is disabled and drawn selected (`className="active"`; kit `.control.active:disabled` keeps it at full opacity).
5. Kit `Next: Flatten →`.

### 2. Flatten (milestone `flatten.done`)
1. **Picture**, the same viewBox. It starts as the plain cube: card 1's solid unsliced, with the same projection, so the counts match the readout.
   - On the press, the top face appears as a `--domain` tint at 22 %. It lifts 22 units and shrinks into a 30 × 30 tile parked at the top right of the picture (x 258, y 8): 250 ms.
   - Then the 8 corners move in a straight line from their cube positions to the flat ones (outer square 60–240 × 8–166, inner square 116–184 × 52–122), with the edges following: 450 ms.
   - The 5 regions (inner square and four trapezoids) are filled `--domain` at 16 %. The outside is not filled: it is where the top face was.
   - Reduced motion: it cuts straight to the flat drawing and the tile.
   - The tile has no label. It is the top face, and card 3's end line names it.
2. **Readout**: `8 − 12 + 6 = 2` → `8 − 12 + 5 = 1`. The key "faces" becomes "regions" at the end of the stretch. The last two numbers turn `--warn`.
3. **Caption** (space always reserved): "top face off: 1 short".
4. **Control**: `Take the top off`. Once pressed it is disabled and drawn selected.
5. Kit `Next: Shrink →`.

`flatten.done` fires **on the press**: the outcome is fixed, and the 700 ms animation must not race QA's 450 ms wait. The trace waits for the animation.

### 3. Shrink (milestones `shrink.region`, `shrink.corner`, `shrink.dot`)
1. **Picture**: card 2's flat drawing and its tile, in the same state.
   - On each removal, the edge and what goes with it (the region's fill, or the loose corner's dot) flash `--warn` for 120 ms, then fade out over 200 ms. That is 320 ms in all, inside QA's 450 ms.
   - At the end the single dot grows to radius 6, and the tile slides beside it (250 ms).
2. **Readout**: from `8 − 12 + 5 = 1` down to `1 − 0 + 0 = 1`. The numbers that changed turn `--warn`: edges and regions, or corners and edges.
3. **Change line** (space reserved): "−1 edge, −1 region" or "−1 edge, −1 corner" for the latest removal.
4. **Strip**: the label "total after each removal" (11 px), then 12 cells of 20 px with 4 px gaps (284 px; fits the 308 px phone column).
   - A cell fills with "1" when its removal happens.
   - The cell's shape tells which kind it was: a **rounded square** where a region went, a **circle** where a corner went. Before a cell fills it is a dashed outline of the same shape.
   - So at the end the row reads twelve 1s, five squares and seven circles. This is how "the total never moved" is still on the stage when the reveal opens.
   - The cells are `aria-hidden`. The readout's live text carries the count for screen readers.
5. **End line** (space reserved): "+ the top face = 2" in `--good`, 16 px bold, shown when the dot is reached.
6. **Controls**, one row: `Remove an edge` · `Remove the rest`.

| Control | Enabled when | Press |
|---|---|---|
| `Remove an edge` | not locked, fewer than 12 removed, no playback running | removes the next edge in the order |
| `Remove the rest` | not locked, at least 1 and fewer than 12 removed, no playback running | plays the remaining removals at 220 ms each, through the same flash-and-fade, and each one updates the readout, the change line and the strip. It is drawn selected while it plays and after. |

When there is nothing left, both controls are disabled. `Remove the rest` stays drawn selected; `Remove an edge` is greyed.

**Milestones:**
- `shrink.region` is reached on the first removal.
- `shrink.corner` is reached on the first corner removal: press 3 by hand, or the moment `Remove the rest` is pressed if it covers that removal.
- `shrink.dot` is reached when the 12th removal is committed.

On `Remove the rest`, **commit the end state and reach the milestones at the press**. The playback then only presents the steps already committed. If the phase becomes `reveal`, or reduced motion is on, the playback jumps to the end at once. So the stage shows the dot whenever the reveal is open.

No Reset on any card. Every chip is one-way, and nothing on the stage needs undoing to be understood. Leaving it out keeps the control count fixed, so QA's indices never shift.

## Controls in DOM order, and the QA path (tests/qa/contract.spec.ts: count once, press each by index, 450 ms wait)

| # | Control | At QA time | Effect |
|---|---|---|---|
| 0–2 | trail Slice, Flatten, Shrink | disabled (current or unvisited) | skipped |
| 3 | Slice a corner | enabled | `slice.done` |
| 4 | Next: Flatten | enabled | card 2 |
| 5 | Take the top off | enabled | `flatten.done` |
| 6 | Next: Shrink | enabled | card 3 |
| 7 | Remove an edge | enabled | press 1, a region: `shrink.region` |
| 8 | Remove the rest | enabled (1 removed) | presses 2–12 committed: `shrink.corner`, `shrink.dot`; playback 11 × 220 ms |

- 9 controls in all, within the budget of 16. `minInteractions = 5`, the sum of the milestones.
- Every enabled press changes the stage fingerprint.
- The `Remove the rest` playback ends about 2.4 s after the press. QA's reveal click within that time snaps it to the end.

## What is on the stage when the reveal opens (revealCard = the last card, the kit default)

| The reveal draft says | Where it is on the stage |
|---|---|
| "Slicing kept the total at 2" | trace 1 `10−15+7=2` |
| "took the top face off … got 1" | trace 2 `8−12+5=1`, and the tile |
| "Each edge you removed took a region or a corner" | the strip's squares and circles, and the last change line |
| "the total never moved" | the twelve 1s |
| "down to a single dot: 1" | the picture's dot and the readout `1 − 0 + 0 = 1` |
| "Put the top face back: 2" | the tile beside the dot, and the end line |

The reveal's words are the curator's draft, not this spec's (72 words). Its last two sentences, "any convex solid" and "Euler's formula", are told context. They are claims c6 and c7 and are allowed under "context outside the brief's gap may be told in one claimed sentence". Whether two told sentences are one too many is the category manager's call.

## Word budget at the busiest frame (decision 2026-10-16 counting; numerals count 0)
- **Shrink at the end** is the busiest frame, at 21 words (25 allowed):
  - trail "Slice", "Flatten", "Shrink": 3
  - chips: 6
  - readout keys: 3
  - change line "edge", "corner": 2
  - strip label: 4
  - end line "the top face": 3
- Slice: 3 + 3 + 3 + 3 = 12.
- Flatten: 3 + 4 + 4 + 3 = 14.

## Fit: 390 × 844 and 1280 wide
- **Phone (390 × 844).** The column is 308 px (card padding 16 left and 66 right for the feed rail, `globals.css` ≤ 600 px).
  - Pictures are 308 × 179.
  - The tallest sub-card is Shrink, at about 427 px including the trail.
  - The mockup's frame 7 estimates the open reveal's bottom at **about 753 of 844 px**: title and hook, the stage, the verdict, and the 72-word reveal in 9 lines at 15 px.
  - That is an estimate, not a measurement. The builder measures with `tools/reveal-fit.mjs` and the 390 × 844 screenshot (demo-standard pre-flight 7).
  - If it crops, fix in this order:
    1. Merge the change line into the strip label's row (a saving of 22 px).
    2. Cap the picture at `max-height: 24dvh` in the reveal phase. The picture carries no text, so this shrinks no label below the 10 px floor.
    3. Only then ask the category manager to cut told context.
  - Never shrink the readout, the strip numerals or the tap targets.
- **Desktop (1280 wide).** The card shell is 480 px with a 440 px column. Pictures are capped at **340 px wide, centred**, so the readout stays right under the picture and nothing sits beside it (one representation). Everything else is the same DOM at the same sizes. The strip (284 px) and the two chips (148 px each) sit centred.
- Every control is at least 44 px tall (kit `.control`, plus a `min-height: 44px` class as in euclid's `.tap`).

## During predict
- Card 1 is shown, with the cube, `8 − 12 + 6 = 2` and an empty change line.
- `Slice a corner` and Next are disabled and greyed, and the trail's later steps are disabled.
- Nothing on the locked stage points to "still 2": the sliced numbers do not exist until the press. The prediction's own text already states 8 − 12 + 6 = 2.

## Shown, not told
- The learner slices and watches three numbers change while the total does not.
- They take the top off and watch the total drop by exactly the face they can see parked in the corner.
- They remove edges by hand until both kinds of removal have happened, then watch the rest go. A row of twelve 1s, in two shapes, records that every removal took an edge with a region or a corner.
- The final "+ the top face = 2" puts back the very tile they saw lift off.
- The reveal only has to say "this works for any convex solid" and give the name.

## Mockup (`flatten-the-cube-to-a-dot.svg`)
- Frames 1–6 are dark, at phone width: predict, slice done, flatten done, shrink press 1, shrink press 3 (first corner), and the end.
- Frame 7 is the open reveal at 390 × 844 in light, as a layout estimate.
- Frame 8 is the desktop column at 1280 wide in light.
- Frame 9 is the `Remove the rest` playback as thumbnails.
- It is sketch fidelity: the geometry, order, sizes and states are the spec's, and the look is the kit's. It is not a visual design.
- `node company/design/specs/flatten-the-cube-to-a-dot-mockup.mjs` prints every count in this spec.

## For the builder
- Build in `CardSequence`/`SubCard` as euclid does. Each sub-card's state lives in the lesson component (cards stay mounted).
- Use exactly the order above. Copy `ORDER`, `FP` and `REGIONS` from the mockup script, or recompute them, and check against the table.
- Recount the claims c1–c5 from your drawn solid (the brief asks this). Never mark a claim verified.
- Animations: 300 ms (slice), 250 + 450 ms (flatten), 320 ms (per removal), 220 ms per playback step. Milestones are reached at the press, never at the end of an animation. All motion is off under `prefers-reduced-motion`.
- Use theme variables only (`--fg`, `--muted`, `--domain`, `--warn`, `--good`, `--line`, `--bg-3`), and check both themes. `--warn` is the text-safe light value on light.

## Open, and whose
- Claim c5's `source` and `brief.subCards[2].picture` cite the old order: category-curator (math), board item from this run.
- Design review of this spec and the built lesson's 390 × 844 reveal: design-lead (W-2037 flow).
- Pairwise against the single-card twin `slice-a-corner-off`: pedagogy-critic, after both are built (brief `singleCardTwin`).
