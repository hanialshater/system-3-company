# AI & Machine Learning: ranked lesson briefs (cycle: scale to hundreds)

owner: cm-ai · written 2026-10-12 · curriculum: `content/curriculum/ai.json` (30 concepts) · charter: `company/domains/ai.md`

Ranking rule: demand-3 concepts with no lesson first (portfolio rule: no concept gets a second lesson before every demand-3 concept has one), then demand 2, then the demand-1 explorations. Exploration briefs are spread through the list so each cycle can pick one; a cycle should take 1-3 from the top plus one [exploration].
Existing lessons (not repeated here): `gradient-descent`, `overfitting`. Every prediction answer below was checked by hand or by script (script results are quoted). Builders: reproduce each check in the lesson's own toy model; fact-checkers: the "Claims to check" list is the starting point for `meta.json → claims`, not a substitute.
Out of scope for this file: interaction design (learning designer), building, verifying.

### 1. next-word-tally · concept: next-token · intro · demand 3
- Learner knows: that phones suggest the next word / does not know: that a language model's core move is choosing the next piece from learned frequencies, or that this can produce sentences it never saw.
- Misconception: A model that writes text must be looking up stored sentences or "understanding" the topic.
- Prediction: "A model learns only counts of which word follows which, from three sentences (the cat sat on the mat. the cat ate the fish. the dog sat on the rug). Can it write 'the dog sat on the mat'?" options: A. No, it never saw that sentence / B. Yes, it can assemble it from the counts / C. Only after it sees more sentences (answer: B). Check: dog→sat, sat→on, on→the, the→mat each occur at least once in the corpus, and the full sentence does not.
- Interaction: tap "next word" repeatedly; each tap samples from the count bars for the current word and appends it. Counts for one word on stage, one sentence building up. Numbers: "the" is followed by cat 2, mat 1, fish 1, dog 1, rug 1 (6 total).
- Payoff: Generating text is repeated sampling from learned next-word counts, and recombination (not recall) is why novel sentences appear.
- Claims to check: (1) "the" is followed by cat twice and four other words once (count the corpus). (2) The sentence "the dog sat on the mat" is not in the corpus but every adjacent pair is (inspect). (3) Large language models also generate one token at a time from a probability distribution over the next token (source: Vaswani et al. 2017 / Brown et al. 2020; mark as about real systems, and say the toy uses one word of context where real models use thousands).

### 2. never-flag-99 · concept: accuracy-paradox · intro · demand 3
- Learner knows: percentages / does not know: that accuracy hides what happens to the rare class.
- Misconception: A model with 99% accuracy is a good model.
- Prediction: "1,000 card payments, 10 of them fraud. A model that approves everything without looking: its accuracy?" options: A. About 1% / B. About 50% / C. About 99% (answer: C). Check: it is right on the 990 genuine payments: 990 / 1000 = 99%.
- Interaction: the learner taps payments to flag them (a grid of 1,000 dots, fraud dots hidden until reveal of each flagged one); two live numbers: accuracy and fraud caught (of 10). Flagging nothing gives 99% and 0 caught.
- Payoff: When one class is rare, accuracy rewards ignoring it; ask what the model does on the cases you care about.
- Claims to check: (1) 990/1000 = 99%. (2) The never-flag rule catches 0 of 10 fraud cases (by construction). (3) Fraud-style problems are typically heavily imbalanced (source: e.g. He & Garcia 2009, "Learning from imbalanced data", IEEE TKDE; about real systems; the 1% rate is invented for the toy and must be labelled as such).

