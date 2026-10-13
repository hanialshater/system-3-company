# Spec: square-bow-stays-tied

owner: interaction-designer (Rafael) · 2026-10-13 · status: draft, for design review · brief: `company/domains/briefs/lifehacks.md` #4 · wireframe: `square-bow-stays-tied.svg`

**Format: Side-by-side comparison.** Two shoes, one shared walk control. The difference the learner must see is one hidden step (the loop-wrap direction) that changes how the bow sits and how fast it loosens. Two panels sharing one control is the only honest way to keep "same laces, same tension" true on the stage.

## Stage at 390×844 (~330 px at predict, ~480 px in explore)
1. Model line (muted): "Same laces, same pull. Loosening rates are illustrative." (8 words)
2. **Two shoe panels**, side by side, each ~170 px wide × 220 px, top-down view of the lacing area. Each shows:
   - the bow, drawn from Fieggen's diagrams: square version lies **across** the shoe, granny version lies **along** it (toe to heel);
   - a tightness meter under the bow (a bar plus "Tight 100%");
   - a step counter "Steps: 0";
   - a caption with what can be *seen*, not the knot name: "sits across" / "sits along". Knot names (square, granny) appear only in the reveal.
   - When tightness reaches 0, the bow is redrawn undone (loops collapsed, ends hanging) with the caption "Undone at step 30".
3. Under each panel, its own wrap toggle (see controls). Below both, the shared Walk button, full width.

## Controls, in DOM order (3)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control toggle | Bow A "Loop wrap: over" / "under" (`aria-pressed`, small wrap-direction icon) | re-ties Bow A the other way: flips square ↔ granny, rotates the bow 90°, resets its tightness to 100% and steps to 0 |
| 2 | Control toggle | Bow B "Loop wrap: under" / "over" | same, for Bow B |
| 3 | Control | "Walk 10 steps" | both shoes walk 10 steps. Illustrative loss per 10 steps: granny −35%, square −10% (the square bow does loosen; it never says "never") |

No reset: flipping a wrap is the re-tie. Initial: A square (across), B granny (along), both 100%, as in the question.

QA path: flip A (now granny, along) · flip B (now square, across) · Walk (A 65%, B 90%). Both milestones reached; the stage at the reveal shows the swapped pair, proving the *wrap*, not the shoe, decides. All 3 controls exist at first render, disabled while `locked`.

## States
- **Predict:** both bows tied, meters at 100%, captions "sits across" / "sits along", counters "Steps: ?". Toggles and Walk disabled.
- **Walk ×1:** the granny bow's loops swing (two short motion strokes) and its meter drops to 65%; the square bow's to 90%.
- **Walk ×3:** granny reaches 0 at step 30 and is drawn undone; square at 70%.
- **Flip a wrap:** that bow rotates 90° in ≤ 300 ms (instant under reduced motion), meter back to 100%. The learner can now make *their own* granny bow fail on the other shoe.
- **Reveal:** stage unchanged (whatever the learner last left). Reveal quotes counts: "Your granny bow came undone at step 30; the square one was still at 70%." (or the tightness values if none came undone).

Milestones (`minInteractions=2`): `walked` (Walk pressed once), `flipped-then-walked` (Walk pressed after any wrap flip).

## Shown, not told
The learner sees the tell (across vs along) before knowing any knot name, then flips a single step and watches the *same shoe* switch behaviour. The reveal names the knots they just made.

## Colour and access
Laces `--domain`; shoes `--line` outline on `--bg-2`. Meter fill `--good` above 50%, `--warn` 1–50%, `--bad` at 0, always with the % text and the "Undone" caption (colour is never the only cue). Toggle icons differ in shape (arrow over vs under the loop). Each toggle ≥ 44 px high and ~165 px wide; Walk 44 px high, full width.

## Illustrations
- **Hero 1:1**: predict phase only, 96×96 slot at the top right beside the model line; removed on unlock.
- **Comparison pair 4:3** (square vs granny): in the reveal under the text, two 160 px frames labelled "Square bow: across" / "Granny bow: along". Accuracy-critical: the fact-checker checks the pair against Fieggen before acceptance.
- Render only once accepted (a 404 fails QA).

## Claims this spec adds
Loss rates −35% / −10% per 10 steps are illustrative (brief claim 5); "undone at step 30" is a consequence of them, not a measurement. The model line says so.
