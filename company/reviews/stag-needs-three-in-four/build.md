# Build note: stag-needs-three-in-four

builder: demo-builder (ncm-e00) · 2026-10-14 · brief: Course NCM #8

- Intent: belief slider drives a live chart: stag's expected payoff 4p (rising line) and hare's flat 3; region from 75% tinted; a dashed cursor with dots on both lines. The crossing is the stand-in for "enough trust".
- Starts at 100% (stag clearly better) so the learner lowers it. Milestones: "doubt" (below 75%) and "threshold" (exactly 75%, shown as "either (tie)"). Presets in DOM order: 50% sure, 75% sure, 100% sure (disabled at start), then the slider (step 5%).
- Lines and readouts hidden while locked so the crossing doesn't leak the answer.
- Equilibria (both stag, both hare) told in one claimed sentence (c2): context outside the doesNotKnow. Rousseau naming claimed as a source claim for the fact-checker.
- Not run here: build, tsc, QA.

## v2 (demo-builder, 2026-10-14): r6 learner revise (2026-10-14-learner-adult-beginner-r6.md)
- Top finding (title "The stag needs three in four" gave the answer): title now "Stag or hare: how sure must you be?". Options "More than 50%" · "At least 75%" · "Fully sure, 100%".
- Second finding (the two stable outcomes were told): two outcome boxes under the chart, "both hare: 3 each" and "both stag: 4 each". The model chip now says the partner is as sure of you as you are of them; the box for the current best reply is filled, and each box is ticked once its case (0% or 100%) has been set. The reveal points at the ticks. New claim c5; c2 and c4 reworded.
- Presets 0 / 50 / 75 / 100%; the stage opens at 60% so all four can be pressed. Each preset visited leaves a mark on the stag line with its value (0, 2, 3, 4), so the reveal's numbers stay on stage. Milestones hare-stable, half, threshold, stag-stable (minInteractions 4).
- Not done: the "worth = expected payoff" gloss (minor).

## Pre-flight v2
1. Title and hook: "Stag or hare: how sure must you be?" / "Both hunters prefer the stag. So why might both settle for a hare?" No percentage is named.
2. Options: "More than 50%" · "At least 75%" · "Fully sure, 100%". Each carries one percentage and a qualifier.
3. Locked stage: model chip, empty axes 0–4 and 0/25/50/75/100% (the 75% tick is plain text while locked, like the others), the two boxes unfilled and unticked, readouts "?". No lines, tint or dot.
4. Reveal values: "4 × your confidence", "a sure 3" (the lines); "At 50% ... only 2" (milestone half; the mark "2" on the stag line); "crossed at 75%" (milestone threshold; mark "3" at 75% and the bold 75% tick); "At 0% ... hare ... 3 each" (milestone hare-stable; ticked box "✓ both hare: 3 each"); "At 100% ... 4 each" (milestone stag-stable; ticked box "✓ both stag: 4 each").
5. QA path: 0% (hare-stable), 50% (half), 75% (threshold), 100% (stag-stable), slider two left presses (95%, 90%). Four presses reach all four milestones, including the question's case (75%); the marks and ticks stay.
6. Reset: no Reset control; marks and ticks only accumulate. Reveal after that path: "Stag is worth 4 × your confidence; hare is a sure 3. At 50% the stag was worth only 2, and the lines crossed at 75%: below that, hare is the better bet. / At 0% your best reply was hare, and a partner just as sure of you replies hare too: both hare, 3 each. At 100% it was both stag, 4 each. Both boxes are ticked: each outcome is the best reply to itself. Both hunters prefer the stag, yet doubt alone can lock them into hare. / Invented payoffs in a simplified model. The game is called the stag hunt, after an example of Rousseau's."
