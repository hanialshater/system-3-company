# Build note: deleted-column-still-there (demo-builder, builder-wavej-ai-1, 2026-10-14)

Brief: `company/domains/briefs/ai.md` item 62 (Wave J). Status draft, version 1. Claims c1-c4 unverified; c4 (Barocas, Hardt and Narayanan 2023; Pedreshi et al. 2008) is the real-systems citation.

- Stage: header "Past lenders approved ○ A 80%, ▢ B 40%" and the current layout ("80% together"); two neighbourhood boxes of 50 shapes (circle A, square B; 10 x 5). Applying the model fills every dot in an approved neighbourhood and outlines the box; box label "N1 past 72% → approve". Summary line "Model approves A 80% · B 20% (filled)". A muted "Seen:" line keeps every layout applied so far ("80% together A 80% · B 20%; mixed A 100% · B 100%; ...") and survives Reset.
- The toy rule (approve a whole neighbourhood if most past applicants there were approved) is in the explore hint and visible in the box labels (past rate and verdict), not in a separate stage caption, to stay near the 25-word stage budget.
- Controls in DOM order: "Train without group" (80%), "Mixed neighbourhoods" (50%), "90% together", Reset (back to the 80% layout with no model applied). Active preset disabled; Reset disabled when no model is applied; preset row folds at the reveal.
- Dot positions inside each box: deterministic shuffle, mulberry32 seed 1 (first seed, untuned; positions change no number), disclosed in c1.
- Milestones: question-case, mixed-seen (gated); extreme-seen recorded in the Seen line only.
- Stage text at its maximum (after all three layouts) is about 30 words, over the 25-word budget: the Seen line carries three results so that Reset cannot hide what the reveal quotes.
- Reveal: the brief draft with two words cut ("and only 20%" -> "and 20%", "most A applicants" -> "most A"), so that with the long "Not quite" verdict the card says 89 words (91 before). No sentence was cut; cm-ai may prefer a different trim.

## Pre-flight v1
1. **Title and hook.** "Delete the group column. Then what?" / "A lender trains a model without the group column. How will its approvals compare?" Says neither equal nor unequal.
2. **Options.** "Equal for A and B" / "Unequal, but less than before" / "As unequal as before, or more": none numbered, same precision.
3. **Locked stage.** Header with the question's past rates, "80% together", the two boxes of hollow circles and squares in the 80% layout, "Model approves: –". No fills, no past rate per box, no verdicts.
4. **Reveal values.** "80% of A and 20% of B": (b) milestone question-case, recorded in `rec.q`, in the Seen line. "80% and 40%": the toy's data (c1), in the header. "most A lived in N1, most B in N2": the drawn 80% layout (Reset returns to it). "approved both groups alike": (b) milestone mixed-seen, "mixed A 100% · B 100%" in the Seen line.
5. **QA path.** Train without group (question-case), Mixed neighbourhoods (mixed-seen), 90% together, Reset: both milestones in 2 presses. At the reveal the Seen line reads "Seen: 80% together A 80% · B 20%; mixed A 100% · B 100%; 90% together A 90% · B 10%".
6. **Reset.** Reveal after Reset: "The model never saw anyone's group, yet it approved 80% of A and 20% of B, a wider gap than the lenders' 80% and 40%. It learned from their biased decisions, and neighbourhood told it the group: most A lived in N1, most B in N2. When you mixed the neighbourhoods, the same model approved both groups alike. Deleting the column deletes the label, not the pattern. Fairness has to be checked on outcomes by group, not on inputs."
7. **Phone fit.** reveal-fit at 390x844 on the shared dev server (2026-10-14): verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true; 89 words with the verdict (reveal body 79). Stage 257 px (picture 126). Smallest rendered stage label 10.35 px. Screenshot `artifacts/reveal-fit/deleted-column-still-there.png`.

## QA (builder's local run, 2026-10-14)
Same command as the other wave-J ai lessons (`--timeout=240000` only raises Playwright's per-test limit; the stock 45 s limit timed out on `page.goto` on the overloaded shared dev server). Final run: phone passed, desktop failed once at "lesson renders": the screenshot shows the Next dev overlay "Console Error: Can't perform a React state update on a component that hasn't mounted yet" over "This page couldn't load" (the app shell failed to load, so the lesson never rendered). The same warning failed an earlier phone run of this slug. A rerun with `--repeat-each=2` passed 4 of 4 (artifacts/qa-wavej-ai-rerun). The lesson calls setState only in click handlers. Other builders logged the same dev warning on unrelated lessons today (company/ops/progress.md), so I read it as dev-server noise, but that is not proven. It needs a run on a release build.

## v2: learner r10 fixes (W-839, demo-builder, 2026-10-14)

Review: company/reviews/deleted-column-still-there/2026-10-14-learner-adult-beginner-r10.md. Changed claims are reset to unverified; no claim marked verified by the builder.

- The model's rule is now in the question: 'A model sees only neighbourhood, and approves a whole one if most past applicants there were approved.' (explore hint shortened).
- Mixed case reworded: 'When you mixed the neighbourhoods, neighbourhood no longer tracked group, so the model could not tell them apart: it approved everyone.'
- When the reveal opens after Reset, the question's case (80% together) comes back, so the filled grids are on screen. c1, c3 rewritten (unverified); c2 unchanged.

## Pre-flight v2

1. Title/hook unchanged.
2. Options unchanged.
3. Locked stage unchanged (header, empty grids).
4. Reveal values: 80% and 20% (b, question-case milestone; restored grids and summary).
5. QA path: Train without group, Mixed, 90% together, Reset; the reveal restores 80% together.
6. Reset: reveal matches the restored grid (83 words).
7. **Phone fit.** reveal-fit verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true, 98 tool words.

QA: tests/qa/contract.spec.ts against next dev on :3632 (QA_BASE_URL, QA_ONLY = the 18 r10 lessons), phone and desktop both passed (36/36, artifacts/qa-f2/final/qa-report.json, harness stamp clean). Fit: committed tools/reveal-fit.mjs --url http://localhost:3632 --strict, tool stamp clean (artifacts/reveal-fit/f2-final.json; screenshot artifacts/reveal-fit/<slug>.png). The tool's word count includes the verdict line and the trust link (about 6 words).

status draft → review (W-996): launch r11, claims verified, QA on release build c0cfd14 (Demo.tsx/CSS unchanged c0cfd14..511872a; contract also re-run phone+desktop on 511872a, next dev :3673, artifacts/qa-w996-all, 76/76; 2026-10-15)
