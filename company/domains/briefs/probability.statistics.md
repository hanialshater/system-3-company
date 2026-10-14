# Statistics & Inference briefs (cm-probability-statistics)

Ranked briefs for this strand, in the same format as `probability.md` (`### N. slug · concept: <id> · level · demand N`). `tools/claim.mjs next probability` hands these out after the domain's own list. Check every brief's answer in node before adding it.

## Course: NCM (2026-10-14)

Accepted by cm-probability-statistics (Hugo) after re-running each answer in node. Brief 2 accepted with an edit (see its Check line).

#### 1. two-public-clues-break-the-herd · concept: probability:cascade-fragility · core · demand 2 · rank 18 · format: Before / after toggle (publish two clues)
- Sections: ch. 16.6 (unconfirmed), 16.7 (unconfirmed) · domain: probability
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: two-said-blue (batch 1): after a lead of 2, people ignore their own clue / does not know: that a cascade of 100 followers carries only the first two clues, so two public clues can overturn it.
- Misconception: A choice followed by 100 people is backed by 100 people's evidence.
- Prediction (stage text ≤ 25 words): "Two chose blue, then 98 followed. Now two new private clues are published: both red. Your own clue is red. Choose?" options: A. Blue, with the 100 / B. Red / C. Toss-up (answer: B (red: chance of the blue urn falls to 33%)).
- Check: Clues right 2/3 of the time, prior 1/2. Node: `16.6 {"afterCascadeInformativeBlue2_publicRed2_ownRed":0.333,"ownBlue":0.667,"inCascadeOwnRed":0.667}`. The 98 followers add no information, so the count is 2 blue vs 3 red.
- Reveal (one line): The 98 followers ignored their clues, so the crowd held only two clues; two public red clues plus yours outweigh them, and the herd can flip.
- Planned claims:
  1. In a cascade, people after the first two follow regardless of their own clue, so their choices reveal nothing. support: derivation; source: E&K ch. 16 (sections unconfirmed); Bikhchandani, Hirshleifer and Welch (1992), J. Political Economy 100(5). Attribution: fact-checker confirms.
  2. With clues right 2/3 of the time, 2 blue and 3 red clues give the blue urn a 33% chance. support: derivation; source: node Bayes.
  3. Without the published clues, the same person with a red clue in the cascade still rates blue at 67%. support: derivation; source: node Bayes.
- curriculum: `{"primary":"probability:cascade-fragility","also":["probability:bayesian-updating"],"prerequisites":["probability:bayesian-updating"],"level":"core","strand":"statistics","references":[{"work":"easley-kleinberg-2010","chapter":16,"section_unconfirmed":"16.6–16.7"}],"tags":["cascades","Bayes","herding"]}`
- Needs interaction-designer spec: yes.
- Differs from nearest: two-said-blue (batch 1) shows cascades starting and going wrong; this shows why they are fragile. Build after it.

#### 2. friends-split-more-than-chance · concept: probability:homophily-test · core · demand 2 · rank 25 · format: Simulation run (random friendship draws)
- Sections: ch. 4.1 (unconfirmed) · domain: probability
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: groups, proportions / does not know: that the yardstick for 'friends sort by group' is the cross-group share random pairing would give (about 2pq).
- Misconception: If one in five friendships crosses groups, that is about what you'd expect when one in three people is in the smaller group.
- Prediction (stage text ≤ 25 words): "Class of 30: 20 in one group, 10 in the other. If friendships ignored group, what share would cross groups?" options: A. About 33% / B. About 46% / C. About 20% (answer: B (200 of 435 pairs = 46%; 2pq = 44% for large groups)).
- Check: Node (exact binomial, 45 friendships each crossing with chance 200/435): `4.1 {"exactCrossShare":0.46,"twoPQ":0.444,"expectedCrossOf45":20.69,"pAtMost9":0.00026}`. The class's 9 of 45 (20%) is about 1 chance in 4,000. (Hugo edit: the brief said it never occurred in 20,000 draws; exact value predicts about 5 such draws.)
- Reveal (one line): Chance mixing gives about 46% crossing; the class has 20%. That gap, not the 20% alone, is the evidence of homophily.
- Planned claims:
  1. With 20 and 10 students, 200 of the 435 possible pairs cross groups (46%). support: derivation; source: node.
  2. For large groups with shares p and q the chance share is 2pq: 44% for 2/3 and 1/3. support: derivation; source: E&K ch. 4 (section unconfirmed).
  3. If each of 45 friendships crosses groups with chance 46%, 9 or fewer crossing has probability about 0.03% (1 in 4,000). support: derivation; source: node binomial.
- curriculum: `{"primary":"probability:homophily-test","also":[],"prerequisites":["probability:sample-size-noise"],"level":"core","strand":"statistics","references":[{"work":"easley-kleinberg-2010","chapter":4,"section_unconfirmed":"4.1"}],"tags":["homophily","hypothesis test","networks"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: probability/selected-and-now-opposed and better-in-every-group are about misleading comparisons; this one builds the chance baseline for a network count. friends-have-more-friends is a sampling effect, not group mixing.

#### 3. the-pivotal-juror-convicts · concept: probability:pivotal-voting · stretch · demand 2 · rank 27 · format: Single card
- Sections: ch. 23.8 (unconfirmed), 23.9 (unconfirmed) · domain: probability
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: Bayes' rule (which-coin-is-it); a unanimous jury / does not know: that your vote matters only when you are pivotal, and being pivotal is itself evidence.
- Misconception: A juror should simply vote what their own clue says.
- Prediction (stage text ≤ 25 words): "Three jurors, clues 70% reliable. Unanimity needed to convict. Your clue says innocent. In the one case your vote matters, how likely is guilt?" options: A. 30% / B. 50% / C. 70% (answer: C (70%: the other two must have guilty clues)).
- Check: Prior 1/2, sincere others. Node: `23.8 {"ownInnocentAlone":0.3,"pivotalUnderUnanimity_twoGuiltyPlusOwnInnocent":0.7}`.
- Reveal (one line): Your vote only counts when both others vote guilty, which means two guilty clues against your one: guilt is 70% likely, so 'vote your clue' throws evidence away.
- Planned claims:
  1. With 70%-reliable clues and a 50% prior, one innocent clue alone gives 30% guilt; two guilty clues and one innocent give 70%. support: derivation; source: node Bayes.
  2. Under unanimity a juror's vote changes the verdict only if every other juror votes to convict. support: derivation; source: rule.
  3. Strategic voting under unanimity can make convicting the innocent more likely than under majority rule. support: citation; source: Feddersen and Pesendorfer (1998), Am. Political Science Rev. 92(1); E&K ch. 23. Attribution: fact-checker confirms.
- curriculum: `{"primary":"probability:pivotal-voting","also":["probability:bayesian-updating"],"prerequisites":["probability:bayesian-updating"],"level":"stretch","strand":"statistics","references":[{"work":"easley-kleinberg-2010","chapter":23,"section_unconfirmed":"23.8–23.9"}],"tags":["voting","Bayes","juries"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: ai/five-weak-voters (Condorcet jury theorem) assumes sincere independent votes add up; this lesson shows why sincere votes are not always rational.
