# Fact-check: cut-the-busiest-link

Independent claim checks for src/demos/cs/cut-the-busiest-link. Newest pass at the bottom.

## Pass 35 (2026-10-14)

Checker: fact-checker, a fresh instance that did not write these claims. Method: I read Demo.tsx first, covering every reachable path, the reset and reduced-motion states and every learner-visible string. Then I read the claim text and support, and only then the source fields. I re-ran the numbers in my own node ports of the lesson logic (session scratchpad fc35b1/), using the repo's own d3-geo, topojson-client and TypeScript where the lesson does. No builds and no screenshots. No verdict rests on an unopened source: every external host failed (WebFetch DNS failure, proxy 403).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own port of loads() plus an independent brute force that lists every shortest path per pair and gives each 1/k: both give 5–6 = 12, 3–7 = 12; the largest other link is 5 (0–3, 0–5, 2–3, 1–5). The two methods agree on 3,543 sampled cut sets (0 mismatches). |
| c2 | verified | Own port: cut 5–6 gives 3–7 = 24 and 0–3 5 → 12.5 (the largest inner change, so the trace names it); cut 3–7 gives 5–6 = 24 and 0–5 5 → 12.5. Enumerated all 10,608 connected inner-cut states the learner can reach before the first bridge cut: the remaining bridge always carries exactly 24 after it, and 5 to 19 before it, never more. So the reveal's 'doubled to 24' / 'rose to 24' branch is never false. |
| c3 | verified | pieces(): with 5–6 and 3–7 both cut and nothing else, there are 2 components, {0..5} and {6..9}, so isGroups is true, sizes 6 and 4. Any other disconnection freezes the stage with 'A piece broke off, not the two groups', so the 'two groups of 6 and 4' text only shows on that state. |
| c4 | held unverified | The reveal sentence matches the claim. Attributing the cut, recount, repeat procedure to Girvan–Newman rests on Girvan and Newman 2002 (PNAS) and Easley and Kleinberg ch. 3. Neither could be opened (DNS failure, proxy 403). 'Goes stale after every cut' is shown on stage (c2), but the attribution needs the source. Left unverified. |
| c5 | verified | Convention matches the code: loads() loops a < t (each unordered pair once) and adds sg[a][u]·sg[t][v]/sg[a][t] per edge, i.e. the pair's 1 split evenly over its shortest paths. My independent path enumeration gives identical labels. Stage legend: 'Number on a link: shortest paths it carries.' The Brandes and Girvan–Newman names are in the source field only, not on stage. |

**Result:** 4 verified, 0 disputed, 1 held unverified (no source could be opened; board W-511, evaluation-steward).

## Pass 38 (2026-10-14, set A)

Checker: fact-checker. I wrote and built none of these claims. Scope: every open claim in this lesson (set A of pass 38: ai, cs, math, physics, probability, economics, geography, lifehacks). Method: I read Demo.tsx (or the Life Hacks spec and engine) first, every learner-visible string, then the claims. I re-ran every number in my own node scripts (scratchpad fc38/: cluster.mjs, enemy.mjs, secret.mjs, plus inline runs), not imported from the lesson. Web: arxiv, publisher, government, Wikipedia and help-centre hosts return proxy 403 or fail DNS. Only raw.githubusercontent.com, PyPI and npm are reachable, so the sources I opened are files on GitHub (OpenStax CNXML, MicrosoftDocs, NetworkX, d2l, GRASS, GNOME/KDE source, the authors' own repositories, a papers-we-love PDF), each named in its row. Search-result snippets were not used as evidence. A claim whose source I could not open stays unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | VERIFIED on an opened source: NetworkX girvan_newman() (raw GitHub networkx/networkx, networkx/algorithms/community/centrality.py, opened 2026-10-14). Its docstring says the Girvan–Newman method 'removes the ... edge with the highest betweenness centrality, at each step', and its default most_valuable_edge() calls edge_betweenness_centrality(G) again on the cut graph each time. So the method recounts after every cut. Demo.tsx defines a link's number as its edge betweenness (Brandes), so 'busiest link' means highest betweenness. Girvan and Newman 2002 (PNAS) and E&K 3.6 were not opened. |

**Result:** 1 verified, 0 disputed, 0 held (unverified), 0 withdrawn.
