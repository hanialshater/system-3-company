# misconceptionStrength rubric (msr-v1) and 12 anchor lessons

owner: lesson-dims-owner (Anneke) · run: dims-b3-1016 · date: 2026-10-16 · board: W-1515 (step 1 of the plan) · batch item: B3 in company/personalization/batches/2026-10-16-batch-1.md
from: the draft scale in company/personalization/2026-10-16-misconception-strength-ratings-plan.md ("What is rated")
status: **rubric final for the pilot (msr-v1); anchors calibrated by one rater; agreement not yet measured** (personalization-eval measures it on its blind sample, not me)
consumer: `COMPOSER.surpriseGate` in company/personalization/model/model.ts (the gate stays shut until the eval's readout; this file opens nothing)

## 1. What the number means

`misconceptionStrength` (1 to 3) is **how strongly the lesson's stated `misconception` pulls the prediction of the learner the lesson is written for, on the predict card as served.**

Three words in that sentence carry the rubric:

- **stated:** the `misconception` field in meta.json. Not a misconception the rater thinks of. If the stated one is not what the predict card tempts, the lesson is rated on the stated one.
- **learner:** the meta.json `learner` profile (`knows` / `doesNotKnow`), not a generic adult and not an expert. Some lessons' `knows` names an earlier lesson. That prior knowledge counts.
- **as served:** the hook plus the predict card's question and options, as the walkthrough records them. Wording on the card that defuses the trap, such as a stated axis origin or a hint, lowers the pull. The concept's misconception in the abstract is not what is rated.

It is **not** difficulty, interest, lesson quality, concept level, or how surprising the reveal is to an expert. A question where a newcomer has no idea, and so would guess at random, is a **1**, however counter-intuitive the answer is.

## 2. The scale

| Level | Name | Rule (all conditions must hold) |
|---|---|---|
| **1** | weak | Any one of these holds: (a) no predict option (or set of options) expresses the stated misconception; (b) the target learner's guesses would split, with no option a clear majority; (c) the modal guess is the correct answer, because the card or the hook defuses the trap; (d) the misconception is a minor slip that the hook and card barely invite. |
| **2** | moderate | The misconception option is the modal pick: most target learners (judged as more than half) would choose it from the hook and card as written. Someone who has studied the general area would usually avoid it. |
| **3** | strong | Everything in 2 holds, **and** the hook states or directly invites the wrong answer, **and** the intuition is robust: a learner who has studied the general area (statistics for a probability lesson, programming for a cs lesson) but has not met this particular result would still fall for it. |

"Studied the general area" means the field, not this exact puzzle. Anyone who has seen the Monty Hall solution will get Monty Hall right. That does not make Monty Hall weak.

## 3. Procedure (one lesson, in this order)

1. `npm run walkthrough -- <slug>`. Read the transcript's hook and predict card (question and every option) **before** meta.json.
2. Read meta.json `misconception`, then `learner`. Read nothing else: not `recall`, `claims`, `evidence`, `objective`, any simulator output, composer weights or another rater's score.
3. **Map.** Which predict option or options express the stated misconception? If none does, rate **1** and stop. If several do (for example "faster" and "unchanged" both express "a new road never hurts"), treat them as one block.
4. **Modal pick.** For the `learner` profile, decide whether the block is a clear majority pick. If it is not, rate **1**.
5. **Robustness.** Rate **3** only if the hook invites the wrong answer directly and the intuition survives study of the general area (§2). Otherwise rate **2**.
6. **Ties.** When torn between two levels, record the **lower** level with `borderline: true` and name the competing level in the reason. Do not use halves.
7. Write the one-line reason. It names the option or options that carry the misconception and the condition that decided the level.

Calibration rule: before each rating session, reread the 12 anchors in §5. If a new lesson seems to sit above or below an anchor of the same level, say which anchor in the reason. This is the guard against drift.

## 4. Record (one per lesson)

```json
{ "slug": "base-rates", "domain": "probability", "misconceptionStrength": 3,
  "strengthSource": "dims-owner", "rubric": "msr-v1", "rater": "lesson-dims-owner:dims-b3-1016",
  "date": "2026-10-16", "borderline": false, "anchor": true,
  "reason": "…one line…" }
```

- `strengthSource` is always `"dims-owner"` for these ratings. `classifier` and `data` come later (plan steps 4 and 5).
- `rubric` lets a later rubric version (msr-v2) coexist without silent drift. A rating under one version is never mixed into an agreement readout for another.
- `rater` is role:run key, so an eval can separate raters and runs.
- **Where they live:** in the derived dims index, **never in meta.json** (org proposal T6). W-1498's location review is pending (principal-engineer tier review). Until it rules, the ratings live under company/personalization/dims/. The 12 anchors are in company/personalization/dims/2026-10-16-misconception-strength-anchors.json in the shape above. If W-1498 places the index elsewhere, the file moves and its contents stay the same.

## 5. The 12 anchors (4 per level)

Rater: lesson-dims-owner:dims-b3-1016. Each anchor was read through the learner walkthrough (artifacts/walkthroughs/<slug>/transcript.md, regenerated by `npm run walkthrough -- <slug>`, not committed), then `misconception` and `learner`. The reasons quote the options as served.

### Level 3, strong

| slug | domain | reason |
|---|---|---|
| base-rates | probability | The hook states the wrong answer ("99% accurate. So you're 99% likely to be sick"). "About 99%" is the first option, and neglecting the base rate survives a statistics course. |
| better-in-every-group-worse-overall | probability | The card shows A winning both subgroups (93 vs 87, 73 vs 69), which makes "A" overall the near-universal pick. The subgroup-to-whole inference also fools learners trained in statistics who have not met Simpson's reversal. |
| bus-wait-longer-than-half | probability | "5 minutes" (half the gap) is the obvious arithmetic for anyone who knows averages. The hook frames the question so that halving looks natural, and the inspection effect fools people trained in probability. |
| new-road-slower-trip | cs | "About 40 min" and "65 min, unchanged" together express "a free road never hurts", and both precede the true answer. The intuition that more capacity cannot slow everyone is robust even among people who know shortest paths. |

### Level 2, moderate

| slug | domain | reason |
|---|---|---|
| two-writers-one-counter | cs | "2" is the modal pick for a learner who knows only that a variable holds a value. The card spells out the interleaving (A reads, B reads, A writes, B writes), so anyone with any concurrency exposure gets 1. That makes it moderate, not robust. |
| two-names-one-list | cs | For the stated learner (knows only assignment), "[1, 2]" is the modal pick because b = a reads as a copy. Any programmer who has met mutable lists avoids it. |
| four-rolls-one-six | probability | The hook primes adding 1/6 four times, so "about 67%" is the modal pick. Learners who have met the complement rule avoid it, and the 33% option draws off some newcomers. |
| odds-three-to-one | probability | "33%" (reading 3 to 1 as one in three) is the modal pick for a learner who does not know odds notation. Anyone who has met odds gets 25%, and "75%" pulls a minority. |

### Level 1, weak

| slug | domain | reason |
|---|---|---|
| clear-the-lowest-one | cs | The misconception ("subtract 1 changes only the last digit") is not any of the options (5 / 3 / 2 repeats). The learner has no intuition for x & (x-1), so the guesses split three ways (condition a/b). |
| cut-the-busiest-link | cs | "12, the same" expresses the misconception, but the modal guess is "24": with one of two links cut, the other obviously carries all the traffic. The card defuses the trap, so the modal pick is correct (condition c). |
| jackpot-once-a-week | probability | The misconception ("a lifetime of weekly tickets gives a real chance") is on no option, because all three answers are thousands of years or more. The guess splits by order of magnitude (condition a/b). |
| where-the-axis-starts | probability | "About 1.1 times" expresses the misconception, but the card states that the axis starts at 50%, so most learners compute 6/2 = 3. The wording defuses the trap (condition c). |

Coverage of the anchors: 7 probability and 5 cs. Level 3 has only one cs anchor because, of the cs candidates I walked through, only one met the robustness condition. A thin cs top level is the rubric working as intended, not a gap to fill.

## 6. What I read, and the limits

- **Walkthrough worked.** `npm run walkthrough` started its own `next start` from the existing build. I walked through 41 candidate lessons and chose the 12 anchors from them. The candidates were picked by scanning the `hook` and `misconception` of all 230 pilot lessons (published + review: probability 77, cs 153), the same set `catalog.mjs` loads. **I recorded no level for the other 29 candidates or the remaining lessons.** Rating them is step 1b (C3), which is conditional.
- The walkthrough always chooses option 1, so I read the exploration and reveal only for that path. The rating uses the hook and the predict card, and both are complete in every transcript.
- I did not open Demo.tsx. The walkthrough shows the predict card as served, which is what the rubric rates.
- Every judgment of what "most target learners would pick" is one rater's model of a learner, not data. Phase B's aggregate wrong-prediction rate (`strengthSource: "data"`, W-1495 / W-706) is the real measure, and these ratings are a noisy proxy for it.
- I did not read recall results, simulator output, composer weights or anyone's ratings. I did not open the catalog placeholder values. I read `catalog.mjs` only for its set definition.
- One rater. I do not score my own agreement. **For personalization-eval:** the 12 anchors and their levels are public by design, so a blind second rating should draw its 20% sample from the non-anchor lessons, or report anchors separately.

## 7. Next

- **Step 1b (C3):** rate the remaining pilot lessons under msr-v1. This runs only if the batch's C3 condition is met (vp-personalization decides how to read B2's split between hypercorrection and the surprise term; see the B2 memo §1c). W-1515 stays with lesson-dims-owner and is on hold until then.
- **personalization-eval:** blind second rating of 20% after 1b (a separate dispatch), plus the agreement readout. Below its bar, this rubric becomes msr-v2 and the sample is re-rated.
