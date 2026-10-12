# Pattern Review: 2026-10-12

owner: pattern-librarian · attendees: evaluation-steward, learning-designer, one category manager (not convened; the librarian read the records alone, so this is a proposal for them to answer)

Inputs read: all 9 pattern files; 17 learner reviews and 18 fact-checks under `company/reviews/`, the 17 QA records, the retro and WBR of 2026-10-12, the cycle-planning record, `product/demo-standard.md`, EXP-001/002.

## What the evidence is, and is not
Every review on file is dated 2026-10-12, the day the patterns were written. There is no wave-1 lesson and no real learner (EXP-001 and EXP-002 are unrun). So "cases it did not produce" is, honestly, close to zero for every pattern: I count in-house cases and mark which are the pattern's own origin. Simulated findings are hypotheses (reviews/README rule 6). The result is mostly confidence going **down**, to match what is actually under each star.

## For each pattern touched since last review
| Pattern | Evidence since last review (cases it did not produce) | Confidence before → after | Scope change | known_failure added |
|---|---|---|---|---|
| predict-before-reveal | None positive in-house. Negative: 6 lessons satisfy the form but the guess cannot be wrong (odd-numbers, binary-numbers, supply-demand, exponential-growth, binary-search, mercator v1); birthday-paradox shows a match on the locked stage. QA passed 17/17, so the enforced check cannot see this. EXP-003, named as the test, has no file. | ** → * | Therefore gains: the commitment must be able to be wrong; the title/hook/options must not give the answer away | yes (3 entries) |
| artifact-before-account | No in-house case differs between primed and isolated; EXP-001 unrun. Observation only: isolated learner reviews found 5 fatal gate flaws that fact-check and QA of the same lessons missed. 16 of 17 learner reviews use one boundary and one reader model, so isolation of context is not isolation of witness. | ** → * | none | yes (2 entries) |
| earn-the-reveal | 17 of 18 lessons show the problem (pattern listed 8; 9 added), 5 as FATAL. But all arise from the wave that produced it (intra-day order not recorded), and the fix is untested. | * → * | The 4th bullet (question numbers match the stage) split into its own pattern | yes: fatal/revise applied inconsistently (5 fatal vs 5 revise on the same condition) |
| teach-the-payoff | One case, the one that produced it. In-scope lessons add evidence against the simple form: merge-sort-payoff (payoff performed, thesis still told), binary-search (a button performs it for the learner), gradient-descent (payoff told). | * → unstarred | `excluded_cases`: odd-numbers, binary-numbers, pendulum (not procedures) | yes (3 entries) |
| remove-the-easy-path | None. No generation has converged and no constrained branch exists. | * → unstarred | none | yes (never applied; tension with demo-standard) |
| pairwise-not-scores | None. No pairwise record exists; only 2 lessons have a v2. | * → unstarred | none | yes (not yet applicable) |
| objection-travels | 2 weak cases (mercator c3 answered in build.md v2; herd-immunity c5 disputed and blocking) both inside the rules that define the pattern. 2 gaps: WBR section 6 empty with 5 fatals and 1 dispute outstanding; natural-selection's borderline fatal lives only in a review file. | * → * | none | yes (2 entries) |
| simulated-learners-find-problems | No real-learner session, so no hit rate. 16 of 17 reviews share one boundary. | unstarred → unstarred | Therefore gains: vary the boundary across a wave | yes (2 entries) |
| keep-a-strange-branch | None. Exploration briefs are tagged in the domain files, but cycle-planning's exploration-bets table (bet, alternative, prediction, budget) is empty. | unstarred → unstarred | none | yes (reserve on paper only) |

