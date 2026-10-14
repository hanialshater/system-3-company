# Fact-check: stag-needs-three-in-four (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones and reachable fallback branches) against each claim, then re-ran the numbers in my own node scripts (scratchpad fc22/). Network to primary sources is blocked (Wikipedia, Google Patents, NIST, Cornell and other hosts return 403); where a claim rests on a source, the basis says whether it was corroborated by search snippets, taken from my own knowledge (Easley & Kleinberg chapter placement), or not checked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | 4p vs 3: 4 x 0.5 = 2; 4p = 3 at p = 0.75; THRESH = 3/4 x 100 = 75 in Demo. |
| c2 | verified | Own best-reply check of the 4 cells: partner S -> S (4 > 3), partner H -> H (3 > 0): (S,S) and (H,H) are the pure Nash equilibria; (S,S) Pareto-dominates. |
| c3 | verified | Search snippets of Skyrms, The Stag Hunt and the Evolution of Social Structure (Cambridge UP, 2004) publisher/review pages: it starts from the story in Rousseau's Discourse on Inequality. E&K ch. 6 'Games' (stag hunt among coordination games) from own knowledge, confident. |
| c4 | verified | Chip 'Model: invented payoffs, one partner' and reveal muted line. |

**Result:** all open claims verified; lesson has no unverified or disputed claims.

## Pass 24 (2026-10-14)

Checker: fact-checker (Ingrid). I did not write or build any of these claims. Scope: every unverified or disputed claim after the wave E revisions. Method: read Demo.tsx (predict, stage, every reachable branch, the state after Reset or Start over where the lesson has one, and the reveal gates), then re-ran the numbers in my own node copies of the lesson's logic (kit mulberry32 where seeded). I read the builder's pre-flight only after writing the verdicts. Hosts for primary sources were unreachable (DNS failure), so a row says when a verdict rests on derivation.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own best-reply check: against S, S (4 > 3); against H, H (3 > 0); so (S,S) and (H,H), and (S,S) is preferred by both (4 > 3). Both boxes are ticked at the reveal because the 0% and 100% milestones are required. |
| c4 | verified | Chip 'Model: invented payoffs, one partner as sure of you as you are of them'; muted reveal line 'Invented payoffs in a simplified model'. Payoffs-only is the Demo's model; nothing else enters bestAt(). |
| c5 | verified | bestAt(0): 0 < 3 -> hare; bestAt(100): 4 > 3 -> stag. With symmetric belief the partner gives the same reply: (3, 3) and (4, 4). Boxes 'both hare: 3 each' / 'both stag: 4 each'. |

**Result:** 3 verified, 0 disputed, 0 held (unverified), 0 withdrawn.
