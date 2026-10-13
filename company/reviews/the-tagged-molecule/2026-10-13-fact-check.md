# Fact-check: the-tagged-molecule (2026-10-13)

Checker: fact-checker. Method: re-computed in artifacts/scratch/fc-cschem/; read walkthrough transcript and learner-visible text.

| Claim | Result |
|---|---|
| c1 | Verified: dynamic equilibrium, equal forward and reverse rates, totals steady (IUPAC Gold Book). |
| c2 | Verified by re-running the lesson's step(): in 500 runs of 18 ticks every tick flips exactly 12 A and 12 B (24 of 100) and the count stays 50/50 (0 deviations); per-molecule flip chance 12/50 = 24%; a tagged molecule flips on average 4.37 times in 18 ticks (expected 4.32; range 0-10 over 500 seeds). The lesson's own seed (31337) gives 3 flips in 18 ticks, the number quoted in the transcript: ordinary, within the spread, not a chosen extreme. |
| c3 | Verified: the model forces exact balance each tick; in a real mixture counts fluctuate about as sqrt(N) around the balanced average. The reveal says so. |
| c4 | DISPUTED (small, blocks until fixed). As written ('read from the learner's own run') the count is right when the original tag is kept: it is the number of type changes in the tagged molecule's stored history. But the sentence the stage prints is 'Your tagged molecule(s) changed type N times in T ticks', where T is the lesson's total tick count and N sums the stored histories. toggleTag() starts a new tag's history at the moment it is tapped (and drops the history of any molecule untagged), so a molecule tagged at tick 10 of 18, or the original tag removed and another added, makes the sentence report changes over fewer ticks than T. The exploreHint invites tapping other molecules to tag them, so this state is reachable in normal play. Fix for demo-builder: keep the tick at which each tag started and print 'in the N ticks since you tagged it' (or sum per molecule 'ticks followed'), or start every history at tick 0 for all molecules. |

With the default single tag followed from the start, the transcript sentence ('3 times in 18 ticks') is exact. Recall is correct. No unrecorded claims.

## Pass 3 (2026-10-13)

Checker: fact-checker. Scope: claims open (unverified) in this lesson that were not added by a fact-checker, including builder-rewritten claims after claim fixes. Method: re-derived numbers in node from the Demo.tsx model code, compared each claim with what the stage and reveal text actually say, checked cited sources (web search where reachable; the BoE, NASA and UN hosts were not directly reachable from this sandbox).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c4 The reveal's count of how many times the tagged molecules changed type... | verified | Read Demo.tsx: followed = sum(hist.length - 1) over tags; wording matches the single/multiple tag branches. Stage text "12 A became B and 12 B became A: about a quarter" matches FLIPS = 12 of N = 100. |

Result: 1 verified, 0 disputed, 0 added unverified.
