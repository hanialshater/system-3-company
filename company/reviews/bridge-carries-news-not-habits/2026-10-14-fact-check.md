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

## Pass 23 (2026-10-14)

Checker: fact-checker (wrote none of these claims; the two new claims are builder sentences recorded word for word). Method: read Demo.tsx (stage, every reachable branch, reveal, predict, plus the meta.json hook and recall card for new lessons) before claim sources; re-ran the numbers with my own node copies of the lesson logic (scratchpad fc23/). Sources: every scholarly host (cornell.edu, arxiv, journals, crossref, openalex, semantic scholar, Wikipedia, UPenn, UVM) was unreachable through the proxy, so no paper or book was opened. A claim that rests only on such a source is HELD as unverified, not verified; claims verified by derivation or simulation say so in their row.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | held (unverified) | The pass 22 wording objection is resolved: 'Network researchers argue ... holds' no longer claims an empirical finding, and the reveal (line 109) matches. But the claim rests only on Centola & Macy (AJS 113(3), 2007, 702-34 per search snippet) and E&K ch. 19, and I could not open either. The UPenn repository, the UVM pdf, the NDG page, the journal, crossref, openalex, semantic scholar and Wikipedia were all unreachable (DNS failure or proxy 403). Search-result summaries of the abstract match the sentence ('as adoption thresholds increase, long ties can impede diffusion'; complex contagions need reinforcement from multiple sources), but a snippet is not an opened source, so per rule I do not verify. Needs: a checker with access opens the abstract, or the builder adds a source a checker can open. |

**Result:** 0 verified, 0 disputed, 1 held this pass; the lesson cannot publish until c5 (unverified) is resolved.

## Pass 24 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: the claim still open from pass 23. Method: read Demo.tsx (the reveal paragraph 3 still carries the sentence verbatim), then tried to open the sources again.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | disputed | Sourcing only. The sentence rests on Centola & Macy 2007 (AJS, doi 10.1086/521848) and E&K ch. 19. Neither could be opened (DNS fails for repository.upenn.edu and journals.uchicago.edu). Search snippets agree, but they are not an opened source. Fix: open the abstract, add an openable source, or drop the sentence (nothing else depends on it). |

**Result:** 0 verified, 1 disputed (c5). Publishing stays blocked on c5.
