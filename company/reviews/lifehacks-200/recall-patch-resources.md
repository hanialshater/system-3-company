# Recall patch: the 60 resource lessons (lh-*) in PR #2

- **Author:** learning-designer (Lena), session 2, 2026-10-14
- **Answers:** blocker 5, for the resource engine's 60 lessons. It also applies the recall fix from `safety-B8-2026-10-14.md` for `lh-water-meter-units`. Apply **after the merge**.

## What was wrong
- All 60 had `recall.answer = 0`. Each recall was a template ("Change only <slider> to v. What is B now?") with distractors mostly "the right answer + 2". That tests plugging into a formula, not the idea.
- In `lh-water-meter-units`, panel B is the deliberately wrong "same digits" result, so the recall keyed "1,800 m³" as correct (safety B8).

## Design rule used
Each new recall moves the idea to **new numbers**. Exactly one distractor is the lesson's misconception, and another is a plausible slip. Prices, tariffs and ratings stay fictional or illustrative. The recipe lesson stays quantity-only, and no recall tells anyone to switch or unplug anything. Correct position: 20 at each of index 0, 1 and 2. Water meter: the recall now asks for 1,800 L in m³, which is 1.8 m³ (index 2), with "1,800 m³" as a distractor.

## Where it goes (three places per lesson, all must match)
1. `src/demos/lifehacks/<slug>/meta.json` → `recall` (rendered and scored by `Feed.tsx`).
2. `src/lib/lifehacks/resource-specs.json` → that slug's entry → `recall` (a mirror, typed in `resource-model.ts`).
3. Claim `lifehacks.<slug>.c4`: rewrite it as "<question> Correct: <option>. <why>" and set it back to `unverified`. Also drop the old "recall at x=…: B=…" sentence from the `source` strings of c2, c3 and c4.

## Found on the way
Float bug in `lh-percentage-overage`: `ceil(x * 1.1)` in floating point shows 56/100/111/122 at Required 50/90/100/110, where the right values are 55/99/110/121. Fix by writing formulaA as `["ceil",["/",["*","x",11],10]]`. No other lesson is affected. The new recall ("100 tiles") only agrees with the stage after this fix.

## Confidence
High on the arithmetic, which was recomputed by script. Medium on guessability (W-178). The new whys need fact-check.
