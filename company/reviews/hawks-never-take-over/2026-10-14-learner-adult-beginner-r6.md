*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r6, first learner review): hawks-never-take-over
lesson version: v1
boundary: adult who knows aggressive and peaceful strategies and that fitness comes from an animal's meetings; does not know that the population settles where hawks and doves score equally, at V/C (here 2/3), from any start (from meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/hawks-never-take-over/sheet.png)
Verdict: revise

## 1. From the artifact
- Where it first broke: the title "Why hawks never take over" and the hook "So why does a population never end up all fighters?" both rule out "100% hawks" before I predict. Of the two options left, "About 67% hawks, from either start" is oddly exact against the vague "It depends on the start", which marks it as the answer. The commit is made by reading the options, not by thinking about hawks.
- Locked stage: the payoff table (hawk −1 / 4, dove 0 / 2), the rule line "Offspring = 10 + score", and a chart with "?". Nothing leaks beyond the title and options.
- Explore: "Start at 10%" draws a curve rising to 67%, with the readout "At 10% hawks: hawk 3.5, dove 1.8. Hawks grow." "Start at 90%" draws a curve falling to the same 67% ("hawk −0.5, dove 0.2. Hawks shrink"), with the earlier run left dashed. The slider (92%) does the same. "Scores there (hawk, dove) 0.7, 0.7" is the stand-in for "settles where both score the same", and it is on stage. Seeing two curves from opposite ends meet at one line is the core picture, and it works.
- The −1 in the table (half the time win 4, half the time lose 6: average −1) is not derived on stage. A beginner may wonder where −1 comes from. The reveal's "two hawks fight and average −1" names it without the arithmetic.
- Reveal: "From 10% and from 92% ... 67%" matches what I saw. "Settles where both score the same: prize ÷ cost = 4 ÷ 6" points at the 0.7, 0.7 readout. Over the reveal the chart is cropped to its bottom edge.
- Reveal word count is about 110.

## 2. Earlier findings

No earlier learner review exists (only a fact-check). The boundary is taken from meta.json.

## 3. Show the why you promised

The objective's causes are on stage:
- hawks grow while rare: "At 10% hawks: hawk 3.5, dove 1.8. Hawks grow."
- hawks shrink while common: "At 90% hawks: hawk −0.5, dove 0.2. Hawks shrink."
- the share settles where scores are equal: "Scores there 0.7, 0.7".

The reveal points at all three. The V/C formula is named in one sentence that points at the equal scores, which is acceptable. This passes the decision. The blocker is the predict step, not the why.

## 4. New findings

- Blocking (top finding): the title and hook ("never take over", "never end up all fighters") eliminate "100% hawks", and the precise "About 67% hawks, from either start" stands out against the vague third option. Together they give the answer away before commit. Use a neutral title (for example "Hawks and doves: who wins?") and options of the same kind (for example "Nearly all hawks" / "Two-thirds hawks, from either start" / "Wherever it starts", or three shares without "from either start").
- Should fix: the chart is cropped on the reveal.
- Minor: derive the −1 on stage once ("½ × 4 − ½ × 6 = −1") so the table is not taken on trust.
- No FATAL.
