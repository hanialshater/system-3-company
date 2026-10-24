# 200-demo draft batch: interaction design

owner: design-lead
date: 2026-10-24
status: implementation specification; no artifact review or publication approval
route: design-lead → demo-builder; shared renderer work → platform-engineer under principal-engineer
inputs: founder request for 100 demos from each supplied list; category selections in `company/domains/briefs/2026-10-24-{behavioral,probability}-100.json`

## Decision

Agree with changes: keep every lesson in the existing **single-card** format. A family below is an explore-stage construction, not a new format ID. Use **simulation-run** only when the learner actually generates a seeded sample. This is a design specification, not a change to the lesson contract. Builders choose the family that exposes the manager's specific objective; they do not change what the lesson teaches. Each record must supply its own state, numbers, controls, question, and conditional reveal. A new title on an identical question or state does not make a distinct lesson.

The frontend must show the mechanism promised in the brief. Do not use a generic two-bar answer chart for all 200 records. Controls must change the causal variable, allocation, evidence, or sample; a button that merely replaces text with the answer is insufficient. Hypothetical arithmetic must say **Toy model**. A reported study result must say **Reported study**, carry the source claim, and remain unverified until independently checked. A contested finding cannot determine the right prediction option as if it were a universal effect.

## Stage families

| Family | Inputs supplied per lesson | Learner action and picture | Required witness before reveal |
|---|---|---|---|
| **Equivalent frames** | Two exact descriptions of one numeric lottery or outcome; normalized outcome table | Choose a frame, then switch it. One token population keeps the same surviving/losing tokens; only the wording/reference point changes. | Both frames visited; retained paired outcomes show equivalence. Question asks about outcomes or a stated model, never predicts that this learner must exhibit a bias. |
| **Budget allocation** | Fixed budget, two to four destinations, explicit payout/utility rule | Transfer one token between visibly labelled containers. A computed total or shortfall updates immediately; conserve total tokens. | At least two distinct allocations, including the question's allocation, recorded in a compact comparison strip. |
| **Delay and commitment** | Amounts/effort, times, explicit discount rule, whether an option is locked | Move a time marker or reserve part of a future budget. Show two dated payoff markers and a computed present-value comparison. | Question's dates reached plus one moved date; both computed comparisons retained. Only a stated model's ranking is an answer. |
| **Reference-point ladder** | One outcome, at least two reference points, explicit piecewise valuation rule | Move the reference marker across a fixed outcome. A single number line redraws gain/loss distance and value. | Both sides of the reference point visited; retain the question's signed distance. Model loss multiplier is a parameter, not a claim about everyone. |
| **Choice-set geometry** | Two or three alternatives with two comparable attributes | Add/remove the third option; plot the alternatives in attribute space. Highlight strict dominance and tradeoffs only after commit. | Both sets visited; the chosen/removed alternative and dominance relation remain visible. A decoy study is not simulated by hard-coding a majority choice. |
| **Evidence and uncertainty** | Original and replication estimates or effect intervals, sample sizes, source status | Select the evidence row or change the precision/sample slider; horizontal intervals or a small forest plot move against the zero line. | Both evidence views visited; retain intervals and status, not a verdict badge alone. Contested studies ask what the evidence permits. |
| **Causal intervention** | At most four named DAG nodes, arrows, explicit structural equations and intervention target | Toggle observe/intervene or set the treatment. Cut incoming arrows only in intervention mode; same small node diagram displays generated outcome totals. | Observation and intervention compared at the question's treatment. A DAG without changed arrows/outcomes is insufficient. |
| **Strata and denominators** | Two groups × treatment/outcome counts; explicit weighting rule | Switch pooled/within-group/standardized views. One 2×2 count display or denominator mosaic changes weights while counts remain legible. | Pooled and adjusted case both visited; preserve the two result rates and common weights. Label observational comparisons without implying identification. |
| **Sampling and randomization** | Finite population or distribution, seed, sample size/assignment rule, statistic | Draw/assign a batch and step a second batch. Dots move into groups; a short histogram or difference marker updates from actual draws. | Question's sample size plus comparison reached; show actual run counts, seed and distribution rule. Never promise every run matches an expectation. |
| **Sequential belief** | Prior odds, likelihoods or success/failure counts, explicit independence assumption | Add one observation, then compare a second. A probability strip or density sharpens with the actual evidence sequence. | At least two updates; retain prior and current posterior plus evidence counts. The reveal reads current values, not a prewritten sample. |
| **Payoff and risk path** | Explicit outcome distribution, horizon, betting fraction/utility rule, seed if random | Change stake or strategy and advance a path. Show wealth tokens or one time path, with expected payoff separate from realized wealth. | Question's stake/horizon visited and a contrasting stake; retain the computed or sampled result quoted by the reveal. Expected value is not a guaranteed outcome. |

For behavioral entries that are inherently empirical, prefer evidence-and-uncertainty or a faithful **labelled** reconstruction. Do not manufacture participant-level data, personal diagnostics, or a crowd distribution. For causal entries, any identification assumption is visible in the source claim and short caption; a randomized toy model must not be labelled real evidence.

