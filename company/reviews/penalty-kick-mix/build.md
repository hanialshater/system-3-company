# Build note: penalty-kick-mix

builder: demo-builder · 2026-10-14 · session 2 (NCM batch 1)

- Format: single card, slider drives a live 2x2 table and two bars. No spec. No randomness.
- Rule: p = (b-h)/((x-h)+(b-h)), q = (x-h)/((x-h)+(b-h)), h 0.5, b 0.9, x 0.90 to 1.00 step 0.02. Re-run in node with the lesson's mix(): p 0.500, 0.488, 0.476, 0.465, 0.455, 0.444; q 0.500 ... 0.556; score 0.700 ... 0.722; both indifference sides agree to 1e-16. Matches the brief.
- Answer not visible before predicting: the locked stage shows the 0.90 start (50/50, 0.700), which the question already states. The 1.00 state appears only after the slider or the "Perfect left shot" button.
- QA path: slider (two arrow presses reach 0.94), then the button reaches 1.00, which is the one milestone and the state the reveal quotes. The slider has no reset button so the stage at reveal time still shows 1.00.
- Stage words about 23; reveal about 85 words.
- Section unconfirmed: references ch. 6 §6.7 is from the brief ("§ unconfirmed"); the fetch of the book site failed then. Claim c4 carries the note. Fact-checker or a human should confirm against the free PDF.
- Claim 5 of the brief (Palacios-Huerta 2003, real penalty data) is omitted on purpose: recalled from memory, needs a human source check. c5 records the omission.
- meta owner.categoryManager is cm-economics (the check requires it).
- Known cosmetic: in the reveal phase the stage panel is a little taller than its box on a phone, so the top (scoring line, column headers) scrolls out of view; the quoted numbers (bars, 1.00 cell) stay visible.
- All claims unverified. Status review.
- QA: contract passes on phone and desktop (company/reviews/penalty-kick-mix/2026-10-14-qa.md). One earlier desktop run failed under parallel load alongside the feed specs and passed on rerun.

## Revision v3 (2026-10-14, session 2)

Findings from the learner review and fact-check NCM-1, and what changed:

- **Mechanism not shown (learner 4, 5):** under each bar the stage now shows the opponent's payoff from each choice. Under "Kicker shoots left": keeper left x / right y (the kicker's score against each dive). Under "Keeper dives left": kick left / right. "=" appears when equal. At 1.00 both read 0.722 (the indifference); the slider moves the mixes so the pair stays equal.
- **"Why not keep 50/50?" (learner 6):** new button "Keep 50% left". Kicker stays at 50%, keeper bar jumps to 100% (best reply), readout 0.700 vs 0.750, score falls back to 0.700. Second milestone kept-50; minInteractions is now 2, so both states are reached before the reveal quotes them.
- **Why the score still rises (learner 6):** reveal contrasts 0.700 (keeping 50%) with 0.722 (re-mixed, every kick and dive pays the same). Slogan last line removed (learner 8).
- **Start mix unexplained / orientation (learner 1, 2):** question rewritten (guess his side 0.5, not 0.9; mixing so the keeper can't guess; left kick 1.0 when the keeper guesses wrong).
- **Layout (learner 9):** svg min-height 0 so the picture can shrink. On a phone the reveal still clips the top of the stage panel; the quoted bars stay visible.
- **c1 (fact-check):** text reworded as the checker described (by kick and dive); status back to unverified. Demo.tsx header comment fixed. New unverified claims c6 (keeping 50% scores 0.700) and c7 (both kicks and both dives 0.722 at the best mixes). c2-c5 unchanged, still verified.
- Numbers re-run in node with the lesson's rule: keep mode at 1.00 gives 0.700 vs 0.750, score 0.700; best mix gives 0.7222 on all four payoffs; 0.94 gives 0.7095.
- Stage words (excluding numbers) about 25.
- QA: contract passes phone and desktop (2026-10-14-qa.md). A full-suite run also failed 2 feed specs (subject chips filter, both viewports), not this lesson.

## Revision v4 (2026-10-14, session 2, polish)

- **NCM-2 advisory (kept-50 gate):** milestone `kept-50` fired at any slider value above 0.90 in keep mode, so the reveal's 0.750 (keep 50% at 1.00) might not be a reached state. Now `kept-50` fires only at 1.00 in keep mode (`v === BEST && k`). A learner who presses "Keep 50% left" at e.g. 0.94 must drag to 1.00 (or press nothing else) before the reveal unlocks; from the start (0.90) the button still jumps to 1.00. Slider remains live in keep mode, so the 1.00 state is reachable.
- No claim text changed (c6 already quotes 1.00); version 3 -> 4. No claim status touched.
- QA: contract for the slug passes phone and desktop (10 passed); the 2 failures are the known feed "subject chips" spec on both viewports, not this lesson. Walkthrough (phone): step 3 shows Keep 50% at 1.00 (0.700 | 0.750), reveal quotes the same; all five frames checked, no new clipping beyond the known reveal-phase crop of the stage top.
