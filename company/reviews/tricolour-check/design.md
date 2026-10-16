# Design note: tricolour-check (math:knot-tricolouring)

author: learning-designer (Lena) · date: 2026-10-16 · status: draft (no build) · brief: `company/domains/briefs/math.discrete.md` "Knots, batch 1" §2 (cm-math-discrete) · numbers: `node company/domains/briefs/checks/knots-check.mjs` (K2) · research: `company/research/notes/2026-10-13-teachable-knot-theory.md` §2.2 · pictures: `company/design/reviews/2026-10-14-knot-pictures.md` Ruling 1b, consult T1 to T4, U1 · kit: `src/kit/knots/README.md` rules 1, 2(a), 2(b)

**Not a build.** No lesson exists in `src/demos`. The fields below are for the builder to copy into `meta.json`. The brief is sound; this note fixes a QA-path flaw and one told-vs-shown gap. cm-math-discrete owns the brief and decides both.

## The payoff (what this lesson is for)
You can prove a knot cannot be undone **without trying to undo it**. Find a property that no wiggle can change, which the plain loop lacks and the trefoil has. The colouring is the tool, not the payoff. What should make the learner sit up is the asymmetry: the trefoil takes three colours, and the plain loop can never take more than one. And one failed attempt proves nothing, but checking every colouring does.

## Knowledge boundary (meta.json `learner`)
- knows: "a knot drawing has gaps where one strand passes under, and 'the same knot' means you can wiggle one into the other without cutting".
- doesNotKnow: "that a colouring rule can separate the trefoil from a plain loop: the trefoil can be coloured with all three colours, a plain loop only with one, and wiggling never changes which of these a knot allows". **Changed:** the brief's "because the rule keeps working through every wiggle" is now stated as a fact the learner is told, not a cause the stage shows. See "Told vs shown" below.
- Has never seen: "arc" as a technical word (the stage says "arc" with a gloss in the predict question), "invariant", "Reidemeister".

## Misconception (meta.json `misconception`)
"The only way to show a knot can't be undone is to try hard and fail; and if I couldn't colour it, it can't be coloured." (Brief's two, kept. The second is the one the stage tests directly, on 4₁.)

## Objective (meta.json `objective`)
The learner can explain that the trefoil is not a plain loop because it allows a three-colouring that a plain loop never allows, and that settling "can't be coloured" takes checking every colouring, not one failed try.

## Prediction (brief's, one gloss)
"Rule: at each crossing, the three arcs (rope between gaps) are all one colour or all different. Can the trefoil use all three colours?" (24 words)
A) Yes · B) No · C) Only with two colours. Answer: A.
- "(rope between gaps)" glosses "arc" and follows T4: the text never says "lobe".
- C is a good distractor. K2 shows that no trefoil colouring uses exactly two colours, and the Check all readout makes that visible.

## Interaction
Stage: one knot picture coloured by the kit's arc index (T1: one stroke per arc, ending exactly at the gaps; merge edges via `arcs(pd).edges[k]`). Each arc has a small label at its middle (T3: 1, 2, 3, 4 or a shape) and a colour from the colour-blind-safe set in `company/design/system.md`. Each crossing shows a ring with a tick glyph when it obeys the rule (shape, not colour alone). Readout: "Crossings OK: n of 3".
1. **Chips ○ | 3₁ | 4₁** (3₁ selected first). **○ is new** (recommended, not required): a plain circle drawn as an SVG circle, not with kit `draw`. It has one arc, so tapping it changes the whole loop's colour at once. This puts "a plain loop can only be one colour" on the stage at the cost of one zero-word chip.
2. **Arc taps** cycle one arc through the three colours. Each hit area is ≥ 44 px along the arc. U1 applies on 4₁: pad the `viewBox` so the right-hand crossing's hit circle is not clipped. **Each arc starts its cycle on a different next colour** (arc 1 goes to colour 2 first, arc 2 to colour 3 first, arc 3 to colour 2 first). A person sees three colours cycling and will not notice the order. It is what lets the QA path reach a three-colour trefoil (below).
3. **Check all** (one button, acts on the current chip). It runs `colourings(pd, 3)` and shows the count on the stage as a seen line that stays on its chip:
   - 3₁: "9 of 27 obey: 3 one colour, 6 all three".
   - 4₁: "3 of 81 obey: all one colour".
   - ○: "3 of 3 obey: all one colour".
