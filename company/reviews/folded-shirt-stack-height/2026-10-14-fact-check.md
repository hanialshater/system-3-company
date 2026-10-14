# Fact-check: folded-shirt-stack-height

## Pass LH-1 (pre-merge, read-only)

Date: 2026-10-14. Checker: fact-checker (Ingrid). Batch B1 of PR #2. Source: `origin/codex/lifehacks-200` read with `git show` only; nothing checked out, built or run from the PR (models re-run in node from copies of home-models.ts, home-lessons.ts and studySearch.ts). Learner-visible text (spec idea/limit/formula/question, HomeLesson.tsx / AlphabetSearchLesson.tsx output, meta recall) compared with the claims. Status changes are NOT applied to meta.json (lesson not in our tree); verdicts are in `company/reviews/lifehacks-200/fact-check-B1.json`, to be applied after the merge. External hosts (nist.gov, openstax.org, ginetex.net, rei.com, mit.edu, pnas.org, arxiv.org, wikipedia.org) are blocked by the egress proxy from this environment; none was opened. Web search snippets were used as corroboration only.

Lesson: "Half the footprint, twice the stack". Result: 3 verified, 1 disputed, 1 unverified, 0 withdrawn.

| Claim | Status | Note |
|---|---|---|
| c1 | verified | node: height N x 0.4 x layers: N=4 -> 3.2 cm (2 layers) vs 6.4 cm (4 layers); N=6 -> 4.8 vs 9.6; N=12 -> 9.6 vs 19.2. Halving the footprint doubles the layers: true for an ideal incompressible sheet (stated). |
| c2 | verified | Scope/limit statement; true of this card's code and drawing. |
| c3 | verified | Matches 'layers' (other=2b, value=p*a*other). Re-run in node from home-models.ts (evaluateHome) at min/default/max inputs, before and after. |
| c4 | disputed | The predict question 'What changes when you halve the footprint again?' is not answerable from the options 'One fold / Two folds / Same outcome' (the keyed 'Two folds' names a layout, not a change). The stage compares stack heights. FIX: ask 'Which fold count gives the taller stack of the same shirts?' (key: Two folds, 4 layers, 2x the height), or change the options to 'Stack gets taller / shorter / same'. |
| c5 | unverified | Recall (c5): the question is interrogative; the keyed answer is the generic option 0 'Check the mechanism and its stated constraints', which does not answer it. Correct answer: The stack gets taller: each extra fold doubles the layers, so height doubles (for example 4.8 -> 9.6 cm for 6 shirts). Pending the learning-designer recall patch (PR #2 blocker 5); re-check the new key then. |

### Unrecorded learner-visible statements
- Reveal line ('Your prediction held. / Not quite. The current <layout> setting gives <value><unit>.') and the stage readouts are generated from the model and restate c3; correct, not separately recorded.
- Title and hook restate c1 / c4. No other factual sentence found without a claim.

### Verdict
1 disputed claim(s) block publishing until the builder applies the fix(es) above and the fact-checker re-checks.
Cross-cutting: the recall options are the generic 'Check the mechanism and its stated constraints / Assume the layout always works / Ignore the stated inputs' set; the key does not answer the recall question (c5 left unverified, not disputed, because the learning-designer's recall patch will replace it).
