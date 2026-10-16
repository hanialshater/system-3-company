# Discrete Maths & Logic briefs (cm-math-discrete)

Ranked briefs for this strand, in the same format as `math.md` (`### N. slug · concept: <id> · level · demand N`). `tools/claim.mjs next math` hands these out after the domain's own list. Check every brief's answer in node before adding it.


## Networks, Crowds, and Markets, batch 1 (session 2, 2026-10-14)

Source: vertical review `company/rituals/records/2026-10-14-vertical-review-ncm.md` §3 (asks S2-01 to S2-04), strategy doc `company/product/verticals/networks-crowds-markets.md`. Work: Easley & Kleinberg, *Networks, Crowds, and Markets* (2010), `content/works.json` id `easley-kleinberg-2010`.
Checks: every number below was recomputed by cm-math-discrete in node (script kept in the session scratchpad, not in the repo; each brief prints its exact rule on its Check line). Dedupe: I grepped `src/demos/**/meta.json` and `company/domains/briefs/*.md` for weak tie, triadic, structural balance, Condorcet, majority cycle, threshold, cascade and agenda. Only `ai/five-weak-voters` (Condorcet jury: independent votes, ch. 23 §23.7) and `math/handshakes-halve` (counting pairs) are near, and neither teaches these four results. `node tools/overlap.mjs` lists no pair involving these concepts.
**Section numbers: § unconfirmed.** The Cornell book page returned a proxy 403 from this session (tried the book index and the ch. 3 PDF), so each § follows the book's table of contents from memory. The fact-checker confirms against the free PDF before a lesson ships. The numbers are in metadata only (`curriculum.references`), never learner text.
Network stage: briefs 1 and 2 are the first two hand-drawn network stages (rule of two). Both use ≤ 8 nodes, node fill plus shape for state, and labels of ≤ 3 characters, so the later UI concept `company/design/concepts/network-stage.md` can be written from them. Brief 3: ruled single card with Step (S2-19, 2026-10-14); builds by hand to the interim network rules after its spec.
Ranking inside the batch (prerequisite order): 1, 2, 3 (graph vocabulary first), then 4 (stands alone, can be built any time).

### 1. news-comes-from-acquaintances · concept: weak-ties-local-bridges · core · demand 2 · format: single card (hand-drawn network stage)
curriculum.references: easley-kleinberg-2010 ch. 3 §3.1–3.2 (§ unconfirmed)
- Learner knows: that people have friends, and what a link between two people means / does not know: that if you are close to two people, strong triadic closure makes them know each other, so the only link between two groups cannot be a close one.
- Misconception: news and job leads reach you through your closest friends, so the closer the tie, the more it brings you.
- Prediction (stage text ≤ 25 words): "Close friends always know each other's other close friends. Ana (group 1) and Ben (group 2) share one link. What kind of tie must it be?" options: close friend / acquaintance / either could be (answer: B). Check (rule: strong triadic closure = if X is strong with Y and with Z then Y and Z are linked): graph = two groups of 4 people, every pair inside a group linked (K4 + K4, 12 edges) plus the one link Ana-Ben (13 edges). Enumerated all 2^13 strong/weak labellings: 4,160 satisfy the rule; 64 of them make Ana-Ben strong, and in every one of those 64 Ana and Ben have no other strong tie (0 labellings with Ana-Ben strong and another strong tie at Ana or Ben). Ana-Ben is the only edge with no common neighbour (the only local bridge). In the stage Ana and Ben each have strong ties inside their group, so strong Ana-Ben breaks the rule: Ana's strong ties to Ben and to a groupmate need Ben-groupmate linked, and they are not.
- Interaction: the 8 people are drawn as two clusters. The 12 in-group edges start strong (thick). The learner taps Ana-Ben to switch it strong or weak (thin dashed). On strong the stage outlines the broken rule: Ana's two strong ties (to Ben and a groupmate) with the missing link between Ben and that groupmate drawn red. A "Send news" button starts a pulse from a person in group 2; it travels and the edge it crosses lights. Controls: Ana-Ben tap, two other edges tappable to see the rule in a triangle (so the broken case is not the only one the learner sees), Send news. ≤ 4 controls, all ≥ 44 px. Milestone: learner has seen Ana-Ben strong (rule broken) and the news cross it as weak.
- Payoff (reveal ≤ 90 words, quotes only reachable states): the only way to make Ana-Ben close without breaking the rule is for Ana and Ben to have no other close ties, so in a group-bound world the link between groups is weak, and the news you hear first from outside your group comes over a weak tie. Then the empirical line: in Granovetter's 1973 study of people who found a job through a contact, most saw that contact only occasionally or rarely.
- Planned claims:
  1. If A is strong with B and with C, then B and C are linked (definition of strong triadic closure, a rule in this lesson). support: definition; source: E&K ch. 3 §3.1 (§ unconfirmed).
  2. In the stage graph, Ana-Ben is the only local bridge (no common neighbour). support: derivation; source: enumeration in node.
  3. If Ana-Ben is strong while Ana or Ben also has another strong tie, the rule is broken; 64 of the 4,160 rule-satisfying labellings make it strong and in each Ana and Ben have no other strong tie. support: derivation; source: node enumeration of 2^13 labellings. (The reveal uses only "the broken rule", not the counts, unless the builder keeps the counts out of learner text; counts live in meta as evidence.)
  4. Granovetter (1973): of people who found a job through a contact, 16.7% saw the contact often, 55.6% occasionally, 27.8% rarely. support: citation; source: Granovetter, "The Strength of Weak Ties", Am. J. Sociology 78(6), as reported in E&K ch. 3. **Empirical, status unverified, needs a human source check by the fact-checker.** (9, 30 and 15 of 54 people reproduce these percentages to 0.1; I could not open the paper.) Keep this claim out of learner text until checked; the reveal works without it.
- Needs interaction-designer spec: no (single card with tap-edge toggle and one button). Design review should check 390 px labels on two K4 clusters.
- Differs from nearest: `math/handshakes-halve` counts pairs in a complete group; this one asks which links exist between groups. No lesson teaches triadic closure.

### 2. enemy-of-my-enemy · concept: structural-balance · core · demand 2 · format: single card (hand-drawn network stage)
curriculum.references: easley-kleinberg-2010 ch. 5 §5.1–5.2 (§ unconfirmed)
- Learner knows: friend and enemy, and the saying "the enemy of my enemy is my friend" / does not know: that if every group of three is balanced, the whole group must split into at most two camps.
- Misconception: a friend-and-enemy network can settle into several mutually hostile camps (three or more), or the saying alone does not say how many camps there can be.
- Prediction (stage text ≤ 25 words): "5 people. Every pair is friends or enemies. Every group of three is balanced (all friends, or one friend and two enemies). How many camps can there be?" options: at most 2 / up to 3 / up to 5 (answer: A). Check (rule: a triangle is balanced if its three signs multiply to +, that is 3 friends or 1 friend + 2 enemies): enumerated all 2^10 sign assignments of K5; 16 have all 10 triangles balanced; 1 of them is everyone-friends (one camp) and 15 split into exactly two camps (friends inside, enemies across), and in all 16 the split is friends-inside, enemies-across. So 16 = 2^(5-1). For three camps (friends inside, enemies across, every camp non-empty) the fewest unbalanced triangles over all 3-camp splits of 5 people is 3 (split 3-1-1; 2-2-1 gives 4); all-enemies gives 10 unbalanced triangles.
- Interaction: K5 with 10 tappable edges (tap cycles friend (solid) / enemy (dashed); 44 px targets via enlarged hit areas). Unbalanced triangles flash (fill triangle red, counted live: "Unbalanced: N"). A "Try 3 camps" chip pre-sets a 3-camp split so the learner sees N = 3 (3-1-1) and can then try to fix it. A "Reset" chip. Milestone: learner has made the count reach 0 at least once and has seen a 3-camp setting leave N > 0. Stage text ≤ 25 words.
- Payoff (quotes only reachable states): every setting with N = 0 that the learner finds is one camp or two; three camps always leave unbalanced triangles (at best 3 for five people), because a triangle with one person from each camp is all enemies; that is the balance theorem (Cartwright and Harary 1956), proved for any size.
- Planned claims:
  1. A triangle is balanced if it has 3 friendly pairs or exactly 1 friendly pair and 2 enemy pairs. support: definition; source: E&K ch. 5 §5.1 (§ unconfirmed).
  2. Among the 1,024 sign settings of K5, 16 have every triangle balanced (1 with one camp, 15 with two). support: derivation; source: node enumeration.
  3. With three non-empty camps of five people (friends inside, enemies across) at least 3 triangles are unbalanced (3-1-1 split gives 3, 2-2-1 gives 4). support: derivation; source: node enumeration over 3^5 assignments.
  4. Balance theorem: a complete signed network with every triangle balanced is either all friends or splits into two sets, friends inside and enemies across. support: citation (theorem) plus the n = 5 enumeration; source: E&K ch. 5 §5.2, attributed there to Harary and to Cartwright and Harary (1956); attribution unverified, fact-checker confirms. Not empirical.
