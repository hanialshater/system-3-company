# Networks, Crowds, and Markets: gap briefs (cm-course-ncm)

owner: cm-course-ncm (Jonah) · 2026-10-14 · work `easley-kleinberg-2010` · map `content/courses/ncm/chapters.json` · coverage `company/courses/ncm/coverage.md`

**What this is.** One brief for every demo-able section of the book that has no built lesson and is not in session 2's batch 1 (51 briefs covering 59 sections). Grouped by owning strand (`### <domain>.<strand>`) so each strand manager can re-check its own and copy it into `company/domains/briefs/<domain>.<strand>.md`, where builders claim from. Until a strand manager accepts a brief, it is a proposal: the concept is in `content/curriculum/<domain>.json` with `"course": "ncm", "proposed": true`.

**Rules these briefs follow.**
- **The book is a map only.** No text, figures or exercises are copied. Every example, payoff and number below is our own, and every number was re-run in node (`ncm-checks.mjs` in the session scratchpad; each Check line pastes its output line verbatim).
- **Section numbers.** Only 3.1, 3.2, 3.5, 3.6, 6.10 and 2.1 were seen in a search snippet. Everything else is unconfirmed, so `curriculum.references` cites the **chapter only** and keeps the section in `section_unconfirmed` (head-of-product rule, 2026-10-14). A builder must not move it into `section` until someone with the book confirms it.
- **Claim flags.** "Needs a human source check" = an empirical finding the fact-checker cannot verify from the derivation (keep it out of learner text until checked). "Attribution: fact-checker confirms" = a theorem or model name whose citation needs confirming; the maths itself is checked here.
- **Rank** is teaching value across the whole course (1 = build first after batch 1); see `coverage.md` for the ranked list and where it differs from the vertical doc. Builds beyond batch 1 stay behind the vertical's gate (real-learner data, or a head-of-product slot).
- **Format.** From `company/design/formats.md`. "needs spec" = not the single-card / simulation-run default, so the interaction designer specs it first. Network-stage briefs follow the design lead's interim network rules (`company/design/reviews/2026-10-14-design-lead-ncm-rulings.md` on `ccr-rnd-ncm`): ≤ 20 nodes, labels ≤ 3 characters, 44 px targets.
- **Prerequisites** list only concepts that exist on this branch. Where a batch-1 concept is the natural prerequisite (for example `economics:second-price-auction`), the brief says so in "Differs" and the strand manager adds it once batch 1 merges.

### math.discrete

Owner to re-check: `cm-math-discrete` · 9 briefs

#### 1. the-middle-voter-decides · concept: math:median-voter · core · demand 3 · rank 4 · format: Single card
- Sections: ch. 23.6 (unconfirmed) · domain: math
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: majority votes between two options; a left–right line / does not know: that with single-peaked preferences the median voter's favourite beats every rival in a two-way vote.
- Misconception: The position that wins every head-to-head vote is the average voter's position.
- Prediction (stage text ≤ 25 words): "Five voters' favourites sit at 1, 2, 3, 8 and 10 on a 0–10 line. Each prefers nearer. Which position beats every other?" options: A. 3 / B. 4.8 (the average) / C. 5 (the centre) (answer: A (3, the median)).
- Check: Node: `23.6 {"mean":4.8,"median":3,"beatsAll":[3],"threeVsMean5":"3 wins"}`; among whole-number positions 0–10 only 3 beats all others pairwise.
- Reveal (one line): Any rival to the right of 3 loses voters 1, 2 and 3; any to the left loses 3, 8 and 10. The middle voter decides, not the average.
- Planned claims:
  1. With favourites at 1, 2, 3, 8 and 10, position 3 beats every other whole-number position in a two-way majority vote. support: derivation; source: node pairwise check.
  2. The average of the favourites is 4.8, and 3 beats 5 by 3 votes to 2. support: derivation; source: node.
  3. With single-peaked preferences the median voter's favourite is a majority winner (median voter theorem). support: citation (theorem); source: E&K ch. 23 (section unconfirmed); Black (1948), J. Political Economy 56. Attribution: fact-checker confirms.
