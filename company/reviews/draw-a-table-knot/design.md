# Design note: draw-a-table-knot (math:knot-table-names)

author: learning-designer (Lena) · date: 2026-10-16 · status: draft (no build) · brief: `company/domains/briefs/math.discrete.md` "Knots, batch 1" §1 (cm-math-discrete) · numbers: `node company/domains/briefs/checks/knots-check.mjs` (K1, K6) · research: `company/research/notes/2026-10-13-teachable-knot-theory.md` §2.5 · pictures: `company/design/reviews/2026-10-14-knot-pictures.md` Ruling 2 · kit: `src/kit/knots/README.md` rules 1 and 2(a)

**Not a build.** No lesson exists in `src/demos`. The fields below are for the builder to copy into `meta.json`. This note proposes one change to the brief's interaction and prediction (below, "What changed from the brief"). cm-math-discrete owns the brief and decides.

## The payoff (what this lesson is for)
A table name like 6₁ is a promise about **every** drawing of the knot: none has fewer than 6 crossings. You cannot see that by counting one drawing. Counting the table's own picture gives 6 and *confirms the wrong idea* ("the number counts the crossings in the drawing"), which the brief lists as part of its misconception. So the lesson needs a drawing whose crossing count and name number **disagree**. The kit gives one without leaving the cleared pictures: switch one crossing of the 6₁ drawing. It still shows 6 crossings, and it is now 4₁ (or a plain loop).

## Knowledge boundary (meta.json `learner`)
- knows: "a knot is a closed loop of rope, and a drawing shows which strand is on top at each crossing".
- doesNotKnow: "that the first number in a knot's table name, such as 6 in 6₁, is the fewest crossings any drawing of that knot can have, so a drawing can show more crossings than its name says; the second number is only its place in the table".
- Has never seen: a knot table, the words "crossing number", "invariant", "Reidemeister". Has not met crossing switches (unknot-game comes later in the ranking), so the stage must say what a switch does in a few words (see Interaction).

## Misconception (meta.json `misconception`)
"The number in a knot's name counts something you can see in its drawing, such as the crossings or the loops." (Brief's, narrowed to the two readings the options test.)

## Objective (meta.json `objective`)
The learner can explain that a knot's name number is the fewest crossings any drawing of it can have, using a drawing that shows more crossings than its name.

## Prediction (changed options)
"Knot tables name each knot with a number, like 6₁. This drawing of 6₁ has 6 crossings. What does the 6 count?" (22 words)
A) The crossings in any drawing of it · B) The fewest crossings any drawing of it can have · C) The loops in the rope. Answer: B.
- A is the misconception, worded at the same precision as B, so B is not the only exact option (demo-standard "No answer before the commit"). C is the brief's "number of loops". The brief's "its age in years" is dropped: a joke option is a free elimination and makes the question a 1-in-2.
- The locked stage shows 6₁ and its 6 crossings, which fits both A and B. That is intended: the stage then breaks A.

## Interaction
Stage: one knot picture, `draw(pd, { layout: L })` with `L` computed once per chip (README rule 1), default `size`/`margin`, scaled by `viewBox` only (rule 2(a) scope). Under it, two readouts: **"Crossings drawn: 6"** and **"Name: 6₁"**.
1. **Chips 5₂ | 6₁** (6₁ selected first). Both are cleared pictures (Ruling 2; brief: default kit drawing, fix1-bigon).
2. **Tap a crossing to switch it** (the strand on top goes under). **One switch at a time:** tapping another crossing restores the first. The picture does not move (stored layout; `crossingChange` keeps labels). A one-line caption: "Switch: top strand goes under" (5 words). The name readout updates from `identify` (show the name only, not the mirror flag; the table lists a knot and its mirror under one name).
   - 6₁: 4 of 6 switches give 4₁, 2 give a plain loop (my probe of the shipped kit; cm-math-discrete to add as a K label).
   - 5₂: 3 of 5 give 3₁, 2 give a plain loop (same probe).
   - Every switched state is a table knot after `crossingChange` on its stored layout, so it is inside the rule 2(a) scope (README, EDD-011 Part 1). `simplify` is not drawn; `identify` is read only.
   - For 0₁ the readout says "Name: 0₁, plain loop".
3. **Reset.**
- **No tap-to-count.** The brief had the learner tap each crossing to count it. Counting is procedure, and its result agrees with the misconception. The count is a readout instead. Tap targets stay the brief's (≥ 44 px per crossing; 6₁'s bottom clasp crossings are the closest pair).
- **Seen line:** when the milestone fires, a one-line trace under the readouts keeps it: "Seen: 6 drawn, name 4₁". Reset and chip changes do not clear it (the reveal quotes it, and QA presses Reset last).
- Stage words at the busiest frame: "Crossings drawn" 2, "Name" 1, "plain loop" 2, caption 5, seen line 3, "Reset" 1 = 14. Chips and names are numerals (0).
- **Key state (`keyState`):** a switched drawing whose crossings drawn (N) differ from its name's first number. Milestone `switched`, recorded as {chip, N, name} when it fires so Reset cannot erase it. `minInteractions = 1`. QA path: the first crossing in DOM order reaches it on either chip (every switch on both knots changes the name).
- DOM order: crossings first, then chips, then Reset.

