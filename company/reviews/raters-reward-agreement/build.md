# Build note: raters-reward-agreement (demo-builder, builder-wavej-ai-1, 2026-10-14)

Brief: `company/domains/briefs/ai.md` item 64 (Wave J). Status draft, version 1. Claims c1-c3 unverified; c3 (Sharma et al. 2024; Perez et al. 2023) is the real-systems citation.

- Stage: caption "When the user is right, both models give the same answer. Rates are invented."; two model cards side by side (Agreeable, Correct), each with "right x% of the time" and a 10 x 6 grid of the votes it won: filled grey chips from comparisons where the user was right, outlined chips where the user was wrong (legend under the cards). The winner's card is outlined. Readout line "Agreeable wins 60 · Correct 40 · accuracy 50% vs 100%"; a muted "Seen (Agreeable · Correct): at 70% 60 · 40; at 50% 50 · 50; ..." line survives Reset.
- Votes are exact expected counts (no sampling): 25/25 from user-right comparisons, 50 x agree / rest from user-wrong ones.
- Controls in DOM order: "Collect 100 votes" (70%), "Raters favour agreement 50%", "Raters favour agreement 30%", Reset. Active preset disabled; Reset disabled when no votes are shown; preset row folds at the reveal.
- Departure from the brief: the 100 chips are split between the two cards (each card shows the chips it won) instead of one shared 10 x 10 strip, so the "every difference came from users who were wrong" sentence can be checked by eye (both cards have 25 grey chips).
- Milestones: question-case, tie-seen (gated); honest-wins recorded in the Seen line only. "Only below that did honesty win" is a derivation (c2), not a quoted state.
