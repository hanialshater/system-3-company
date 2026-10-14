# Fact-check: two-pages-swallow-the-rank (2026-10-14)

Board: W-657. Lesson: src/demos/cs/two-pages-swallow-the-rank/ (status draft, version 1).

Checker: fact-checker. I did not write these claims. Method: I read Demo.tsx and model.ts on every reachable path before reading the claims: locked state, presets in any order, Reset, seeds, the milestones that gate the reveal, and the reveal's dynamic strings. Then I re-ran every number in node 22 (--experimental-strip-types) from copies of the lesson's own code. CS lessons use a copy of model.ts. Life lessons use the non-JSX top of Demo.tsx cut out with sed, plus a copy of src/kit/random.ts. Independent loops cross-check where noted. Scripts: artifacts/fact-check-wave-j/wj-cs-life/. I did not use the dev server. No walkthrough transcript exists for this slug yet, so the stage was read from code. Web: only PyPI, npm and GitHub raw are reachable, and every source verdict below names the file I opened.

Unrecorded claims: I compared the hook, question, options, stage text, reveal and recall against the claims list and found none unrecorded.

Reachable paths covered: initial round 0 (33.3% each pair, both rules), 5 or 50 rounds with or without jumps in any order; the trace line keeps both 50-round results, and the milestones basic-50 and jumps-50 gate the reveal. So both reveal numbers are always on the stage.

Sources: I could not open Page et al. (1999), Easley and Kleinberg ch. 14 (section 14.3) or Brin and Page (1998). cornell.edu returns 403, ilpubs.stanford.edu does not resolve, and I found no GitHub raw copy. networkx's pagerank_alg.py (opened) confirms only the 1999 title and the default damping of 0.85. Web-search snippets attribute 'rank sink' to the 1999 report, but no verdict rests on them.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Read LINKS in model.ts: A->B, B->C, C->A, C->D, D->E, E->F, F->E. E and F have no out-link to A-D. The stage draws exactly these arrows from LINKS. |
| c2 | verified | Re-ran scores()/sinkShare() (node 22 strip-types, copy of model.ts) and an independent power iteration: E+F 79.2% at 5, 93.8% at 10, 99.3% at 20, 100.0% at 50 (E 0.4444, F 0.5556, A-D 0.0000), total 1.000000 every round. Round 0 (initial state) shows 33.3%. Reveal quotes sinkShare(50,false) and A-D = 0.0%, reached by milestone basic-50. |
| c3 | verified | Re-ran scores(r,true) and an independent loop: E+F 64.8% at 5, 69.85% at 50 and 200; A 0.0644, B 0.0798, C 0.0928, D 0.0644. Every page keeps at least 0.025 a round, so 'every page kept some' holds. Stage line '15% of each score jumps to a random page' matches the model (spread over all 6). The Brin and Page 0.85 attribution in the source field is not on the card and was not opened. |
| c4 | held (unverified) | Held. First half verified by derivation: no link leaves E or F, so under s = 1 their combined score never falls (checked monotone in rounds 0-60). The name 'rank sink' is a terminology claim and needs a source: Page, Brin, Motwani and Winograd (1999) and Easley and Kleinberg ch. 14 could not be opened (ilpubs.stanford.edu does not resolve, cornell.edu 403, no GitHub raw copy found). Web-search snippets attribute the term to the 1999 report, but no verdict rests on them. Fix: an openable source, or drop 'That is a rank sink.' |
| c5 | held (unverified) | Held. That 15% random jumps stop the drain is shown by c3 (derivation). That 'scaled PageRank' is the name and that jumps were added to fix this is a source claim: Easley and Kleinberg ch. 14 and Brin and Page (1998) could not be opened. networkx's pagerank docstring (GitHub raw, opened) confirms damping 0.85 and the Page et al. 1999 title, but says nothing about sinks or 'scaled PageRank'. Fix: an openable source, or reword to something derivable such as 'Random jumps fix sinks like this one.' |

**Result:** verified 3, unverified 2.

## Pass 38 (2026-10-14, set A)

Checker: fact-checker. I wrote and built none of these claims. Scope: every open claim in this lesson (set A of pass 38: ai, cs, math, physics, probability, economics, geography, lifehacks). Method: I read Demo.tsx (or the Life Hacks spec and engine) first, every learner-visible string, then the claims. I re-ran every number in my own node scripts (scratchpad fc38/: cluster.mjs, enemy.mjs, secret.mjs, plus inline runs), not imported from the lesson. Web: arxiv, publisher, government, Wikipedia and help-centre hosts return proxy 403 or fail DNS. Only raw.githubusercontent.com, PyPI and npm are reachable, so the sources I opened are files on GitHub (OpenStax CNXML, MicrosoftDocs, NetworkX, d2l, GRASS, GNOME/KDE source, the authors' own repositories, a papers-we-love PDF), each named in its row. Search-result snippets were not used as evidence. A claim whose source I could not open stays unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | VERIFIED on the primary source: Page, Brin, Motwani and Winograd, 'The PageRank Citation Ranking: Bringing Order to the Web' (PDF hosted in the papers-we-love GitHub repository, information_retrieval/, opened 2026-10-14 with pdftotext). Section 2.4: pages that point only to each other 'will accumulate rank but never distribute any rank ... The loop forms a sort of trap which we call a rank sink.' The first half follows from c1 (no link leaves E or F). E&K ch. 14 not opened. |
| c5 | unverified | HELD, close. The mechanism is confirmed in the same opened Page et al. paper: section 6 says E 'is used as a source of rank to make up for the rank sinks', and with //E// = 0.15 'corresponds to a random surfer periodically jumping to a random web page' (the stage's 15%). The name 'Scaled PageRank' in the reveal is Easley and Kleinberg's term (ch. 14), and I could not open that book. To clear it: a checker opens E&K 14.3, or the builder rewords the reveal to 'PageRank adds these jumps to fix sinks', which the opened paper supports. |

**Result:** 1 verified, 0 disputed, 1 held (unverified), 0 withdrawn.
