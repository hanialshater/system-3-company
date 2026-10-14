# Fact-check: cluster-stops-the-cascade (2026-10-14)

## Pass NCM-1

Checker: fact-checker (session 2, branch ccr-rnd-ncm). I wrote none of these claims. Order: walkthrough transcript and Demo.tsx first, then meta.json sources.

Result: 9 of 9 verified (c1-c9). 0 disputed, 0 withdrawn.

Re-run (my own node script, copying EDGES, NB and simulate() from Demo.tsx exactly: synchronous, join when 2k >= degree, adopters stay):
- Start 0,1: rounds [[0,1],[2],[3],[4],[5],[6],[7]], last = 6, 8 adopted, holdouts 8, 9, 10, 11 (c2). Pills at the final: 8 1/4, 9 0/3, 10 0/3, 11 0/3 (c4). Inside counts 8 3/4, others 3/3 (c5).
- Start 8,9: rounds [[8,9],[7,10,11],[6],[5],[4],[3],[2],[1],[0]], last = 8, 12 adopted (c3).
- 14 edges (c8). Outline rect (140..268, 156..284) encloses exactly nodes 8-11; node 7 (170,118) is outside.
- Cluster theorem on this graph (c7): for every seed set of every size (all 4,095), "incomplete" equals "the non-seeds contain a non-empty set whose every member has more than half its friends inside it" (max such set found by peeling): 0 contradictions. Sizes 1-3: 298 sets, 132 incomplete, matches the builder.

Stage and reveal vs claims: predict answer "8" = c2; reveal paragraph 1 = c2/c4 (or the c5 fallback)/c3; paragraph 2 = c6/c5; muted line = c7; recall = c9. The stage does not make a different claim from the text: the round numbers shown match c2/c3, and the pill shows adopted/friends as in c4.

