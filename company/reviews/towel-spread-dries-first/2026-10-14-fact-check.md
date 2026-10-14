# Fact-check: towel-spread-dries-first

## Pass LH-1 (pre-merge, read-only)

Date: 2026-10-14. Checker: fact-checker (Ingrid), batch B3. Source of text: origin/codex/lifehacks-200 (read via git show, not checked out). I did not write these claims. Learner-visible text read from src/lib/lifehacks/{home-lessons,home-models,studyCatalog,studyModels}.ts and src/components/lifehacks/{HomeLesson,StudyLesson}.tsx; arithmetic re-run in node (types stripped, same code as the PR). Web: openstax.org, fieggen.com, arxiv.org, rei.com, ginetex.net, ncbi.nlm.nih.gov and wikipedia.org returned DNS/403 from this sandbox; only web-search snippets were available, used only to corroborate, never to mark a source claim verified outright.

Verdicts are for the PR head fetched 2026-10-14; they apply to meta.json after the merge (machine file: company/reviews/lifehacks-200/fact-check-B3.json).

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Node: area 2*0.7*1.4/4 = 0.49 m2 -> 0.6/(0.49*0.1020408163) = 12.0 h; flat 1.96 m2 -> 3.0 h (ratio 1/4 exact). Model statement correct and heavily hedged. openstax.org unreachable; mirror text corroborates humidity-inhibits-evaporation. |
| c2 | verified | Scope limit; true of the card and its code, asserts nothing beyond the model. |
| c3 | verified | Matches model in home-models.ts and the formula line shown on the stage (re-run in node, see c1). Advisory (unclaimed number): the stage shows "flux=0.102" with no unit; add "kg/(m2.h)" to the formula/inputs line. |
| c4 | verified | Prediction prompt matches the learner-visible question; the keyed answer is correct at the stated default values. |
| c5 | verified | Node: time = m/(A*flux): doubling area halves the time. Keyed option "B takes half as long" correct. |

### Learner-visible factual sentences with no claim

- Stage line "flux=0.102" and "0.6kg" are shown with no unit/claim for flux (kg per m2 per hour); the 12 h figure is therefore tied to an unlabelled assumption.

Outcome: all claims verified.
