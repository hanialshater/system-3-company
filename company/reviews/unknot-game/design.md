# Design note: unknot-game (math:knot-crossing-change)

author: learning-designer (Lena) · date: 2026-10-16 · status: draft (no build) · brief: `company/domains/briefs/math.discrete.md` "Knots, batch 1" §3 (cm-math-discrete) · numbers: `node company/domains/briefs/checks/knots-check.mjs` (K3, K8, K9) · research: `company/research/notes/2026-10-13-teachable-knot-theory.md` §2.7 · pictures: `company/design/reviews/2026-10-14-knot-pictures.md` Ruling 1b, consult U1, U2 · kit: `src/kit/knots/README.md` rules 1, 2(a), 2(b), 4

**Not a build.** No lesson exists in `src/demos`. The fields below are for the builder to copy into `meta.json`. This note changes the switch gesture to one switch at a time and adds one stage element. cm-math-discrete owns the brief and decides.

## The payoff (what this lesson is for)
**No crossing is special.** The misconception is a search: find the one crossing that unties it, or undo them all. On the trefoil and the figure-eight, every single switch frees the knot. The lesson therefore has to let the learner see *each* single switch work, not one switch and then two and then three. The brief's tap-to-toggle path piles switches up: the QA path, three taps, shows one switch, then two, then three, and never a second single switch. The brief also lists a cause in doesNotKnow ("lets a strand pass through another"). Something on the stage has to stand for it.

## Knowledge boundary (meta.json `learner`)
- knows: "a knot is a closed loop drawn with over and under crossings".
- doesNotKnow: "that switching one crossing (the top strand goes under) can free a knot, because after the switch a strand lies on top at two crossings in a row and can slide off; and that on the trefoil and the figure-eight any one switch does it". **Changed:** "lets a strand pass through another" becomes the slide-off the stage can show. Passing through is what a switch *is* physically. Sliding off is why the result is a plain loop, and that is what the learner can see.
- Has never seen: "unknotting number", "Reidemeister". May have met a switch in draw-a-table-knot (brief 1, if built as I propose there).

## Misconception (meta.json `misconception`)
"To untie a knot you must undo every crossing, or find the one special crossing to switch." (Brief's, kept.)

## Objective (meta.json `objective`)
The learner can explain that one switch frees the trefoil whichever crossing it is, because after the switch a strand lies on top twice in a row and slides off.

## Prediction (brief's, kept)
"The trefoil has 3 crossings. Switching a crossing makes its top strand go under. What is the fewest switches that frees it?" (21 words; "over-strand" became "top strand", to match the stage caption)
A) 1 · B) 2 · C) 3. Answer: A.
- A learner who answers A may still hold the "special crossing" half. The tally (below) is what answers that half; the prediction only answers "all of them".

## Interaction
Stage: the knot picture on its stored layout (README rule 1; U2: it never moves). Default `size`/`margin`, `viewBox` scaling only. Switched table knots stay inside rule 2(a) scope.
1. **Tap a crossing to switch it. One switch at a time:** tapping another crossing restores the previous one first. This is the change from the brief.
2. **Readout** from `simplify(pd).status`, read only, nothing drawn (block (a)):
   - `'unknot'`: "Plain loop" with a tick glyph.
   - `'minimal'`: "Still a knot".
   - Never anything for `'unknown'` (rule 4). K3 says it never occurs on these states.
3. **Tally:** one small mark per crossing, filled when that crossing alone has given a plain loop: "Freed by one switch: 2 of 3". Kept across chip changes, per chip.
4. **Slide-off highlight (new, the "why" on the stage).** After a switch that gives a plain loop, tint the two edges of one bigon where a single strand now lies on top at both crossings. Add the caption "On top twice: it slides off". Take the edges from an R2 entry in `moves(pd)` on the switched diagram. Read only: `apply` is never called and nothing new is drawn, only a tint on the stored paths.
   - My probe of the shipped kit: every single switch on 3₁ (3 of 3) and 4₁ (4 of 4) offers at least one R2. cm-math-discrete to add this as a K label.
   - When two R2s are offered, pick the first, deterministically.
5. **Chips 3₁ | 4₁, Reset** (Reset clears switches, keeps tallies).
- **Dropped from the brief: "switch all three gives a trefoil again".** It is a second idea in a 60-second lesson. The one-at-a-time gesture cannot reach it, and it is the mirror, which left-or-right teaches. Its reveal sentence and claim 3 move there as a bridge if cm-math-discrete wants them.
- Stage words at the busiest frame: "Plain loop" 2, "Freed by one switch" 4, caption 5 ("On top twice: it slides off"), "Reset" 1 = 12. "Still a knot" replaces "Plain loop" (3).
- **Key state (`keyState`):** the trefoil tally at 3 of 3. Milestones:
  - `firstFree`: the first single switch gives a plain loop.
  - `allThree`: trefoil tally 3 of 3.
  - `minInteractions = 2`.
  - QA path: crossings in DOM order, three presses on 3₁, fill the tally (each press is a single switch under the new gesture). The tally survives Reset, so the reveal's "3 of 3" is on the stage when it opens.
- DOM order: crossings, chips, Reset. U1: pad the `viewBox` so 4₁'s right-hand crossing keeps a whole ≥ 44 px hit circle. Check 4₁'s centre and top-left crossings, the closest pair.

## What the learner should notice
1. Their first switch frees the trefoil, wherever they tapped.
2. The other two do as well: the tally fills, and there is no special crossing.
3. Each time, a tinted strand lies on top at two crossings in a row, so nothing holds it.
4. (On 4₁, if visited) the same with 4 crossings.

## Reveal script (≤ 90 words)
"Each crossing you switched freed the trefoil on its own: 3 of 3. No crossing was special. After each switch, the tinted strand lay on top at two crossings in a row, so it slides off, and the twist left over falls out. The fewest switches that can free a knot is its unknotting number: 1 for the trefoil, and for the figure-eight too. Some knots need more than one." (69 words)
- "3 of 3" is the tally (`allThree`, which gates the reveal).
- "and for the figure-eight too" is claimed context (claim 2, K8) unless 4₁ was visited. It is told in one claimed sentence, outside the gap.
- "the twist left over falls out" is told (R1 after the R2). One clause of context.
- Cut order if held: the last sentence (claim 5, Brittenham and Hermiller, citation unchecked), then "for the figure-eight too".

## Recall
"A knot drawing has 5 crossings. Switching any one of them gives a plain loop. How many switches did you need to free it?" A) 1 · B) 5 · C) It depends which crossing. Answer A. It tests "no special crossing" with a new count. A harder recall would ask about a knot needing 2, but that needs a claim this lesson does not show.

## Flags
- **Interaction designer: yes, a short spec.** The slide-off tint is a new visual element: which R2, tint style against the knot's stroke and the tally marks, and how it reads at 390 px in both themes. One page is enough.
- **Mockup: yes, as part of that spec.** Show one switched state of 3₁ with the tint, and one of 4₁. The design lead's contact-sheet review (README rule 2(b) lifts per lesson) should see the tint, not only the black knot.
- **cm-math-discrete:** accept or reject the one-at-a-time gesture, the narrowed doesNotKnow, and dropping "switch all three"; add the R2 K label.

## Readiness
Buildable to draft after cm-math-discrete's three answers and the interaction designer's one-page spec. Not launchable until the design lead's contact-sheet review lifts block (b) for this slug. Without the tint the lesson is a likely revise under `company/decisions/2026-10-14-told-vs-shown.md`: the readout "Plain loop" alone is the library's word for it.
