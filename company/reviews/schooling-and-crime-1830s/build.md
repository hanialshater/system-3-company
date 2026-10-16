# Build note: schooling-and-crime-1830s

Builder: demo-builder (demo-builder-h24), 2026-10-16, batch `company/ops/dispatch-requests/2026-10-16-r2-history.md#B3`, board W-1204. Brief: `company/domains/briefs/history.md` #24 as amended by cm-history (a09a726: both cultural wording edits, "Ready to claim (cm-history, 2026-10-16)" present before the claim). Claimed with `node tools/claim.mjs take schooling-and-crime-1830s --agent=demo-builder-h24` ("schooling-and-crime-1830s claimed"). Status draft, v1; all 7 claims unverified.

Data: `history-data.mjs: guerry` (Guerry.csv, sha256 13f9ff6a… matches the pin). Demo.tsx carries `[Literacy, Crime_prop, Crime_pers]` for all 86 rows in file order, unchanged, and computes everything with the check script's formulas (100,000 / population per crime; stable sort by Literacy, lowest and highest 21; unweighted means; Pearson r). `node company/domains/briefs/checks/history-cycle2-check.mjs 24`: all checks pass (21 per quarter, literacy 18.6% vs 63.4%, property 11.3 vs 18.9, x1.7, persons 5.9 vs 5.9, r = 0.37). The reveal is the brief's text word for word, 87 words by script (no growth over the baseline).

Care kept (brief + cultural look): no department or region is named anywhere; quarters and dots are labelled by number only; no map, no time trend. Note for the fact-checker: literacy 25% sits on the lower quarter boundary, so which 25% departments fall in the lowest quarter is decided by file order, as in the script (disclosed in c2).

