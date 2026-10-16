# Build note: laundry-sort-before-walk

Kept from evaluators until they report.

## Revision lhfix-r3 (dispatch 2026-10-16-r5-lifehacks.md B1, 2026-10-16, demo-builder)

- Branch lhfix-r3 from main 422f861. Tier 2: company/engineering/readiness/2026-10-16-lh-content-patch-r3.md, awaiting principal-engineer-ops; not merged. No claim marked verified by me.
- Applied, commit 926cb9c (r5 D4 E5, W-1300, W-1251): engine 2; title `Ten trips to the machine?`, hook `Ten items to the machine, one at a time. How far is that?`, question = the r11 plan W3 line (company/decisions/2026-10-15-lifehacks-r11-fix-plan.md line 120), options `16 m` / `80 m` / `160 m`, key index 2; values [4] → [8] (the plan's 8 m), initial 8 → 10 (the question's ten). Builder's calls (the batch names none of these): amounts one row `Trips` (A = p, B = 1); resultLabel, modeLabels and reveal sentence left to the engine defaults (`Travel`; `One-item trips` / `Grouped trip`); formula (c3) rewritten for 8 m: `Round trip distance=2×8m; total=16m×item count, or 16m for one batch.`
- Test re-pin under quality ruling R2 (a)-(c), same commit, comment cites the plan row: value(10,false) = 160, value(10,true) = 16, value(8,false) = 128, value(8,true) = 16 (was 64 and 8 at 4 m). No other pin in home.test.mjs moved. Added to the W3 every-step list and the r11 W3 inventory; the locked-picture tests take every engine-2 spec by filter. Reveal at the start: `One-item trips: trips 10; travel 160 m. Grouped trip: trips 1; travel 16 m.`
- Reset: c1 (text unchanged, stage changed), c3, c4; new: seen. Kept: c2, c5, recall (its own 3 m numbers).
- For cm-lifehacks: meta `misconception` (`Carrying things one at a time costs little extra when each trip is short.`) is not one of the new options (fix plan §3 rule); I did not write one. The neutral picture draws ten dashed there-and-back pairs and `8m one-way`; both are stated in the question ("ten items … there and back", "8 m away").
- QA: release build of this branch (NEXT_DIST_DIR=.next-lh3, port 4073, QA_ONLY = the 21 touched lessons, 2 workers): this lesson's contract passed on phone and desktop (42 of 42 contract tests; the only 2 failures were feed.spec "subject chips filter the feed", which compares against the QA_ONLY subset and passes 10/10 without it). Dist deleted.
- Phone screenshot, locked: the ten dashed there-and-back pairs (engine route picture, unchanged by me) pack into a dense hatch at 9-unit spacing. Readable as "many trips" but not countable; an engine picture row for cm-lifehacks if the walk flags it.

## Wave W3 (r11 fix plan), 2026-10-16, demo-builder: not moved

- The plan's line ("The machine is 8 m away. Ten items one at a time, there and back. How far do you walk?", 16 / 80 / 160 m) needs the route value changed from 4 m to 8 m and the start count from 8 to 10. The model fits (case 'trips': 2 × 8 × 10 = 160 m).
- Blocked by a test, not by the model: tests/lifehacks/home.test.mjs ("access, grouping and repeated routes have concrete counts") pins value('laundry-sort-before-walk', 8, false) = 64, which holds only at 4 m. Tests are outside demo-builder's scope, so the lesson is left on engine 1 and out of the W3 ratchet line.
- Needed from evaluation-steward: rule on re-pinning that line to the new spec (8 m: 2 × 8 × 8 = 128 at 8 items, or 160 at 10). After that, the build is the same as the other W3 lessons (show the one-item total in the Seen table; the count slider moves it).
- Also open (r11 finding 5, fact-checker): the recall card uses a 3 m route and a capacity of 3, a different model from the stage.
