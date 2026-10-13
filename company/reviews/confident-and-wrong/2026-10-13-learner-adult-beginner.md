*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: confident-and-wrong
lesson version: vNN
boundary: an adult with school-level maths and science, new to the topic (knows probability as percent; has heard "AI is confidently wrong"; has not necessarily met ln or loss functions). Screenshots seen (sheet.png, all 5 frames).

## 1. From the artifact

- Prediction: the stem defines "Penalty = −ln(chance the model gave the true answer)" and gives one data point (50% costs 0.69). A school-level adult may know ln as a button but not as a curve, and the guess between 1.4 (double the cost, "twice as sure, twice as bad"), 4.6 and 50 is a blind pick: nothing lets the learner derive 4.6 without a calculator. The hook ("Two models miss the same answer. One hedged, one was nearly certain. Same penalty?") leaks that the penalties differ.
- The locked stage shows an empty axis ("Penalty curve, hidden"), a dot at 50%, and a readout 0.69. Good: no answer on show.
- Where understanding first broke: the reveal's "Every halving of the chance adds the same 0.69. 50% is one halving away from certainty; 1% is about 6.6." The stage shows 50%, 10%, 3%, 1% and the curve, but never a halving sequence (50, 25, 12.5, ...). "One halving away from certainty" is told, and it reads oddly (halving from 100% is 50%, but a beginner will wonder why).
- What was SHOWN is strong: the 10% and 1% buttons move the dot up the curve, the readout "× the 50% penalty" (3.3, then 6.6) makes the multiplication visible, and the steep left edge is visible on the chart. The slider moved to 3% gave 3.51 and 5.1.
- Told not shown: "Pushed toward 0%, the penalty has no ceiling." The slider stops at 1% (nothing past it), so a ceiling is never tested.
- AI claim: "Models trained to make this penalty small are punished far more for being confidently wrong than for hedging" is a statement about real training (cross-entropy loss), made as fact from one curve. The stage is labelled "ONE EXAMPLE" and the penalty is declared in the stem as the model's penalty, so it is mostly bounded, but the reveal does not say real models use this particular penalty among others.
- Reveal earned: 4.6 yes (the number 4.61 appears on the stage); the halving rule and no ceiling are told.
- Problems: (1) "-ln" undefined; the prediction is unanswerable by reasoning; (2) halving rule and "no ceiling" told; (3) real-training claim stated flat; (4) hook leaks.
- No FATAL.
