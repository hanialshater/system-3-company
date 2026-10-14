# Statistics & Inference briefs (cm-probability-statistics)

Ranked briefs for this strand, in the same format as `probability.md` (`### N. slug · concept: <id> · level · demand N`). `tools/claim.mjs next probability` hands these out after the domain's own list. Check every brief's answer in node before adding it.

## Networks, Crowds, and Markets, batch 1 (session 2, 2026-10-14)

Source: vertical review `company/rituals/records/2026-10-14-vertical-review-ncm.md` §3 (S2-08). Concept `information-cascade` is new in `content/curriculum/probability.json` (core, demand 2, prerequisite `bayesian-updating`, built as `which-coin-is-it`). Section numbers: the book page could not be fetched from this sandbox (proxy 403), so every § below is **unconfirmed** and the fact-checker or demo-builder confirms it against the free PDF. Overlap: no lesson or brief teaches cascades (grep of `src/demos/**/meta.json` and `company/domains/briefs/*.md`). The nearest are `which-coin-is-it` and `second-positive-test`, which teach one person updating on evidence, not a crowd copying earlier choices.

### 1. two-said-blue · concept: information-cascade · core · demand 2
- curriculum.references: easley-kleinberg-2010 ch. 16 §16.2-16.5 (§ unconfirmed; the urn experiment is §16.2, Bayes' rule §16.3-16.4, the general model §16.5, from memory of the contents)
- Learner knows: that a clue that is right 2 times in 3 beats a coin flip, and that more independent clues help (`which-coin-is-it`) / does not know: that a clue copied from a crowd's choices is not an independent clue, so a crowd can stop adding information.
- Misconception: When many people independently choose the same way, they are probably right.
- Prediction: "A hidden urn is mostly blue or mostly red. Each of 100 people gets a private clue that is right 2 times in 3, sees everyone's earlier choices, and picks a colour. How often does the crowd lock onto the wrong colour?" options: A) almost never (under 1 time in 100) / B) about 1 time in 5 / C) about half the time (answer: B). The stage shows only the setup and the Run control, not any rate.
- Check (re-run in node 2026-10-14, seeded mulberry32): rule: a person follows the crowd when one colour leads by 2 or more, otherwise follows their own clue (a tie follows their own clue). Exact: signals reveal themselves until a lead of 2, a gambler's-ruin walk with step +1 at 2/3 and -1 at 1/3, absorbed at +-2: P(wrong) = (1/3)^2 / ((1/3)^2 + (2/3)^2) = 1/5 = 20.0%. Seeds 1..10,000 of 100 people give 1,991 wrong (19.9%); seeds 1..100 give 18 wrong. Every one of the 10,000 sequences cascaded by person 100. Wrong cascades are a first-two-both-wrong event 1/9 of the time. The pooled-vote contrast: if all 100 clues were pooled and counted, the majority is wrong with probability 0.0199% (exact binomial; a further 0.0220% is an exact 50-50 tie), about 1 in 5,000. Accuracy chips: 60% gives 30.8% (sim 30.9%), 80% gives 5.9% (sim 5.9%), by the same formula q^2/(q^2+p^2).
- Key state: the learner has run at least 100 sequences (the 100-run chip) so the tally of wrong cascades is on the stage, and has seen at least one sequence's row of 100 choices go all one colour from about person 3 to 5.
- Interaction: the urn is hidden, truth is blue (stated as the model's setup, the learner is not told the colours of the clues until a run). Stage: a row of 100 dots (blue or red choice) for the latest sequence, with a marker where the crowd began ignoring clues. Controls: Run 1 · Run 100 · Run 10,000 (seeded, disclosed) · clue accuracy chips 60% / 67% / 80% · a "pool the clues" toggle that replaces the crowd's choices with a plain vote of all 100 clues. Tally: wrong locks out of runs. Run is computed then replayed in under 400 ms.
- Payoff: After two matching choices, a person's own clue can no longer change the crowd's pick, so the crowd adds no new information and a bad start (first two clues both wrong, 1 in 9) sticks. About 1 run in 5 locks on the wrong colour, while a pooled vote of the same 100 clues is wrong about 1 time in 5,000. (Reveal quotes the learner's own tally with its seed, and the exact 20% beside it.)
- Planned claims:
  1. In the model, once one colour leads by 2 every later person (clue right 2/3) picks it whatever their own clue says. Support: derivation (Bayes' rule: two net matching signals give posterior odds 4 to 1 for the leader, and one opposing clue only brings it to 2 to 1, still favouring the leader). Source: Easley & Kleinberg 2010 ch. 16 (§ unconfirmed).
  2. The chance the lock-in is on the wrong colour is q^2/(q^2+p^2) = 1/5 when p = 2/3. Support: derivation plus seeded simulation (1,991 of 10,000). Source: gambler's-ruin calculation above; book ch. 16.
  3. A pooled vote of 100 independent 2/3-clues is wrong with probability about 0.0199% (plus a 0.0220% chance of an exact tie). Support: derivation (binomial, `exact`). Source: computed in node.
  4. Real-world statement, if any, framed as the model's: "In the classroom urn experiment (Anderson and Holt 1997) cascades formed in the lab." Support: empirical, **needs a human source check by the fact-checker**; drop it if unverified. Do not claim real-world herding (stock, restaurants) beyond what the book states.
  5. Seed and tie rule are disclosed on the stage. Support: code.
- Format: Simulation run (formats.md; default, kit support today). Needs an interaction-designer spec: no (row of 100 dots, three run chips, one toggle, tally; fits the existing simulation run anatomy; the 100-dot row must stay legible at 390 px, dots >= 3 px, stated in the build note rather than a spec).
- Illustrations: none needed. If a hero is used, one 1:1 urn (<= 96x96, top right, predict only, not covering the question); no picture beside the live row.
- Differs from: `which-coin-is-it` (one person, one pile of evidence, odds double per head) and `second-positive-test` (base rate). Those update on independent evidence; this one is evidence that stops being independent when people copy.
- Not in this brief: the book's "bank run / fashion" examples, the fragility of cascades to a public signal, and the general model with different signal strengths (§16.5-16.6). A second lesson, `cascade-breaks-on-one-whisper` (one person with a better signal breaks a cascade), is a candidate for batch 2 if this one lands.

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