### 3. temperature-reshapes · concept: temperature-sampling · intro · demand 3
- Learner knows: that a model gives probabilities to next words (after brief 1) / does not know what the "temperature" setting does.
- Misconception: Higher temperature makes the model "more creative" by adding new ideas; lower makes it "smarter".
- Prediction: "Three candidate words have scores 2, 1, 0. At temperature 1 the top word has a 67% chance. Lowering temperature to 0.5, its chance becomes:" options: A. About 87% / B. Still 67% / C. About 50% (answer: A). Check: p ∝ exp(score / T); at T = 0.5 the values are e⁴ : e² : e⁰ = 54.6 : 7.39 : 1, top share 54.6 / 63.0 = 86.7% (script: 0.867).
- Interaction: one temperature slider; three probability bars reshape live; a "draw 20 words" button shows the spread of samples. Same three words always: temperature changes the odds, not the menu.
- Payoff: Temperature only rescales how strongly the model favours its top choices; it never adds a word the model had no score for.
- Claims to check: (1) softmax with temperature: p_i = exp(s_i/T) / Σ exp(s_j/T) (Goodfellow et al. 2016 §6.2.2.3; Hinton et al. 2015 distillation paper uses the same T). (2) At T = 1, 2, 0.5 the top shares for scores (2,1,0) are 66.5%, 50.6%, 86.7% (script output). (3) As T → 0 the top word's share → 100% (limit; derivation).

### 4. whose-cutoff-wins · concept: training-data-bias · intro · demand 3
- Learner knows: that a model learns from examples / does not know that it optimises the average over whoever is in the data.
- Misconception: If you do not give a model the group label, it treats everyone equally.
- Prediction: "A pass/fail cutoff is learned from 90 people in group A (true cutoff 50) and 10 in group B (true cutoff 30), all scores spread evenly 0-100. To make the fewest total mistakes, the learned cutoff lands:" options: A. At 50, group A's / B. At 40, halfway / C. At 30, group B's (answer: A). Check: expected mistakes ∝ 0.9·|c − 50| + 0.1·|c − 30|; between 30 and 50 the slope is −0.9 + 0.1 < 0, so it keeps falling until c = 50; at 50 group A makes 0 mistakes and group B 20% (scores 30-50 wrongly rejected).
- Interaction: one slider: group B's share of the data (5% to 50%) with the learned cutoff and each group's mistake rate shown on one number line. The cutoff stays at 50 until B reaches 50% and then ties (slope 2s − 1 = 0).
- Payoff: A model fits the majority of its data; a group that is rare in training bears the errors, and nothing in the data warns you.
- Claims to check: (1) the slope derivation above. (2) B's error at c = 50 is 20%. (3) Real systems show higher error for under-represented groups (source: Buolamwini & Gebru 2018, "Gender Shades", PMLR 81; about real systems).

### 5. patrol-feedback-loop · concept: feedback-loops · core · demand 3
- Learner knows: that models learn from past data (brief 4) / does not know that deployed predictions can change the data that retrains them.
- Misconception: If the model's data is "real records", its predictions are neutral evidence about reality.
- Prediction: "Two districts have identical true incident rates. Records start A = 6, B = 5. Each round patrols go to the district with more records, and only a patrolled district logs one new incident. After 20 rounds, A's share of all records is about:" options: A. 50% / B. 60% / C. 84% (answer: C). Check: A is always higher, so A gets +1 each round: 6 + 20 = 26 vs 5, share 26/31 = 83.9%.
- Interaction: a "run one round" button and an "auto-run 20" button; two stacked bars (A, B) of records. Then the learner assigns patrols by hand (tap a district) and watches whether the gap can ever close.
- Payoff: When a model decides where we look, the data it later trains on reflects its own choices, so a one-record head start becomes a fact.
- Claims to check: (1) the toy rule and the 26/31 arithmetic (reproduce in the toy). (2) The toy's rule is a simplification (detection only where patrolled, one log per round) and must be said so. (3) Real analyses of predictive-policing feedback: Lum & Isaac 2016 (Significance 13(5)); Ensign et al. 2018 "Runaway feedback loops in predictive policing" (PMLR 81); about real systems.

### 6. background-shortcut · concept: shortcut-learning · core · demand 3
- Learner knows: that a model is tested on held-out data / does not know that held-out data from the same source can still hide a shortcut.
- Misconception: If a model scores well on test data it has learned the thing we meant.
- Prediction: "Photos are labelled cow or camel. In training the background (grass or sand) matches the label 95% of the time; the animal's shape clue is right 80%. A model that picks the more reliable clue is then tested on photos with backgrounds shuffled. Its accuracy is about:" options: A. 95% / B. 80% / C. 50% (answer: C). Check: it chose background (95% > 80%); shuffled backgrounds match the label half the time, so 50%.
- Interaction: the learner picks which clue (background or shape) the model may use, sees train accuracy, then toggles "shuffle backgrounds" to see test accuracy. No slider: a two-way choice and a toggle. Toy states plainly that it uses one clue at a time.
- Payoff: A model takes the cheapest clue that works on its training data; a good score proves the clue worked, not that the clue is the one you meant.
- Claims to check: (1) the 95/80 numbers are the toy's data. (2) 50% under shuffling (derivation). (3) Real image models rely on backgrounds and textures: Beery, Van Horn & Perona 2018 (ECCV, "Recognition in Terra Incognita"); Geirhos et al. 2020 (Nature Machine Intelligence 2, "Shortcut learning in deep neural networks"); about real systems.