Sources:
- c1, c7: E&K ch. 19 threshold model (adopt when fraction of A-neighbours >= q) and the clusters theorem: "If the remaining network contains a cluster of density greater than 1 - q, the initial adopters will not cause a complete cascade; whenever they do not, the remaining network must contain such a cluster", cluster of density p = every member has at least a p fraction of its neighbours in the set. Statement confirmed via search-quoted lecture notes built on E&K (Edinburgh STN cascades slides, Cambridge L109 lecture 7, EPFL CSM lecture 3); the book PDF (cs.cornell.edu and the CUHK mirror) is blocked by the proxy (403). For q = 1/2, "density greater than 1/2" = each member has more than half its friends inside, as the lesson says. "Stops exactly at such a group" holds because the final holdout set is itself such a cluster (each holdout has fewer than q adopted friends). Synchronous rounds affect only the round numbers, not the final set (monotone threshold rule); c1 states the convention. Section numbers stay in section_unconfirmed (my recollection is 19.2 Modeling Diffusion, 19.3 Cascades and Clusters, unconfirmed against the PDF).
- c5, c6, c9: derivations re-done; correct (with no member adopted, a member's adopted friends are all outside, at most 1/4 or 0/3 < 1/2).

Non-blocking note: none.

Confidence: high on c2-c6, c8, c9 (deterministic re-run); medium-high on c1/c7 wording-level match to E&K (theorem confirmed through secondary teaching sources only).


## Pass NCM-2 (2026-10-14)

Checker: fact-checker (did not write these claims). Scope: every claim still `unverified` after the builder's revision. Method: read the current Demo.tsx (predict, stage text, readouts, reveal and the milestones that gate it) and model files, then re-ran the lesson's own code in node 22 via tsx (Demo.tsx copied to scratchpad with its internals exported, CSS import stubbed; model/abm files imported directly). Reveal check: every number or sentence the reveal prints was traced to a state the milestones guarantee the learner reached, or to a claim. The walkthrough transcript predates this revision (08:4x vs Demo.tsx 09:xx), so the stage was read from code, not from a fresh walkthrough.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Ran Demo.tsx simulate() from {0,1}: adopters 0-7, last round 6; at that final 8 has 1/4 adopted friends, 9, 10, 11 have 0/3. Note: the reveal's quoted person is the current focus if it is a group member at start 0,1 (any round), but endFriends() always uses the final, and the reveal stage is pinned to the 0,1 final, so the pill shows the same number. Claim's 'focused on that final' slightly overstates the gate; not learner-facing. |
| c5 | verified | Inside counts from NB in Demo.tsx: 8 3 of 4, 9/10/11 3 of 3. While none has adopted a member's adopted friends are outside: at most 1 of 4 or 0 of 3, below need = ceil(d/2) = 2. Stage focus line formula matches. |
| c6 | verified | simulate(): {0,1} -> 8 of 12 in 6 rounds; {8,9} -> 12 of 12 in 8 rounds. Same seed count, so neither 'many more' nor 'out of reach' holds. Both runs are milestone-gated ('stopped', 'planted'). |

**Reveal check:** Reveal quotes both runs (stopped and planted milestones) and the focused group member's final count, which the pinned reveal stage also shows.

**Advisory (claim text):** c4 says the reveal quotes the count 'only for the group member the learner focused on that final'; the code quotes the current focus at start 0,1 at any round (endFriends always uses the final). The pinned reveal stage shows the same number, so the learner sees nothing unbacked.

**Result:** 3 verified this pass, 0 disputed, 0 withdrawn. Lesson now: 9 verified.

## Pass NCM-3 (2026-10-14)

Checker: fact-checker (did not write these claims). Scope: every claim still `unverified` after the final-polish revisions, plus a fresh read of every predict, stage label and reveal sentence against the claims. Method: diffed Demo.tsx/model since the NCM-2 record (commit 319d2bda), re-ran the lesson's current code in node 22 via tsx (model files imported directly; Demo-only functions reproduced verbatim or re-implemented independently), and traced each reveal sentence to a milestone-guaranteed state or a claim. No fresh walkthrough: the transcripts predate the v3 commits and a build was not attempted in this shared checkout, so stage text was read from code.

No open claims. v3 sets quoted = sawIn, so the reveal quotes a person only for a group member focused on the 0,1 final, as c4 says (closes the NCM-2 advisory). No other change. Re-read predict and reveal against the verified claims; no new learner-visible claim found.

**Result:** 0 status changes.

## Pass NCM-5 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read the current Demo.tsx at HEAD 3e1fb604 (predict, stage text, readouts, reveal, and the milestones and pins that gate it), re-ran the lesson's rule in node 22 via tsx (model files imported directly, or the Demo.tsx function reproduced verbatim), and traced each reveal sentence to a milestone-guaranteed state or a claim. No fresh walkthrough: the transcripts predate this revision and no build was run in the shared checkout, so stage text was read from code. Scope: c6, reset to unverified after the v4 seed-location reveal.

| Claim | Check | Result |
|---|---|---|
| c6 | Brute force over all 4,095 non-empty seed sets with simulate() as in Demo.tsx: {0,1} -> 8 of 12 (round 6); {8,9} -> 12 of 12 (round 8); 255 of 255 sets with no member among 8-11 stall short of 12, and in none of them does any of 8-11 join; 2,816 of 2,816 sets with two or more of 8-11 reach 12. Reveal para 1 ('Where the seeds are decides it, not how many ... More starters outside the four would not help, because none of them can be the first of the four to join') matches; both runs are gated by 'stopped' and 'planted'. | verified |

Reveal check: para 1 rests on the two gated runs plus c6; para 2 on c4 (quoted only for a group member focused on the 0,1 final) and c5; para 3 is c7. No unbacked sentence.

Result: 1 verified, 0 disputed. Lesson: no open claims.

## Pass 38 (2026-10-14, set A)

Checker: fact-checker. I wrote and built none of these claims. Scope: every open claim in this lesson (set A of pass 38: ai, cs, math, physics, probability, economics, geography, lifehacks). Method: I read Demo.tsx (or the Life Hacks spec and engine) first, every learner-visible string, then the claims. I re-ran every number in my own node scripts (scratchpad fc38/: cluster.mjs, enemy.mjs, secret.mjs, plus inline runs), not imported from the lesson. Web: arxiv, publisher, government, Wikipedia and help-centre hosts return proxy 403 or fail DNS. Only raw.githubusercontent.com, PyPI and npm are reachable, so the sources I opened are files on GitHub (OpenStax CNXML, MicrosoftDocs, NetworkX, d2l, GRASS, GNOME/KDE source, the authors' own repositories, a papers-we-love PDF), each named in its row. Search-result snippets were not used as evidence. A claim whose source I could not open stays unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | VERIFIED (v5). Own port of simulate() (synchronous rounds, adopt when 2k >= d) from {0,1}: 8 of 12 adopt, last round 6. At that final, 8 has 1 of 4 friends adopted; 9, 10 and 11 have 0 of 3. The focus line and pill print friends(i)/NB[i].length. The v5 reveal quotes no single person. |
| c5 | verified | VERIFIED (v5). Inside counts from EDGES: 8 has 3 of 4 inside, 9-11 have 3 of 3; need = ceil(d/2) = 2. While no member has adopted, a member's adopted friends are all outside: at most 1 of 4 or 0 of 3. The sealed focus line prints e.g. '8: 1 of 4 friends adopted; 3 of 4 in the group, so at most 1 (needs 2).' The reveal text matches the claim. |
| c6 | verified | VERIFIED (v5). Own simulate(): {0,1} -> 8 of 12; {0,1,2,3} -> 8; {0..7} -> 8; {8,9} -> 12. Over all 4,095 seed sets, no set without a member of 8-11 reaches 12, and in none does any of 8-11 ever join. So option 0 (0, 1, 2, 3) and option 1 ('no start reaches all 12') are false, and option 2 (two elsewhere, e.g. 8 and 9) is true. Answer index 2. |
| c7 | verified | VERIFIED by proof plus brute force, not on the unopened E&K citation. Take a set S of non-starters in which each member has more than half its friends in S. In the round a first member would join, all of its adopted friends lie outside S, which is fewer than half; the rule needs 2k >= d, so no member can ever be first, on any graph. Brute force on this graph: for 585 seed sets crossed with every qualifying non-seed S, 0 violations. The E&K 19.3 attribution is in the source field only and was not opened. |

**Result:** 4 verified, 0 disputed, 0 held (unverified), 0 withdrawn.
