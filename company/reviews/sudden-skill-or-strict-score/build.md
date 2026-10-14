# Build note: sudden-skill-or-strict-score (demo-builder, builder-wavej-ai-1, 2026-10-14)

Brief: `company/domains/briefs/ai.md` item 61 (Wave J). Status draft, version 1. Claims c1-c3 unverified; c3 (Schaeffer et al. 2023; Wei et al. 2022) is the real-systems citation.

- Stage: caption under the chart "Toy: each token right or wrong independently" (moved there from a tag, which wrapped and cropped the stage top by 13 px); six columns XS-XXL on a 0-100% axis, a legend line above. "Score whole answers" fills p^10; "Score each token" fills p and keeps the whole-answer scores as dashed outlines with their values (the before/after pair); "Answers 1 token long" fills p (whole = token score). After Reset nothing is filled and the recorded sets stay as dashed outlines with values ("Dashed: scores you saw"). Readout line: "XL: 34.9% whole answers · 90% tokens" (recorded values; dashes until seen).
- Values above every column (one decimal), not only first and last as in the brief: the reveal quotes L's 10.7%, and the columns are 40 px apart enough for 5-character labels.
- Controls in DOM order: "Score whole answers", "Score each token", "Answers 1 token long", Reset (4). Active preset disabled; Reset disabled when nothing is filled; preset row folds at the reveal.
- Milestones: whole-scored, per-token-scored (gated). one-token-seen is not gated and the reveal does not quote it.
- Reveal: the brief draft, values from the recorded sets (0.1%, 10.7%, 59.9%; 50%, 95%).
- Legend shortened to "Filled: each token · dashed: whole answers" after the 11 px label change.

## Pre-flight v1
1. **Title and hook.** "What does a strict score do to progress?" / "Six models, each a bit better per word than the last. Graded strictly, how do they look?" Does not say sudden, smooth or levelling.
2. **Options.** "Climb steadily" / "Stay near zero, then shoot up" / "Shoot up, then level off": none numbered, same precision.
3. **Locked stage.** Empty 0-100% axis with gridlines, six labels XS-XXL, legend "Score of each model size", the toy caption, "XL: –". No columns, no values.
4. **Reveal values.** "0.1%", "10.7%", "59.9%": (b) milestone whole-scored (recorded `seenWhole`), drawn as dashed outlines with values whenever whole is not the filled set. "50%", "95%": (b) milestone per-token-scored (recorded `seenToken`), dashed outlines after Reset. Stage rounding (one decimal) is the reveal's.
5. **QA path.** Score whole answers (whole-scored), Score each token (per-token-scored), Answers 1 token long, Reset: both milestones in 2 presses. At the reveal both recorded sets are drawn as dashed outlines with their values, and "XL: 34.9% whole answers · 90% tokens".
6. **Reset.** Reveal after Reset: "Scored on whole answers, the four smaller models sat near zero, from 0.1% to 10.7%, then the score shot to 59.9%: it looks like a skill switching on. Scored token by token, the same models climbed steadily from 50% to 95%. Nothing sudden happened inside them; ten tokens all right is p to the tenth power, which stays tiny until p is near 1. Before calling an ability emergent, check whether a smoother score shows it growing all along."
7. **Phone fit.** reveal-fit at 390x844 on the shared dev server (2026-10-14): verdict fit, stage-top crop 0 px (13 px before the tag moved into the chart), hiddenBelow 0, namedHidden 0, phoneFit true; 89 words with the verdict (reveal body 79). Stage 293 px (picture 196). Smallest rendered stage label 10.35 px. Screenshot `artifacts/reveal-fit/sudden-skill-or-strict-score.png`.

## QA (builder's local run, 2026-10-14)
`QA_BASE_URL=http://localhost:3530 QA_ONLY=<five wave-J ai slugs> QA_OUT=artifacts/qa-wavej-ai npx playwright test tests/qa/contract.spec.ts --workers=1 --timeout=240000`: passed on phone and desktop (final run, after the last code change). `--timeout` only raises Playwright's per-test limit; the stock 45 s limit timed out on `page.goto` for all ten tests twice on the overloaded shared dev server (load average about 30-40 on 4 CPUs). Not a release build: the official record still needs a run on a quiet server or build.
