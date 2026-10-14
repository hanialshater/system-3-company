# Fact-check: alphabet-sort-search

## Pass LH-1 (pre-merge, read-only)

Date: 2026-10-14. Checker: fact-checker (Ingrid). Batch B1 of PR #2. Source: `origin/codex/lifehacks-200` read with `git show` only; nothing checked out, built or run from the PR (models re-run in node from copies of home-models.ts, home-lessons.ts and studySearch.ts). Learner-visible text (spec idea/limit/formula/question, HomeLesson.tsx / AlphabetSearchLesson.tsx output, meta recall) compared with the claims. Status changes are NOT applied to meta.json (lesson not in our tree); verdicts are in `company/reviews/lifehacks-200/fact-check-B1.json`, to be applied after the merge. External hosts (nist.gov, openstax.org, ginetex.net, rei.com, mit.edu, pnas.org, arxiv.org, wikipedia.org) are blocked by the egress proxy from this environment; none was opened. Web search snippets were used as corroboration only.

Lesson: "Rule out half the labels". Result: 6 verified, 0 disputed, 0 unverified, 0 withdrawn.

| Claim | Status | Note |
|---|---|---|
| c1 | verified | Sortedness: if value[mid]<target then every key at positions <=mid is <target, so lo=mid+1 is safe. compareLabel code does exactly this. True only for sorted keys (stated). |
| c2 | verified | node shuffledLabels(n) for n=4..10: first n-1 letters reversed, largest last (n=10: IHGFEDCBAJ); scan checks = n (4..10). Slider is 4..10. Statement 'not typical search data' is a fair disclosure. |
| c3 | verified | node compareLabel: mid=floor((lo+hi)/2); keptLo/keptHi follow the three-way result; scan count = scanLabels(...).checked.length. Rendered aria-label lists 'Remaining candidates' and the tiles fade, so the interval is shown. |
| c4 | verified | node, n=10 target J: mids E,H,I,J -> 4 checks; scan 10. Trace string renders E<J, H<J, I<J, J=J. (Claim's 'E,J then H,J ...' is the same sequence.) Also n=4..10 sorted counts 3,3,3,3,4,4,4 = floor(log2 n)+1 for each n, scan = n. |
| c5 | verified | Scope statement; reveal says 'this exercise counts only search comparisons'. True. |
| c6 | verified | Recall key 0 'Put labels in alphabetical order' is correct; shuffled positions give no ordering guarantee. This lesson's recall is the only one in B1 with option text that answers its question. |

### Unrecorded learner-visible statements
- Reveal line ('Your prediction held. / Not quite. The current <layout> setting gives <value><unit>.') and the stage readouts are generated from the model and restate c3; correct, not separately recorded.
- Title and hook restate c1 / c4. No other factual sentence found without a claim.

### Verdict
No disputes.