- Needs interaction-designer spec: no. It is the 2nd hand-built network stage; ask design review to check that 10 edge hit areas are ≥ 44 px on a 5-node pentagon at 390 px (edges of a pentagon with diagonals cross; the fallback is a "tap two people" gesture instead of tapping an edge).
- Differs from nearest: `math/two-color-map` (parity colouring of regions) is also a two-sides result but about maps, not signed links.

### 3. cluster-stops-the-cascade · concept: threshold-cascade · core · demand 2 · format: single card with Step (network stage; design-lead ruling 2026-10-14, company/design/reviews/2026-10-14-design-lead-ncm-rulings.md)
curriculum.references: easley-kleinberg-2010 ch. 19 §19.2–19.3 (§ unconfirmed)
- Learner knows: a network of 12 people with links, and a rule "join if at least half your friends have" / does not know: that the cascade stops exactly at a group that is tightly knit.
- Misconception: a spreading idea or product stops because it is too weak or the seeds are too few, rather than because of the shape of the network.
- Prediction (stage text ≤ 25 words): "Two people adopt first. Anyone joins once at least half their friends have. How many of the 12 end up adopting?" options: 2 / 8 / 12 (answer: B). Check (rule: threshold q = 1/2, a person adopts when adopters / friends ≥ 1/2, tested every round against the state at the end of the previous round, i.e. all people update simultaneously, so a round counts as one step for everyone; seeds stay adopted): graph = a path of 8 people 0-1-…-7, person 7 linked to person 8, and 8, 9, 10, 11 all linked to each other (K4, 6 edges); 7 path edges + the 7-8 link + 6 = 14 edges. Seeds {0,1}: round 1 adds 2, then 3, 4, 5, 6, 7 (one per round, six Step taps), stops with 8 adopters (0 to 7); non-adopters {8,9,10,11}. Person 8 has neighbours 7, 9, 10, 11 and only 1 of 4 (0.25 < 0.5) has adopted. Cluster {8,9,10,11}: every member has at least 3/4 of its friends inside (density 0.75 > 1 − q = 0.5). Seeds {8,9}: round 1 adds 7, 10, 11, then 6, 5, 4, 3, 2, 1, 0 (rounds 2 to 8), all 12 adopt (re-run in node, simultaneous rule, 2026-10-14).
  Theorem check (the iff): for all 298 seed sets of 1 to 3 people on this graph, "cascade is incomplete" is equivalent to "some set of non-seeds has every member with more than half its friends inside the set" (brute force over all subsets of non-seeds): 132 incomplete, 0 contradictions.
- Interaction: the 12-person graph is fixed and drawn by hand (path along the top in a snake, K4 at the bottom right). Adopters are filled, non-adopters hollow; the current round is the only one with a ring. After the run ends the stage outlines the group that never joined. Milestone: the learner has run both seed sets to the end. Stage <= 25 words. **Controls, chips, Reset or To the end, and how the inside fractions are shown (a tapped person, not every holdout) defer to the interaction spec `company/design/specs/cluster-stops-the-cascade.md` and the design-lead ruling `company/design/reviews/2026-10-14-design-lead-ncm-rulings.md` §1; this brief no longer fixes them.**
- Payoff (quotes only states the learner reached): with the first seeds the idea stops at the tight group of four, where each member has 3 of its 4 or 3 of its 3 friends inside, more than half; with the second seeds, planted in that group, it takes everyone. A cascade stops exactly at a cluster whose members each have more than 1 − q of their friends inside; it is complete if and only if no such cluster exists among the people who did not start with it.
- Planned claims:
  1. Rule: a person adopts when at least a fraction q of their friends have; q = 1/2 in this lesson. support: definition; source: E&K ch. 19 §19.2 (§ unconfirmed).
  2. Seeds {0,1} end with 8 adopters and non-adopters {8,9,10,11}, in 6 rounds. support: derivation; source: node simulation.
  3. Seeds {8,9} end with all 12 adopting. support: derivation; source: node simulation (8 rounds under the simultaneous rule).
  4. In {8,9,10,11}, person 8 has 3 of 4 friends inside and the others 3 of 3, so density 0.75 > 0.5. support: derivation; source: node.
  5. Theorem (cascade is incomplete iff the non-seeds contain a cluster of density > 1 − q). support: citation (E&K ch. 19 §19.3, § unconfirmed) plus brute force on this graph (298 seed sets, 0 contradictions). Not empirical.
- Needs interaction-designer spec: yes (Step over rounds on a 12-node graph; how the stop set is outlined; seed chips). Needs design-lead ruling S2-19 first. My argument for the ruling: it is deterministic, has no randomness, no per-agent state beyond adopted/not, a fixed graph and no parameter sweep, so it is a single card with Step. If the design-lead rules it ABM, hold the build until the Schelling pair passes review.
- Differs from nearest: `life/herd-immunity` and `life/epidemic-overshoot` model probabilistic spread on a population; this one is a deterministic threshold rule where the network's shape decides where it stops.
- Build order: after briefs 1 and 2 pass design review so it can reuse their stage.

### 4. agenda-picks-the-winner · concept: condorcet-cycle · core · demand 2 · format: single card (agenda-order chips)
curriculum.references: easley-kleinberg-2010 ch. 23 §23.3 (§ unconfirmed)
- Learner knows: a vote between two options goes to the one with more votes, and what a ranking is / does not know: that majority preferences can go in a circle, so the order of the votes decides the winner.
- Misconception: if a group prefers A to B and B to C, it prefers A to C; the group has a clear favourite, and the order of the votes cannot change it.
- Prediction (stage text ≤ 25 words): "Three voters rank A, B, C. First vote: A against B. The winner then faces C. Who wins?" options: A / B / C (answer: C). Voters: 1 ranks A>B>C, 2 ranks B>C>A, 3 ranks C>A>B (the rankings are shown). Check (rule: every voter votes sincerely for the option they rank higher in each two-way vote; the option with 2 votes wins): A vs B: 2-1 for A (voters 1, 3); B vs C: 2-1 for B (voters 1, 2); C vs A: 2-1 for C (voters 2, 3), a cycle. Agenda "A vs B, winner vs C": A wins the first vote and loses to C 1-2, so C wins. All six agenda orders: the option held back to the last vote wins every time (C last: C; B last: B; A last: A), by sincere voting. Hold the reveal to the three order chips the learner can press.
- Interaction: the three rankings in a fixed row; three agenda chips ("A vs B, then C", "B vs C, then A", "A vs C, then B") run the two votes and show each 2-1 tally; a small "Beats" triangle shows the cycle when all three pairs have been seen. The learner can run all three chips. Controls: 3 chips. Milestone: all three agendas have been run. Stage ≤ 25 words.
- Payoff (quotes only reachable states): the same three voters elect C, B or A depending on which option is held to the last vote; every option beats one rival and loses to another 2-1, so there is no majority favourite; whoever sets the agenda picks the winner (with sincere voters).
- Planned claims:
  1. With rankings A>B>C, B>C>A, C>A>B: A beats B, B beats C and C beats A, each 2-1. support: derivation; source: node check.
  2. With sincere voting, the option held to the last vote wins (C, B, A for the three chips). support: derivation; source: node check across all six agenda orders (each of the three winners appears twice).
  3. A majority preference cycle means there is no option that beats every other in a pairwise vote. support: derivation; source: E&K ch. 23 §23.3 (§ unconfirmed). The name "Condorcet" is used only if the fact-checker confirms the attribution (Condorcet 1785); no date or name in learner text until then.
  4. Not claimed: that real elections have such cycles; the lesson shows only that they can occur.
- Needs interaction-designer spec: no (default single card with chips).
- Differs from nearest: `ai/five-weak-voters` (ch. 23 §23.7) is about independent noisy votes aggregating towards the truth; this one is about preferences and procedure, no probability. Cite it in the reveal path (a later lesson in the vertical), not in this lesson.

## Course: NCM (2026-10-14)

