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

## Pre-flight v3 (demo-builder, 2026-10-14, wave G, r7 adult-beginner)

Fixes: (top) the preset row (0 / 50 / 75 / 100% sure) is no longer rendered while locked, so no "75%" label sits on the locked stage. The options are now four thresholds worded the same way, so 75 is not the only non-anchor number. Not changed: the coordination chip wording (r7 finding 3, minor) and "at least" vs the tie at 75% (finding 4, defensible: stag is not worse at 75%).
1. Title and hook: "Stag or hare: how sure must you be?" / "Both hunters prefer the stag. So why might both settle for a hare?" No percentage named.
2. Options: "At least 50%" · "At least 75%" · "At least 90%" · "Fully sure: 100%". Each one whole percentage; 50 and 100 are anchors, 75 and 90 are not.
3. Locked stage: model chip, empty axes 0–4 and evenly spaced ticks 0/25/50/75/100% (75 drawn like the others), two unticked boxes, readouts "?", the slider (disabled, label "How sure you are", value 60%). No preset row, line, tint or dot.
4. Reveal values: unchanged from v2: 2 at 50% (milestone half, mark "2"); crossing at 75% (milestone threshold, mark "3" and bold tick); both hare 3 each at 0% (milestone hare-stable, ticked box); both stag 4 each at 100% (milestone stag-stable, ticked box).
5. QA path: after the commit the preset row appears in the same place in DOM order: 0%, 50%, 75%, 100%, then the slider (two presses). All four milestones; marks and ticks stay.
6. Reset: no Reset; marks and ticks only accumulate. Reveal text as in Pre-flight v2 (unchanged code).
- meta.json 2 -> 3; no claim text changed (options are not claims). Not run: build, QA, walkthrough, tsc.

## Pre-flight v4 (demo-builder, 2026-10-14, answering 2026-10-14-learner-adult-beginner-r8.md, W-313)

Changes: reveal 112 -> 80 words (tool count, verdict line included). Cut the grey told-context note "Invented payoffs in a simplified model. The game is called the stag hunt, after an example of Rousseau's." (the stage chip carries "invented payoffs"; c3 withdrawn; cm-economics may restore the name elsewhere if they want it). Second paragraph tightened: "At 0% hare was the best reply for you both: 3 each. At 100%, both stag, 4 each. Both boxes are ticked: each is the best reply to itself. Both prefer the stag, yet doubt alone can lock them into hare." First paragraph unchanged. Stage: chart labels 10/11 -> 12 viewBox units, so the card's fit can shrink the chart (to about 201/220 px) and labels stay at or above 10 px; outcome boxes widened to 140 for the bigger label. Presets read "0%"/"50%"/"75%"/"100%" and are not rendered at the reveal (the slider stays; the marks they left on the stag line stay). Readouts on one row ("Stag worth", "Hare worth", "Best reply"). Chip reworded to "Model: invented payoffs; your partner is as sure of you as you are of them". Column gap 6 -> 3 px.
1-3. Title, hook, options, locked stage: unchanged (the presets were already hidden while locked).
4. Reveal values: 2 at 50% (mark "2"), 75% (crossing, tinted region, bold axis tick), 3 each / 4 each (the two boxes), "Both boxes are ticked" (ticks). All on the stage at the reveal.
5. QA path: unchanged.
6. Reset: none.
7. Phone fit: `node tools/reveal-fit.mjs --url http://localhost:3530 stag-needs-three-in-four` (dev server, 2026-10-14): before crop 276 px, 112 words, 6 named labels off screen; after **crop 0 px, hiddenBelow 0, namedHidden 0 (50%, 75%, 100%, hare 3, stag, both hare 3 each, both stag 4 each, best reply all visible), phoneFit 1, 80 words**. Chart fitted 201/220 px, so about 18 px of slack before the label floor.
- meta.json 3 -> 4; c2, c4, c5 reopened; c3 withdrawn. Not run: build, QA, walkthrough. The label shrink the reviewer saw mid-explore (frame 04) is kit W-287, not touched here.
