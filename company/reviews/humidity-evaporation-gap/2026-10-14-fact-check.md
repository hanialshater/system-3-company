# Fact-check: humidity-evaporation-gap

## Pass LH-1 (pre-merge, read-only)

Date: 2026-10-14. Checker: fact-checker (Ingrid). Batch B1 of PR #2. Source: `origin/codex/lifehacks-200` read with `git show` only; nothing checked out, built or run from the PR (models re-run in node from copies of home-models.ts, home-lessons.ts and studySearch.ts). Learner-visible text (spec idea/limit/formula/question, HomeLesson.tsx / AlphabetSearchLesson.tsx output, meta recall) compared with the claims. Status changes are NOT applied to meta.json (lesson not in our tree); verdicts are in `company/reviews/lifehacks-200/fact-check-B1.json`, to be applied after the merge. External hosts (nist.gov, openstax.org, ginetex.net, rei.com, mit.edu, pnas.org, arxiv.org, wikipedia.org) are blocked by the egress proxy from this environment; none was opened. Web search snippets were used as corroboration only.

Lesson: "Humid air narrows the gap". Result: 3 verified, 0 disputed, 2 unverified, 0 withdrawn.

| Claim | Status | Note |
|---|---|---|
| c1 | unverified | SOURCE UNREACHABLE: openstax.org blocked by the egress proxy. Search snippets of the same section (13.6) and mirrors state that relative humidity compares vapour with the maximum possible, saturation is RH 100 % where evaporation is inhibited, and high humidity hinders evaporation. The claim itself (at equal temperature the gap between saturation vapour pressure and ambient vapour pressure is (1-RH) x p_sat) is standard and consistent. The OpenStax page was not opened; re-check from a connected host or accept on corroboration. |
| c2 | verified | Scope/limit statement; true of this card's code and drawing. |
| c3 | verified | node: gap 1-RH/100; default RH 70 -> 0.30 vs comparison RH max(0,70-30)=40 -> 0.60; RH 40 -> 0.6/0.9; RH 90 -> 0.1/0.4. Re-run in node from home-models.ts (evaluateHome) at min/default/max inputs, before and after. |
| c4 | verified | Predict key checked against the model: Key 1 'Drier setting' correct (0.60 > 0.30). |
| c5 | unverified | Recall (c5): the question is interrogative; the keyed answer is the generic option 0 'Check the mechanism and its stated constraints', which does not answer it. Correct answer: Smaller vapour-pressure gap: humid air is already near saturation. Pending the learning-designer recall patch (PR #2 blocker 5); re-check the new key then. |

### Unrecorded learner-visible statements
- Reveal line ('Your prediction held. / Not quite. The current <layout> setting gives <value><unit>.') and the stage readouts are generated from the model and restate c3; correct, not separately recorded.
- Title and hook restate c1 / c4. No other factual sentence found without a claim.

### Verdict
No disputes. 2 claim(s) unverified (see table).
Cross-cutting: the recall options are the generic 'Check the mechanism and its stated constraints / Assume the layout always works / Ignore the stated inputs' set; the key does not answer the recall question (c5 left unverified, not disputed, because the learning-designer's recall patch will replace it).
