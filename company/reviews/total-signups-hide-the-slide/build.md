# Build note: total-signups-hide-the-slide (v1)

builder: demo-builder (builder-books-pilot) · 2026-10-14 · W-631 · brief `company/domains/briefs/books.md` #8 (W-556 pilot exemption, ruling 2) · status draft · every claim unverified. Kept from evaluators until they report.

## What was built
Single card, no `<CardSequence>`. One chart (months 1-6), one readout, one Seen row, three presets in brief order: "Total: getting worse", "Each month: getting worse", "Total: getting better". Each preset sets the full view; no Reset; the active preset is disabled (QA rule 3). Model: 1,000 visitors a month; worse 10→5%, better 5→10% (numbers from `books-cycle1-check.mjs` #8). Locked frame: the worse cumulative line only, muted, with axis ticks 0/250/500 and no per-month numbers. Milestones gating the reveal: `cohort-seen` (records month-6 rate), `better-total-seen` (records final total). The worse total is recorded in the Seen row but does not gate (brief). Once seen, the worse total stays as a dashed red trace under the better total, so at the reveal both lines visibly end at 450.

## Departures from the brief (for cm-books)
- **Reveal cut from 83 to 80 words** so the measured reveal (kit header "Not quite: it was ..." included) is at most 90: reveal-fit measured 92 before the cut, 89 after. Cuts, no sentence removed: "When the months got better" → "When months got better"; "watching each month's group instead" → "watching each month's group"; "found that teams" → "found teams". cm-books may prefer a different cut; claims c2, c4, c6 carry the new wording.
- **Presets fold at the reveal** (`<Row foldAtReveal>`, kit EDD-005): without it the stage top was cropped 40 px and the quoted "450" end label was off screen. The row holds no readout and the reveal does not ask the learner to use a control; the state is in the chart and Seen row.
- Reveal split into three paragraphs (story / book claim / "Does it hold up?") so the verdict line is labelled and separate.

## Copyright checklist (books-strategy §6)
1. [x] No sentence of the book; text is ours. 2. [x] No quote ("vanity metrics" is the term named, not a quoted line). 3. [x] No figure or dashboard from the book; chart drawn from scratch. 4. [x] No company anecdote or story. 5. [x] No cover or artwork. 6. [x] Title "Six months of rising sign-ups" and hook do not name the book; the reveal does. 7. [x] One idea. 8. [x] c4 names ch. 7 "Measure", marked unconfirmed. 9. [x] The trial is cited to Camuffo et al. 2020, not the book. 10. [x] "Does it hold up?" is its own claim (c5), labelled, verdict word "holds up". 11. [x] No advice. 12. [x] 2011.

## Pre-flight v1
1. **Title and hook.** "Six months of rising sign-ups" / "Total customers went up every single month. Is the product getting better?" They pose the tension; they do not say the total can't tell. No.
2. **Options.** "It rose" / "It stayed the same" / "It fell" / "The total can't tell you": none numbered, same precision. Yes.
3. **Locked stage.** A muted rising line, axis ticks 0/250/500, months 1-6, "total customers", "1,000 visitors a month", and the three preset labels. Concern for the evaluator: the preset labels ("getting worse" / "getting better") are the brief's and are visible before commit; they say two cases exist but not that their totals match. I judged this not to point at D, but it is the closest thing to a hint.
4. **Reveal values.** "5%" = `rec.conv`, recorded at milestone `cohort-seen`; "450" = `rec.betterTotal`, recorded at milestone `better-total-seen`. Both are on the stage at the reveal (Seen row; 450 end label).
5. **QA path.** Three presses in DOM order reach both milestones (the question's case is `cohort-seen`). Seen row is full: "Seen: Worse: total 450, month 6 at 5% · Better: total 450".
6. **Reset.** No Reset (brief: each preset sets the full state). Recorded values are set once and never cleared.
7. **Phone fit.** reveal-fit at 390x844: verdict fit, crop 0 px, hiddenBelow 0, namedHidden 0 (450, month, worse, better visible), phoneFit true, 89 measured words. Screenshot `artifacts/reveal-fit/total-signups-hide-the-slide.png`. Labels are 11 px in a 320-wide viewBox drawn at about 340 px (about 11.7 px rendered); Seen row 0.72 rem.

## Measurement note
The shared dev server (3530) took 50-105 s per page load, longer than reveal-fit's fixed 15 s wait, so every plain run errored. I measured with a temporary copy of `tools/reveal-fit.mjs` whose only change was the page-load timeouts (goto and lesson waitFor 300 s), then deleted the copy. QA ran with `--timeout=400000` on the command line; no test file was changed.

## QA (local, dev server 3530)
`QA_BASE_URL=http://localhost:3530 QA_ONLY=total-signups-hide-the-slide,biased-judge-noisy-judge QA_OUT=artifacts/qa-books-pilot npx playwright test tests/qa/contract.spec.ts --workers=1 --timeout=400000`: 4 passed (phone and desktop, both lessons), report `artifacts/qa-books-pilot/qa-report.json`. Final reveal-fit re-run on the current code: both fit, crop 0, namedHidden 0, phoneFit true (89 and 86 measured words).

## v2: learner r10 fixes (W-823, demo-builder, 2026-10-14)

Review: company/reviews/total-signups-hide-the-slide/2026-10-14-learner-adult-beginner-r10.md. Changed claims are reset to unverified; no claim marked verified by the builder.

- Reveal narrowed (c1): 'A total rises whenever a month adds anyone, so “it rose” can't tell you which way you are going. Each step's size can: A's shrink, B's grow.' It now points at the bend instead of denying it. Fact-checker: please re-check this claim's scope.
- Locked frame no longer draws the bending 'worse' curve: the chart is empty until a view is picked.
- Neutral preset names: 'Total A', 'Each month of A', 'Total B'; chart tags A / B; Seen row 'A: … · B: …'.
- Book claims (c3-c6, recall) untouched and still unverified (Books pilot). c1, c2 rewritten (unverified).

## Pre-flight v2

1. Title/hook unchanged: 'Six months of rising sign-ups' / 'Total customers went up every single month. Is the product getting better?'
2. Options unchanged (none numbered).
3. Locked stage: axes and '1,000 visitors a month' only; no line, no bend.
4. Reveal values: 5% (b, cohort milestone, recorded; Seen row); 450 (b, better-total milestone; end label and Seen row).
5. QA path: Total A, Each month of A (cohort-seen), Total B (better-total-seen; A stays as a dashed trace).
6. Reset: no Reset control. Reveal: 'Total A kept climbing while each month converted worse, down to 5% by month six. B's months got better; its total also ended at 450. A total rises whenever a month adds anyone, so “it rose” can't tell you which way you are going. Each step's size can: A's shrink, B's grow. The Lean Startup calls … Does it hold up? …' (86 words)
7. **Phone fit.** reveal-fit verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true, 100 tool words.

QA: tests/qa/contract.spec.ts against next dev on :3632 (QA_BASE_URL, QA_ONLY = the 18 r10 lessons), phone and desktop both passed (36/36, artifacts/qa-f2/final/qa-report.json, harness stamp clean). Fit: committed tools/reveal-fit.mjs --url http://localhost:3632 --strict, tool stamp clean (artifacts/reveal-fit/f2-final.json; screenshot artifacts/reveal-fit/<slug>.png). The tool's word count includes the verdict line and the trust link (about 6 words).
