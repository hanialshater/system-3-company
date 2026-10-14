# Fact-check: flat-pack-volume-dimensions

## Pass LH-1 (pre-merge, read-only)

Date: 2026-10-14. Checker: fact-checker (Ingrid). Batch B1 of PR #2. Source: `origin/codex/lifehacks-200` read with `git show` only; nothing checked out, built or run from the PR (models re-run in node from copies of home-models.ts, home-lessons.ts and studySearch.ts). Learner-visible text (spec idea/limit/formula/question, HomeLesson.tsx / AlphabetSearchLesson.tsx output, meta recall) compared with the claims. Status changes are NOT applied to meta.json (lesson not in our tree); verdicts are in `company/reviews/lifehacks-200/fact-check-B1.json`, to be applied after the merge. External hosts (nist.gov, openstax.org, ginetex.net, rei.com, mit.edu, pnas.org, arxiv.org, wikipedia.org) are blocked by the egress proxy from this environment; none was opened. Web search snippets were used as corroboration only.

Lesson: "Same panels, different envelope". Result: 3 verified, 1 disputed, 1 unverified, 0 withdrawn.

| Claim | Status | Note |
|---|---|---|
| c1 | verified | node: stacked envelope 40x30x6t = 3600 / 7200 / 21600 cm3 at t=0.5/1/3 vs reference 36000 cm3. Qualitatively true (the hollow disappears). |
| c2 | verified | Scope/limit statement; true of this card's code and drawing. |
| c3 | disputed | Six identical 40x30 panels cannot form a 40x30x30 box: its faces are four 40x30 panels plus two 30x30 panels (by hand: 4x1200+2x900 = 6600 cm2 of panel, not 7200). The stack ENVELOPE 40x30x6t is still right if two panels are 30x30 (they fit inside the 40x30 footprint), so the numbers on screen are fine but the label '6panels=40x30xt' (learner-visible) is wrong. FIX: input line / formula to read '4 panels 40x30 + 2 panels 30x30, thickness t; stack envelope 40x30x6t; assembled reference 40x30x30'. |
| c4 | verified | Predict key checked against the model: Key 1 'Panels stacked' correct for every thickness 0.5-3 cm (21600 < 36000). |
| c5 | unverified | Recall (c5): the question is interrogative; the keyed answer is the generic option 0 'Check the mechanism and its stated constraints', which does not answer it. Correct answer: The enclosed hollow in the envelope. Pending the learning-designer recall patch (PR #2 blocker 5); re-check the new key then. |

### Unrecorded learner-visible statements
- Reveal line ('Your prediction held. / Not quite. The current <layout> setting gives <value><unit>.') and the stage readouts are generated from the model and restate c3; correct, not separately recorded.
- Title and hook restate c1 / c4. No other factual sentence found without a claim.
- STAGE: the stacked drawing draws round(thickness) clamped to 2..12 panels (n), i.e. 2 panels at the 1 cm default, not 6; the picture and the stated '6 panels' disagree. Code read only; for QA/builder.

### Verdict
1 disputed claim(s) block publishing until the builder applies the fix(es) above and the fact-checker re-checks.
Cross-cutting: the recall options are the generic 'Check the mechanism and its stated constraints / Assume the layout always works / Ignore the stated inputs' set; the key does not answer the recall question (c5 left unverified, not disputed, because the learning-designer's recall patch will replace it).