### 7. spam-threshold-tradeoff · concept: precision-recall-threshold · core · demand 3
- Learner knows: accuracy can mislead (brief 2) / does not know that a score threshold trades one kind of mistake for another.
- Misconception: Catching more spam is simply a better filter.
- Prediction: "Ten emails with spam scores: spam 0.9, 0.8, 0.7, 0.5, 0.3; real mail 0.6, 0.4, 0.3, 0.2, 0.1. Flag mail scoring 0.5 or more: 4 of 5 spam caught, 1 real mail flagged. Lower the threshold to 0.25. What happens?" options: A. More spam caught and more real mail flagged / B. More spam caught, no extra real mail flagged / C. Nothing changes (answer: A). Check: at ≥ 0.25 all 5 spam are caught (0.3 now in) and real mail 0.6, 0.4, 0.3 is flagged (3 real); recall 4/5 → 5/5, precision 4/5 → 5/8.
- Interaction: drag the threshold line across ten dots ordered by score; counters for "spam caught" and "real mail wrongly flagged". One horizontal representation.
- Payoff: Every threshold buys catches with false alarms; choosing it is a decision about which mistake costs more, not a model property.
- Claims to check: (1) the counts at 0.5 and 0.25 (reproduce in the toy). (2) Definitions: precision = true flags / all flags, recall = true flags / all real spam (Manning, Raghavan & Schütze 2008, Introduction to Information Retrieval, §8.3). (3) Scores 0.3 and 0.3 tie across classes, so at exactly 0.3 both flip together (toy detail).

### 8. true-text-false-claims · concept: fluent-not-factual · core · demand 3
- Learner knows: next-word sampling (brief 1) / does not know why text trained on true sentences can still say false ones.
- Misconception: A model trained only on true statements will only produce true statements.
- Prediction: "Trained on three true sentences (Paris is the capital of France. Rome is the capital of Italy. Madrid is the capital of Spain.) with one word of memory, the model starts 'Rome is the capital of' and picks the next word. How often is it false?" options: A. Never / B. About 1 time in 3 / C. About 2 times in 3 (answer: C). Check: after "of" the corpus has France, Italy, Spain once each; only Italy is true: 2/3 false.
- Interaction: "ask" button samples 30 completions as true/false ticks; a memory-length stepper (1, 2, 5 words) shows the false rate fall to 0 at 5 words (the full prompt), and a note that it then only repeats the corpus.
- Payoff: The model picks plausible next words, not true ones; truth survives only when the context pins it down, and the toy's fluency is the same for both.
- Claims to check: (1) "of" is followed by France, Italy, Spain once each (count). (2) With 5 words of context the completion is always Italy (count). (3) Real language models can generate fluent false statements, called hallucination (source: Ji et al. 2023, "Survey of Hallucination in Natural Language Generation", ACM Computing Surveys 55(12); about real systems).

### 9. attention-shares-one · concept: attention-weights · core · demand 3
- Learner knows: that words can be vectors (embeddings) / does not know what an attention weight is or that weights compete.
- Misconception: Attention gives each word its own independent "relevance" score.
- Prediction: "A query arrow points midway between word A (0°) and word B (90°); word C sits at 180°. Scores are the dot products with unit arrows, weights come from softmax. A's share of attention is about:" options: A. 100% / B. 45% / C. 33% (answer: B). Check: scores cos45°, cos45°, cos135° = 0.707, 0.707, −0.707; softmax = 2.03 : 2.03 : 0.49 of 4.55, A = 44.6% (script: 0.446).
- Interaction: rotate the query arrow around a circle with three word arrows; three weight bars (always summing to 100%) and the blended result arrow. Toy omits the 1/√d scaling real models use; say so.
- Payoff: Attention is a similarity-weighted average where weights share one total, so lifting one word's weight must lower the others.
- Claims to check: (1) scores and softmax values above (script). (2) The weights sum to 1 by construction. (3) Real transformers compute softmax(QKᵀ/√d)V (Vaswani et al. 2017, "Attention Is All You Need", eq. 1; about real systems).

