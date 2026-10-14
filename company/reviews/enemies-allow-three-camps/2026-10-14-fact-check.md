# Fact-check: enemies-allow-three-camps (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, reveal, model) against each open claim; re-ran the numbers in node with own re-implementations of the lesson's model (mulberry32 copied from src/kit/random.ts); web sources by search only (the proxy blocked every primary host tried: dl.acm.org, wikipedia, os-book.com, nasa.gov, university hosts). Search-result text is marked as such below.

Curriculum reference easley-kleinberg-2010 ch. 5 (positive and negative relationships; structural balance and its weaker form): matches, high confidence. The book was not opened (host blocked).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | VERDICT/kindOf: exactly two friendly links = banned; all-enemy allowed. Matches weak balance (Davis 1967, Human Relations 20; secondary search-result text: a complete signed graph is weakly balanced iff no triangle has exactly one negative edge). Davis not opened. Easley-Kleinberg ch. 5 (positive and negative relationships; weaker form of structural balance) placement matches my knowledge. |
| c2 | verified | Own node over 20 triangles, split [0,0,1,1,2,2]: banned 0, one-friend 12, all-enemy 8. |
| c3 | verified | Own node: 2 camps: banned 0, all-enemy 0, one-friend 18, all-friend 2; 6 camps: banned 0, all-enemy 20. |
| c4 | verified | Same-camp is an equivalence relation, so no triangle has exactly two friendly links. |
| c5 | verified | Strong balance bans triangles with one or three hostile links; complete strongly balanced graphs split into at most two groups (balance theorem, Easley-Kleinberg ch. 5, not opened); weak balance allows k clusters (Davis 1967, search-result text). |
| c6 (new, unrecorded) | disputed | Reveal: 'you saw 2, 3 and 6 camps'. other-split fires on any one chip other than 3, so a learner can reach the reveal having seen only two splits. Builder names only viewed splits or drops 'you saw'. |

## Pass 23 (2026-10-14)

Checker: fact-checker (did not write these claims; sentences recorded by an earlier fact-checker session were reworded by the builder or are the builder's own reveal text). Method: read Demo.tsx (predict, stage strings, reveal and every reachable branch) against each open claim, then re-ran every number in my own node copies of the lesson logic (own mulberry32, BigInt roots and modpow, exact Markov chain, union-find). Every external host failed to resolve or was refused, so no source was opened; a claim whose learner content rests only on an outside source is held unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | v2 Demo: see() is called only when all 20 triangles are checked in the current split (Next to 20, Check all, or a chip after checking all), and the reveal names only those as 'you saw'; the others are listed as 'give 0 too'. checked-all always calls see(), so 'seen' is never empty at the reveal. Own count: banned 0 for 2, 3 and 6 camps. |

**Result:** 1 verified, 0 disputed, 0 held unverified, 0 withdrawn.

## Pass 24 (2026-10-14)

Checker: fact-checker (Ingrid). I did not write or build any of these claims. Scope: every unverified or disputed claim after the wave E revisions. Method: read Demo.tsx (predict, stage, every reachable branch, the state after Reset or Start over where the lesson has one, and the reveal gates), then re-ran the numbers in my own node copies of the lesson's logic (kit mulberry32 where seeded). I read the builder's pre-flight only after writing the verdicts. Hosts for primary sources were unreachable (DNS failure), so a row says when a verdict rests on derivation.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own node over all 20 triangles, split [0,0,0,1,1,2], no link: banned 0, one friendly pair 13, all-enemy 6 (3 x 2 x 1), all-friends 1. First triangle in Demo order is A, B, C (all friends). Reveal's first sentence prints only when 3 camps is in 'seen'. |
| c4 | verified | Same-camp is an equivalence relation, so no triangle has exactly two friendly links (own node: 0 banned in 2, 3 and 6 camps). verdict() for A, B, C finds mid = A and prints 'B and C are both A's friends, so same camp, so friends. Allowed.' |
| c6 | verified | v3 Demo: see() runs only with all 20 checked and no B-D link; the reveal lists only 'seen' splits, sorted. Traced the edge path where checked-all is reached with the link on: 'seen' can then be empty, and the reveal falls back to 'any number of camps is stable.' with no 'you saw'. True on every path. Own counts: 0 banned for 2, 3 and 6 camps. |
| c7 | verified | Own node with link (B, D): 3+3 -> 4 banned (ABD, BCD, BDE, BDF); 3+2+1 -> 3 (ABD, BCD, BDE); six camps -> 0 (caption 'nobody has two friends'). verdict(ABD) puts B in the middle: 'A and D are both B's friends but enemies. Banned.' The reveal's example is the first banned triangle, ABD, in both splits. |

**Result:** 4 verified, 0 disputed, 0 held (unverified), 0 withdrawn.
