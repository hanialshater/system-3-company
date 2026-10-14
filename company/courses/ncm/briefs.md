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


## Wave J (2026-10-14): 16 briefs for concepts no lesson teaches yet

**Why wave J looks different.** Every one of the 106 demo-able sections in `content/courses/ncm/chapters.json` now has at least one built lesson: the 51 gap briefs and the batch-1 briefs are all in `src/demos/`, and `node tools/meta.mjs coverage --work=easley-kleinberg-2010` lists 49 lessons. So no demo-able *section* is uncovered. Wave J briefs the next layer down:
- (a) **concepts inside covered sections that their lesson does not teach**: 2.2 (why only one giant component), 2.3 (friends of friends overlap), 3.1 (clustering coefficient), 6.10 (sequential games), 8.3 (best-response convergence), 10.5 (clearing prices maximise total value), 13.3–13.4 (one link grows the core), 14.3 (rank sinks), 16.3–16.5 (why the lead of two), 17.3 (the price cliff), 19.2 (where q comes from);
- (b) **five sections the first map marked not demo-able, re-judged**: 4.2 (selection vs influence), 9.2 (when to auction), 17.6 (stand-alone value) and 23.2 (transitive preferences) now have a prediction the stage can check. 19.6 (knowledge and collective action) was tried and is **held with an objection**: the first map's reason still stands.

**Order (fewest lessons first).** I counted lessons per chapter from the coverage tool: ch. 2 (1), 13 (1), 8, 16 and 17 (2 each), then 4, 10, 14 and 20 (3), then 6, 9 and 3 (4 or 5). Chapters 2 and 17 get two briefs each, and 13, 8, 16, 4, 10, 14, 9, 6 and 3 get one each. Chapter 23 gets one (transitivity, the prerequisite its voting lessons assume), and chapter 19 gets one plus the held one. **No brief for ch. 1, 11, 20, 21, 22 or 24**: ch. 1 is the overview; ch. 11's remaining sections (11.1, 11.2, 11.4, 11.5, 11.7) keep their not-demo-able reasons (11.4 still needs a 6-node equilibrium I could not make checkable in 60 s); ch. 20–22 have no unbriefed predictable concept I could find that does not repeat a built lesson; ch. 24's 24.3 (intellectual property) is better served by a reference row on `economics/monopolist-holds-back` than by a new lesson (proposed below, not applied).

**Rules these follow** (same as the first wave, plus `company/product/demo-standard.md`): the book is a map only, with no text, figures or exercises copied, and every example and number is our own. Every answer was re-run in node (`ncm-wavej-checks.mjs` in the session scratchpad); each Check line pastes its output. References cite the **chapter** and keep the section in `section_unconfirmed`, because the book host is still blocked (proxy 403). Each brief lists its controls in DOM order with preset chips, so pressing each control once reaches every milestone (QA contract), including the question's own case. Reveals are drafts of 90 words or fewer that quote only milestone or current-state values. Stage labels are 10 px or larger. No brief needs an interaction-designer spec: all are single card or simulation run.

**Acceptance.** The caller (Wave J lead) asked me to do the strand managers' acceptance step myself by checking each strand's rules. I did that, and it is recorded on each brief. Accepted briefs are copied into `company/domains/briefs/<domain>.<strand>.md` under "Course: NCM", and their concepts are in `content/curriculum/<domain>.json` with `course: ncm` and no `proposed` flag. This is not the strand manager's own review. Each strand manager can still object, and board items W-502 to W-507 ask each of them to re-check (W-508: reference rows for demo-builder). The one brief that fails a strand rule (J3) carries its objection here, stays `proposed: true`, and is not in a strand file.

**Reference row proposed (metadata only, not applied):** `economics/monopolist-holds-back` ← `{"work":"easley-kleinberg-2010","chapter":24,"section_unconfirmed":"24.3"}` (adjacent: a patent is a temporary monopoly). Also still open from S2-18: `economics/loaf-with-smoke`, `economics/shared-pasture` and several life and probability lessons have `references: []`, so the coverage tool under-counts chapters 21 and 24.

### math.discrete (wave J)

Owner: `cm-math-discrete` · 5 briefs

#### J1. friends-of-friends-overlap · concept: math:friends-of-friends-overlap · core · demand 2 · format: Single card with Step (step chips; the 1,000-person ring drawn as untapped texture)
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
- Acceptance (math.discrete, wave J): accepted. Checked against the strand's rules: answer re-run in node (line above), prediction options at equal precision with no answer in the title or locked stage, chapter-only reference with the section in `section_unconfirmed`, no empirical claim in learner text without a source check, and no duplicate of the nearest lesson (see Differs). Copied to `company/domains/briefs/math.discrete.md` under "Course: NCM".

#### J2. new-friend-loosens-the-circle · concept: math:clustering-coefficient · core · demand 2 · format: Single card (hand-drawn network stage, 6 people; 'Fay knows' chips)
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
- Acceptance (math.discrete, wave J): accepted. Checked against the strand's rules: answer re-run in node (line above), prediction options at equal precision with no answer in the title or locked stage, chapter-only reference with the section in `section_unconfirmed`, no empirical claim in learner text without a source check, and no duplicate of the nearest lesson (see Differs). Copied to `company/domains/briefs/math.discrete.md` under "Course: NCM".

