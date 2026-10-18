# Design note: left-or-right (math:knot-chirality)

author: learning-designer (Lena) · date: 2026-10-16 · status: draft (no build) · brief: `company/domains/briefs/math.discrete.md` "Knots, batch 1" §4 (cm-math-discrete) · numbers: `node company/domains/briefs/checks/knots-check.mjs` (K4, K5) · research: `company/research/notes/2026-10-13-teachable-knot-theory.md` §2.4 · pictures: `company/design/reviews/2026-10-14-knot-pictures.md` Ruling 1b, consult U1 · kit: `src/kit/knots/README.md` rules 1, 2(a) (scope paragraph, EDD-011 Part 1), 2(b); `src/kit/knots/index.d.ts` (`mirror`, `turnOver`)

**Not buildable as briefed.** The brief's "Turn over" needs a picture of the turned-over knot. `turnOver(pd)` pictures are inside import block (a) (README rule 2(a) scope: "Every other picture stays inside block (a), including `turnOver(pd)`"). The obvious workaround, a CSS card flip, draws the **mirror**. That would teach the exact misconception the lesson exists to break. Below are the hazard, a construction that avoids it, and the written ruling it needs.

## The payoff (what this lesson is for)
Turning a knot over is a way of **moving** it, so it cannot change the knot. A mirror image is not a motion. For the trefoil, nothing you can do with the rope reaches its mirror. The learner's intuition fuses the two ("flip it over and you get the mirror image"). The lesson has to put both on one stage, so the learner sees that they differ at every crossing and that only the mirror changes the hand.

## The hazard: a back-face flip draws the mirror, not the turned-over knot
- A knot diagram is a flat picture plus, at each crossing, which strand is on top.
- **Turning the rope over** (a half-turn about a vertical axis in the screen) reflects the picture left to right. It also swaps which strand is on top at every crossing, because the strand that was nearer you is now farther. The kit defines `turnOver` exactly so: "a planar reflection plus every crossing switched. Same knot, unlike mirror()" (`index.d.ts`).
- **A CSS flip** of the drawn SVG (`rotateY(180deg)`, back face visible, or a copy of the same drawing on the back face) reflects the picture left to right and **keeps every gap where it was**. A planar reflection with the crossings kept is the **mirror image** knot. For the trefoil its signs read +1, +1, +1: the right-handed trefoil.
- So the naive flip ends on the mirror. Next to a signs readout computed from `turnOver(pd)` (−1, −1, −1, K4), the picture and the readout would disagree. Without the readout, the picture would confirm option C ("only by turning it over").
- Any flip that shows the plain reflected drawing at some frame has the same fault. That includes a 360° spin, which passes through the mirror at 180°, and an animation that "ends on the original drawing with 'same knot'" (the brief's fallback) if its middle frames show the reflected drawing.

## A construction that avoids it (needs a written ruling)
**Two-sided card.** The front face is `draw(pd, { layout: L })`. The back face is `draw(mirror(pd), { layout: L })` on the same stored layout. Both are cleared pictures: a table knot and its mirror, default layout, default size and margin, K5 shows the mirror draws. Use `backface-visibility: hidden` and animate `rotateY` from 0° to 180° in 300 ms.
- At rest after the flip, the screen shows the left-right reflection of the mirror drawing: a planar reflection plus every crossing switched. That is `turnOver(pd)` by the kit's own definition.
- The kit's `turnOver` is never passed to `draw` or `layout`. No new layout is computed, `size` and `margin` are untouched, and a reflection cannot add a crossing.
- It is also physically right. At 90° the card is edge-on, and from then on you see the rope from behind, where every crossing is the other way round.
- The signs readout comes from the logical diagram (`signs(turnOver(pd))`). It matches the picture: reflecting the mirror's +1s gives −1s.
- **Builder test** (proposal; the principal engineer says whether it is feasible): reflect the stored layout's coordinates, apply `mirror(pd)`'s over/under, and check that the crossing signs computed from that geometry equal `signs(turnOver(pd))` for 3₁ and 4₁. That pins the picture to the readout.
- **Why it needs a ruling.** Your constraints for this run, and README rule 2(a), say no drawn `turnOver` and no scaling except by `viewBox`. This construction draws no `turnOver` and scales nothing, but it **depicts** the turned-over state through a CSS reflection. Whether that is inside rule 2(a) is not mine to decide. It lifts only "in writing in the EDD or the review record" (README rule 2).
  - The **design lead** rules on the picture: is a CSS-reflected cleared drawing a cleared picture?
  - The **principal engineer** rules on rule 2(a) scope.
- **If the ruling is no:** drop Turn over. The lesson then teaches only "the mirror changes the hand", and option C is answered by a told sentence. doesNotKnow lists "turning the picture over does not do it either", so under `company/decisions/2026-10-14-told-vs-shown.md` that version is a revise. I recommend holding the lesson rather than shipping it that way.

## Knowledge boundary (meta.json `learner`)
- knows: "what a mirror image is, and that a trefoil is a closed loop with three crossings".
- doesNotKnow: "that turning a knot over is a way of moving it, so it never changes the knot, while its mirror image can be a different knot: no wiggling turns the left-handed trefoil into the right-handed one. The figure-eight is its own mirror image."
- Has never seen: "chiral", "amphichiral", "writhe", crossing signs. The stage calls signs "marks" and the writhe "Sum".

## Misconception (meta.json `misconception`)
"A mirror image is the same knot; you just flip it over." (Brief's, kept.)

## Objective (meta.json `objective`)
The learner can explain that turning the trefoil over leaves every crossing mark the same, so it is the same knot, while the mirror changes every mark, and that the trefoil cannot be moved into its mirror image.

## Prediction (brief's, kept)
"A left-handed trefoil and its mirror image, the right-handed one. Can you wiggle one into the other without cutting?" (19 words)
A) Yes, wiggle it · B) No, never · C) Only by turning it over. Answer: B.
- C is the misconception. The stage's two buttons answer it directly.

