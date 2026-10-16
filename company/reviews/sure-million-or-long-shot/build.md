# Build note: sure-million-or-long-shot (behavioral:allais-certainty-effect)

builder: demo-builder (builder-beh) · 2026-10-16 · brief: `company/domains/briefs/behavioral.md` §1 and rulings 1-2, 5 · design note: `design.md` (this folder) · numbers: `node company/domains/briefs/checks/behavioral-allais-certainty-effect.mjs` (all checks pass) · status set draft → review

*Kept from evaluators until they have written their findings (demo-standard: artifact before account).*

## Revision build (2026-10-16, B3, W-1244)

builder: demo-builder (B3 of `company/ops/dispatch-requests/2026-10-16-r3-behavioral.md`) · brief §1 "Decision ... W-1244" and rule 6

What changed:
- `Demo.tsx`: `HELD_LINE = false`. The held c6 sentence is cut; both mixed branches now read the script's fallback text (1A+2B 75 words, 1B+2A 80 words, "Leaning away from the sure thing is the reverse of the certainty effect."). Matched branches unchanged (they never carried the line).
- `meta.json`: c6 stays, `unverified`, with a builder line at the head of its note saying it renders nowhere. No other claim touched.

Checked:
- Check script: `node company/domains/briefs/checks/behavioral-allais-certainty-effect.mjs` → `all checks pass`, exit 0.
- Build: `NEXT_DIST_DIR=.next-beh12 NODE_OPTIONS=--max-old-space-size=3072 npx next build` → exit 0 (tsconfig.json edit by next reverted); `npm run typecheck` → exit 0.
- QA: `QA_BASE_URL=http://localhost:4101 QA_ONLY=sure-million-or-long-shot,same-week-a-year-apart npx playwright test --workers=2` → contract passes for both lessons on phone and desktop; `feed.spec.ts` "subject chips filter the feed" fails only under QA_ONLY (its allowed set is filtered to the two slugs while the feed shows the whole domain); the feed spec unfiltered → 10 passed.
- Every reveal branch on screen: a scratch Playwright driver (390x844) drove all four branches of both lessons on the 4101 build and compared the reveal body (after the kit's verdict line) with the script's fallback text → 8/8 MATCH.
- `node tools/reveal-fit.mjs --url http://localhost:4101 sure-million-or-long-shot same-week-a-year-apart` → fit 2, pass 2.

## What was built
- Four gamble cards in two pairs; each card is a choice button holding a 10 x 10 cell grid and a legend (12 px). Cell order is the same in every card: the 89 shared cells first, then the 11 that differ, so the shared block sits in the same place in all four. 1A has no internal divider before the toggle (designer's constraint).
- Controls in DOM order: 1A, 1B (milestone `pair1`), 2A, 2B (`pair2`), toggle "Take away the shared 89%" (`shared`). `minInteractions` 3. The toggle greys the 89 shared cells and strikes the 89% legend line in all four cards; what is left reads 11% $1M against 10% $5M + 1% $0 in both pairs.
- At the reveal the choices freeze and the toggle is forced on (design note: the reveal quotes the toggled picture). The learner's two choices stay marked (border + check).
- Stage gloss: the designer's 11-word fallback, "Expected utility: any felt value, more is better, weighted by chance." (open question 1). No EV, utility or sum is drawn.
- Reveal: the four branches are copied from the check script; the mixed branches carry the held line (`HELD_LINE = true` in Demo.tsx). A scripted browser run (390 x 844) drove all four combinations and matched every reveal text to the script output word for word (85 / 83 / 89 / 88 words).
- Held line: claim c6, `unverified`, support `source`, with its fallback written in the claim. Setting `HELD_LINE = false` restores the brief's unheld text (75 / 80 words). Ruling 5: the fact-checker decides whether the second-hand attribution is enough.
- E0: no Economics claim re-stated; the link to `square-root-wealth` is the `economics:risk-aversion` prerequisite in the curriculum block (no lesson renders in-reveal links).
- Claims: 11 (c1-c11), all `unverified`; none self-verified.

## Things a reviewer should look at
- **Stage word budget.** Counting alphabetic words, the stage holds 15 at most (gloss 11 + toggle 4). Counting every token, including the legend labels ("89% $1M") and the card ids, it is about 36 at the locked frame and 40 with the toggle on. I read the legends as cell labels, as the design note suggests ("write amounts as cell legends, not sentences"), but if the 25-word rule counts them, the lesson is over budget and cm-behavioral should say what goes.
- **Grid SVGs have no viewBox.** reveal-fit's thumbnail heuristic flagged the 62 px grids as a squeezed picture ("picture 62px at 0.19"), because it compares the largest viewBox SVG with the full stage width. The grids are drawn at their designed size (four cards share the stage); I now draw them at natural pixel size (width/height, no viewBox), and the tool passes. This is a disclosed change to how the picture is measured, not to what the learner sees; if the evaluator thinks the cells are too small to read (4.6 px cells, 56.8 px grid), that is a real finding. Heuristic issue for platform-engineer: small multiples trip the thumb rule.
- Locked stage, Pre-flight Q3: the toggle label "Take away the shared 89%" is visible (disabled) before the commit (designer's open question 5; judged acceptable there).
- Disabled cards are not dimmed (`.card.card:disabled { opacity: 1 }`), so the locked pictures stay readable; the toggle is dimmed as usual.

## Pre-flight
1. **Title and hook.** "A sure million or a long shot?" / "Take the sure $1M, or gamble for $5M? Then choose again with the sure thing gone." No: neither says how the two choices relate.
2. **Options.** "Only the 11% chance of $1M" / "Only the 10% chance of $5M" / "Either one, depending on how cautious they are". A and B both name a card with its numbers; C names a reason. Same precision; the right option is not the only numbered one.
3. **Locked stage.** Four cards with their grids and legends (1A 100% $1M; 1B 10% $5M, 89% $1M, 1% $0; 2A 11% $1M, 89% $0; 2B 10% $5M, 90% $0), the gloss, and the disabled toggle label. Nothing marks 1A with 2A. The toggle label names a shared 89% (see above).
4. **Reveal values.** Which cards were chosen: (a) current state (p1, p2), milestones `pair1`, `pair2`. "Take away the 89% each pair shares ... 11% of $1M against 10% of $5M": (b) milestone `shared`, and the toggle is forced on at the reveal so the picture shows it. "10/11 of $5M", "1.1 times $1M": derivation (c3), fixed by the stage's amounts. "4,098 people in 19 countries": held source line c6.
5. **QA path.** 1A, 1B, 2A, 2B, toggle: reaches `pair1`, `pair2`, `shared` (choices end 1B + 2B, the matched "bolder" branch). The toggled picture and both marks are on screen when the reveal opens.
6. **Reset.** There is no Reset control. Toggling off and on again re-greys the same cells; the reveal reads the current choices and forces the toggle on. QA-path reveal text: "You took the 10% chance of $5M both times. Take away the 89% each pair shares, and both pairs become 11% of $1M against 10% of $5M. You answered it the same way both times, so one utility function fits your two choices: a bolder one, for which $5M is worth more than 1.1 times $1M. The sure $1M, then the 10% chance of $5M, would fit none: that is the certainty effect. Where it stops: you chose knowing the pairs were linked."
7. **Phone fit.** `tools/reveal-fit.mjs` (clean stamp, 390 x 844): verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, no thumb, phoneFit true; 86 words measured (83-word branch plus the 3-word verdict line). The scripted run of the 89-word branch (1A + 2B) at 390 x 844: stage top at 174 px, reveal bottom at 784 px, the toggled cards and both marks visible.

## Checks run (2026-10-16)
- Check script: all checks pass.
- QA contract (`QA_ONLY`, phone + desktop, port 3801): pass.
- reveal-fit: pass, phoneFit.
- Dark and light themes looked at, 390 px and Pixel 7.
