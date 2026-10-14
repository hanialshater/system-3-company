# Build note: seesaw-sit-closer

builder: demo-builder · 2026-10-13 · for evaluators to read after their findings

- Design intent: side view on a true scale (28 px per m) of a light 10 m plank on a 1.0 m pivot, distance ticks every metre. The 40 kg child is fixed at 2.0 m; the learner slides the 20 kg child (0.5-5.0 m). Two "turning effect" bars under the seesaw (weight x distance, N·m) show the comparison.
- Physics choice: a weightless plank has no in-between tilt. With unequal torques it tips fully until one end touches the ground (11.5 degrees); it rests level only at 4.0 m. So the stage shows level or fully tipped, not a gradual lean (claim c3). The bars carry the "how close" information.
- Before the prediction the 20 kg child waits on the ground and the plank is level, so the tilt cannot give the answer away; the 20 kg bar and readouts are hidden.
- Earned reveal: milestones 'tried-other' and 'balanced' (4.0 m). The slider starts at 3.0 m, so QA's two presses go 3.5 then 4.0. The reveal quotes the other distance the learner tried and which side went down.
- After screenshots: read cleanly on phone; left as built.

## Revision v2 (batch 02, 2026-10-14)

Locked stage drew a level plank with the 20 kg child at the ground; it now tips the 40 kg side down (only that child is aboard), so no balance is shown before the guess.
Edited claims are unverified for the fact-checker. QA and walkthrough run after this edit.


## 2026-10-14 wave D revision (demo-builder), from the r5 learner review

- Version: v3.
- What changed: Locked: the 20 kg child waits on the ground ('not on yet') and the slider reads 'not on yet'. Reveal quotes the last unbalanced spot rested on 300 ms, defaulting to 3.0 m (the start position, on the tipped plank when the stage unlocks). Bar caption 'turning effect = kg × 9.81 × m from the middle'.
- Claims reopened (status unverified): new c5, c6.
- Not run here (shared machine, OOM risk): build, typecheck, QA, walkthrough. Syntax parse and `npm run check` pass. Needs a local QA pass before evaluators see it.

## Pre-flight v4

Revision for r6 (adult-beginner): the locked stage printed "turning effect = kg × 9.81 × m from the middle" and the 785 N·m bar, so 4.0 m could be computed before the commit; the reveal's "at 3.0 m … 589 against 785" quoted a state the reviewer never saw. Now the formula line, both bars and the 40 kg readout appear only after the commit. Every unbalanced slider spot is recorded at once (the 300 ms rest is gone) and stays on stage as a dashed outline bar with "dashed: last tipped at 3.5 m, 687 N·m"; the reveal quotes that record. Stage text raised from 7–8 to 9.5–10 px. c5 reworded.

1. **Title and hook.** "Can the lighter child balance?" / "A 40 kg child on one side, a 20 kg child on the other. Can the lighter one ever win?" No distance named.
2. **Options.** "4.0 m from the middle", "2.0 m from the middle", "1.0 m from the middle": all numbered, one decimal each.
3. **Locked stage.** Plank tipped to the 40 kg side, tick labels 2 m / 4 m on both sides (symmetric, nothing marked), the 20 kg child on the ground with "not on yet", the top line "Light plank, pivot in the middle. Kids in kg.", readouts all "?". No formula, no bars, no 785.
4. **Reveal values.** "level only at 4.0 m … 785 N·m each way": milestone "balanced" (the slider reached 4.0 m); the equal bars are on stage. "At 3.5 m … 687 N·m against 785 N·m … the 40 kg side went down": `other`, recorded on the slider change that fires "tried-other"; shown as the dashed bar and its label (or, if the learner stopped there, the live bars).
5. **QA path.** Slider two presses: 3.0 → 3.5 m ("tried-other", plank tips, 687 N·m) → 4.0 m ("balanced", plank level). Both milestones; at the reveal the dashed 3.5 m bar and its label sit under the two equal bars.
6. **Reset.** No Reset control. Reveal from that run: "The plank sat level only at 4.0 m: 20 kg at 4.0 m turns the plank as hard as 40 kg at 2.0 m, 785 N·m each way. At 3.5 m the bars were unequal (687 N·m against 785 N·m) and the 40 kg side went down: the dashed bar still shows it. What turns a seesaw is weight times distance from the pivot (torque), not weight alone. Half the weight at twice the distance gives the same turning effect, so the lighter child balances by sitting further out."
