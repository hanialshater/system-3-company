# Fact-check: keep-one-of-a-stream (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, reveal, model) against each open claim; re-ran the numbers in node with own re-implementations of the lesson's model (mulberry32 copied from src/kit/random.ts); web sources by search only (the proxy blocked every primary host tried: dl.acm.org, wikipedia, os-book.com, nasa.gov, university hosts). Search-result text is marked as such below.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node exact distribution: item 1 survives 1/2 x 2/3 x 3/4 = 1/4; stage CHAIN builds '1 x 1/2 x 2/3 x 3/4'; reveal matches. |
| c2 | verified | Own node exact enumeration: after 2 [1/2,1/2], after 3 [1/3 x3], after 4 [1/4 x4]; stage bars are 1/k for arrived items (computed, not simulated). |
| c3 | verified | Derivation holds: entry 1/i times survival i/n = 1/n; reveal sentence matches. |
| c4 | verified | Own re-implementation of mulberry32(1) with Demo.tsx loop: TALLY 236, 250, 257, 257; chi-square 1.18; SD sqrt(1000 x 1/4 x 3/4) = 13.7. Reveal and stage quote TALLY. |
| c5 | verified | Own node: seed 1 draws 0.627 (keep 1), 0.003 (keep 3), 0.527 (keep 3); stage shows 'seed 1'. Seed 7 tallies 257, 247, 249, 247 (chi-square 0.27) reproduce. Minor: my median chi-square over seeds 1-200 is 2.39, not 2.41 (source text only; not learner-facing). |
| c6 | verified | Holds from the code (state = kept item + count). Vitter, 'Random sampling with a reservoir', ACM TOMS 11(1):37-57, March 1985 confirmed by search-result text only (dl.acm.org blocked); Knuth TAOCP vol. 2 sec. 3.4.2 (Algorithm R) not opened, from my own knowledge. Learner sentence does not depend on either. |

## Pass 24 (2026-10-14)

Checker: fact-checker. Wave E revisions (build.md Pre-flight read after the code). Method: read Demo.tsx against each open claim, including every reachable branch and the state after Reset/Start over; re-ran the numbers in node with ports of the lesson's own functions (mulberry32 copied from src/kit/random.ts). No web sources were needed: no learner sentence below rests on an unopened source.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Entry 1/i x survival i/k = 1/k re-derived; own node exact distribution: every bar 1/4 at k=4, 1/5 at k=5. Reveal can only open at k=5 (milestone fifth), so it says 'stays with 3/5', which the claim's parenthesis covers; the 1/4 dashes stay on stage. |
| c4 | verified | Own node replay of tally(n) with mulberry32(1) (copied from src/kit/random.ts): tally(4) = 236, 250, 257, 257; tally(5) = 195, 197, 191, 214, 203. Reveal always quotes TALLY[5] (k = 5 at reveal); stage shows TALLY[4] if run at k = 4. Minor, not a fact error: the tally switches from TALLY[4] to TALLY[5] when the 5th item arrives without a re-run. |
| c5 | verified | Own node: mulberry32(1) draws 0.627 (keep 1), 0.003 (< 1/3, keep 3), 0.527 (keep 3), 0.981 (not < 1/5, keep 3); stage line 'Item 5: draw 0.981, needs under 1/5: keep item 3'. |
| c6 | verified | Holds from the code: the rule uses only i and one stored item; at k = 5 every bar is 1/5 (own exact enumeration). Learner sentence rests on the derivation, not on Vitter/Knuth (not opened). |
| c7 | verified | Telescoping product (i/(i+1)) x ... x ((k-1)/k) = i/k re-derived; Demo draws frac(1,i) x frac(i,k), e.g. '1/2 x 2/4' for item 2 at k = 4 (item k shows '1/k x 1'). |
