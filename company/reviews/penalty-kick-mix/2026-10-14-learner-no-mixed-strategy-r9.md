*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r9, batch B): penalty-kick-mix
lesson version: v4
boundary: no-mixed-strategy (meta.json learner: knows a goalkeeper must guess a side before the kick and that a probability such as 0.9 means 9 times in 10; does not know that in a mixed equilibrium your mix is set by what makes the other side indifferent, or that improving your own weapon can make you use it less). Same tag as the "final" review.
Screenshots seen: yes (artifacts/walkthroughs/penalty-kick-mix/sheet.png, 5 frames, fresh release-build walkthrough 2026-10-14 15:26; 05-reveal.png checked)
Phone fit (tools/reveal-fit.mjs, 390x844, http://localhost:3561): crop 46 px, hidden below 0 px, 95 reveal words, named labels hidden 1 ("dives left"), phoneFit false.
Verdict: revise

## 1. From the artifact (written before reading build.md or today's demo crit)

Path walked: chose "More than 50%"; Left-shot score slider to 0.94; Perfect left shot; Keep 50% left; opened reveal.

- **Where the idea first runs out:** the question, before anything moves. "He mixes sides so the keeper can't guess: 50% left is best" asks this boundary to accept a mixed strategy and its optimum as a premise; nothing on the stage shows why 50/50 is best at 0.90 (carried from the earlier reviews, acceptable because the gap is the change, not the premise). The question is also about 50 words, long for a phone predict card.
- **No answer before the commit: pass.** More / Still / Less than 50%; the natural guess ("More") is the wrong one. Locked stage shows 50/50 and 0.700 only.
- **Show the why: pass during explore.** The slider moves the kicker bar down (47.6%, 44.4%) and the keeper bar up (52.4%, 55.6%) with "Keeper left 0.722 = right 0.722". "Keep 50% left" then shows "Keeper left 0.700 | right 0.750" and the keeper at 100%: the keeper takes the cheaper dive, so 50% gains nothing. The mechanism is on the stage.
- **Reveal quotes what you saw: fail (revise).** The reveal's second sentence names 44.4%, 55.6% and 0.722. When the reveal opens after the suggested path (the panel says "Then try keeping 50% left"), the stage is in keep-50 mode: kicker 50.0%, keeper 100.0%, "Keeper left 0.700 | right 0.750". No row, trace or readout on screen shows 44.4 / 55.6 / 0.722. The learner saw those numbers one step earlier, but the rule asks the quoted state to still be visible when the reveal opens. The reveal's third sentence ("at the best mixes either dive concedes 0.722") also points at a state that is not on screen.
- **Reveal fits with its picture: fail (revise).** Crop 46 px: the "Scoring 0.700" readout and the "Dives left / Dives right" column headers are above the screen. The reveal argues "a left dive holds him to 0.700 but a right dive lets him have 0.750", so the column names are exactly what the learner needs to read the table; without them the 2x2 is four unlabelled numbers with row labels only.
- **Text budget: fail.** 95 words with the model line, over 90 on a new version.
- Carried (minor): nothing on the stage says the keeper's 100% in keep-50 mode is a best reply; and "=" vs "|" is the only cue for "indifferent" vs "not", unlabelled.

## 2. Earlier findings ("final" review)

1. Why 50% is best at the start: **not fixed** (told premise; acceptable).
2. Keeper's 100% unexplained as a best reply: **not fixed** (minor).
3. "=" vs "|" cue easy to miss: **not fixed** (minor).
4. Reveal stage cropped at the table top (then treated as a kit issue): **not fixed**, and now judged under the phone-fit rule: crop 46 px with the column headers hidden.

## 3. Findings

1. **Revise (top):** at 390x844 the open reveal crops the stage top (Scoring readout and "Dives left / Dives right" headers, 46 px) and is 95 words.
2. **Revise:** the reveal quotes the best-mix state (44.4% / 55.6% / 0.722) but the stage at reveal shows the keep-50 state only; the quoted state is on no row or readout.
3. Minor: keeper's 100% not marked as a best reply; "=" / "|" unlabelled; the predict question is about 50 words.
- No FATAL.

## 4. After reading build.md and today's demo crit

- Build.md's latest section (Revision v4) is the kept-50 gate fix; it has no Pre-flight item 7, and it calls the reveal-phase stage-top crop "known". It is not answered: the release build measures 46 px with "Dives left" hidden.
- Demo crit (company/rituals/records/2026-10-14-demo-crit.md, pair 4, and company/reviews/penalty-kick-mix/2026-10-14-pairwise.md): it found a 44-word question, an unreadable predict-frame table, and scores written as decimals (0.722). **I agree** on the question length (I counted about 50 words). **I partly agree** on the predict frame: the locked table, bars and "=" lines are drawn at about two thirds of their explore size. Measured from 01-predict.png, the row labels and the "Keeper left 0.700 = right 0.700" lines are about 9-10 CSS px, at the 10 px label floor in company/design/system.md, and the cell numbers about 12 px. Small and dense, but not unreadable at 390 px. I add it as a should fix, not a revise: **at predict, the table the question describes is drawn at the label floor.** On decimals as scores I agree, as a should fix: this boundary knows 0.9 means 9 in 10, but reading "scores 0.722" as "scores 72% of the time" is still a step. The crit did not raise the reveal-phase crop or the quoted best-mix state missing from the reveal stage (my findings 1 and 2); they stand on their own.
- Verdict unchanged: revise.