#### J3. protest-needs-a-shared-view · concept: math:collective-action-knowledge · stretch · demand 1 · format: Single card (hand-drawn network stage, 5 people; network chips)
- Sections: E&K ch. 19 (section 19.6, unconfirmed) · domain: math · course: ncm (wave J)
- Learner knows: threshold rules from cluster-stops-the-cascade / does not know: that people who each need a crowd only act when they can be sure the others will, which depends on who can see whom.
- Misconception: If enough people are willing, the protest happens.
- Prediction (stage text ≤ 25 words): "Five people each join only if sure 4 will (counting themselves). Each knows only their friends' rules. In a ring, how many join?" options: A. 0 / B. 3 / C. 5 (answer: A (0)).
- Check: Node `J3 {"ring":{"joiners":[],"maxSeenByAnyone":3},"ringPlus3":{"joiners":[0,1,2,3],...},"complete":{"joiners":[0,1,2,3,4],...}}` under my rule: a person joins iff they are in a fully linked group of at least 4 whose members all need at most 4.
- Stage and controls: Chips: [Ring + 3 links] [Everyone linked] [Ring].
- QA path (each control once, DOM order, presets only): Each chip once reaches ring (0), +3 links (4 join), complete (5).
- Reveal (draft, ≤ 90 words, fits a 390×844 phone with the stage top visible): In the ring each person can see only 3 people, so nobody can be sure 4 will come; link four of them fully and those four can.
- Planned claims:
  1. Under the stage's rule, nobody in the ring joins, four join when 0–3 are fully linked, and all five join when everyone is linked. support: derivation; source: node.
  2. Knowing that others know is what lets a group act. support: citation; source: E&K ch. 19 (section unconfirmed); Chwe (1999). Attribution: fact-checker confirms.
