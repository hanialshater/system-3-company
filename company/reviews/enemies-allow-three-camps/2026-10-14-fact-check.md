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
