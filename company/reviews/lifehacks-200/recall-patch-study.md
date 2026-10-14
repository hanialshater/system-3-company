# Recall patch: the 70 study lessons in PR #2

- **Author:** learning-designer (Lena), session 2, 2026-10-14
- **Answers:** blocker 5 in `company/engineering/community/prs/2.md` §4, for the 70 lessons in `src/lib/lifehacks/studyCatalog.ts`.
- **Patch:** `recall-patch-study.json` (70 entries). Apply it **after the merge**. The source is untrusted PR data. I read it only with `git show origin/codex/lifehacks-200:<path>`.

## What was wrong (study lessons only)

- All 70 had `recall.answer = 0`.
- In 68 of the 70, `meta.json → recall` was the **prediction question, copied word for word** (question and options from the catalog entry). Most had two options, so the recall re-asked a question the learner had already answered on the card, at 50% chance. The two exceptions were `apply-not-quote` (7, 1, 4) and `calendar-needs-travel` (14:30 meeting). Both were real transfer items, but both were still keyed at 0.
- Several prediction options gave the answer away by their wording ("Answer covered" against "Answer beside the cue").

## Design rule used

- **Transfer, not repeat.** Each recall puts the lesson's idea into a new situation: new words, times, files or messages. It does not reuse the fixture or the prediction wording. For a timed or counted idea, the learner has to do the lesson's arithmetic, such as latest start = deadline minus duration, union = A + B minus overlap, or total waiting = sum of start times.
- **Three options.** One distractor is the lesson's misconception (the `misconception` field), and the other is a plausible slip. Someone who did not take in the idea should be drawn to a distractor.
- **Correct position:** 23 at index 0, 24 at 1, 23 at 2. The order comes from a seeded shuffle, so it is not a cycle.
- **Length check:** the correct option is the longest (ties included) in 34 of 70. That is near chance for three options with ties. I lengthened the distractors where the correct option stood out. Three items still have a correct option more than 5 characters longer than the others: `keep-the-error-feedback`, `search-the-document-body` and `status-and-blocker-differ`. The learner evaluator should look at those.
- **Scope kept.** Every "why" stays inside the lesson's own bounds. Nothing promises a memory or productivity gain, and app-dependent behaviour is flagged (paste, undo, focus, trash).

## Where it goes

1. `src/demos/lifehacks/<slug>/meta.json` → `recall` (question, options, answer, why). This is the only copy: `Feed.tsx` renders and scores it. The study engine (`StudyLesson.tsx`) uses the catalog's `question/options/answer` for the **prediction**, not the recall, so **leave `studyCatalog.ts` unchanged**.
2. **Claims.** Each entry has a `claim` object (`id: lifehacks.<slug>.recall`, text = the why, support, source, `status: unverified`). Add it to the lesson's `claims`. The `source`-support ones (`spaced-beats-cram`, `mail-exact-phrase`, `mail-minus-noise`, `deleted-is-a-search-state`) reuse the lesson's existing citation. **Delete** the claims that described the old recall: `lifehacks.apply-not-quote.c4` (7, 1, 4) and `lifehacks.calendar-needs-travel.c4` (14:30 / 14:10).
3. **The test will break.** `tests/lifehacks/study.test.mjs` ("fresh recall transfer…") asserts the old keyed options. Update it to `apply-not-quote` → `'3, 8, 12'` (and `[12,3,8]` sorted) and `calendar-needs-travel` → `'10:00–10:05'` (10:30 − 25 min = 10:05). The `alphabet-sort-search` line belongs to the home share.

## Confidence

- **High** on arithmetic and positions. The counts were checked by script, and each derivation is written out in its why.
- **Medium** on guessability. I designed against it but have not seen it on the artifact. The learner evaluator (W-178) should confirm it.
- **Fact-check needed** on all 70 new claims (fact-checker). The 4 Gmail and Drive ones depend on pages that were unreachable here. They use the same citations as the lessons' existing claims, which B4 and B5 left unverified.