### 10. clicks-not-value · concept: goodharts-law · core · demand 2
- Learner knows: what a metric is / does not know that optimising a proxy can drive the real goal to zero.
- Misconception: If the metric tracks quality, pushing the metric up pushes quality up.
- Prediction: "An article has 10 units of effort split between hype (h) and substance (s). Clicks = 2h + s; reader value = s. The split that maximises clicks gives reader value of:" options: A. 10 / B. 5 / C. 0 (answer: C). Check: with h + s = 10, clicks = h + 10, maximised at h = 10, s = 0, value 0.
- Interaction: an optimiser button that moves effort one unit at a time toward whatever raises clicks, with two bars (clicks, value) diverging. The learner can switch the target between clicks and value. The text on stage is only the two bar labels.
- Payoff: A proxy and the goal agree only inside the range where people were not optimising; an optimiser leaves that range first.
- Claims to check: (1) the clicks algebra above. (2) Goodhart's law: statement "when a measure becomes a target, it ceases to be a good measure" is Strathern 1997, paraphrasing Goodhart 1975; Manheim & Garrabrant 2018 (arXiv:1803.04585) classify variants. (3) The 2h + s formula is invented for the toy and labelled as such.

### 11. pixel-nudges-add-up · concept: adversarial-examples · stretch · demand 2
- Learner knows: a decision boundary / does not know why a barely changed input can flip a label.
- Misconception: Changes too small to see cannot change a model's answer.
- Prediction: "A linear classifier sums 100 pixel values (each weight 1) and says 'cat' if the sum is above 50. An image sums to 50.5. Every pixel is nudged by 0.01 (1% of its range) in the direction that lowers the sum. The label:" options: A. Stays 'cat' / B. Flips / C. Becomes undefined (answer: B). Check: total change 100 × 0.01 = 1.0 > margin 0.5, so the sum becomes 49.5.
- Interaction: two sliders (per-pixel nudge ε, number of pixels) over one bar showing sum versus the threshold line; a tiny grid of pixels shows the nudge is invisible. Learner hunts for the smallest ε that flips.
- Payoff: Tiny changes in many dimensions add up; the more inputs, the less each needs to move.
- Claims to check: (1) 100 × 0.01 = 1.0 and 50.5 − 1.0 = 49.5 < 50. (2) Smallest flipping ε = 0.5 / 100 = 0.005 (derivation). (3) Real image classifiers are fooled by imperceptible perturbations and the linear explanation: Szegedy et al. 2014 (arXiv:1312.6199); Goodfellow, Shlens & Szegedy 2015 (ICLR, arXiv:1412.6572); about real systems.

### 12. ten-test-cases · concept: train-test-split · intro · demand 2
- Learner knows: test data should be held out (from overfitting) / does not know that a small test set gives a noisy score.
- Misconception: A good score on a handful of held-out cases proves the model is good.
- Prediction: "A model is truly right 80% of the time. You test it on 10 fresh cases. How often will you see 6 or fewer right?" options: A. Almost never / B. About 1 time in 8 / C. About half the time (answer: B). Check: Binomial(10, 0.8): P(X ≤ 6) = 0.1209 (script) ≈ 1 in 8.
- Interaction: "run a test" button draws 10 cases from a model with fixed 80% accuracy; dots accumulate in a histogram of scores. A size stepper (10, 100, 1000) narrows the histogram.
- Payoff: A test score is itself a noisy measurement, and the noise shrinks only with more held-out cases.
- Claims to check: (1) P(X ≤ 6) = 12.1% (script reproduction; seeded draws). (2) Standard deviation √(0.8·0.2/n) = 12.6 points at n = 10 and 1.3 points at n = 1000 (derivation). (3) Held-out sets must be large enough for the precision you need (Hastie, Tibshirani & Friedman 2009, §7.2).

