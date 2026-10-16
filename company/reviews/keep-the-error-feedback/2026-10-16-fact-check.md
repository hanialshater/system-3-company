# Fact-check: keep-the-error-feedback

Independent claim checks for src/demos/lifehacks/keep-the-error-feedback. Newest pass at the bottom.

## Pass 52 (2026-10-16, W-1144)

Checker: fact-checker, a fresh instance. I did not write, build or record any of the claims checked here. Scope: W-1144: the claims demo-builder reset or added in the lh-study merge (e8e116a: templates TP-3/TP-4/TP-5/TP-8, waves W1 and W9). Method: I read the rendering code first (StudyLesson.tsx, RetrievalLesson.tsx, src/lib/lifehacks/studyModels.ts, studyStages.ts, studyRecall.ts and this lesson's studyCatalog.ts spec), then ran copies of the engine in node (scratchpad fc52/scripts/sim.mts, dump.mts) to print the reveal sentence and readouts at the start layout, after Swap first / the stage button, and at the target. Claim texts were compared with that output; I read build.md only after the verdicts were written. No build, server or screenshot.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Matches studyCatalog: hook, question 'Which lets you fix it next time?', options Either / 'Only the marked item', answer 1. The marks name digit 2; the count does not. |
| c4 | verified | Own run matches: code 4·9·2, attempt indices [0,0,0] = 4·7·2, tries 3; Count only 'Feedback' line '3 tries · still locked'; Mark each digit: ✗ on digit 2 only; choices (4,1,6; 7,9,1; 2,5,8); Try again adds a try and is disabled once open; reveal sentences as quoted. |
| c3 | disputed | Not every displayed result follows the visible state. After 'Try again', the caption, cards and feedback line show the new try (e.g. '4 tries · open · ✓ ✓ ✓'), but the two chips stay on the stipulated first try: 'Count only' prints r.tries (always '3 tries') and 'Marked' prints markAttempt(r, r.attempt) (always '1 wrong') (RetrievalLesson.tsx FeedbackStage, Chips). So the stage shows '3 tries' and '4 tries · open' at once. Fix (demo-builder): label the chips as the first try ('First try: 3 tries', 'First try: 1 wrong'), or compute them from st.tries / st.tried. Re-check after the change. |

**Result (Pass 52):** 2 verified, 1 disputed, 0 held unverified, 0 withdrawn.
