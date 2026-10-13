*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: attention-shares-one
lesson version: vNN
boundary: an adult with school-level maths and science, new to the topic (has heard "AI pays attention to words"; knows percentages and angles; has never met dot products or softmax). Screenshots seen (sheet.png, all 3 frames).

## 1. From the artifact

- Prediction: the stem ("Scores are the dot products with unit arrows; weights come from softmax") uses two terms a school-level adult has not met, before any definition. The learner cannot compute 100% vs 45% vs 33%; this is a pure guess dressed as a prediction, and 33% is "three words, so a third". The hook ("Does that word get all the attention?") invites "no", which leaks the shape of the answer.
- The locked stage shows three coloured arrows labelled A, B, C, a dashed query arrow and an empty bar. It does not show the 45% query shares; the A's share readout shows "?".
- Where understanding first broke: the explore step. The learner moves the slider once to 55 degrees (not the 0 degrees the panel asks for) and the stage reads A 38.5%, B 49.2%, C 12.2%, total 100%. The reveal then states results at 45 degrees (A 44.6, B 44.6, C 10.8, with scores 0.71, 0.71, -0.71) and at 0 degrees (66.5%). None of these were on the stage in what I saw; they appear for the first time in the reveal. "Show me why" lit after one nudge.
- Terms: "softmax" is named in the question and again in the reveal and never explained; "blend arrow" appears as a legend (red) and in the reveal, meaning the weighted average, which the learner has to take on faith. Why C (pointing away) still gets a slice is told ("even C keeps a slice"), not shown, apart from the 12.2% on the bar.
- What was SHOWN works for one point: the stacked bar always fills the whole width and trades share between A, B, C as the slider moves, which makes "fixed pie" visible and would be convincing if the learner drags a lot.
- Real-AI line: A, B, C are arrows, not words, so the connection to real attention (words in a sentence) is a leap. The last line says real transformers use softmax(QKᵀ/√d)·V and that this toy skips scaling: honest. But "what attention passes on" for the blend arrow is stated as a fact about the real thing without any picture of words.
- Reveal earned: 45% partly (the learner can see shares are not 100%); the numbers and the term softmax are not earned.
- Problems: (1) two undefined terms in the stem; (2) reveal numbers never on stage; (3) a single slider nudge unlocks the reveal; (4) "words" are arrows; (5) the hook leaks the "not all" answer.
- No FATAL.