### 13. penalty-on-wiggle · concept: regularisation · core · demand 2
- Learner knows: overfitting (existing lesson) / does not know the standard cure of penalising complexity.
- Misconception: A model that fits its training data worse must be a worse model.
- Prediction: "A wiggly curve hits every training dot. You add a penalty on large coefficients (ridge). The error on the training dots gets:" options: A. Larger / B. Smaller / C. Stays exactly 0 (answer: A). Check: the exact fit uses large coefficients; with any penalty λ > 0 the minimiser of (error + λ·size) moves off the exact fit, so training error rises above 0. Builder must also confirm in the toy that the held-out error falls at moderate λ (seeded; do not claim it before reproducing).
- Interaction: one λ slider (log scale, 0 to large) with curve, training dots and held-out dots; two numbers: training miss, held-out miss. A fresh seed button shows the dip is not luck.
- Payoff: A small penalty trades a little training accuracy for a calmer curve, and the held-out error usually improves until the penalty gets too strong.
- Claims to check: (1) ridge objective: Σ(error²) + λΣw² (Hastie et al. 2009, §3.4.1). (2) Training error is non-decreasing in λ (derivation; ridge solution moves away from the unpenalised least-squares one). (3) Held-out numbers: simulation, to be reproduced by a separate script.

### 14. income-in-dollars · concept: feature-scaling · core · demand 2
- Learner knows: nearest neighbours (distance) / does not know that units decide which feature dominates distance.
- Misconception: "Nearest" means nearest in every way that matters, regardless of how it is measured.
- Prediction: "Find the person most similar to a 30-year-old earning $50,000. A is 31 years old, $58,000. B is 60 years old, $51,000. Raw distance with income in dollars picks:" options: A. A / B. B / C. A tie (answer: B). Check: A: √(1² + 8000²) ≈ 8000.0; B: √(30² + 1000²) ≈ 1000.4; B is nearer.
- Interaction: a units toggle/slider for income (dollars to thousands) on a scatter of ~12 people; the nearest-neighbour link for the query point flips when income is rescaled. Only one scatter on stage.
- Payoff: Distance obeys the numbers' size, not their importance; scale your features before asking "who is near?"
- Claims to check: (1) the two distances (arithmetic). (2) In thousands, A is √(1 + 64) = 8.06 and B is √(900 + 1) = 30.0, so A wins (arithmetic). (3) Standardising features is standard practice before distance-based methods (Hastie et al. 2009, §13.3; scikit-learn user guide, "Preprocessing data").

### 15. draw-the-xor-lines · concept: hidden-layers-xor · core · demand 2 [exploration]
- Learner knows: that a line can separate two groups / does not know why networks need hidden layers.
- Misconception: A bigger model is only "more of the same"; any pattern can be cut by one good line.
- Prediction: "Four dots: (0,0) and (1,1) are blue, (0,1) and (1,0) are orange. Can one straight line put blue on one side and orange on the other?" options: A. Yes, if placed cleverly / B. No, never / C. Yes, if the two blue dots are moved slightly (answer: B). Check: both pairs have the same midpoint (0.5, 0.5); a half-plane containing both blues contains their midpoint, and a half-plane containing both oranges contains the same midpoint, so no line can put blues and oranges on opposite sides. (Option C is a distractor; the dots stay fixed.)
- Interaction: the learner builds the model: drags two line handles on the plane. One line cannot solve it; two lines combined (a band) can. Learner must find the band; no slider, no text on stage beyond a "solved / not yet" mark.
- Payoff: Combining two simple cuts makes a shape one cut cannot; that combination is what a hidden layer is.
- Claims to check: (1) the midpoint argument (derivation). (2) A single perceptron cannot learn XOR: Minsky & Papert 1969, Perceptrons; Goodfellow et al. 2016 §6.1. (3) Two hidden units suffice (derivation: output = OR − AND of the two cuts, check on all 4 points).

