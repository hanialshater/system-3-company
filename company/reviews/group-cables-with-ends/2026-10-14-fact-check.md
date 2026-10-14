# Fact-check: group-cables-with-ends

## Pass LH-1 (pre-merge, read-only)

Date: 2026-10-14. Checker: fact-checker (Ingrid). Batch B1 of PR #2. Source: `origin/codex/lifehacks-200` read with `git show` only; nothing checked out, built or run from the PR (models re-run in node from copies of home-models.ts, home-lessons.ts and studySearch.ts). Learner-visible text (spec idea/limit/formula/question, HomeLesson.tsx / AlphabetSearchLesson.tsx output, meta recall) compared with the claims. Status changes are NOT applied to meta.json (lesson not in our tree); verdicts are in `company/reviews/lifehacks-200/fact-check-B1.json`, to be applied after the merge. External hosts (nist.gov, openstax.org, ginetex.net, rei.com, mit.edu, pnas.org, arxiv.org, wikipedia.org) are blocked by the egress proxy from this environment; none was opened. Web search snippets were used as corroboration only.

Lesson: "A bundle still has loose ends". Result: 1 verified, 3 disputed, 1 unverified, 0 withdrawn.

| Claim | Status | Note |
|---|---|---|
| c1 | disputed | Claim says 'the drawing distinguishes keeping strands together from restricting the ends' routes'; this stage draws no cords: view 'cord' falls to the default box branch of HomeLesson.tsx Scene() (code read, not run; confirm in QA). The physics (ends can still weave through loops) is the end-weaving mechanism of Raymer and Smith 2007, consistent with their snippets, but the paper (mit.edu, pnas.org: unreachable) was not opened. FIX: builder adds a cord-bundle drawing (loose ends vs secured ends) or drops the 'drawing' sentence from c1/c3/c4; then source-check Raymer and Smith p.16435 from a connected host. |
| c2 | verified | Scope/limit statement; true of this card's code and drawing. |
| c3 | disputed | Arithmetic is right (accessible ends 2 x cords: 4, 8, 16 -> 0 after securing) but 'depicted accessible ends' refers to a picture that is absent; same fix as c1. |
| c4 | disputed | Key 1 'Secure bundle ends' is correct, but 'the depicted free-end paths' presupposes the absent drawing; same fix as c1. |
| c5 | unverified | Recall (c5): the question is interrogative; the keyed answer is the generic option 0 'Check the mechanism and its stated constraints', which does not answer it. Correct answer: The ends stay free to weave through loops even when the middle is tied. Pending the learning-designer recall patch (PR #2 blocker 5); re-check the new key then. |

### Unrecorded learner-visible statements
- Reveal line ('Your prediction held. / Not quite. The current <layout> setting gives <value><unit>.') and the stage readouts are generated from the model and restate c3; correct, not separately recorded.
- Title and hook restate c1 / c4. No other factual sentence found without a claim.

### Verdict
3 disputed claim(s) block publishing until the builder applies the fix(es) above and the fact-checker re-checks.
Cross-cutting: the recall options are the generic 'Check the mechanism and its stated constraints / Assume the layout always works / Ignore the stated inputs' set; the key does not answer the recall question (c5 left unverified, not disputed, because the learning-designer's recall patch will replace it).
