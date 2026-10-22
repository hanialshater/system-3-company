# Build note: one-metre-more-rope

builder: demo-builder (Meta M4, order O-1) · 2026-10-22 · v1 · brief: company/domains/briefs/math.geometry.md, Wave J, brief 1 (check G1) · design: company/reviews/one-metre-more-rope/design.md

- Intent: one zoom window (viewBox 340 × 200) on the top of the circle, at one scale for every circle (5 px per cm; the 20 cm ruler is 100 px). Ground = the circle's true top arc; rope = the concentric circle of radius r + gap; a double arrow marks the gap and the readout says "gap 15.9 cm". The Earth's ground is drawn flat because at this scale its sag across the window is far under a pixel (honest, not a shortcut). Icon top left: whole circle, dashed box on the zoomed part, label "r = 11 cm" / "r = 35 cm" / "r = 6,378 km".
- Gap computed per circle in Demo.tsx (`gapOf(r) = (2πr + 1) ÷ 2π − r`), not hard-coded; all three give 15.9 cm.
- Controls in brief order: "Ball (r = 11 cm)", "Wheel (r = 35 cm)", "Earth (r = 6,378 km)", Reset. Initial: the ball with the rope tight (dashed, "gap 0.0 cm"). Shown chip active + disabled; Reset disabled when already tight on the ball.
- Trace: a tried chip keeps "✓ 15.9 cm" under its name, so Reset cannot erase the gaps the reveal quotes.
- Deviations from the brief, for cm-math:
  1. **Predict question** given a second-person scene (copy-style.md): "You tie a rope tight round a small ball, and another round the Earth. You add 1 m to each rope and lift it evenly all round. Round the Earth, compared with the ball, the gap is…" (36 words). Options unchanged.
  2. **Stage words**: the trace adds "15.9 cm" up to three times. By demo-standard Ruling 2 a unit symbol after a number counts 0, so the busiest frame is 17 words by the brief's spaced count without the trace and 20 with it (≤ 25). Brief's own fused count: 11.
  3. **Window size**: 340 × 200 viewBox, not 340 × 180, so the Earth's lifted rope (y 102) clears the icon (y ≤ 86). On a 390 px phone the stage renders at 0.847 scale (the feed's side rail narrows it to ~288 px), so SVG labels are 12 px in the viewBox → 10.2 px on screen (floor 10); readout 14 px → 11.9 px.
  4. **Cat clause** kept as claim c4, unverified: the brief says cut it if the fact-checker does not accept it as illustrative.
- Title and hook are mine (brief gives none): "How high does one more metre lift?" / "Add 1 m to a rope round a ball, and 1 m to one round the Earth. Which lifts higher?"
- Recall: running track + 2 m → about 32 cm (2 ÷ 2π = 0.318 m), in claim c2.

## Pre-flight v1

1. Title and hook: "How high does one more metre lift?" / "Add 1 m to a rope round a ball, and 1 m to one round the Earth. Which lifts higher?" Neither says same, smaller or bigger; "which lifts higher" invites both wrong answers.
2. Options: "Far smaller" / "The same" / "Far bigger": three bare comparisons, none numbered.
3. Locked stage: the ball (icon "r = 11 cm"), rope dashed and tight on it, ruler "20 cm", readout "gap 0.0 cm", "zoomed in", chips with no trace. Nothing compares the ball with the Earth, so nothing matches "The same".
4. Reveal values: "your {ball|wheel}" = milestone `small` (first small circle lifted, recorded in a ref at the press); "15.9 cm" = gapOf(r) for that circle, milestone `small`, and the Earth's equals it, milestone `earth` (both shown on their chips' traces); "2π", "1 ÷ 2π, about 0.159 m" = the formula behind the same readout (claims c1, c2), not a learner state.
5. QA path: Ball (milestone small), Wheel, Earth (milestone earth), Reset: both milestones by press 3. After Reset each chip still shows "✓ 15.9 cm", so the quoted state is on the stage when the reveal opens (seen in the 390×844 run).
6. Reset: after Ball, Wheel, Earth, Reset, the reveal read: "For your ball and for the Earth, the extra metre lifted the rope by the same 15.9 cm, enough for a cat to crawl under. | The rope's length is 2π times the radius, so each extra metre adds 1 ÷ 2π, about 0.159 m, to the radius, whatever the size. The Earth's huge radius never enters the sum: the metre is shared out the same way round any circle." Every sentence matches the traces (ball and Earth both ✓ 15.9 cm).
7. Phone fit: `node tools/reveal-fit.mjs --url http://localhost:3101 one-metre-more-rope` on a production build of this worktree (.next-LESSON-one-metre-more-rope): verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true; reveal 74 words by the tool's count (69 by the brief's, the tool includes the verdict line); parts picture 169 px, controls 99 px. Screenshot artifacts/reveal-fit/one-metre-more-rope.png (git-ignored): stage top, the chips with their traces and the whole reveal on one screen.

