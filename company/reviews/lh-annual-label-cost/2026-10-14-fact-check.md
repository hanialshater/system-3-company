# Fact check: lh-annual-label-cost

## Pass LH-1 (pre-merge, read-only)

Checker: fact-checker (Ingrid). Date: 2026-10-14. Read via git show origin/codex/lifehacks-200; nothing checked out or run from the PR. Learner-visible text: src/lib/lifehacks/resource-specs.json plus the stage component. External hosts are proxy-blocked here (403 on CONNECT), so cited pages were not opened unless stated.

**What I checked.** A = 200*2*0.3 = 120, B = 210 at 2 years; recall x=5 gives B = 525; full scale 1,050 (350*10*0.3). Keyed 200kWh/year (120 < 210) correct. The c5 formula kWh = W x h / 1000 and cost = kWh x price is standard and matches the South Australian Government calculator found by search, but the cited energy.gov.au page is unreachable and did not appear in search, so its section titles were not confirmed.

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Declared inputs and limits equal the learner-visible question and assumptions line in resource-specs.json. Convention only; no real-world figure asserted. |
| c2 | verified | Re-derived both formulas in node from the AST in resource-specs.json: the values in the claim (start and recall) match, the keyed answer is consistent, and the stated full scale equals the max over the slider range. Boilerplate sentence "Geometry follows..." is inert in non-geometry lessons. |
| c3 | verified | Principle follows from the AST and stated limits (re-derived). |
| c4 | verified | Recall answer re-derived in node at the recall input; the keyed option equals the computed value. NOTE: the learning-designer recall patch (company/reviews/lifehacks-200/recall-patch-resources.json) replaces this recall after merge; c4 must be re-checked then. |
| c5 | unverified | Source unreachable: energy.gov.au blocked (403) and the cited page/sections did not appear in search. The arithmetic (kWh = W x h / 1000; cost = kWh x price) is standard and matches sa.gov.au/energy/runningcosts (found by search, not fetched). Re-check from a connected host, or swap the source to a reachable government calculator page. |

Unrecorded learner-visible factual sentences: None found beyond the hook and title, which restate the prediction scenario recorded in c1.

Verdicts apply to meta.json after the merge (machine-readable: company/reviews/lifehacks-200/fact-check-B6.json). Independence: I did not write or edit this lesson.
