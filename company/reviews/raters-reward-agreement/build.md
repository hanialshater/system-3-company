# Build note: raters-reward-agreement (demo-builder, builder-wavej-ai-1, 2026-10-14)

Brief: `company/domains/briefs/ai.md` item 64 (Wave J). Status draft, version 1. Claims c1-c3 unverified; c3 (Sharma et al. 2024; Perez et al. 2023) is the real-systems citation.

- Stage: caption "When the user is right, both models give the same answer. Rates are invented."; two model cards side by side (Agreeable, Correct), each with "right x% of the time" and a 10 x 6 grid of the votes it won: filled grey chips from comparisons where the user was right, outlined chips where the user was wrong (legend under the cards). The winner's card is outlined. Readout line "Agreeable wins 60 · Correct 40 · accuracy 50% vs 100%"; a muted "Seen (Agreeable · Correct): at 70% 60 · 40; at 50% 50 · 50; ..." line survives Reset.
- Votes are exact expected counts (no sampling): 25/25 from user-right comparisons, 50 x agree / rest from user-wrong ones.
- Controls in DOM order: "Collect 100 votes" (70%), "Raters favour agreement 50%", "Raters favour agreement 30%", Reset. Active preset disabled; Reset disabled when no votes are shown; preset row folds at the reveal.
- Departure from the brief: the 100 chips are split between the two cards (each card shows the chips it won) instead of one shared 10 x 10 strip, so the "every difference came from users who were wrong" sentence can be checked by eye (both cards have 25 grey chips).
- Milestones: question-case, tie-seen (gated); honest-wins recorded in the Seen line only. "Only below that did honesty win" is a derivation (c2), not a quoted state.
- Caption shortened to "User right: both models answer alike. Rates invented." and cards made 14 units shorter after a first fit run cropped the stage top by 21 px.

## Pre-flight v1
1. **Title and hook.** "Whose answer do the raters reward?" / "One model is always right; one always agrees with you. Which do people's votes favour?" Neutral between the two.
2. **Options.** "The always-correct model" / "The always-agreeing model" / "Neither; they tie": none numbered.
3. **Locked stage.** Caption, two cards with names, "– votes", their accuracies (100%, 50%: the question's own setup), 60 dashed empty slots each, the chip legend, "Agreeable wins – · Correct –". No votes, no winner outline.
4. **Reveal values.** "60 votes to 40": (b) milestone question-case, recorded in `rec.q`, in the Seen line "at 70% 60 · 40". "half the time": the card's "right 50% of the time". "7 in 10": the question's rate. "At 50% the models tied": (b) milestone tie-seen, "at 50% 50 · 50" in the Seen line. "only below that did honesty win": derivation (c2); "at 30% 40 · 60" is in the Seen line if pressed.
5. **QA path.** Collect 100 votes (question-case), 50% (tie-seen), 30%, Reset: both milestones in 2 presses. At the reveal: "Seen: at 70% 60 · 40; at 50% 50 · 50; at 30% 40 · 60".
6. **Reset.** Reveal after Reset: "The Agreeable model was right only half the time, yet it won 60 votes to 40. When users were right, both models said the same thing and split the votes. Every difference came from users who were wrong, and 7 in 10 of them preferred being agreed with. A reward model fitted to these votes learns to agree. At 50% the models tied; only below that did honesty win. Preferences teach what people like, not what is true."
7. **Phone fit.** reveal-fit at 390x844 on the shared dev server (2026-10-14): verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true; 85 words with the verdict (reveal body 78). Stage 284 px (picture 130). Smallest rendered stage label 10.35 px. Screenshot `artifacts/reveal-fit/raters-reward-agreement.png`.

## QA (builder's local run, 2026-10-14)
`QA_BASE_URL=http://localhost:3530 QA_ONLY=<five wave-J ai slugs> QA_OUT=artifacts/qa-wavej-ai npx playwright test tests/qa/contract.spec.ts --workers=1 --timeout=240000`: passed on phone and desktop (final run, after the last code change). `--timeout` only raises Playwright's per-test limit; the stock 45 s limit timed out on `page.goto` for all ten tests twice on the overloaded shared dev server (load average about 30-40 on 4 CPUs). Not a release build: the official record still needs a run on a quiet server or build.
