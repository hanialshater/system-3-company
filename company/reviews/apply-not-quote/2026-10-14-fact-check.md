# Fact-check: apply-not-quote

## Pass LH-1 (pre-merge, read-only)

Date: 2026-10-14. Checker: fact-checker (Ingrid), batch B3. Source of text: origin/codex/lifehacks-200 (read via git show, not checked out). I did not write these claims. Learner-visible text read from src/lib/lifehacks/{home-lessons,home-models,studyCatalog,studyModels}.ts and src/components/lifehacks/{HomeLesson,StudyLesson}.tsx; arithmetic re-run in node (types stripped, same code as the PR). Web: openstax.org, fieggen.com, arxiv.org, rei.com, ginetex.net, ncbi.nlm.nih.gov and wikipedia.org returned DNS/403 from this sandbox; only web-search snippets were available, used only to corroborate, never to mark a source claim verified outright.

Verdicts are for the PR head fetched 2026-10-14; they apply to meta.json after the merge (machine file: company/reviews/lifehacks-200/fact-check-B3.json).

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Ascending order of 2,5,9 is the only arrangement matching the rule (6 permutations, node). Values labelled as conventions; hook and question consistent. |
| c2 | disputed | Two defects. (1) The cited source (Roediger & Karpicke 2006, Psychol. Sci. 17(3):249-255, doi:10.1111/j.1467-9280.2006.01693.x; bibliographic details correct) concerns retrieval practice and supports nothing in this sentence; the claim is an arithmetic/convention statement and should cite the fixture. (2) "The target uses new values ordered smallest to largest" is not what the stage shows: the target is the same numbers 2, 5, 9 (the "Try values" step re-presents them as 5, 9, 2). FIX: reword claim and the principle string to "The target is 2, 5, 9 in ascending order, smallest to largest. Matching it requires applying the rule to the numbers shown." and replace the source with the exercise fixture; keep the paper only as background in c2 of a different, retrieval-practice claim, or drop it. |
| c3 | verified | Node: reconstructionMatches counts positions equal to ascending order 2,5,9; initial order 9,2,5 matches 0 of 3; "Try values" shows 5,9,2 and leaves it visible. Matches stage and the disclaimer. |
| c4 | verified | Node: 7,1,4 ascending is 1,4,7 (1<4<7); keyed option correct. |

### Learner-visible factual sentences with no claim

- None found beyond the computed readouts, which claim c3 (the formula/model) covers.

Outcome: DISPUTED, blocks publishing until fixed.
