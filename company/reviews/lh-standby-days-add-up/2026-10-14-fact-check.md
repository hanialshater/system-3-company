# Fact-check: lh-standby-days-add-up (A tiny load accumulates)

## Pass LH-1 (pre-merge, read-only)

Checker: fact-checker (Ingrid). Date: 2026-10-14. Batch B8 of PR #2 (origin/codex/lifehacks-200; untrusted contributor content, read via git show only, nothing checked out, built or run). Method: the claims in src/demos/lifehacks/lh-standby-days-add-up/meta.json compared with the learner-visible text from src/lib/lifehacks/resource-specs.json (title, question, options, details, assumptions, principle, recall) and the stage and reveal templates in src/components/lifehacks/ResourceLesson.tsx and src/lib/lifehacks/resource-model.ts. I did not read the contributor's review records. Arithmetic re-derived in node with an independent oracle over the whole slider range (100 to 400, step 1), plus the prediction answer and the recall answer. Verdicts are to be applied to meta.json after the merge.

Question as shown: A constant illustrative 2W load runs for either 24h/day or 1h/day. Over 365 days, which accumulates more energy? Marked answer: 24h/day (re-derived at the start value, correct).

| Claim | Support | Verdict | Note |
|---|---|---|---|
| c1 | convention | verified | Declared hypothetical; W x h / 1000 conversion correct. The assumptions line shows "EUR 0.30/kWh" but the stage never uses a price (cosmetic: remove it from the assumptions string). |
| c2 | derivation | verified | Re-derived in node against an independent integer/decimal oracle at every slider stop (100 to 400, step 1): both formulas equal at 3-decimal display. Start values in the claim text match. |
| c3 | derivation | verified | Claim text is identical to the principle shown at reveal. Each sentence re-derived by hand and in node; no hidden assumption. |
| c4 | derivation | verified | Recall answer re-derived in node; marked option is the only correct one among three distinct options; claim text matches the learner-visible question and why. |
| c5 | source | unverified | Source https://www.energy.gov.au/households/energy-rating unreachable from this environment (proxy 403 on CONNECT; WebFetch DNS failure). The formula kWh = W x h / 1000 and cost = kWh x price is the definition of the kilowatt-hour and is correct; a search surfaced sa.gov.au's appliance running-cost estimator using watts and hours the same way, but I could not read the cited page or its section headings, so the citation itself is unchecked. |

Unrecorded learner-visible factual sentences: none of substance. The "Full scale: ..." caption and the reveal's "At the prediction's ..., A gives ... and B gives ..." sentence come from the same model and are covered by c2.

Blocking: no dispute. c5 stays unverified until the energy.gov.au page can be read (source unreachable from this environment).