## Kit contract and state

Use the existing `Lesson` API, kit controls, and `useMilestones`/`Milestones`; never edit `src/kit/Lesson.tsx` or protected QA tests. Keep state above `reveal` so the reveal can quote the same computed witness as the stage.

1. Predict: two to four options of the same precision; commit before all simulation/interactive controls. Every stage control has `disabled={locked}`. The locked picture can show the question's setup but no answer marker, numerical result, option highlight, result-coloured path, or diagnostic label. Render answer readouts as `?`.
2. Explore: put milestone-reaching controls first in DOM order. A single press must change the visible picture within 450 ms. Use at most six controls. Sliders must produce a visible change after two arrow presses. Avoid requiring 20 clicks to finish a trial; provide a deterministic batch/step action.
3. Earn: `interact()` fires once for each genuinely new required milestone. Set `minInteractions` to that milestone count. A free slider twitch must not unlock a reveal that describes an unvisited reference case.
4. Witness: retain the question's required state in a small comparison strip once reached. The reveal and the strip must share computed values and the same rounding. Use explicit units and denominators.
5. Reset: Reset returns the active exploration to its initial state but keeps the completed witness visible if the kit still permits reveal. Alternatively keep all quoted results derived from the current state and phrase the reveal accordingly. Never combine reset-zero stage with old-run prose. Reset is disabled when it would do nothing.
6. Reveal: 45–75 words preferred, 90 maximum, two short paragraphs. Quote what the learner can still see and explain the mechanism. A source/limitation sentence counts toward the budget. No generic praise, broad maxim, or unobserved study claim.
7. Recall: a new concrete case testing the same mechanism, not the same values or a memory of a paper's headline.

## Phone geometry and appearance

- Check 390×844 with reveal open and the least favourable prediction option; also check 360 px width and desktop. Target stage picture 300–342 px wide and 140–190 px high plus one compact control row. These are budgets, not permission to shrink illegibly.
- Stage text ≤25 words, excluding only brief-declared manipulated stimulus; total stimulus stage ≤50. A source citation is better in metadata than as a long chart footer.
- Meaning-carrying labels ≥11 px at natural phone size and never below the design-system 10 px reveal floor. Keep axis labels outside dense marks. Prefer counts in cells to tiny legends.
- At reveal, stage top and last reveal line are on screen at 390×844. Cut prose or redundant readouts first. Do not introduce inner scroll, smaller type, or overflowing three-column panels.
- Tap targets ≥44 px, no overlapping SVG targets; use actual `Control`/`Slider` elements for interaction and SVG for the picture. Prefer one control row, max two.
- Colour indicates state redundantly with outline, hatch, text, or shape. Text uses `--fg`, `--muted`, or text-safe semantic colours; `--domain` is for fills/borders, not light-theme text. Add SVG accessible names that describe the currently visible values.
- No decorative hero needed: token bowls, timeline, 2×2 mosaic, DAG, intervals and wealth paths are the explanatory artwork. Keep motion optional and respect reduced motion.

## Titles and predictions

The title and hook must preserve the actual uncertainty in the question. Avoid titles such as “Defaults win”, “Small samples mislead”, “Adjusting reverses the result”, or “Losses hurt twice”. A scene or tension such as “One more option?”, “Two prices, one outcome?”, or “Who received the treatment?” is acceptable only if the actual question is not answered by it. Do not use the right answer as the only option with a number or caveat. For reported or contested findings, the correct option may be “This comparison cannot establish that” only when the actual evidence/assumptions justify it and the other options are comparably specific.

## Build/review route

The category manager owns objective, empirical wording, overlap and source choice. Existing demo-builder implements lesson-owned records and stage use; platform-engineer implements any new reusable renderer/model surface under principal-engineer's plan. Independent reviewers receive built artifact URLs/walkthroughs, not this explanatory account first. This specification is not a review pass. No publication or deploy is approved.

Build a representative per family before scaling it; inspect the phone frame, answer gating, reset-after-milestone, both prediction-correctness branches and the all-controls-once path. Review every new family and at least 10% of the completed batch for fit and visual clarity. The 200 source records need the lesson contract QA independently of that sample. When a family cannot show the objective with a small picture, route that lesson back to the category manager rather than filling the batch with an answer-only card.

## Objections and disposition

- **Batch uniformity:** a shared renderer may turn distinct concepts into the same exercise. **Answer:** choose mechanics by objective, supply source-specific structure and numbers, and inspect family coverage plus exact-question/state duplicates before PR.
- **Empirical overclaim:** deterministic toy output may look like measured psychology. **Answer:** labelled toy arithmetic and reported-study evidence are separate states; uncertain empirical claims remain unverified and cannot be fabricated into learner results.
- **Review independence:** the design author could approve their own template. **Answer:** this file is a spec only; completed artifacts need a different design reviewer or an explicitly recorded independent review route.
