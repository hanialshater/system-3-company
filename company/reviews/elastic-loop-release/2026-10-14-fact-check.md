# Fact-check: elastic-loop-release

## Pass LH-1 (pre-merge, read-only)

Date: 2026-10-14. Checker: fact-checker (Ingrid). Batch B1 of PR #2. Source: `origin/codex/lifehacks-200` read with `git show` only; nothing checked out, built or run from the PR (models re-run in node from copies of home-models.ts, home-lessons.ts and studySearch.ts). Learner-visible text (spec idea/limit/formula/question, HomeLesson.tsx / AlphabetSearchLesson.tsx output, meta recall) compared with the claims. Status changes are NOT applied to meta.json (lesson not in our tree); verdicts are in `company/reviews/lifehacks-200/fact-check-B1.json`, to be applied after the merge. External hosts (nist.gov, openstax.org, ginetex.net, rei.com, mit.edu, pnas.org, arxiv.org, wikipedia.org) are blocked by the egress proxy from this environment; none was opened. Web search snippets were used as corroboration only.

Lesson: "A loop is not a permanent knot". Result: 1 verified, 3 disputed, 1 unverified, 0 withdrawn.

| Claim | Status | Note |
|---|---|---|
| c1 | disputed | The topology is true (an open cord with a free end and one diagram crossing is unknotted and can be slid off), but the claim says 'the shown crossing' and this stage shows none: view 'cord' is not handled in HomeLesson.tsx Scene() (falls to the default branch, which draws a box outline with an X after the toggle). Only a text readout 'Drawn crossing 1 -> 0' exists. The cited source (Raymer and Smith 2007, agitated-string knotting probability) does not support a claim about sliding a loop off; mit.edu and pnas.org are blocked (search snippets confirm the paper's setup: 0.30 m box, 1 rev/s, 10 s, no knots below 0.46 m). FIX: (a) builder adds a cord/loop drawing for view 'cord' (or removes 'shown'/'drawn' from c1, c3, c4 and the stage question), and (b) retype support to derivation (topology) or cite a knot-theory source; keep Raymer and Smith only where knotting probability is stated. Re-check after. |
| c2 | verified | Scope/limit statement; true of this card's code and drawing. |
| c3 | disputed | Arithmetic is right (crossings 1 -> 0; free end 15-35 cm vs 10 cm travel: always releasable, the slider never changes the outcome) but 'Depicted crossings' is a readout, not a depiction; same fix as c1. |
| c4 | disputed | Key 1 'Slide loop off' is correct, but the question text 'the drawn crossing' presupposes a drawing that does not exist; same fix as c1. |
| c5 | unverified | Recall (c5): the question is interrogative; the keyed answer is the generic option 0 'Check the mechanism and its stated constraints', which does not answer it. Correct answer: A free, accessible end lets the loop slide off; with no free end a crossing may be a real knot. Pending the learning-designer recall patch (PR #2 blocker 5); re-check the new key then. |

### Unrecorded learner-visible statements
- Reveal line ('Your prediction held. / Not quite. The current <layout> setting gives <value><unit>.') and the stage readouts are generated from the model and restate c3; correct, not separately recorded.
- Title and hook restate c1 / c4. No other factual sentence found without a claim.

### Verdict
3 disputed claim(s) block publishing until the builder applies the fix(es) above and the fact-checker re-checks.
Cross-cutting: the recall options are the generic 'Check the mechanism and its stated constraints / Assume the layout always works / Ignore the stated inputs' set; the key does not answer the recall question (c5 left unverified, not disputed, because the learning-designer's recall patch will replace it).
