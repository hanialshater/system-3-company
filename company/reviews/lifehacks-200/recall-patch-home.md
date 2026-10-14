# Recall patch: the 70 home lessons in PR #2

- **Author:** learning-designer (Lena), session 2, 2026-10-14
- **Answers:** blocker 5 in `company/engineering/community/prs/2.md` §4, for the 70 lessons in `src/lib/lifehacks/home-lessons.ts`.
- **Patch:** `recall-patch-home.json` (70 entries). Apply it **after the merge**. The source is untrusted PR data. I read it only with `git show origin/codex/lifehacks-200:<path>`, and I did not check out or run it.

## What was wrong (home lessons only)

- 68 of the 70 had `recall.answer = 0`. The other two were `towel-spread-dries-first` (2) and `square-bow-stays-tied` (1).
- **63 of the 70 shared one option set** ("Check the mechanism and its stated constraints" / "Assume the layout always works" / "Ignore the stated inputs"). You could answer all of them without seeing the lesson.
- The other 7 were real transfer items: towel, wobbly table, bow, cord, laundry trips, ruler, alphabet. I kept or tightened 5 of them and repositioned their answers. `towel-spread-dries-first` is unchanged. The bow and cord items got new wording because one weak distractor gave the answer away, or because the correct option was the only hedged one.

## Design rule used (same as the study share)

- **Transfer, not repeat.** Each recall puts the lesson's idea into new numbers or a new object, for example 38 cm + 2 × 4 cm handles, 5 compartments, 127 cm to inches, or a 4:3 photo in a square frame. Where the idea is a model (area, moment, envelope, count), the learner has to do the lesson's own arithmetic.
- **Three options.** One distractor is the lesson's losing prediction (the misconception, e.g. "same cloth, same area", "volume too large", "a tidy pile is enough"). The other is a plausible slip, such as a single wall instead of two, height counted once, or 2.5 instead of 2.54.
- **Correct position:** 23 at index 0, 23 at 1 and 24 at 2. Numeric options are not kept in sorted order.
- **Length cue:** the correct option is strictly the longest in 3 of 70 and strictly the shortest in 11 of 70. I lengthened distractors where the correct option had stood out (bow, cord, humidity, care label, cables, loop, lids, pressure, keys).
- **Scope kept.** The whys stay inside each lesson's stated limits: no drying times, no safe loads, no ergonomic or carrier rules. Stipulated numbers are labelled as examples.

## Where it goes

1. `src/demos/lifehacks/<slug>/meta.json` → `recall` (question, options, answer, why). That is the rendered and scored copy (`Feed.tsx`). The `recall` string in `home-lessons.ts` is not rendered (`HomeLesson.tsx` uses only question, choices and answer, for the prediction), so leave the lib unchanged. Its stale text is a drift risk for the principal engineer's lib-vs-claims decision.
2. **Claims.** Each entry has a `claim` (`id: lifehacks.<slug>.recall`, text = the why, `status: unverified`). Add it to `claims`. Five use `support: source` with the lesson's existing citation: wobbly-table-quarter-turn, square-bow-stays-tied, long-cord-knots-itself, humidity-evaporation-gap and cm-to-inches. The rest are `derivation`. **Delete** the old recall claims named in `where` (the `c5` of towel-spread-dries-first, wobbly-table-quarter-turn, square-bow-stays-tied, long-cord-knots-itself, laundry-sort-before-walk and ruler-start-not-zero).
3. **Tests.** `tests/lifehacks/study.test.mjs` asserts that `alphabet-sort-search`'s keyed option is `'Put labels in alphabetical order'`. I kept that text, so the test still passes. `home.test.mjs` has no recall assertions.

## Confidence

- **High** on arithmetic and positions. The counts were checked by script, and each derivation is written out in its why. One number is approximate: in `measure-diagonal-for-square` the diagonals are "about 104 and 96 cm" (the exact pair satisfies d1² + d2² = 20000).
- **Medium** on guessability. I designed against it but have not seen it on the artifact. The learner evaluator (W-178) should confirm it.
- **Fact-check needed** on all 70 new claims (fact-checker).
