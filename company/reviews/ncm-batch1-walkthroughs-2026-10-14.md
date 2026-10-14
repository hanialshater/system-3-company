# NCM batch 1 walkthroughs, 2026-10-14 (QA tester)

Build: NEXT_DIST_DIR=.next-wt2 (needed `npm ci` first, node_modules was absent), served by tools/serve.sh on 3601 and stopped afterwards.
serve.sh warned 575 lesson pages vs 578 in the tree; all 10 slugs below have their page in the build (the gap is other lessons, not checked further).
Command per lesson: `WALKTHROUGH_URL=http://localhost:3601 npm run walkthrough -- <slug>`. Every run wrote transcript.md and sheet.png. I looked at each sheet.png.
Artifacts are in artifacts/walkthroughs/<slug>/ (transcript.md, sheet.png, per-step PNGs; not committed).

| slug | frames | verdict from sheet |
|---|---|---|
| mild-preferences-sharp-divides | 9 | no broken state |
| penalty-kick-mix | 4 | no broken state; reveal frame stage scrolled, top row of table clipped |
| bid-what-its-worth | 7 | no broken state |
| below-critical-mass | 7 | no broken state; reveal frame stage top clipped (chart cut off) |
| agenda-picks-the-winner | 5 | no broken state; reveal frame stage top clipped |
| web-bow-tie-reach | 14 | no broken state |
| one-good-link-beats-many | 5 | no broken state; reveal frame graph top clipped (nodes A, P cut) |
| two-said-blue | 9 | no broken state |
| few-shortcuts-shrink-the-world | 5 | no broken state; reveal frame ring top clipped |
| news-comes-from-acquaintances | 6 | no broken state |

## What I saw
- No blank stage, no clipped controls, and no answer visible on the predict frame in any lesson. Controls were disabled before predict where expected.
- Reveal frames for penalty-kick-mix, below-critical-mass, agenda-picks-the-winner, one-good-link-beats-many, few-shortcuts-shrink-the-world show the stage scrolled so its top is cut off. Likely the page scrolling to the reveal text in a phone-size viewport; the stage remains usable. Cosmetic, unconfirmed whether a real learner sees the same; not tested by hand scrolling.
- The walkthrough always picks the first option, so every transcript is a "Not quite" reveal. These sheets do not show the correct-answer reveal.
- All footers read "0/N claims checked": expected for in-review lessons.
- This is a scripted run, not evidence of learning.

## Housekeeping
No lessons or tests edited. tsconfig.json not changed and no AGENTS.md created by the build (git status clean apart from this note).

# Batch 2 (QA tester, 2026-10-14)

Build: NEXT_DIST_DIR=.next-wt3 (node_modules present), served by tools/serve.sh on 3701, then stopped. All 6 lesson pages returned HTTP 200 (serve.sh raised no stale-build warning). Command per lesson: `WALKTHROUGH_URL=http://localhost:3701 npm run walkthrough -- <slug>`; every run exited 0 and wrote transcript.md and sheet.png in artifacts/walkthroughs/<slug>/ (not committed). I looked at each sheet.png.

| slug | frames | correct `answer:` index (Demo.tsx) | walkthrough picks option 0, so reveal is | verdict from sheet |
|---|---|---|---|---|
| cluster-stops-the-cascade | 18 | 1 ("8") | "Not quite" | no broken state; reveal stage top clipped |
| enemy-of-my-enemy | 14 | 0 ("At most 2") | "Your prediction held" (first correct-answer reveal seen) | no broken state; reveal stage top clipped |
| prices-sort-the-buyers | 5 | 1 ("$3") | "Not quite" | no broken state; reveal stage top clipped |
| same-songs-different-hits | 5 | 2 ("7th of 8") | "Not quite" | predict frame: the "On"/"Off" Copy-others buttons are cut off at the bottom of the stage (clipped control); reveal stage top slightly clipped |
| contact-order-matters | 7 | 1 ("1") | "Not quite" | no broken state |
| new-road-slower-trip | 5 | 2 ("80 min") | "Not quite" | predict frame: bottom row of stage buttons (Before/After/Switch 1,000/Run) is cut at the stage's bottom edge; otherwise fine |