### 16. king-queen-arrow · concept: embeddings · core · demand 2 [exploration]
- Learner knows: that a point on a map can mean something / does not know that directions in an embedding can carry relations.
- Misconception: The computer stores each word's dictionary meaning; similarity is looked up.
- Prediction: "On a toy map, man is at (0,0) and woman at (0,1). King is at (1,0). Moving king the same way woman differs from man lands nearest which word: queen (1,1), crown (1,0.4) or prince (1,-0.5)?" options: A. queen / B. crown / C. prince (answer: A). Check: king + (woman − man) = (1,0) + (0,1) = (1,1) = queen exactly; crown is 0.6 away and prince 1.5 away.
- Interaction: the learner builds the map: drags four words so that the "man→woman" and "king→queen" arrows become parallel, then checks the arithmetic on a fifth word. Learner places points; the stage shows arrows only.
- Payoff: In a good embedding a relation is a direction, so analogies become arithmetic on positions.
- Claims to check: (1) coordinates in the toy are designed by hand (state so). (2) The arithmetic above. (3) In real word vectors such analogies hold only approximately (Mikolov et al. 2013, "Linguistic regularities in continuous space word representations", NAACL; Rogers, Drozd & Li 2017 on limits; about real systems).

### 17. bad-start-kmeans · concept: k-means-clustering · intro · demand 2 [exploration]
- Learner knows: that points can be grouped / does not know that unsupervised grouping depends on the starting guess.
- Misconception: Given the data, the algorithm finds the one right grouping.
- Prediction: "Points on a line: 0, 4, 6, 10. k-means with 2 groups starts with centres at 0 and 4. It repeats 'assign each point to the nearest centre, move centres to group means'. The final groups:" options: A. {0,4} and {6,10} / B. {0} and {4,6,10} / C. {0,4,6} and {10} (answer: B). Check: assign 0→c1; 4,6,10→c2 (4 is distance 0 from c2); c2 = 20/3 = 6.67; reassign: 4 is 4 from c1=0 and 2.67 from c2, so it stays in c2; stable. Total squared distance 18.7 versus 16 for option A.
- Interaction: the learner drags the two starting centres (no slider, no text) and presses step; the final grouping and its total distance appear. Learner can find a start that reaches the better grouping.
- Payoff: The algorithm only improves its current guess, so where you start can decide where you end.
- Claims to check: (1) the iteration above (arithmetic; reproduce in toy). (2) Costs 18.67 (7.11 + 0.44 + 11.11 + 0) and 16 (arithmetic). (3) k-means converges to a local, not necessarily global, optimum (Bishop 2006, §9.1; Arthur & Vassilvitskii 2007 on k-means++ initialisation).

### 18. greedy-slot-machine · concept: exploration-exploitation · core · demand 2 [exploration]
- Learner knows: expected value / does not know that a learner who only repeats what looks best can lock itself into a worse choice.
- Misconception: Always choosing the best-looking option is the best strategy.
- Prediction: "Machine A pays 30% of pulls, machine B pays 70%, but you do not know which is which. You are stuck on A. A player who pulls a random machine on 10% of pulls and otherwise the better-looking one, once it has found B, earns per 100 pulls about:" options: A. 30 / B. 68 / C. 90 (answer: B). Check: 90 pulls on B at 70% = 63; 10 random pulls average (70 + 30)/2 = 50% = 5; total 68. Stuck on A: 30.
- Interaction: the learner is the player: two unlabelled machines, tap to pull, running payout tally; a "let the agent play" button runs greedy versus 10%-exploring over seeded runs. No slider; two buttons.
- Payoff: A little deliberate wandering costs about two points per hundred and can be worth forty.
- Claims to check: (1) 0.9·70 + 0.1·50 = 68 (arithmetic). (2) Greedy can lock on to a worse arm (seeded run shown in the toy). (3) The ε-greedy method: Sutton & Barto 2018, Reinforcement Learning, §2.3. The "once it has found B" assumption must appear in the lesson.

### 19. border-follows-point · concept: decision-boundary · core · demand 2
- Learner knows: nearest-neighbour labelling / does not know that a boundary is built from the data points, not drawn independently.
- Misconception: Moving one training point only changes the label of that point.
- Prediction: "One-nearest-neighbour with class A at x = 0 and class B at x = 4 puts the border at x = 2. Drag A to x = -2. The border moves to:" options: A. Stays at 2 / B. x = 1 / C. x = -2 (answer: B). Check: the border is the midpoint (−2 + 4)/2 = 1.
- Interaction: drag a point on a 2D plane with a handful of dots; the coloured regions (the boundary) redraw live. One representation.
- Payoff: A nearest-neighbour boundary is halfway between opposing points, so moving data moves the decision.
- Claims to check: (1) midpoint arithmetic. (2) In two dimensions the 1-NN border between two points is their perpendicular bisector (derivation: points equidistant from both). (3) 1-NN boundaries are pieces of such bisectors (Voronoi cells; de Berg et al., Computational Geometry, ch. 7).