## Interaction (assuming the ruling is yes)
Stage: the two-sided card above, stored layout per chip (rule 1), U1 padding on 4₁. A row of per-crossing marks (+ or −) is drawn **outside** the flipped element, at the crossing positions for the current face, so no text is ever mirrored. "Sum" is the writhe. A name line says "Left-handed" if the sum is negative, "Right-handed" if positive, and nothing at 0.
1. **Turn over:** flips the card (300 ms; reduced motion: an instant swap to the end state plus a 1 s "Turned over" label). A second press flips back.
2. **Mirror:** switches every crossing in place (`mirror(pd)` on the stored layout, as the brief says). This needs no ruling. If the card is turned over, the back face swaps too, so the two faces always hold a knot and its mirror.
   - **Option for the ruling:** draw Mirror as a left-right reflection of the front (`scaleX(-1)`, crossings kept), which is what "mirror image" means to a learner. Then Mirror and Turn over end on the **same outline**, differing at every crossing. That is the sharpest possible "notice". It needs the same ruling as Turn over, so ask for both together. Preferred if granted.
3. **Chips 3₁ | 4₁, Reset.**
- **Stage rule (brief's, kept):** the sum is shown only for these drawings (reduced and alternating, K1). The lesson never calls the sum "the knot's hand" in general.
- Stage words at the busiest frame: "Turn over" 2, "Mirror" 1, "Reset" 1, "Sum" 1, "Left-handed" 1, "Turned over" 2 = 8.
- **Key states (`keyState`):**
  - `turned`: the trefoil turned over, with marks −, −, −.
  - `mirrored`: the trefoil mirrored, with marks +, +, +.
  - `eightMirror` (optional): the figure-eight mirrored, with sum 0.
  - `minInteractions = 2`. Record the marks and sums when each fires. Keep a seen line, "Turned over: −3 · Mirror: +3", that survives Reset.
- DOM order: Turn over, Mirror, chips, Reset.
  - QA path: Turn over (`turned`; the flip settles in 300 ms, inside the 450 ms wait), Mirror (`mirrored`, on the turned-over card: the logical diagram is `turnOver(mirror(pd))`, signs +1), 4₁, Reset.
  - `eightMirror` is not on the QA path. That is why it is optional.

## What the learner should notice
1. After Turn over the picture is reflected and every gap has moved, but the marks are still −, −, − and the name still says left-handed.
2. After Mirror every mark is +, and the name says right-handed.
3. (If the Mirror option is granted) the two end states have the same outline and differ at every crossing. Turning over is not "seeing the mirror".
4. On 4₁ the sum is 0 before and after Mirror, and no hand is named.

## Reveal script (≤ 90 words; the figure-eight sentence branches)
"Turning the trefoil over left every mark minus: turning over is a way of moving it, so its hand stayed left. Mirroring turned every mark plus, and no wiggling gets back: the trefoil is not its own mirror image, as Max Dehn proved in 1914. The figure-eight's marks summed to 0 both ways, and it is its own mirror image. So a trefoil comes in a left and a right version, and turning one over never swaps them." (78 words)
- Quoted states: "minus" (`turned`), "plus" (`mirrored`), and "summed to 0 both ways" only if `eightMirror` fired. Otherwise use "The figure-eight is different: it is its own mirror image." That sentence is claimed context (claim 2).
- **"No wiggling gets back" is told** (claim 1, a theorem; the stage shows one motion, not all). The stand-in on the stage is the contrast: a real motion kept the marks, and only the mirror changed them. I judge that enough for this gap, but `company/decisions/2026-10-14-told-vs-shown.md` does not settle it: "no wiggling turns left into right" is in doesNotKnow, and a theorem about every wiggle cannot be shown in 60 seconds. A learner reviewer may call it a revise. That is the risk to watch, and if it happens the question belongs to head-of-product (the decision's owner).
- Cut order if held: "as Max Dehn proved in 1914" (claim 1's attribution), then the figure-eight sentence (claim 2).
- The brief's claim 5 (handedness convention) stays in meta, with "sources differ on which trefoil is right" in its support. The stage says "Left-handed" for the table's 3₁, per the library.
- Bridge from unknot-game (optional): switching all three crossings is the Mirror button. One clause, only if cm-math-discrete moves that sentence here.

## Recall
"You hold a right-handed trefoil made of rope. You turn it upside down and lay it flat. What do you have?" A) A right-handed trefoil · B) A left-handed trefoil · C) Either, depending on how you lay it. Answer A. It asks for the idea (motion keeps the hand) in a physical situation the stage did not show.

## Flags
- **Interaction designer: yes.** The two-sided card, flip timing (150 to 400 ms), the reduced-motion fallback, marks outside the transformed element, and how Mirror behaves while turned over.
- **Mockup: yes, before any build.** Frames at 0°, 90° and 180° for 3₁ and 4₁, the Mirror end state (both options if the ruling covers reflection), at 390 px in both themes. The design lead must see the turned-over end picture before it can be called cleared. The brief's "the contact sheet must include the mirror and the turned-over state" stands.
- **Ruling first:** design lead and principal engineer, in writing, on the two-sided card (and on `scaleX(-1)` for Mirror). Until then this lesson is not ready to build.
- **Builder, whatever the ruling:** never draw `layout(turnOver(pd))`, and never flip a single-sided drawing.

## Readiness
Not ready to build. Order:
1. Written ruling on the construction (design lead with principal engineer).
2. Interaction-designer spec and mockup.
3. cm-math-discrete accepts the doesNotKnow wording and the optional `eightMirror`.
4. Build.
5. Contact-sheet review lifts block (b) for this slug.
