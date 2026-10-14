# Fact-check: winning-bid-overpays (2026-10-14)

Board: W-679. Lesson: src/demos/economics/winning-bid-overpays/ (status draft, version 1).

Checker: fact-checker (I did not write these claims). Method: I read Demo.tsx on every reachable path before I read the claims: locked state, each control in every order, Reset, the sliders' full range, and the dynamic strings in the stage, Seen line and reveal. Then I re-ran every number in node from my own copies of the lesson logic (scripts in artifacts/fact-check-wave-j/wj-econ-phys-math-geo/; the geography models were run from type-stripped copies of model.ts and solar.ts). No economics check script exists under company/domains/briefs/checks/, so I re-ran the brief's inline Check lines (company/domains/briefs/economics.md #60-#64). The dev server was not used (the dispatcher's instruction). Web: only PyPI, npm, GitHub raw files and public git clones were reachable. Sources opened for this batch: None needed: every claim is arithmetic, a derivation or a lesson rule.

Unrecorded claims: I compared every learner-visible sentence (title, hook, question, options, stage labels, Seen line, reveal, recall) with the claims list. None found. The recall question was checked against the claims it rests on (see the notes).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Simulation, re-run with the kit's mulberry32(1) copied from src/kit/random.ts: average guess 99.165, average winning bid 116.526, 20 of 20 overpaid. Seeds 7 and 42: 117.19 and 115.97, 20 of 20 each, so the picture does not depend on the seed. artifacts/fact-check-wave-j/wj-econ-phys-math-geo/bid.mjs. |
| c2 | verified | Simulation, same run: 2 bidders 105.415 (12 of 20); 20 bidders 118.556 (20 of 20). |
| c3 | verified | Derivation: for n independent U[-20, 20] errors, E[max] = 20(n - 1)/(n + 1): 6.67, 16.36 and 18.10 for n = 2, 10, 20, increasing in n. A Monte Carlo of 200,000 auctions of 10 bidders gives 16.38. |
| c4 | verified | Lesson rule, checked against simulate(): the guess is 100 + U[-20, 20), each bidder bids its guess, and the highest bid wins and pays it. 'Winner's curse' and the 1971 oil-lease history are not in the learner text. |

**Result:** no disputes. All claims verified.
