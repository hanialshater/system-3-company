# Fact-check: enemy-of-my-enemy (2026-10-14)

## Pass NCM-1

Checker: fact-checker (session 2, branch ccr-rnd-ncm). I wrote none of these claims. Walkthrough transcript and Demo.tsx first, then meta.json.

Result: 5 verified (c1-c5), 1 disputed (c6), 0 withdrawn. The lesson cannot publish until c6 is fixed and re-checked.

Re-run (my node script copying EDGES, TRIOS, unbalancedTrios() and camps() from Demo.tsx):
- All 1,024 settings: 16 balanced; 1 one camp, 15 two camps, 0 balanced-but-not-a-split (c2).
- Every camp split: unbalanced trios are exactly the trios with three distinct camps, 0 mismatches (c3).
- Unbalanced by number of camps: 1 -> 0, 2 -> 0, 3 -> {3, 4} (3-1-1: 3, 2-2-1: 4), 4 -> 7, 5 -> 10 (c4).
- QA path from all enemies (10): AB 7 (AB|C|D|E), BC 6 mixed, AC 3 (ABC|D|E), DE 0 (ABC|DE), AD 3, AE 4, BD 5, BE 4, CD 3, CE 0 (ABCDE); preset 3 camps = ABC|D|E, 3; preset then DE = ABC|DE, 0 (c5).
- c1: the rule line, the predict text and unbalancedTrios() (product < 0) agree; E&K's balanced triangles are those with three + or exactly one + (secondary sources; § stays unconfirmed).

Reveal vs claims: paragraph 1 quotes the learner's own states (c5); paragraph 2 "at least 3 such trios; all enemies leaves all 10" = c4; paragraph 3 = c6. The recall (six countries, three blocs) follows from c3 and c6.

### c6 disputed

Claim: "... it holds for any number of people, and is due to Cartwright and Harary (1956)." Reveal: "This is the balance theorem (Cartwright and Harary, 1956)".

- Citation details are correct: Cartwright D, Harary F (1956), "Structural balance: a generalization of Heider's theory", Psychological Review 63(5): 277-293, doi 10.1037/h0046049. The paper does state the structure theorem (balanced iff the points split into two sets, + inside, - across).
- But "due to" is a priority claim, and the theorem was first proved by Harary alone: F. Harary, "On the notion of balance of a signed graph", Michigan Mathematical Journal 2(2): 143-146 (1953) (the "Harary balance theorem" in graph theory). Cartwright and Harary (1956) brought it to social psychology. The claim's own source line says E&K credits Harary as well as Cartwright and Harary.
- FIX (builder): claim text -> "... it holds for any number of people; Harary proved it (1953), and Cartwright and Harary (1956) applied it to groups of people." Demo.tsx reveal paragraph 3 -> "This is the balance theorem (Harary, 1953; Cartwright and Harary, 1956), and it holds for any number of people." Then set c6 back to unverified for re-check.
- Evidence: web search only (search-quoted Wikipedia "Signed graph" and "Balance theory", UMich deep blue record, U Toronto CSC303 and Cornell INFO 2040 notes). Every full-text host (Cornell, CUHK mirror, APA, arXiv, Wikipedia) returns a proxy 403 or DNS failure from this session, so I could not read either paper. Medium-high confidence: the 1953 priority is consistent across all sources found. The year is printed as 1953 (volume 2, 1953-54); one source gives 1954.

Confidence: high on c1-c5 (exhaustive enumeration); c6 statement high, attribution medium-high.


## Pass NCM-2 (2026-10-14)

Checker: fact-checker (did not write these claims). Scope: every claim still `unverified` after the builder's revision. Method: read the current Demo.tsx (predict, stage text, readouts, reveal and the milestones that gate it) and model files, then re-ran the lesson's own code in node 22 via tsx (Demo.tsx copied to scratchpad with its internals exported, CSS import stubbed; model/abm files imported directly). Reveal check: every number or sentence the reveal prints was traced to a state the milestones guarantee the learner reached, or to a claim. The walkthrough transcript predates this revision (08:4x vs Demo.tsx 09:xx), so the stage was read from code, not from a fresh walkthrough.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | Harary, 'On the notion of balance of a signed graph', Michigan Math. J. 2(2): 143-146 (1953) confirmed by search (one secondary source labels it 1954; journal details give 1953). Cartwright and Harary 1956 confirmed in NCM-1 (Psychol. Rev. 63(5): 277-293). The NCM-1 fix is applied in the claim and in reveal paragraph 3 ('Harary, 1953; Cartwright and Harary, 1956'). Theorem statement re-checked for n = 5 (16 balanced settings, all one or two camps). Primary papers not opened. |

**Reveal check:** NCM-1 fix applied in reveal paragraph 3. Reveal paragraph 1 quotes only settings the learner reached by tapping. No unbacked sentence.

**Result:** 1 verified this pass, 0 disputed, 0 withdrawn. Lesson now: 6 verified.
