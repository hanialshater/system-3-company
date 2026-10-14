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

## Pass 24 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: the claim reworded after the pass 23 dispute. Method: read v2 Demo.tsx (slider, order buttons, New network, readouts, curves, reveal at L = max(level, 2); no Reset) before the source, then replayed all five networks in my own node port (scratchpad fc24/weak.mjs).

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Bridge overlap max 0.13 (in-group mean about 0.3). Weakest-first 20%: 12/10/12/12/12 bridges cut, largest 10/20/10/10/10. Strongest-first 20%: 0 bridges cut, 60 of 60 every time. Direction now correct; rests on the stage only. |

**Result:** every claim open at this pass is now verified.

## Pass 35 (2026-10-14)

Checker: fact-checker, fresh instance (wrote none of these claims). Method: read Demo.tsx v4 first (makeNet, tie-break key stream, SEEDS rule, slider 0-40%, strongest/weakest buttons, New network cycling all five, readouts hidden while locked, curve, the Seen row and the reveal, which always quote the 20% case of the current network; hook and recall), then claim text and support, then source fields. Re-ran makeNet, the seed rule and every cut level for every network with my own node copy using the kit's mulberry32 (fc35/weak.mjs). No source host opened.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own run: seed rule skips 2 (largest 50) and 4 (59), giving SEEDS 1, 3, 5, 6, 7. Weakest-first 20% (26-30 links) leaves largest groups 10, 20, 10, 10, 10; strongest-first 20% leaves 60 in all five. So '10 to 20' and 'all 60' hold for every network the learner can reach with New network. |
| c2 | verified | Verified as the stage's stated rule, on the code: overlap = shared / (deg a + deg b - shared - 2), i.e. shared friends over friends of either end not counting each other; the stage line reads 'Link strength = share of friends in common.' The attribution of this measure to the literature (neighbourhood overlap) is in the source field only; it was not opened and is not the basis of this verdict. |
| c3 | verified | Own run at 20%: weakest-first cuts 12/12 bridges in seeds 1, 5, 6, 7 (networks 1, 3, 4, 5) and 10/12 in seed 3 (network 2); strongest-first cuts 0 in all five. |
| c4 | verified | Own run: bridge overlaps are at most 0.125 (seed 1), 0.091 (seed 3) and 0 in seeds 5, 6, 7, the bottom of the overlap range, so weakest-first reaches them within 20%; strongest-first removes only within-group links and every network stays in one piece at 20% (60 of 60). Scoped 'in the stage's networks', which is what was checked. Note: some within-group links also have overlap 0 (12-18 per network), so 'weak' is not a perfect bridge detector, but the claim does not say it is. |

**Result:** all four open claims verified. No disputes.
