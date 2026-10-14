# Fact-check: care-label-first-choice

## Pass LH-1 (pre-merge, read-only)

Date: 2026-10-14. Checker: fact-checker (Ingrid). Batch B1 of PR #2. Source: `origin/codex/lifehacks-200` read with `git show` only; nothing checked out, built or run from the PR (models re-run in node from copies of home-models.ts, home-lessons.ts and studySearch.ts). Learner-visible text (spec idea/limit/formula/question, HomeLesson.tsx / AlphabetSearchLesson.tsx output, meta recall) compared with the claims. Status changes are NOT applied to meta.json (lesson not in our tree); verdicts are in `company/reviews/lifehacks-200/fact-check-B1.json`, to be applied after the merge. External hosts (nist.gov, openstax.org, ginetex.net, rei.com, mit.edu, pnas.org, arxiv.org, wikipedia.org) are blocked by the egress proxy from this environment; none was opened. Web search snippets were used as corroboration only.

Lesson: "The label beats the fastest layout". Result: 3 verified, 0 disputed, 2 unverified, 0 withdrawn.

| Claim | Status | Note |
|---|---|---|
| c1 | unverified | SOURCE UNREACHABLE: ginetex.net is blocked by the egress proxy (CONNECT 403/DNS). Search snippets (Wikipedia 'Laundry symbol', wunderlabel, a GINETEX PDF) agree that the natural-drying symbols are one horizontal line = flat dry, one vertical = line dry, drip variants, oblique line = shade, standardised in ISO 3758. The lesson's own claim (an example garment with a flat-dry instruction; hanging it does not obey it) is a hypothetical and logically true. Re-check from a connected host. |
| c2 | verified | Scope/limit statement; true of this card's code and drawing. |
| c3 | verified | Matches 'label-rule' (value=0 hanging, N flat). Re-run in node from home-models.ts (evaluateHome) at min/default/max inputs, before and after. |
| c4 | verified | Predict key checked against the model: Key 1 'Respect flat-dry text' correct. |
| c5 | unverified | Recall (c5): the question is interrogative; the keyed answer is the generic option 0 'Check the mechanism and its stated constraints', which does not answer it. Correct answer: The garment's care label (its drying instruction). Pending the learning-designer recall patch (PR #2 blocker 5); re-check the new key then. |

### Unrecorded learner-visible statements
- Reveal line ('Your prediction held. / Not quite. The current <layout> setting gives <value><unit>.') and the stage readouts are generated from the model and restate c3; correct, not separately recorded.
- Title and hook restate c1 / c4. No other factual sentence found without a claim.

### Verdict
No disputes. 2 claim(s) unverified (see table).
Cross-cutting: the recall options are the generic 'Check the mechanism and its stated constraints / Assume the layout always works / Ignore the stated inputs' set; the key does not answer the recall question (c5 left unverified, not disputed, because the learning-designer's recall patch will replace it).
