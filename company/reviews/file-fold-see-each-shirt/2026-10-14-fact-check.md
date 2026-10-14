# Fact-check: file-fold-see-each-shirt

## Pass LH-1 (pre-merge, read-only)

Date: 2026-10-14. Checker: fact-checker (Ingrid). Batch B1 of PR #2. Source: `origin/codex/lifehacks-200` read with `git show` only; nothing checked out, built or run from the PR (models re-run in node from copies of home-models.ts, home-lessons.ts and studySearch.ts). Learner-visible text (spec idea/limit/formula/question, HomeLesson.tsx / AlphabetSearchLesson.tsx output, meta recall) compared with the claims. Status changes are NOT applied to meta.json (lesson not in our tree); verdicts are in `company/reviews/lifehacks-200/fact-check-B1.json`, to be applied after the merge. External hosts (nist.gov, openstax.org, ginetex.net, rei.com, mit.edu, pnas.org, arxiv.org, wikipedia.org) are blocked by the egress proxy from this environment; none was opened. Web search snippets were used as corroboration only.

Lesson: "See every shirt edge". Result: 4 verified, 0 disputed, 1 unverified, 0 withdrawn.

| Claim | Status | Note |
|---|---|---|
| c1 | verified | node: visible edges 1 (stack) vs N (row), N=5,8,12; hidden = N-1. True under the stated top-view convention ('hides the lower tops'). The text says the benefit is selection, not volume: fine. |
| c2 | verified | Scope/limit statement; true of this card's code and drawing. |
| c3 | verified | Matches 'visibility'. Re-run in node from home-models.ts (evaluateHome) at min/default/max inputs, before and after. |
| c4 | verified | Predict key checked against the model: Key 1 'Vertical row' correct. |
| c5 | unverified | Recall (c5): the question is interrogative; the keyed answer is the generic option 0 'Check the mechanism and its stated constraints', which does not answer it. Correct answer: Visibility: you can see and pick any shirt. Pending the learning-designer recall patch (PR #2 blocker 5); re-check the new key then. |

### Unrecorded learner-visible statements
- Reveal line ('Your prediction held. / Not quite. The current <layout> setting gives <value><unit>.') and the stage readouts are generated from the model and restate c3; correct, not separately recorded.
- Title and hook restate c1 / c4. No other factual sentence found without a claim.

### Verdict
No disputes. 1 claim(s) unverified (see table).
Cross-cutting: the recall options are the generic 'Check the mechanism and its stated constraints / Assume the layout always works / Ignore the stated inputs' set; the key does not answer the recall question (c5 left unverified, not disputed, because the learning-designer's recall patch will replace it).
