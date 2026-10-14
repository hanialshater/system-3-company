# Build note: two-four-six-rule

Builder: demo-builder (demo-builder-bigideas-1) · 2026-10-14 · from brief big-ideas.md #1 (single card, steppers and a log). First Big Ideas lesson.

- Brief numbers re-checked: every +2 triple is increasing, so no +2 test can separate the rules; 1-2-10 breaks +2 and fits; 6-4-2 fits neither (company/domains/briefs/checks/big-ideas-cycle1-check.mjs #1).
- Picture: a log table "tested / fits +2? / fits secret rule?". Row 1 is the question's three +2 tests (✓ ✓). Every test the learner runs adds a row; a row where the two marks differ is highlighted "← differ" (the stage's stand-in for "a test that could tell the rules apart"). The first split row and the first no-fit row are pinned; the log shows at most 4 learner rows. The secret rule is printed on the stage only in the reveal phase ("Secret rule: any three increasing numbers (Wason, 1960)").
- Controls, DOM order: first −/+, second −/+, third −/+ (0-40), Flip order, Test these, Test 1-2-10. Deviation from the brief: two controls added (Flip order, Test 1-2-10), because QA presses each control once and paired −/+ steppers cancel, so steppers alone cannot reach either milestone. Test 1-2-10 is the question's own case; Flip order is a tool, not an answer. "Tests run: N" counter so repeat tests always change the stage.
- Milestones: split (a triple that breaks +2 and fits), no-fit (a triple that fails the secret rule). Both triples recorded for the reveal.
- Reveal: the brief's draft plus one clause for the no-fit milestone ("while 6-4-2 did not"), "sensible strategy" shortened to "sensible". 79 words. Wason is credited on the stage caption, not in the reveal.
- Claims c1-c5, all unverified. c3 flags that falsifiability is Popper's argument, not a consensus ("argued").

## Pre-flight v1

This pre-flight describes the v1 build. Board items W-633 to W-636 (from cm-big-ideas' W-537 re-check) revise these drafts; the builder of each v2 adds `## Pre-flight v2`.

1. **Title and hook.** "Every test fits your guess" / "2, 4, 6 fits a secret rule. Your guess passed three tests. What should you test next?" Neither says whether 1-2-10 fits.
2. **Options.** "No, it breaks the pattern" / "Yes, it still fits": same form, no numbers.
3. **Locked stage.** Header row and the question's three +2 tests (✓ ✓); steppers show "?"; buttons Flip order / Test these / Test 1-2-10 disabled. No row for 1-2-10, no rule text.
4. **Reveal values.** "Your +2 tests all fit": the seeded row, always on stage. "any three increasing numbers": the reveal-phase caption on stage. "1-2-10": (b) milestone split, the first split triple recorded, pinned row. "6-4-2": (b) milestone no-fit, first no-fit triple recorded, pinned row.
5. **QA path.** Steppers net back to 2-4-6, Flip order (6-4-2), Test these (6-4-2 ✗ ✗: no-fit), Test 1-2-10 (✗ ✓: split). Both milestones in 9 presses; both rows on the stage at the reveal. Every press changed the stage (own Playwright walk on :3530).
6. **Reset.** No Reset control. Recorded triples never change after the milestone fires. Reveal on the QA path: "Your +2 tests all fit, but they fit “any three increasing numbers” just as well, so they couldn’t tell the two rules apart. 1-2-10 broke your guess and still fit, while 6-4-2 did not: those tests taught you more than the rest. Karl Popper argued that a claim is scientific when a test could prove it false. Where it stops: testing cases that fit is often sensible. It fails here because the true rule is broader than the guess."
7. **Phone fit.** verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true, 74 words with the verdict; stage 254 px (table 94, controls 84, text 32), window 618 px. Measured 2026-10-14 ~17:35 UTC on the shared dev server :3530 with tools/reveal-fit.mjs logic, but run from a scratch copy whose only changes raise the page.goto timeout (30 s → 600 s) and the lesson-render wait (15 s → 900 s): the unmodified tool failed 20+ times on page.goto/render timeouts (the server took 73 s to DOMContentLoaded and 217 s to hydrate). Screenshot artifacts/reveal-fit/two-four-six-rule.png. The run measured the files as they stood then, which already included another builder's in-flight v2 edits (W-633).