## What I saw
- No blank stage and no answer visible on any predict frame. Locked-in button reads "Lock it in" then "Try it first" until the explore is done, then "Show me why" in every lesson.
- Clipped controls (cosmetic to possibly real): same-songs-different-hits 01-predict (Copy others On/Off) and new-road-slower-trip 01-predict (control row). Stage seems shorter than its content before the first interaction; after step 1 the stage grows and the controls are whole. Not tested by hand at other viewport sizes.
- Reveal frames in cluster, enemy, prices and same-songs show the stage scrolled so its top is cut (same pattern as batch 1).
- Answer indices: only enemy-of-my-enemy has the correct answer at index 0, which is what the walkthrough clicks. That is why it is the only "held" reveal; the others cannot show a correct-answer reveal in this tool.
- contact-order-matters: the predict frame opens with E->A highlighted while A->E is listed first (the predict question gives the order D-E, C-D, B-C, A-B, so likely intended). Not a fault, just noted.
- All footers read "0/N claims checked" (N = 6 to 10): expected for in-review lessons.
- Scripted run only: not evidence of learning.

## Housekeeping
No lessons or tests edited, nothing committed. tsconfig.json and AGENTS.md unchanged by the build. Pre-existing modified file company/rnd/evolution/knots.jsonl is not mine.

# Batch 3 (revisions) (QA tester, 2026-10-14)

Build: NEXT_DIST_DIR=.next-wt4, served by tools/serve.sh on 3801 (all 16 /d/<slug> pages HTTP 200), then stopped. `WALKTHROUGH_URL=http://localhost:3801 npm run walkthrough -- <slug>` exited 0 for all 16; I looked at every sheet.png (artifacts/walkthroughs/<slug>/, not committed). Walkthrough clicks option 0, so most reveals are "Not quite"; "Your prediction held" was seen for web-bow-tie-reach, two-said-blue, news-comes-from-acquaintances, enemy-of-my-enemy, contact-order-matters.

