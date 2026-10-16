# Build note: same-picture-two-histories

Builder: demo-builder (demo-builder-ncm-gap4), 2026-10-16. Board W-1522 (NCM 4.2 gap). Brief: `company/domains/briefs/probability.statistics.md` #72 (J9), with the cm-probability-statistics re-check ruling applied (question and options verbatim; one switch per step). Numbers re-run first: `node company/courses/ncm/checks/rejudged-four.mjs` (J9 line reproduced). Status draft; every claim unverified (the builder never marks its own claims verified).

Kept from evaluators until they report.

Built as briefed: one network stage, 8 people (blue circles 0-3, orange squares 4-7; shape plus fill), the final picture drawn locked. Controls in DOM order: Replay Town 1, Replay Town 2, Show final, Step. A replay jumps to its start and steps on its own every 700 ms to its last step (3 for Town 1, 2 for Town 2); Step advances one step by hand and pauses the run. Trail: Town 1 draws swapped-out links dashed (key "link swapped"), new links green; Town 2 rings the people who changed (key "colour changed"). A link joining different colours is drawn red. The caption reads "Town k (picking|copying) · step s of n", plus "= final" when the frame equals the other town's end. A Seen row ("Town 1: 3 links swapped · Town 2: 2 colours changed") is written on each replay press and never cleared.

Builder choices and departures:
- Title "Why are these friends alike?", hook "Every friendship here joins two people of the same colour. How did it get that way?" (not in the brief; neither names an option).
- "Single card with Step": the brief asks each replay to end on its final frame within one press. It does (autoplay, no further input), but takes 1.4 s (Town 1) / 0.7 s (Town 2) so a learner can see it. The milestone and Seen-row entry are recorded on the press, because the history is fixed; QA's 450 ms wait therefore does not depend on the animation. If evaluators think the count should only appear when the run ends, that is a one-line change.
- Layout: two squares; crossing links 0-4 and 3-6 run between facing corners, 1-5 bows over the top so no line passes through a person.
- Added a convention claim (c4) for the town rules and the "(picking)/(copying)" caption words.

## Stage word budget

Counted from the rendered stage by a builder probe at 390×844 (text nodes inside `data-testid="stage"`, tokens with a letter, aria-hidden excluded; no unit discount needed, there are no units). Brief budget about 12 (cm ruling) plus "(picking)/(copying)", "Step" and the Seen row that I added.

| Frame | words |
|---|---|
| locked / explore start | 9 |
| after Replay Town 1 | 14 |
| after Replay Town 2 (busiest) | 17 |
| after Show final, at the reveal | 15 |

17 at the busiest frame, under 25. No SVG text (labels are HTML, 0.8-0.9 rem).

## Pre-flight v1

1. **Title and hook.** "Why are these friends alike?" / "Every friendship here joins two people of the same colour. How did it get that way?" Neither says picking, copying or either.
2. **Options.** "Yes: they picked friends of their own colour" / "No: they became like their friends" / "Either: a picking town and a copying town can both end here" (the ruling's wording; no numbers in any).
3. **Locked stage.** The final picture only (two fully linked groups), caption "Final picture", controls disabled. No history, no trail, no Seen row.
4. **Reveal values.** "3 friendships": milestone town1, Seen row. "2 people": milestone town2, Seen row. "identical picture": the stage after Show final (and "= final" on each replay's last frame).
5. **QA path.** DOM order: Replay Town 1 (milestone 1), Replay Town 2 (milestone 2), Show final (final picture); Step is disabled after Show final. Three presses reach both milestones; the Seen row is on screen at the reveal.
6. **Reset.** No Reset control. Show final never clears the Seen row. Reveal on the QA path (probe, wrong option): "Not quite: it was “Either: a picking town and a copying town can both end here”. Town 1 kept everyone's colour and swapped 3 friendships. Town 2 kept every friendship and 2 people changed colour. Both ended in the identical picture. So a single snapshot cannot separate choosing similar friends from becoming like your friends. Telling them apart needs data over time: who changed first, the link or the person."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3731 same-picture-two-histories price-tag-or-auction --jobs 2 --width 390 --height 844 --out artifacts/reveal-fit/ncmgap4-a.json --shots` (tool clean true, head af8e4021 plus the uncommitted lesson): **fit, crop 0, hiddenBelow 0, phoneFit true**, revealWords 70. The picture and the Seen row are on screen with the reveal (phone-3-reveal viewed).

## Local contract QA (the builder's pass, not the qa-tester's record)

Own production build (`NEXT_DIST_DIR=.next-ncmgap4 npx next build`, Turbopack, exit 0), served with `tools/serve.sh start 3731 .next-ncmgap4`. `QA_BASE_URL=http://localhost:3731 QA_ONLY=same-picture-two-histories,price-tag-or-auction QA_OUT=artifacts/qa-ncmgap4-a npx playwright test tests/qa/contract.spec.ts --workers=2`, unmodified spec: **4 passed** (phone and desktop). Phone predict, explore and reveal screenshots viewed, plus the probe's per-press frames (Town 1 step 0 with its 3 red crossing links; Town 2 step 0 with persons 3 and 7 in the wrong colour). `npx tsc --noEmit` exit 0; `npm run check` passed. The qa-tester's run is still owed.

Re-run on the final build with all four lessons: `QA_OUT=artifacts/qa-ncmgap4-c`, 8 passed; reveal-fit `artifacts/reveal-fit/ncmgap4-c.json`: fit, crop 0, phoneFit true.
