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
