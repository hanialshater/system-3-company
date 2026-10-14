# Fact-check: bridge-carries-news-not-habits (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones and reachable fallback branches) against each claim, then re-ran the numbers in my own node scripts (scratchpad fc22/). Network to primary sources is blocked (Wikipedia, Google Patents, NIST, Cornell and other hosts return 403); where a claim rests on a source, the basis says whether it was corroborated by search snippets, taken from my own knowledge (Easley & Kleinberg chapter placement), or not checked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own independent simulation (simultaneous rounds, threshold >= 1/2): habit rounds add [2,3], [4], [] -> 5 people; reveal prints FINAL.habit.round - 1 = 2. |
| c2 | verified | Own simulation: at the stuck state Ben 1/5 (20%), people 6-9 0/4 each. |
| c3 | verified | Own simulation, threshold >= 1 friend: rounds add [2,3,4], [5], [6,7,8,9] -> all 10 in 3. |
| c4 | verified | Graph has one cross edge (4-5); Ben needs ceil(5/2) = 3 adopting friends and only 1 can come from A. |
| c5 | disputed | Centola & Macy, 'Complex Contagions and the Weakness of Long Ties', AJS 2007 confirmed by search snippet (UPenn repository, UVM preprint; volume/issue 113(3) not shown, matches my memory). But that paper's result is from network models and simulations ('as adoption thresholds increase, long ties can impede diffusion'), and E&K ch. 19 'Cascading Behavior in Networks' (placement from own knowledge, confident) is also a model treatment. Neither supports 'Researchers find the same split in real networks', an empirical claim. Fix (builder): 'Network researchers argue the same split holds in real networks: ...' or 'Models of real networks show ...', or cite an empirical source a checker can open (e.g. Centola 2010, Science 329, an online experiment) and keep the wording to what it found. |

**Result:** 1 disputed claim(s); lesson cannot publish until the builder fixes the stage or the wording and a fact-checker re-checks.