## What the learner should notice
1. Before any switch, count and name agree (6 and 6₁). That is what makes A tempting.
2. After one switch the picture looks the same and still has 6 crossings, but the name is 4₁ or 0₁.
3. So the name cannot be counting this drawing.

## Reveal script (≤ 90 words; branch on the recorded name)
- **Switched to 4₁ or 3₁ (80 words; shown for 6₁ → 4₁):** "A switch makes a new knot. Yours still had 6 crossings drawn, but its name became 4₁. So the first number in a name is not what one drawing shows. It is the fewest crossings any drawing of that knot can have: 4₁ can be drawn with 4 and never with fewer. The table draws each knot with that fewest, which is why 6₁ had exactly 6. The number after it is only the knot's place in the table's list."
- **Switched to a plain loop:** same, with "its name became 0₁, a plain loop" and "a plain loop can be drawn with none."
- On the 5₂ chip: "5 crossings", "3₁ can be drawn with 3", "which is why 5₂ had exactly 5".
- Quoted values: N, the new name and the chip come from the `switched` milestone record.
- **Cut order if the fact-checker holds something:** "and never with fewer" (needs claim 5), then the last sentence (claim 4).
- The brief's determinant sentence (5₂ and 6₁ differ, 7 and 9) is dropped: it would be told, and it does not serve this lesson's gap.

## Claims to add to the brief's list
5. "In the kit's 6₁ drawing, switching any one crossing gives 4₁ (4 of 6) or a plain loop (2 of 6); in its 5₂ drawing, 3₁ (3 of 5) or a plain loop (2 of 5); the drawing keeps 6 (or 5) crossings." support: derivation (`crossingChange`, `identify`, `crossingCount`); source: a new K label in `knots-check.mjs` (my probe is testimony, not the check).
6. "4₁ and 3₁ cannot be drawn with fewer than 4 and 3 crossings." support: derivation (the kit's drawings are reduced and alternating, `simplify` status `'minimal'`) plus citation (Tait's first conjecture, proved 1987; research §2.5, high, full text unchecked).
- The brief's claims 1, 2 and 4 stay. Claim 3 (determinants) goes with its sentence.

## Recall
"A drawing of a knot shows 9 crossings. Its table name is 5₂. What follows?" A) Some drawing of it has 5 crossings, and none has fewer · B) The name is wrong; it should start with 9 · C) Every drawing of it has 9 crossings. Answer A. New numbers, and the situation is reversed (the name is given, the drawing is bigger).

## What changed from the brief, and why
- **Interaction: switch instead of tap-to-count.** Counting the table drawing shows count = name. That supports option A, the misconception. The "fewest" in doesNotKnow then has nothing on the stage (demo-standard "Show the why you promised"; `company/decisions/2026-10-14-told-vs-shown.md`). The brief's own warning ("do not say every drawing has this many") is the same problem stated for the reveal. A switched drawing is the one stand-in the kit allows: extra-crossing drawings of the same knot are blocked (rule 2(a)), and a switched table knot is not (rule 2(a) scope).
- **Cost:** the lesson introduces crossing switches before unknot-game. unknot-game's question (the fewest switches that free the trefoil) is not spoiled by 5₂ and 6₁. A learner who hits a plain loop here may be primed for it. I judge that acceptable; cm-math-discrete may prefer to show only the 4₁/3₁ switches (disable the clasp crossings), which costs an unexplained disabled control. I would not do that.
- **Fallback if cm-math-discrete keeps the brief's design:** narrow doesNotKnow to "the first number counts the crossings in the table's drawing, and the table draws each knot with as few as possible". Then "as few as possible" is claimed context in one sentence. I do not recommend it: the lesson would then be vocabulary only, and its stage would confirm the misconception.

## Flags
- **Interaction designer: no.** Same gesture as unknot-game, one readout pair.
- **Mockup: no** beyond the normal contact sheet: 6₁ and 5₂, plus one switched state of each, at 390 px. 6₁'s left lobe is open under fix1 (Ruling 2), and nobody traces it.
- **Builder:** this is likely the first lesson to use `layout`, so EDD-004 condition C4 applies: record one phone-class draw time in build notes (`company/rituals/records/2026-10-14-eng-review-EDD-004.md`).

## Readiness
Buildable as soon as cm-math-discrete accepts or rejects the change above and adds the K label for claim 5. No import block applies (5₂ and 6₁ are not under block (b); switched table knots are inside the 2(a) scope).