Departures from the brief:
1. **Gate is `lo`, `hi`, `pers`** (the brief gated `lo` and `hi`). The reveal quotes 5.9 for both quarters, so the persons bars are on the required path (demo-standard: the reveal quotes what you saw). `pers` is the third press in DOM order.
2. **The reveal shows the bars.** If the reveal opens while the scatter is on, the stage switches back to the bars view (the scatter is one press away; every control still changes the stage after the reveal). The bars are what the reveal quotes.
3. **No HTML readout.** The values sit on the bars and the scatter's mean lines, to keep stage text at 25 words or fewer (bars view: 25; scatter: 24). Bar meaning is a colour-keyed legend ("crimes against property", "crimes against persons") rather than per-bar labels, so the reveal's "Crimes against persons" is on screen when the preset row folds at the reveal.
4. **Scatter extras:** the two quarters are drawn as filled dots (dark, gold) with their mean as a line at 11.3 and 18.9; the middle half is hollow. r for property crime only (persons r = 0.03 is in c5's source, not on the stage).
5. Title and hook are mine: "Reading and the courts, 1830s" / "Where more young men could read, did fewer crimes reach court? France, 1825-30."

## Pre-flight v1

1. **Title and hook.** "Reading and the courts, 1830s" / "Where more young men could read, did fewer crimes reach court? France, 1825-30." A question with both directions open; no number, no direction word.
2. **Options.** "In the least literate, about 1.7 times as high" / "About equal" / "In the most literate, about 1.7 times as high". The two directional options carry the same number at the same precision; "About equal" is the third.
3. **Locked stage.** Title "Recorded crimes per 100,000", panel heads "Least literate quarter / 19% literate" and "Most literate quarter / 63% literate", a baseline, four "?" and the legend. No bar, no value, no reference line.
4. **Reveal values.** 18.9: milestone `hi` (bar value). 11.3: milestone `lo` (bar value; dashed reference line at its height once both quarters are seen). 1.7: shown as "×1.7" once `lo` and `hi` are both reached. 5.9 and 5.9: milestone `pers` (both persons bars). "100,000": stage title. All are data constants computed in Demo.tsx, recorded in the `seen` set, which nothing clears.
5. **QA path.** DOM order: Least literate quarter (`lo`), Most literate quarter (`hi`), Crimes against persons (`pers`), All 86 departments (scatter). All three milestones by press 3. The path ends on the scatter; at reveal the stage returns to the bars with every value visible (reveal-fit shot below).
6. **Reset.** No Reset. Reveal text after the QA path (reveal-fit run, wrong option committed): "Not quite: it was "In the most literate, about 1.7 times as high". The most literate quarter of departments recorded 18.9 property crimes per 100,000 people, against 11.3 in the least literate: 1.7 times as many. Crimes against persons were the same, 5.9 per 100,000 in both. In this record, the more literate departments did not have fewer cases brought to court. Where it stops: these are cases brought to court in 1825 to 1830, which depend on policing as well as crime; they compare departments, not people, and two numbers moving together say nothing, alone, about what caused what."
7. **Phone fit.** `tools/reveal-fit.mjs` (clean, tool commit 79c22aa) on my production build (`NEXT_DIST_DIR=.next-h24`, port 4041), 2026-10-16:
   - 390x844: fit, crop 0 px, hiddenBelow 0, namedHidden 0 (named: crimes against persons, 11.3, most literate quarter, 18.9: all visible), phoneFit true; stage 268 px, picture 192 px, reveal 309 px of a 618 px window.
   - 412x839: fit, crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true; stage 281 px, reveal 288 px of 613 px.
   - The first run (per-bar labels "property"/"persons") had namedHidden 1: "crimes against persons" was only on the folded preset button. Fixed by the legend (departure 3).
   - Smallest svg label at 390 wide: 10.4 px (11-unit ticks and legend, measured in the browser). Bars values and "×1.7" render at about 11.3 px.

## Local QA

Computer-use QA contract, `QA_BASE_URL=http://localhost:4041 QA_ONLY=schooling-and-crime-1830s QA_OUT=artifacts/qa-h24 npx playwright test --workers=2`, 2026-10-16, on the build of this commit's code: **"follows the lesson contract" passed on phone and desktop.** In the same run the feed spec's "subject chips filter the feed" failed and "a finished lesson comes back as a spaced revisit" timed out on both viewports. Both tests use `lessons()[0]`, which under QA_ONLY is this draft, and the feed leaves drafts out (`src/components/Feed.tsx` line 79); the same chips failure is recorded for other drafts (e.g. `company/reviews/below-critical-mass/build.md`). Not this lesson's code; a release QA record (qa-tester) is still owed.

`npm run check` and `npm run typecheck` pass.

Open for others: fact-check of c1-c7 (c7's "depend on policing as well as crime" is the reviewer's wording with no opened source; the fact-checker decides whether it needs one), an adult-beginner learner review (artifact first), release QA.

## v2 (r4 B4): Stage over budget: 30 words. Not built (demo-builder, 2026-10-16)

Batch `company/ops/dispatch-requests/2026-10-16-r4-history.md#B4`, branch `hist-r4-b4` (worktree `/home/user/s3c-h4`). Spec: `company/domains/briefs/history.md` section 24 (v2) and ruling r15 in `company/reviews/history-round-1-cm-rulings.md`. I counted before building, as the decision says (`company/decisions/2026-10-16-stage-word-budget-counting.md`, points 1-3 and Ruling 2). **Stage control labels count** (point 3), and the four preset buttons are inside `data-testid="stage"`. **The v2 spec cannot be built at 25 or fewer stage words**, so I did not build it. Nothing in Demo.tsx or meta.json changed: status is still draft, version 1, and no claim was reset. The brief does not declare any stimulus, so the ceiling is 25.

How I counted: a token counts if it contains a letter; numbers count 0. Script: `/tmp/claude-0/-home-user/3e472d64-8589-5167-8584-c47a01ab4321/scratchpad/sc/count.mjs` (session scratch, not kept). "Brief" means text the brief gives word for word, which a builder may not trim. "Own" means my words.

The busiest frame is "All 86 departments" (the scatter) during explore:

| Stage text | Whose | Words |
|---|---|---|
| y title "Property crimes per 100,000" (my shortest, down from v1's 7) | own | 3 |
| x title "% who could read" (my shortest, down from v1's 5) | own | 3 |
| key "least literate quarter" / "middle" / "most literate quarter" | brief | 7 |
| "Department 75: 73.1 per 100,000" | brief | 2 |
| r line, shortest form the brief allows (a description plus the scale): "loose (r = 0.37; 0 none, 1 perfect)" | brief | 4 |
| presets "Least literate quarter" / "Most literate quarter" / "Crimes against persons" / "All 86 departments" | brief | 11 |
| **total** | brief 24, own 6 | **30** |

- With the r line as the brief writes it ("a loose upward drift (r = 0.37; 0 is none, 1 a perfect line)", 10) and v1's own titles, the scatter is **42**.
- Bars view, as specced: **36**. With my words cut to the minimum it is **25**: title "Crimes per 100,000", panel heads dropped, legend "property" / "persons". That is at the limit with no margin.
- **v1 is already over** under this rule: bars 28, scatter 24. v1's count left out the preset labels.
- The brief's text alone is 24 on the scatter. That leaves 1 word for both axis titles, and I cannot reach 25 without removing an axis title a beginner needs. This is the "still over" case. Who decides what goes: cm-history decides which brief text is cut, and learning-designer re-lays out if cutting is not enough.

Possible cuts for cm-history. These are suggestions; the choice is cm-history's:
1. Merge the "Crimes against persons" preset into the two quarter presets, so each quarter shows its property and persons bars together (milestones `lo`, `hi`). Saves 3, and the gate stays on the bars the reveal quotes.
2. Key on one line: "least / middle / most literate quarter", each word next to its dot. Saves 2. This is brief text, so it needs cm-history.
3. With 1 and 2, the scatter is 25 with my minimum titles. If cm-history also takes the shortest r line, there is no margin for anything else.

Nothing else in v2 is blocked by the count. The hook, title, question gloss, reveal and c4 wording are kit text outside the stage. I held them anyway, so that the lesson moves to v2 in one build and one set of claim resets, and evaluators re-check it once. If cm-history wants the W-1317 wording shipped first (wording only), that fits in the same branch.

Check script: `node company/domains/briefs/checks/history-cycle2-check.mjs 24` prints "all checks pass" (outlier, dot key and r-in-words lines included). Note: the script reads only `process.argv[2]`, so `… 23 24` runs only section 23.