## Measurement v1 (demo-builder, 2026-10-22)

- Label sizes measured in the browser at 390×844 (getScreenCTM scale 0.847): "20 cm", "zoomed in", "r = 11 cm" 10.2 px; "gap … cm" 11.9 px. Targets: every control min-height 44 px.
- `npm run check`: no error or warning for this slug (the repo's existing errors are other lessons' version gates). `tsc --noEmit`: clean. `next build`: exit 0 (it rewrites tsconfig.json's include for the dist dir; reverted).
- Official QA (tests/qa/contract.spec.ts) not run by me: it is code's qa stage in this flow.

## Revise v2 (demo-builder, 2026-10-22): fact-check findings

- A1: cut "enough for a cat to crawl under" from the reveal (Demo.tsx) and removed claim c4 from meta.json (brief planned claim 4 allows the cut; the fact-checker cited Pongrácz 2024: mean cat height 19.61 cm lying, taller than the gap).
- B2: recall object changed from a running track to "a giant round water tank" (a circle), and its why now says "however big the tank", so c2 (circles, L = 2 m → about 32 cm) covers it unchanged.
- c1, c2, c3: text unchanged, set back to `unverified` (verified during this order), checkedBy/checkedOn/note removed.
- meta.version 1 → 2.

## Pre-flight v2

1. Title and hook unchanged: "How high does one more metre lift?" / "Add 1 m to a rope round a ball, and 1 m to one round the Earth. Which lifts higher?"; neither gives the answer.
2. Options unchanged: "Far smaller" / "The same" / "Far bigger".
3. Locked stage unchanged: rope tight on the ball, "gap 0.0 cm"; nothing matches "The same" before a press.
4. Reveal values: "your {ball|wheel}" = milestone `small`; "15.9 cm" = gapOf(r) for it (milestone `small`), equal to the Earth's (milestone `earth`), both on the chip traces; "2π", "1 ÷ 2π, about 0.159 m" = claims c1, c2.
5. QA path unchanged: Ball, Wheel, Earth, Reset; both milestones by press 3; traces survive Reset.
6. Reveal after Ball, Wheel, Earth, Reset now reads: "For your ball and for the Earth, the extra metre lifted the rope by the same 15.9 cm. | The rope's length is 2π times the radius, so each extra metre adds 1 ÷ 2π, about 0.159 m, to the radius, whatever the size. The Earth's huge radius never enters the sum: the metre is shared out the same way round any circle." Every sentence is c1/c2 or a trace; no unclaimed sentence.
7. Phone fit: the reveal got 7 words shorter (62 by the brief's count) and the stage is unchanged, so v1's fit verdict (stage-top crop 0, hiddenBelow 0) can only improve; code's qa stage re-runs reveal-fit.
8. Recall: "A rope hugs a giant round water tank all the way round. You add 2 m to it and lift it evenly. About how high is the gap?" → "About 32 cm" (2 ÷ 2π = 0.318 m, claim c2).
