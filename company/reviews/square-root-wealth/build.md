# Build note: square-root-wealth

builder: demo-builder (sonnet builder, EXP-003 model comparison) · 2026-10-13

- Intent: one square-root curve, a dashed line at the coin's felt value (5), and a marker for the sure amount.
- Milestone: sure amount $25 (preset button or slider, step 5). Presets $50, $25, $75 mirror the options so each is visited.
- Hidden while locked: the coin line and felt-value readouts.
- Brief said drag a marker; the slider is that drag, the buttons are the QA-safe route.

## Revision v2

Wave C, builder 11, 2026-10-14, from the latest learner review and fact-check. Removed the "Sure $25" button that named the answer; added "Slide to the coin's line"; the coin's working (half of root 0 plus half of root 100) is on stage; unseen 7.07 sentence cut from reveal; axis label moved off the dot label; reveal shortened. c1 edited, unverified.
QA contract: pass (phone and desktop). Claims edited are unverified and need a fact-check pass.

## Revision v3 (wave C builder 13, 2026-10-14)

- Board W-168: the 'Slide to the coin's line' button landed on the answer. Fix: removed; chips are Sure $10 / $50 / $75; the gate is one sure amount below and one above the coin's line, and the learner slides to the match themself.
- Edited claims were reset to unverified and match the stage text; version bumped. Local QA run; walkthrough sheet looked at.

## Revision v4 (wave E r6, 2026-10-14)

r6 (adult beginner, revise): the gate opened after one point below and one above the line, so the learner never found $25, yet the reveal quoted it. The reveal did not point at the bend. "half of 10" did not match the stage's √100. Fixes:
- New milestone met (the dot on the coin's line, $25). minInteractions 3: below, met, above.
- The slider is now first in DOM order and starts at $15 (step 5), so two steps up reach $25. The chips $10 / $50 / $75 follow as the under / over probes. $15 is not an option.
- Once met, the stage keeps a "✓ $25" tick on the curve where it meets the coin line, and draws two green rises: "+5.00" for $0 to $25 and "+2.93" for $50 to $100. The reveal points at them ("Look at the bend").
- Reveal: "half of √0 = 0 plus half of √100 = 10, which is 5"; the $25 sentence prints only once met is recorded.
- New claim c6. Version 3 -> 4 (r6 noted the earlier bump was missed). Not run: build, QA, walkthrough, tsc.

## Pre-flight v4

1. Title and hook: "A sure amount versus a coin" / "A coin pays $0 or $100. What sure amount would feel just as good?" No amount named.
2. Options: "$50", "$25", "$75". All whole dollars.
3. Locked stage: the curve, axes, model chip, the slider at $15, "?" felt-value readouts. No coin line, no tick, no gain marks. Nothing at $25.
4. Reveal values: 0, 10 and 5 (the coin's working): (a) constants of the model, also printed on stage once unlocked; "$25 (the tick)": (b) milestone met, recorded as a flag, and the tick stays; $50 average: model constant, stated on stage when met; +5.00 and +2.93: (b) drawn when met, still on stage.
5. QA path: slider ArrowRight twice ($20: below; $25: met), Sure $10 (below), Sure $50 (above), Sure $75. All three milestones are reached, the question's own case included. The tick and both rises stay visible at $75.
6. Reset: there is no Reset. Moving the slider or the chips does not clear the tick. Reveal on the QA path: "The coin's felt value is half of √0 = 0 plus half of √100 = 10, which is 5. You found the curve reaching 5 at $25 (the tick on the curve), so a sure $25 feels as good as the coin, though the coin pays $50 on average. / Look at the bend: from $0 to $25 the felt value rises 5.00, but from $50 to $100 only 2.93. When each extra dollar matters less and less, a sure amount well below the average can equal a gamble. / A model: square-root felt value is one textbook choice, not a measure of anyone. No advice."
