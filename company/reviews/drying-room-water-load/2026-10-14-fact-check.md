# Fact-check: drying-room-water-load

## Pass LH-1 (pre-merge, read-only)

Date: 2026-10-14. Checker: fact-checker (Ingrid). Batch B1 of PR #2. Source: `origin/codex/lifehacks-200` read with `git show` only; nothing checked out, built or run from the PR (models re-run in node from copies of home-models.ts, home-lessons.ts and studySearch.ts). Learner-visible text (spec idea/limit/formula/question, HomeLesson.tsx / AlphabetSearchLesson.tsx output, meta recall) compared with the claims. Status changes are NOT applied to meta.json (lesson not in our tree); verdicts are in `company/reviews/lifehacks-200/fact-check-B1.json`, to be applied after the merge. External hosts (nist.gov, openstax.org, ginetex.net, rei.com, mit.edu, pnas.org, arxiv.org, wikipedia.org) are blocked by the egress proxy from this environment; none was opened. Web search snippets were used as corroboration only.

Lesson: "The water goes somewhere". Result: 4 verified, 0 disputed, 1 unverified, 0 withdrawn.

| Claim | Status | Note |
|---|---|---|
| c1 | verified | node: 250 g x count (1 -> 250, 4 -> 1000, 8 -> 2000 g). Conservation of mass: water that leaves the laundry as vapour enters the room air (or condenses elsewhere). The claim limits itself to a mass balance. True. SUPPORT NOTE: cited OpenStax page is context only; retype to derivation. |
| c2 | verified | Scope/limit statement; true of this card's code and drawing. |
| c3 | verified | Matches 'water-load'. Re-run in node from home-models.ts (evaluateHome) at min/default/max inputs, before and after. |
| c4 | verified | Predict key checked against the model: Key 1 'Whole load' correct. |
| c5 | unverified | Recall (c5): the question is interrogative; the keyed answer is the generic option 0 'Check the mechanism and its stated constraints', which does not answer it. Correct answer: Released water scales with the number of items (count x 250 g). Pending the learning-designer recall patch (PR #2 blocker 5); re-check the new key then. |

### Unrecorded learner-visible statements
- Reveal line ('Your prediction held. / Not quite. The current <layout> setting gives <value><unit>.') and the stage readouts are generated from the model and restate c3; correct, not separately recorded.
- Title and hook restate c1 / c4. No other factual sentence found without a claim.
- UNRECORDED ASSUMPTION: '250 g per item' and '30 m3 room' appear on the stage as plain numbers; no claim says they are chosen, not measured (a wrung-out cotton shirt or towel can plausibly hold about 100-300 g, so the value is reasonable). Advisory: add 'illustrative' to c2.

### Verdict
No disputes. 1 claim(s) unverified (see table).
Cross-cutting: the recall options are the generic 'Check the mechanism and its stated constraints / Assume the layout always works / Ignore the stated inputs' set; the key does not answer the recall question (c5 left unverified, not disputed, because the learning-designer's recall patch will replace it).
