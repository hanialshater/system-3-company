# Fact-check: cm-to-inches

## Pass LH-1 (pre-merge, read-only)

Date: 2026-10-14. Checker: fact-checker (Ingrid). Batch B1 of PR #2. Source: `origin/codex/lifehacks-200` read with `git show` only; nothing checked out, built or run from the PR (models re-run in node from copies of home-models.ts, home-lessons.ts and studySearch.ts). Learner-visible text (spec idea/limit/formula/question, HomeLesson.tsx / AlphabetSearchLesson.tsx output, meta recall) compared with the claims. Status changes are NOT applied to meta.json (lesson not in our tree); verdicts are in `company/reviews/lifehacks-200/fact-check-B1.json`, to be applied after the merge. External hosts (nist.gov, openstax.org, ginetex.net, rei.com, mit.edu, pnas.org, arxiv.org, wikipedia.org) are blocked by the egress proxy from this environment; none was opened. Web search snippets were used as corroboration only.

Lesson: "An inch is exactly 2.54cm". Result: 3 verified, 0 disputed, 2 unverified, 0 withdrawn.

| Claim | Status | Note |
|---|---|---|
| c1 | unverified | SOURCE UNREACHABLE: nist.gov blocked by the egress proxy. Independent search snippets give the 1959 international yard and pound agreement: yard = 0.9144 m exactly, hence inch = 25.4 mm = 2.54 cm exactly. The arithmetic part is checked: 30 cm -> 12.000 in with /2.5 vs 11.811 in with /2.54 (difference 0.189 in, 1.6 %, proportional to length: 20 cm 0.126 in, 40 cm 0.252 in). I have no doubt of the content, but the NIST page was not opened. Recommend accepting on the secondary corroboration or re-checking from a connected host. |
| c2 | verified | Scope/limit statement; true of this card's code and drawing. |
| c3 | verified | Matches 'conversion' (p/b vs p/a; other=/p/b-p/a/). Re-run in node from home-models.ts (evaluateHome) at min/default/max inputs, before and after. |
| c4 | verified | Predict key checked against the model: Key 1 'Use exact 2.54' correct. |
| c5 | unverified | Recall (c5): the question is interrogative; the keyed answer is the generic option 0 'Check the mechanism and its stated constraints', which does not answer it. Correct answer: No. An exact factor converts units exactly but measurement uncertainty remains. Pending the learning-designer recall patch (PR #2 blocker 5); re-check the new key then. |

### Unrecorded learner-visible statements
- Reveal line ('Your prediction held. / Not quite. The current <layout> setting gives <value><unit>.') and the stage readouts are generated from the model and restate c3; correct, not separately recorded.
- Title and hook restate c1 / c4. No other factual sentence found without a claim.

### Verdict
No disputes. 2 claim(s) unverified (see table).
Cross-cutting: the recall options are the generic 'Check the mechanism and its stated constraints / Assume the layout always works / Ignore the stated inputs' set; the key does not answer the recall question (c5 left unverified, not disputed, because the learning-designer's recall patch will replace it).
