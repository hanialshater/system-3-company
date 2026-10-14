# Fact-check: garment-overlap-hides-face

## Pass LH-1 (pre-merge, read-only)

Date: 2026-10-14. Checker: fact-checker (Ingrid). Batch B1 of PR #2. Source: `origin/codex/lifehacks-200` read with `git show` only; nothing checked out, built or run from the PR (models re-run in node from copies of home-models.ts, home-lessons.ts and studySearch.ts). Learner-visible text (spec idea/limit/formula/question, HomeLesson.tsx / AlphabetSearchLesson.tsx output, meta recall) compared with the claims. Status changes are NOT applied to meta.json (lesson not in our tree); verdicts are in `company/reviews/lifehacks-200/fact-check-B1.json`, to be applied after the merge. External hosts (nist.gov, openstax.org, ginetex.net, rei.com, mit.edu, pnas.org, arxiv.org, wikipedia.org) are blocked by the egress proxy from this environment; none was opened. Web search snippets were used as corroboration only.

Lesson: "Overlap can hide a drying face". Result: 4 verified, 0 disputed, 1 unverified, 0 withdrawn.

| Claim | Status | Note |
|---|---|---|
| c1 | verified | node: 2 sheets x 100x60 x 2 faces = 24000 cm2; overlap 10 / 30 / 60 cm hides 2 x overlap x 60 = 1200 / 3600 / 7200 -> exposed 22800 / 20400 / 16800; separate 24000. Geometry true. SUPPORT NOTE: cited OpenStax page is context only (does not discuss overlap); retype to derivation. |
| c2 | verified | Scope/limit statement; true of this card's code and drawing. |
| c3 | verified | Matches 'overlap' (4ab-2*overlap*b). Re-run in node from home-models.ts (evaluateHome) at min/default/max inputs, before and after. |
| c4 | verified | Predict key checked against the model: Key 1 'Separate' correct. |
| c5 | unverified | Recall (c5): the question is interrogative; the keyed answer is the generic option 0 'Check the mechanism and its stated constraints', which does not answer it. Correct answer: Overlapping hides the touching faces from the air even in the same outline. Pending the learning-designer recall patch (PR #2 blocker 5); re-check the new key then. |

### Unrecorded learner-visible statements
- Reveal line ('Your prediction held. / Not quite. The current <layout> setting gives <value><unit>.') and the stage readouts are generated from the model and restate c3; correct, not separately recorded.
- Title and hook restate c1 / c4. No other factual sentence found without a claim.

### Verdict
No disputes. 1 claim(s) unverified (see table).
Cross-cutting: the recall options are the generic 'Check the mechanism and its stated constraints / Assume the layout always works / Ignore the stated inputs' set; the key does not answer the recall question (c5 left unverified, not disputed, because the learning-designer's recall patch will replace it).