### 20. momentum-sweet-spot · concept: momentum · stretch · demand 1 [exploration]
- Learner knows: gradient descent step size (existing lesson) / does not know that remembering previous steps speeds descent, and can overdo it.
- Misconception: More momentum is always faster.
- Prediction: "On a long thin valley, plain gradient descent needs 51 steps to get within 0.1 of the bottom. Keeping 80% of the previous step's velocity needs 19. Keeping 90% needs:" options: A. Fewer than 19 / B. About 30 / C. About 51 (answer: B). Check (script, f = ½(x² + 25y²), start (4, 1), step size 0.07, velocity v ← βv − η∇f, stop within 0.1 of (0,0)): β = 0 → 51 steps, β = 0.5 → 21, β = 0.8 → 19, β = 0.9 → 30.
- Interaction: the learner picks momentum from four buttons (0, 0.5, 0.8, 0.9) and watches the ball's path and step counter; no slider and no text on stage but the counter.
- Payoff: Momentum smooths the zigzag and speeds the long run, but too much carries the ball past the bottom again and again.
- Claims to check: (1) the four step counts (reproduce with the specified function, start, step size and stopping rule). (2) Heavy-ball momentum: Polyak 1964; Goodfellow et al. 2016 §8.3.2. (3) The toy's function is invented; real loss surfaces are not this shape.

### 21. near-the-wall · concept: curse-of-dimensionality · stretch · demand 1 [exploration]
- Learner knows: random points in a square / does not know how space behaves in many dimensions.
- Misconception: Adding more features only adds information; nearby points stay nearby.
- Prediction: "Points are scattered evenly in a 10-dimensional cube. What share lie within 5% of an outer face in at least one dimension?" options: A. About 10% / B. About 35% / C. About 65% (answer: C). Check: a point avoids the edge in one dimension with probability 0.9, so in all 10 with 0.9¹⁰ = 0.349; so 1 − 0.349 = 65.1% (script: 0.651).
- Interaction: a dimension stepper (1, 2, 10, 100) with one bar: share of points near a face (10%, 19%, 65%, 99.997%). The learner can resample 200 points to see the share.
- Payoff: In high dimensions almost every point is near an edge and far from its neighbours, so "nearest" stops meaning "near".
- Claims to check: (1) shares for d = 1, 2, 10, 100 are 1 − 0.9^d = 0.10, 0.19, 0.651, 0.99997 (script). (2) Distances concentrate in high dimensions: Beyer et al. 1999, "When is nearest neighbor meaningful?" (ICDT); Hastie et al. 2009, §2.5. (3) The 5% edge definition is a convention of the toy.

### 22. one-bad-label-knn · concept: nearest-neighbours · intro · demand 2
- Learner knows: classification by similarity / does not know how the choice of k handles mislabelled neighbours.
- Misconception: Looking at only the single closest example is the most accurate way to classify.
- Prediction: "A new dot lands next to one wrongly labelled orange dot inside a blue cluster of 6. With k = 1 its label is orange. With k = 5 (the 5 nearest dots, 4 blue and 1 orange) its label is:" options: A. Orange / B. Blue / C. Undecided (answer: B). Check: majority of the 5 nearest: 4 blue vs 1 orange, so blue (the toy must show the 5 nearest are those 4 blue and the 1 orange).
- Interaction: tap anywhere to drop a new dot; a k stepper (1, 3, 5, 7) changes its colour and shows which neighbours voted. One scatter.
- Payoff: Voting among several neighbours averages out a bad label, and too large a k would blur real boundaries.
- Claims to check: (1) the vote counts in the seeded layout. (2) Larger k smooths the boundary, small k follows noise (Hastie et al. 2009, §13.3). (3) For k = n the model always outputs the majority class (derivation).
