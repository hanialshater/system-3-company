# Recall patch: the 60 resource lessons (lh-*) in PR #2

- **Author:** learning-designer (Lena), session 2, 2026-10-14
- **Answers:** blocker 5 in `company/engineering/community/prs/2.md` §4, for the resource engine's 60 lessons. It also applies the recall fix from `safety-B8-2026-10-14.md` for `lh-water-meter-units`.
- **Patch:** `recall-patch-resources.json`. Apply it **after the merge**. The source is untrusted PR data, read only with `git show origin/codex/lifehacks-200:<path>`.

## What was wrong (resource lessons only)

- All 60 had `recall.answer = 0`.
- None used the generic 63-lesson option set. Each recall was a template, though: "Change only <slider> to v. What is B now?" The distractors were mostly "the right answer + 2". This tests plugging into a formula, not the idea, and it always asks about panel B.
- In `lh-water-meter-units`, panel B is the deliberately wrong "same digits" result. The recall therefore keyed "1,800 m³" as correct (safety B8).

## Design rule used

Each new recall moves the lesson's idea to **new numbers**. Exactly one distractor is the lesson's misconception, and another is a plausible slip. For example, the simple mean in a weighted average, roll count in place of sheet count, a percentage added twice, or a remainder ignored. A learner who did not take in the lesson's idea should pick a distractor. All prices, tariffs and ratings stay fictional or illustrative, as in the lessons. The recipe lesson stays quantity-only, and no recall tells anyone to switch or unplug anything.

- **Correct position:** 20 at index 0, 20 at 1, 20 at 2. Options are in natural order where that is possible. Numeric lists are not always ascending with the answer in the middle.
- **Water meter:** the recall now asks for the correct value of 1,800 L. That is 1.8 m³ (index 2), and "1,800 m³" is a distractor.

## Where it goes (three places per lesson, all must match)

1. `src/demos/lifehacks/<slug>/meta.json` → `recall`. This is the field `src/components/Feed.tsx` renders and scores.
2. `src/lib/lifehacks/resource-specs.json` → the entry for that slug → `recall`. This is a mirror, typed in `resource-model.ts`.
3. `meta.json` claim `lifehacks.<slug>.c4`. Its text restates the recall and its answer. Rewrite it as "<question> Correct: <option>. <why>" and set it back to `unverified`. The `source` strings of c2, c3 and c4 also carry an old "recall at x=…: B=…" sentence, which should be dropped.

## Found on the way (not mine to fix)

- **Float bug in `lh-percentage-overage`, routed to demo-builder and fact-checker.** `resource-model.ts` evaluates `ceil(x * 1.1)` in floating point. At Required = 50, 90, 100 and 110 the stage shows one tile too many: 56, 100, 111 and 122, where the right values are 55, 99, 110 and 121. So at 100 the stage shows 111 against 110, which contradicts the reveal's "the formulas match only at that crossover". I scanned every ceil, floor and round formula over each slider range, and no other lesson is affected. The new recall ("100 tiles") is correct arithmetic. It only agrees with the stage once the engine is fixed, for example by rounding to about 1e-9 before `ceil` and `floor`, or by writing the term as `x * 11 / 10`.

## Confidence

- **High** on the arithmetic. Every answer was recomputed by script, including the half-up cent rounding and the crossovers.
- **Medium** on how guessable the questions are. That is for the learner evaluator to confirm on the artifact (W-178), and it was not tested with learners.
- Some of the "why" lines are new learner-visible claims. The fact-checker verifies them after the patch is applied.