Accepted by cm-math-discrete from `company/courses/ncm/briefs.md` (### math.discrete, proposed by cm-course-ncm). Every answer re-run in node on 2026-10-14. Work: `easley-kleinberg-2010`; references name the chapter only (section numbers stay unconfirmed until someone with the book checks them). Edits made at acceptance are marked "Edited". Batch 1 NCM lessons named under "Differs" are not built yet on this branch: where a brief says "build after", the dependency is real. "Needs a human source check" and "Attribution: fact-checker confirms" flags carry over unchanged.

### 1. the-middle-voter-decides · concept: median-voter · core · demand 3 · format: Single card
- Chapter: 23 · domain: math
- Learner knows: majority votes between two options; a left-right line / does not know: that with single-peaked preferences the median voter's favourite beats every rival in a two-way vote.
- Misconception: The position that wins every head-to-head vote is the average voter's position.
- Prediction (stage text ≤ 25 words): "Five voters' favourites sit at 1, 2, 3, 8 and 10 on a 0-10 line. Each prefers nearer. Which position beats every other?" options: A. 3 / B. 4.8 (the average) / C. 5 (the centre) (answer: A, 3, the median).
- Check: Re-run: mean 4.8, median 3; among whole-number positions 0-10 only 3 beats all others pairwise; 3 beats 5 by 3 votes to 2.
- Reveal (one line): Any rival to the right of 3 loses voters 1, 2 and 3; any to the left loses 3, 8 and 10. The middle voter decides, not the average.
- Planned claims:
  1. With favourites at 1, 2, 3, 8 and 10, position 3 beats every other whole-number position in a two-way majority vote. support: derivation; source: node pairwise check.
  2. The average of the favourites is 4.8, and 3 beats 5 by 3 votes to 2. support: derivation; source: node.
  3. With single-peaked preferences the median voter's favourite is a majority winner (median voter theorem). support: citation (theorem); source: E&K ch. 23; Black (1948), J. Political Economy 56. Attribution: fact-checker confirms.
- curriculum: `{"primary":"math:median-voter","also":["math:mean-vs-median"],"prerequisites":["math:mean-vs-median"],"level":"core","strand":"discrete","references":[{"work":"easley-kleinberg-2010","chapter":23}],"tags":["voting","median"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: math/one-boss-moves-the-mean and seesaw-mean teach mean vs median as statistics; this is the same contrast as a voting outcome. overlap.mjs lists no pair.

### 2. the-loser-flips-the-winner · concept: borda-iia · core · demand 2 · format: Before / after toggle · **needs spec**
- Chapter: 23 · domain: math
- Learner knows: ranking options and adding up points / does not know: that removing an option nobody ranks first can change who wins a points-based vote.
- Misconception: Dropping a candidate who came last cannot change the winner.
- Prediction (stage text ≤ 25 words): "Borda vote: 2 points for 1st, 1 for 2nd, 0 for 3rd. B wins; C is last. Remove C and recount. Who wins?" options: A. B again / B. A / C. A tie (answer: B, A wins 3-2). Edited: added "0 for 3rd" so the scoring is complete (23 words).
- Check: 3 voters A>B>C, 2 voters B>C>A. Re-run: with C, A 6, B 7, C 2; without C (recounted: 1 point for 1st, 0 for 2nd), A 3, B 2.
- Reveal (one line): Nobody changed their mind about A versus B, yet removing last-placed C flipped the winner from B (7-6) to A (3-2).
- Planned claims:
  1. With C on the ballot the Borda scores are A 6, B 7, C 2. support: derivation; source: node.
  2. Without C, A beats B 3 to 2 on the same voters' rankings. support: derivation; source: node.
  3. Positional (Borda) voting can violate independence of irrelevant alternatives. support: citation; source: E&K ch. 23; Borda (1781) attribution. Attribution: fact-checker confirms.
- curriculum: `{"primary":"math:borda-iia","also":[],"prerequisites":[],"level":"core","strand":"discrete","references":[{"work":"easley-kleinberg-2010","chapter":23}],"tags":["voting","Borda","spoiler"]}`
- Needs interaction-designer spec: yes.
- Differs from nearest: agenda-picks-the-winner (batch 1) is pairwise majority and cycles; this is points-based voting and a spoiler effect. ai/which-answer-wins is preference learning, not elections.

### 3. one-shy-rioter-stops-the-riot · concept: heterogeneous-thresholds · core · demand 2 · format: Single card with Step
- Chapter: 19 · domain: math
- Learner knows: people join once enough others have / does not know: that a crowd's outcome can hinge on one person's threshold, not on the crowd's average mood.
- Misconception: Two crowds with almost identical people behave almost identically.
- Prediction (stage text ≤ 25 words): "100 people: one joins if 0 others have, one if 1, ... one if 99. Change the '1' person to '2'. How many join?" options: A. 100 / B. About 50 / C. 1 (answer: C, 1).
- Check: Re-run: thresholds 0..99 give 100 joiners; with the threshold-1 person changed to 2 the count stops at 1. Everyone sees everyone (a complete network).
- Reveal (one line): The chain needs a next person at every count; remove the one who joins at 1 and the first mover stands alone.
- Planned claims:
  1. With thresholds 0, 1, 2, ..., 99 everyone joins, one at a time. support: derivation; source: node.
  2. Changing the single threshold of 1 to 2 leaves only 1 person joining. support: derivation; source: node.
  3. The example is Granovetter's threshold model of collective behaviour. support: citation; source: M. Granovetter, 'Threshold Models of Collective Behavior', Am. J. Sociology 83(6) (1978). Attribution: fact-checker confirms.
- curriculum: `{"primary":"math:heterogeneous-thresholds","also":[],"prerequisites":[],"level":"core","strand":"discrete","references":[{"work":"easley-kleinberg-2010","chapter":19}],"tags":["cascades","thresholds","collective behaviour"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: cluster-stops-the-cascade (batch 1) has one threshold for everyone and lets the network shape stop it; here the network is complete and the spread of thresholds decides. No built lesson covers thresholds.

### 4. bridge-carries-news-not-habits · concept: complex-contagion-bridges · core · demand 2 · format: Single card with Step (network stage)
- Chapter: 19 · domain: math
- Learner knows: weak ties bring news across groups (ch. 3); the 'join when half your friends have' rule / does not know: that a behaviour needing several adopting friends stops at the same bridge that news crosses.
- Misconception: Whatever spreads like news spreads like a habit: the bridge that carries one carries the other.
- Prediction (stage text ≤ 25 words): "Two groups of 5 joined by one link. Group A adopts. Ben, across the bridge, joins if half his friends have. Does group B adopt?" options: A. Yes, all of B / B. Only Ben / C. No one in B (answer: C; Ben sees 1 of 5 friends, 20%).
- Check: Two complete groups of 5, one bridge 4-5, seeds 0 and 1, q = 1/2. Re-run: the habit fills group A (5 people) in 2 rounds and stops; news (any one friend) reaches all 10; Ben (node 5) has 1 of 5 friends adopting (0.2).
- Reveal (one line): News needs one friend, so it crosses the bridge; the habit needs half your friends, and across a bridge you have only one.
- Planned claims:
  1. With the 'half your friends' rule, the habit fills group A in 2 rounds and stops at the bridge; Ben has 1 of 5 friends adopting. support: derivation; source: node simulation.
  2. News that passes on from any one friend reaches all 10 people. support: derivation; source: node simulation.
  3. Weak ties help information spread but can block behaviours that need reinforcement from several contacts. support: citation; source: E&K ch. 19; Centola and Macy (2007), Am. J. Sociology 113(3). Attribution: fact-checker confirms.
- curriculum: `{"primary":"math:complex-contagion-bridges","also":["probability:independence"],"prerequisites":[],"level":"core","strand":"discrete","references":[{"work":"easley-kleinberg-2010","chapter":19}],"tags":["cascades","weak ties","complex contagion"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: news-comes-from-acquaintances (batch 1) shows news crossing a weak tie; cluster-stops-the-cascade (batch 1) shows a dense cluster blocking a cascade. This puts both on one bridge, news crossing and the habit not. Build after both, and after brief 3 (thresholds).

### 5. three-students-two-rooms · concept: constricted-set-matching · core · demand 2 · format: Single card
- Chapter: 10 · domain: math
- Learner knows: matching people to rooms, each person listing rooms they accept / does not know: that a perfect matching fails exactly when some group accepts fewer rooms than it has people.
- Misconception: If every person accepts at least one room (here, two) and there are as many rooms as people, everyone can be housed.
- Prediction (stage text ≤ 25 words): "Four students, four rooms; each accepts two. A: rooms 1,2. B: 1,3. C: 2,3. D: 1,3. Can everyone get a room they accept?" options: A. Yes / B. No / C. Only if D takes room 1 (answer: B, no: all four accept only rooms 1-3). Edited: the original lists (three students sharing only rooms 1 and 2, the fourth accepting any) gave the answer away at a glance, so the prediction was not a real surprise. The hidden group is now all four students, who together accept only three rooms. Slug kept; builder may rename to four-students-three-rooms with a decision note.
- Check: Re-run over all 24 assignments: 0 work. Letting D also accept room 4 gives 2 working assignments.
- Reveal (one line): Together the four accept only rooms 1, 2 and 3: four people, three acceptable rooms (a 'constricted set'), so someone is left out however you assign; that is the only thing that can block a perfect matching.
- Planned claims:
  1. With the stage's lists, none of the 24 assignments gives every student an acceptable room. support: derivation; source: node enumeration.
  2. If D also accepts room 4, 2 of the 24 assignments work. support: derivation; source: node enumeration.
  3. A perfect matching exists unless some set of people together accepts fewer items than its size (matching theorem). support: citation (theorem); source: E&K ch. 10; Hall (1935), J. London Math. Soc. 10; Konig (1931). Attribution: fact-checker confirms.
- curriculum: `{"primary":"math:constricted-set-matching","also":["math:pigeonhole-principle"],"prerequisites":["math:pigeonhole-principle"],"level":"core","strand":"discrete","references":[{"work":"easley-kleinberg-2010","chapter":10}],"tags":["matching","bipartite graphs"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: math/thirteen-pigeons is pigeonhole with a visible surplus; here the surplus hides in the lists, and the lesson names the test. proposers-get-the-best (cs brief, stable matching) is about preferences and stability, not whether any full matching exists.

### 6. broker-between-two-groups · concept: structural-holes · core · demand 1 · format: Single card (hand-drawn network stage)
- Chapter: 3 · domain: math
- Learner knows: friends and groups; that some people know more people than others / does not know: that the person who links groups that don't know each other can matter more than the person with the most friends.
- Misconception: The best-connected person is whoever has the most friends.
- Prediction (stage text ≤ 25 words): "Hana has 5 friends who all know each other. Bo has 4, from two separate groups. Who sits on more shortest paths between others?" options: A. Hana / B. Bo / C. Same (answer: B; Bo 24 pairs, Hana 0). Edited: the original asked who has more strangers among their friends, which the setup states outright ("all know each other"). The new question tests the misconception (most friends = most important); the strangers count moves to the reveal.
- Check: Graph: a complete group of 6 (Hana and 5 friends, nodes 0-5), a complete group of 4, and Bo linked to 2 people in each group (not to Hana). Re-run: Hana 5 friends, 0 unlinked friend pairs, betweenness 0; Bo 4 friends, 4 unlinked friend pairs, betweenness 24; next highest person 10; 11 people.
- Reveal (one line): Bo has fewer friends but spans a gap: 4 pairs of his friends are strangers, and every path between the two groups runs through him.
- Planned claims:
  1. Bo has 4 pairs of friends who do not know each other; Hana has 0. support: derivation; source: node count on the stage graph.
  2. Bo lies on more shortest paths between other people than anyone else on the stage (24 pairs); Hana lies on none. support: derivation; source: node betweenness.
  3. A person whose friends are not linked to each other spans a 'structural hole' (term from Burt 1992, Structural Holes, Harvard UP). support: citation; source: Burt (1992); E&K ch. 3. Attribution: fact-checker confirms.
- curriculum: `{"primary":"math:structural-holes","also":["math:handshake-counting"],"prerequisites":[],"level":"core","strand":"discrete","references":[{"work":"easley-kleinberg-2010","chapter":3}],"tags":["networks","brokerage","structural holes"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: news-comes-from-acquaintances (batch 1) is about which tie is the bridge; this is about which person sits in the gap. cs/cut-the-busiest-link (cs.algorithms brief) counts shortest paths per link to find communities; this counts per person. Build only one of the two first and keep the graphs different.

### 7. enemies-allow-three-camps · concept: weak-balance · stretch · demand 1 · format: Single card (hand-drawn network stage)
- Chapter: 5 · domain: math
- Learner knows: the balance rule from enemy-of-my-enemy (at most two camps) / does not know: that if an all-enemy triangle is allowed, the network can split into any number of camps.
- Misconception: Hostile networks always end up as two sides.
- Prediction (stage text ≤ 25 words): "Six people in three pairs. Friends inside a pair, enemies across. Banned: two friends of one person who are enemies. How many banned triangles?" options: A. 0 / B. 8 / C. 20 (answer: A, 0; the 8 all-enemy triangles are allowed under the weaker rule). Edited: the original rule text ("two friends with a shared enemy") described an allowed triangle, not the banned one. The banned triangle is two friendly links and one hostile link. Wording is 25 words; trim "Six people in three pairs" if the stage shows the pairs.
- Check: Re-run: K6 split into 3 pairs: 0 triangles with exactly two friendly links; 8 all-enemy triangles. Of 1,024 sign patterns on 5 people, 52 meet the weak rule (Bell number 52) and 16 meet the strong rule.
- Reveal (one line): Allow 'everyone hates everyone' triangles and three camps are stable: no banned triangle, though 8 triangles are all enemies.
- Planned claims:
  1. Under weak balance the only banned triangle has two friendly pairs and one hostile pair. support: definition; source: E&K ch. 5.
  2. The 3-camp split of 6 people has 0 banned triangles and 8 all-enemy triangles. support: derivation; source: node enumeration.
  3. For 5 people, 52 of 1,024 friend/enemy patterns are weakly balanced, one for each way of splitting them into camps. support: derivation; source: node enumeration; Bell number B5 = 52.
  4. Weak balance and its many-camps result are due to Davis (1967). support: citation; source: J. A. Davis, Human Relations 20 (1967). Attribution: fact-checker confirms.
- curriculum: `{"primary":"math:weak-balance","also":[],"prerequisites":["math:parity-rules"],"level":"stretch","strand":"discrete","references":[{"work":"easley-kleinberg-2010","chapter":5}],"tags":["signed networks","balance"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: enemy-of-my-enemy (batch 1) proves at most 2 camps under the strong rule; this relaxes one triangle type and the limit disappears. Build after it.

### 8. one-odd-loop-blocks-two-camps · concept: signed-cycle-balance · stretch · demand 1 · format: Single card (hand-drawn network stage)
- Chapter: 5 · domain: math
- Learner knows: two camps = friends inside, enemies across / does not know: that a network with missing links can be split into two camps exactly when every loop has an even number of enemy links.
- Misconception: If the big loop around everyone looks fine, the network can be split into two camps.
- Prediction (stage text ≤ 25 words): "Six people in a ring plus one cross link. Two enemy links; the big ring has an even count. Can they split into two camps?" options: A. Yes / B. No / C. Can't tell from the loops (answer: B; each 4-person loop holds one enemy link).
- Check: Ring 0-5 plus chord 0-3; enemies 0-1 and 3-4. Re-run: 0 valid splits; the two 4-person loops hold one enemy link each, the ring holds 2. Moving the second enemy link to 2-3 gives exactly one split (2 of 64 labelings, which are the same split with camp names swapped).
- Reveal (one line): Check every loop, not just the big one: the cross link makes two small loops with one enemy each, so no two-camp split exists.
- Planned claims:
  1. A signed network can be split into two camps (friends inside, enemies across) if and only if every cycle has an even number of enemy links. support: citation (theorem) + check; source: E&K ch. 5; Harary (1953) attribution. Attribution: fact-checker confirms.
  2. On the stage graph with enemies 0-1 and 3-4 there is no valid split; with enemies 0-1 and 2-3 there is exactly one split into two camps (up to swapping the camps' names). support: derivation; source: node brute force over 64 labelings. Edited: original said "exactly one" over 64 splits; the brute force returns 2 labelings.
- curriculum: `{"primary":"math:signed-cycle-balance","also":["math:parity-rules"],"prerequisites":["math:parity-rules"],"level":"stretch","strand":"discrete","references":[{"work":"easley-kleinberg-2010","chapter":5}],"tags":["signed networks","cycles"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: enemy-of-my-enemy works on a complete network (every pair signed); here links are missing and the test moves from triangles to loops. math/bridge-parity is about odd junctions and walks, not signs on loops.

### 9. the-grid-takes-up-to-three-eighths · concept: cascade-capacity · stretch · demand 1 · format: Single card (q chips, Step)
- Chapter: 19 · domain: math
- Learner knows: the threshold rule q from cluster-stops-the-cascade / does not know: that each network has a largest q at which a small group of early adopters can take the whole thing, and that it depends on the network's shape.
- Misconception: Any threshold can be beaten if the starting group is big enough.
- Prediction (stage text ≤ 25 words): "Everyone on a big grid has 8 neighbours. A 5x5 block adopts. Each person adopts once at least q of their neighbours have. Highest q that takes everyone?" options: A. 1/2 / B. 3/8 / C. 1/4 (answer: B, 3/8). Edited: the original asked about a line, where 1/2 is the obvious guess (one of two neighbours) and nothing surprises. The line becomes the first Step (warm-up and reveal), the grid is the prediction. Trim to 25 words in the build ("Each person on a big grid has 8 neighbours" is the cut candidate).
- Check: Re-run, 201-person path with the middle two seeded: all 201 adopt at q = 0.4 and 0.5; only the 2 seeds at q = 0.51 and 0.6. 41x41 8-neighbour grid, 5x5 seed: all 1,521 interior people adopt at q = 0.3 and 0.375; stays at 25 at q = 0.4 and 0.5. A cell next to a side of the block has 3 adopting neighbours, a cell diagonal to a corner has 1, which is why 3/8 is the limit.
- Reveal (one line): A line takes q up to 1/2; a grid, where a newcomer beside the block sees only 3 of 8 neighbours, stops above 3/8.
- Planned claims:
  1. On a line, two adjacent adopters take everyone when q is at most 1/2 and no one else when q is above 1/2. support: derivation; source: node simulation, 201-person path.
  2. On an 8-neighbour grid a 5x5 block takes the whole grid at q = 3/8 and stays at 25 people at q = 0.4. support: simulation; source: node 41x41 grid (the 39x39 interior).
  3. The cascade capacity of the 8-neighbour grid is 3/8 for every finite seed. support: citation + derivation; source: E&K ch. 19 advanced section; Morris (2000), Rev. Econ. Studies 67. Attribution: fact-checker confirms. Do not state it as the book's figure until a human confirms.
  4. The cascade capacity is the largest q at which a finite set of early adopters can spread to the whole (infinite) network. support: definition; source: E&K ch. 19; Morris (2000). Attribution: fact-checker confirms.
- curriculum: `{"primary":"math:cascade-capacity","also":[],"prerequisites":[],"level":"stretch","strand":"discrete","references":[{"work":"easley-kleinberg-2010","chapter":19}],"tags":["cascades","thresholds"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: cluster-stops-the-cascade (batch 1) asks where one cascade stops on one finite graph; this asks for a network's limit over all thresholds. Build after brief 3 and cluster-stops-the-cascade.

**Wave J additions (2026-10-14).** 4 more NCM briefs from `company/courses/ncm/briefs.md` (§ math.discrete (wave J)), proposed by cm-course-ncm. Acceptance was done by cm-course-ncm against this strand's rules, at the Wave J lead's instruction (re-run answers in node, equal-precision options, chapter-only references, no duplicate of a built lesson). `math` strand manager: re-check, and object in the course file if a brief fails your bar. Board item filed. Numbering continues this file's list so `tools/claim.mjs` hands these out.

### 10. friends-of-friends-overlap · concept: math:friends-of-friends-overlap · core · demand 2 · format: Single card with Step (step chips; the 1,000-person ring drawn as untapped texture)
- Sections: E&K ch. 2 (section 2.3, unconfirmed) · domain: math · course: ncm (wave J)
- Learner knows: everyone has about the same number of friends; multiplying 10 × 9 / does not know: that friends of friends are mostly your own friends when friends know each other, so the count two steps out is a small fraction of 10 × 9.
- Misconception: If everyone has 10 friends, about 90 people are two steps away from you.
- Prediction (stage text ≤ 25 words): "1,000 villagers sit in a ring; each knows the 5 nearest on each side (10 friends). How many people are exactly two steps from you?" options: A. 90 / B. 45 / C. 10 (answer: C (10)).
- Check: Node `J1 {"tree":{"d1":10,"d2":90,"d3":810,"within3":911},"ring":{"d1":10,"d2":10,"d3":10,"within3":31,"maxDist":100}}`. Ring: BFS from person 0 on a 1,000-ring where each links to the 5 nearest each side. "No shared friends" world: each friend brings 9 new people (a tree).
- Stage and controls: Initial state: the village, step 1 shown (10 friends ringed). Controls in DOM order: [2 steps] [3 steps] [No shared friends] [Village]; the active chip is disabled (`className="active"`). Readout: "people at this step: N" and "within N steps: M". Labels ≥ 10 px; the ring is texture (> 20 nodes, nothing tappable).
- QA path (each control once, DOM order, presets only): Pressing each control once in DOM order: 2 steps (milestone 1: village at 2 steps, 10 people), 3 steps (village 10 more), No shared friends (milestone 2: the tree at 3 steps, 810; the readout also lists 90 at step 2), Village (back). Every quoted number is on the readout when the reveal opens.
- Reveal (draft, ≤ 90 words, fits a 390×844 phone with the stage top visible): In the village your friends' friends are mostly your own friends, so step 2 adds only 10 new people (and step 3 another 10), not 90 and 810. Multiplying 10 × 9 assumes none of your friends know each other; closed triangles make the real count far smaller. (≤ 90 words; quotes the step the learner last viewed.)
- Planned claims:
  1. In the ring of 1,000 where each person knows the 5 nearest on each side, 10 people are exactly 1, 2 and 3 steps away, 31 people are within 3 steps (counting you), and the farthest person is 100 steps away. support: derivation; source: node BFS.
  2. If no two of anyone's friends know each other, 10 friends each with 10 friends give 90 people at 2 steps and 810 at 3 (911 within 3). support: derivation; source: arithmetic.
  3. Counting 'friends × friends' over-estimates the people two steps away when friendships close into triangles (the book's caution about naive breadth-first growth). support: citation; source: E&K ch. 2 (section unconfirmed). Attribution: fact-checker confirms.
- Format: Single card with Step (step chips; the 1,000-person ring drawn as untapped texture)
- Curriculum: `{"primary": "math:friends-of-friends-overlap", "also": ["math:exponential-growth"], "prerequisites": ["math:exponential-growth"], "level": "core", "strand": "discrete", "references": [{"work": "easley-kleinberg-2010", "chapter": 2, "section_unconfirmed": "2.3"}], "tags": ["networks", "breadth-first search", "triadic closure"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: cs/wave-from-the-corner and queue-or-stack-same-search teach breadth-first layers on a grid; probability/few-shortcuts-shrink-the-world adds random shortcuts to a ring (ch. 20). This one shows why the ring without shortcuts grows so slowly, the problem the shortcuts solve. The friendship-paradox brief (probability.md) compares averages, not layer sizes.

### 11. new-friend-loosens-the-circle · concept: math:clustering-coefficient · core · demand 2 · format: Single card (hand-drawn network stage, 6 people; 'Fay knows' chips)
- Sections: E&K ch. 3 (section 3.1, unconfirmed) · domain: math · course: ncm (wave J)
- Learner knows: friend pairs; counting pairs (handshake-counting) / does not know: that clustering is the share of a person's friend pairs who are friends, and that a new friend adds new pairs to the bottom of that share.
- Misconception: A new friend who knows some of your friends makes your circle tighter.
- Prediction (stage text ≤ 25 words): "Ana's 4 friends: 3 of their 6 pairs are friends (clustering 0.5). New friend Fay knows one of them. Ana's clustering now?" options: A. Higher than 0.5 / B. Still 0.5 / C. Lower than 0.5 (answer: C (0.4)).
- Check: Node `J2 {"before":0.5,"fayKnows":[0.3,0.4,0.5,0.6,0.7]}`: clustering = linked friend pairs / all friend pairs = (3 + k) / 10 when Fay knows k of the 4.
- Stage and controls: Ana in the centre, friends B–E on an arc with B–C, C–D, D–E linked; Fay appears when a chip is pressed. Controls in DOM order: [Fay knows 1] [Fay knows 2] [Fay knows 3] [No Fay]. Readout: "linked pairs 4 of 10 = 0.4". ≤ 6 nodes, labels ≥ 10 px, no node taps needed.
- QA path (each control once, DOM order, presets only): Each chip once in DOM order: knows 1 (milestone 1: 0.4, the question's case), knows 2 (milestone 2: 0.5, break-even), knows 3 (0.6), No Fay (0.5). The reveal quotes the recorded milestone values.
- Reveal (draft, ≤ 90 words, fits a 390×844 phone with the stage top visible): Fay makes 4 new pairs (her with each old friend), so Ana's pairs go from 6 to 10. Knowing 1 of them gives 4 linked pairs of 10: 0.4, lower. She had to know 2 of the 4, half of them, just to hold 0.5. (≤ 90 words.)
- Planned claims:
  1. Before Fay, 3 of Ana's 6 friend pairs are linked: clustering 3/6 = 0.5. support: derivation.
  2. With Fay knowing 0, 1, 2 or 3 of the four, clustering is 0.3, 0.4, 0.5 or 0.6 ((3 + k)/10). support: derivation; source: node.
  3. A person's clustering coefficient is the share of pairs of their friends who are friends with each other. support: definition; source: E&K ch. 3 (section unconfirmed; the map's 3.1 concept list); Watts and Strogatz (1998), Nature 393. Attribution: fact-checker confirms.
- Format: Single card (hand-drawn network stage, 6 people; 'Fay knows' chips)
- Curriculum: `{"primary": "math:clustering-coefficient", "also": ["math:handshake-counting"], "prerequisites": ["math:handshake-counting"], "level": "core", "strand": "discrete", "references": [{"work": "easley-kleinberg-2010", "chapter": 3, "section_unconfirmed": "3.1"}], "tags": ["networks", "clustering", "triadic closure"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: math/broker-between-two-groups counts unlinked friend pairs around one person (structural holes) at a fixed moment; this one asks how the share moves when a friend is added. news-comes-from-acquaintances is about which tie is a bridge. No lesson defines clustering.

### 12. payoffs-set-the-threshold · concept: math:coordination-threshold · core · demand 2 · format: Single card (friend-count and payoff chips; two live payoff bars)
- Sections: E&K ch. 19 (section 19.2, unconfirmed) · domain: math · course: ncm (wave J)
- Learner knows: the rule 'join once half your friends have' (cluster-stops-the-cascade) / does not know: that the share comes from the payoffs: with a per friend on New and b on Old, you switch once a share b/(a + b) of friends are on New.
- Misconception: You switch to a new option once most of your friends have.
- Prediction (stage text ≤ 25 words): "Per friend: both on New, you each get 3; both on Old, 2; mismatched, 0. Of 10 friends, how many on New before you switch?" options: A. 4 / B. 5 / C. 6 (answer: A (4: New 12 = Old 12; switch when New pays at least as much)).
- Check: Node `J15 {"q32":0.4,"q22":0.5,"q12":0.667,"q41":0.2,"firstKof10":4,"table":[[3,9,14],[4,12,12],[5,15,10]]}`: with k of 10 friends on New, New pays 3k and Old pays 2(10 − k).
- Stage and controls: Ten friend tokens, k filled for New; two payoff bars (New 3k, Old 2(10 − k)). Controls in DOM order: [4 on New] [3 on New] [New pays 2] [New pays 4, Old 1]; the payoff chips recompute the break-even k. Readout "New N · Old M". Labels ≥ 10 px.
- QA path (each control once, DOM order, presets only): Each control once in DOM order: 4 on New (milestone 1: 12 vs 12, the question's case), 3 on New (9 vs 14), New pays 2 (milestone 2: break-even moves to 5 of 10), New pays 4, Old 1 (break-even 2 of 10).
- Reveal (draft, ≤ 90 words, fits a 390×844 phone with the stage top visible): With 4 of your 10 friends on New, New pays 4 × 3 = 12 and Old pays 6 × 2 = 12: 4 is enough, not a majority. The share you need is Old's payoff over both, 2/(3 + 2) = 40%. When New paid only 2 you needed 5; when it paid 4 against Old's 1, just 2. The better the new thing, the fewer friends it takes. (≤ 90 words.)
- Planned claims:
  1. With payoffs 3 (both New), 2 (both Old), 0 (mismatch) and k of 10 friends on New, New pays 3k and Old 2(10 − k); they are equal at k = 4. support: derivation.
  2. In general the switching share is q = b/(a + b): 40% for 3 and 2, 50% for 2 and 2, 20% for 4 and 1. support: derivation.
  3. This networked coordination game gives the threshold rule used in the cascade model. support: citation; source: E&K ch. 19 (section unconfirmed); Morris (2000), Rev. Econ. Studies 67. Attribution: fact-checker confirms.
- Format: Single card (friend-count and payoff chips; two live payoff bars)
- Curriculum: `{"primary": "math:coordination-threshold", "also": ["economics:coordination-stag-hunt"], "prerequisites": ["math:threshold-cascade"], "level": "core", "strand": "discrete", "references": [{"work": "easley-kleinberg-2010", "chapter": 19, "section_unconfirmed": "19.2"}], "tags": ["cascades", "coordination", "thresholds"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: math/cluster-stops-the-cascade takes q = 1/2 as a given rule and asks where a cascade stops; economics/stag-needs-three-in-four is a two-player belief threshold. This one derives q from payoffs across many friends. Build after cluster-stops-the-cascade (built).

### 13. the-swap-that-goes-in-circles · concept: math:transitive-preferences · intro · demand 2 · format: Single card (swap preset chips)
- Sections: E&K ch. 23 (section 23.2, unconfirmed) · domain: math · course: ncm (wave J)
- Learner knows: preferring one thing to another; paying a little for something you prefer / does not know: that preferences in a circle let someone sell you swaps for ever, which is why choice models assume preferences are transitive.
- Misconception: Preferences that go in a circle are odd but harmless.
- Prediction (stage text ≤ 25 words): "Max prefers apple to banana, banana to cherry, cherry to apple. He pays 10¢ per preferred swap. He holds a cherry. After 6 swaps?" options: A. Apple, 60¢ poorer / B. Cherry, 60¢ poorer / C. Banana, 30¢ poorer (answer: B (cherry, 60¢ poorer)).
- Check: Swaps follow the preferences: cherry → banana → apple → cherry, one 3-swap loop; 6 swaps = 2 loops = 60¢ and back to the cherry. With ranked preferences apple > banana > cherry the swaps stop after 2 (holding the apple, 20¢ paid). Hand derivation; the builder re-runs it in node.
- Stage and controls: Three fruit cards on a circle with preference arrows; a coin counter. Controls in DOM order: [6 swaps] [3 swaps] [Rank them: apple first] [Back to the circle]; each preset replays its swaps from the cherry. Readout "holding: X · paid: N¢". Labels ≥ 10 px.
- QA path (each control once, DOM order, presets only): Each control once in DOM order: 6 swaps (milestone 1: cherry, 60¢, the question's case), 3 swaps (cherry, 30¢), Rank them (milestone 2: stops at apple after 2 swaps, 20¢), Back to the circle.
- Reveal (draft, ≤ 90 words, fits a 390×844 phone with the stage top visible): Every swap was one Max wanted, yet after 3 he held the cherry again, 30¢ poorer, and after your 6 he had paid 60¢ for nothing. Once his preferences were ranked, the swaps stopped at his favourite after 2. That is why choice models assume preferences are transitive. A group's majority can still go round in a circle even when every voter's preferences are ranked. (≤ 90 words.)
- Planned claims:
  1. With apple > banana, banana > cherry and cherry > apple, starting from a cherry, the swaps go cherry → banana → apple → cherry; 6 swaps cost 60¢ and end on the cherry. support: derivation.
  2. With apple > banana > cherry, swaps from a cherry stop at the apple after 2 (20¢). support: derivation.
  3. Models of individual choice assume preferences are complete and transitive. support: citation; source: E&K ch. 23 (section unconfirmed).
  4. The 'money pump' argument for transitivity is due to Davidson, McKinsey and Suppes (1955). support: citation; source: Philosophy of Science 22. Attribution: fact-checker confirms. The book is cited only for transitivity; the pump example is ours.
- Format: Single card (swap preset chips)
- Curriculum: `{"primary": "math:transitive-preferences", "also": ["probability:nontransitive-dice"], "prerequisites": ["math:condorcet-cycle"], "level": "intro", "strand": "discrete", "references": [{"work": "easley-kleinberg-2010", "chapter": 23, "section_unconfirmed": "23.2"}], "tags": ["voting", "preferences", "transitivity"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: math/agenda-picks-the-winner shows a group cycle from voters whose preferences are ranked; probability/dice-that-chase-each-other is a circle of dice, not of preferences. This one is why each voter is assumed ranked in the first place. Build before or after agenda-picks-the-winner (built).


## Knots, batch 1 (session 2, 2026-10-14): draw-a-table-knot

Source: design ruling `company/design/reviews/2026-10-14-knot-pictures.md` (Ruling 2 and the "cm-math-discrete consult" section), library `src/kit/knots` (EDD-004). **Not in `content/curriculum/math.json`:** there is no knot concept yet, so `concept:` below is a proposed id. The category lead or I add it before a builder claims this (not done here; I was asked only for the tracing decision). Tricolour-check, unknot-game and random-knot are not briefed here. Their pictures are ruled; their learning content is open.
Checks: crossings, determinants and `identify` were run by cm-math-discrete in node against `src/kit/knots/index.mjs`: 5_2 has 5 crossings (determinant 7), 6_1 has 6 (determinant 9), `identify` returns each knot's own name; 5_2 is not tricolourable and 6_1 is.

### 1. draw-a-table-knot · concept: knot-table-names (proposed) · core · demand 1 · format: single card
curriculum.references: none yet (work to choose; Rolfsen, *Knots and Links*, is the usual table, attribution for the fact-checker)
- Learner knows: that a knot is a closed loop of rope and a drawing shows over and under at crossings / does not know: that a knot's name in the table, such as 5_2, gives the fewest crossings any drawing of it can have, and the second number is only its place in that list.
- Misconception: "5_2" means five loops, or version 2 of a five-crossing knot made from a trefoil, or the number counts anything visible in the drawing.
- Prediction (stage text ≤ 25 words): "Knot tables name knots by crossings. The knot 6_1 is drawn below. What does the 6 mean?" options: fewest crossings in any drawing / number of loops / its age in years (answer: A).
- Interaction: chips choose 5_2 or 6_1 (the kit's derived table drawing). The learner taps each crossing gap on the picture; a counter shows how many are tapped; each tapped crossing gets a ring. A second toggle "name" shows the table name next to the count. **No tracing, no arc colouring, no labelling of strands** (decision below). Controls: 2 chips, the crossings themselves (each ≥ 44 px hit area), one toggle. Milestone: the learner has counted both knots and seen the name equals the count. Tap targets are the builder's check on the contact sheet (6_1's crossings are the closest together at the bottom clasp).
- Payoff (reveal ≤ 90 words, quotes only reachable states): the number in the name is the fewest crossings any drawing of that knot can have, the number after the underscore is just its order in the table; 5_2 and 6_1 are different knots even though both look like a twisted clasp, and you can tell them apart because no sequence of moves turns one into the other (invariants such as the determinant differ, 7 and 9). Do not say "every drawing has this many", since a drawing can add extra crossings.
- Planned claims:
  1. The first number in a table name is the knot's crossing number, the fewest crossings in any diagram of it. support: definition; source: Rolfsen table convention (fact-checker to confirm wording).
  2. The kit's 5_2 drawing has 5 crossings and its 6_1 drawing has 6. support: derivation; source: `crossingCount` in node on `src/kit/knots`.
  3. 5_2 and 6_1 are different knots (determinants 7 and 9). support: derivation; source: `determinant` in node; determinant is an invariant of the knot (citation: standard, fact-checker to confirm).
  4. The second number is the knot's place in the table among knots of that crossing number. support: definition; source: Rolfsen convention.
- Needs interaction-designer spec: no.
- Pictures: the kit's derived 5_2 and 6_1 are accepted for this task by the design lead (Ruling 2) **because learners only look and count**. 3_1 and 4_1 are not offered until block (b) lifts (it needs the fix1 conditions). 6_3 is excluded. **Tracing decision (cm-math-discrete, 2026-10-14): learners do not trace the strand or colour arcs here.** Therefore 6_1 does not need fix1-bigon's drawing. If this brief ever adds a task of following the rope or colouring arcs on 6_1 (its left side is a thin lens), it must use fix1-bigon's drawing and come back to design.
- Differs from nearest: no knot lesson exists in `src/demos` and `node tools/overlap.mjs` lists no knot concept. Its neighbour in the pipeline is tricolour-check, which asks about arcs and colourings on 3_1; this one only counts crossings and names.

## Wave J (cm-math, 2026-10-14)

Five new concepts (logic, counting, invariants), none taught yet; each is added to `content/curriculum/math.json` with `subarea: "discrete"`. Ranked demand 3 first, then demand 2 in prerequisite order. Every number is recomputed by `node company/domains/briefs/checks/math-wave-j-check.mjs` (labels D1 to D5); no learner-facing claim needs the web. Dedupe: grepped all `meta.json` and briefs for Wason, selection task, contrapositive, negation, quantifier, chords/regions, chessboard/domino, combinations; the nearest lessons are named in each brief. `node tools/overlap.mjs` lists no pair on these concepts.
Shared build rules: as in `math.algebra.md` Wave J (stage text ≤ 25 words, reveal ≤ 90 words and fits with its picture at 390×844, labels ≥ 10 px, 44 px targets, preset buttons and Step instead of slider ranges, every milestone reached by pressing each control once in the DOM order given, current-state chip active and disabled, milestone values recorded so Reset cannot change them).

### 1. four-cards-one-rule · concept: conditional-falsification · core · demand 3 · format: Single card
- Learner knows: what "if … then …" means in everyday speech; vowels and even numbers / does not know: that a rule "if P then Q" can only be broken by a case with P true and Q false, so you test it by hunting for that case, not by finding cases that agree.
- Misconception: to test "if vowel, then even" you turn the vowel and the even number (looking for confirmation). (Rationale, not learner text: Wason's selection task, Wason 1968, *Quarterly Journal of Experimental Psychology* 20(3); success rates are empirical, not checked, never quoted.)
- Prediction (kit text): "Rule: if a card shows a vowel, its back is even. You see E, K, 4, 7. Which must you turn to test it?" options: A. E and 4 / B. E and 7 / C. E only / D. All four (answer: B).
- Check (D1): every card has a letter on one side and a number on the other; possible backs are 4 or 7 for a letter, A or K for a number. Backs that break the rule: E: 7; K: none; 4: none; 7: A. So exactly E and 7 can break it.
- Stage: four cards in a row. Tapping a card shows its two possible backs underneath as small cards; a back that would break the rule gets a red outline and the word "breaks" (outline plus word, not colour alone); the others say "fine". Controls in DOM order: card E, card K, card 4, card 7, Reset. A row readout counts "Could break the rule: E, 7".
- Stage word budget: 20 words (stimulus 0, other 20): busiest frame is all four cards inspected. Card letters "E", "K" 2; back letters "A", "K", "A", "K" (under cards 4 and 7) 4; back tags "breaks" x2 and "fine" x6 8; readout "Could break the rule: E, 7" 5; "Reset" 1. Numerals 0. Predict question and options are kit text, not counted.
- Milestones: (1) the 4 inspected (the tempting card, no back breaks it); (2) all four inspected. QA path: four card taps.
- Reveal (draft, 72 words): "Only two cards could hide a back that breaks the rule: E, with a 7 behind it, and 7, with a vowel behind it. The 4 could not break it whatever its back, because the rule never says even numbers need vowels; turning it can only agree. A rule 'if P then Q' fails only when P is true and Q is false, so you test it by looking for that case."
- Phone fit: four cards 72 px wide in one row at 390 px; backs 40 px below each.
- Planned claims:
  1. "If P then Q" is false exactly when P is true and Q is false (material conditional). support: definition; source: truth table (derivation).
  2. Under that reading only E and 7 can falsify the rule; K and 4 cannot whatever is on their backs. support: derivation; source: D1 enumeration.
  3. Not claimed in learner text: how many people answer correctly (empirical).
- curriculum: `{"primary":"math:conditional-falsification","also":[],"prerequisites":[],"level":"core","strand":"discrete","references":[],"tags":["logic","conditionals","proof"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: no lesson in any category teaches the selection task or the logic of "if … then". `math/two-right-angles-never-meet` (proof by contradiction) assumes the reader can negate a statement; this is its logical prerequisite in spirit.

### 2. not-every-circle-is-red · concept: negating-all · core · demand 2 · format: Single card
- Learner knows: "all", "none", "some" in everyday speech / does not know: that the opposite of "every circle is red" is "at least one circle is not red", not "no circle is red".
- Misconception: "Not every circle is red" means "no circle is red".
- Prediction (kit text): "Which sentence means exactly the same as 'Not every circle is red'?" options: A. No circle is red / B. Some circle is not red / C. Some circle is red (answer: B).
- Check (D2): with circles all red: "not every" false, "none" false, "some not" false, "some red" true. One blue: true, false, true, true. All blue: true, true, true, false. "Some circle is not red" matches "not every" in all 16 colourings of 4 circles; "No circle is red" differs in the 14 with some but not all red. (Script checks the three named scenes; the 16-colouring statement follows from the definitions.)
- Stage: four circles in a row, starting all red (solid fill, "R" label 12 px); a tap toggles a circle to blue (hatched fill, "B"). Below, four sentence rows with live true/false marks: "Not every circle is red", "No circle is red", "Some circle is not red", "Some circle is red" (18 words). The row that matches the first row in the current state is ticked. Controls in DOM order: circle 1, circle 2, circle 3, circle 4, Reset.
- Stage word budget: 23 words (stimulus 0, other 23): circle labels "R"/"B" 4; sentence rows "Not every circle is red" 5, "No circle is red" 4, "Some circle is not red" 5, "Some circle is red" 4 = 18; "Reset" 1; row marks and the match tick are glyphs, 0. **r5 trim:** the live true/false marks are the glyphs ✓ / ✗ (shape, not colour alone; each with an aria-label, not counted), not the words "true" / "false". As worded before the trim the busiest frame was 27 (4 + 18 + 4 + 1). The match tick must differ in shape from ✓ (use "=").
- Milestones: (1) a state where "Not every circle is red" is true but "No circle is red" is false (first tap); (2) all four blue (both true). QA path: four taps reach both.
- Reveal (draft, 66 words): "With one circle blue, 'Not every circle is red' turned true while 'No circle is red' stayed false, so they do not mean the same. 'Some circle is not red' matched it in every state you made. One exception is enough to deny 'every'. The opposite of 'all are' is 'at least one is not', and the opposite of 'none are' is 'at least one is'."
- Phone fit: circles row 64 px plus four sentence rows of 28 px.
- Planned claims:
  1. "Not every x is red" is equivalent to "some x is not red". support: definition (negation of a universal statement); source: logic, derivation.
  2. With one of four circles blue, "not every circle is red" is true and "no circle is red" is false. support: derivation; source: D2.
  3. "Not (no x is red)" is equivalent to "some x is red". support: definition.
- curriculum: `{"primary":"math:negating-all","also":["math:conditional-falsification"],"prerequisites":[],"level":"core","strand":"discrete","references":[],"tags":["logic","quantifiers","negation"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: `four-cards-one-rule` (this batch) is about "if … then"; this is about "every". No other lesson negates a quantifier.

### 3. regions-from-circle-points · concept: pattern-is-not-proof · core · demand 2 · format: Single card
- Learner knows: joining points with straight lines; counting pieces / does not know: that a pattern holding for five cases can still break, and why this one does (pieces = 1 + lines + crossings).
- Misconception: 2, 4, 8, 16 must continue as 32: a pattern that held five times is proved.
- Prediction (kit text): "Points on a circle, every pair joined. 1 point: 1 piece. 2: 2. 3: 4. 4: 8. 5: 16. With 6 points?" options: A. 30 / B. 31 / C. 32 (answer: B).
- Check (D3): points at 0°, 64°, 113°, 179°, 230°, 308° (the first n used for n points). Computed crossings 0, 0, 0, 1, 5, 15 and pieces 1, 2, 4, 8, 16, 31 by Euler's formula on the drawing, matching 1 + C(n,2) + C(n,4). No three lines meet at a point (all 15 crossings at 6 points distinct; the closest two are 0.209 radius apart, about 30 px on a 145 px circle). A regular hexagon instead gives 30 (three diagonals meet at the centre), so the even spacing must not be used.
- Stage: a circle with the points and lines; the pieces alternately shaded in two light tones so they can be counted; readout "6 points · 15 lines · 15 crossings · 31 pieces". Controls in DOM order: "2 points", "3 points", "4 points", "5 points", "6 points", Reset; initial state 1 point (1 piece). Each chip draws its lines and crossings (crossing dots 6 px).
- Stage word budget: 10 words (stimulus 0, other 10): readout "6 points · 15 lines · 15 crossings · 31 pieces" 4 (points, lines, crossings, pieces); chips "2 points" to "6 points" 5; "Reset" 1. Numerals and "·" 0.
- Milestones: (1) 5 points with 16 pieces seen (the pattern held); (2) 6 points with 31 pieces seen. QA path: chips in order.
- Reveal (draft, 68 words): "Doubling held up to 5 points, then 6 points gave 31, not 32. Every piece is made by a line or a crossing: pieces = 1 + lines + crossings. With 6 points that is 1 + 15 + 15 = 31. Lines come from pairs of points and crossings from groups of four, so the count was never doubling. Five matching cases are evidence, not a proof."
- Phone fit: circle radius 145 px; readout one line; chips one row of 6 small chips or two rows.
- Planned claims:
  1. With the stage's points, pieces are 1, 2, 4, 8, 16, 31 for 1 to 6 points. support: derivation; source: D3 (planar Euler count).
  2. When no three lines meet at one point, pieces = 1 + C(n,2) + C(n,4) (each line adds 1 piece plus 1 per crossing it makes). support: derivation.
  3. Each crossing comes from exactly one set of four points, so there are C(n,4) crossings. support: derivation (the crossing chords are the diagonals of that quadrilateral).
  4. With 6 evenly spaced points there are 30 pieces (meta evidence only, not learner text). support: derivation; source: D3.
- curriculum: `{"primary":"math:pattern-is-not-proof","also":["math:handshake-counting","math:pascals-triangle"],"prerequisites":["math:handshake-counting"],"level":"core","strand":"discrete","references":[],"tags":["patterns","proof","counting"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: `math/handshakes-halve` counts the lines (pairs); `math/domino-chain` shows what a real proof by induction needs. This one is the warning that comes before both: a pattern is not a proof. The CS colouring lessons count regions of maps, not chords.

### 4. two-corners-off-the-board · concept: colouring-invariant · core · demand 2 · format: Single card
- Learner knows: a domino covers two neighbouring squares; a chequered board / does not know: that counting colours can prove a tiling impossible without trying every arrangement.
- Misconception: remove two squares from a board with an even number of squares and the rest can always be covered by dominoes, if you try hard enough.
- Prediction (kit text): "A 4 by 4 board loses two opposite corners. 14 squares are left. Can 7 dominoes cover them exactly?" options: A. Yes / B. No (answer: B).
- Check (D4): 4×4 has 8 dark, 8 light squares and 36 domino tilings. Opposite corners (0,0) and (3,3) are both dark: 6 dark and 8 light remain, 0 tilings (brute force), so at most 6 dominoes fit. Two corners in one row, (0,0) and (0,3), are one dark and one light: 7 and 7 remain, 12 tilings. For the full 8×8 board with opposite corners removed: 30 dark, 32 light.
- Stage: the 4×4 board, dark squares also marked with a small dot (not colour alone); readout "dark 6 · light 8". Controls in DOM order: "Opposite corners off" (draws the best try: 6 dominoes placed, 2 light squares left uncovered and outlined), "Corners in one row off" (draws a full 7-domino tiling), "Another try" (shows a different maximal placement for the current board, still 2 light squares left on the opposite-corner board; on the one-row board a different full tiling), Reset. Each domino is drawn spanning one dark and one light square.
- Stage word budget: 13 words (stimulus 0, other 13): readout "dark 6 · light 8" 2; "Opposite corners off" 3; "Corners in one row off" 5; "Another try" 2; "Reset" 1. Dots, numerals and "·" 0.
- Milestones: (1) opposite-corner board shown with 2 uncovered light squares; (2) one-row board tiled. QA path: chips 1 and 2 fire both; chip 3 changes the drawing on either board.
- Reveal (draft, 79 words): "Every domino covers one dark and one light square, whichever way it lies. With opposite corners off you had 6 dark and 8 light, so at most 6 dominoes could fit and 2 light squares were always left. With two corners in one row off, 7 and 7, and the board tiled. Counting colours proves no arrangement can work, without trying them all. The same count rules out a full chessboard with opposite corners off: 30 dark, 32 light."
- Phone fit: board 4 × 56 px = 224 px; readout and chips below.
- Planned claims:
  1. Every domino on a chequered board covers one dark and one light square. support: derivation (neighbouring squares differ in colour).
  2. The 4×4 board without opposite corners has 6 dark and 8 light squares and no domino tiling; without two corners of one row it has 7 and 7 and 12 tilings. support: derivation; source: D4 brute force.
  3. An 8×8 board without opposite corners has 30 dark and 32 light squares, so 31 dominoes cannot cover it. support: derivation; source: D4.
- curriculum: `{"primary":"math:colouring-invariant","also":["math:parity-rules"],"prerequisites":["math:parity-rules"],"level":"core","strand":"discrete","references":[],"tags":["invariants","tiling","proof"]}`
- Needs interaction-designer spec: no (the "best try" drawings are fixed placements; builder records them in meta).
- Differs from nearest: `math/seven-odds-leave-one` uses parity of a sum; `math/two-colours-enough` colours a map. This one uses a colouring as a counting argument to prove impossibility, the idea behind invariant proofs.

### 5. pick-two-or-pick-four · concept: complement-counting · core · demand 2 · format: Single card with Step
- Learner knows: counting pairs (`math/handshakes-halve`) / does not know: that choosing k of n has exactly as many ways as choosing the n − k left behind, because each choice of who goes is a choice of who stays.
- Misconception: choosing 4 of 6 gives more possible groups than choosing 2 of 6, because the groups are bigger.
- Prediction (kit text): "6 friends. You take 2 of them on a trip, or else 4 of them. Which choice has more possible groups?" options: A. Taking 2 / B. Taking 4 / C. The same (answer: C).
- Check (D5): C(6,0..6) = 1, 6, 15, 20, 15, 6, 1; C(6,2) = C(6,4) = 15; C(6,3) = 20. Also C(10,2) = C(10,8) = 45.
- Stage: six friends A to F (letters 12 px). A pair is highlighted as "go"; the four left are drawn as "stay" and outlined together as a group of 4. Counters "pairs seen: 1 of 15" and "fours seen: 1 of 15". Controls in DOM order: "Next pair" (Step), "All pairs" (jumps to 15 of 15, listing the pairs as a compact 3 × 5 grid of two-letter chips), "Groups of 3" (shows the count 20 and one 3-and-3 split), Reset.
- Stage word budget: 37 words (stimulus 0, other 37): **Stage over budget: 37.** Busiest frame is "All pairs": friend letters A to F 6; 15 pair chips ("AB" etc., one letter-bearing token each) 15; "go" and "stay" labels 2 (once each; 6 if every friend carries its own); counters "pairs seen: 1 of 15" 3 and "fours seen: 1 of 15" 3; "Next pair" 2, "All pairs" 2, "Groups of 3" 3, "Reset" 1. The counter wording and control labels are the only non-claim words; shortening them ("pairs 1/15", "fours 1/15") saves 4 and gives 33, still over, and the 15 pair chips alone are 15. No r5 trim applied. For cm-math: draw each pair as two joined dots with no letters on the chips (0 words, a picture change), or cut the 3 x 5 grid; either is a teaching or layout call, not a builder trim.
- Milestones: (1) one pair and its four seen together; (2) counters at 15 and 15. QA path: Step then All pairs.
- Reveal (draft, 67 words): "Every pair you picked left exactly four behind, and each four left behind exactly one pair. So the groups match one to one: 15 pairs, 15 fours. Choosing who goes is the same as choosing who stays. Groups of 3 are the most, 20, where goers and stayers are the same size. In general, choosing k of n has as many ways as choosing n − k." (The groups-of-3 sentence only if that chip was pressed; otherwise drop it.)
- Phone fit: friends row 56 px; the 3 × 5 pair grid ≤ 150 px.
- Planned claims:
  1. There are 15 ways to choose 2 of 6 and 15 ways to choose 4 of 6; 20 ways to choose 3. support: derivation; source: D5.
  2. Matching each chosen group with the group left out is one-to-one, so C(n,k) = C(n,n − k). support: derivation (bijection).
- curriculum: `{"primary":"math:complement-counting","also":["math:pascals-triangle","math:handshake-counting"],"prerequisites":["math:handshake-counting"],"level":"core","strand":"discrete","references":[],"tags":["counting","combinations","bijection"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: `math/handshakes-halve` counts pairs; `math/paths-by-adding` builds Pascal's triangle by addition and shows its symmetry without saying why. This lesson gives the why: a bijection between going and staying.