4. **Reset** (clears colours, keeps the seen lines).
- **QA-path flaw in the brief (must fix).** Everything starts in one colour. If every arc cycles in the same order, pressing each arc once in DOM order gives (B,A,A), (B,B,A), (B,B,B). That never reaches a three-colour trefoil, so milestone 1 never fires on the QA path (demo-standard Pre-flight 5). The brief's "tap arcs until valid" is a person's path, not QA's. With the staggered cycles in item 2, the second arc press gives (B,C,A): all three colours, every crossing ticked.
- **DOM order:** the current chip's arcs, chips ○, 3₁, 4₁, then Check all, then Reset. QA path: 3₁'s arcs (`trefoil3` on the second press), ○, 3₁, 4₁ (now on 4₁), Check all (`eightAll`), Reset. Both milestones fire. The builder confirms it in Pre-flight 5 and checks that QA enumerates the arc buttons of the chip shown at load.
- Stage words at the busiest frame (4₁ after Check all): "Crossings OK" 2, "obey" 1, "all one colour" 3, "Check all" 2, "Reset" 1 = 9. A seen line for 3₁ ("obey", "one colour", "all three") would add 5. That is 14, under 25.
- **Key states (`keyState`):**
  - `trefoil3`: a trefoil colouring on the stage that uses all three colours, with every crossing ticked.
  - `eightAll`: Check all pressed on 4₁.
  - `minInteractions = 2`. Record both when they fire. The 4₁ seen line survives Reset, so the reveal's "81" is still on the stage. The trefoil's colours do not survive Reset. Add a small "Seen: 3 colours, 3 of 3 OK" line under the trefoil when `trefoil3` fires (5 words, total 19).

## What the learner should notice
1. The trefoil's three arcs can all differ and every crossing still ticks.
2. No trefoil colouring uses exactly two colours (the Check all count says 3 + 6, nothing else).
3. On 4₁ their own tries fail, and Check all shows that is not their fault: none of the 81 works with two or more colours.
4. (With ○) a plain loop is one arc, so it is always one colour.

## Told vs shown (the one structural issue)
The brief's doesNotKnow names a cause: "because the rule keeps working through every wiggle". Nothing on this stage can show a wiggle. Drawing a moved diagram is block (a) (`scramble`/`apply` output), and planar rotation is not a convincing wiggle. Under `company/decisions/2026-10-14-told-vs-shown.md` a doesNotKnow cause that is only told is a revise. Two honest ways:
- **(chosen here) Narrow doesNotKnow** so invariance is claimed context, told in one sentence (the decision allows that for context outside the brief's gap). The gap the stage shows is then the asymmetry (three colours versus one) and the "one failed try is not a proof" half.
- **Later, a v2** with a "Wiggle" button that applies one Reidemeister move and carries the colours through, once block (a) lifts (board W-1519, EDD-011 Part 2). That would show the cause, and it is the better lesson. It is not buildable now.

## Reveal script (brief's draft with one pointer; ≤ 90 words)
"A plain loop is one arc, so it can only ever be one colour. The trefoil took all three colours with every crossing ticked. Wiggling a knot without cutting never changes whether it can be coloured this way, so no wiggling turns the trefoil into a plain loop. The figure-eight failed, and Check all tried all 81 ways: only the three one-colour ones obey. That does not make it a plain loop: this test cannot tell those two apart." (80 words)
- Quoted states: "all three colours" (`trefoil3`), "81" and "three one-colour ones" (`eightAll` seen line).
- If the invariance sentence (claim 5) is held, cut it, and tell cm-math-discrete that the lesson has lost its proof. Do not ship it as "fine" (brief's instruction, kept).

## Recall
"A knot drawing can be coloured with all three colours under the crossing rule. Can it be wiggled into a plain loop?" A) No, never · B) Yes, if you find the right wiggle · C) Only if it has fewer than 3 crossings. Answer A. It needs the asymmetry and the invariance, not the trefoil's picture.

## Flags
- **Interaction designer: no.** Brief's controls, with staggered colour cycles, seen lines and the optional ○ chip.
- **Mockup: no**, but the contact sheet is a gate. Block (b) lifts for this lesson only when the design lead reviews its contact sheet at phone size (README rule 2(b)). The sheet must include 3₁ coloured with all three colours, **4₁ coloured** (accepted only in black so far), the T2 crossing (top-left of 3₁) checked first, and U1's edge crossing on 4₁.
- **Builder:** T1 to T4 are obligations (brief). T1 is the one failure that would teach the wrong grouping.

## Readiness
Buildable to draft once cm-math-discrete accepts the Check-all fix and the narrowed doesNotKnow. Not launchable until the design lead's contact-sheet review lifts block (b) for this slug, and claim 5 (invariance) is checked by the fact-checker.
