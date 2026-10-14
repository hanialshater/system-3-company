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

## Pass NCM-3 (2026-10-14)

Checker: fact-checker (did not write these claims). Scope: every claim still `unverified` after the final-polish revisions, plus a fresh read of every predict, stage label and reveal sentence against the claims. Method: diffed Demo.tsx/model since the NCM-2 record (commit 319d2bda), re-ran the lesson's current code in node 22 via tsx (model files imported directly; Demo-only functions reproduced verbatim or re-implemented independently), and traced each reveal sentence to a milestone-guaranteed state or a claim. No fresh walkthrough: the transcripts predate the v3 commits and a build was not attempted in this shared checkout, so stage text was read from code.

No open claims. v3 added legend swatches and a screen-reader live line ("n of 10 trios unbalanced; camps ..."), computed from the same unbalancedTrios() and camps() as the readouts. No reveal text changed. Re-read predict and reveal against the verified claims; no new learner-visible claim found.

**Result:** 0 status changes.

## Pass NCM-5 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read the current Demo.tsx at HEAD 3e1fb604 (predict, stage text, readouts, reveal, and the milestones and pins that gate it), re-ran the lesson's rule in node 22 via tsx (model files imported directly, or the Demo.tsx function reproduced verbatim), and traced each reveal sentence to a milestone-guaranteed state or a claim. No fresh walkthrough: the transcripts predate this revision and no build was run in the shared checkout, so stage text was read from code. Scope: re-read c3 after the told-vs-shown rewording (status stayed verified; source rewritten by demo-builder).

| Claim | Check | Result |
|---|---|---|
| c3 | Node over all 3,125 camp labelings of 5 people (31,250 trios): a trio is unbalanced exactly when its three people sit in three different camps (0 mismatches). Reveal para 1 now lists seen.three.trios, recorded from the setting the stage showed (names under the readout appear for 1-4 unbalanced trios; three camps always leave 3 or 4), then 'Each takes one person from each camp, so all three pairs are −'. Preset ABC | D | E gives ADE, BDE, CDE. Claim text unchanged; meaning matches the new wording. | verified (stands) |

Reveal check: para 1 quotes zero-unbalanced splits ('zero'), the not-camps count ('mixed') and the three-camps trios ('three', built by tap); para 2 is c2/c3/c4; para 3 is c6.

Result: 0 status changes (c3 re-attested). Lesson: no open claims.

## Pass 38 (2026-10-14, set A)

Checker: fact-checker. I wrote and built none of these claims. Scope: every open claim in this lesson (set A of pass 38: ai, cs, math, physics, probability, economics, geography, lifehacks). Method: I read Demo.tsx (or the Life Hacks spec and engine) first, every learner-visible string, then the claims. I re-ran every number in my own node scripts (scratchpad fc38/: cluster.mjs, enemy.mjs, secret.mjs, plus inline runs), not imported from the lesson. Web: arxiv, publisher, government, Wikipedia and help-centre hosts return proxy 403 or fail DNS. Only raw.githubusercontent.com, PyPI and npm are reachable, so the sources I opened are files on GitHub (OpenStax CNXML, MicrosoftDocs, NetworkX, d2l, GRASS, GNOME/KDE source, the authors' own repositories, a papers-we-love PDF), each named in its row. Search-result snippets were not used as evidence. A claim whose source I could not open stays unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | VERIFIED (v4). Own node over all 3,125 camp labelings of 5 people (31,250 trios): a trio is unbalanced exactly when its three people are in three different camps (0 mismatches). Three camps of 5 leave 3 (3/1/1) or 4 (2/2/1) such trios, so the reveal always lists them (<= 4). Each has one person from each camp: three − pairs. 'So three camps never balance' follows. |
| c6 | unverified | HELD. The theorem statement is right: own enumeration of all 1,024 sign settings of 5 people gives 16 balanced, all one or two camps, and the general proof (split by friends and enemies of any one person) holds for any n. The attribution 'Harary, 1953' is learner-visible. Earlier passes confirmed it by search snippet only; No source that supports it could be opened from this host: the cited hosts return proxy 403 or fail DNS, and only GitHub raw, PyPI and npm are reachable. I did not verify it from memory or from search snippets. |

**Result:** 1 verified, 0 disputed, 1 held (unverified), 0 withdrawn.
