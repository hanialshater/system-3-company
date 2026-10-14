*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r7): hawks-never-take-over
lesson version: v2
boundary: adult-beginner (same tag as r6). Knows aggressive and peaceful strategies, and that fitness comes from an animal's meetings. Does not know that the population settles where hawks and doves score equally, at V/C (here 2/3), from any start.
Screenshots seen: yes (artifacts/walkthroughs/hawks-never-take-over/sheet.png, 5 frames, build 4 at localhost:3480)
Verdict: launch

## Findings (written from the walkthrough before reading the brief or the r6 review)

Walked as an adult who can read a small payoff table and average two numbers, and has never heard of evolutionary game theory or an evolutionarily stable mix.

1. **No answer before the commit.** The locked stage shows the payoff table (hawk −1 / 4, dove 0 / 2), the line explaining −1, and an empty chart marked "?". The options cover the real intuitions (hawks take over / 67 / 33 / stays where it starts). The answer can in principle be derived from the table, but nothing points to it. The 67 / 33 pair keeps "a precise number" from singling out the answer.
2. **The why is on the stage.** "Start at 10%" draws a curve rising to 67%, with the caption "At 10% hawks: hawk 3.5, dove 1.8. Hawks grow." "Start at 90%" falls to the same line: "hawk −0.5, dove 0.2. Hawks shrink." The readout "SCORES THERE (HAWK, DOVE) 0.7, 0.7" shows that the resting point is where the two scores are equal. Earlier runs stay as dashed traces, so I see two curves meet. Rare rarity-advantage made visible.
3. **"Offspring = 10 + score"** is unexplained: why 10? A beginner may stop on it. It is harmless, but it is a stage sentence that does not serve the idea.
4. **Stage text is near or over the budget.** The table, the "Two hawks: win 4 or lose 6, so (4 − 6) ÷ 2 = −1. Offspring = 10 + score." line, the caption and the readouts are all on screen at once (about 35 words). The type on the formula line is small.
5. **The reveal quotes what I saw.** It quotes "from 10% and from 92%" (my current slider and my first run), "67% and 67%" and the scores. The dashed traces and readouts are still on the stage. "prize ÷ cost = 4 ÷ 6 = 2/3" is a one-line generalisation of the equal-scores point I watched. The toy-model disclaimer is good.
6. The reveal says "from 92%", not the 90% preset I also ran. That is accurate, just slightly odd.

What the prediction felt like: "Nearly 100% hawks" was my gut (fighters win), and both curves bending to the same line answered it directly.

Verdict reasoning: a first-time learner sees hawks grow when rare, shrink when common, and stop where the scores tie, all on one chart.

## Earlier findings (r6), checked after the findings above were written

1. Blocking: the title and hook ruled out 100% hawks, and one option was oddly exact: **fixed.** The title is now "Hawks and doves: who wins?", the hook is neutral, and the four options are at matched precision (67 and 33 both numbered).
2. Chart cropped on the reveal: **not fixed.** Only the top of the chart (the 67% end) shows above the readouts. The readouts carry the quoted values.
3. Derive the −1 on stage: **fixed.** "Two hawks: win 4 or lose 6, so (4 − 6) ÷ 2 = −1."

## Verdict

Launch. The predict step no longer leaks, and the three causes (grow when rare, shrink when common, rest where the scores tie) are each on the stage. Polish, not blockers: the "10 + score" line, the stage word count, and the reveal crop.
