# AI & Machine Learning: map expansion proposal (draft for founder approval)

owner: cm-ai · date: 2026-10-18 · status: **draft, not approved** · machine-readable: `company/domains/proposals/2026-10-18-ai-map-expansion.json` · current map: `content/curriculum/ai.json` (unchanged by this proposal)

## 1. What this is, and what the founder decides

The founder says the AI map is too small: 76 concepts, 57 of them with no subarea (`company/domains/briefs/2026-10-18-ai-concept-list.md`), against 345+ in CS algorithms. This proposal takes the map to **294 concepts in 12 subareas**: the 76 existing concepts with their ids unchanged and every one given a subarea and topic, plus **218 new concepts**. Separately, it offers **14 concepts to cm-cs-algorithms** for the CS map (section 7). Nothing here edits the curriculum, writes a brief or builds anything.

**Decisions for the founder:**

1. **The subarea set (12) and the reassignment of all 76 existing concepts** (section 3). Five existing concepts move between labelled subareas: `discount-factor` (ml-basics to reinforcement-learning), `gradient-boosting-residuals` and `pca-ignores-labels` (ml-basics to classical-ml), and `vanishing-gradients` and `convolution-weight-sharing` (neural-language to deep-learning). `neural-language` keeps its id but becomes "Transformers & Language Models", since the general network material moves to `deep-learning`. *Mechanics:* subareas are generated from org data (`tools/org/generate.mjs` builds `content/domains.json` subareas, each with a `cm-ai-<subarea>` manager). Nine new subareas mean nine new sub-category-manager entries, so this is an org-designer/tools-lead change, not just a curriculum edit. You could instead approve the subareas as curriculum labels only and keep three sub-CMs; I recommend that until wave 1 shows the pace.
2. **The first wave of 29 lessons** (section 5) and its budget: **4.35M tokens** at 150k per lesson. Wave 1 is above the 3M line that `company/ops/token-budget.md` treats as needing the forum (line 184). You decide whether it runs on the catalog line or as a funded project with tranches.
3. **The reading of "tspw"** (section 4): travelling salesperson problem (the chief of staff's reading, and the one I used) or **TSPTW** (TSP with time windows), which fits the letters better. Both are covered. I need to know which one you meant so I can weight it.
4. **Where the algorithms-flavoured topics live** (section 6): HNSW/ANN goes to AI and the geometric structures go to CS; streaming, submodularity and TSP are split, with cross-links. cm-cs-algorithms must accept or reject the 14 CS proposals. I cannot add them myself.
5. **Whether real-system-claim lessons are worth their review cost**: energy, regulation, scaling laws, "lost in the middle", texture bias. The charter (`company/domains/ai.md`) says claims about real systems must cite papers and be marked as about real systems. These lessons cost the fact-checker more.
6. **One demand change to an existing concept:** `convolution-weight-sharing` from 2 to 3, because it is the entry to the CNN topic you asked for.

## 2. Evidence: what the demand numbers are and are not

- **No demand figure in this proposal is measured.** The AI map has no learner-request log, and no recall or completion data split by concept that I could use to rank unbuilt concepts. Every new concept carries one of two labels:
  - `estimated-founder-request` (85 concepts): a topic the founder named on 2026-10-18. That covers CMA-ES/ES, quality diversity, HNSW/ANN, streaming, submodularity, geometric structures, TSP, inverse RL, RL as a full subarea, CNNs as a full topic, and the first-wave examples (prompt injection, scaling laws, how LLMs are trained, agents, RLHF/DPO, LoRA, quantization, distillation, KV cache, MoE, positional schemes).
  - `estimated-cm-judgement` (133 concepts): my estimate of how often learners meet the idea in AI news and in daily tool use (demand 3), in standard ML courses (demand 2), or as specialist depth (demand 1).
- A founder request is evidence of what the founder wants. It is not evidence of what learners want, and the two labels keep those apart. Simulated reviews are not counted as evidence of anything here.
- Demand spread of the new concepts: 35 at demand 3, 124 at demand 2, 59 at demand 1. Levels: 22 intro, 137 core, 59 stretch.
- **How to get measured demand:** after wave 1 ships, use the feed's completion and revisit recall per concept, plus any learner requests. Re-rank wave 2 on those. I will not re-rank on simulated-learner scores.

## 3. Subareas and reassignments

| Subarea id | Name | Existing | New | Total |
|---|---|---:|---:|---:|
| `ml-basics` | Machine Learning Basics (data, evaluation, generalisation) | 22 | 8 | 30 |
| `classical-ml` | Classical Machine Learning | 9 | 20 | 29 |
| `deep-learning` | Deep Learning (architectures and training) | 13 | 23 | 36 |
| `neural-language` | Transformers & Language Models | 18 | 25 | 43 |
| `generative-models` | Generative Models | 0 | 11 | 11 |
| `reinforcement-learning` | Reinforcement Learning | 2 | 34 | 36 |
| `agents-tools` | Agents, Tools & Evaluation | 0 | 16 | 16 |
| `probabilistic-ml` | Probabilistic Machine Learning | 0 | 12 | 12 |
| `interpretability` | Interpretability & Robustness | 1 | 12 | 13 |
| `applied-ml` | Applied ML (vision, speech, recommenders, time series) | 0 | 17 | 17 |
| `optimisation-search` | Optimisation, Search & Vector Retrieval | 0 | 23 | 23 |
| `ai-society` | AI Safety & Society | 11 | 17 | 28 |
| | **Total** | **76** | **218** | **294** |


Why 12 and not 10: interpretability and probabilistic ML each hold 12 to 13 demo-able concepts with their own misconceptions. Folding them into deep-learning or classical-ml would hide the category's focus ("how learning systems behave, including how they fail and get gamed", `company/roles/cm-ai.md`). The smallest subareas (generative-models, probabilistic-ml, interpretability) are the ones to merge if you want 10.

**Reassignment of every existing concept** (ids unchanged; "unchanged" means it already had this subarea):

**`ml-basics`** (22): `accuracy-paradox` (evaluation), `confusion-matrix` (evaluation), `precision-recall-threshold` (evaluation), `auc-ranking` (evaluation), `calibration` (evaluation), `train-test-split` (evaluation), `cross-validation` (evaluation), `test-set-reuse` (evaluation; unchanged), `overfitting` (generalisation), `bias-variance` (generalisation), `early-stopping` (generalisation), `regularisation` (generalisation), `memorise-random-labels` (generalisation), `label-noise-ceiling` (generalisation), `distribution-shift` (generalisation), `shortcut-learning` (generalisation), `data-leakage` (data-features), `feature-scaling` (data-features), `categorical-encoding` (data-features; unchanged), `curse-of-dimensionality` (data-features), `loss-choice-mean-median` (losses; unchanged), `cross-entropy-loss` (losses).

**`classical-ml`** (9): `linear-regression-fit` (regression), `nearest-neighbours` (neighbours-margins), `decision-boundary` (neighbours-margins), `naive-bayes-evidence` (probabilistic-classifiers), `decision-tree-splits` (trees-ensembles), `ensemble-wisdom` (trees-ensembles), `gradient-boosting-residuals` (trees-ensembles; moved from `ml-basics`), `k-means-clustering` (clustering), `pca-ignores-labels` (dimensionality-reduction; moved from `ml-basics`).

**`deep-learning`** (13): `gradient-descent` (training-dynamics), `learning-rate-overshoot` (training-dynamics), `momentum` (training-dynamics), `local-minima` (training-dynamics), `minibatch-noise` (training-dynamics), `backprop-chain` (training-dynamics), `symmetry-breaking` (training-dynamics), `dropout` (training-dynamics), `vanishing-gradients` (training-dynamics; moved from `neural-language`), `perceptron-learning` (architectures), `hidden-layers-xor` (architectures), `nonlinearity-collapse` (architectures), `convolution-weight-sharing` (cnn; moved from `neural-language`).

**`neural-language`** (18): `next-token` (tokens-decoding), `tokenization` (tokens-decoding), `temperature-sampling` (tokens-decoding), `top-p-sampling` (tokens-decoding), `greedy-decoding` (tokens-decoding), `sequence-length-bias` (tokens-decoding; unchanged), `fluent-not-factual` (tokens-decoding), `embeddings` (transformer-architecture), `attention-weights` (transformer-architecture), `positional-encoding` (transformer-architecture), `context-window` (transformer-architecture), `attention-quadratic-cost` (transformer-architecture; unchanged), `retrieval-top-k` (retrieval), `cosine-similarity` (retrieval), `scaling-laws` (pretraining-scaling; unchanged), `emergence-metric-artifact` (pretraining-scaling; unchanged), `model-collapse` (pretraining-scaling), `preference-ranking` (post-training).

**`reinforcement-learning`** (2): `exploration-exploitation` (exploration), `discount-factor` (mdp-value; moved from `ml-basics`).

**`interpretability`** (1): `adversarial-examples` (robustness).

**`ai-society`** (11): `goodharts-law` (metrics-gaming), `reward-hacking` (metrics-gaming), `training-data-bias` (fairness), `feedback-loops` (fairness), `fairness-impossibility` (fairness; unchanged), `prediction-not-intervention` (fairness; unchanged), `proxy-discrimination` (fairness; unchanged), `training-data-extraction` (privacy-security; unchanged), `prompt-injection` (privacy-security; unchanged), `sycophancy` (safety-testing; unchanged), `zero-failure-testing` (safety-testing; unchanged).


## 4. The topics the founder named: where each one lands

| Founder topic | Where | Concepts (new unless marked) |
|---|---|---|
| CMA-ES and evolution strategies | AI `optimisation-search` / evolution-strategies | `evolution-strategies`, `cma-es-shape`, `es-step-size-adaptation`, `genetic-crossover`, `premature-convergence` |
| Quality diversity (MAP-Elites, novelty search) | AI `optimisation-search` / quality-diversity | `deceptive-objective`, `novelty-search`, `map-elites`, `qd-stepping-stones`, `behaviour-descriptor-choice`, `pareto-front` |
| HNSW and approximate nearest-neighbour search | AI `optimisation-search` / vector-search, cross-linked to CS | `ann-recall-speed`, `hnsw-navigable-graph`, `ivf-probe-clusters`, `product-quantization`, `kd-tree-high-dim`; retrieval side in neural-language: `hybrid-keyword-vector-search`. CS gets `algo-lsh-hyperplanes` |
| Streaming algorithms | **Mainly CS** (its `randomized-streaming` topic already has 10 drafts, plus published Count-Min, reservoir sampling and Bloom filters). AI gets the ML-side uses | AI: `online-learning-stream`, `feature-hashing`, `training-data-dedup`. CS proposals: `algo-count-sketch-signs`, `algo-exp-histogram-window`, `algo-lsh-hyperplanes` |
| Submodularity (greedy guarantees, coverage, diminishing returns) | AI owns the guarantee and its ML uses; CS gets lazy greedy. Cross-links to `cs:algo-set-cover-greedy`, `cs:greedy-failure`, `economics:diminishing-returns` | AI: `submodular-coverage-gains`, `submodular-greedy-guarantee`, `mmr-diverse-retrieval`. CS: `algo-lazy-greedy` |
| Geometric data structures (k-d trees, quadtrees, R-trees, BVH) | **CS** (`computational-geometry` already has `algo-kd-nearest-pruning` in draft). AI gets one concept: why they fail on embeddings | AI: `kd-tree-high-dim`. CS: `algo-kd-median-build`, `algo-quadtree-split`, `algo-rtree-overlap`, `algo-bvh-ray-skip`, `algo-uniform-grid-neighbours` |
| "tspw", read as travelling salesperson (heuristics, approximation, local search) | Split: the metaheuristics go to AI, the tour-specific algorithms go to CS. CS already publishes `nearest-neighbour-tour` and `combinatorial-explosion`, and has `algo-metric-tsp-doubletree` in draft | AI: `simulated-annealing-tour`, `ant-colony-tours`. CS: `algo-tsp-two-opt`, `algo-tsp-mst-bound`, `algo-tsp-christofides`, `algo-tsp-held-karp` |
| **Flag: other reading of "tspw"**: TSPTW, TSP with time windows (vehicle routing with deadlines). The letters fit it better than "TSP" does | CS | `algo-tsptw-time-windows`. If you meant TSPTW, I would add 2 to 3 more (time-window feasibility, insertion heuristics) after you confirm |
| Inverse RL (with depth) | AI `reinforcement-learning` / inverse-rl-imitation: 9 concepts | `behaviour-cloning-drift`, `dagger-correction`, `inverse-rl-goal-inference`, `reward-ambiguity`, `boltzmann-rational-demos`, `max-entropy-irl`, `irl-reward-transfer`, `rlhf-as-irl`, and the link from neural-language `preference-ranking` (existing) and `rlhf-kl-leash` |
| Reinforcement learning as a full subarea | AI `reinforcement-learning`: 36 concepts (2 existing + 34 new), in 7 topics: MDPs and value, TD and control, policy methods, exploration, reward design, model-based/offline, inverse RL and imitation | Extends existing `exploration-exploitation` (published) and `discount-factor` (no lesson yet), without duplicating either. Founder's list, item by item: MDPs `mdp-basics`; value vs policy `value-vs-reward`, `policy-from-values`; Bellman `bellman-backup`; Q-learning `q-learning`, `q-overestimation`, `sarsa-vs-q-cliff`; TD `monte-carlo-vs-td`, `td-error-surprise`; policy gradients `policy-gradient`, `policy-gradient-baseline`, `actor-critic`, `ppo-clipping`; exploration `ucb-optimism`, `thompson-sampling`, `sparse-reward-exploration`, `curiosity-noisy-tv`; reward shaping `reward-shaping`; credit assignment `credit-assignment`; model-based vs model-free `model-based-planning`, `model-error-compounding`, `mcts-playouts`; offline RL `offline-rl-extrapolation`; plus `self-play`, `deep-q-function-approx`, `experience-replay` |
| CNNs as a full topic | AI `deep-learning` / cnn: 12 concepts (existing `convolution-weight-sharing` + 11 new) | Filters `convolution-learned-filters` (differs from `cs:edge-filter`: these filters are learned, not hand-made); weight sharing (existing); receptive fields `receptive-field-growth`; pooling and stride `pooling-stride`; feature hierarchies `feature-hierarchy`; translation equivariance `translation-equivariance`, `cnn-not-rotation-invariant`; data efficiency `cnn-data-efficiency`; residual connections `residual-connections`; plus `data-augmentation`, `transfer-learning`, `texture-bias` |
| Transformers/LLMs list (KV cache, MoE, positional schemes, pretraining, fine-tuning, RLHF/DPO, LoRA, quantization, distillation) | AI `neural-language` | `kv-cache`, `mixture-of-experts`, `rope-rotary-positions` (extends existing `positional-encoding`), `how-llms-are-trained`, `pretraining-data-mix`, `instruction-tuning`, `rlhf-kl-leash`, `dpo-direct-preference`, `lora-low-rank`, `quantization-bits`, `distillation-soft-labels` |
| Safety and society list (copyright, energy, labour, regulation, prompt injection) | AI `ai-society` | `single-source-influence` and `generative-memorisation` (copyright, mechanism only, no legal verdicts), `energy-train-vs-serve`, `task-exposure`, `risk-tier-regulation`, `compute-thresholds`, `injection-lethal-trifecta` (extends existing `prompt-injection`) |

## 5. First wave (29 lessons: 26 new concepts and 3 existing concepts that have no lesson yet)

Selection rule: demand 3 first. Every founder-named family gets at least one entry concept. Every wave concept's prerequisites are already published, in the wave itself, or explicitly cross-domain. One exception, flagged: `kd-tree-high-dim` assumes `cs:algo-kd-nearest-pruning`, which is still a draft. Build it last in the wave, or let the lesson state the pruning idea as assumed knowledge.

| # | Concept | Subarea | Demand | Evidence | Misconception it targets |
|---|---|---|---:|---|---|
| 1 | `prompt-injection` Prompt injection: text the model reads can act as orders *(existing)* | ai-society | 3 | est-F | Text the model reads is only data; to the model, instructions and content arrive as the same tokens. |
| 2 | `injection-lethal-trifecta` Private data, untrusted text, a way out: the three that make injection dangerous | ai-society | 3 | est-F | Prompt injection is a chatbot saying something rude; with tools it can send data out. |
| 3 | `scaling-laws` Scaling laws: each tenfold of compute buys the same small fraction *(existing)* | neural-language | 3 | est-F | Each tenfold of compute buys a big leap; on a log axis the loss falls by the same small fraction each time. |
| 4 | `how-llms-are-trained` From text predictor to assistant: pretraining, fine-tuning, preference training | neural-language | 3 | est-F | Chatbots are programmed with answers or look them up in a database. |
| 5 | `in-context-learning` In-context learning: examples in the prompt change answers without changing weights | neural-language | 3 | est-CM | The model learns permanently from a conversation. |
| 6 | `test-time-compute-voting` Sample many answers and vote: more thinking time raises accuracy | neural-language | 3 | est-CM | A model's accuracy on a question is fixed; spending more samples changes it. |
| 7 | `agent-loop` An agent is a loop: model, tool, observation, repeat | agents-tools | 3 | est-F | An agent is a smarter model; it is the same model in a loop with tools. |
| 8 | `tool-call-request` Tool calls: the model writes a request, ordinary code runs it | agents-tools | 3 | est-F | The model itself searches the web or runs the code. |
| 9 | `benchmark-contamination` Benchmark contamination: a test seen in training becomes a memory test | agents-tools | 3 | est-CM | A high benchmark score means the skill; if the questions were in the training text it may mean recall. |
| 10 | `cot-faithfulness` The written reasoning may not be the reason | interpretability | 3 | est-CM | A model's shown steps are a faithful account of how it reached the answer. |
| 11 | `diffusion-denoising` Diffusion: learn to remove a little noise, then repeat from pure static | generative-models | 3 | est-CM | Image generators collage or retrieve stored pictures. |
| 12 | `ai-detector-false-positives` AI-text detectors flag honest writers: base rates again | ai-society | 3 | est-CM | A detector that is 95% accurate means a flagged essay is 95% likely AI-written. |
| 13 | `energy-train-vs-serve` Energy: training once vs answering a billion times | ai-society | 3 | est-CM | Training is where AI's energy goes; at scale, serving queries can match or exceed it. Real-system numbers must be cited and dated. |
| 14 | `mdp-basics` State, action, reward, next state: the loop an RL agent lives in | reinforcement-learning | 3 | est-F | An RL agent is told the right move, as with labelled data; it only gets a score, often late. |
| 15 | `value-vs-reward` Value is not reward: a square that pays nothing can be worth a lot | reinforcement-learning | 3 | est-F | The best move is the one with the biggest immediate reward. |
| 16 | `q-learning` Q-learning: learn what each move is worth in each place | reinforcement-learning | 3 | est-F | An agent needs a map of the world to choose good moves. |
| 17 | `reward-shaping` Reward shaping: hints that speed learning can change what is learned | reinforcement-learning | 3 | est-F | Any helpful extra reward keeps the goal the same; only potential-based shaping is guaranteed to. |
| 18 | `inverse-rl-goal-inference` Inverse RL: infer the goal from what the expert did | reinforcement-learning | 3 | est-F | Demonstrations show what to do, and that is all they hold; they also carry evidence about what the demonstrator wants. |
| 19 | `reward-ambiguity` Many rewards explain the same behaviour, even a reward of zero | reinforcement-learning | 3 | est-F | Behaviour pins down a single true reward. |
| 20 | `convolution-weight-sharing` Convolution: one filter slid over every place *(existing)* | deep-learning | 2 → 3 (proposed) | est-F | An image network needs separate weights for every pixel position; one small filter reused everywhere does the job. |
| 21 | `receptive-field-growth` Receptive fields: each layer sees a wider patch of the image | deep-learning | 3 | est-F | A 3x3 filter can only ever see 3x3 pixels, so a CNN cannot see whole objects. |
| 22 | `translation-equivariance` Shift the cat, shift the map: convolution moves with the image | deep-learning | 3 | est-F | A network must learn a cat separately at every position in the frame. |
| 23 | `evolution-strategies` Evolution strategies: jiggle, score, step toward the winners, no gradients needed | optimisation-search | 3 | est-F | You need gradients (backpropagation) to optimise a model. |
| 24 | `cma-es-shape` CMA-ES: the search cloud stretches along the valley it finds | optimisation-search | 3 | est-F | A search should sample evenly in every direction; CMA-ES learns the valley's shape from its own winners. |
| 25 | `map-elites` MAP-Elites: keep the best of every kind, not one best | optimisation-search | 3 | est-F | Search should return a single best answer. |
| 26 | `hnsw-navigable-graph` HNSW: express lanes over a graph of neighbours, greedy hops down to the answer | optimisation-search | 3 | est-F | Search must compare the query with every stored vector; HNSW checks a few hundred, and greedy hops can stop at a near miss. |
| 27 | `submodular-greedy-guarantee` Greedy picking is never worse than 63% of the best possible set | optimisation-search | 3 | est-F | Greedy can be arbitrarily bad (cs:greedy-failure); for diminishing-returns objectives it carries a guarantee. |
| 28 | `kd-tree-high-dim` k-d trees stop pruning in 100 dimensions: why vector search needs other tricks | optimisation-search | 2 | est-F | A spatial index that is fast on a map is fast on embeddings. Differs from cs:algo-kd-nearest-pruning (how pruning works) by showing it failing as dimensions grow. |
| 29 | `simulated-annealing-tour` Simulated annealing: accept a worse tour now to find a shorter one later | optimisation-search | 2 | est-F | A good search never takes a step that makes things worse. |


Build order inside the wave (prerequisite chains): `prompt-injection` → `tool-call-request` → `agent-loop` → `injection-lethal-trifecta`; `mdp-basics` → `value-vs-reward` → `q-learning`, `reward-shaping`, `inverse-rl-goal-inference` → `reward-ambiguity`; `convolution-weight-sharing` → `receptive-field-growth`, `translation-equivariance`; `evolution-strategies` → `cma-es-shape`. The other concepts in the wave are independent.

Left out of wave 1 on purpose, and why: `chain-of-thought` (`cot-faithfulness` is the sharper misconception, and it only assumes the learner has seen a model write steps); `knowledge-cutoff` and `instruction-tuning` (demand 3, but `how-llms-are-trained` covers their opening idea; they lead wave 2); `ood-overconfidence`, `jailbreak-surface-refusal`, `least-privilege-agents`, `agent-checkpoint-recovery`, `generative-memorisation` (demand 3; they lead wave 2); `novelty-search` (MAP-Elites represents QD in wave 1); `discount-factor` (existing; wave 2, after `value-vs-reward`).

## 6. Overlap check against CS and other maps (no duplicates)

I checked `content/curriculum/cs.json` (360 concepts) and the other 12 curricula by id and name. Every new id is unique across all maps, and every prerequisite resolves to an existing concept, a new one, or a `domain:id` that exists.

| Item | Nearest existing concept | Ruling |
|---|---|---|
| Streaming sketches (Count-Min, reservoir, Bloom, HLL, KMV, Misra-Gries, quantiles) | `cs:count-min-sketch`, `cs:reservoir-sampling`, `cs:bloom-filter` published; 10 `cs:randomized-streaming` drafts | **CS only.** No AI duplicates. AI adds only ML uses: `online-learning-stream`, `feature-hashing`, `training-data-dedup` (uses `cs:algo-minhash-jaccard`) |
| k-d tree nearest-neighbour pruning | `cs:algo-kd-nearest-pruning` (draft) | **CS.** AI's `kd-tree-high-dim` teaches a different insight (the pruning fails in high dimensions) and takes the CS concept as a prerequisite |
| Convex hull, sweeps, closest pair | `cs:convex-hull`, `cs:computational-geometry` | Not touched |
| TSP greedy tours and the explosion of orders | `cs:nearest-neighbour-tour`, `cs:combinatorial-explosion` (published), `cs:algo-metric-tsp-doubletree` (draft) | **CS** keeps the tour algorithms (5 proposals). **AI** gets the general local-search metaheuristics, demonstrated on a tour, with these concepts as prerequisites |
| Greedy set cover | `cs:algo-set-cover-greedy` (draft: ln n for covering everything) | AI's `submodular-greedy-guarantee` is the max-coverage 1-1/e result for a fixed budget. It is a different theorem, cross-linked. `algo-lazy-greedy` goes to CS |
| Diminishing returns | `economics:diminishing-returns` (published) | AI's `submodular-coverage-gains` is about set functions and takes the economics concept as a prerequisite |
| Edge detection | `cs:edge-filter` (published: a hand-made filter) | AI's `convolution-learned-filters` is about *learned* filters, with the CS concept as a prerequisite |
| Minimax / game search | `cs:minimax`, `cs:algo-alpha-beta` | AI's `mcts-playouts` (sampled search) takes `cs:minimax` as a prerequisite |
| Multiplicative weights / experts | `cs:algo-multiplicative-weights` (draft) | Not duplicated. Bandits stay with the existing `exploration-exploitation` and the new `ucb-optimism` and `thompson-sampling` |
| Step failures compound | `books:checklist-steps-compound` | AI's `agent-checkpoint-recovery` teaches what verification and retry recover, and cites the books concept as a prerequisite |
| Correlated errors | `books:book-crowds-correlated-errors` (draft) | Prerequisite of `checker-shared-blind-spots`; that one is about model checkers that share training |
| Clustering illusion | `probability:clustering-illusion` | Prerequisite of `k-means-forced-k`, which is about the algorithm, not the eye |
| Within AI: `tokenization`, `feedback-loops`, `embeddings` (published) | n/a | I did **not** propose a "models cannot count letters", "recommender popularity loop" or "king − man + woman" lesson, because those may already be inside the published lessons. Check the lessons before you add any of them |

## 7. Proposals for cm-cs-algorithms (CS map; not part of the AI count)

These are offered, not added. cm-cs-algorithms owns `content/curriculum/cs.json` and decides. Each one is written in the CS concept shape in the JSON under `csProposalsForCmCsAlgorithms`. All ids are checked unique against `cs.json`, and all prerequisites exist there.

| Proposed id | Name | Topic | Level | Demand | Prerequisites | Misconception |
|---|---|---|---|---:|---|---|
| `algo-tsp-two-opt` | Two crossing edges can always be uncrossed shorter | approximation-online | stretch | 2 | `cs:nearest-neighbour-tour` | A tour that looks tidy is near-optimal; any crossing proves it can be shortened. |
| `algo-tsp-mst-bound` | A tour costs at least the cheapest network | approximation-online | stretch | 2 | `cs:minimum-spanning-tree` | You cannot judge a tour without knowing the optimum; the MST gives a lower bound. |
| `algo-tsp-christofides` | Fix the odd corners with a matching: within 1.5 times the best | approximation-online | stretch | 1 | `cs:algo-metric-tsp-doubletree` | The double-tree 2x bound is the best a fast method can promise. |
| `algo-tsp-held-karp` | Held-Karp: remember the set visited, not the order | resource-subset-dp | stretch | 1 | `cs:combinatorial-explosion` | Exact TSP needs checking all n! orders; DP over subsets needs 2^n states. |
| `algo-tsptw-time-windows` | Time windows: the shortest tour can arrive too late | approximation-online | stretch | 2 | `cs:nearest-neighbour-tour` | Shortest distance is the goal in routing; deadlines can force a longer tour. (Covers the "TSPTW" reading of "tspw".) |
| `algo-kd-median-build` | Split at the median, alternate the axis: building a k-d tree | computational-geometry | stretch | 2 | `cs:binary-search-tree` | A spatial tree splits space into equal squares; it splits the points into equal halves. |
| `algo-quadtree-split` | A quadtree splits only where points crowd | computational-geometry | stretch | 2 | `cs:divide-and-conquer` | A spatial index divides space evenly everywhere. |
| `algo-rtree-overlap` | R-trees: boxes that overlap send a search down two branches | computational-geometry | stretch | 1 | `cs:algo-bplus-leaf-range` | A box index visits one branch per query like a search tree. |
| `algo-bvh-ray-skip` | Bounding volumes: one missed box skips every triangle inside | computational-geometry | stretch | 2 | `cs:tree-traversal` | Rendering must test a ray against every triangle. |
| `algo-uniform-grid-neighbours` | A uniform grid: neighbours live in the adjacent cells | computational-geometry | stretch | 1 | `cs:hashing-collisions` | Finding close pairs needs comparing every pair. |
| `algo-count-sketch-signs` | Random signs let collisions cancel (Count Sketch) | randomized-streaming | stretch | 1 | `cs:count-min-sketch` | Sketch errors always overcount, as in Count-Min; random signs make them cancel on average. |
| `algo-exp-histogram-window` | Counting the last hour: buckets that merge as they age | randomized-streaming | stretch | 1 | `cs:count-min-sketch` | A sliding-window count needs every timestamp stored. |
| `algo-lsh-hyperplanes` | Random hyperplanes hash similar vectors into the same bucket | randomized-streaming | stretch | 2 | `cs:algo-minhash-jaccard` | Hashing scatters similar items; locality-sensitive hashing collides them on purpose. |
| `algo-lazy-greedy` | A stale gain is still an upper bound: lazy greedy skips re-scoring | approximation-online | stretch | 1 | `cs:algo-set-cover-greedy` | Greedy must re-score every candidate each round. |


## 8. Cost and review capacity

**Tokens** (the brief's planning figure: 150k per finished lesson; the measured all-in figures in `company/ops/token-budget.md` are 101k to 122k per published lesson):

| Scope | Lessons | At 150k | At 122k (measured 2026-10-15) |
|---|---:|---:|---:|
| First wave | 29 | **4.35M** | 3.54M |
| Rest of the AI map (wave 2 onward) | 199 | 29.85M | 24.28M |
| **Whole AI map still unbuilt** (218 new + 10 existing with no lesson) | 228 | **34.2M** | 27.8M |
| CS proposals (cm-cs-algorithms' budget, if accepted) | 14 | 2.1M | 1.71M |

Not counted: the 4 AI lessons already in flight (`regularisation` in review; three drafts with fixes pending), my 29 briefs, and design time for any new format. Real-system lessons (scaling laws, energy, regulation, lost in the middle, texture bias, RLHF) will probably cost more than average at fact-check.

**Review capacity a wave needs** (from the publish gate in `company/product/demo-standard.md`: every claim verified by someone other than the builder, a computer-use QA record, at least one borrowed-mind review, and human-learner evidence for `**` confidence):

- 29 fact-checker passes, plus about 30% re-checks after fixes (my estimate, not measured): about **38 fact-check runs**. The 6 real-system lessons need paper sources that the toy model cannot reproduce.
- **29 computer-use QA records** and **at least 29 borrowed-mind (learner-evaluator) reviews**. Add a second review for a lesson that gets a "revise".
- **29 demo-crit/learning-designer passes**, and interaction-designer time for formats not yet in `company/design/formats.md`. The likely new formats are a grid-world agent stage (RL), a 2-D search-cloud stage (CMA-ES/MAP-Elites), a graph-hop stage (HNSW) and a filter-on-image stage (CNN). Design work on those should start before the builders claim the briefs.
- **cm-ai rulings** on over-budget text for each lesson.
- **Human learners:** wave 1 can only publish at `*` confidence. No `**` without people, and simulated reviews do not count.
- **Pacing advice:** given the review capacity, do not run all 29 at once. Run it as 3 batches of about 10 (one batch per cycle), in the build order above. If the fact-check queue is already the bottleneck, the binding constraint is review runs, not tokens (`token-budget.md` makes the same point for First Light).

## 9. Risks and objections I raise against my own proposal

- **A taxonomy department** (the failure mode named in `company/roles/cm-ai.md`). 294 concepts is a map, not a promise. At today's rate the 199 concepts after wave 1 are many cycles away. Each concept has a misconception sentence so that it can be briefed. A concept that no designer can stage in 60 seconds should be cut at brief time, not kept.
- **Toy-model reproducibility** (the charter rule). `grokking`, `double-descent`, `lost-in-the-middle`, `texture-bias` and `emergence`-style claims need a browser toy that actually shows the effect. If the toy cannot, the lesson becomes a cited real-system claim, or it is dropped. I flagged these in their misconception notes.
- **Contested or fast-moving facts:** energy figures, regulation (EU AI Act tiers), and copyright. These lessons teach mechanisms only, never legal verdicts, and every figure is dated and cited.
- **Org load:** 9 new subareas could mean 9 new sub-CM roles. Recommendation in decision 1.
- **CS dependency:** two AI concepts depend on CS drafts (`kd-tree-high-dim` on `cs:algo-kd-nearest-pruning`; `training-data-dedup` on `cs:algo-minhash-jaccard`). If CS does not publish those, the AI lessons must state the idea as assumed knowledge.

## 10. On approval: who does what

- **cm-ai:** merge the approved concepts and the reassignments into `content/curriculum/ai.json` (my scope), apply the demand change, then write wave-1 briefs in batches of about 10.
- **org-designer / tools-lead:** add the approved subareas to the org data and regenerate `content/domains.json` (not my scope).
- **cm-cs-algorithms:** rule on the 14 CS proposals.
- **portfolio-manager:** budget line or project for wave 1.
- **interaction designer:** the new stage formats listed in section 8.

## Appendix: every new concept, by subarea

Evidence key: `est-F` = estimated-founder-request; `est-CM` = estimated-cm-judgement. No row is measured. The misconception column states the wrong belief, often followed by the correction the lesson shows.

### Machine Learning Basics (data, evaluation, generalisation) (`ml-basics`): 8 new

| Concept | Topic | Level | Demand | Evidence | Prerequisites | Misconception it targets |
|---|---|---|---:|---|---|---|
| `baseline-first` Beat the dumb baseline first: always guessing the average is a score too | evaluation | intro | 2 | est-CM | `accuracy-paradox` | A score like 80% sounds good on its own; learners do not ask what a model that ignores the input would get. |
| `test-score-error-bars` A test score is an estimate: 200 examples give a wide margin | evaluation | core | 2 | est-CM | `train-test-split`, `probability:confidence-intervals` | Learners read 84% vs 82% on a small test set as a real difference. |
| `learning-curves` Learning curves: more data helps only when the gap is variance | generalisation | core | 2 | est-CM | `bias-variance` | More data always improves a model; it does nothing for a model too simple to fit. |
| `missing-data-signal` Missing values carry signal: filling blanks with the average hides who is missing | data-features | core | 2 | est-CM | `data-leakage` | A blank is neutral, so filling it with the mean is harmless. |
| `temporal-split` Random splits leak the future: time-ordered data needs a time split | data-features | core | 2 | est-CM | `data-leakage` | Shuffling rows before splitting is always fair; with time series it lets the model see tomorrow. |
| `group-split-leakage` Same patient in train and test: split by person, not by row | data-features | core | 2 | est-CM | `data-leakage` | Rows are independent, so a random row split is honest even when one person contributes many rows. |
| `resampling-miscalibrates` Rebalancing the classes changes the probabilities the model reports | evaluation | stretch | 1 | est-CM | `calibration` | Oversampling the rare class fixes imbalance for free; the model now over-predicts it. |
| `online-learning-stream` Online learning: update on each example as it streams past, then forget it | data-features | core | 1 | est-F | `gradient-descent` | A model must see all its data at once; one-pass updates can track a stream and drift with it. |

### Classical Machine Learning (`classical-ml`): 20 new

| Concept | Topic | Level | Demand | Evidence | Prerequisites | Misconception it targets |
|---|---|---|---:|---|---|---|
| `logistic-regression` Logistic regression: a line that outputs a probability | regression | intro | 2 | est-CM | `linear-regression-fit` | A classifier outputs yes or no; a linear model can output a calibrated probability that bends near the boundary. |
| `polynomial-features` Polynomial features: a straight-line method fits a curve | regression | core | 2 | est-CM | `linear-regression-fit` | Linear models only fit straight lines; linear means linear in the weights, not the input. |
| `outlier-leverage` One far-out point drags the whole fitted line | regression | intro | 2 | est-CM | `linear-regression-fit` | One point among fifty cannot move a fit much; a point far along x has outsized leverage. |
| `correlated-coefficients` Twin features: the weights swap but the predictions stay put | regression | core | 2 | est-CM | `linear-regression-fit` | A coefficient measures how much a feature matters; with correlated features it is not even stable. |
| `knn-choosing-k` k in k-nearest neighbours: one neighbour memorises, all neighbours vote the majority | neighbours-margins | intro | 2 | est-CM | `nearest-neighbours`, `bias-variance` | More neighbours always means a better vote. |
| `svm-widest-margin` Support vector machines: the widest street, set by the edge points only | neighbours-margins | core | 2 | est-CM | `decision-boundary` | Any separating line is as good as another, and every point shapes it. |
| `kernel-trick` The kernel trick: a ring becomes separable one dimension up | neighbours-margins | stretch | 2 | est-CM | `svm-widest-margin` | If no line separates the classes, a linear method is hopeless. |
| `random-forest-decorrelation` Random forests: hiding features makes the trees disagree usefully | trees-ensembles | core | 2 | est-CM | `ensemble-wisdom`, `decision-tree-splits` | Averaging many copies of the best tree helps; identical trees make identical mistakes. |
| `k-means-forced-k` Ask k-means for 4 groups and it finds 4, even in pure noise | clustering | core | 2 | est-CM | `k-means-clustering`, `probability:clustering-illusion` | Clusters the algorithm returns are clusters that exist. |
| `dbscan-density` Density clustering: rings, chains and noise that k-means cannot see | clustering | core | 2 | est-CM | `k-means-clustering` | Clusters are round blobs around a centre. |
| `pca-compression` PCA: two directions keep most of the spread of ten correlated features | dimensionality-reduction | intro | 2 | est-CM | `linear-regression-fit` | Dropping dimensions always throws away most of the information. |
| `tsne-distances-mislead` t-SNE and UMAP plots: the gaps between clusters mean little | dimensionality-reduction | core | 2 | est-CM | `pca-compression` | Distances and cluster sizes in a 2-D embedding plot reflect the real data. |
| `lasso-sparsity` L1 vs L2 penalties: only the absolute-value penalty sets weights to exactly zero | regression | stretch | 1 | est-CM | `regularisation` | All penalties shrink weights the same way; the corner of the L1 diamond zeros them. |
| `soft-margin` Soft margins: paying for a few points on the wrong side | neighbours-margins | stretch | 1 | est-CM | `svm-widest-margin` | A good classifier must get every training point right. |
| `naive-bayes-double-counting` Naive Bayes double-counts evidence that comes in pairs | probabilistic-classifiers | core | 1 | est-CM | `naive-bayes-evidence` | Two clues that always appear together should count as two pieces of evidence. |
| `deep-tree-memorises` A deep enough tree gives every training point its own leaf | trees-ensembles | intro | 1 | est-CM | `decision-tree-splits`, `overfitting` | A tree that is 100% right on training data has learned the rule. |
| `k-means-initialisation` Same data, different start, different clusters | clustering | core | 1 | est-CM | `k-means-clustering` | k-means has one answer for a dataset; it finds a local optimum that depends on the start. |
| `hierarchical-cut` Hierarchical clustering: where you cut the tree sets the number of groups | clustering | core | 1 | est-CM | `k-means-clustering` | The data decides how many groups there are; here the analyst chooses by where to cut. |
| `random-projection` Random projections roughly keep distances (Johnson-Lindenstrauss) | dimensionality-reduction | stretch | 1 | est-CM | `pca-compression` | Projecting onto random directions scrambles structure; for distances it barely does. |
| `feature-hashing` The hashing trick: a million words into ten thousand slots, collisions and all | dimensionality-reduction | stretch | 1 | est-F | `categorical-encoding`, `cs:hashing-collisions` | Collisions between features must ruin a model; a few rare collisions cost little accuracy. |

### Deep Learning (architectures and training) (`deep-learning`): 23 new

| Concept | Topic | Level | Demand | Evidence | Prerequisites | Misconception it targets |
|---|---|---|---:|---|---|---|
| `convolution-learned-filters` Filters are learned, not designed: training turns noise into an edge detector | cnn | intro | 3 | est-F | `convolution-weight-sharing`, `cs:edge-filter` | People program the features a vision model looks for. Differs from cs:edge-filter (hand-made differencing) because here the filter values are trained. |
| `receptive-field-growth` Receptive fields: each layer sees a wider patch of the image **(wave 1)** | cnn | core | 3 | est-F | `convolution-weight-sharing` | A 3x3 filter can only ever see 3x3 pixels, so a CNN cannot see whole objects. |
| `translation-equivariance` Shift the cat, shift the map: convolution moves with the image **(wave 1)** | cnn | core | 3 | est-F | `convolution-weight-sharing` | A network must learn a cat separately at every position in the frame. |
| `softmax-scores` Softmax: scores become probabilities, and the biggest gets more than its share | architectures | intro | 2 | est-CM | `next-token` | Softmax shares probability in proportion to the scores; it exaggerates gaps exponentially. |
| `universal-approximation` Enough bends make any curve: what one wide hidden layer can fit | architectures | core | 2 | est-CM | `nonlinearity-collapse` | Fitting a complicated shape needs a complicated, hand-designed model. |
| `recurrent-memory-fades` Recurrent nets: one cell reused along the sequence, and the early words fade | architectures | core | 2 | est-CM | `vanishing-gradients` | A network that reads word by word remembers the whole sentence equally. |
| `lr-schedule-warmup` Learning-rate schedules: big steps early, small steps late | training-dynamics | core | 2 | est-CM | `learning-rate-overshoot` | There is one right learning rate for the whole run. |
| `double-descent` Double descent: past the memorising point, a bigger model can generalise better | training-dynamics | stretch | 2 | est-CM | `bias-variance`, `memorise-random-labels` | Test error rises forever with model size once a model can fit the training set (the U-curve). |
| `grokking` Grokking: test accuracy jumps long after training accuracy hits 100% | training-dynamics | stretch | 2 | est-CM | `early-stopping` | Once training accuracy is perfect nothing more is being learned. Toy must reproduce it (modular arithmetic) in the browser; build risk. |
| `pooling-stride` Pooling and stride: a smaller map that keeps the strongest response | cnn | core | 2 | est-F | `convolution-weight-sharing` | Downsampling throws information away evenly; max-pooling keeps whether a feature was there, not exactly where. |
| `cnn-not-rotation-invariant` Rotate the digit and the CNN stumbles: equivariance covers shifts, not turns | cnn | core | 2 | est-F | `translation-equivariance` | A CNN recognises shapes in any orientation the way people do. |
| `feature-hierarchy` Edges, then parts, then objects: features stack layer on layer | cnn | core | 2 | est-F | `receptive-field-growth` | Each layer of a vision model does the same job; later layers combine earlier detectors into larger patterns. |
| `cnn-data-efficiency` Why a CNN learns from fewer images than a dense net: far fewer free weights | cnn | core | 2 | est-F | `convolution-weight-sharing`, `overfitting` | A more flexible network is always better; the dense net can fit anything, so it needs far more examples. |
| `residual-connections` Residual connections: add the input back and very deep nets train | cnn | core | 2 | est-F | `vanishing-gradients` | Adding layers can only help; without a skip path, a deeper plain net trains worse than a shallow one. |
| `data-augmentation` Data augmentation: flipped photos are free examples, until a flip changes the label | cnn | core | 2 | est-F | `overfitting` | Every transformation is label-preserving; a flipped 6 can become a 9. |
| `transfer-learning` Transfer learning: keep the early layers, retrain the last | cnn | core | 2 | est-F | `feature-hierarchy` | A new task needs a model trained from scratch on lots of new data. |
| `gnn-message-passing` Graph neural networks: each node averages what its neighbours say | architectures | stretch | 1 | est-CM | `hidden-layers-xor` | Neural nets only take grids or sequences; a graph net passes messages along edges, k hops in k layers. |
| `weight-init-scale` Initial weight size: too large saturates, too small fades | training-dynamics | stretch | 1 | est-CM | `vanishing-gradients` | Starting weights do not matter because training fixes them. |
| `exploding-gradients` Exploding gradients: one huge step throws training off a cliff (and clipping) | training-dynamics | core | 1 | est-CM | `learning-rate-overshoot` | A loss spike means the data was bad; often it is one oversized gradient step. |
| `adam-per-weight-steps` Adam: each weight gets its own step size | training-dynamics | stretch | 1 | est-CM | `momentum` | One global step size suits weights whose gradients differ a hundredfold. |
| `dead-relu` Dead units: a ReLU pushed below zero stops learning for good | training-dynamics | stretch | 1 | est-CM | `backprop-chain` | Every unit keeps learning as long as training runs. |
| `pruning-most-weights` Pruning: most weights of a trained net can be removed | training-dynamics | stretch | 1 | est-CM | `dropout` | Every weight in a trained network is needed. |
| `texture-bias` Cat shape, elephant skin: many CNNs vote by texture | cnn | stretch | 1 | est-F | `shortcut-learning`, `feature-hierarchy` | Vision models recognise objects by their outline as people do. Real-system claim: cite the study and reproduce in the toy. |

### Transformers & Language Models (`neural-language`): 25 new

| Concept | Topic | Level | Demand | Evidence | Prerequisites | Misconception it targets |
|---|---|---|---:|---|---|---|
| `how-llms-are-trained` From text predictor to assistant: pretraining, fine-tuning, preference training **(wave 1)** | pretraining-scaling | intro | 3 | est-F | `next-token`, `preference-ranking` | Chatbots are programmed with answers or look them up in a database. |
| `knowledge-cutoff` Knowledge cutoff: a model knows nothing written after its data ends | pretraining-scaling | intro | 3 | est-CM | `next-token` | A chatbot knows today's news unless a tool fetches it. |
| `instruction-tuning` Instruction tuning: a few thousand examples change the manner, not the knowledge | post-training | core | 3 | est-CM | `how-llms-are-trained` | Fine-tuning reliably teaches a model new facts. |
| `rlhf-kl-leash` RLHF: optimise the reward model too hard and the answers drift; a leash holds them | post-training | core | 3 | est-F | `preference-ranking`, `reward-hacking` | More optimisation against the learned reward always makes the model better. |
| `in-context-learning` In-context learning: examples in the prompt change answers without changing weights **(wave 1)** | tokens-decoding | core | 3 | est-CM | `context-window` | The model learns permanently from a conversation. |
| `chain-of-thought` Chain of thought: writing the steps gives the model more computation per answer | tokens-decoding | core | 3 | est-CM | `next-token` | A model either knows the answer or not; generating intermediate tokens adds sequential steps it can use. |
| `test-time-compute-voting` Sample many answers and vote: more thinking time raises accuracy **(wave 1)** | tokens-decoding | core | 3 | est-CM | `temperature-sampling`, `ensemble-wisdom` | A model's accuracy on a question is fixed; spending more samples changes it. |
| `pretraining-data-mix` The data mix decides the model: double the code, change the skills | pretraining-scaling | core | 2 | est-CM | `next-token` | Model abilities come from the architecture, not from what text went in. |
| `training-data-dedup` Duplicates get memorised: near-duplicate removal changes what a model repeats | pretraining-scaling | core | 2 | est-F | `training-data-extraction`, `cs:algo-minhash-jaccard` | Every training document is seen once and weighs the same; a text copied 1,000 times is far likelier to be recited. |
| `compute-optimal-scaling` Compute-optimal training: a smaller model on more data can win | pretraining-scaling | core | 2 | est-F | `scaling-laws` | Bigger models are always better for the same compute. |
| `dpo-direct-preference` DPO: preference training without a separate reward model | post-training | stretch | 2 | est-F | `rlhf-kl-leash` | Learning from preferences requires a reward model and an RL loop. |
| `ai-feedback-rlaif` AI feedback: a model grading a model passes on its blind spots | post-training | core | 2 | est-CM | `preference-ranking` | Replacing human raters with a model removes rater bias. |
| `lora-low-rank` LoRA: fine-tune by adding a thin update instead of changing every weight | efficiency-inference | core | 2 | est-F | `how-llms-are-trained` | Fine-tuning must rewrite all the weights, so it needs a data centre. |
| `quantization-bits` Quantization: 4 bits per weight, a quarter of the memory, a small loss | efficiency-inference | core | 2 | est-F | `cs:floating-point` | Cutting precision by 4x cuts quality by 4x. |
| `distillation-soft-labels` Distillation: the student learns more from the teacher's near-misses than from the right answer | efficiency-inference | core | 2 | est-F | `cross-entropy-loss` | A small model trained on a big model's outputs only copies its final answers. |
| `kv-cache` KV cache: why the next token is cheap once the prompt is read | efficiency-inference | core | 2 | est-F | `attention-weights`, `attention-quadratic-cost` | Each new token re-reads the whole prompt from scratch. |
| `mixture-of-experts` Mixture of experts: a router sends each token to two of many experts | efficiency-inference | core | 2 | est-F | `softmax-scores` | A model with 8x the parameters costs 8x as much per token. |
| `multi-head-attention` Many heads: each head attends to a different relation | transformer-architecture | core | 2 | est-CM | `attention-weights` | One attention pattern can capture who-did-what and which-word-is-next at once. |
| `lost-in-the-middle` Lost in the middle: facts buried mid-prompt get used less | retrieval | core | 2 | est-CM | `context-window` | Anything inside the context window is used equally. Real-system claim: cite and mark as about real models. |
| `contrastive-embeddings` Contrastive training: pull matching pairs together, push the rest apart | retrieval | core | 2 | est-CM | `embeddings`, `cosine-similarity` | Embeddings are designed by hand or learned from labels; here the pairs are the only signal. |
| `hybrid-keyword-vector-search` Keyword plus vector search: exact names that embeddings blur | retrieval | core | 2 | est-F | `retrieval-top-k` | Vector search beats keyword search everywhere; it misses rare exact strings like part numbers. |
| `speculative-decoding` Speculative decoding: a small model drafts, the big one checks in one pass | efficiency-inference | stretch | 1 | est-CM | `greedy-decoding` | Faster generation must mean lower-quality text; here the output is the same. |
| `rope-rotary-positions` Rotary positions: word distance as an angle between vectors | transformer-architecture | stretch | 1 | est-F | `positional-encoding`, `cosine-similarity` | Position is a number stamped on each word; rotation makes attention depend on relative offset. |
| `causal-mask` The causal mask: in training, no word may peek at the next | transformer-architecture | core | 1 | est-CM | `attention-weights` | A model trained on whole sentences could cheat by reading ahead; the mask removes the answer. |
| `beam-search` Beam search: keep the best few partial sentences, not just one | tokens-decoding | core | 1 | est-CM | `greedy-decoding` | Keeping more candidates always gives better text (it can favour short, bland output). |

### Generative Models (`generative-models`): 11 new

| Concept | Topic | Level | Demand | Evidence | Prerequisites | Misconception it targets |
|---|---|---|---:|---|---|---|
| `diffusion-denoising` Diffusion: learn to remove a little noise, then repeat from pure static **(wave 1)** | diffusion | core | 3 | est-CM | `gradient-descent` | Image generators collage or retrieve stored pictures. |
| `generative-memorisation` Duplicated training images can come back out almost exactly | diffusion | core | 3 | est-CM | `diffusion-denoising`, `training-data-dedup` | Generators never reproduce training data; duplicates are the exception that gets memorised. |
| `autoencoder-bottleneck` Autoencoders: squeeze through a bottleneck, rebuild what matters | autoencoders-vae | core | 2 | est-CM | `pca-compression` | A network asked to copy its input learns nothing; the bottleneck forces a summary. |
| `vae-smooth-latent` VAEs: a smooth latent space where every point decodes to something | autoencoders-vae | stretch | 2 | est-CM | `autoencoder-bottleneck` | Any point between two codes in an autoencoder decodes to a blend; in a plain one it decodes to garbage. |
| `gan-forger-detective` GANs: a forger and a detective improve each other | gans | core | 2 | est-CM | `decision-boundary` | The generator copies real images; it never sees them, only the detective's verdict. |
| `gan-mode-collapse` Mode collapse: the forger finds one fake that works and stops | gans | core | 2 | est-CM | `gan-forger-detective` | A generator that fools the detector has learned the whole data. |
| `classifier-free-guidance` Guidance: turn up the prompt, get more on-topic and less varied images | diffusion | core | 2 | est-CM | `diffusion-denoising` | Following the prompt harder is free; it trades away diversity. |
| `diffusion-step-count` Fewer denoising steps, faster and blurrier samples | diffusion | stretch | 1 | est-CM | `diffusion-denoising` | Generation is one jump from noise to picture. |
| `latent-diffusion` Latent diffusion: denoise a small compressed sketch, then decode it | diffusion | stretch | 1 | est-CM | `diffusion-denoising`, `autoencoder-bottleneck` | Diffusion works pixel by pixel at full size. |
| `normalising-flows` Normalising flows: an invertible warp from a simple blob to the data | flows-autoregressive | stretch | 1 | est-CM | `probability:bayesian-updating` | You cannot both sample and compute exact probabilities from a generative model. |
| `generative-eval-tradeoff` Scoring generated images: realism and variety pull apart | gans | stretch | 1 | est-CM | `gan-mode-collapse` | One quality score can rank generators; a model can be realistic and repetitive. |

### Reinforcement Learning (`reinforcement-learning`): 34 new

| Concept | Topic | Level | Demand | Evidence | Prerequisites | Misconception it targets |
|---|---|---|---:|---|---|---|
| `mdp-basics` State, action, reward, next state: the loop an RL agent lives in **(wave 1)** | mdp-value | intro | 3 | est-F | none | An RL agent is told the right move, as with labelled data; it only gets a score, often late. |
| `value-vs-reward` Value is not reward: a square that pays nothing can be worth a lot **(wave 1)** | mdp-value | intro | 3 | est-F | `mdp-basics` | The best move is the one with the biggest immediate reward. |
| `q-learning` Q-learning: learn what each move is worth in each place **(wave 1)** | td-control | core | 3 | est-F | `value-vs-reward`, `exploration-exploitation` | An agent needs a map of the world to choose good moves. |
| `reward-shaping` Reward shaping: hints that speed learning can change what is learned **(wave 1)** | reward-design | core | 3 | est-F | `value-vs-reward`, `reward-hacking` | Any helpful extra reward keeps the goal the same; only potential-based shaping is guaranteed to. |
| `inverse-rl-goal-inference` Inverse RL: infer the goal from what the expert did **(wave 1)** | inverse-rl-imitation | core | 3 | est-F | `value-vs-reward` | Demonstrations show what to do, and that is all they hold; they also carry evidence about what the demonstrator wants. |
| `reward-ambiguity` Many rewards explain the same behaviour, even a reward of zero **(wave 1)** | inverse-rl-imitation | core | 3 | est-F | `inverse-rl-goal-inference` | Behaviour pins down a single true reward. |
| `policy-from-values` A policy says what to do; values say how good it is, and one gives the other | mdp-value | core | 2 | est-F | `value-vs-reward` | Policy and value are two names for the same thing. |
| `bellman-backup` Bellman updates: value flows back from the goal one sweep at a time | mdp-value | core | 2 | est-F | `value-vs-reward` | To value a square you must simulate every future path from it; each square only needs its neighbours' values. |
| `monte-carlo-vs-td` Wait for the end, or learn from a guess: Monte Carlo vs temporal-difference | td-control | core | 2 | est-F | `bellman-backup` | You must finish an episode to learn anything from it. |
| `td-error-surprise` TD error: learning is driven by surprise, not by reward | td-control | core | 2 | est-F | `monte-carlo-vs-td` | An expected reward teaches as much as an unexpected one. |
| `deep-q-function-approx` When the table is too big: a network guesses values for unseen states | td-control | stretch | 2 | est-F | `q-learning`, `hidden-layers-xor` | An RL agent must visit every state to value it. |
| `policy-gradient` Policy gradients: make whatever came before a high score a little more likely | policy-methods | core | 2 | est-F | `mdp-basics`, `gradient-descent` | Learning to act needs a value for every state. |
| `ucb-optimism` Optimism under uncertainty: try the option you know least about | exploration | core | 2 | est-F | `exploration-exploitation` | Exploring means choosing at random; UCB explores where uncertainty is largest. |
| `sparse-reward-exploration` Sparse rewards: random wandering almost never finds the key | exploration | core | 2 | est-F | `mdp-basics` | Given enough time random exploration finds any reward; the odds shrink exponentially with path length. |
| `curiosity-noisy-tv` Curiosity bonuses: rewarding surprise, and the TV of static that traps it | exploration | stretch | 2 | est-F | `sparse-reward-exploration` | Rewarding novelty always makes an agent explore usefully. |
| `credit-assignment` Credit assignment: which of twenty moves earned the win? | reward-design | core | 2 | est-F | `mdp-basics` | The last move before a reward gets the credit. |
| `model-based-planning` Model-based RL: learn the rules, then plan in your head | model-based-offline | core | 2 | est-F | `bellman-backup` | RL always learns by trial and error in the real world. |
| `mcts-playouts` Monte Carlo tree search: random playouts rate a move, the tree grows where it looks good | model-based-offline | core | 2 | est-F | `model-based-planning`, `cs:minimax` | Game AIs search every move to the end; MCTS samples and focuses. |
| `self-play` Self-play: an agent improves by beating last week's self | model-based-offline | core | 2 | est-F | `policy-gradient` | An agent needs expert opponents or human games to get strong. |
| `offline-rl-extrapolation` Offline RL: a logged dataset cannot vouch for moves nobody tried | model-based-offline | core | 2 | est-F | `q-learning`, `distribution-shift` | With enough logged data you can learn any policy without acting. |
| `behaviour-cloning-drift` Behaviour cloning: copy the expert, drift off their path, never come back | inverse-rl-imitation | core | 2 | est-F | `mdp-basics`, `distribution-shift` | Copying demonstrations perfectly gives expert performance; small slips lead to states the expert never showed. |
| `max-entropy-irl` Maximum-entropy IRL: the reward that explains the choices without over-claiming | inverse-rl-imitation | stretch | 2 | est-F | `reward-ambiguity`, `boltzmann-rational-demos` | Choose the reward that makes the expert look most decisive. |
| `irl-reward-transfer` Copied moves or learned goal: which one survives a new map? | inverse-rl-imitation | core | 2 | est-F | `inverse-rl-goal-inference`, `behaviour-cloning-drift` | Imitation and inverse RL learn the same thing; only the goal transfers when the layout changes. |
| `rlhf-as-irl` RLHF is inverse RL from comparisons: the reward is inferred from "A beats B" | inverse-rl-imitation | core | 2 | est-F | `preference-ranking`, `inverse-rl-goal-inference` | RLHF is people writing rules for the model. |
| `sarsa-vs-q-cliff` Cliff walk: Q-learning hugs the edge, SARSA keeps away | td-control | stretch | 1 | est-F | `q-learning` | Every learner converges to the same path; off-policy learning ignores its own exploration slips. |
| `q-overestimation` Max of noisy guesses is too high: why Q-learning overestimates (double Q) | td-control | stretch | 1 | est-F | `q-learning` | Taking the best estimate gives an unbiased estimate of the best. |
| `experience-replay` Experience replay: shuffle old memories so new ones do not overwrite them | td-control | stretch | 1 | est-F | `deep-q-function-approx` | Learning in the order experiences happen is the most faithful way. |
| `policy-gradient-baseline` A baseline cuts the noise: judge a move against the average run | policy-methods | stretch | 1 | est-F | `policy-gradient` | If every reward is positive, every action gets reinforced equally hard. |
| `actor-critic` Actor-critic: one part chooses, the other says how well it is going | policy-methods | stretch | 1 | est-F | `policy-gradient-baseline`, `td-error-surprise` | Value methods and policy methods are rival camps; actor-critic uses both. |
| `ppo-clipping` PPO: cap each policy update so one lucky run cannot wreck it | policy-methods | stretch | 1 | est-F | `policy-gradient` | A bigger update after a great run is always better. |
| `thompson-sampling` Thompson sampling: act on one random plausible belief at a time | exploration | stretch | 1 | est-F | `ucb-optimism`, `probability:bayesian-updating` | Randomness in choice is wasted effort; sampling beliefs explores in proportion to doubt. |
| `model-error-compounding` Planning with a learned model: small errors compound step by step | model-based-offline | stretch | 1 | est-F | `model-based-planning` | A model 99% accurate per step is 99% accurate over a long plan. |
| `dagger-correction` Ask the expert where you went wrong: corrections on your own mistakes (DAgger) | inverse-rl-imitation | stretch | 1 | est-F | `behaviour-cloning-drift` | More expert demonstrations fix cloning drift; it needs labels on the learner's own states. |
| `boltzmann-rational-demos` Noisy experts: how often they pick each option shows how much it mattered | inverse-rl-imitation | stretch | 1 | est-F | `inverse-rl-goal-inference`, `softmax-scores` | A demonstrator's mistakes are noise to throw away. |

### Agents, Tools & Evaluation (`agents-tools`): 16 new

| Concept | Topic | Level | Demand | Evidence | Prerequisites | Misconception it targets |
|---|---|---|---:|---|---|---|
| `agent-loop` An agent is a loop: model, tool, observation, repeat **(wave 1)** | tool-use | intro | 3 | est-F | `tool-call-request` | An agent is a smarter model; it is the same model in a loop with tools. |
| `tool-call-request` Tool calls: the model writes a request, ordinary code runs it **(wave 1)** | tool-use | intro | 3 | est-F | `next-token` | The model itself searches the web or runs the code. |
| `agent-checkpoint-recovery` Long runs fail by multiplication; a check after each step changes the sum | planning | core | 3 | est-F | `agent-loop`, `books:checklist-steps-compound` | A 95%-reliable agent finishes 95% of 20-step tasks. Differs from books:checklist-steps-compound by showing what verification and retry recover. |
| `least-privilege-agents` Least privilege: an agent can only break what it can reach | tool-use | core | 3 | est-CM | `tool-call-request` | Safety comes from the model behaving well; permissions bound the damage when it does not. |
| `benchmark-contamination` Benchmark contamination: a test seen in training becomes a memory test **(wave 1)** | evals | core | 3 | est-CM | `data-leakage` | A high benchmark score means the skill; if the questions were in the training text it may mean recall. |
| `plan-vs-react` Plan first or act and look? A fixed plan goes stale when the world answers | planning | core | 2 | est-F | `agent-loop` | A complete plan up front is always better than deciding step by step. |
| `task-decomposition` Subgoals shrink the search: one long task as three short ones | planning | core | 2 | est-F | `agent-loop` | Breaking a task up only adds overhead. |
| `agent-memory-files` Agent memory is what it writes down: the rest is gone next session | memory-context | intro | 2 | est-CM | `context-window` | An assistant remembers past conversations the way a person does. |
| `context-compaction-loss` Summarising a long run to fit the window drops the detail you later need | memory-context | core | 2 | est-CM | `context-window` | A summary keeps everything important; what counts as important is decided before you know the future. |
| `checker-shared-blind-spots` A second model as checker: independent errors cancel, shared ones do not | evals | core | 2 | est-CM | `ensemble-wisdom`, `books:book-crowds-correlated-errors` | Two copies of the same model checking each other are as good as two independent checkers. |
| `agent-cost-growth` Each step re-reads the whole history: agent cost grows faster than its steps | memory-context | core | 2 | est-CM | `agent-loop`, `kv-cache` | A 40-step run costs twice a 20-step run. |
| `benchmark-saturation` Saturated benchmarks: when everyone scores 95%, the test stops ranking | evals | core | 2 | est-CM | `test-score-error-bars` | A 1-point gain near the ceiling is as meaningful as one in the middle. |
| `eval-prompt-sensitivity` Change the prompt format, change the score | evals | core | 2 | est-CM | `test-score-error-bars` | A benchmark score is a property of the model alone. |
| `pass-at-k` pass@k: ten tries make a model look far better than one | evals | core | 2 | est-CM | `probability:at-least-once` | Scores reported at different k are comparable. |
| `llm-judge-bias` Model judges prefer longer answers and answers in their own style | evals | core | 2 | est-CM | `sycophancy` | An AI grader is neutral because it is a machine. |
| `capability-elicitation` A better prompt finds the skill the test said was missing | evals | stretch | 1 | est-CM | `eval-prompt-sensitivity` | If an evaluation did not find a capability, the model does not have it. |

### Probabilistic Machine Learning (`probabilistic-ml`): 12 new

| Concept | Topic | Level | Demand | Evidence | Prerequisites | Misconception it targets |
|---|---|---|---:|---|---|---|
| `ood-overconfidence` Confident far from the data: a softmax score does not know what it has never seen | uncertainty | core | 3 | est-CM | `calibration`, `softmax-scores` | High confidence means the input is familiar. |
| `maximum-likelihood` Maximum likelihood: pick the setting that makes the data least surprising | inference | intro | 2 | est-CM | `cross-entropy-loss` | Fitting a model and computing probabilities are different jobs; minimising cross-entropy is maximising likelihood. |
| `bayesian-posterior-lines` Not one best line but many plausible ones, fanning out where data is thin | uncertainty | core | 2 | est-CM | `linear-regression-fit`, `probability:bayesian-updating` | A fitted model is equally sure everywhere. |
| `gaussian-process-uncertainty` Gaussian processes: uncertainty that swells between and beyond the data | uncertainty | stretch | 2 | est-CM | `bayesian-posterior-lines` | A smooth curve through the points says nothing about where it might be wrong. |
| `aleatoric-vs-epistemic` Two kinds of doubt: noise more data cannot remove, ignorance it can | uncertainty | core | 2 | est-CM | `bayesian-posterior-lines` | All uncertainty shrinks with more data. |
| `conformal-sets` Conformal prediction: a set of answers that holds the truth 90% of the time | uncertainty | core | 2 | est-CM | `calibration` | Honest uncertainty needs a Bayesian model; a held-out calibration set is enough for coverage. |
| `gaussian-mixture-em` Gaussian mixtures: soft membership and the back-and-forth of EM | latent-variables | core | 2 | est-CM | `k-means-clustering` | Each point belongs to exactly one cluster. |
| `mcmc-random-walk` MCMC: a random walk that spends its time where probability is high | sampling-inference | stretch | 2 | est-CM | `probability:bayesian-updating` | To sample from a distribution you must be able to compute it everywhere; ratios of neighbours are enough. |
| `prior-as-regulariser` With three data points the prior wins; with three thousand the data does | inference | core | 1 | est-CM | `probability:bayesian-updating`, `regularisation` | A prior is a bias that ruins objectivity; it is the same as a penalty and fades with data. |
| `ensemble-uncertainty` Where ensemble members disagree, the data ran out | uncertainty | core | 1 | est-CM | `ensemble-wisdom` | A single model's confidence is enough to know when to trust it. |
| `hidden-markov` Hidden Markov models: infer the weather from the umbrellas | latent-variables | core | 1 | est-CM | `probability:bayesian-updating` | Each observation should be read on its own; the hidden state carries information across time. |
| `vi-mode-seeking` Variational inference: a simple bell fitted to a two-humped posterior picks one hump | sampling-inference | stretch | 1 | est-CM | `gaussian-mixture-em` | The best-fitting simple shape covers the whole posterior. |

### Interpretability & Robustness (`interpretability`): 12 new

| Concept | Topic | Level | Demand | Evidence | Prerequisites | Misconception it targets |
|---|---|---|---:|---|---|---|
| `cot-faithfulness` The written reasoning may not be the reason **(wave 1)** | mechanistic | core | 3 | est-CM | `next-token`, `shortcut-learning` | A model's shown steps are a faithful account of how it reached the answer. |
| `saliency-maps` Saliency maps: which pixels moved the score, and why the map can mislead | attribution | core | 2 | est-CM | `adversarial-examples` | A highlighted region is what the model "looked at". |
| `permutation-importance` Shuffle a column, watch the score drop, unless its twin covers for it | attribution | core | 2 | est-CM | `correlated-coefficients` | Feature importance shows what matters; with correlated features each looks unimportant. |
| `shapley-credit` Shapley values: sharing a prediction's credit fairly among features | attribution | stretch | 2 | est-CM | `permutation-importance` | Credit is each feature's effect when changed alone; interactions get split by averaging over orders. |
| `counterfactual-explanations` The smallest change that flips the decision | attribution | core | 2 | est-CM | `decision-boundary` | An explanation must list everything the model used; the nearest flip is often more useful and can be gamed. |
| `polysemantic-neurons` One neuron, many meanings | representations | core | 2 | est-CM | `hidden-layers-xor` | Each neuron stands for one thing. |
| `superposition` Superposition: more features than neurons, packed at angles | representations | stretch | 2 | est-CM | `polysemantic-neurons`, `cosine-similarity` | A layer with 2 neurons can store at most 2 features. |
| `sparse-autoencoder-features` Sparse autoencoders pull packed features apart | representations | stretch | 2 | est-CM | `superposition`, `autoencoder-bottleneck` | Features are hidden in a model beyond reach; a sparse dictionary can recover them. |
| `steering-vectors` Steering: add one direction to the activations, change the behaviour | mechanistic | core | 2 | est-CM | `embeddings` | Changing a model's behaviour needs retraining. |
| `induction-heads` Induction heads: if A was followed by B before, predict B after A | mechanistic | stretch | 2 | est-CM | `attention-weights`, `in-context-learning` | In-context learning is mysterious; part of it is a simple copying circuit. |
| `probing-classifiers` Probes: a simple read-out finds a concept in the activations, but is it used? | representations | stretch | 1 | est-CM | `embeddings` | If a concept can be decoded from a layer, the model uses it. |
| `activation-patching` Activation patching: swap one part's activity to find what causes the answer | mechanistic | stretch | 1 | est-CM | `steering-vectors` | Correlation between an activation and the output shows it causes the output. |

### Applied ML (vision, speech, recommenders, time series) (`applied-ml`): 17 new

| Concept | Topic | Level | Demand | Evidence | Prerequisites | Misconception it targets |
|---|---|---|---:|---|---|---|
| `face-search-false-matches` One in a million, a million faces: why face search returns strangers | vision | core | 2 | est-CM | `accuracy-paradox` | A 99.9%-accurate face matcher is almost always right about a match. |
| `spectrogram-picture` Speech models see sound as a picture: the spectrogram | speech-audio | intro | 2 | est-CM | `cs:audio-sampling` | Speech recognisers listen to the waveform as we hear it. |
| `collaborative-filtering` Collaborative filtering: people who liked what you liked also liked this | recommenders | intro | 2 | est-CM | `cosine-similarity` | Recommenders understand the content they recommend. |
| `matrix-factorisation-tastes` Tastes as a few hidden dials: filling in the ratings table | recommenders | core | 2 | est-CM | `collaborative-filtering` | Each person's taste needs hundreds of numbers to describe. |
| `cold-start` Cold start: no history, no recommendation | recommenders | intro | 2 | est-CM | `collaborative-filtering` | A good recommender works from day one for a new user or item. |
| `persistence-forecast` Tomorrow will be like today: the naive forecast that is hard to beat | time-series | intro | 2 | est-CM | `baseline-first` | A sophisticated forecasting model always beats repeating the last value. |
| `forecast-fan` Forecast uncertainty widens with the horizon | time-series | core | 2 | est-CM | `persistence-forecast`, `big-ideas:chaos-butterfly` | A model good at tomorrow is about as good at next month. |
| `drift-monitoring` Catch drift in the inputs before the accuracy report arrives | tabular-anomaly | core | 2 | est-CM | `distribution-shift` | You will know a model degraded when accuracy drops; labels often come weeks late. |
| `offline-online-gap` Offline metric up, live metric down | tabular-anomaly | core | 2 | est-CM | `feedback-loops` | A model that scores better on logged data will do better live. |
| `object-detection-iou` Object detection: a box counts if it overlaps enough (IoU) | vision | core | 1 | est-CM | `confusion-matrix` | A detection is right or wrong; the overlap threshold chooses which. |
| `non-max-suppression` Non-max suppression: one object, one box | vision | stretch | 1 | est-CM | `object-detection-iou` | A detector naturally outputs one box per object. |
| `segmentation-per-pixel` Segmentation: a label for every pixel, not a box | vision | intro | 1 | est-CM | `convolution-weight-sharing` | Finding an object and outlining it are the same task. |
| `ctc-alignment` Speech to text without timing labels: collapse repeats, drop blanks | speech-audio | stretch | 1 | est-CM | `spectrogram-picture` | Training speech recognition needs every sound labelled with its moment. |
| `ranking-top-heavy` Ranking metrics: only the top few results count (NDCG) | recommenders | stretch | 1 | est-CM | `auc-ranking` | Getting the order right anywhere in the list counts the same. |
| `seasonality-decomposition` Trend plus season plus noise: pulling a series apart | time-series | intro | 1 | est-CM | `linear-regression-fit` | A December spike means the trend changed. |
| `isolation-forest` Isolation forest: oddballs get cut off in a few random splits | tabular-anomaly | core | 1 | est-CM | `decision-tree-splits` | Finding anomalies needs a description of normal. |
| `sim-to-real-gap` Sim to real: a robot perfect in simulation trips on a real floor (and randomisation) | robotics | core | 1 | est-CM | `distribution-shift` | A more accurate simulator is the only fix; randomising the simulator makes the policy robust. |

### Optimisation, Search & Vector Retrieval (`optimisation-search`): 23 new

| Concept | Topic | Level | Demand | Evidence | Prerequisites | Misconception it targets |
|---|---|---|---:|---|---|---|
| `evolution-strategies` Evolution strategies: jiggle, score, step toward the winners, no gradients needed **(wave 1)** | evolution-strategies | core | 3 | est-F | `local-minima` | You need gradients (backpropagation) to optimise a model. |
| `cma-es-shape` CMA-ES: the search cloud stretches along the valley it finds **(wave 1)** | evolution-strategies | core | 3 | est-F | `evolution-strategies` | A search should sample evenly in every direction; CMA-ES learns the valley's shape from its own winners. |
| `novelty-search` Novelty search: rewarding the new escapes the trap the objective set | quality-diversity | core | 3 | est-F | `deceptive-objective` | Ignoring the objective cannot beat optimising it. |
| `map-elites` MAP-Elites: keep the best of every kind, not one best **(wave 1)** | quality-diversity | core | 3 | est-F | `evolution-strategies` | Search should return a single best answer. |
| `hnsw-navigable-graph` HNSW: express lanes over a graph of neighbours, greedy hops down to the answer **(wave 1)** | vector-search | core | 3 | est-F | `retrieval-top-k`, `cs:greedy-failure` | Search must compare the query with every stored vector; HNSW checks a few hundred, and greedy hops can stop at a near miss. |
| `submodular-greedy-guarantee` Greedy picking is never worse than 63% of the best possible set **(wave 1)** | submodular-selection | core | 3 | est-F | `economics:diminishing-returns`, `cs:greedy-failure` | Greedy can be arbitrarily bad (cs:greedy-failure); for diminishing-returns objectives it carries a guarantee. |
| `genetic-crossover` Genetic algorithms: crossover helps only when good parts are separable | evolution-strategies | core | 2 | est-F | `evolution-strategies` | Mixing two good solutions gives a better one. |
| `deceptive-objective` Deceptive objectives: the point closest to the goal is a dead end | quality-diversity | core | 2 | est-F | `local-minima` | Always moving closer to the goal is the way to reach it. |
| `pareto-front` Pareto front: no single best when two goals conflict | quality-diversity | core | 2 | est-CM | none | Combining two goals into one weighted score finds every good trade-off; a weighted sum misses dents in the front. |
| `random-vs-grid-search` Random search beats grid search when only a few knobs matter | black-box | core | 2 | est-CM | none | A grid covers the space more systematically, so it must be better. |
| `bayesian-optimisation` Bayesian optimisation: spend the next expensive try where it could be best | black-box | stretch | 2 | est-CM | `gaussian-process-uncertainty` | When each trial is costly, try the best-looking point; the most promising uncertain point is often better. |
| `simulated-annealing-tour` Simulated annealing: accept a worse tour now to find a shorter one later **(wave 1)** | local-search-tsp | core | 2 | est-F | `local-minima`, `cs:nearest-neighbour-tour` | A good search never takes a step that makes things worse. |
| `ann-recall-speed` Approximate nearest neighbours: 100 times faster, and sometimes misses the true nearest | vector-search | core | 2 | est-F | `retrieval-top-k` | Vector search returns the exact nearest matches. |
| `kd-tree-high-dim` k-d trees stop pruning in 100 dimensions: why vector search needs other tricks **(wave 1)** | vector-search | stretch | 2 | est-F | `curse-of-dimensionality`, `cs:algo-kd-nearest-pruning` | A spatial index that is fast on a map is fast on embeddings. Differs from cs:algo-kd-nearest-pruning (how pruning works) by showing it failing as dimensions grow. |
| `submodular-coverage-gains` Coverage has diminishing returns: the same camera adds less to a bigger set | submodular-selection | core | 2 | est-F | `economics:diminishing-returns` | Each pick's value is fixed; with coverage it depends on what is already picked. Differs from economics:diminishing-returns (one input's curve) by being about sets. |
| `mmr-diverse-retrieval` Diverse retrieval: the five most similar passages may say the same thing | submodular-selection | core | 2 | est-F | `retrieval-top-k`, `submodular-coverage-gains` | The top five matches are the five most useful. |
| `es-step-size-adaptation` Step-size adaptation: widen when winning often, shrink when not (1/5 rule) | evolution-strategies | stretch | 1 | est-F | `evolution-strategies` | A fixed step size is fine if chosen well. |
| `premature-convergence` Premature convergence: the population loses variety and stalls | evolution-strategies | core | 1 | est-F | `genetic-crossover` | Keeping only the best is the fastest route to the optimum. |
| `qd-stepping-stones` Stepping stones: the elite in one cell is the parent of a better one elsewhere | quality-diversity | stretch | 1 | est-F | `map-elites` | Poor solutions are dead weight. |
| `behaviour-descriptor-choice` What counts as different? The behaviour descriptor decides what QD finds | quality-diversity | stretch | 1 | est-F | `map-elites` | Diversity is objective; it is defined by the axes the designer picks. |
| `ant-colony-tours` Ant colony optimisation: trails that fade unless used again | local-search-tsp | stretch | 1 | est-F | `simulated-annealing-tour` | The most-used route is the best route; evaporation stops early luck from locking in. |
| `ivf-probe-clusters` Inverted-file search: look only inside the nearest clusters | vector-search | stretch | 1 | est-F | `ann-recall-speed`, `k-means-clustering` | Probing one cluster is enough; the true neighbour often sits just over a border. |
| `product-quantization` Product quantization: a vector becomes a short code, distances survive roughly | vector-search | stretch | 1 | est-F | `ann-recall-speed`, `k-means-clustering` | Compressing a vector to 8 bytes destroys its meaning. |

### AI Safety & Society (`ai-society`): 17 new

| Concept | Topic | Level | Demand | Evidence | Prerequisites | Misconception it targets |
|---|---|---|---:|---|---|---|
| `injection-lethal-trifecta` Private data, untrusted text, a way out: the three that make injection dangerous **(wave 1)** | privacy-security | core | 3 | est-F | `prompt-injection`, `tool-call-request` | Prompt injection is a chatbot saying something rude; with tools it can send data out. |
| `jailbreak-surface-refusal` Jailbreaks: a refusal learned from phrasing, beaten by rephrasing | privacy-security | core | 3 | est-CM | `shortcut-learning` | Safety training teaches the model what is harmful; it may learn what harmful requests look like. |
| `ai-detector-false-positives` AI-text detectors flag honest writers: base rates again **(wave 1)** | information | core | 3 | est-CM | `accuracy-paradox` | A detector that is 95% accurate means a flagged essay is 95% likely AI-written. |
| `energy-train-vs-serve` Energy: training once vs answering a billion times **(wave 1)** | copyright-labour-energy | core | 3 | est-CM | none | Training is where AI's energy goes; at scale, serving queries can match or exceed it. Real-system numbers must be cited and dated. |
| `backdoor-trigger` Backdoors: a planted trigger word that flips the model | privacy-security | core | 2 | est-CM | `shortcut-learning` | A model that passes every test is clean; a trigger absent from tests stays hidden. |
| `membership-inference` Membership inference: a model is more confident on what it trained on | privacy-security | core | 2 | est-CM | `overfitting` | Releasing a model, not the data, keeps the data private. |
| `differential-privacy-noise` Differential privacy: noise sized so no one person changes the answer | privacy-security | core | 2 | est-CM | `membership-inference` | Removing names makes a dataset private. |
| `text-watermark-paraphrase` Text watermarks: a hidden lean in word choice, and paraphrase erases it | information | core | 2 | est-CM | `temperature-sampling` | AI text can be invisibly and permanently marked. |
| `deepfake-detector-arms-race` Every published detector becomes training signal for the next fake | information | core | 2 | est-CM | `gan-forger-detective` | Detection technology will eventually win against fakes. |
| `single-source-influence` One artist in a billion images: what removing a source changes, and what duplicates change | copyright-labour-energy | core | 2 | est-CM | `generative-memorisation` | Each source contributes equally, so opting out has the same effect for everyone. Legal claims stay out; only the mechanism is taught. |
| `task-exposure` Automation hits tasks, not whole jobs | copyright-labour-energy | core | 2 | est-CM | none | A job is either automatable or not; it is a bundle of tasks with different exposure. |
| `risk-tier-regulation` Risk tiers: the same model, regulated by what it is used for | governance | core | 2 | est-CM | none | AI law regulates models; risk-based rules like the EU AI Act mostly regulate uses. Claims cite the legal text. |
| `red-teaming-search` Red teaming: failures found by searching, not by waiting | safety-testing | core | 2 | est-CM | `zero-failure-testing` | Normal use reveals a model's failures; rare ones need a targeted search. |
| `behaves-when-watched` A model that behaves when tested: tests only see test conditions | safety-testing | stretch | 2 | est-CM | `shortcut-learning`, `distribution-shift` | Passing a safety evaluation shows a model is safe in deployment. |
| `automation-bias` Automation bias: people stop checking a mostly-right assistant | safety-testing | core | 2 | est-CM | `zero-failure-testing` | A human in the loop catches the machine's errors; vigilance drops as the machine gets better. |
| `compute-thresholds` Regulating by training compute: a line in FLOPs, and what slips under it | governance | stretch | 1 | est-CM | `scaling-laws` | A compute threshold tracks capability exactly; efficiency gains move capability below it. |
| `options-keep-open` Most goals are easier with more options: why optimisers grab resources | safety-testing | stretch | 1 | est-CM | `value-vs-reward` | An agent only seeks power if told to; in many random goals, keeping options open is optimal. |

