# Recall patch: the 70 study lessons in PR #2

- **Author:** learning-designer (Lena), session 2, 2026-10-14. Apply **after the merge**.

## What was wrong
- All 70 had `recall.answer = 0`.
- In 68 of the 70, the recall was the **prediction question copied word for word**, mostly with two options, so it re-asked the card at 50% chance. The exceptions were `apply-not-quote` and `calendar-needs-travel`, which were real transfer items but were still keyed at 0.

## Design rule used
- Transfer to a new situation. For timed or counted ideas the learner has to do the lesson's arithmetic.
- Three options: one misconception, one plausible slip.
- Correct position: 23 at index 0, 24 at 1, 23 at 2 (seeded shuffle). The correct option is the longest (ties included) in 34 of 70. Three items still stand out on length: `keep-the-error-feedback`, `search-the-document-body` and `status-and-blocker-differ`. The learner evaluator should look at those.
- Nothing promises a memory or productivity gain. App-dependent behaviour is flagged (paste, undo, focus, trash).

## Where it goes
1. `src/demos/lifehacks/<slug>/meta.json` → `recall` (the only copy). **Leave `studyCatalog.ts` unchanged**, because it drives the prediction, not the recall.
2. **Claims.** Add `lifehacks.<slug>.recall` (text = the why, `status: unverified`). These use `support: source` with the existing citation: `spaced-beats-cram`, `mail-exact-phrase`, `mail-minus-noise` and `deleted-is-a-search-state`. **Delete** `lifehacks.apply-not-quote.c4` and `lifehacks.calendar-needs-travel.c4`.
3. **The test will break.** `tests/lifehacks/study.test.mjs` ("fresh recall transfer…") needs updating: `apply-not-quote` → `'3, 8, 12'` (and `[12,3,8]` sorted), and `calendar-needs-travel` → `'10:00–10:05'` (10:30 − 25 min = 10:05).

## Confidence
High on arithmetic and positions, medium on guessability (W-178). All 70 new claims need fact-check; the 4 Gmail and Drive ones cite pages that were unreachable here.
