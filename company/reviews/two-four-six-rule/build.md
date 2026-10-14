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

(v1 item 7 was left as a placeholder, "FIT_246", and never measured. v2 below has the measurement.)

## v2 (2026-10-14, demo-builder-bigideas-pilot): W-633, the W-537 re-check row 1

- **Held citations on the learner path cut to one** (strategy section 5): c4, the limit (Klayman & Ha 1987), as cm-big-ideas suggested on the board.
  - Popper (c3) left the reveal. Its place is taken by the board's fallback, "A test that could prove you wrong tells you more." (c3 now support derivation, from c2.) The Popper wording and the condition for restoring it are in c3's source.
  - The stage caption at the reveal no longer cites "(Wason, 1960)"; it reads "Secret rule: any three increasing numbers". c1 is now the lesson's set-up (convention), and Wason is recorded off the learner path. **Question for cm-big-ideas:** should the stage credit Wason by name? That would be a second held citation, or it would replace c4 as the one.
  - c4 now has a written fallback (derivation): "if your guess were broader than the true rule, testing cases that fit would catch it, because some would fail. It fails here because the true rule is broader than the guess."
- The reveal's first paragraph lost "those tests taught you more than the rest", which the fallback sentence now says. No verdict word is used (the lesson states no verdict).
- Stage, controls and milestones are unchanged. Version 2; c1, c3 and c4 are unverified.

## Pre-flight v2
1. **Title and hook.** Unchanged: "Every test fits your guess" / "2, 4, 6 fits a secret rule. Your guess passed three tests. What should you test next?"
2. **Options.** Unchanged: "No, it breaks the pattern" / "Yes, it still fits".
3. **Locked stage.** Unchanged (header row, the seeded +2 row, steppers "?", buttons disabled).
4. **Reveal values.** "1-2-10" and "6-4-2": (b) milestones split and no-fit, recorded and pinned. "any three increasing numbers": the reveal-phase caption.
5. **QA path.** Unchanged; the QA contract passed, phone and desktop (artifacts/qa-bigideas-pilot).
6. **Reset.** No Reset control. Reveal on the QA path: "Your +2 tests all fit, but they fit “any three increasing numbers” just as well, so they couldn’t tell the two rules apart. 1-2-10 broke your guess and still fit, while 6-4-2 did not. A test that could prove you wrong tells you more. Where it stops: testing cases that fit is often sensible. It fails here because the true rule is broader than the guess."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3530` (next dev): fit, crop 0 px, namedHidden 0, phoneFit true, 74 words (tool count). Smallest stage text 11.5 px at predict and at the reveal (builder's own font-size probe).