- curriculum: `{"primary":"math:median-voter","also":["math:mean-vs-median"],"prerequisites":["math:mean-vs-median"],"level":"core","strand":"discrete","references":[{"work":"easley-kleinberg-2010","chapter":23,"section_unconfirmed":"23.6"}],"tags":["voting","median"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: math/one-boss-moves-the-mean and seesaw-mean teach mean vs median as statistics; this is the same contrast as a voting outcome. agenda-picks-the-winner shows cycles that single-peakedness rules out.

#### 2. bridge-carries-news-not-habits · concept: math:complex-contagion-bridges · core · demand 2 · rank 12 · format: Single card with Step (network stage)
- Sections: ch. 19.4 (unconfirmed) · domain: math
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: weak ties bring news across groups (ch. 3); the 'join when half your friends have' rule / does not know: that a behaviour needing several adopting friends stops at the same bridge that news crosses.
- Misconception: Whatever spreads like news spreads like a habit: the bridge that carries one carries the other.
- Prediction (stage text ≤ 25 words): "Two groups of 5 joined by one link. Group A adopts. Ben, across the bridge, joins if half his friends have. Does group B adopt?" options: A. Yes, all of B / B. Only Ben / C. No one in B (answer: C (Ben sees 1 of 5 friends, 20%)).
- Check: Two complete groups of 5, one bridge 4–5, seeds 0 and 1, q = 1/2. Node: `19.4 {"behaviourAdopters":5,"behaviourRounds":2,"newsReached":10,"node5FractionWhenGroupAOn":0.2}`: the habit fills group A in 2 rounds and stops; news (any one friend) reaches all 10.
- Reveal (one line): News needs one friend, so it crosses the bridge; the habit needs half your friends, and across a bridge you have only one.
- Planned claims:
  1. With the 'half your friends' rule, the habit fills group A in 2 rounds and stops at the bridge; Ben has 1 of 5 friends adopting. support: derivation; source: node simulation.
  2. News that passes on from any one friend reaches all 10 people. support: derivation; source: node simulation.
  3. Weak ties help information spread but can block behaviours that need reinforcement from several contacts. support: citation; source: E&K ch. 19 (section unconfirmed); Centola and Macy (2007), Am. J. Sociology 113(3). Attribution: fact-checker confirms.
- curriculum: `{"primary":"math:complex-contagion-bridges","also":["probability:independence"],"prerequisites":[],"level":"core","strand":"discrete","references":[{"work":"easley-kleinberg-2010","chapter":19,"section_unconfirmed":"19.4"}],"tags":["cascades","weak ties","complex contagion"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: news-comes-from-acquaintances (batch 1) shows news crossing a weak tie; cluster-stops-the-cascade (batch 1) shows a dense cluster blocking a cascade. This one puts both on one bridge, news crossing and the habit not. Build after both.

#### 3. the-loser-flips-the-winner · concept: math:borda-iia · core · demand 2 · rank 19 · format: Before / after toggle · **needs spec**
- Sections: ch. 23.4 (unconfirmed) · domain: math
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: ranking options and adding up points / does not know: that removing an option nobody ranks first can change who wins a points-based vote.
- Misconception: Dropping a candidate who came last cannot change the winner.
- Prediction (stage text ≤ 25 words): "Borda vote: 2 points for 1st, 1 for 2nd. B wins; C is last. Remove C and recount. Who wins?" options: A. B again / B. A / C. A tie (answer: B (A wins 3–2)).
- Check: Profile: 3 voters A>B>C, 2 voters B>C>A. Node: `23.4 {"voters":5,"profile":[[3,["A","B","C"]],[2,["B","C","A"]]],"withC":{"A":6,"B":7,"C":2},"withoutC":{"A":3,"B":2}}`.
- Reveal (one line): Nobody changed their mind about A versus B, yet removing last-placed C flipped the winner from B (7–6) to A (3–2).
- Planned claims:
  1. With C on the ballot the Borda scores are A 6, B 7, C 2. support: derivation; source: node.
  2. Without C, A beats B 3 to 2 on the same voters' rankings. support: derivation; source: node.
  3. Positional (Borda) voting can violate independence of irrelevant alternatives. support: citation; source: E&K ch. 23 (section unconfirmed); Borda (1781) attribution. Attribution: fact-checker confirms.
- curriculum: `{"primary":"math:borda-iia","also":[],"prerequisites":[],"level":"core","strand":"discrete","references":[{"work":"easley-kleinberg-2010","chapter":23,"section_unconfirmed":"23.4"}],"tags":["voting","Borda","spoiler"]}`
- Needs interaction-designer spec: yes.
- Differs from nearest: agenda-picks-the-winner (batch 1) is pairwise majority and cycles; this is points-based voting and a spoiler effect. ai/which-answer-wins is preference learning, not elections.

#### 4. one-shy-rioter-stops-the-riot · concept: math:heterogeneous-thresholds · core · demand 2 · rank 24 · format: Single card with Step
- Sections: ch. 19.5 (unconfirmed) · domain: math
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: people join once enough others have / does not know: that a crowd's outcome can hinge on one person's threshold, not on the crowd's average mood.
- Misconception: Two crowds with almost identical people behave almost identically.
- Prediction (stage text ≤ 25 words): "100 people: one joins if 0 others have, one if 1, … one if 99. Change the '1' person to '2'. How many join?" options: A. 100 / B. About 50 / C. 1 (answer: C (1)).
- Check: Node: `19.5 {"thresholds0to99":100,"oneChangedTo2":1}`. Everyone sees everyone (a complete network).
- Reveal (one line): The chain needs a next person at every count; remove the one who joins at 1 and the first mover stands alone.
- Planned claims:
  1. With thresholds 0, 1, 2, …, 99 everyone joins, one at a time. support: derivation; source: node.
  2. Changing the single threshold of 1 to 2 leaves only 1 person joining. support: derivation; source: node.
  3. The example is Granovetter's threshold model of collective behaviour. support: citation; source: M. Granovetter, 'Threshold Models of Collective Behavior', Am. J. Sociology 83(6) (1978). Attribution: fact-checker confirms.
- curriculum: `{"primary":"math:heterogeneous-thresholds","also":[],"prerequisites":[],"level":"core","strand":"discrete","references":[{"work":"easley-kleinberg-2010","chapter":19,"section_unconfirmed":"19.5"}],"tags":["cascades","thresholds","collective behaviour"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: cluster-stops-the-cascade (batch 1) has one threshold for everyone and lets the network shape stop it; here the network is complete and the spread of thresholds decides.

#### 5. three-students-two-rooms · concept: math:constricted-set-matching · core · demand 2 · rank 35 · format: Single card
- Sections: ch. 10.1 (unconfirmed) · domain: math
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: matching people to rooms, each person listing rooms they accept / does not know: that a perfect matching fails exactly when some group accepts fewer rooms than it has people.
- Misconception: If every person accepts at least one room and there are as many rooms as people, everyone can be housed.
- Prediction (stage text ≤ 25 words): "Four students, four rooms. Three accept only rooms 1 and 2; the fourth accepts any. Can everyone get a room they accept?" options: A. Yes / B. No / C. Only if the fourth takes room 1 (answer: B (no: three people, two acceptable rooms)).
- Check: Node: `10.1 {"perfectMatchings":0,"maxRoomsFilledBy3":2,"afterOneStudentAccepts3":2}`. 0 of 24 assignments work; letting one of the three also accept room 3 gives 2 working assignments.
- Reveal (one line): Three students share only two acceptable rooms, a 'constricted set', so someone is left out however you assign; that is the only thing that can block a perfect matching.
- Planned claims:
  1. With the stage's lists, none of the 24 assignments gives every student an acceptable room. support: derivation; source: node enumeration.
  2. A perfect matching exists unless some set of people together accepts fewer items than its size (matching theorem). support: citation (theorem); source: E&K ch. 10 (section unconfirmed); Hall (1935), J. London Math. Soc. 10; König (1931). Attribution: fact-checker confirms.
- curriculum: `{"primary":"math:constricted-set-matching","also":["math:pigeonhole-principle"],"prerequisites":["math:pigeonhole-principle"],"level":"core","strand":"discrete","references":[{"work":"easley-kleinberg-2010","chapter":10,"section_unconfirmed":"10.1"}],"tags":["matching","bipartite graphs"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: proposers-get-the-best (cs brief, stable matching) is about preferences and stability; this one is about whether any full matching exists at all. math:pigeonhole-principle is its prerequisite.

#### 6. enemies-allow-three-camps · concept: math:weak-balance · stretch · demand 1 · rank 37 · format: Single card (hand-drawn network stage)
- Sections: ch. 5.4 (unconfirmed) · domain: math
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: the balance rule from enemy-of-my-enemy (at most two camps) / does not know: that if an all-enemy triangle is allowed, the network can split into any number of camps.
- Misconception: Hostile networks always end up as two sides.
- Prediction (stage text ≤ 25 words): "Six people in three pairs. Friends inside a pair, enemies across. Banned: two friends with a shared enemy. How many banned triangles?" options: A. 0 / B. 8 / C. 20 (answer: A (0; the 8 all-enemy triangles are allowed under the weaker rule)).
- Check: Node: `5.4 {"K5_weaklyBalanced":52,"K5_strong":16,"bell5":52,"K6_threeCamps_allEnemyTriangles":8,"K6_threeCamps_forbiddenUnderWeak":0}`. Of 1,024 sign patterns on 5 people, 52 meet the weak rule, which equals the number of ways to split 5 people into camps (Bell number 52); 16 meet the strong rule.
- Reveal (one line): Allow 'everyone hates everyone' triangles and three camps are stable: no banned triangle, though 8 triangles are all enemies.
- Planned claims:
  1. Under weak balance the only banned triangle has two friendly pairs and one hostile pair. support: definition; source: E&K ch. 5 (section unconfirmed).
  2. The 3-camp split of 6 people has 0 banned triangles and 8 all-enemy triangles. support: derivation; source: node enumeration.
  3. For 5 people, 52 of 1,024 friend/enemy patterns are weakly balanced, one for each way of splitting them into camps. support: derivation; source: node enumeration; Bell number B5 = 52.
  4. Weak balance and its many-camps result are due to Davis (1967). support: citation; source: J. A. Davis, Human Relations 20 (1967). Attribution: fact-checker confirms.
- curriculum: `{"primary":"math:weak-balance","also":[],"prerequisites":["math:parity-rules"],"level":"stretch","strand":"discrete","references":[{"work":"easley-kleinberg-2010","chapter":5,"section_unconfirmed":"5.4"}],"tags":["signed networks","balance"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: enemy-of-my-enemy (batch 1) proves at most 2 camps under the strong rule; this lesson relaxes one triangle type and the limit disappears. Build after it.

#### 7. broker-between-two-groups · concept: math:structural-holes · core · demand 1 · rank 40 · format: Single card (hand-drawn network stage)
- Sections: ch. 3.5 (confirmed) · domain: math
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: friends and groups; that some people know more people than others / does not know: that the person who links groups that don't know each other has the most unconnected pairs of friends around them, not the person with the most friends.
- Misconception: The best-connected person is whoever has the most friends.
- Prediction (stage text ≤ 25 words): "Hana's 5 friends all know each other. Bo's 4 sit in two groups that don't. Who has more pairs of friends who are strangers?" options: A. Hana / B. Bo / C. Same (answer: B (Bo: 4 pairs; Hana: 0)).
- Check: Graph: Hana + 5 friends as a complete group of 6; a group of 4; Bo linked to 2 in each group. Node: `3.5 {"hub":{"friends":5,"unlinkedFriendPairs":0,"betweenness":0},"broker":{"friends":4,"unlinkedFriendPairs":4,"betweenness":24},"maxNode":10}`. Bo also lies on the most shortest paths (24 pairs, the highest of the 11 people); Hana on none.
- Reveal (one line): Bo has fewer friends but spans a gap: 4 pairs of his friends are strangers, so news from both groups meets at him.
- Planned claims:
  1. Bo has 4 pairs of friends who do not know each other; Hana has 0. support: derivation; source: node count on the stage graph.
  2. Bo lies on more shortest paths between other people than anyone else on the stage (24 pairs); Hana lies on none. support: derivation; source: Brandes betweenness in node.
  3. A person whose friends are not linked to each other spans a 'structural hole' (term from Burt 1992, Structural Holes, Harvard UP). support: citation; source: Burt (1992); E&K ch. 3 §3.5. Attribution: fact-checker confirms.
- curriculum: `{"primary":"math:structural-holes","also":["math:handshake-counting"],"prerequisites":[],"level":"core","strand":"discrete","references":[{"work":"easley-kleinberg-2010","chapter":3,"section":"3.5"}],"tags":["networks","brokerage","structural holes"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: news-comes-from-acquaintances (batch 1) is about which *tie* is the bridge; this one is about which *person* sits in the gap. No lesson counts structural holes.

#### 8. one-odd-loop-blocks-two-camps · concept: math:signed-cycle-balance · stretch · demand 1 · rank 48 · format: Single card (hand-drawn network stage)
- Sections: ch. 5.5 (unconfirmed) · domain: math
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: two camps = friends inside, enemies across / does not know: that a network with missing links can be split into two camps exactly when every loop has an even number of enemy links.
- Misconception: If the big loop around everyone looks fine, the network can be split into two camps.
- Prediction (stage text ≤ 25 words): "Six people in a ring plus one cross link. Two enemy links; the big ring has an even count. Can they split into two camps?" options: A. Yes / B. No / C. Can't tell from the loops (answer: B (no: each 4-person loop holds one enemy link)).
- Check: Ring 0–5 plus chord 0–3; enemies 0–1 and 3–4. Node: `5.5 {"A":{"splits":0,"cycleNegatives":{"0-1-2-3-0":1,"0-3-4-5-0":1,"ring6":2}},"B":{"splits":1,...},"C":{"splits":1,...}}`. Case A has 0 valid splits; moving the second enemy link to 2–3 (case B) gives 1.
- Reveal (one line): Check every loop, not just the big one: the cross link makes two small loops with one enemy each, so no two-camp split exists.
- Planned claims:
  1. A signed network can be split into two camps (friends inside, enemies across) if and only if every cycle has an even number of enemy links. support: citation (theorem) + check; source: E&K ch. 5 (section unconfirmed); Harary (1953) attribution. Attribution: fact-checker confirms.
  2. On the stage graph with enemies 0–1 and 3–4 there is no valid split; with enemies 0–1 and 2–3 there is exactly one. support: derivation; source: node brute force over 64 splits.
- curriculum: `{"primary":"math:signed-cycle-balance","also":["math:parity-rules"],"prerequisites":["math:parity-rules"],"level":"stretch","strand":"discrete","references":[{"work":"easley-kleinberg-2010","chapter":5,"section_unconfirmed":"5.5"}],"tags":["signed networks","cycles"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: enemy-of-my-enemy works on a complete network (every pair signed); here links are missing and the test moves from triangles to loops.

#### 9. the-line-takes-up-to-half · concept: math:cascade-capacity · stretch · demand 1 · rank 49 · format: Single card (q chips, Step)
- Sections: ch. 19.7 (unconfirmed) · domain: math
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: the threshold rule q from cluster-stops-the-cascade / does not know: that each network has a largest q at which a small group of early adopters can take the whole thing.
- Misconception: Any threshold can be beaten if the starting group is big enough or the line is long enough.
- Prediction (stage text ≤ 25 words): "An endless line. Two neighbours adopt. Each person adopts once at least q of their 2 neighbours have. Highest q that takes everyone?" options: A. 1/3 / B. 1/2 / C. 2/3 (answer: B (1/2)).
- Check: Node, 201-person path, seeds the middle two: `19.7 {"path201_seeds2":{"0.4":201,"0.5":201,"0.51":2,"0.6":2},"grid41_8nbr_seed5x5":{"0.3":"1521/1521 interior","0.375":"1521/1521 interior","0.4":"25/1521 interior","0.5":"25/1521 interior"}}`. On an 8-neighbour grid a 5×5 seed takes the whole interior at q = 3/8 and stays at 25 at q = 0.4, matching the book's grid capacity of 3/8.
- Reveal (one line): On a line each newcomer sees one adopter of two, so it spreads while q ≤ 1/2 and stops above it; a grid's limit is lower, 3/8.
- Planned claims:
  1. On a line, two adjacent adopters take everyone when q ≤ 1/2 and no one else when q > 1/2. support: derivation; source: node simulation, 201-person path.
  2. On an 8-neighbour grid the cascade capacity is 3/8. support: citation + simulation; source: E&K ch. 19 advanced section (section unconfirmed); node 41×41 grid, 5×5 seed. Attribution: fact-checker confirms.
  3. The cascade capacity is the largest q at which a finite set of early adopters can spread to the whole (infinite) network. support: definition; source: E&K ch. 19; Morris (2000), Rev. Econ. Studies 67. Attribution: fact-checker confirms.
- curriculum: `{"primary":"math:cascade-capacity","also":[],"prerequisites":[],"level":"stretch","strand":"discrete","references":[{"work":"easley-kleinberg-2010","chapter":19,"section_unconfirmed":"19.7"}],"tags":["cascades","thresholds"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: cluster-stops-the-cascade (batch 1) asks where one cascade stops on one finite graph; this one asks for a network's limit over all thresholds.

### cs.algorithms

Owner to re-check: `cm-cs-algorithms` · 3 briefs

#### 1. cut-the-busiest-link · concept: cs:edge-betweenness-communities · stretch · demand 2 · rank 14 · format: Single card with Step (network stage)
- Sections: ch. 3.6 (confirmed) · domain: cs
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: shortest paths (wave-from-the-corner) / does not know: that the links between communities carry the most shortest paths, so cutting the busiest link repeatedly reveals the groups.
- Misconception: The busiest link is one attached to the most-connected person.
- Prediction (stage text ≤ 25 words): "Two friend groups (5 and 4) with two links between them. Which link carries the most shortest paths?" options: A. A link inside the group of 5 / B. A link between the groups / C. All about equal (answer: B (each between-group link carries 10 pairs; no inside link carries more than 3.5)).
- Check: Node (Brandes, each pair counted once): `3.6 {"steps":[{"top":[["4-5",10],["3-6",10],["6-8",3.5]],"removed":"4-5","comps":[9]},{"top":[["3-6",20],["6-8",6],["6-7",6]],"removed":"3-6","comps":[5,4]}],"maxInsideEdgeAtStart":3.5}`. Two Step taps split the groups.
- Reveal (one line): Paths between groups must squeeze through few links, so those links are busiest; cut the busiest, recount, cut again, and the two groups fall apart.
- Planned claims:
  1. On the stage each between-group link lies on 10 shortest paths' worth of pairs; no link inside a group carries more than 3.5. support: derivation; source: node Brandes betweenness.
  2. After the first cut the remaining between-group link carries 20; cutting it leaves groups of 5 and 4. support: derivation; source: node.
  3. Repeatedly removing the highest-betweenness edge is the Girvan–Newman method. support: citation; source: Girvan and Newman (2002), PNAS 99(12); E&K ch. 3 §3.6 (confirmed title). Attribution: fact-checker confirms.
- curriculum: `{"primary":"cs:edge-betweenness-communities","also":["cs:graph-shortest-path"],"prerequisites":["cs:graph-shortest-path"],"level":"stretch","strand":"algorithms","references":[{"work":"easley-kleinberg-2010","chapter":3,"section":"3.6"}],"tags":["networks","betweenness","communities"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: wave-from-the-corner finds one shortest path; this counts all of them per link. No lesson finds communities.
- Objection (cm-cs-algorithms): the brief does not give the graph, and no graph I tried reproduces its numbers. I searched two groups (nodes 0-4 and 5-8, bridges 4-5 and 3-6, every edge set inside each group) for a start with 10, 10, and 3.5 on 6-8, then 3-6 at 20 and 6-7, 6-8 at 6 after the first cut; none matched. Also the stage prediction (which link is busiest) does not test the stated misconception (most-connected person). Resubmit with the full edge list, node output of it, and a prediction that tests the misconception (for example, a hub with the most friends versus a bridge). Concept stays proposed.
- Answer (cm-cs, 2026-10-14): objection upheld; this version is not built. Rewritten as `company/domains/briefs/cs.algorithms.md` #82 cut-the-busiest-link with a full 17-link edge list and its node output (bridges 12 and 12, H at most 5; after one cut the other bridge carries 24 = 6 x 4). The hub-versus-bridge test is not reused, because math/broker-between-two-groups already teaches it; the prediction now tests recounting after a cut, which is the Girvan–Newman step. Concept no longer marked proposed.

#### 2. random-surfer-finds-the-rank · concept: cs:pagerank-random-walk · core · demand 2 · rank 15 · format: Simulation run
- Sections: ch. 14.6 (unconfirmed) · domain: cs
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: PageRank passes rank along links (batch 1) / does not know: that PageRank equals the share of time a random clicker (who sometimes jumps anywhere) spends on each page.
- Misconception: A page with one in-link gets about a third of the visits of a page with three.
- Prediction (stage text ≤ 25 words): "A surfer clicks random links forever, jumping anywhere 15% of the time. A has 1 in-link, C has 3. A's visits compared with C's?" options: A. About a third / B. About half / C. Almost the same (answer: C (A 31%, C 33%)).
- Check: Links A→B, B→C, C→A, D→C, E→C. Node (seed 146, 100,000 clicks; PageRank by power iteration, s = 0.85): `14.6 {"pagerank":{"A":0.312,"B":0.295,"C":0.332,"D":0.03,"E":0.03},"surferShare":{"A":0.311,"B":0.296,"C":0.332,"D":0.03,"E":0.03},"inLinks":{"A":1,"B":1,"C":3,"D":0,"E":0}}`.
- Reveal (one line): A's one link comes from C, so the surfer lands on A almost as often as on C; the visit shares match PageRank to 0.001.
- Planned claims:
  1. In the stage's run of 100,000 clicks the surfer spends 31.1% of steps on A and 33.2% on C. support: simulation; source: node, mulberry32 seed 146.
  2. Scaled PageRank (s = 0.85) gives A 0.312 and C 0.332, matching the visit shares. support: derivation; source: node power iteration.
  3. PageRank equals the long-run probability that a random surfer with random jumps is on each page. support: citation; source: E&K ch. 14 advanced section (section unconfirmed); Brin and Page (1998). Attribution: fact-checker confirms.
- curriculum: `{"primary":"cs:pagerank-random-walk","also":["probability:random-walk"],"prerequisites":["probability:random-walk"],"level":"core","strand":"algorithms","references":[{"work":"easley-kleinberg-2010","chapter":14,"section_unconfirmed":"14.6"}],"tags":["web","random walk","PageRank"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: one-good-link-beats-many (batch 1) computes PageRank by update rounds; this one gets the same numbers from a surfer simulation. probability/drunk-walk-distance is a random walk on a line, not a graph.

#### 3. good-lists-make-good-pages · concept: cs:hubs-authorities · stretch · demand 1 · rank 38 · format: Single card with step-run button
- Sections: ch. 14.2 (unconfirmed) · domain: cs
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: pages link to pages; counting in-links / does not know: that a link counts for more when it comes from a page that lists other good pages.
- Misconception: The page with the most in-links ranks highest.
- Prediction (stage text ≤ 25 words): "Page X has 3 in-links from one-link pages. Page Y has 2, from pages that list several good pages. After updating, which scores higher?" options: A. X / B. Y / C. Tie (answer: B (Y 0.277 vs X 0.099)).
- Check: Hubs h1, h2 → Y, Z, W; h3, h4 → X; h5 → X, W. 50 alternating hub/authority updates, normalised. Node: `14.2 {"inLinks":{"Y":2,"Z":2,"W":3,"X":3},"authority":{"Y":0.277,"Z":0.277,"W":0.346,"X":0.099}}`.
- Reveal (one line): A good list points to good pages, and a good page is pointed to by good lists; X's fans list only X, so their votes count for little.
- Planned claims:
  1. After repeated updates Y's authority score is 0.277 and X's is 0.099, though X has 3 in-links and Y has 2. support: derivation; source: node HITS iteration (50 rounds).
  2. Hub score is the sum of the authority scores a page points to; authority score is the sum of the hub scores pointing to it (then normalised). support: definition; source: E&K ch. 14 (section unconfirmed); Kleinberg (1999), J. ACM 46(5). Attribution: fact-checker confirms.
- curriculum: `{"primary":"cs:hubs-authorities","also":[],"prerequisites":["cs:graph-shortest-path"],"level":"stretch","strand":"algorithms","references":[{"work":"easley-kleinberg-2010","chapter":14,"section_unconfirmed":"14.2"}],"tags":["web","link analysis"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: one-good-link-beats-many (batch 1, PageRank) passes rank page to page; HITS keeps two scores. Build after it; the stage can reuse its graph.

### cs.systems

Owner to re-check: `cm-cs-systems` · 1 brief

#### 1. selfish-routes-cost-a-third-more · concept: cs:price-of-anarchy · core · demand 2 · rank 11 · format: Single card (split slider drives live chart)
- Sections: ch. 8.3 (unconfirmed) · domain: cs
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: drivers pick the faster road (traffic equilibrium) / does not know: that the selfish equilibrium can be worse on average than a planner's split, by up to 4/3 with roads whose delay grows in proportion to traffic.
- Misconception: If every driver picks the fastest route, the average trip is as short as it can be.
- Prediction (stage text ≤ 25 words): "Road A always takes 60 min. Road B takes 60 min × its share of drivers. Selfish drivers average 60. Can a planner beat that?" options: A. No, 60 is best / B. Yes, to 45 / C. Yes, to 30 (answer: B (half on each: 45 min)).
- Check: Node: `8.3 {"equilibriumAvg":60,"optimumShareOnVariable":0.5,"optimumAvg":45,"ratio":1.333}`.
- Reveal (one line): Everyone piles onto B because it is never slower than A, which makes it 60 min; sending half to A cuts B to 30 and the average to 45.
- Planned claims:
  1. With everyone on road B the trip takes 60 minutes on both roads, and no driver gains by switching. support: derivation; source: node.
  2. Splitting drivers half and half gives an average of 45 minutes, the minimum. support: derivation; source: node grid search.
  3. With delays that grow in proportion to traffic, the selfish equilibrium's total travel time is at most 4/3 of the best possible. support: citation (theorem); source: E&K ch. 8 advanced section (section unconfirmed); Roughgarden and Tardos (2002), J. ACM 49(2); Pigou (1920) example. Attribution: fact-checker confirms.
- curriculum: `{"primary":"cs:price-of-anarchy","also":["economics:externality"],"prerequisites":["cs:weighted-shortest-path"],"level":"core","strand":"systems","references":[{"work":"easley-kleinberg-2010","chapter":8,"section_unconfirmed":"8.3"}],"tags":["traffic","equilibrium","price of anarchy"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: new-road-slower-trip (batch 1, Braess) adds a road and everyone gets slower; this one has no new road and asks how far selfish routing is from the best split.

### probability.chance

Owner to re-check: `cm-probability-chance` · 7 briefs

#### 1. near-and-far-links-find-the-way · concept: probability:decentralized-search · core · demand 3 · rank 2 · format: Simulation run (exponent chips 0/1/2)
- Sections: ch. 20.3 (unconfirmed), 20.4 (unconfirmed) · domain: probability
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: small worlds have short paths (few-shortcuts-shrink-the-world, batch 1) / does not know: that people can *find* short paths using only local knowledge only if long links are spread across distance scales (probability ∝ 1/d on a ring).
- Misconception: Purely random long links are best for finding people, since they reach farthest.
- Prediction (stage text ≤ 25 words): "2,000 people on a ring, each with one long link. Messages go to whoever is closest to the target. Which long links route fastest?" options: A. Uniformly random / B. Chance ∝ 1/distance / C. Chance ∝ 1/distance² (answer: B (29.5 steps vs 38.4 and 218.8)).
- Check: Node: 5 seeded networks × 200 random pairs each: `20.3 {"N":2000,"meanGreedySteps":{"q0":38.425,"q1":29.493,"q2":218.797},"ringOnlyMean":500}`.
- Reveal (one line): Random links exist but are useless for aiming; links that are too local never jump. 1/distance gives links at every scale, so each step can halve the distance.
- Planned claims:
  1. In the stage's model (ring of 2,000, one long link each), greedy routing averages 29.5 steps with 1/d links, 38.4 with uniform links and 218.8 with 1/d² links. support: simulation; source: node, 5 seeds × 200 pairs.
  2. Without long links the average is 500 steps. support: derivation; source: ring of 2,000: mean distance N/4.
  3. Greedy routing is fast only when the long-link exponent equals the dimension (1 for a ring). support: citation (theorem); source: Kleinberg (2000), Nature 406 and STOC; E&K ch. 20 (sections unconfirmed; MIT reading list cites 20.3–20.6). Attribution: fact-checker confirms.
  4. Milgram's letter-forwarding studies showed that people can find short chains using only local knowledge. support: citation; source: Travers and Milgram (1969), Sociometry 32(4). **Needs a human source check (empirical); keep out of learner text until checked.**
- curriculum: `{"primary":"probability:decentralized-search","also":["cs:graph-shortest-path"],"prerequisites":["probability:random-walk"],"level":"core","strand":"chance","references":[{"work":"easley-kleinberg-2010","chapter":20,"section_unconfirmed":"20.3–20.4"}],"tags":["small world","search","networks"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: few-shortcuts-shrink-the-world (batch 1) shows short paths *exist*; this one asks whether people can *find* them. cs/a-star-heads-for-goal uses a global map.

#### 2. weak-links-hold-it-together · concept: probability:tie-strength-overlap · core · demand 2 · rank 13 · format: Simulation run (network removal curve) · **needs spec**
- Sections: ch. 3.3 (unconfirmed) · domain: probability
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: strong ties sit inside groups and weak ties between them (ch. 3) / does not know: that removing the weakest links first shatters a network far faster than removing the strongest first.
- Misconception: Cutting the strongest, closest relationships does the most damage to a network.
- Prediction (stage text ≤ 25 words): "60 people, 6 friend groups. Delete the 20% of links with fewest shared friends, or the 20% with most. Which breaks it apart?" options: A. Fewest shared friends / B. Most shared friends / C. Both about the same (answer: A (largest group 28 of 60 vs 60 of 60)).
- Check: Toy model, mulberry32 seed 33: 6 groups of 10 (links inside with prob 0.5) plus 12 between-group links; tie strength measured by neighbourhood overlap. Node: `3.3 {"edges":133,"startGiant":60,"removed":[13,27,40],"weakFirst":[49,28,10],"strongFirst":[60,60,59],"lowOverlapEdges":32}`.
- Reveal (one line): Links with few shared friends are the bridges between groups; remove them first and the network falls into pieces, while removing close ties leaves it whole.
- Planned claims:
  1. In the stage's model, removing the 20% of links with the lowest overlap leaves a largest connected group of 28 of 60; removing the highest-overlap 20% leaves 60. support: simulation; source: node, seed 33 (rule disclosed on card).
  2. Neighbourhood overlap of a link = shared friends ÷ friends of either end (excluding each other). support: definition; source: E&K ch. 3 (section unconfirmed).
  3. A study of a national mobile-phone network found the same pattern: removing weak ties first fragments it much sooner. support: citation; source: Onnela et al. (2007), PNAS 104(18). **Needs a human source check (empirical); keep out of learner text until checked.**
- curriculum: `{"primary":"probability:tie-strength-overlap","also":[],"prerequisites":[],"level":"core","strand":"chance","references":[{"work":"easley-kleinberg-2010","chapter":3,"section_unconfirmed":"3.3"}],"tags":["networks","weak ties","robustness"]}`
- Needs interaction-designer spec: yes.
- Differs from nearest: the-giant-appears (batch 1) adds random links until a giant group forms; this one removes links by strength and watches it break. news-comes-from-acquaintances is one bridge on a hand-drawn graph.

#### 3. the-long-tail-adds-up · concept: probability:long-tail · core · demand 2 · rank 16 · format: Single card (cutoff slider drives live chart)
- Sections: ch. 18.5 (unconfirmed) · domain: probability
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: a few hits sell a lot / does not know: that under a Zipf law the 99% of items outside the top 1% can still take over a third of all sales.
- Misconception: Outside the hits, sales are negligible.
- Prediction (stage text ≤ 25 words): "100,000 items, sales falling as 1/rank (Zipf). The top 1,000 take what share of all sales?" options: A. About 99% / B. About 62% / C. About 10% (answer: B (61.9%; the other 99,000 take 38%)).
- Check: Node: `18.5 {"top100":0.429,"top1000":0.619,"top10000":0.81}`.
- Reveal (one line): The top 1% sell 62%, but the other 99,000 items, each tiny, add up to 38%: a store that can stock them all gains a lot.
- Planned claims:
  1. With sales proportional to 1/rank over 100,000 items, the top 1,000 take 61.9% of sales and the top 100 take 42.9%. support: derivation; source: node harmonic sums.
  2. The term 'long tail' for niche sales was popularised by Anderson (2004/2006). support: citation; source: C. Anderson, Wired (2004); The Long Tail (2006); E&K ch. 18. Attribution: fact-checker confirms.
  3. The 1/rank sales curve is a model, not data for any store. support: derivation; source: lesson rule.
- curriculum: `{"primary":"probability:long-tail","also":[],"prerequisites":["probability:power-law-scaling"],"level":"core","strand":"chance","references":[{"work":"easley-kleinberg-2010","chapter":18,"section_unconfirmed":"18.5"}],"tags":["power law","Zipf","long tail"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: power-law-scaling (this course) is about the shape; this lesson sums the tail. No lesson teaches Zipf sums.

#### 4. ten-times-links-hundred-times-rarer · concept: probability:power-law-scaling · core · demand 2 · rank 29 · format: Single card (axis toggle: linear vs log–log)
- Sections: ch. 18.2 (unconfirmed) · domain: probability
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: most pages have few links, a few have many / does not know: that in a power law with exponent 2, ten times the links makes a page 100 times rarer at every scale, a straight line on log–log axes.
- Misconception: Pages with 1,000 links are so rare they effectively don't exist, as in a bell curve.
- Prediction (stage text ≤ 25 words): "The share of pages with k links falls like 1/k². How much rarer are pages with 1,000 links than pages with 100?" options: A. 10 times / B. 100 times / C. Millions of times (answer: B (100 times)).
- Check: Node: `18.2 {"ratio100vs1000":100,"ratio10vs1000":10000,"logLogSlope":-2}`.
- Reveal (one line): Each tenfold step in links costs the same factor, 100, so on log–log axes the curve is a straight line of slope −2, and huge pages are rare but real.
- Planned claims:
  1. If the share of pages with k links is proportional to 1/k², pages with 1,000 links are 100 times rarer than pages with 100. support: derivation; source: node.
  2. A power law appears as a straight line on log–log axes, with slope equal to minus the exponent. support: derivation; source: log of c·k^−a is log c − a·log k.
  3. Web in-link counts have been measured to follow roughly a power law with exponent near 2.1. support: citation; source: Broder et al. (2000), Computer Networks 33; E&K ch. 18. **Needs a human source check (empirical); keep out of learner text until checked.**
- curriculum: `{"primary":"probability:power-law-scaling","also":["probability:heavy-tails"],"prerequisites":["probability:heavy-tails"],"level":"core","strand":"chance","references":[{"work":"easley-kleinberg-2010","chapter":18,"section_unconfirmed":"18.2"}],"tags":["power law","log scale"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: probability/average-that-never-settles (heavy tails, Cauchy) shows an average that won't settle; this one shows the scale-free shape itself. It takes a ch. 18 reference row too.

#### 5. mutual-friends-add-up-slower · concept: probability:triadic-closure-probability · intro · demand 2 · rank 39 · format: Single card (mutual-friend chips drive live chart)
- Sections: ch. 4.4 (unconfirmed) · domain: probability
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: triadic closure (friends of friends meet) / does not know: that independent chances combine as 1 − (1 − p)^k, so 5 mutual friends at 10% each give 41%, not 50%.
- Misconception: Each mutual friend adds the same chance, so 5 friends at 10% each make 50%.
- Prediction (stage text ≤ 25 words): "Each mutual friend, on their own, has a 10% chance of introducing you. With 5 mutual friends, what is the chance you meet?" options: A. 50% / B. 41% / C. 10% (answer: B (41%)).
- Check: Node: `4.4 {"1":0.1,"2":0.19,"3":0.271,"5":0.41,"10":0.651}`.
- Reveal (one line): Chances don't add: you miss only if all 5 fail, 0.9⁵ = 59%, so you meet with 41%; 10 mutual friends give 65%, not 100%.
- Planned claims:
  1. If each of k mutual friends independently introduces with probability 0.1, the chance of meeting is 1 − 0.9^k: 41% for 5, 65% for 10. support: derivation; source: node.
  2. In e-mail data, the probability of a new link rose with the number of mutual friends. support: citation; source: Kossinets and Watts (2006), Science 311; E&K ch. 4 (section unconfirmed). **Needs a human source check (empirical); keep out of learner text until checked.**
- curriculum: `{"primary":"probability:triadic-closure-probability","also":["probability:at-least-once"],"prerequisites":["probability:at-least-once"],"level":"intro","strand":"chance","references":[{"work":"easley-kleinberg-2010","chapter":4,"section_unconfirmed":"4.4"}],"tags":["networks","triadic closure","independence"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: probability/at-least-once style lessons (concept at-least-once) use dice and lotteries; this applies the same rule to friendship and sets up the empirical curve.
- Objection (cm-probability-chance): The numbers are right (1 − 0.9^k: 10, 19, 27, 41, 65%), but the rule is exactly what four-rolls-one-six, jackpot-once-a-week and one-in-a-million-daily already teach under concept at-least-once; dressing it as friendship is a re-skin, and the only new content (the rising empirical curve, Kossinets and Watts) must stay out of learner text until a human source check. Resubmit if the lesson turns on what is new: introductions that are NOT independent (a shared friend group makes the 5 correlated, so the true chance is below 41%), or the empirical curve once its source is checked. Concept stays `proposed: true`.

#### 6. more-copying-bigger-stars · concept: probability:preferential-attachment-exponent · stretch · demand 1 · rank 42 · format: Simulation run (copy-share chips 0/50/90%)
- Sections: ch. 18.7 (unconfirmed) · domain: probability
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: rich-get-richer from batch 1 (same-songs-different-hits) / does not know: how strongly the share of copying controls the size of the biggest winner.
- Misconception: Copying other people's links changes the biggest page a little, perhaps doubling it.
- Prediction (stage text ≤ 25 words): "10,000 new pages each add one link. Raise copying (link to what another page links to) from 0% to 90%. The biggest page's links?" options: A. About the same / B. About double / C. Hundreds of times more (answer: C (12–14 → 3,440–6,104 across 3 seeds)).
- Check: Node, seeds 1–3: `18.7 {"copy0":[{"max":12,...},{"max":13,...},{"max":14,...}],"copy50":[{"max":161,...},{"max":309,...},{"max":261,...}],"copy90":[{"max":3440,"top1pctShareOfLinks":0.844,...},{"max":4894,...},{"max":6104,...}]}`. Top 1% of pages hold 7% of links at 0% copying, 26–27% at 50%, 84% at 90%.
- Reveal (one line): Copying links to whatever is already linked sends new links to the rich in proportion to their wealth, and the tail grows from a dozen to thousands.
- Planned claims:
  1. In the stage's model of 10,000 pages, the most-linked page has 12–14 links with no copying and 3,440–6,104 with 90% copying (3 seeds). support: simulation; source: node, seeds 1–3.
  2. At 90% copying the top 1% of pages hold about 84% of links; with no copying about 7%. support: simulation; source: node.
  3. In this copying model the share of pages with k in-links falls roughly like k^−(1 + 1/c), with c the copying share: exponent 3 at c = 0.5, about 2.1 at c = 0.9. support: citation (analysis); source: E&K ch. 18 advanced section (section unconfirmed); Kumar et al. (2000). Attribution: fact-checker confirms.
- curriculum: `{"primary":"probability:preferential-attachment-exponent","also":[],"prerequisites":["probability:heavy-tails"],"level":"stretch","strand":"chance","references":[{"work":"easley-kleinberg-2010","chapter":18,"section_unconfirmed":"18.7"}],"tags":["power law","preferential attachment"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: same-songs-different-hits (batch 1) shows unpredictability across worlds; this one shows how copying strength sets the size of the tail.

#### 7. every-scale-equally-likely · concept: probability:distance-scales · stretch · demand 1 · rank 51 · format: Single card (exponent toggle drives bar chart)
- Sections: ch. 20.7 (unconfirmed) · domain: probability
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: 1/d long links route fastest (near-and-far-links-find-the-way) / does not know: why: with chance ∝ 1/d, a link is equally likely to land 1–2, 2–4, … or 256–512 away.
- Misconception: With 1/d links most links are very short.
- Prediction (stage text ≤ 25 words): "On a ring of 1,024, links land at distance d with chance ∝ 1/d. More likely: 2–4 away or 256–512 away?" options: A. 2–4 away / B. 256–512 away / C. About equal (answer: C (12.2% vs 10.2%)).
- Check: Node: `20.7 {"ring":1024,"q1_shareByScale_1to2_2to4_etc":[0.147,0.122,0.111,0.106,0.104,0.103,0.102,0.102,0.102],"q0_shareByScale":[0.002,0.004,0.008,0.016,0.031,0.063,0.125,0.25,0.5]}`. Uniform links put 50% in the farthest band.
- Reveal (one line): Each band is twice as wide but each distance half as likely, so every doubling band gets about 10–12%: whatever the distance, a link to halve it is equally likely.
- Planned claims:
  1. With chance ∝ 1/d on a ring of 1,024, each doubling band of distances gets 10–15% of links. support: derivation; source: node sums.
  2. With uniform links, half of all links land in the farthest band (256–512). support: derivation; source: node.
  3. This equal mass per scale is why the 1/d rule gives fast greedy search. support: citation; source: E&K ch. 20 advanced section (section unconfirmed); Kleinberg (2000). Attribution: fact-checker confirms.
- curriculum: `{"primary":"probability:distance-scales","also":[],"prerequisites":["probability:decentralized-search"],"level":"stretch","strand":"chance","references":[{"work":"easley-kleinberg-2010","chapter":20,"section_unconfirmed":"20.7"}],"tags":["small world","log scale"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: Pairs with near-and-far-links-find-the-way (build after it): that lesson shows the speed, this one shows the reason.

### probability.statistics

Owner to re-check: `cm-probability-statistics` · 3 briefs

#### 1. two-public-clues-break-the-herd · concept: probability:cascade-fragility · core · demand 2 · rank 18 · format: Before / after toggle (publish two clues) · **needs spec**
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
- Check: Node (20,000 seeded draws of 45 random friendships, seed 41): `4.1 {"exactCrossShare":0.46,"twoPQ":0.444,"expectedCrossOf45":20.69,"pAtMost9":0}`. The class's 9 of 45 (20%) never occurred by chance in 20,000 draws.
- Reveal (one line): Chance mixing gives about 46% crossing; the class has 20%. That gap, not the 20% alone, is the evidence of homophily.
- Planned claims:
  1. With 20 and 10 students, 200 of the 435 possible pairs cross groups (46%). support: derivation; source: node.
  2. For large groups with shares p and q the chance share is 2pq: 44% for 2/3 and 1/3. support: derivation; source: E&K ch. 4 (section unconfirmed).
  3. In 20,000 random draws of 45 friendships, none had 9 or fewer crossing. support: simulation; source: node, seed 41.
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

### economics.markets

Owner to re-check: `cm-economics-markets` · 23 briefs

#### 1. pay-for-the-harm-you-do · concept: economics:vcg-mechanism · core · demand 2 · rank 3 · format: Single card (bid slider; harm bars)
- Sections: ch. 15.3 (unconfirmed), 15.4 (unconfirmed) · domain: economics
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: second-price auctions (batch 1) / does not know: that charging each winner the value their presence costs everyone else makes honest bids best, even with several slots.
- Misconception: In a multi-slot ad auction each winner should pay their own bid.
- Prediction (stage text ≤ 25 words): "Slots get 10 and 5 clicks; values per click X $7, Y $6, Z $1. X wins top slot, paying the harm caused. How much?" options: A. $70 / B. $35 / C. $60 (answer: B ($35)).
- Check: Node: `15.3 {"order":["x","y","z"],"pay":{"x":35,"y":5,"z":0}}` and truth-telling check: `15.4 {"xUtilityByBid0to10":[0,30,30,30,30,30,35,35,35,35,35],"maxAt":6}` (X's honest bid of 7 earns the maximum, 35).
- Reveal (one line): Without X, Y and Z would get 60 + 5 = 65; with X they get 30; X pays the $35 difference, and no other bid would leave X better off.
- Planned claims:
  1. Without X, Y and Z's best value is 65; with X, they get 30, so X's VCG payment is 35. support: derivation; source: node.
  2. Y pays 5 and Z pays 0. support: derivation; source: node.
  3. Given the others' bids, X's profit is highest (35) at the honest bid; no bid does better. support: derivation; source: node over bids 0–10.
  4. Under VCG, truthful bidding is a dominant strategy. support: citation (theorem); source: Vickrey (1961), Clarke (1971), Groves (1973); E&K ch. 15 (sections unconfirmed). Attribution: fact-checker confirms.
- curriculum: `{"primary":"economics:vcg-mechanism","also":["economics:externality"],"prerequisites":["economics:externality"],"level":"core","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":15,"section_unconfirmed":"15.3–15.4"}],"tags":["auctions","mechanism design","advertising"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: bid-what-its-worth (batch 1) is one item; VCG extends the idea to several slots.

#### 2. middle-of-three-takes-all · concept: economics:network-exchange-power · core · demand 3 · rank 5 · format: Single card (path-length chips: 2 / 3 people)
- Sections: ch. 12.2 (unconfirmed), 12.3 (unconfirmed) · domain: economics
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: splitting $1 by agreement / does not know: that the person with a spare partner can push the split almost all the way to themselves.
- Misconception: Two people bargaining over $1 split it about evenly, whoever else is around.
- Prediction (stage text ≤ 25 words): "Ann–Bo–Cy in a line. Bo can split $1 with Ann or with Cy, not both. In repeated rounds, what share does Bo end up with?" options: A. About half / B. About two thirds / C. Nearly all (answer: C (any stable split gives Bo everything)).
- Check: Stability rule: an unmatched end would accept any small share, so Bo's outside option is the whole $1. Node: `12.8 {…"path3":{"centre":1,"endMatched":0}}`.
- Reveal (one line): Whoever Bo leaves out will offer to take less, so the ends bid each other down and Bo ends with nearly the whole $1.
- Planned claims:
  1. In a 3-person path where the centre can deal with only one end, any stable outcome gives the centre the whole $1. support: derivation; source: E&K ch. 12 (sections unconfirmed); node.
  2. In laboratory exchange experiments on such paths, the centre's share rose toward nearly all over rounds. support: citation; source: Cook, Emerson, Gillmore and Yamagishi (1983), Am. J. Sociology 89; Willer (1999). **Needs a human source check (empirical); keep out of learner text until checked.**
- curriculum: `{"primary":"economics:network-exchange-power","also":[],"prerequisites":["economics:supply-demand"],"level":"core","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":12,"section_unconfirmed":"12.2–12.3"}],"tags":["bargaining","power","networks"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: No lesson teaches bargaining power from position. four-in-a-row-two-thirds is the follow-up (4-path, 2/3).

#### 3. useless-degree-still-pays · concept: economics:signaling-education · core · demand 3 · rank 6 · format: Single card (cost sliders per type)
- Sections: ch. 22.8 (unconfirmed) · domain: economics
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: employers can't see ability directly (lemon-market-unravels) / does not know: that a credential can pay even if it teaches nothing, because it costs able people less to earn.
- Misconception: A degree is only worth getting if it makes you more productive.
- Prediction (stage text ≤ 25 words): "Firms pay $100k with a degree, $50k without. The degree teaches nothing; it costs able people $20k of effort, others $60k. Who gets it?" options: A. Everyone / B. Only the able / C. No one (answer: B (80 > 50 for the able; 40 < 50 for others)).
- Check: Node: `22.8 {"highWithDegree":80,"highWithout":50,"lowWithDegree":40,"lowWithout":50}`.
- Reveal (one line): Only the able find the degree worth its cost, so having one reveals ability, and firms are right to pay for it, though nobody learned a thing.
- Planned claims:
  1. With these numbers able workers net $80k with the degree and $50k without; others net $40k with it and $50k without. support: derivation; source: node.
  2. So only able workers get the degree, and it separates the two groups. support: derivation; source: rule.
  3. The model is Spence's job-market signalling. support: citation; source: Spence (1973), Q. J. Economics 87(3); E&K ch. 22 (section unconfirmed). Attribution: fact-checker confirms.
  4. The lesson does not claim real degrees teach nothing. support: derivation; source: lesson rule.
- curriculum: `{"primary":"economics:signaling-education","also":["economics:adverse-selection"],"prerequisites":["economics:adverse-selection"],"level":"core","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":22,"section_unconfirmed":"22.8"}],"tags":["information","signalling","labour"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: lemon-market-unravels shows hidden quality wrecking a market; this one shows how a costly signal fixes it.

#### 4. who-pays-same-filter · concept: economics:coase-theorem · core · demand 3 · rank 7 · format: Side-by-side comparison (two rights assignments) · **needs spec**
- Sections: ch. 24.1 (unconfirmed) · domain: economics
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: externalities (loaf-with-smoke) / does not know: that if bargaining is free, the efficient fix happens whoever holds the legal right; only who pays changes.
- Misconception: If the factory has the right to pollute, the pollution continues.
- Prediction (stage text ≤ 25 words): "Smoke costs a laundry $300 a year; a filter costs $100. The factory may legally pollute. If they bargain freely, is the filter fitted?" options: A. No, the factory has the right / B. Yes, the laundry pays for it / C. Only if a court orders it (answer: B).
- Check: Node: `24.1 {"factoryLiable":"filter (100 < 300)","factoryHasRight":"laundry pays between 100 and 300, filter installed","totalCostEitherWay":100}`.
- Reveal (one line): The laundry gains $300 from clean air and the filter costs $100, so it pays the factory to fit it; with the right reversed, the factory fits it itself.
- Planned claims:
  1. If the factory is liable it fits the $100 filter rather than pay $300 of damage. support: derivation; source: rule.
  2. If the factory has the right, the laundry gains by paying between $100 and $300 for the filter. support: derivation; source: rule.
  3. Either way the filter is fitted; the right decides only who pays (Coase theorem, when bargaining is costless). support: citation; source: Coase (1960), J. Law and Economics 3; E&K ch. 24 (section unconfirmed). Attribution: fact-checker confirms.
  4. With costly bargaining or many parties the result can fail. support: citation; source: E&K ch. 24. Attribution: fact-checker confirms.
- curriculum: `{"primary":"economics:coase-theorem","also":["economics:externality"],"prerequisites":["economics:externality"],"level":"core","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":24,"section_unconfirmed":"24.1"}],"tags":["externalities","property rights"]}`
- Needs interaction-designer spec: yes.
- Differs from nearest: loaf-with-smoke shows the externality's overproduction; shared-pasture shows the commons. This one shows bargaining as a fix. 24.1 is already covered (loaf-with-smoke); this is a concept gap inside it.

#### 5. odds-average-the-bettors · concept: economics:parimutuel-beliefs · core · demand 2 · rank 8 · format: Single card (wealth and belief sliders)
- Sections: ch. 22.2 (unconfirmed), 22.3 (unconfirmed) · domain: economics
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: odds and probability (odds-three-to-one) / does not know: that when bettors split their money in proportion to their beliefs, the market's implied chance is the wealth-weighted average belief.
- Misconception: The odds reflect the simple average opinion, or the loudest bettor's.
- Prediction (stage text ≤ 25 words): "Bettor 1 ($300) thinks A wins with 80%; bettor 2 ($100) thinks 40%. Each bets in proportion to belief. The pool's implied chance for A?" options: A. 60% / B. 70% / C. 80% (answer: B (70%: $280 of $400 on A)).
- Check: Node: `22.2 {"onA":280,"pool":400,"impliedP":0.7,"simpleAverage":0.6}`.
- Reveal (one line): $240 + $40 = $280 of the $400 pool is on A, so the odds say 70%: each opinion counts in proportion to the money behind it.
- Planned claims:
  1. With the stage's numbers $280 of a $400 pool is on A, an implied 70%. support: derivation; source: node.
  2. A bettor with log utility in a pari-mutuel market splits wealth across outcomes in proportion to their beliefs. support: citation; source: E&K ch. 22 (sections unconfirmed); Kelly (1956). Attribution: fact-checker confirms.
  3. Then the implied probabilities equal the wealth-weighted average of beliefs. support: derivation; source: E&K ch. 22; node.
- curriculum: `{"primary":"economics:parimutuel-beliefs","also":["probability:odds-vs-probability"],"prerequisites":["probability:odds-vs-probability"],"level":"core","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":22,"section_unconfirmed":"22.2–22.3"}],"tags":["markets","beliefs","betting"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: probability/bet-too-much-and-go-broke (Kelly fraction) is one bettor sizing one bet; this is many bettors setting a price. odds-three-to-one converts odds to probability.

#### 6. second-trader-pays-the-seller · concept: economics:trader-competition · core · demand 2 · rank 9 · format: Single card (add-trader toggle, bid ticks)
- Sections: ch. 11.3 (unconfirmed) · domain: economics
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: a middleman buys low and sells high / does not know: that once a second trader can reach the seller, competition bids the price up to the buyer's value and the traders earn nothing.
- Misconception: Adding a second middleman just splits the middleman's profit in two.
- Prediction (stage text ≤ 25 words): "One trader links a seller (value $0) to a buyer ($1), keeping $1. A second trader now reaches the seller. Who gets it?" options: A. The two traders split it / B. The seller / C. The buyer (answer: B (bids rise to $1)).
- Check: Node (alternating best responses on a $0.01 grid): `11.3 {"bidsAfterCompetition":[1,1],"sellerGets":1,"traderProfit":0,"monopolyCase":{"seller":0,"trader":1,"buyer":0}}`.
- Reveal (one line): Each trader can resell for $1, so each outbids the other a cent at a time until the bid reaches $1: the seller takes it all.
- Planned claims:
  1. With one trader linked to both sides, the trader can bid 0 and ask 1, keeping the whole $1. support: derivation; source: model rule.
  2. With two traders able to buy from the seller, each with a buyer at $1, outbidding drives the bid to $1 and trader profit to 0. support: derivation; source: node best-response iteration.
  3. The model is the trading-network model of Blume, Easley, Kleinberg and Tardos. support: citation; source: Games and Economic Behavior 67(1) (2009); E&K ch. 11. Attribution: fact-checker confirms.
- curriculum: `{"primary":"economics:trader-competition","also":["economics:monopoly-pricing"],"prerequisites":["economics:supply-demand"],"level":"core","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":11,"section_unconfirmed":"11.3"}],"tags":["markets","intermediaries","competition"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: No lesson models intermediaries. economics/monopoly-pricing is one seller and a demand curve, not a network of traders.

#### 7. stag-needs-three-in-four · concept: economics:coordination-stag-hunt · core · demand 2 · rank 10 · format: Single card (belief slider drives live chart)
- Sections: ch. 6.5 (unconfirmed) · domain: economics
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: best replies / does not know: that a better equilibrium needs enough trust: here at least 75% belief that the partner cooperates.
- Misconception: If both prefer the stag outcome, both will hunt stag.
- Prediction (stage text ≤ 25 words): "Stag: 4 if both hunt it, 0 if alone. Hare: 3 for sure. How sure must you be your partner hunts stag?" options: A. More than 50% / B. At least 75% / C. 100% (answer: B (75%: 4p ≥ 3)).
- Check: Node: `6.5 {"thresholdP":0.75,"evAtHalf":{"stag":2,"hare":3}}`.
- Reveal (one line): Both stag and both hare are stable; the stag pays only if you are at least 75% sure of your partner, so doubt alone can lock in the worse outcome.
- Planned claims:
  1. With these payoffs, hunting stag pays more than hare only if the partner hunts stag with probability at least 3/4. support: derivation; source: node.
  2. Both 'both stag' and 'both hare' are Nash equilibria. support: derivation; source: best-reply check.
  3. The stag hunt is named after Rousseau's example. support: citation; source: Skyrms, The Stag Hunt (2004); E&K ch. 6. Attribution: fact-checker confirms.
- curriculum: `{"primary":"economics:coordination-stag-hunt","also":[],"prerequisites":["economics:prisoners-dilemma"],"level":"core","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":6,"section_unconfirmed":"6.5"}],"tags":["game theory","coordination"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: two-suspects-payoff has one equilibrium; this has two, and belief chooses. below-critical-mass (batch 1) is a tipping point in a market, not a two-player game.

#### 8. rising-price-stops-at-second · concept: economics:ascending-auction · intro · demand 3 · rank 20 · format: Single card with step-run button (price rises $1 per tap)
- Sections: ch. 9.3 (unconfirmed), 10.5 (unconfirmed) · domain: economics
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: people stop bidding once the price passes what the item is worth to them / does not know: that the winner pays about the runner-up's value, not their own.
- Misconception: In a rising-price auction the winner pays close to what the item is worth to them.
- Prediction (stage text ≤ 25 words): "Three bidders value a lamp at $70, $55 and $40. The price rises $1 at a time. Where does it stop?" options: A. About $70 / B. About $55 / C. About $40 (answer: B ($55: the $55 bidder quits above it)).
- Check: Node: `9.3 {"lastRivalQuitsAbove":55,"winner":0,"priceWhenAlone":56,"secondHighest":55,"singleItemClearingPriceRange":[55,70]}`. As a one-item matching market, any price from $55 to $70 clears it; the rising procedure finds the lowest.
- Reveal (one line): The auction ends as soon as the second-keenest bidder drops out, so the $70 bidder pays about $55, the same as a sealed second-price auction.
- Planned claims:
  1. With values $70, $55 and $40 and $1 steps, bidding ends once the price passes $55, and the $70 bidder wins. support: derivation; source: node.
  2. An ascending auction is strategically equivalent to a sealed second-price auction (for private values). support: citation; source: E&K ch. 9 (section unconfirmed); Vickrey (1961), J. Finance 16. Attribution: fact-checker confirms.
  3. For one item, any price between the top two values clears the market; the rising procedure stops at the lowest. support: derivation; source: E&K ch. 10 (section unconfirmed); node.
- curriculum: `{"primary":"economics:ascending-auction","also":["economics:consumer-surplus"],"prerequisites":["economics:supply-demand"],"level":"intro","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":9,"section_unconfirmed":"9.3"},{"work":"easley-kleinberg-2010","chapter":10,"section_unconfirmed":"10.5"}],"tags":["auctions"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: bid-what-its-worth (batch 1) is the sealed second-price auction; this one shows that the open rising auction reaches the same price. Build after it.

#### 9. shade-your-sealed-bid · concept: economics:first-price-shading · core · demand 2 · rank 21 · format: Single card (bid slider drives expected-profit chart)
- Sections: ch. 9.5 (unconfirmed) · domain: economics
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: in a second-price auction you bid your value (batch 1) / does not know: that when you pay your own bid, the best bid is well below your value.
- Misconception: In a first-price sealed auction you should bid what the item is worth to you.
- Prediction (stage text ≤ 25 words): "It's worth $80 to you; winners pay their bid. Your rival's value is anywhere $0–100, and they bid half of it. Best bid?" options: A. $80 / B. $60 / C. $40 (answer: C ($40: 80% win × $40 = $32 expected)).
- Check: Node: `9.5 {"bestBid":40,"bestExpProfit":32,"winProbAtBest":0.8,"profitBid80":0,"profitBid50":30,"profitBid60":20}`.
- Reveal (one line): Bidding $80 wins most but earns nothing; each dollar shaved earns more per win and loses a few wins; the best is $40, an expected $32.
- Planned claims:
  1. Against a rival who bids half a value spread evenly on $0–100, a bid of b wins with probability b/50 (up to $50). support: derivation; source: lesson rule.
  2. With value $80 the expected profit is $32 at a $40 bid, $0 at $80, $30 at $50. support: derivation; source: node grid.
  3. With two bidders and values spread evenly, bidding half your value is the equilibrium of the first-price auction. support: citation; source: E&K ch. 9 (section unconfirmed); Vickrey (1961). Attribution: fact-checker confirms.
- curriculum: `{"primary":"economics:first-price-shading","also":["probability:expected-value"],"prerequisites":["probability:expected-value"],"level":"core","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":9,"section_unconfirmed":"9.5"}],"tags":["auctions","expected value"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: bid-what-its-worth (batch 1): bid your value when you pay the second price; here you pay your own bid, so you shade.

#### 10. no-best-move-one-stable-pair · concept: economics:nash-equilibrium · core · demand 3 · rank 22 · format: Single card (tap cells; best-response arrows)
- Sections: ch. 6.4 (unconfirmed) · domain: economics
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: dominant strategies (two-suspects-payoff) / does not know: that even when no move is best against everything, a pair of moves where each is a best reply to the other can still pin down the outcome.
- Misconception: Without a move that is best whatever the other does, game theory cannot predict anything.
- Prediction (stage text ≤ 25 words): "In this 3×3 game no move is best against every reply. Which cell is the only one where neither player wants to switch?" options: A. Middle-left (M, L) / B. Top-middle (U, C) / C. Bottom-right (D, R) (answer: A (M, L)).
- Check: Our own payoffs (row, col): U: (3,1) (0,3) (2,0); M: (4,2) (1,0) (0,1); D: (2,0) (2,1) (1,3). Node: `6.4 {"rowDominant":-1,"colDominant":-1,"pureNE":[["M","L"]]}`.
- Reveal (one line): At (M, L) the row player's 4 is the best in its column and the column player's 2 is the best in its row; every other cell has someone who gains by moving.
- Planned claims:
  1. In the stage's game neither player has a dominant strategy. support: derivation; source: node.
  2. (M, L) is the only cell where each player's move is a best reply to the other's. support: derivation; source: node enumeration of 9 cells.
  3. A pair of strategies that are best replies to each other is a Nash equilibrium. support: definition; source: E&K ch. 6 (section unconfirmed); Nash (1950), PNAS 36. Attribution: fact-checker confirms.
- curriculum: `{"primary":"economics:nash-equilibrium","also":[],"prerequisites":["economics:prisoners-dilemma"],"level":"core","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":6,"section_unconfirmed":"6.4"}],"tags":["game theory","Nash equilibrium"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: two-suspects-payoff (6.2–6.3) has a dominant strategy; this game has none.

#### 11. honest-bid-loses-in-gsp · concept: economics:gsp-auction · stretch · demand 2 · rank 23 · format: Single card (bid slider)
- Sections: ch. 15.5 (unconfirmed), 15.6 (unconfirmed) · domain: economics
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: VCG (pay-for-the-harm-you-do) / does not know: that the 'pay the next bid' rule real search engines used makes honest bidding not always best, and its equilibria can earn more or less than VCG.
- Misconception: Paying the next-highest bid per click is just a second-price auction, so bid honestly.
- Prediction (stage text ≤ 25 words): "Slots get 10 and 4 clicks; values per click $7, $6, $1. Each pays the next bid. X bids honestly ($7). Can X do better?" options: A. No / B. Yes, by bidding $5 / C. Yes, by bidding $8 (answer: B (profit 10 → 24)).
- Check: Node: `15.5 {"truthfulGSP":{"ord":["x","y","z"],"pay":{"x":60,"y":4},"xProfit":10},"xBids5":24,"vcgPay":{"x":40,"y":4,"z":0},"vcgRevenue":44,"gspEquilibria":88,"gspEqRevenueRange":[10.01,48.02],…}` (equilibria searched on a whole-dollar grid).
- Reveal (one line): Honest X pays $6 a click for slot 1 and keeps $10; bidding $5 drops X to slot 2 at $1 a click and keeps $24, so honesty is not best under GSP.
- Planned claims:
  1. With honest bids, X pays $60 for slot 1 and keeps 70 − 60 = 10; bidding $5 wins slot 2 for $4 and keeps 28 − 4 = 24. support: derivation; source: node.
  2. On a whole-dollar grid this game has many GSP equilibria, with seller revenue from about $10 to $48; VCG earns $44. support: derivation; source: node search.
  3. Generalized second price auctions are not truthful; their equilibria were analysed by Edelman, Ostrovsky and Schwarz and by Varian. support: citation; source: Edelman, Ostrovsky and Schwarz (2007), Am. Econ. Rev. 97(1); Varian (2007); E&K ch. 15. Attribution: fact-checker confirms.
- curriculum: `{"primary":"economics:gsp-auction","also":[],"prerequisites":["economics:vcg-mechanism"],"level":"stretch","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":15,"section_unconfirmed":"15.5–15.6"}],"tags":["auctions","advertising"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: pay-for-the-harm-you-do (VCG) is truthful; this one changes only the payment rule and loses that.

#### 12. two-thirds-of-the-average · concept: economics:iterated-dominance · core · demand 2 · rank 28 · format: Single card with Step (one round of reasoning per tap)
- Sections: ch. 6.10 (confirmed) · domain: economics
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: a dominated choice is never best / does not know: that if everyone is rational and knows it, deleting dominated choices round after round leaves only 0.
- Misconception: The rational guess is about 33 (two thirds of an average of 50).
- Prediction (stage text ≤ 25 words): "Everyone picks 0–100; closest to 2/3 of the average wins. All are rational and know it. What do they pick?" options: A. 33 / B. 22 / C. 0 (answer: C (0)).
- Check: Node: `6.10 {"upperBoundByRound":[100,66.667,44.444,29.63,19.753,13.169,8.779,5.853,3.902,2.601,1.734,1.156,0.771],"roundsBelow1":12}`.
- Reveal (one line): Above 66.7 can never win; once those go, above 44.4 can't; each round cuts a third, and after 12 rounds the bound is under 1, leaving 0.
- Planned claims:
  1. Guesses above 66.7 are dominated; after k rounds of deletion, guesses above 100·(2/3)^k are gone, under 1 after 12 rounds. support: derivation; source: node.
  2. The only guess that survives iterated deletion is 0. support: derivation; source: limit of the bound.
  3. In experiments people's first guesses average well above 0, often around 20–40. support: citation; source: Nagel (1995), Am. Econ. Rev. 85(5). **Needs a human source check (empirical); keep out of learner text until checked.**
- curriculum: `{"primary":"economics:iterated-dominance","also":[],"prerequisites":["economics:prisoners-dilemma"],"level":"core","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":6,"section":"6.10"}],"tags":["game theory","rationality"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: No lesson teaches iterated dominance; cs brief tic-tac-toe-is-a-draw is backward induction in a sequential game (the other half of this section).

#### 13. four-in-a-row-two-thirds · concept: economics:balanced-outcomes · stretch · demand 2 · rank 31 · format: Single card with step-run button (outside options update)
- Sections: ch. 12.7 (unconfirmed), 12.8 (unconfirmed) · domain: economics
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: the centre of a 3-path takes all; Nash bargaining / does not know: that in a 4-path the inner people get 2/3, not all and not half.
- Misconception: In a line of four, the two inner people have the same power as the centre of three, so take everything.
- Prediction (stage text ≤ 25 words): "A–B–C–D in a line; pairs A–B and C–D each split $1. Each pair splits fairly given outside options. What does B get?" options: A. $0.50 / B. About $0.67 / C. Nearly $1 (answer: B ($2/3)).
- Check: Balance: v_B = o_B + (1 − o_B)/2 with o_B = 1 − v_C (and symmetrically). Node: `12.8 {"path4":{"a":0.333,"b":0.667,"c":0.667,"d":0.333},"path3":{"centre":1,"endMatched":0}}`.
- Reveal (one line): B's fallback is a deal with C, but C is not desperate; each inner person's outside option feeds the other's, and the split settles at 2/3 to 1/3.
- Planned claims:
  1. In the 4-path, the balanced outcome gives B and C $2/3 each, A and D $1/3. support: derivation; source: node fixed-point iteration.
  2. An outcome is stable if no two people could both do better by dealing with each other; balanced if each pair splits its surplus over outside options equally. support: definition; source: E&K ch. 12 (sections unconfirmed); Cook and Yamagishi (1992). Attribution: fact-checker confirms.
  3. Laboratory results on 4-paths show a moderate advantage for the inner people, not total. support: citation; source: E&K ch. 12 summarising exchange experiments. **Needs a human source check (empirical); keep out of learner text until checked.**
- curriculum: `{"primary":"economics:balanced-outcomes","also":[],"prerequisites":["economics:nash-bargaining"],"level":"stretch","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":12,"section_unconfirmed":"12.7–12.8"}],"tags":["bargaining","networks","power"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: middle-of-three-takes-all gives all to the centre; this lesson shows that power depends on the whole network, not just the number of partners.

#### 14. outside-option-sets-the-split · concept: economics:nash-bargaining · core · demand 2 · rank 32 · format: Single card (outside-option slider drives split bar)
- Sections: ch. 12.5 (unconfirmed) · domain: economics
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: splitting $1 / does not know: that each side first gets its outside option and the rest is split equally.
- Misconception: A better outside option only matters if you actually walk away.
- Prediction (stage text ≤ 25 words): "A and B split $1. A could get $0.40 elsewhere; B gets nothing elsewhere. Under Nash bargaining, A gets?" options: A. $0.50 / B. $0.70 / C. $0.40 (answer: B ($0.70)).
- Check: Node: `12.5 {"A":0.7,"B":0.3}`: A = 0.4 + (1 − 0.4 − 0)/2.
- Reveal (one line): A is guaranteed $0.40; the remaining $0.60 is split evenly, so A gets $0.70, even though A never leaves.
- Planned claims:
  1. With outside options 0.4 and 0, the Nash bargaining split of $1 is $0.70 and $0.30. support: derivation; source: node.
  2. The Nash bargaining solution gives each its outside option plus half the remaining surplus. support: citation; source: Nash (1950), Econometrica 18; E&K ch. 12 (section unconfirmed). Attribution: fact-checker confirms.
- curriculum: `{"primary":"economics:nash-bargaining","also":[],"prerequisites":["economics:opportunity-cost"],"level":"core","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":12,"section_unconfirmed":"12.5"}],"tags":["bargaining"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: No lesson teaches bargaining. It is the building block of four-in-a-row-two-thirds.

#### 15. lowball-offer-should-pass · concept: economics:ultimatum-game · intro · demand 3 · rank 33 · format: Single card (offer slider)
- Sections: ch. 12.6 (unconfirmed) · domain: economics
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: take-it-or-leave-it offers / does not know: that a money-only responder should accept any positive offer, and that real people often don't.
- Misconception: A rational responder rejects an insulting offer.
- Prediction (stage text ≤ 25 words): "You're offered part of $10, in whole dollars. Reject, and both get $0. If you care only about money, what's the smallest you accept?" options: A. $1 / B. $3 / C. $5 (answer: A ($1)).
- Check: Node: `12.6 {"smallestAcceptedPositive":1,"proposerKeeps":9}`.
- Reveal (one line): Rejecting $1 leaves you $0, so a money-only responder takes it, and a proposer who knows it offers $1; people often reject low offers.
- Planned claims:
  1. A responder who cares only about money prefers $1 to $0, so accepts any positive offer. support: derivation; source: rule.
  2. Against such a responder the proposer's best offer is the smallest unit, $1 of $10. support: derivation; source: backward induction.
  3. In experiments, most offers are 40–50% and offers below about 20% are often rejected. support: citation; source: Güth, Schmittberger and Schwarze (1982), J. Econ. Behav. Org. 3; Camerer, Behavioral Game Theory (2003). **Needs a human source check (empirical); keep out of learner text until checked.**
- curriculum: `{"primary":"economics:ultimatum-game","also":[],"prerequisites":["economics:prisoners-dilemma"],"level":"intro","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":12,"section_unconfirmed":"12.6"}],"tags":["bargaining","fairness","game theory"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: two-suspects-payoff is simultaneous; this is a two-step game. economics/sunk-cost is a different bias.

#### 16. same-revenue-any-rule · concept: economics:revenue-equivalence · stretch · demand 2 · rank 34 · format: Simulation run (rule chips)
- Sections: ch. 9.7 (unconfirmed) · domain: economics
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: first-price shading and second-price truth-telling / does not know: that with equilibrium bidding, first-price, second-price and even all-pay auctions earn the seller the same on average.
- Misconception: Making winners pay their own bid must earn the seller more than charging the second-highest bid.
- Prediction (stage text ≤ 25 words): "Two bidders, values random $0–100, each bidding optimally. Which rule earns the seller most on average?" options: A. First-price / B. Second-price / C. About the same (answer: C (about $33.3 each)).
- Check: Node, 20,000 seeded auctions (seed 97): `9.7 {"secondPrice":33.395,"firstPriceBidHalf":33.303,"allPayBidV2over200":33.302,"theory":33.333}`. Equilibrium bids: first-price v/2; all-pay v²/200.
- Reveal (one line): Higher bids paid less often (second-price) and lower bids paid always (first-price, all-pay) balance out: each averages $33.3.
- Planned claims:
  1. In 20,000 simulated auctions the seller averages $33.40 (second-price), $33.30 (first-price) and $33.30 (all-pay). support: simulation; source: node, seed 97.
  2. Theory gives $100/3 for all three with two bidders and values uniform on $0–100. support: derivation; source: E[min of two uniforms] = 1/3.
  3. Revenue equivalence holds for standard auctions with independent private values. support: citation (theorem); source: Myerson (1981), Math. Oper. Res. 6; Riley and Samuelson (1981); E&K ch. 9 advanced section. Attribution: fact-checker confirms.
- curriculum: `{"primary":"economics:revenue-equivalence","also":["probability:expected-value"],"prerequisites":["economics:first-price-shading"],"level":"stretch","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":9,"section_unconfirmed":"9.7"}],"tags":["auctions","simulation"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: Builds on bid-what-its-worth and shade-your-sealed-bid; no lesson compares seller revenue.

#### 17. the-bar-nobody-can-forecast · concept: economics:el-farol-minority · core · demand 2 · rank 36 · format: Simulation run (forecast chips; mixed-strategy run)
- Sections: ch. 17.7 (unconfirmed) · domain: economics
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: network effects make things more valuable as more join (batch 1) / does not know: that with a crowding cost, any forecast everyone believes makes itself wrong.
- Misconception: If everyone uses the same good forecast, the bar will be pleasantly busy.
- Prediction (stage text ≤ 25 words): "100 people go to a bar only if they expect 60 or fewer. All trust one forecast: 50 will come. How many come?" options: A. About 50 / B. About 60 / C. All 100 (answer: C (100)).
- Check: Node: `17.7 {"sameForecastBelow60":100,"sameForecastAbove60":0,"mixedMean":60,"mixedPOver60":0.462}`. If each goes with chance 60%, the mean is 60 but the bar is over 60 on 46% of nights.
- Reveal (one line): A forecast below 60 sends everyone, one above 60 sends no one; only randomising (each goes 60% of the time) averages 60, and the bar is still crowded nearly half the time.
- Planned claims:
  1. If all 100 act on the same forecast, attendance is 100 when it says ≤ 60 and 0 when it says more. support: derivation; source: rule.
  2. If each goes independently with probability 0.6, average attendance is 60 and attendance exceeds 60 on 46.2% of nights. support: derivation; source: node binomial sum.
  3. The El Farol bar problem is due to Arthur (1994). support: citation; source: W. B. Arthur, Am. Econ. Rev. 84(2) (1994); E&K ch. 17 advanced section. Attribution: fact-checker confirms.
- curriculum: `{"primary":"economics:el-farol-minority","also":["probability:expected-value"],"prerequisites":["economics:supply-demand"],"level":"core","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":17,"section_unconfirmed":"17.7"}],"tags":["externalities","forecasting","game theory"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: below-critical-mass (batch 1) has positive network effects (more is better); here more is worse. ai/feedback-loops is about model feedback, not crowds.

#### 18. someone-has-to-swerve · concept: economics:hawk-dove-chicken · intro · demand 2 · rank 41 · format: Single card
- Sections: ch. 6.6 (unconfirmed) · domain: economics
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: Nash equilibrium as 'no one wants to switch' / does not know: that in chicken the stable outcomes are the two where players act differently.
- Misconception: Identical players in an identical game must end up doing the same thing.
- Prediction (stage text ≤ 25 words): "Two drivers: both straight crash (−10 each); swerve vs straight gives 0 and 3; both swerve give 1 each. Which outcomes are stable?" options: A. Both swerve / B. Both straight / C. One of each (answer: C (straight/swerve and swerve/straight)).
- Check: Node: `6.6 {"pureNE":["SW","WS"]}`.
- Reveal (one line): If both swerve, either gains by going straight; if both go straight, either gains by swerving; only 'one of each' is stable, so identical players split roles.
- Planned claims:
  1. With these payoffs the only pure Nash equilibria are (straight, swerve) and (swerve, straight). support: derivation; source: node.
  2. The payoffs are invented for the lesson. support: derivation; source: lesson rule.
- curriculum: `{"primary":"economics:hawk-dove-chicken","also":[],"prerequisites":["economics:prisoners-dilemma"],"level":"intro","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":6,"section_unconfirmed":"6.6"}],"tags":["game theory","chicken"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: stag-needs-three-in-four (coordination) has stable outcomes where players match; here they must differ. hawks-never-take-over turns this game into an evolving population.

#### 19. only-the-needed-trader-profits · concept: economics:essential-trader-profit · stretch · demand 1 · rank 43 · format: Single card (remove-trader taps)
- Sections: ch. 11.6 (unconfirmed) · domain: economics
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: competing traders earn nothing (second-trader-pays-the-seller) / does not know: that a trader earns exactly when removing it would lose a trade.
- Misconception: The trader with the most connections earns the most.
- Prediction (stage text ≤ 25 words): "T1 and T2 both link seller 1 to buyer 1. T3 alone links seller 2 to buyer 2. Which trader earns a profit?" options: A. T1 and T2 / B. T3 / C. All three (answer: B (T3)).
- Check: Node: `11.6 {"T1":{"welfareLossIfRemoved":0},"T2":{"welfareLossIfRemoved":0},"T3":{"welfareLossIfRemoved":1}}`.
- Reveal (one line): Remove T1 and T2 still makes the trade, so T1 earns nothing (and vice versa); remove T3 and a trade is lost, so T3 can charge for it.
- Planned claims:
  1. Removing T1 or T2 loses no trade; removing T3 loses one. support: derivation; source: node.
  2. In equilibrium a trader earns a positive profit only if it is essential to the social optimum. support: citation (theorem); source: Blume, Easley, Kleinberg and Tardos (2009); E&K ch. 11 (section unconfirmed). Attribution: fact-checker confirms.
- curriculum: `{"primary":"economics:essential-trader-profit","also":[],"prerequisites":["economics:trader-competition"],"level":"stretch","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":11,"section_unconfirmed":"11.6"}],"tags":["markets","intermediaries"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: Builds on second-trader-pays-the-seller; that shows competition on one side, this shows the general rule.

#### 20. accurate-bettor-takes-the-pot · concept: economics:market-selection-wealth · stretch · demand 1 · rank 44 · format: Simulation run (seeded races)
- Sections: ch. 22.10 (unconfirmed) · domain: economics
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: odds are wealth-weighted beliefs (odds-average-the-bettors) / does not know: that repeated betting shifts wealth toward the more accurate bettor, so prices drift toward the truth, though luck can lead for a long time.
- Misconception: Two bettors with similar beliefs will keep similar wealth.
- Prediction (stage text ≤ 25 words): "A horse truly wins 60% of races. One bettor believes 60%, another 50%; equal money. After 500 races, who holds most of it?" options: A. About equal / B. The 60% bettor / C. The 50% bettor (answer: B (98.8–100% in 5 of 5 seeds)).
- Check: Log-utility pari-mutuel bettors, 500 races, seeds 2211–2215. Node: `22.10 {"seeds":[{"50":0.732,"100":0.882,"200":0.982,"500":1},{"50":0.265,"100":0.397,"200":0.114,"500":0.988},…]}`. In one seed the less accurate bettor led at race 200 (88.6%).
- Reveal (one line): Each race moves wealth by how much better your belief fit the outcome; over hundreds of races the accurate bettor wins, though luck led the other way for 200 races in one run.
- Planned claims:
  1. In 5 seeded runs of 500 races, the accurate bettor ended with 98.8% to 100% of the wealth. support: simulation; source: node, seeds 2211–2215.
  2. In one run the less accurate bettor held 88.6% after 200 races. support: simulation; source: node seed 2212.
  3. In such markets, wealth flows to traders whose beliefs are closest to the truth. support: citation; source: Blume and Easley (2006), Econometrica 74(4); E&K ch. 22 advanced section. Attribution: fact-checker confirms.
- curriculum: `{"primary":"economics:market-selection-wealth","also":["probability:multiplicative-bets"],"prerequisites":["probability:multiplicative-bets"],"level":"stretch","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":22,"section_unconfirmed":"22.10"}],"tags":["markets","selection","simulation"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: probability/bet-too-much-and-go-broke is one bettor vs a fixed game; here two bettors face each other through prices.

#### 21. lower-bid-takes-the-top-ad · concept: economics:ad-quality-ranking · intro · demand 2 · rank 45 · format: Single card
- Sections: ch. 15.7 (unconfirmed) · domain: economics
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: ads are sold by auction / does not know: that search ads are ranked by bid times a quality score, so a lower bid can win the top slot and pay less.
- Misconception: The highest bidder always gets the top ad slot.
- Prediction (stage text ≤ 25 words): "A bids $2.00 per click, quality 0.5. B bids $1.50, quality 1.0. Ranked by bid × quality, who gets the top slot?" options: A. A / B. B / C. Tie (answer: B (score 1.5 vs 1.0)).
- Check: Node: `15.7 {"scoreA":1,"scoreB":1.5,"top":"B","Bpays_perClick_toKeepScoreAboveA":1}`.
- Reveal (one line): B's score 1.5 beats A's 1.0, and B pays only what keeps it ahead, $1.00 a click, less than A bid.
- Planned claims:
  1. With the stage's numbers B scores 1.5 and A scores 1.0, so B takes the top slot. support: derivation; source: node.
  2. Under this rule B pays the smallest bid that keeps its score above A's: $1.00 per click. support: derivation; source: node.
  3. Search engines rank ads using a quality factor as well as the bid; the exact formulas are not public. support: citation; source: E&K ch. 15 (section unconfirmed). **Needs a human source check (empirical); keep out of learner text until checked.**
- curriculum: `{"primary":"economics:ad-quality-ranking","also":[],"prerequisites":["economics:supply-demand"],"level":"intro","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":15,"section_unconfirmed":"15.7"}],"tags":["auctions","advertising"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: Other auction lessons rank by bid alone. Simple intro; can be built any time.

#### 22. harm-prices-clear-the-market · concept: economics:vcg-market-clearing · stretch · demand 1 · rank 46 · format: Single card
- Sections: ch. 15.9 (unconfirmed) · domain: economics
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: prices-sort-the-buyers (batch 1) and VCG / does not know: that charging each buyer the harm they cause gives exactly the market-clearing prices found by raising prices.
- Misconception: Prices from a fairness rule (pay the harm) and prices from supply and demand are unrelated.
- Prediction (stage text ≤ 25 words): "Same three buyers and items as before (clearing prices 3, 1, 0). Charge each the harm they cause the others. Prices?" options: A. 3, 1, 0 / B. 12, 7, 5 / C. 0, 0, 0 (answer: A (3, 1, 0)).
- Check: Valuations x 12/4/2, y 8/7/6, z 7/5/2 (batch-1 example). Node: `15.9 {"optimal":{"v":23,"asg":{"x":"a","y":"c","z":"b"}},"vcgPricesByItem":{"a":3,"c":0,"b":1}}`.
- Reveal (one line): x's presence costs the others 14 − 11 = 3, z's costs 1, y's costs 0: the same prices the ascending procedure found.
- Planned claims:
  1. In the example, VCG prices are a: 3, b: 1, c: 0. support: derivation; source: node enumeration of assignments.
  2. These equal the market-clearing prices found by the ascending procedure in prices-sort-the-buyers. support: derivation; source: batch-1 brief, economics.markets.md.
  3. VCG prices are always market-clearing (and the smallest such prices). support: citation (theorem); source: E&K ch. 15 advanced section (number unconfirmed; result discussed by Kern, Manthey and Uetz, arXiv 1604.04157); Leonard (1983). Attribution: fact-checker confirms.
- curriculum: `{"primary":"economics:vcg-market-clearing","also":[],"prerequisites":["economics:vcg-mechanism"],"level":"stretch","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":15,"section_unconfirmed":"15.9"}],"tags":["matching markets","VCG"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: Joins two lessons (prices-sort-the-buyers, pay-for-the-harm-you-do); build after both.

#### 23. patience-wins-the-split · concept: economics:alternating-offers · stretch · demand 1 · rank 47 · format: Single card (shrink slider; backward-induction steps)
- Sections: ch. 12.9 (unconfirmed) · domain: economics
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: backward induction / does not know: that when each delay shrinks the pie, the first proposer gets 1/(1 + δ), a small edge when delays are cheap.
- Misconception: Whoever makes the first offer can grab most of the pie.
- Prediction (stage text ≤ 25 words): "Two people alternate offers on $1; each rejected round shrinks it 10%. With no end date, what does the first proposer get?" options: A. About 90% / B. About 53% / C. Exactly 50% (answer: B (52.6%)).
- Check: Node: `12.9 {"d09":0.526,"d05":0.667,"d09_T50":0.524,"d09_T51":0.529,"d09_T400":0.526}`. Long finite games converge to the same share.
- Reveal (one line): The responder can wait and propose next round, worth 90% of what the proposer gets, so the proposer keeps 1/1.9 = 52.6%; at 50% shrink it is 2/3.
- Planned claims:
  1. With 10% shrink per round, the first proposer's equilibrium share is 1/(1 + 0.9) = 52.6%; with 50% shrink it is 66.7%. support: derivation; source: node.
  2. Backward induction over 400 rounds gives the same 52.6%. support: derivation; source: node.
  3. This is Rubinstein's alternating-offers model. support: citation; source: Rubinstein (1982), Econometrica 50(1); E&K ch. 12 advanced section. Attribution: fact-checker confirms.
- curriculum: `{"primary":"economics:alternating-offers","also":[],"prerequisites":["economics:present-value"],"level":"stretch","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":12,"section_unconfirmed":"12.9"}],"tags":["bargaining","backward induction"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: outside-option-sets-the-split assumes a fair split; this lesson derives a split from timing.

### life.genetics-evolution

Owner to re-check: `cm-life-genetics-evolution` · 4 briefs

#### 1. hawks-never-take-over · concept: life:hawk-dove-ess · core · demand 3 · rank 1 · format: Single card (start-share slider drives live chart)
- Sections: ch. 7.5 (unconfirmed) · domain: life
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: aggressive and peaceful strategies; fitness from meetings / does not know: that the population settles where hawks and doves score equally, a hawk share of V/C (here 2/3), from any start.
- Misconception: Aggression always wins in evolution, so hawks take over.
- Prediction (stage text ≤ 25 words): "Hawks fight (win 4, injury costs 6); doves share. Start with 10% hawks, or 90%. Where does the hawk share settle?" options: A. 100% / B. About 67% from either start / C. It depends on the start (answer: B (66.7%)).
- Check: Payoffs: HH −1, HD 4, DH 0, DD 2 (V = 4, C = 6; baseline fitness 10). Node: `7.5 {"payoffs":{"HH":-1,"HD":4,"DH":0,"DD":2},"essHawkShare":0.667,"from10pct":0.667,"from90pct":0.667,"baselineFitness":10}`.
- Reveal (one line): Hawks do well among doves and badly among hawks, so the share settles where both score the same: 4/6 = 2/3 hawks, from either start.
- Planned claims:
  1. With V = 4 and C = 6, hawks and doves score equally when 2/3 of the population are hawks. support: derivation; source: node.
  2. In the stage's update rule the hawk share reaches 66.7% from both 10% and 90% starts. support: simulation; source: node replicator, 400 generations.
  3. When the cost of fighting exceeds the prize, the evolutionarily stable hawk share is V/C. support: citation; source: Maynard Smith (1982), Evolution and the Theory of Games; E&K ch. 7 (section unconfirmed). Attribution: fact-checker confirms.
- curriculum: `{"primary":"life:hawk-dove-ess","also":["economics:hawk-dove-chicken"],"prerequisites":["life:evolution-of-cooperation"],"level":"core","strand":"genetics-evolution","references":[{"work":"easley-kleinberg-2010","chapter":7,"section_unconfirmed":"7.5"}],"tags":["evolution","game theory","ESS"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: life/strategy-builder is repeated PD with invasion thresholds; this one-shot game converges to an interior mix. someone-has-to-swerve is the same game between two players. Slug from the vertical doc.

#### 2. bigger-beetles-everyone-loses · concept: life:ess-arms-race · core · demand 2 · rank 26 · format: Single card (generation step, share chart)
- Sections: ch. 7.2 (unconfirmed) · domain: life
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: fitness depends on whom you meet (strategy-builder) / does not know: that a strategy can invade and become stable even though everyone ends up with less.
- Misconception: Evolution makes a population better off on average.
- Prediction (stage text ≤ 25 words): "Small beetles score 6 against small, 2 against large. Large score 8 against small, 4 against large. A few large appear. Outcome?" options: A. Large die out / B. Large take over; everyone scores 4 / C. A stable mix (answer: B).
- Check: Our own payoffs (not the book's). Replicator steps from 1% large. Node: `7.2 {"largeAlwaysAhead":true,"gensTo99":24,"traj":{"5":0.041,"10":0.163,"20":0.931},"avgPayoffAllSmall":6,"avgPayoffAllLarge":4}`.
- Reveal (one line): Large beats small against any opponent, so it spreads (99% by generation 24) and resists invasion, yet the all-large population scores 4 where all-small scored 6.
- Planned claims:
  1. With these payoffs, large scores more than small whatever the mix (8 > 6 and 4 > 2). support: derivation; source: node.
  2. From 1% large, large reaches 99% in 24 generations of the stage's update rule. support: simulation; source: node replicator steps.
  3. An evolutionarily stable strategy is one that, once common, cannot be invaded by a small group using another strategy. support: definition; source: E&K ch. 7 (section unconfirmed); Maynard Smith and Price (1973), Nature 246. Attribution: fact-checker confirms.
- curriculum: `{"primary":"life:ess-arms-race","also":["economics:prisoners-dilemma"],"prerequisites":["life:evolution-of-cooperation"],"level":"core","strand":"genetics-evolution","references":[{"work":"easley-kleinberg-2010","chapter":7,"section_unconfirmed":"7.2"}],"tags":["evolution","game theory","ESS"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: life/strategy-builder is a repeated game where cooperation can win; this one-shot game shows ESS producing a worse outcome, an arms race.

#### 3. all-lines-meet-in-one-mother · concept: life:coalescent-mrca · core · demand 2 · rank 30 · format: Storyboard / scrub (lineages traced back) · **needs spec**
- Sections: ch. 21.7 (unconfirmed) · domain: life
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: everyone has one mother; random drift (same-genes-different-drift) / does not know: that tracing mothers back, all lines must merge into one woman, after about 2N generations, and she had many contemporaries.
- Misconception: A single common maternal ancestor means there was once only one woman.
- Prediction (stage text ≤ 25 words): "50 women; each woman's mother is a random woman of the previous generation. Trace all 50 lines back. What happens?" options: A. They never all meet / B. All meet in one woman / C. They meet in about half the starting women (answer: B (mean 96 generations; theory 98)).
- Check: Haploid Wright–Fisher, N = 50, 1,000 seeds. Node: `21.7 {"N":50,"meanGens":96.033,"median":84,"theory_2N_1minus1overN":98,"allCoalesced":true}`.
- Reveal (one line): Lines merge whenever two women share a mother, and once merged they never split, so all 50 meet in one woman, about 96 generations back, who lived among 49 others.
- Planned claims:
  1. In 1,000 seeded runs with 50 women, all maternal lines met in one ancestor, on average 96 generations back (median 84). support: simulation; source: node, seeds 7001–8000.
  2. Theory for this model gives an expected 2N(1 − 1/N) = 98 generations. support: derivation; source: expected coalescence time Σ_{k=2..N} N/C(k,2) = 2N(1 − 1/N) for haploid Wright–Fisher.
  3. 'Mitochondrial Eve' is the most recent common maternal ancestor of living humans; she was not the only woman alive. support: citation; source: Cann, Stoneking and Wilson (1987), Nature 325; E&K ch. 21 (Toronto slides cite §21.7, unconfirmed). Attribution: fact-checker confirms.
- curriculum: `{"primary":"life:coalescent-mrca","also":["life:genetic-drift"],"prerequisites":["life:genetic-drift"],"level":"core","strand":"genetics-evolution","references":[{"work":"easley-kleinberg-2010","chapter":21,"section_unconfirmed":"21.7"}],"tags":["genealogy","coalescent","drift"]}`
- Needs interaction-designer spec: yes.
- Differs from nearest: life/same-genes-different-drift runs drift forward until one colour wins; this one traces lines backward to a common ancestor. Same model, opposite question; cite it in the reveal path.

#### 4. stable-until-mutants-meet · concept: life:nash-not-ess · stretch · demand 1 · rank 50 · format: Single card (generation step, share chart)
- Sections: ch. 7.4 (unconfirmed) · domain: life
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: ESS and Nash equilibrium / does not know: that if mutants tie with residents but beat each other, they creep in and then take over.
- Misconception: If no single individual gains by switching, no mutant can ever spread.
- Prediction (stage text ≤ 25 words): "Everyone plays A. Mutant B ties with A against A (2 each), but B scores 3 against B, where A scores 1. Do B's spread?" options: A. No / B. Yes, slowly, then fast / C. They stay at 1% (answer: B (1% → 2% by generation 50, 21% by 100, 99% by 111)).
- Check: Node: `7.4 {"AAisNash":true,"AAisESS":false,"gensTo99":111,"traj":{"10":0.011,"50":0.02,"100":0.21}}`.
- Reveal (one line): A-against-A is a Nash equilibrium, since nobody gains alone, but it is not stable: B ties against A and wins when B's meet, so B's slowly accumulate and then sweep.
- Planned claims:
  1. (A, A) is a Nash equilibrium: B earns 2 against A, the same as A. support: derivation; source: node.
  2. It is not an ESS, because B does better against B (3) than A does against B (1). support: derivation; source: ESS conditions.
  3. In the stage's update rule B rises from 1% to 2% by generation 50, 21% by 100 and 99% by 111. support: simulation; source: node replicator steps.
- curriculum: `{"primary":"life:nash-not-ess","also":["economics:nash-equilibrium"],"prerequisites":["life:ess-arms-race"],"level":"stretch","strand":"genetics-evolution","references":[{"work":"easley-kleinberg-2010","chapter":7,"section_unconfirmed":"7.4"}],"tags":["evolution","ESS","Nash"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: bigger-beetles-everyone-loses shows an ESS; this one shows an equilibrium that fails the ESS test.

### life.health-epidemiology

Owner to re-check: `cm-life-health-epidemiology` · 1 brief

#### 1. outbreak-can-fizzle-above-one · concept: life:branching-extinction · core · demand 3 · rank 17 · format: Simulation run (seeded outbreaks, R chips)
- Sections: ch. 21.8 (unconfirmed) · domain: life
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: R above 1 means growth on average (immunity-eats-r) / does not know: that with R = 1.5 (Poisson spread), about 42% of single introductions die out by chance.
- Misconception: If R is above 1, every introduced case starts an epidemic.
- Prediction (stage text ≤ 25 words): "Each case infects a random number of others, 1.5 on average. One case arrives. How often does the chain die out by itself?" options: A. Never / B. About 4 in 10 / C. About 9 in 10 (answer: B (41.7%)).
- Check: Poisson offspring. Node: `21.8 {"R1_5":0.417,"R2":0.203,"R3":0.06,"R0_9":1,"sim_R1_5_diedOut":0.429}` (10,000 seeded chains, seed 218; chains past 2,000 cases counted as taking off).
- Reveal (one line): The first case often infects 0 or 1 by luck (56% of the time), so 42% of chains fizzle; R above 1 means growth is possible, not certain.
- Planned claims:
  1. With Poisson spread and mean 1.5, the chance that one case's chain dies out is 41.7% (solution of q = e^{1.5(q − 1)}). support: derivation; source: node fixed point.
  2. The chance is 20.3% for R = 2 and 6.0% for R = 3; for R below 1 every chain dies out. support: derivation; source: node.
  3. In 10,000 simulated chains with R = 1.5, 42.9% died out. support: simulation; source: node seed 218.
- curriculum: `{"primary":"life:branching-extinction","also":["probability:at-least-once"],"prerequisites":["life:reproduction-number-growth"],"level":"core","strand":"health-epidemiology","references":[{"work":"easley-kleinberg-2010","chapter":21,"section_unconfirmed":"21.8"}],"tags":["epidemics","branching process"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: life/spreaders-are-rare counts cases that infect no one (dispersion); immunity-eats-r is the average R. This one asks for the whole chain's survival chance. Name the Poisson assumption on the card.

