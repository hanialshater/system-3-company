# Build note: below-critical-mass

builder: demo-builder · 2026-10-14 · session 2 (branch ccr-rnd-ncm), NCM batch 1 · format: single card, slider-drives-live-chart + step-run-button, no spec

- Intent: one chart of next share against share now (curve, dashed diagonal) with the run drawn as a cobweb. Rule: share' = 1 - 0.16 / share (0 if share <= 0.16). Curve and dot are hidden while locked, so the three crossings are not visible before predicting.
- Controls in DOM order: Start 18%, Start 25% (each runs to the end at once), Start slider (0-100%, returns to round 0), Step, To the end. The QA path presses chips first, so both milestones (a run below 20% that dies, a run above 20% that climbs) are reached within the first two presses.
- Reveal quotes the learner's own last run on each side of 20% (start, rounds, end), and only runs that reached their end. If the learner used the slider (e.g. 27%), the reveal quotes that start.
- Numbers re-run in node with the lesson's exact rule: roots 0.2 and 0.8; 18%: 0.111, 0 (2 rounds); 25%: 36, 56, 71, 78, 79, 80 (6 rounds, stop when a round moves < 0.5 point); every whole-percent start 1..100 classifies correctly (below 20 die, above 20 reach 80%, 20 stays). Slopes 4 and 0.25.
- Deviations from brief: brief said "about 7 rounds"; with the stop rule of half a point the run ends at round 6 (79.8%); claim c3 states that rule. Slider at 20% holds at 20% ("Holds at 20%"), which the brief did not list.
- Section unconfirmed: references carry ch. 17, section "17.2" (brief: 17.2-17.4, unconfirmed; fact-checker or a human must check against the free PDF). Claim c4 carries the same note.
- meta owner.categoryManager is "cm-economics" because `company check` rejects "cm-economics-markets".
- Layout: during predict the stage is clipped at the bottom of the card on a phone (chart small, lower control rows cut off); at explore and reveal it fits (reveal scrolls the top of the chart off). This is the shared card layout, not changed here; a designer may want fewer rows.
- Typecheck clean. Full playwright run for the slug: contract passed (phone, desktop); the unrelated feed spec "subject chips filter the feed" failed on both viewports (not investigated; not this lesson's code).
- Not verified by me: all six claims are unverified.

## Revision v2 (2026-10-14, session 2, demo-builder)

Inputs: learner review no-network-effects, fact-check pass NCM-1.
- Notation: the question now says in plain words that people differ, value rises with the share already using it, and everyone who values it above $0.16 joins each round. No x, no formula (new claim c9, unverified).
- Giveaway: hook and title no longer state the contrast ("Two launches, same product, same price. Where do they end up?"; title "Does a good product always find users?"). Four options, the correct one second, each a believable story.
- Tipping point found, not told: the stage has four start tiles (18, 19, 21, 25) plus the slider; the reveal unlocks only after the learner has run 18 and 25 and also 19 (dies) and 21 (climbs). Hint: "squeeze the gap". Reveal quotes the finished runs closest to 20% on each side (19 died in 2 rounds, 21 climbed to 80% in 8; node re-run: 18>11>0, 19>16>0, 20 holds, 21>24>33>51>69>77>79>80>80 = 8 rounds, 25 6 rounds).
- Doubled "Not quite" removed (kit verdict only). Reveal rewritten (about 85 words) and states the mechanism: few users, worth less than price to most, fewer join.
- c7 reworded as the fact-checker suggested; c8 reworded (recall why); both unverified, with derivation sources. c9 added, unverified. Recall question "usually" changed to "can". c1-c6 untouched (still verified). References untouched.
- Phone layout: removed the Round and Share readouts, merged the presets into one row of four, locked chart shows "The chart appears after you answer". Predict screen no longer clips; the reveal still scrolls the chart top off (shared card layout, not changed).
- QA: contract passed on phone and desktop (port 3641, own dist .next-ncm2, QA_OUT in scratchpad), 0 retries. Walkthrough (--choose 2) viewed on phone.

## Revision v3 (2026-10-14, session 2, demo-builder)

Inputs: learner review r2 (company/reviews/below-critical-mass/2026-10-14-learner-no-network-effects-r2.md).
- Chart labelled (shown, not told): dashed diagonal reads "same share next round"; ring at the 20% crossing with "20%: round changes nothing"; the sliver between curve and diagonal left of 20% is shaded red with "shrinks", the sliver from 20% to 80% shaded green ("shaded green: grows"). Visible only after answering (locked stage unchanged).
- Reveal points at those marks (dashed line, ringed crossing, shaded "shrinks") instead of "the line", and adds one plain line on why 80% not 100%: the people who want it least would not pay $0.16 even when nearly everyone uses it. New claim c10 (node: at s = 1 only x < 0.84 join; at 0.8 the cut is 0.8).
- Options balanced to similar length; the correct one (second, index unchanged) is no longer the only one naming both launches or the longest. Distractors: holds at 18%, both grow (18% slower), both fade (25% slower).
- Claims: new c10 (80% not 100%) and c11 (diagonal and shaded regions), both unverified. c1-c9 untouched, still verified; references untouched. Version 3.
- Build used `next build --webpack` (turbopack OOM-killed by other builders). tsconfig.json change reverted.

## Revision (v4, 2026-10-14, fact-check NCM-3)

Reveal paragraph 2 bounded: "Between it and 80% the curve is above the line and the share grows. Above 80% it dips below again, so the share falls back to 80%." c11 reset to unverified for re-check. meta version 4.