## Findings from the sheets
- No blank stage and no answer visible on any predict frame in the 16. "Show me why" appears only after the explore in all.
- cluster-stops-the-cascade (REAL, repeats in 13 frames): the "Start 8,9 / Start 0,1" button row is cut off at the stage's bottom edge in every frame from step-1 to step-13. Controls are whole only after the first start button is used (steps 15-17). The learner cannot see them until the stage grows.
- two-said-blue 01-predict: the stage is cut off mid-controls (the "Run 1 / Run 100 / Run 10,000" row is partly visible, "Pool the clues" hidden). Stage grows after step 1.
- bid-what-its-worth 01-predict: the chart is tiny, with overlapping labels ("Pick a rival bid" text collides with "$50"). Cosmetic, before first interaction only.
- Reveal frames in penalty-kick-mix, bid-what-its-worth, web-bow-tie-reach, one-good-link-beats-many, few-shortcuts, enemy-of-my-enemy, prices, same-songs, contact-order, new-road-slower-trip, news-comes-from-acquaintances: stage scrolled so its top is cut (same pattern as batches 1 and 2; the walkthrough's scroll-to-reveal).
- Fixed since batch 2: same-songs-different-hits and new-road-slower-trip predict frames now show their control rows whole.
- the-giant-appears 01-predict: stage already shows the 1.0 friends / 36 of 200 (18%) graph, which the question text states; not an answer leak. The explore starts from 0.5, so the first click changes the picture.
- Footers read "n/m claims checked" (e.g. 7/9, 4/7, 10/11, 6/6): not mine to judge.

## Contract QA (QA_ONLY=16 slugs, QA_PORT 3802, own QA_OUT)
40 contract tests passed (16 lessons x phone and desktop, no retries, minus the feed specs). 2 feed.spec failures ("subject chips filter the feed", phone and desktop) at the assertion that every slug shown is in the allowed set. I believe these come from QA_ONLY narrowing the allowed set while the feed lists all lessons, not from a lesson fault, but I did not confirm this on a full run. Recorded with `company qa-record`: all 16 pass, files company/reviews/<slug>/2026-10-14-qa.md. Note that qa-record also appended the QA record path to meta.json evidence.qa for below-critical-mass and few-shortcuts-shrink-the-world (its normal behaviour).
A pass means the contract held in a browser; it is not evidence of learning.

## Housekeeping
No lessons or tests edited, nothing committed. tsconfig.json and AGENTS.md unchanged by the build. Not mine: company/ops/inbox/session-2.md and company/reviews/schelling-on-new-york/ were already modified or untracked.

## Final (PR #3 head)
Tested head c9e4df0d (branch ccr-rnd-ncm), build `NEXT_DIST_DIR=.next-final next build` (Turbopack, succeeded), served on 3951 with tools/serve.sh; all 17 /d/<slug> pages returned 200. Server stopped. tsconfig.json and AGENTS.md unchanged (nothing to revert). No lessons or tests edited; nothing committed.

### Contract QA (QA_ONLY=17 slugs, QA_PORT 3951, QA_OUT test-results-final, 2 workers, no retries)
Result: 7 of 17 lessons FAIL, all on one assertion, "tap targets at least 24px" (contract.spec.ts line 118, measured after the reveal): below-critical-mass (phone, desktop), bid-what-its-worth (phone, desktop), penalty-kick-mix (phone, desktop), contact-order-matters (phone, desktop), two-said-blue (phone, desktop), mild-preferences-sharp-divides (phone only), prices-sort-the-buyers (desktop only). 10 pass both viewports: agenda-picks-the-winner, news-comes-from-acquaintances, enemy-of-my-enemy, cluster-stops-the-cascade, web-bow-tie-reach, one-good-link-beats-many, new-road-slower-trip, few-shortcuts-shrink-the-world, same-songs-different-hits, the-giant-appears.
Rerun of the 7 at 1 worker: 12 of 14 fail again (mild-preferences desktop passed, prices phone passed in that rerun; first run the reverse set). So the pattern is stable, the exact set varies a little with layout. Not flake-to-green: the first run is the one recorded.
My own measurement after the reveal (artifact script, not committed): controls under 24px high. below-critical-mass: Start 18/19/21/25%, Start slider, Step, To the end are 14-15px high. two-said-blue: 60/80/2-in-3 right, Run 1/100/10,000, Show the crowd are 20-21px high. contact-order-matters: Day slider 15-21px; at desktop Day 4, Order A to E, Order E to A, Overlap, "Make A/E the first case" 21px. bid-what-its-worth (desktop): Rival buttons 20px, Your bid slider 16px. penalty-kick-mix (desktop): Left-shot score slider 20px. prices-sort-the-buyers (desktop): Restart, Raise, Run, Compare 22px. Cause: after reveal the stage is scaled down (see reveal frames), shrinking controls below 24px. Same scaled-stage pattern as noted above; the contract counts it. Before this run these 7 passed (per the earlier 16-lesson pass in this file); the changed condition is the current head, not verified which commit.
Feed.spec "subject chips filter the feed" failed under QA_ONLY (both viewports) as predicted; I reran feed.spec without QA_ONLY on the same server: 10/10 pass. So that failure is a harness artifact of QA_ONLY, confirmed.

### qa-record
Run with QA_OUT=test-results-final. Records written for all 17 (company/reviews/<slug>/2026-10-14-qa.md): 10 pass, 7 FAIL as above (failures are recorded as failures, not filed into evidence.qa). agenda-picks-the-winner now has a passing qa-tester record and evidence.qa lists it (src/demos/math/agenda-picks-the-winner/meta.json, the only meta.json changed). The other 9 passing lessons already listed their record path (file rewritten for the current run). The 7 failing lessons have a fail record on disk but no passing record for this version.

### Walkthroughs
Regenerated for all 17 with WALKTHROUGH_URL=http://localhost:3951; all 17 sheet.png looked at (artifacts/walkthroughs/<slug>/sheet.png).
- No answer visible before predict in any sheet. "Show me why" appears only after exploring everywhere. No blank stage after the first interaction.
- cluster-stops-the-cascade (REAL, unchanged): "Start 8,9 / Start 0,1" row is cut off at the stage's bottom edge in steps 1-13; whole only from step 15.
- two-said-blue 01-predict: stage cut mid-controls (Run row partly visible, Pool the clues and later controls hidden/clipped); fine after step 1.
- below-critical-mass 01-predict: stage collapsed to a thin strip with clipped caption ("The chart appears after..."); fine after step 1. Same collapsed-stage look in bid-what-its-worth 01-predict (tiny chart, overlapping "Pick a rival bid" and "$50" labels) and penalty-kick-mix 01-predict (small, controls greyed). Cosmetic, pre-prediction only.
- Reveal frames show a scaled-down stage with top-cut in several lessons (the cause of the tap-target failures above); content below reads fine.
- agenda-picks-the-winner: clean in all 5 frames (footer 2/5 claims checked, not mine to judge).
- Others (mild-preferences, prices, news-comes-from-acquaintances, enemy-of-my-enemy, web-bow-tie, one-good-link, new-road, few-shortcuts, same-songs, the-giant-appears, contact-order): no broken state seen.

### Next
Owner: builders (via evaluation-steward) to decide whether to keep the scaled reveal stage or enlarge controls in the 7 failing lessons; I did not fix. A contract proposal for the steward: the tap-target check measures post-reveal scaled controls, so it fails lessons whose explore state is fine; decide whether the check should run in the explore phase.
A pass is not evidence of learning.

Note: HEAD moved to af2cca5c during this run; everything above was tested at c9e4df0d (built tree at start). Diff c9e4df0d..HEAD should be checked by the caller.
