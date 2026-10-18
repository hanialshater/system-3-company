# AI & Machine Learning concepts by subarea (2026-10-18)

Key: ✓ published · ◐ in review · ○ draft · ✗ no lesson. Source: content/curriculum/ai.json and src/demos/ai/*/meta.json.

## (no subarea) (57: 56 published, 1 review, 0 draft, 0 none)

- ✓ Gradient descent: rolling downhill
- ✓ Overfitting: memorising the noise
- ✓ Classifying by nearest neighbours
- ✓ Decision boundaries
- ✓ Embeddings: meaning as position
- ✓ Language models predict the next token
- ✓ Goodhart's law: when the metric becomes the target
- ✓ Why we hold out test data
- ✓ Temperature: how a model picks among likely words
- ✓ Accuracy paradox: 99% right and useless
- ✓ Training data bias: the model learns who is in the room
- ✓ k-means: grouping without labels
- ✓ Fitting a line by minimising squared error
- ✓ Perceptron: learning from mistakes, one nudge at a time
- ✓ Tokenization: models read pieces, not words
- ✓ Reward hacking: the optimiser finds the loophole
- ✓ Data leakage: when the test answers sneak into training
- ✓ Precision vs recall: moving the threshold
- ✓ Feedback loops: predictions that shape their own data
- ◐ Regularisation: paying a penalty for complexity
- ✓ Feature scaling: units decide who counts as near
- ✓ Hidden layers: what one line cannot do
- ✓ Attention: weights that compete for a total of one
- ✓ Shortcut learning: the easy clue that fails off-distribution
- ✓ Fluent is not factual: sampling plausible words
- ✓ Explore or exploit: learning while acting
- ✓ Adversarial examples: tiny nudges, flipped labels
- ✓ Curse of dimensionality: everything is far from everything
- ✓ Momentum: a rolling ball remembers
- ✓ Ensembles: many weak models, one steadier vote
- ✓ Learning rate: too long a step overshoots
- ✓ Confusion matrix: what a flag actually means
- ✓ Context window: what the model can still see
- ✓ Retrieval: the model only reads what was fetched
- ✓ Distribution shift: a fit that stops at the edge of its data
- ✓ Preference ranking: turning "A beats B" into a reward
- ✓ Model collapse: training on your own output loses the rare
- ✓ Bias and variance: a little bias can lower total error
- ✓ Early stopping: quit while held-out error is lowest
- ✓ Cross-entropy: confident and wrong costs the most
- ✓ Calibration: does 70% confidence mean right 70% of the time?
- ✓ Greedy decoding: the best next word is not the best sentence
- ✓ Top-p sampling: cut the unlikely tail, then renormalise
- ✓ Cosine similarity: direction, not distance
- ✓ Cross-validation: every point gets a turn in the test set
- ✓ Decision trees: choose the question that purifies
- ✓ Evidence from words: updating a spam prior
- ✓ Label noise: wrong answer keys cap the score
- ✓ Local minima: downhill ends in the nearest valley
- ✓ Backpropagation: blame passed back by the chain rule
- ✓ Why layers need a bend: stacked lines are one line
- ✓ Memorising random labels: capacity without meaning
- ✓ Minibatches: a noisy compass that averages out
- ✓ Dropout: training with units switched off
- ✓ Symmetry breaking: identical units stay identical
- ✓ Position: attention alone cannot tell word order
- ✓ AUC: how often a positive outranks a negative

## AI Safety & Society (7: 2 published, 0 review, 3 draft, 2 none)

- ○ Fairness trade-off: calibrated scores give unequal error rates
- ○ Prediction is not intervention: records carry past decisions
- ✓ Proxies: deleting the group column does not delete the bias
- ○ Memorised secrets: models can repeat private training text
- ✓ Sycophancy: preference training can reward agreeing over being right
- ✗ Prompt injection: text the model reads can act as orders
- ✗ Zero failures in testing: the rule of three

## Machine Learning Basics (6: 1 published, 0 review, 0 draft, 5 none)

- ✓ Test-set reuse: the best of many models is flattered by luck
- ✗ The loss chooses the answer: squared error gives the mean, absolute the median
- ✗ Categories are not numbers: codes invent an order
- ✗ PCA keeps spread, not meaning: the widest direction can hide the classes
- ✗ Boosting: each new model fits what is left
- ✗ Discounting: how far ahead an agent cares

## Neural Networks & Language Models (6: 3 published, 0 review, 0 draft, 3 none)

- ✓ Length bias: the most probable answer tends to be short
- ✓ Vanishing gradients: deep layers starve the first ones
- ✓ Emergence or metric? All-or-nothing scores make smooth progress look sudden
- ✗ Scaling laws: each tenfold of compute buys the same small fraction
- ✗ Attention cost grows with the square of the text
- ✗ Convolution: one filter slid over every place
