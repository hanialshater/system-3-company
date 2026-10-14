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
