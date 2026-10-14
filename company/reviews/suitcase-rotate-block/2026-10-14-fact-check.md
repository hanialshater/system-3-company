# Fact-check: suitcase-rotate-block

## Pass LH-1 (pre-merge, read-only)

Date: 2026-10-14. Checker: fact-checker (Ingrid), batch B3. Source of text: origin/codex/lifehacks-200 (read via git show, not checked out). I did not write these claims. Learner-visible text read from src/lib/lifehacks/{home-lessons,home-models,studyCatalog,studyModels}.ts and src/components/lifehacks/{HomeLesson,StudyLesson}.tsx; arithmetic re-run in node (types stripped, same code as the PR). Web: openstax.org, fieggen.com, arxiv.org, rei.com, ginetex.net, ncbi.nlm.nih.gov and wikipedia.org returned DNS/403 from this sandbox; only web-search snippets were available, used only to corroborate, never to mark a source claim verified outright.

Verdicts are for the PR head fetched 2026-10-14; they apply to meta.json after the merge (machine file: company/reviews/lifehacks-200/fact-check-B3.json).

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Node: bag 30x36, block 18x12: long way floor(30/18)*floor(36/12)=3, quarter-turn floor(30/12)*floor(36/18)=4. True for widths 28-35; for widths 36-40 (slider max 40) both orientations give 6, so the card's answer is a tie there. Claim c1 itself ("rotation changes how many complete rows and columns fit") is true. |
| c2 | verified | Scope limit; true of the card and its code, asserts nothing beyond the model. |
| c3 | disputed | Formula text says floor(24/itemH) but the stage uses a bag 36 cm tall (spec values [36,18,12]; inputs line shows "Bag=30x36cm"). With 24 the counts would be 2 and 2 (no gain), so the stated formula contradicts the displayed 3 vs 4. FIX: change claim c3 and the formula string in home-lessons.ts to "Count=floor(W/itemW)*floor(36/itemH), item=18x12 or 12x18 cm". Also either cap the slider at 35 or add "(from W=36 cm both orientations fit 6)" to the limit text, because at W 36-40 the quarter-turn gives no gain. |
| c4 | verified | Prediction prompt matches the learner-visible question; the keyed answer is correct at the stated default values. Caveat: a tie at slider widths 36-40 (see c3). |
| c5 | verified | Recall prompt matches the lesson and the keyed option is correct. |

### Learner-visible factual sentences with no claim

- Title "Rotate before buying a bigger bag" is advice that fails for W 36-40 cm on this card (see c3).

Outcome: DISPUTED, blocks publishing until fixed.
