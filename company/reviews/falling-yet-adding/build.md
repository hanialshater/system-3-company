# Build note: falling-yet-adding (demo-builder, 2026-10-13)

- Design: a top row of 10 hollow dots is today's 1,000; below, a 20 x 10 field fills with the running total from tomorrow on (each dot 100 cases, rounded); the latest day's dots are red. The daily number shrinks while the field keeps filling.
- Brief answer checked: 900 / 0.1 = 9,000 (node sum over 2,000 days 9,000; over 90 days 8,999). Options and reveal computed from `forever()` and `totalTo()`, the functions that draw the stage.
- Reveal gate: milestones "ten-days" (day 10 or later at 10%) and "long-tail" (day 90 at 10%). Control order: +10 days, To day 90, +1 day, Restart, then the fall slider (5-30%). Milestones count only at the question's 10%, and the reveal quotes the furthest day the learner reached at 10%.
- Capacity: 200 dots = 20,000 cases, enough for the 5% tail (19,000).
- Screenshots: fine on phone; QA ends on Restart so the explore shot shows day 0. No change.
- All claims unverified.
