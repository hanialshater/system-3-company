# Fact-check: square-bow-stays-tied

## Pass LH-1 (pre-merge, read-only)

Date: 2026-10-14. Checker: fact-checker (Ingrid), batch B3. Source of text: origin/codex/lifehacks-200 (read via git show, not checked out). I did not write these claims. Learner-visible text read from src/lib/lifehacks/{home-lessons,home-models,studyCatalog,studyModels}.ts and src/components/lifehacks/{HomeLesson,StudyLesson}.tsx; arithmetic re-run in node (types stripped, same code as the PR). Web: openstax.org, fieggen.com, arxiv.org, rei.com, ginetex.net, ncbi.nlm.nih.gov and wikipedia.org returned DNS/403 from this sandbox; only web-search snippets were available, used only to corroborate, never to mark a source claim verified outright.

Verdicts are for the PR head fetched 2026-10-14; they apply to meta.json after the merge (machine file: company/reviews/lifehacks-200/fact-check-B3.json).

| Claim | Verdict | Note |
|---|---|---|
| c1 | unverified | Orientation claim (opposing stages -> balanced reef bow lies across shoe; granny bow lies along it) matches secondary descriptions found by web search (Wikipedia "horizontal bows are secure, vertical ones slip"; Fieggen quoted as "vertical bows signal a granny knot"); Daily-Diamond/Gregg/O'Reilly abstract (Proc. R. Soc. A 2017) confirms impact then whipping then slipping as the failure sequence. The cited Fieggen page itself could not be read: primary host unreachable from this sandbox (HTTP 403 via proxy / DNS blocked). Left unverified rather than guessed. |
| c2 | verified | Scope limit; true of the card and its code, asserts nothing beyond the model. |
| c3 | verified | Node: 20-20*0.8 = 4 mm, 20-20*0.3 = 14 mm at step 20; 20 mm at step 0 (both). Matches the stage and the reveal sentence. |
| c4 | verified | Prediction prompt matches the learner-visible question; the keyed answer is correct at the stated default values. |
| c5 | unverified | Keyed answer (make the second stage right-over-left so stages oppose; reef-type bow) rests on the same Fieggen/Daily-Diamond sources as c1, which could not be opened here. Knot-theory content is standard (reef = opposed half-knots). |

### Learner-visible factual sentences with no claim

- None found beyond the computed readouts, which claim c3 (the formula/model) covers.

Outcome: claims remain unverified (source unreachable).
