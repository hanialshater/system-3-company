# Fact-check: sofa-diagonal-room

## Pass LH-1 (pre-merge, read-only)

Date: 2026-10-14. Checker: fact-checker (Ingrid), batch B3. Source of text: origin/codex/lifehacks-200 (read via git show, not checked out). I did not write these claims. Learner-visible text read from src/lib/lifehacks/{home-lessons,home-models,studyCatalog,studyModels}.ts and src/components/lifehacks/{HomeLesson,StudyLesson}.tsx; arithmetic re-run in node (types stripped, same code as the PR). Web: openstax.org, fieggen.com, arxiv.org, rei.com, ginetex.net, ncbi.nlm.nih.gov and wikipedia.org returned DNS/403 from this sandbox; only web-search snippets were available, used only to corroborate, never to mark a source claim verified outright.

Verdicts are for the PR head fetched 2026-10-14; they apply to meta.json after the merge (machine file: company/reviews/lifehacks-200/fact-check-B3.json).

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Node: sqrt(120^2+90^2)=150 > 140 > 120, margin +10 vs -20 at default. Caveat: the sqrt(140^2-90^2)=107.2 cm, so for slider widths 100-107 the diagonal does NOT fit either (margin -5.5 at 100). Claim is conditional ("can fit ... when"), and c4 scopes the prediction to defaults; no dispute, but a builder may want to raise slider min to 108. |
| c2 | verified | Scope limit; true of the card and its code, asserts nothing beyond the model. |
| c3 | verified | Matches model (150 cm diagonal, margins +10 / -20). Note valid range: diagonal fits only for width >= 107.3 cm. |
| c4 | verified | Prediction prompt matches the learner-visible question; the keyed answer is correct at the stated default values. Caveat: false for slider widths 100-107 (see c1). |
| c5 | verified | Recall prompt matches the lesson and the keyed option is correct. |

### Learner-visible factual sentences with no claim

- Title "The diagonal hides more length" is true only for widths >= 107 cm here.

Outcome: all claims verified.
