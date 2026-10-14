# Fact-check: new-road-slower-trip (2026-10-14)

## Pass NCM-1 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage text, readouts, reveal, recall) first, then re-ran the lesson's own code in node 22: the scripts extract the constants and the model function verbatim from Demo.tsx (and mulberry32 from src/kit/random.ts) rather than re-typing them (scratchpad `fc2/`). No walkthrough transcript exists for this slug (artifacts/walkthroughs/ has none), so the stage was read from code. Web: the egress proxy DNS-fails or 403s uvm.edu, toronto.edu, pubmed, europepmc, crossref, cambridge.org and library catalogues; sources were checked through web-search results (quoted abstracts, reference lists, publisher records), as each row says. Easley and Kleinberg: chapter titles from search-quoted catalogue/course pages; no section number confirmed from the book, so every section stays `section_unconfirmed`. (No randomness in this lesson; checks are algebra plus a read of run() and the reveal gating.)

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | busyCars/newRoute/oldRoute and the pills (cars/100 on S-A and B-E, 45 on A-E and S-B, 0 on A-B) match the claim and the predict question. |
| c2 | verified | 2000/100 + 45 = 65. |
| c3 | verified | new 40 + s/100, old 65 + s/200, new faster iff s < 5,000; five rows recomputed. |
| c4 | verified | Stronger than the builder's grid search: with the link, the new route minus either old route = (other busy load)/100 - 45 <= 40 - 45 < 0 at every split, so it is strictly dominant and the all-on-new state (80) is the unique equilibrium. run() goes 0 -> 4,000 in 4 steps. The reveal needs "nobody-gains" (k >= 4,000), so it always prints the 4,000 state. |
| c5 | verified | Deviator: 4,000/100 + 45 = 85; oldRoute(4000) = 85. |
| c6 | verified | 80 - 65 = 15. Each move happened only while newRoute < oldRoute. |
| c7 | verified | Braess (1968), Unternehmensforschung 12: 258-268, doi 10.1007/BF01918335 (Springer record via search; English translation Transportation Science 39(4), 2005). E&K ch. 8 "Modeling network traffic using game theory" (catalogue). The 4,000-driver x/100 and 45 network (65 -> 80, 85) is reproduced in course notes and summaries; the E&K page itself was unreachable, so "the textbook example" is medium. Only "Braess's paradox" (the name) reaches learners. |
| c8 | verified | Link cost 25: new route 65 + s/100 is never faster than 65 + s/200; the trip stays 65. |
| c9 | verified | Total cost sa^2/100 + be^2/100 + 45(a+b) is symmetric and convex; even-split average (260000 - 5s + s^2/200)/4000 is minimised at s = 500: 64.6875. |
| c10 | verified | "Can" statement shown by c4/c6; recall answer and why match. |

**Result:** 10 verified, 0 disputed, 0 withdrawn.