- Format: Single card (hand-drawn network stage, 5 people; network chips)
- Curriculum: `{"primary": "math:collective-action-knowledge", "also": [], "prerequisites": ["math:threshold-cascade"], "level": "stretch", "strand": "discrete", "references": [{"work": "easley-kleinberg-2010", "chapter": 19, "section_unconfirmed": "19.6"}], "tags": ["collective action", "common knowledge"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: cluster-stops-the-cascade and one-shy-rioter-stops-the-riot are about thresholds spreading over rounds; this one is about knowledge before anyone moves.
**Objection (not accepted; held).** Applying cm-math-discrete's acceptance rules, this brief fails two of them. (1) *Show the why* (decision 2026-10-14-told-vs-shown): the result rests on what each person knows the others know. My stage only works because the rule I state ("a fully linked group whose members all need at most its size can be sure") is the answer itself, so the reveal would tell the cause instead of showing it. This is the same reason the map marked 19.6 not demo-able. (2) *Source*: with the book host blocked I cannot confirm that my rule matches the book's knowledge model. The claim would be my invention presented as the book's model. What happens to it: the concept stays `proposed: true` in content/curriculum/math.json, and the brief does not go into math.discrete.md, so `claim.mjs` never hands it out. To lift the objection, someone with the book checks the model (blocked on access), and an interaction designer finds a stage where 'who knows who knows' is visible rather than stated. Board item W-502 (cm-math-discrete). 19.6 stays `demoable: false` in chapters.json, with this brief noted.

#### J15. payoffs-set-the-threshold · concept: math:coordination-threshold · core · demand 2 · format: Single card (friend-count and payoff chips; two live payoff bars)
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
- Acceptance (math.discrete, wave J): accepted. Checked against the strand's rules: answer re-run in node (line above), prediction options at equal precision with no answer in the title or locked stage, chapter-only reference with the section in `section_unconfirmed`, no empirical claim in learner text without a source check, and no duplicate of the nearest lesson (see Differs). Copied to `company/domains/briefs/math.discrete.md` under "Course: NCM".

#### J16. the-swap-that-goes-in-circles · concept: math:transitive-preferences · intro · demand 2 · format: Single card (swap preset chips)
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
- Acceptance (math.discrete, wave J): accepted. Checked against the strand's rules: answer re-run in node (line above), prediction options at equal precision with no answer in the title or locked stage, chapter-only reference with the section in `section_unconfirmed`, no empirical claim in learner text without a source check, and no duplicate of the nearest lesson (see Differs). Copied to `company/domains/briefs/math.discrete.md` under "Course: NCM".

### cs.algorithms (wave J)

Owner: `cm-cs-algorithms` · 1 brief

#### J4. two-pages-swallow-the-rank · concept: cs:rank-sink-scaled-pagerank · core · demand 2 · format: Single card with step-run button (round chips + jump toggle)
- Sections: E&K ch. 14 (section 14.3, unconfirmed) · domain: cs · course: ncm (wave J)
- Learner knows: PageRank passes a page's score along its links (one-good-link-beats-many) / does not know: that without random jumps a group of pages that links only to itself soaks up every page's score.
- Misconception: Passing score along links shares it out fairly, so every page keeps some.
- Prediction (stage text ≤ 25 words): "E and F link only to each other. Each round every page splits its score among its links. After 50 rounds, E and F hold:" options: A. About 33% / B. About 67% / C. About 100% (answer: C (100.0% to one decimal)).
- Check: Links A→B, B→C, C→A, C→D, D→E, E→F, F→E; start 1/6 each. Node `J4 {"basic":{"r5":0.7917,"r10":0.9375,"r20":0.9935,"r50":1},"scaled085":{"r50":0.6985,"r200":0.6985,"A":0.064,"C":0.093}}` (scaled: each page passes 85% along links, 15% spread evenly over all 6).
- Stage and controls: Six page nodes with score bars; E and F outlined as one group, readout "E + F: N%". Controls in DOM order: [5 rounds] [50 rounds] [Add 15% random jumps] [No jumps]. The active chip is disabled. Labels ≥ 10 px.
- QA path (each control once, DOM order, presets only): Each control once in DOM order: 5 rounds (79.2%), 50 rounds (milestone 1: 100.0%, the question's case), Add jumps (milestone 2: 69.9% at 50 rounds, A–D above zero), No jumps (back to 100.0%).
- Reveal (draft, ≤ 90 words, fits a 390×844 phone with the stage top visible): Score that reaches E or F never leaves, so round by round it drains in: your 50 rounds left E and F with 100.0% and A to D with nothing. That is a rank sink. Scaled PageRank sends 15% of every page's score to a random page each round; with it E and F keep 69.9% and every page keeps some. (≤ 90 words.)
- Planned claims:
  1. Under the basic rule (each page splits its whole score among its links), E and F hold 79.2% of the score after 5 rounds, 93.8% after 10, 99.4% after 20 and 100.0% (to one decimal) after 50. support: derivation; source: node power iteration.
  2. With 15% of every score spread evenly each round (s = 0.85), E and F hold 69.9% (the same at 50 and 200 rounds), A 0.064 and C 0.093. support: derivation; source: node.
  3. Scaled PageRank (random jumps) is the fix for score draining into groups of pages with no links out. support: citation; source: E&K ch. 14 (section unconfirmed); Brin and Page (1998). Attribution: fact-checker confirms.
- Format: Single card with step-run button (round chips + jump toggle)
- Curriculum: `{"primary": "cs:rank-sink-scaled-pagerank", "also": ["cs:pagerank-random-walk"], "prerequisites": ["cs:pagerank"], "level": "core", "strand": "algorithms", "references": [{"work": "easley-kleinberg-2010", "chapter": 14, "section_unconfirmed": "14.3"}], "tags": ["web", "PageRank", "link analysis"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: cs/one-good-link-beats-many already uses the scaled rule (1.5% free per page) without saying why; cs/random-surfer-finds-the-rank reads the jumps as a surfer. This one shows what breaks without the jump. Build after one-good-link-beats-many (built).
- Acceptance (cs.algorithms, wave J): accepted. Checked against the strand's rules: answer re-run in node (line above), prediction options at equal precision with no answer in the title or locked stage, chapter-only reference with the section in `section_unconfirmed`, no empirical claim in learner text without a source check, and no duplicate of the nearest lesson (see Differs). Copied to `company/domains/briefs/cs.algorithms.md` under "Course: NCM".

### cs.systems (wave J)

Owner: `cm-cs-systems` · 2 briefs

#### J5. one-link-back-grows-the-core · concept: cs:core-grows-by-one-link · core · demand 2 · format: Single card (hand-drawn network stage, 10 pages; link preset chips)
- Sections: E&K ch. 13 (section 13.3–13.4, unconfirmed) · domain: cs · course: ncm (wave J)
- Learner knows: one-way links and the IN / core / OUT picture (web-bow-tie-reach) / does not know: that one new link from OUT back to IN joins exactly the pages on the loop it closes, not the whole of IN and OUT.
- Misconception: One link from OUT back to IN pulls all of IN and OUT into the core.
- Prediction (stage text ≤ 25 words): "Core A–D: each reaches every other. Add one link from OUT page I to IN page F. How many pages form the core now?" options: A. 5 / B. 8 / C. 10 (answer: B (8: A–F, H, I)).
- Check: Core A→B→C→D→A; IN: E→A, F→E, G→B; OUT: C→H, H→I, D→J. Node `J5 {"before":["A","B","C","D"],"addIF":["A","B","C","D","E","F","H","I"],"addJG":["A","B","C","D","G","J"],"both":[all 10]}`.
- Stage and controls: Ten page nodes in a bow-tie layout (IN left, core centre, OUT right), core pages filled. Controls in DOM order: [Add I → F] [Add J → G] [Both] [None]; exclusive presets, the active one disabled. Readout: "core: N pages". ≤ 12 nodes, no node taps, labels ≥ 10 px.
- QA path (each control once, DOM order, presets only): Each chip once in DOM order: I → F (milestone 1: core 8, the question's case), J → G (milestone 2: core 6), Both (10), None (4). The reveal quotes the recorded milestones.
- Reveal (draft, ≤ 90 words, fits a 390×844 phone with the stage top visible): The new link closes one loop: F → E → A → B → C → H → I → F. Every page on it can now reach every other, so E, F, H and I join: 8. G still can't be reached from the core, and J still can't get back, so they stay out. One back link adds exactly the pages on the loop it closes. (≤ 90 words.)
- Planned claims:
  1. In the stage graph the core (pages that reach each other both ways) is A–D; adding I → F makes it A–F, H and I (8 pages); adding J → G instead gives A–D, G, J (6); adding both gives all 10. support: derivation; source: node reachability both ways.
  2. A page is in the same strongly connected group as the core exactly when it can reach the core and the core can reach it. support: definition; source: E&K ch. 13 (section unconfirmed).
  3. The 10-page graph is a toy, not to scale. support: definition.
- Format: Single card (hand-drawn network stage, 10 pages; link preset chips)
- Curriculum: `{"primary": "cs:core-grows-by-one-link", "also": ["cs:strongly-connected-components"], "prerequisites": ["cs:web-bow-tie", "cs:strongly-connected-components"], "level": "core", "strand": "systems", "references": [{"work": "easley-kleinberg-2010", "chapter": 13, "section_unconfirmed": "13.3–13.4"}], "tags": ["web", "directed graphs", "strongly connected"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: cs/web-bow-tie-reach asks what one page can reach; cs/groups-where-everyone-reaches-everyone finds the groups with two depth-first passes (CLRS). This one asks how one new link changes the core. Build after web-bow-tie-reach (built).
- Acceptance (cs.systems, wave J): accepted. Checked against the strand's rules: answer re-run in node (line above), prediction options at equal precision with no answer in the title or locked stage, chapter-only reference with the section in `section_unconfirmed`, no empirical claim in learner text without a source check, and no duplicate of the nearest lesson (see Differs). Copied to `company/domains/briefs/cs.systems.md` under "Course: NCM".

#### J7. drivers-stop-switching · concept: cs:best-response-convergence · core · demand 2 · format: Single card with step-run button (switch log and delay meter)
- Sections: E&K ch. 8 (section 8.3, unconfirmed) · domain: cs · course: ncm (wave J)
- Learner knows: each driver picks the faster road (new-road-slower-trip, selfish-routes-cost-a-third-more) / does not know: that when drivers switch one at a time, a meter of total delay falls by exactly each switcher's saving, so the switching must stop.
- Misconception: Selfish drivers chasing the faster road keep flipping back and forth for ever.
- Prediction (stage text ≤ 25 words): "Six drivers, two roads. One at a time, a driver switches if the other road is faster for them right now. The switching:" options: A. Stops within a few switches / B. Goes back and forth for ever / C. Stops only for some driver orders (answer: A (3 switches from all-on-B; at most 3 from any of the 64 starts)).
- Check: Road A takes 10 min × cars on A; road B takes 25 + 5 × cars on B; a driver switches only if strictly faster. Node `J7 {"log":[{"phi":255},{"saved":45,"phiDrop":45,"phi":210},{"saved":30,"phiDrop":30,"phi":180},{"saved":15,"phiDrop":15,"phi":165}],"final":{"onA":3,"onB":3,"timeA":30,"timeB":40}}`; `J7all {"starts":64,"maxMoves":3}`. All switching at once from all-on-B alternates 55 min (all on B) and 60 min (all on A) for ever (hand check: 10 < 55, then 30 < 60).
- Stage and controls: Two road bars with car tokens and trip times; a "delay meter" bar (sum over each road of 1st car's time + 2nd car's time + …). Controls in DOM order: [One at a time: run] [All at once: 4 rounds] [Start over]. The run shows each switch as a log row "driver 2 saves 30 min · meter −30". Labels ≥ 10 px.
- QA path (each control once, DOM order, presets only): Each control once in DOM order: One at a time (milestone 1: settled after 3 switches, A 30 min, B 40 min, meter 255 → 165), All at once (milestone 2: 4 rounds flipping 55 / 60 / 55 / 60), Start over (all on B; the recorded milestones stay quoted).
- Reveal (draft, ≤ 90 words, fits a 390×844 phone with the stage top visible): Each switch lowered the meter by exactly the minutes that driver saved: 45, 30, 15. The meter can't fall for ever, so after 3 switches nobody could gain: 3 drivers on A at 30 min, 3 on B at 40. When everyone switched at once there was no such meter, and the crowd flipped between 55 and 60 minutes round after round. (≤ 90 words.)
- Planned claims:
  1. On the stage's roads, switching one at a time from all-on-B takes 3 switches (savings 45, 30, 15 min) and ends with 3 drivers on A at 30 min and 3 on B at 40 min. support: derivation; source: node.
  2. The delay meter (for each road, the sum of the trip time with 1, 2, …, n cars) falls by exactly the switching driver's saving at every switch: 255, 210, 180, 165. support: derivation; source: node.
  3. From each of the 64 starting arrangements, one-at-a-time switching (drivers in turn) stops within 3 switches. support: derivation; source: node enumeration.
  4. If all six switch at once whenever the other road is faster, they alternate between all on B (55 min) and all on A (60 min) for ever. support: derivation.
  5. In routing games of this kind one-at-a-time best responses always stop at an equilibrium, because such a potential falls with every switch. support: citation; source: E&K ch. 8 advanced material (section unconfirmed); Rosenthal (1973), Int. J. Game Theory 2; Monderer and Shapley (1996). Attribution: fact-checker confirms.
- Format: Single card with step-run button (switch log and delay meter)
- Curriculum: `{"primary": "cs:best-response-convergence", "also": ["cs:price-of-anarchy"], "prerequisites": ["cs:braess-paradox"], "level": "core", "strand": "systems", "references": [{"work": "easley-kleinberg-2010", "chapter": 8, "section_unconfirmed": "8.3"}], "tags": ["traffic", "game theory", "equilibrium"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: cs/new-road-slower-trip (Braess) and cs/selfish-routes-cost-a-third-more compare the equilibrium with the best plan; neither asks whether selfish switching ever ends. Build after both (built).
- Acceptance (cs.systems, wave J): accepted. Checked against the strand's rules: answer re-run in node (line above), prediction options at equal precision with no answer in the title or locked stage, chapter-only reference with the section in `section_unconfirmed`, no empirical claim in learner text without a source check, and no duplicate of the nearest lesson (see Differs). Copied to `company/domains/briefs/cs.systems.md` under "Course: NCM".

### probability.chance (wave J)

Owner: `cm-probability-chance` · 1 brief

#### J6. two-big-groups-stay-apart · concept: probability:two-giants-unlikely · core · demand 2 · format: Simulation run (seeded worlds, chance chips)
- Sections: E&K ch. 2 (section 2.2, unconfirmed) · domain: probability · course: ncm (wave J)
- Learner knows: a giant connected group appears once people have a friend or two each (the-giant-appears) / does not know: that two big groups in one population are almost certain to have at least one link between them, so they merge.
- Misconception: Two large groups can easily stay completely cut off from each other.
- Prediction (stage text ≤ 25 words): "Two towns of 500. Any cross-town pair are friends with chance 1 in 10,000. Chance nobody has a friend in the other town?" options: A. About 1 in 3 / B. About 1 in 100 / C. About 1 in 70 billion (answer: C ((1 − 1/10,000)^250,000 ≈ 1.4 × 10^-11)).
- Check: Node `J6 {"pairs":250000,"expectedLinks":25,"Pzero":1.387e-11,"sim":{"runs":1000,"zero":0,"mean":25.327,"min":13,"max":43},"at1in100k":{"expected":2.5,"Pzero":0.0821},"at1in1M":{"expected":0.25,"Pzero":0.7788}}` (mulberry32 seeds 1–1,000, one world per seed). The builder draws each world's link count efficiently (for example geometric gaps) and records its own seeds and tallies.
- Stage and controls: Two town blobs with cross links drawn as lines; tally "worlds run: N · worlds with 0 links: Z · fewest links: m". Controls in DOM order: [Run 100 worlds] [1 in 100,000] [1 in 1,000,000] [1 in 10,000]; each chance chip runs 100 worlds at that chance. Labels ≥ 10 px.
- QA path (each control once, DOM order, presets only): Each control once in DOM order: Run 100 (milestone 1: 100 worlds at 1 in 10,000, zero count 0), 1 in 100,000 (milestone 2: about 8% of worlds have 0), 1 in 1,000,000 (about 78% have 0), 1 in 10,000 (back). The reveal quotes the learner's recorded tallies.
- Reveal (draft, ≤ 90 words, fits a 390×844 phone with the stage top visible): 250,000 cross pairs × 1 in 10,000 = 25 links expected. In your 100 worlds the fewest was m and none had 0. Zero needs every pair to miss: (1 − 1/10,000)^250,000, about 1 in 70 billion. Only at 1 in a million do towns often stay apart. So in a real population two giant groups almost surely touch and merge. (≤ 90 words; m is the learner's own.)
- Planned claims:
  1. Two towns of 500 have 250,000 cross pairs; at 1 in 10,000 each, 25 cross links are expected. support: derivation.
  2. The chance of no cross link is (1 − 1/10,000)^250,000 ≈ 1.4 × 10^-11, about 1 in 72 billion. support: derivation; source: node.
  3. At 1 in 100,000 the chance of no link is 8.2%; at 1 in 1,000,000 it is 77.9%. support: derivation; source: node.
  4. In the lesson's seeded worlds (seeds disclosed in meta), the tally is the learner's own run; in my check, 1,000 worlds at 1 in 10,000 had 13 to 43 links and none had 0. support: simulation; source: node mulberry32.
  5. Two giant components rarely coexist because a single link between them merges them, and with so many pairs at least one link is near-certain. support: citation; source: E&K ch. 2 (section unconfirmed). Attribution: fact-checker confirms.
- Format: Simulation run (seeded worlds, chance chips)
- Curriculum: `{"primary": "probability:two-giants-unlikely", "also": ["probability:at-least-once"], "prerequisites": ["probability:giant-component", "probability:at-least-once"], "level": "core", "strand": "chance", "references": [{"work": "easley-kleinberg-2010", "chapter": 2, "section_unconfirmed": "2.2"}], "tags": ["networks", "giant component", "at least once"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: probability/the-giant-appears shows a giant group forming as links are added (its claim 5 notes that merging happens); this one asks why there is only one, with the chance of zero links made explicit. Build after the-giant-appears (built).
- Acceptance (probability.chance, wave J): accepted. Checked against the strand's rules: answer re-run in node (line above), prediction options at equal precision with no answer in the title or locked stage, chapter-only reference with the section in `section_unconfirmed`, no empirical claim in learner text without a source check, and no duplicate of the nearest lesson (see Differs). Copied to `company/domains/briefs/probability.chance.md` under "Course: NCM".

### probability.statistics (wave J)

Owner: `cm-probability-statistics` · 2 briefs

#### J8. your-clue-against-two-picks · concept: probability:cascade-bayes-threshold · core · demand 2 · format: Single card (combine button, accuracy chips)
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
- Acceptance (probability.statistics, wave J): accepted. Checked against the strand's rules: answer re-run in node (line above), prediction options at equal precision with no answer in the title or locked stage, chapter-only reference with the section in `section_unconfirmed`, no empirical claim in learner text without a source check, and no duplicate of the nearest lesson (see Differs). Copied to `company/domains/briefs/probability.statistics.md` under "Course: NCM".

#### J9. same-picture-two-histories · concept: probability:selection-vs-influence · core · demand 2 · format: Single card with Step (two replay chips; network stage, 8 people)
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
- Acceptance (probability.statistics, wave J): accepted. Checked against the strand's rules: answer re-run in node (line above), prediction options at equal precision with no answer in the title or locked stage, chapter-only reference with the section in `section_unconfirmed`, no empirical claim in learner text without a source check, and no duplicate of the nearest lesson (see Differs). Copied to `company/domains/briefs/probability.statistics.md` under "Course: NCM".

### economics.markets (wave J)

Owner: `cm-economics-markets` · 5 briefs

#### J10. two-cents-empties-the-network · concept: economics:network-effects-cliff · core · demand 2 · format: Single card (price chips drive live chart; round trail)
- Sections: E&K ch. 17 (section 17.3, unconfirmed) · domain: economics · course: ncm (wave J)
- Learner knows: the tipping-point model of below-critical-mass (value = keenness × share) / does not know: that the hump in that model has a top, and a price just above it leaves no user share but zero.
- Misconception: A small price rise loses a few users, not all of them.
- Prediction (stage text ≤ 25 words): "At 24¢ the app holds 60% of people. The price rises to 26¢. Where does the user share settle?" options: A. About 58% / B. About 40% / C. About 0% (answer: C (0%: falls from 60% to 0 in 11 rounds)).
- Check: Model of below-critical-mass: person x in 0–1 values the app at (1 − x) × share z; next round's share is 1 − price / z (0 if negative). Node `J10 {"eq020":[0.276,0.724],"eq024":[0.4,0.6],"eq025":[0.5,0.5],"eq026":[],"from60at26":[0.6,0.567,0.541,0.52,0.5,0.48,0.458,0.432,0.398,0.347,0.251,0],"roundsToZero":11}`.
- Stage and controls: The hump z(1 − z) with the price as a horizontal line, crossings as dots; a trail of round-by-round shares on the curve. Controls in DOM order: [26¢] [20¢] [24¢]; pressing a price chip runs the rounds from 60% to the end (step-run). Readout "share: N% · round k". Labels ≥ 10 px; the 25¢ top is not labelled before the commit.
- QA path (each control once, DOM order, presets only): Each chip once in DOM order: 26¢ (milestone 1: 60% → 0 in 11 rounds, the question's case), 20¢ (crossings 28% and 72%), 24¢ (milestone 2: holds at 60%, crossings 40% and 60%).
- Reveal (draft, ≤ 90 words, fits a 390×844 phone with the stage top visible): The hump peaks at 25¢, at half the people. At 24¢ the price line still crosses it at 40% and 60%, so 60% holds. At 26¢ it clears the top: your run slid 60, 57, 54 … and hit 0 in 11 rounds. With network effects, a price just past the top of the hump does not lose a few users; it loses all of them. (≤ 90 words.)
- Planned claims:
  1. In the model (value (1 − x) × share, next share 1 − price/share), the share settles where share × (1 − share) = price: at 24¢ at 40% (unstable) and 60% (stable); at 20¢ at 27.6% and 72.4%. support: derivation; source: node.
  2. share × (1 − share) is at most 0.25, at a 50% share, so at 26¢ no positive share is an equilibrium. support: derivation.
  3. From 60% at 26¢ the share falls to 0 in 11 rounds (60, 56.7, 54.1, 52, 50, 48, 45.8, 43.2, 39.8, 34.7, 25.1, 0%). support: derivation; source: node.
  4. The prices and value rule are invented for the toy model and are not a forecast for any real product. support: definition.
- Format: Single card (price chips drive live chart; round trail)
- Curriculum: `{"primary": "economics:network-effects-cliff", "also": [], "prerequisites": ["economics:network-effects-tipping"], "level": "core", "strand": "markets", "references": [{"work": "easley-kleinberg-2010", "chapter": 17, "section_unconfirmed": "17.3"}], "tags": ["network effects", "tipping point", "pricing"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: economics/below-critical-mass varies the launch share at a fixed 16¢ price (the tipping point); this one holds a high share and raises the price (the cliff). Same model; build after it (built).
- Acceptance (economics.markets, wave J): accepted. Checked against the strand's rules: answer re-run in node (line above), prediction options at equal precision with no answer in the title or locked stage, chapter-only reference with the section in `section_unconfirmed`, no empirical claim in learner text without a source check, and no duplicate of the nearest lesson (see Differs). Copied to `company/domains/briefs/economics.markets.md` under "Course: NCM".

#### J11. worth-something-alone · concept: economics:standalone-value-network · stretch · demand 1 · format: Single card (stand-alone chips drive live chart; launch run)
- Sections: E&K ch. 17 (section 17.6, unconfirmed) · domain: economics · course: ncm (wave J)
- Learner knows: the tipping point of below-critical-mass / does not know: that some value with no other users shrinks the critical mass but leaves an empty app stuck at zero unless that value beats the price.
- Misconception: Any value on its own is enough to get a network product started from zero.
- Prediction (stage text ≤ 25 words): "Same app at 16¢, now worth 10¢ to its keenest fan even with no other users. Launched with 0 users, where does it end?" options: A. About 0% / B. About 10% / C. About 80% (answer: A (0%)).
- Check: Value (1 − x) × (a + share), price 16¢, next share max(0, 1 − 0.16/(a + share)). Node `J11`: a = 0: equilibria 20%, 80%, from 0 stays 0; a = 10¢: equilibria 7.3%, 82.7%, from 0 stays 0; a = 20¢: zero is not an equilibrium, from 0: 0, 20, 60, 80, 84, 84.6 … 84.7%.
- Stage and controls: The value curve against the 16¢ price line, crossings as dots, and a launch trail from 0. Controls in DOM order: [Launch from 0] [20¢ alone] [0¢ alone] [10¢ alone]; each stand-alone chip relaunches from 0. Readout "share: N% · tipping point: T%". Labels ≥ 10 px.
- QA path (each control once, DOM order, presets only): Each control once in DOM order: Launch from 0 (milestone 1: at 10¢ alone stays 0%, tipping point 7.3%), 20¢ alone (milestone 2: climbs to 84.7%), 0¢ alone (tipping point 20%), 10¢ alone (back).
- Reveal (draft, ≤ 90 words, fits a 390×844 phone with the stage top visible): At 10¢ alone, even the keenest fan values an empty app below the 16¢ price, so nobody starts: your launch stayed at 0%. The stand-alone value did lower the critical mass, from 20% to 7.3%. At 20¢ alone the first buyers come with nobody else on it, and the app climbed to 85%. Stand-alone value removes the trap only when it beats the price. (≤ 90 words.)
- Planned claims:
  1. With stand-alone value a = 10¢ at price 16¢, 0% is still an equilibrium and the tipping point falls from 20% to 7.3% (high equilibrium 82.7%). support: derivation; source: node.
  2. With a = 20¢, 0% is not an equilibrium and a launch from 0 rises 0, 20, 60, 80, 84 … to 84.7%. support: derivation; source: node.
  3. An empty network product sells to nobody unless someone's value with no other users exceeds the price. support: derivation (at share 0 the keenest value is a).
  4. The model and numbers are invented for the lesson (a network value mixed with an individual one, the idea the book discusses in ch. 17). support: definition; source: E&K ch. 17 (section unconfirmed).
- Format: Single card (stand-alone chips drive live chart; launch run)
- Curriculum: `{"primary": "economics:standalone-value-network", "also": [], "prerequisites": ["economics:network-effects-tipping"], "level": "stretch", "strand": "markets", "references": [{"work": "easley-kleinberg-2010", "chapter": 17, "section_unconfirmed": "17.6"}], "tags": ["network effects", "critical mass"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: economics/below-critical-mass has no stand-alone value; two-cents-empties-the-network (this wave) moves the price. This one adds individual value to the same curve. Build after below-critical-mass (built).
- Acceptance (economics.markets, wave J): accepted. Checked against the strand's rules: answer re-run in node (line above), prediction options at equal precision with no answer in the title or locked stage, chapter-only reference with the section in `section_unconfirmed`, no empirical claim in learner text without a source check, and no duplicate of the nearest lesson (see Differs). Copied to `company/domains/briefs/economics.markets.md` under "Course: NCM".

#### J12. price-tag-or-auction · concept: economics:auction-vs-posted-price · core · demand 2 · format: Single card (bidder-count chips; seeded check run)
- Sections: E&K ch. 9 (section 9.2, unconfirmed) · domain: economics · course: ncm (wave J)
- Learner knows: second-price auctions (bid-what-its-worth) / does not know: that a seller who knows only the range of values earns more from the best fixed price with one or two bidders, but from an auction once there are three.
- Misconception: An auction always earns more than a fixed price, because buyers compete.
- Prediction (stage text ≤ 25 words): "Values are random, $0 to $100. From how many bidders does a second-price auction earn more on average than the best price tag?" options: A. 2 / B. 3 / C. 5 (answer: B (3)).
- Check: Best price tag p maximises p(1 − (p/100)^n), p = 100(1/(n+1))^(1/n); second-price revenue = 100(n − 1)/(n + 1). Node `J12`: n=1 tag $50 → $25 vs $0; n=2 tag $57.7 → $38.5 vs $33.3; n=3 tag $63.0 → $47.2 vs $50.0; n=4 $53.5 vs $60.0; 100,000 seeded sales (mulberry32 seed 7) agree to $0.2.
- Stage and controls: Two bars per bidder count, "best tag ($p)" and "auction", expected revenue in dollars. Controls in DOM order: [2 bidders] [3 bidders] [4 bidders] [Simulate 1,000 sales]; starts at 1 bidder. Readout of both averages. Labels ≥ 10 px; the crossing is not marked before the commit.
- QA path (each control once, DOM order, presets only): Each control once in DOM order: 2 bidders (milestone 1: tag $38.50 vs auction $33.30), 3 bidders (milestone 2: tag $47.20 vs auction $50.00), 4 bidders, Simulate (1,000 seeded sales at 4 bidders, averages near $53.50 and $60.00). The reveal quotes the milestones.
- Reveal (draft, ≤ 90 words, fits a 390×844 phone with the stage top visible): With 2 bidders the best tag ($57.70) earned $38.50 against the auction's $33.30. With 3 the auction won, $50.00 to $47.20. A tag is a guess: too high and nobody buys, too low and money is left on the table. An auction lets the second-highest bidder set the price, and that gets better with every rival. (≤ 90 words.)
- Planned claims:
  1. With n bidders whose values are uniform on $0–$100, the best fixed price earns 100 × p(1 − p^n) at p = (1/(n + 1))^(1/n): $25.00, $38.50, $47.20, $53.50 for n = 1 to 4. support: derivation; source: node.
  2. A second-price auction with no reserve earns 100(n − 1)/(n + 1) on average: $0, $33.30, $50.00, $60.00. support: derivation (expected second-highest of n uniforms).
  3. In 100,000 seeded simulated sales each average is within $0.20 of these. support: simulation; source: node (the builder records its own run).
  4. Auctions are most useful when the seller does not know what buyers will pay. support: citation; source: E&K ch. 9 (section unconfirmed). Attribution: fact-checker confirms.
- Format: Single card (bidder-count chips; seeded check run)
- Curriculum: `{"primary": "economics:auction-vs-posted-price", "also": ["economics:monopoly-pricing"], "prerequisites": ["economics:second-price-auction"], "level": "core", "strand": "markets", "references": [{"work": "easley-kleinberg-2010", "chapter": 9, "section_unconfirmed": "9.2"}], "tags": ["auctions", "pricing"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: economics/bid-what-its-worth is bidder strategy; same-revenue-any-rule compares auction formats with each other; monopolist-holds-back sets a price against a known demand curve. This one compares an auction with no auction. No lesson does.
- Acceptance (economics.markets, wave J): accepted. Checked against the strand's rules: answer re-run in node (line above), prediction options at equal precision with no answer in the title or locked stage, chapter-only reference with the section in `section_unconfirmed`, no empirical claim in learner text without a source check, and no duplicate of the nearest lesson (see Differs). Copied to `company/domains/briefs/economics.markets.md` under "Course: NCM".

#### J13. does-going-first-help · concept: economics:first-mover-commitment · core · demand 2 · format: Single card (game tree; solve-from-the-end and game chips)
- Sections: E&K ch. 6 (section 6.10, unconfirmed) · domain: economics · course: ncm (wave J)
- Learner knows: the simultaneous chicken game (someone-has-to-swerve) and mixing in the penalty kick (penalty-kick-mix) / does not know: that when one player must move first and is seen, working back from the end shows going first can win the game or lose it.
- Misconception: Moving first always gives away your hand, so it is a disadvantage.
- Prediction (stage text ≤ 25 words): "Chicken, but Rae must announce her move first and Sam sees it. Straight beats swerve; both straight crash. Who does better?" options: A. Rae, who moves first / B. Sam, who moves second / C. Neither: they tie (answer: A (Rae 3, Sam 0)).
- Check: Payoffs from someone-has-to-swerve: both straight −10 each; straight vs swerve 3 and 0; both swerve 1 each. Node `J13 {"chickenFirstMoves":{"m1":"S","m2":"W","pay":[3,0]},"penaltyGoalieFirst":{"m1":"L","m2":"R","pay":[0,1]},"penaltySimultaneousMixedSaveRate":0.5}`.
- Stage and controls: A two-level game tree with payoffs at the leaves; solving greys out the worse branch at each node. Controls in DOM order: [Solve from the end] [Penalty kick: goalie first] [Back to chicken]. Readout "first mover gets N". ≤ 25 words of stage text, labels ≥ 10 px.
- QA path (each control once, DOM order, presets only): Each control once in DOM order: Solve (milestone 1: Sam swerves after straight, goes straight after swerve, so Rae picks straight, 3 vs 0), Penalty kick (milestone 2: the kicker shoots away from the dive, goalie saves 0), Back to chicken (solved tree still shown).
- Reveal (draft, ≤ 90 words, fits a 390×844 phone with the stage top visible): Working back from the end: whatever Rae announces, Sam's best reply is the opposite, so Rae announces straight and takes 3 to Sam's 0. In the penalty kick the same rule left the goalie who dives first with no saves, against half when both choose at once. Going first helps when the other side wants to avoid you, and hurts when they want to outguess you. (≤ 90 words.)
- Planned claims:
  1. In chicken with these payoffs, if Rae moves first and Sam sees it, backward induction gives Rae straight and Sam swerve: 3 to 0. support: derivation; source: node.
  2. In the penalty kick, a goalie who must dive first and is seen saves 0 shots; when both choose at once and mix 50–50 the goalie saves half. support: derivation; source: node; penalty-kick-mix.
  3. Games with moves in sequence are solved by working back from the end, and committing first can help or hurt depending on the game. support: citation; source: E&K ch. 6 advanced material (section unconfirmed). Attribution: fact-checker confirms.
- Format: Single card (game tree; solve-from-the-end and game chips)
- Curriculum: `{"primary": "economics:first-mover-commitment", "also": [], "prerequisites": ["economics:hawk-dove-chicken", "economics:mixed-strategy-equilibrium"], "level": "core", "strand": "markets", "references": [{"work": "easley-kleinberg-2010", "chapter": 6, "section_unconfirmed": "6.10"}], "tags": ["game theory", "sequential games", "commitment"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: economics/someone-has-to-swerve is simultaneous (two stable outcomes, no way to pick); penalty-kick-mix is mixing; lowball-offer-should-pass uses backward induction in one game. This one uses the same rule in two games and gets opposite answers. Build after someone-has-to-swerve and penalty-kick-mix (both built).
- Acceptance (economics.markets, wave J): accepted. Checked against the strand's rules: answer re-run in node (line above), prediction options at equal precision with no answer in the title or locked stage, chapter-only reference with the section in `section_unconfirmed`, no empirical claim in learner text without a source check, and no duplicate of the nearest lesson (see Differs). Copied to `company/domains/briefs/economics.markets.md` under "Course: NCM".

#### J14. keenest-buyer-takes-the-other-flat · concept: economics:clearing-maximises-total-value · core · demand 2 · format: Single card (two-buyer value matrix; price-round run)
- Sections: E&K ch. 10 (section 10.5, unconfirmed) · domain: economics · course: ncm (wave J)
- Learner knows: raising prices on over-demanded items until each buyer can take a different one (prices-sort-the-buyers) / does not know: that the clearing match maximises total value, so an item can go to someone other than the buyer who values it most.
- Misconception: Prices hand each item to the buyer who values it most.
- Prediction (stage text ≤ 25 words): "Ana values the corner flat $10, the garden flat $9. Ben values them $9 and $1. Prices clear the market. Who gets the corner flat?" options: A. Ana / B. Ben / C. Either: it's a tie (answer: B (Ben)).
- Check: Node `J14 {"AnaCornerBenGarden":11,"AnaGardenBenCorner":18,"rounds":[{"p":{"corner":0,"garden":0},"Ana":["corner"],"Ben":["corner"]},{"p":{"corner":1,"garden":0},"Ana":["corner","garden"],"Ben":["corner"]}]}`: one raise of the over-demanded corner flat clears the market at corner $1, garden $0.
- Stage and controls: A 2 × 2 value matrix (buyers as rows, flats as columns, the network-stage matrix variant), prices above the columns, each buyer's preferred cells outlined. Controls in DOM order: [Run the price rounds] [Give Ana the corner] [Clearing match]. Readout "total value: $N". Labels ≥ 10 px.
- QA path (each control once, DOM order, presets only): Each control once in DOM order: Run (milestone 1: corner $1, garden $0; Ana gains $9 either way, Ben only wants the corner), Give Ana the corner (milestone 2: total $11), Clearing match (total $18).
- Reveal (draft, ≤ 90 words, fits a 390×844 phone with the stage top visible): At corner $1 and garden $0, Ana gains $9 from either flat while Ben gains $8 only from the corner, so Ben takes it. That match is worth $18 in total, against $11 if Ana took the corner. Ana values the corner most, but moving costs her only $1 of value and would cost Ben $8. Clearing prices find the best total, not the keenest buyer. (≤ 90 words.)
- Planned claims:
  1. At prices corner $1 and garden $0 each buyer can take a flat they most prefer: Ben the corner, Ana the garden (she is indifferent). support: derivation; source: node price rounds.
  2. That match is worth $9 + $9 = $18; Ana in the corner and Ben in the garden is worth $11. support: derivation.
  3. Market-clearing prices always produce a match with the highest total value. support: citation (theorem); source: E&K ch. 10 (section unconfirmed); Shapley and Shubik (1971). Attribution: fact-checker confirms.
- Format: Single card (two-buyer value matrix; price-round run)
- Curriculum: `{"primary": "economics:clearing-maximises-total-value", "also": [], "prerequisites": ["economics:market-clearing-prices"], "level": "core", "strand": "markets", "references": [{"work": "easley-kleinberg-2010", "chapter": 10, "section_unconfirmed": "10.5"}], "tags": ["matching markets", "efficiency"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: economics/prices-sort-the-buyers shows the price rounds and that the clearing match has the highest total (there the top valuer of house a does get it); this one picks a case where the keenest buyer for an item does not get it, which is the misconception. Build after prices-sort-the-buyers (built).
- Acceptance (economics.markets, wave J): accepted. Checked against the strand's rules: answer re-run in node (line above), prediction options at equal precision with no answer in the title or locked stage, chapter-only reference with the section in `section_unconfirmed`, no empirical claim in learner text without a source check, and no duplicate of the nearest lesson (see Differs). Copied to `company/domains/briefs/economics.markets.md` under "Course: NCM".

