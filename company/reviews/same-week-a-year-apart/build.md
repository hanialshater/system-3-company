# Build note: same-week-a-year-apart (behavioral:present-bias-reversal)

builder: demo-builder (builder-beh) · 2026-10-16 · brief: `company/domains/briefs/behavioral.md` §2 and rulings 1, 3-5 · design note: `design.md` (this folder) · numbers: `node company/domains/briefs/checks/behavioral-present-bias-reversal.mjs` (all checks pass) · status set draft → review

*Kept from evaluators until they have written their findings (demo-standard: artifact before account).*

## Revision build (r4, 2026-10-16, r4 B2, brief 2 "Decision (r4, W-1293, W-1321)")
What changed: meta.json `objective` only; its last sentence ("They can also say that with real payments this switch is clearer for effort than for money.") is removed, because the lesson does not teach it (c6 stays cut). No Demo.tsx change, no claim status changed (the objective is not a claim). c3 is still `unverified` from the r3 revision, waiting for the fact-checker.
- Check script `node company/domains/briefs/checks/behavioral-present-bias-reversal.mjs`: not touched by this change (no learner text changed).
- Build: `NEXT_DIST_DIR=.next-beh2 NODE_OPTIONS=--max-old-space-size=3072 npx next build` → exit 0 (load 5.7 before; the tsconfig.json edit next made was reverted; dist dir deleted after QA). `npx tsc --noEmit` → no errors. `npm run check` → passed (969 lessons, 0 errors; 6 warnings, none on these three lessons).
- QA: `QA_BASE_URL=http://localhost:4142 QA_ONLY=zero-loses-to-this-crowd,sure-million-or-long-shot,same-week-a-year-apart npx playwright test --workers=2` → 14 passed, 2 failed, both `feed.spec.ts` "subject chips filter the feed" (the known QA_ONLY artifact noted in earlier build notes); `tests/qa/feed.spec.ts` unfiltered → 10 passed.
- `node tools/reveal-fit.mjs --url http://localhost:4142 zero-loses-to-this-crowd sure-million-or-long-shot same-week-a-year-apart --jobs 2` → fit 3, pass 3, phoneFit 3, namedHidden 0 (clean stamp, head 4e78fdf + this diff).

## Revision build (2026-10-16, B3, W-1244)

builder: demo-builder (B3 of `company/ops/dispatch-requests/2026-10-16-r3-behavioral.md`) · brief §2 "Decision ... W-1244" and "Revision-build changes (W-1244)", rule 6

What changed (the three changes, in one build):
1. `Demo.tsx`: `HELD_LINE = false`. L ("With real payments, ...") is cut from every branch; branches now 79 / 77 / 77 / 76 words.
2. Matched branches (wait/wait, take/take): "Switching to the $100 today would fit only ..." became the script's "Waiting, then taking the $100 today, would fit only a model that gives today extra weight, called present bias." Claim c3's text changed with it, so c3 is set back to `unverified` (checkedBy/checkedOn removed; the prior fact-check note kept after a builder line). The builder does not re-verify it.
3. The timeline's alt text at the today stop reads "Timeline from today to week 53. The pair: $100 today, $110 in a week." (was "The pair: $100 at today, $110 one week later."). Week 52 and week 13 keep "The pair: $100 at week t, $110 one week later."
- `meta.json`: c6 stays, `unverified`, with a builder line at the head of its note saying it renders nowhere. No claim other than c3 changed status.

Left open for cm-behavioral: the meta.json `objective` still ends "They can also say that with real payments this switch is clearer for effort than for money." With L cut the lesson no longer teaches that. Not changed here (the item named no objective change); the brief owner decides whether to drop it.

