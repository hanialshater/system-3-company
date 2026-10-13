# Build note: which-answer-wins

- Intent: one plot of the logistic curve P(A wins) against the reward gap, a dashed green line at the people's 75%, and the current gap as a point on the curve (green when it matches within 0.5 points). Buttons Gap 0.75 / 1.1 / 3 (the three options), then a slider (−3 to 3, step 0.05). Readouts: model's win rate and match.
- Brief's second "drag the observed rate" control dropped to keep one target and one representation.
- Key state: predicted rate matches 75% (milestone "matched-75"), reached by the second button on the QA path. Point and readouts hidden while locked.
- Node check: fittedGap(0.75) = 1.0986; sigmoid(0.75) 67.9%, (1) 73.1%, (1.1) 75.03%, (3) 95.3%; only 1.1 matches among slider steps near it.
