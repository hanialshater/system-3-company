# Fact-check: long-cord-knots-itself

## Pass LH-1 (pre-merge, read-only)

Date: 2026-10-14. Checker: fact-checker (Ingrid). Source: `origin/codex/lifehacks-200` read with `git show`; nothing checked out, built or run from the PR (models re-run in node from a copy of home-models.ts / home-lessons.ts). Lesson text compared with meta.json: claims c1-c5 equal the rendered idea / limit / formula / question / recall text (c5 and recall.why are the custom recall for this lesson). Status changes below are NOT applied to meta.json (lessons not in our tree yet); the machine-readable verdicts are in `company/reviews/lifehacks-200/fact-check-B2.json`, to be applied after the merge.

Model: `cord`. Slider Length 30-400cm, default 30.

| Claim | Status | Note |
|---|---|---|
| c1 | verified | Raymer & Smith 2007 PNAS 104(42):16432-16437: standard 0.30 m cubic box, 1 rev/s, 10 s; no knots for L<0.46 m; Table 1 gives 55% for a 3 m string in the 0.30 m box. Confirmed from search-engine excerpts of the paper text (PNAS and UCSD copies). Direct fetch of the cited mit.edu PDF was blocked by the proxy (403), so that URL and the page numbers p.16432/p.16435 were NOT opened by me. The 0.3 m lesson string is below the 0.46 m cutoff, so 'no observed knots' is right. |
| c2 | verified | Accurate scope limit. |
| c3 | verified | Node: seed 17 gives 0/20 at p=0 and 13/20 at p=0.55 (not 11/20). The formula text is correct. ADVISORY: the stage and reveal show 13/20 = 65% beside the idea text '55% of reported trials'; a learner may read 13/20 as the paper's rate. Suggested fix: choose a seed (or state 'one sample of 20: 13') so the displayed count is 11/20, or add 'this sample happened to give 13/20; the paper's rate is 55%'. |
| c4 | verified | Prediction question; keyed answer index 1 ('3m string') confirmed against the model output. |
| c5 | verified | Hypothetical 11/20=55% checked; keyed option correct and labelled hypothetical. |

### Unrecorded learner-visible sentences
- Reveal sentence 'At seed 17, the study-conditioned model gave 13/20 at 3m, and 0/20 at 0.3m.' is learner-visible and has no claim. Value re-derived (13/0). Record it as a claim (derivation) with the 13/20-vs-55% fix above.
- Title 'Long cord, more loops' is unclaimed; the paper supports 'longer strings knot more' (above 0.46 m, saturating near 50%), not 'more loops'. Suggest a title such as 'Longer cord, more knots (in a tumbling box)'.
- Reveal line 'Your prediction held. / Not quite. The current <layout> setting gives <value><unit>.' and the stage readouts (input line, result label) are generated from the model; they restate c3 and are correct, but are not recorded as claims.

### Verdict
All claims verified pre-merge; no disputes. Cross-cutting: recall options for this lesson are specific and the keyed answer is correct.
