# Learner review: Mild preferences, sharp divides (boundary: no-schelling)

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

Version reviewed: walkthrough recorded 2026-10-14T08:41Z (phone, option 1 = "About 30%"), sheet.png seen (all 9 frames), Demo.tsx read for the branches the script does not show.

Boundary used (mine, chosen before reading the brief): knows percentages and what "neighbours" means; has never seen an agent-based simulation, a Schelling model, or the word "segregation" in a maths context. Reads a 40x40 dot grid as a picture, not as a rule.

## Findings (artifact only)

1. **Where it first asks for something I lack: the grid legend.** The rule line says "Hollow households have under 30% like neighbours". Before the grid is live I do not know what "hollow" looks like, which shapes are which group, or that shape and colour both encode group. Nothing on the card says brown = one group, teal = the other, hollow = would move. I worked it out from frame 02 (squares and circles, some hollow), but the stage text gives me the term before the picture that defines it.
2. **Answer not visible before predicting.** Good: the locked stage shows only a 50% start, no end state. The three options are plausible, and "About 30%" is a natural pick because 30% is the only number in the question. Note that the question text itself hands the learner the interpretation ("so it is happy as a minority on a street that is 70% the other group") which is what the reveal later calls the surprise, so the surprise is carried by the numbers, not by a hidden idea.
3. **Predict felt like a coin toss between 30 and 50.** I had no way to reason to 75 from the stated rule; the only route is "something must happen or the lesson would be dull". That is fine for a prediction card but note that 75 is reachable only by guessing the lesson's shape.
4. **Frame 02 contradicts my model of the rule.** At tick 0 it says "Happy 83%" with a 30% threshold on a random 50/50 mix. Nobody told me that about 17% start unhappy by chance. I had assumed at 50/50 everyone is already happy and nothing would happen, so I read "Happy 83%" as a bug for a moment. The first step then goes to 91% and 60% like neighbours, which is what taught me that unhappy households exist.
5. **The mechanism in the reveal is told, not shown.** "Each move changes other streets, unsettling happy households" is the whole explanation of why mild preferences produce sorting. In the run I saw the happy share rise 83 -> 91 -> 100. Nothing on the grid marks a household that was happy and later became unhappy; the happy count only goes up in my run. What I experienced contradicts the sentence, so I would not believe it from the lesson alone.
6. **"Sharp divides" versus the picture at 30%.** My own run (frame 04, 77%) looks like patchy clumps with plenty of mixing. The sharp blocks appear only at 50% and 70% (frames 07, 08). The title and reveal claim the 30% case, where the prediction was asked, produces a sharp divide; the picture I was asked about does not look sharp. 50% to 77% is a moderate rise, and I could not tell whether 77% is "a lot".
7. **Reveal quotes only states I reached.** It names my 30% run (50% to 77%, tick 13) and the other thresholds I tapped (52, 87, 98 with "still 2% unhappy at tick 60"). All five numbers match the frames I saw. That is the strongest part.
8. **The 10% chip is the best contrast** (52%, nothing happens) and makes the 30% result readable. The 70% chip is confusing against the opening line: "under 70% like neighbours" no longer sounds mild, and it does not settle (2% unhappy at tick 60). I read that as "the model is broken" until the reveal explained it in parentheses.
9. **Run/Step/chip controls worked and none was dead.** Chips after a finished run jump straight to the end state at the new threshold, so I never watched 50% or 70% unfold; I only saw the end picture. The learner can stop before seeing the process at all.
10. **Caveat line present and visible.** "A toy model: it shows what can happen, not what causes any real city's pattern." Good. The reveal still says "the city" in the hook and "city grid", which invites the real-city reading the caveat then denies.

Confidence: moderate. Findings 1, 4, 5, 6 are specific and reproducible from the frames.

## Verdict for the current version: **revise** (no fatal flaw found)

Top finding: the one sentence that carries the lesson's mechanism (finding 5) is told, and the run the learner watches does not show it; at the prediction's own 30% the picture (finding 6) is not visibly "sharp".

## After reading the brief

(see below)
