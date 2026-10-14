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