Checked:
- Check script: `node company/domains/briefs/checks/behavioral-present-bias-reversal.mjs` → `all checks pass`, exit 0.
- Build: `NEXT_DIST_DIR=.next-beh12 NODE_OPTIONS=--max-old-space-size=3072 npx next build` → exit 0 (tsconfig.json edit by next reverted); `npm run typecheck` → exit 0.
- QA: `QA_BASE_URL=http://localhost:4101 QA_ONLY=sure-million-or-long-shot,same-week-a-year-apart npx playwright test --workers=2` → contract passes for both lessons on phone and desktop; `feed.spec.ts` "subject chips filter the feed" fails only under QA_ONLY (its allowed set is filtered to the two slugs while the feed shows the whole domain); the feed spec unfiltered → 10 passed.
- Every reveal branch on screen: a scratch Playwright driver (390x844) drove all four branches of both lessons on the 4101 build and compared the reveal body (after the kit's verdict line) with the script's fallback text → 8/8 MATCH.
- `node tools/reveal-fit.mjs --url http://localhost:4101 sure-million-or-long-shot same-week-a-year-apart` → fit 2, pass 2.

## What was built
- One timeline, today to week 53, with the pair drawn as a fixed-size callout: a $100 coin and a $110 coin under a "1 week, +$10" gap bracket, with dashed leader lines down to weeks t and t + 1 on the axis. The bracket is drawn identically at every stop (designer's addition); at 390 px it renders at about 12 px, above the 10 px floor, also at the today stop (designer's open question 4).
- Controls in DOM order: far choice "$100 at week 52" | "$110 at week 53" (milestone `far`; enabled only with the pair at week 52), the slider "Pair starts" (ruling 3: three stops, 52, 13, 0; the value is closeness, so ArrowRight moves the pair toward today and the QA path's two presses land on today; milestone `slide` at today; enabled once the far choice is made), near choice "$100 today" | "$110 in a week" (milestone `near`; enabled only at today). `minInteractions` 3.
- The strip under the timeline ("Steady model: wait" or "Steady model: take $100") appears after the far choice and never changes as the pair moves. It is hidden on the locked stage, so it cannot state the predict's answer before the commit.
- Both choices stay marked beside the tick labels ("today ✓ $110", "✓ $110 week 52"), and the chosen coin is filled at its stop. At the reveal the controls freeze.
- Reveal: the four branches are copied from the check script, with L ("With real payments, reversals are clearer for effort than for money.") in every branch (`HELD_LINE = true`) and the "Where it stops" line in every branch. A scripted browser run (390 x 844) drove all four combinations and matched every reveal text to the script output word for word (89 / 88 / 88 / 86 words).
- Held line: claim c6, `unverified`, support `source`. Fallback (ruling 4): `HELD_LINE = false` cuts L and nothing replaces it; the lesson still names present bias and keeps "imagined money".
- No rate, factor or present value on screen (E4). E0 link: the `economics:present-value` prerequisite in the curriculum block.
- Claims: 12 (c1-c12), all `unverified`; none self-verified.

## Things a reviewer should look at
- **Stage word budget.** Counting alphabetic words at the busiest moment (explore at today, both choices made): exactly 25 (caption 8, bracket 1, tick labels 2, strip 3, choice labels 8, slider 3). Counting amounts and numbers too, about 40. I cut the "13" tick label to stay at 25 (the slider readout names week 13). If the rule counts amounts, cm-behavioral should say what goes.
- c3: the matched branches say a switch "would fit only a model that gives today extra weight". "Only" is the script's text; it is true relative to the two models the stage names, and the fact-checker may want it scoped.
- The far choice is locked once the pair leaves week 52 (slide back to change it), so the learner cannot rewrite the far answer while looking at today.

## Pre-flight
1. **Title and hook.** "Same week, a year apart" / "Would you wait a week for $10 more? Answer a year out, then again today." No: neither says whether the answer may change.
2. **Options.** "Wait a week again for the $110" / "Take the $100, since today weighs more" / "Either, depending on their discount rate". All name an action; B and C carry a reason. Same precision; only A and B name an amount, and B is wrong.
3. **Locked stage.** The caption, the pair at week 52 with the bracket "1 week, +$10", the axis with "today" and "week 52", the disabled choice buttons and slider. No strip, no marks. The bracket shows the gap (the cause the lesson teaches), not which option follows from it.
4. **Reveal values.** Both choices: (a) current state (far, near), milestones `far` and `near`. "one week for $10 more": the bracket, on screen at every stop. "the gap never changed as the pair moved to today": (b) milestone `slide`. "No/One steady rate fits": derivation from the two choices (c1, c4).
5. **QA path.** "$100 at week 52", "$110 at week 53", slider two ArrowRight presses (week 52 → 13 → today), "$100 today", "$110 in a week": reaches `far`, `slide`, `near`. The pair sits at today with both marks when the reveal opens.
6. **Reset.** There is no Reset control. Sliding back keeps both recorded choices and their marks; the reveal reads the current choices. QA-path reveal text: "Both a year out and today you waited a week for the $110. Steady discounting judges the pair only by its gap, one week for $10 more, and the gap never changed as the pair moved to today. One steady rate fits both of your choices. Switching to the $100 today would fit only a model that gives today extra weight, called present bias. With real payments, reversals are clearer for effort than for money. Where it stops: imagined money, chosen once each, with your first choice in view."
7. **Phone fit.** `tools/reveal-fit.mjs` (clean stamp, 390 x 844): verdict fit, stage-top crop 1 px (bar is ≤ 1; the first build had 26 px, fixed by moving the marks onto the tick row, a shorter viewBox and no extra row gap), hiddenBelow 0, namedHidden 0, no thumb, phoneFit true; 92 words measured (89-word branch plus the 3-word verdict line). Scripted run of every branch: stage top 162-173 px, reveal bottom 793 px; the card fits the picture slightly in the switched branches, and the bracket stays legible.

## Checks run (2026-10-16)
- Check script: all checks pass.
- QA contract (`QA_ONLY`, phone + desktop, port 3801): pass.
- reveal-fit: pass, phoneFit.
- Dark and light themes looked at, 390 px and Pixel 7.
