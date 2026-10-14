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

**Wave J additions (2026-10-14).** 2 more NCM briefs from `company/courses/ncm/briefs.md` (§ probability.statistics (wave J)), proposed by cm-course-ncm. Acceptance was done by cm-course-ncm against this strand's rules, at the Wave J lead's instruction (re-run answers in node, equal-precision options, chapter-only references, no duplicate of a built lesson). `probability` strand manager: re-check, and object in the course file if a brief fails your bar. Board item filed. Numbering continues this file's list so `tools/claim.mjs` hands these out.

### 71. your-clue-against-two-picks · concept: probability:cascade-bayes-threshold · core · demand 2 · format: Single card (combine button, accuracy chips)
- Sections: E&K ch. 16 (section 16.3–16.5, unconfirmed) · domain: probability · course: ncm (wave J)
- Learner knows: Bayes' rule with clues (which-coin-is-it); the copy rule in two-said-blue / does not know: that after two matching picks your opposite clue cancels only one of them, so copying is right whatever the clue accuracy.
- Misconception: If your own clue is very reliable, you should trust it over two other people's picks.
- Prediction (stage text ≤ 25 words): "Clues are right 90% of the time. Two people before you followed their clues: blue, blue. Your clue says red. Chance it's blue?" options: A. 10% / B. 50% / C. 90% (answer: C (90%)).
- Check: Node `J8 [{"q":0.6,"P":0.6},{"q":0.75,"P":0.75},{"q":0.9,"P":0.9},{"q":0.99,"P":0.99}]`: P(blue | blue, blue, red) = q²(1−q) / (q²(1−q) + (1−q)²q) = q. With one earlier blue pick only, `J8one` gives 0.5 at every q (a tie; the rule follows your own clue).
- Stage and controls: Three clue tiles (blue, blue, red) above an odds bar: each blue tile multiplies the odds for blue by q/(1−q) (×9 at 90%), the red tile divides by it. Controls in DOM order: [Combine the clues] [60%] [75%] [99%] [One pick before you]. Readout "chance blue: N%". Labels ≥ 10 px.
- QA path (each control once, DOM order, presets only): Each control once in DOM order: Combine (milestone 1: 90%, the question's case), 60% (60%), 75% (75%), 99% (milestone 2: 99%), One pick before you (50%). The reveal quotes the recorded values.
- Reveal (draft, ≤ 90 words, fits a 390×844 phone with the stage top visible): Your red clue cancels one blue pick, leaving one clue's worth for blue: 9 × 9 ÷ 9 = 9 to 1, so 90%. On the chips it came out 60%, 75% and 99%: always exactly the clue accuracy, always above half. However good the clues, after two matching picks copying is the better bet, which is why the herd starts at a lead of two. (≤ 90 words.)
- Planned claims:
  1. With clues right q of the time and a 50–50 prior, after two earlier picks that followed their clues (blue, blue) and your red clue, the chance of blue is exactly q: 60%, 75%, 90%, 99% for the chips. support: derivation; source: node.
  2. With only one earlier blue pick and your red clue, the chance is 50% at any accuracy. support: derivation.
  3. In the urn model a person copies the crowd once one colour leads by two. support: citation; source: E&K ch. 16 (section unconfirmed); Bikhchandani, Hirshleifer and Welch (1992). Attribution: fact-checker confirms.
- Format: Single card (combine button, accuracy chips)
- Curriculum: `{"primary": "probability:cascade-bayes-threshold", "also": ["probability:bayesian-updating"], "prerequisites": ["probability:information-cascade", "probability:bayesian-updating"], "level": "core", "strand": "statistics", "references": [{"work": "easley-kleinberg-2010", "chapter": 16, "section_unconfirmed": "16.3–16.5"}], "tags": ["cascade", "bayes", "crowds"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: probability/two-said-blue states the lead-of-two rule and counts wrong herds; two-public-clues-break-the-herd shows how fragile a herd is. Neither derives the rule. This one does, and shows it does not depend on accuracy. Build after two-said-blue (built).

### 72. same-picture-two-histories · concept: probability:selection-vs-influence · core · demand 2 · format: Single card with Step (two replay chips; network stage, 8 people)
- Sections: E&K ch. 4 (section 4.2, unconfirmed) · domain: probability · course: ncm (wave J)
- Learner knows: friends tend to be alike (friends-split-more-than-chance) / does not know: that 'people choose similar friends' and 'friends make each other similar' can leave the identical snapshot, so a snapshot cannot say which happened.
- Misconception: If friends are alike, they must have chosen each other for it.
- Prediction (stage text ≤ 25 words): "Two towns end with this same picture: all 12 friendships join same colours. In one, people chose friends. Which town?" options: A. Town 1 / B. Town 2 / C. The picture can't tell (answer: C).
- Check: Final picture: two fully linked groups of 4 (0–3 blue, 4–7 orange). Town 1 (selection): colours fixed; starts with links 0–4, 3–6, 1–5 in place of 0–1, 2–3, 5–6, and in 3 steps each cross link is swapped for a same-colour one. Town 2 (influence): links fixed; colours start 1110 0001 (person 3 orange, person 7 blue) and in 2 steps each person takes their friends' majority colour. Node `J9 {"town1":{"startCrossLinks":3,"swaps":3},"town2":{"startColours":"11100001","switches":2,"finalColours":"11110000"},"identicalFinal":true}`.
- Stage and controls: The final picture is drawn locked. Controls in DOM order: [Replay Town 1] [Replay Town 2] [Show final]. Each replay steps through its history with a 'step k of n' caption and leaves a faint trail of what changed (links for Town 1, colours for Town 2). Shape plus fill for colour (colour-blind safe), labels ≥ 10 px, ≤ 8 nodes.
- QA path (each control once, DOM order, presets only): Each control once in DOM order: Replay Town 1 (milestone 1: 3 link swaps), Replay Town 2 (milestone 2: 2 colour changes), Show final (identical picture). Each replay ends on the final frame within one press (step-run).
- Reveal (draft, ≤ 90 words, fits a 390×844 phone with the stage top visible): Town 1 kept everyone's colour and swapped 3 friendships. Town 2 kept every friendship and 2 people changed colour. Both ended in the identical picture, so a single snapshot cannot separate choosing similar friends from becoming like your friends. Telling them apart needs data over time: who changed first, the link or the person. (≤ 90 words.)
- Planned claims:
  1. The two histories on the stage end in the same 12 friendships and the same colours. support: derivation; source: node replay of both rules.
  2. Town 1 changes 3 friendships and no colours; Town 2 changes 2 colours and no friendships. support: derivation.
  3. Similarity between friends can come from selection (choosing similar friends) or from social influence (becoming similar), and separating them needs data over time. support: citation; source: E&K ch. 4 (section unconfirmed); Aral, Muchnik and Sundararajan (2009), PNAS 106 for the identification problem. Attribution: fact-checker confirms.
- Format: Single card with Step (two replay chips; network stage, 8 people)
- Curriculum: `{"primary": "probability:selection-vs-influence", "also": ["probability:confounding"], "prerequisites": ["probability:homophily-test", "probability:confounding"], "level": "core", "strand": "statistics", "references": [{"work": "easley-kleinberg-2010", "chapter": 4, "section_unconfirmed": "4.2"}], "tags": ["homophily", "causation", "networks"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: probability/friends-split-more-than-chance tests whether friends are more alike than chance; this one asks what made them alike. Confounding lessons in probability are about a third variable, not two histories with one end state. Build after friends-split-more-than-chance (built).


## Round 4 (Wave J): demand 2 (cm-probability, 2026-10-14)

Continues the Round 4 ranking in `probability.md` § Round 4 (briefs 56-61 there, including the statistics demand-3 briefs 56-59; read its rules paragraph: preset buttons only, question's case pressed last, ≤ 90-word reveal that fits at 390×844, labels ≥ 10 px). Numbers reproduced by `node company/domains/briefs/checks/probability-round4-check.mjs`. Headings here use `###` so `claim.mjs` (pattern `#{2,3}`) finds them.

### 69. pool-ten-swabs · concept: group-testing · core · demand 2 · format: Single card (pool-size presets over 1,000 dots)
- Audience: anyone who saw pooled testing in the news; students / Learner knows: at-least-once, 1 − (1 − p)^k (four-rolls-one-six) / does not know: that when positives are rare, testing mixed pools finds every positive with far fewer tests, and that pools can be too big.
- Misconception: To find every infected person you need one test per person.
- Prediction (≤ 25 words): "1,000 people, 1 in 100 infected. Mix swabs in pools of 10, test each pool, then retest everyone in a positive pool. About how many tests?" options: A. About 100 / B. About 200 / C. About 500 (answer: B (196)).
- What the stage shows: 1,000 dots grouped into pools (blocks), seeded infected dots (mulberry32(66), disclosed: 15 infected), positive pools outlined in `var(--bad)` with a thicker border so state reads without colour. Readouts: "expected tests: {e}" (formula) and "this group: {t} tests". Preset buttons in DOM order: **Pools of 5**, **Pools of 20**, **Pools of 10** (the question's case last). Labels ≥ 10 px; dots are texture. The test is assumed perfect (stated on the card). Locked stage: 1,000 grey dots, no pools. Milestones: (1) pools of 5 and 20 both shown; (2) pools of 10 shown.
- Check: expected tests = 1,000/k + 1,000 × (1 − 0.99^k). k = 5: 249.0; 10: 195.6; 11: 195.6 (the minimum); 20: 232.1; 50: 415.0. Share of pools of 10 positive: 9.56%. Seed 66: 15 infected, 12 positive pools of 10, 220 tests. At 10% infected pooling barely helps (pools of 4: 594; of 10: 751): kept out of the stage; told only if the reveal has room.
- Reveal draft (70 words, counted by whitespace): "Pools of 10 need about {e} tests on average: 100 pool tests, plus 10 retests for each of the roughly 10 pools that come back positive. This group needed {t}. With 1 in 100 infected most pools are clean, and one clean test clears 10 people at once. Pools of 5 needed {e5} and pools of 20 needed {e20}: small pools waste pool tests, big pools turn positive too often."
- Payoff: the outlined pools are the cause on the stage: few pools light up, and only those are opened.
- Planned claims:
  1. With 1% prevalence and pools of 10, a perfect test needs on average 1,000/10 + 1,000 × (1 − 0.99^10) = 196 tests per 1,000 people. support: derivation; source: arithmetic (check script, brief 69).
  2. Pools of 5 need 249 and pools of 20 need 232 on average; the best pool size at 1% is 10 to 11. support: derivation; source: same formula.
  3. The model assumes a perfect test; real pooled tests can miss positives diluted in a pool. support: derivation; source: lesson rule (stated on the card; no real sensitivity figure quoted).
  4. Optional, out of learner text unless checked: the method is due to Dorfman (1943), Annals of Mathematical Statistics 14(4). **Needs a human source check.**
- curriculum (new concept): `{"primary":"probability:group-testing","also":["probability:at-least-once"],"prerequisites":["probability:at-least-once"],"level":"core","strand":"statistics","references":[],"tags":["pooled testing","screening","efficiency","rare events"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: four-rolls-one-six and jackpot-once-a-week use 1 − (1 − p)^k to find a chance; this lesson uses it to design a procedure and has an optimum. cs/sorted-halving-search is halving a sorted list, not pooling.

### 70. largest-serial-seen · concept: serial-number-estimation · stretch · demand 2 · format: Simulation run (capture 4, then 1,000 captures)
- Audience: puzzle lovers, statistics students / Learner knows: averages, sampling at random / does not know: that the largest value seen always undershoots the total, and how the gaps between the numbers correct it.
- Misconception: The largest serial number you have seen is a good estimate of how many were made.
- Prediction (≤ 25 words): "Tanks are numbered 1, 2, 3 … up to 100. You see 4 at random. If you guess the largest number seen, how far off on average?" options: A. About 0 too low / B. About 20 too low / C. About 50 too low (answer: B (19.2)).
- What the stage shows: a number strip 1–100 (ticks every 10, labels ≥ 10 px) with the 4 captured serials marked. Two guess markers: "largest seen" and "largest + average gap". Preset buttons in DOM order: **Capture 4** (seeded, disclosed), **Run 1,000 captures** (readouts: average of each guess), **Show the gaps** (shades the gaps between captured numbers and the gap above the largest). Show the gaps last so the cause is on the stage at the reveal, with the averages still showing. Locked stage: the empty strip. Milestones: (1) 1,000 captures run; (2) gaps shown.
- Check: for k = 4 distinct serials from 1…N, E[largest] = k(N + 1)/(k + 1) = 80.8 at N = 100 (19.2 too low). The guess m + m/k − 1 has expected value N exactly. Seeded cross-check mulberry32(67), 100,000 captures: 80.79 and 99.99.
- Reveal draft (66 words, counted by whitespace): "Over 1,000 captures, the largest number seen averaged {m}, about 19 short of 100. It can never be above the total, so it can only miss low. The gaps fix it: 4 numbers split the strip into 5 stretches of about the same size, so add one average gap above the largest: largest + largest ÷ 4 − 1. That guess averaged {e}, close to 100."
- Payoff: the shaded gaps are the cause on the stage: the empty stretch above the largest is about as long as the others.
- Planned claims:
  1. Taking 4 distinct numbers at random from 1 to 100, the expected largest is 4 × 101/5 = 80.8. support: derivation; source: order statistics of sampling without replacement (check script, brief 70).
  2. The guess m + m/k − 1 is right on average (expected value N). support: derivation; source: E[m] = k(N + 1)/(k + 1), so E[m(k + 1)/k − 1] = N.
  3. The captures are seeded simulations (seed disclosed). support: simulation; source: lesson code.
  4. Optional, out of learner text unless checked: the Allied "German tank problem" in the Second World War. **Needs a human source check;** the lesson works without it.
- curriculum (new concept): `{"primary":"probability:serial-number-estimation","also":["probability:sample-vs-population"],"prerequisites":["probability:sample-vs-population"],"level":"stretch","strand":"statistics","references":[],"tags":["estimation","bias","order statistics","German tank problem"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: life/count-the-marked-fish (mark-recapture estimates a population from overlap); best-of-twenty-identical (the winner's curse: the best of noisy estimates overshoots). This one is an estimator that is biased low and its correction by gaps.
