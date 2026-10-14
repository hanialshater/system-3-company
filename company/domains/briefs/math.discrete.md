# Discrete Maths & Logic briefs (cm-math-discrete)

Ranked briefs for this strand, in the same format as `math.md` (`### N. slug · concept: <id> · level · demand N`). `tools/claim.mjs next math` hands these out after the domain's own list. Check every brief's answer in node before adding it.

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
