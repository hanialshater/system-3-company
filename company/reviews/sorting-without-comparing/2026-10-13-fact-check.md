# Fact-check: sorting-without-comparing (2026-10-13)

## Pass 9 (2026-10-13)

Checker: fact-checker (did not write these claims; c-claims added by an earlier fact-checker pass are quotes of the builder's stage text). Method: read Demo.tsx as rendered text first, then re-derived every number in my own node script (own copies of the sims and mulberry32; scratchpad fc9/check.mjs), and searched sources on the web. Egress to population.un.org, royalsocietypublishing.org, Wikipedia and BioNumbers is blocked (403/DNS).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node: tallies of [3,0,5,2,2,1,4,5,0,3] = 2,1,2,2,1,2; sorted = 0 0 1 2 2 3 3 4 5 5. Demo.tsx derives TALLY and SORTED from SCORES. |
| c2 | verified | Demo.tsx only compares each score with a bucket index (x === b), never score with score; COMPARISONS = 0 is shown. Counting sort is not a comparison sort (CLRS 3e s.8.2). |
| c3 | verified | CLRS 3e s.8.2: counting sort assumes integer keys in 0..k. Stage K = 6 buckets for 0..5. |
| c4 | verified | CLRS 3e s.8.2: k+1 counters, Theta(n + k) time and space. |
| c5 | verified | Demo.tsx options ['0','9','33'], answer 0; reveal explains only 0. |
