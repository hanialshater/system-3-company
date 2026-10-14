# Fact-check: weak-links-hold-it-together (2026-10-14)

## Pass 23 (2026-10-14)

Checker: fact-checker (did not write these claims; sentences recorded by an earlier fact-checker session were reworded by the builder or are the builder's own reveal text). Method: read Demo.tsx (predict, stage strings, reveal and every reachable branch) against each open claim, then re-ran every number in my own node copies of the lesson logic (own mulberry32, BigInt roots and modpow, exact Markov chain, union-find). Every external host failed to resolve or was refused, so no source was opened; a claim whose learner content rests only on an outside source is held unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own re-implementation (mulberry32, overlap, seeded tie keys): seeds 1, 3, 5, 6, 7 are the first five that start in one piece; weakest-first 20% leaves 10, 20, 10, 10, 10; strongest-first 20% leaves 60 in all five. Note (non-blocking): the reveal quotes the learner's level when it is 30% or 40% (e.g. seed 3 strongest-first 40% leaves 55); those figures are computed and correct but not in any claim. |
| c2 | verified | The lesson's definition (stage rule text) matches makeNet(): shared neighbours / union of neighbours excluding the two ends. E&K ch. 3 neighbourhood overlap from my knowledge; not opened. |
| c3 | verified | Own run: bridges cut at 20% weakest-first 12, 10, 12, 12, 12 for seeds 1, 3, 5, 6, 7; strongest-first 0 in all. |
| c4 | disputed | DISPUTED (direction). Own run of the lesson's networks: bridges almost all have overlap 0 (the max is 0.13), but most links with few shared friends are inside groups: links with overlap 0 are 18/28/29/24/27 in seeds 1/3/5/6/7, of which only 10/10/12/12/12 are bridges, and the weakest 20% (26-30 links) holds 9-12 bridges. So 'a link with few shared friends usually runs between groups' is false here; the converse is true. Fix (builder, reveal and claim): 'Links between groups almost always have few shared friends, so cutting the weakest links first removes them and breaks the network apart. Close ties sit inside groups, and the groups hold together without them.' |
| c5 | verified | GROUPS 6 x SIZE 10, BRIDGES 12 distinct between-group links in makeNet(); predict text '60 people, 6 friend groups'. |

**Result:** 4 verified, 1 disputed, 0 held unverified, 0 withdrawn.