Count rule used: a star needs at least one case the pattern did not produce plus a refutation condition that can currently be run. Four patterns lost the star because they had neither (teach-the-payoff had one anecdote, which the librarian's own scope forbids starring; remove-the-easy-path and pairwise-not-scores had none); two lost `**` because the support was literature or argument and the in-house observations were about implementation failure (predict-before-reveal) or unrun (artifact-before-account).

`product/demo-standard.md` still prints `**` for predict-before-reveal and `*` for teach-the-payoff and remove-the-easy-path. I may not edit it; routed below.

## Conflicts between patterns
- **label-the-model-on-the-stage vs the 25-word stage text budget and one-representation-on-a-phone** (demo-standard). A label costs words and a place on the screen. Proposed ruling: a chip counts against the budget, and the budget gives way before the label does, since a false fact on the stage is a fatal flaw under reviews/README rule 5 and an extra word is not. Needs the head-of-product, because demo-standard is not mine.
- **earn-the-reveal vs predict-before-reveal.** earn-the-reveal gates the reveal on what was seen; predict-before-reveal guards the start. No conflict, but one gap: a learner who predicts correctly by title (odd-numbers) is gated and still not corrected. earn-the-reveal's `may_call` points the right way; predict-before-reveal now carries the "can be wrong" clause.
- **teach-the-payoff vs numbers-from-the-stage / earn-the-reveal.** teach-the-payoff says make the learner perform the step; earn-the-reveal says do not reveal until the key state is seen. When the payoff step is a button that performs it (binary-search) both pass and the learner still learns nothing. The larger pattern here is earn-the-reveal: the learner's own act, not the lesson's, must reach the key state.

## Candidate new patterns
Threshold: three or more independent lessons, and every one written unstarred (they are the wave that produced them). Written as files:

1. **numbers-from-the-stage** (`numbers-from-the-stage.md`). 5 lessons: mercator-greenland (15x vs 10.7x), birthday-paradox (253 vs 406 pairs; 23 vs 29), binary-search (499 vs 500), natural-selection (10% more young vs 100 beetles), half-life ("48% decayed" for a run the learner did not make). Previously one bullet inside earn-the-reveal, where it hid; the fix is mechanical (derive strings from the stage's values) so it deserves its own name and, if it holds, a lint.
2. **label-the-model-on-the-stage** (`label-the-model-on-the-stage.md`). 6 lessons (compound-interest, supply-demand, projectile-angle, natural-selection, herd-immunity, pendulum-period), found by the fact-checker and learner in three domains. One reader model, so correlated.

Listed only, not written:

3. **Second fact-check for checker-added claims** (candidate). Context: the fact-checker found and recorded unverified claims in 16 of 18 lessons (roughly 40 in total, WBR: "every pass adds about 3"), which cannot count as verified until someone else checks them (working agreement 2). Cases that the second pass catches anything: one, merge-sort-payoff, where the second check verified c4 to c8 and found 0 disputes. That is a case for the step existing, not for it catching errors; zero catches. Defects in checker-added claims do exist (birthday-paradox c9, "far more than most people guess", has no source at all; base-rates F1/F2; natural-selection F1 source-line errors), but they were reported by their own author. Becomes a pattern if wave 1's second pass finds a wrong or unsourced added claim; becomes a distillation candidate if three waves find none (see distillation record). Evidence needed: second-pass outcomes per wave, in `company/reviews/<slug>/*-fact-check.md`.

## Retirements
None. Four patterns lost a star; none lost a case. No failed case was deleted from any file.

## Routed (not mine to do)
| To | Item |
|---|---|
| head-of-product | Update the marks printed in `product/demo-standard.md` craft rules; "One representation on a phone `**`" and "Numbers the learner can feel `*`" have no pattern file and no cases. Rule on the label-vs-text-budget conflict. |
| evaluation-steward | Write EXP-003 (it is named as the refutation test but there is no file). Give the "fatal" rule a threshold so earn-the-reveal verdicts stop splitting 5 and 5. Run a second boundary on one domain. |
| chief-of-staff | Section 6 of the WBR should list fatal flaws and disputes carried by lesson folders. |
| learning-designer | Add `keyState` to the brief in `meta.json`, so the earn-the-reveal count is a measurement. |
