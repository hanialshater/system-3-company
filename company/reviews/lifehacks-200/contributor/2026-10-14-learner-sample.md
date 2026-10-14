*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Life Hacks: household-boundary learner sample
date: 2026-10-14
reviewer role: learner-evaluator (independent from builders)
boundary: adult familiar with ordinary household tasks and basic arithmetic; unfamiliar with each lesson's specific mechanism.

## Scope and method

Exactly 21 allocated samples, grouped in three seven-lesson batches (resources, home, study); artifacts arrived in smaller sets and each tool/read batch stayed below fifteen lessons. For each completed sample I read the walkthrough transcript, saw all frames in sheet.png, and wrote the artifact-first findings to its review file before reading meta.json. No lesson source, curriculum, design/build notes, or claim account was read before the first finding. The transcript's optional learner-visible trust appendix is part of the artifact, not an independent verification source.

Verdicts apply only to the recorded experience and intended-objective comparison. They do not attest to factual accuracy, computer-use QA, accessibility, human learning or readiness of unsampled lessons. Category and lesson status remain review; no claims are changed. Fatal findings remain attached to their artifact until a later re-review resolves them.

## Batch 1: resources — seven historical reviews complete

The first sections of these seven records review artifacts generated from the resource build at commit bf149a5. The historical findings remain visible in each record. Section 3 in each record reviews a fresh fc2b349 render containing resource fix 52c3126 and states which objections the actual new artifact resolves.

| Sample | Verdict | Material finding | Review |
|---|---|---|---|
| lh-big-pack-price | revise | Explore says change quantity but the slider changes price. | [Record](../lh-big-pack-price/2026-10-14-learner-household.md) |
| lh-scale-recipe-portions | revise | Stage arithmetic traceable; recall asks unchanged quantity instead of scaling. | [Record](../lh-scale-recipe-portions/2026-10-14-learner-household.md) |
| lh-lead-time-stock | revise | Reorder trigger is not defined; buffer/demand distinction is arithmetic only. | [Record](../lh-lead-time-stock/2026-10-14-learner-household.md) |
| lh-watts-hours-trade | fatal | B graph labels A's hour span despite declared fivefold B duration. | [Record](../lh-watts-hours-trade/2026-10-14-learner-household.md) |
| lh-flow-times-minutes | revise | Fill pictures do not grow as duration raises both numeric volumes. | [Record](../lh-flow-times-minutes/2026-10-14-learner-household.md) |
| lh-turn-container-volume | launch | Paired products and rotated shapes explain equal ideal volume; hook gives answer early. | [Record](../lh-turn-container-volume/2026-10-14-learner-household.md) |
| lh-reuse-cost-per-use | revise | Crossover objective is told at sixty uses, not reached; recall asks constant single-use cost. | [Record](../lh-reuse-cost-per-use/2026-10-14-learner-household.md) |

### Fresh resource recheck — seven complete

All new transcripts were read before their sheets, all sheet frames actually seen, and fresh artifact findings appended before reopening each meta.json. This recheck stays within the original seven samples.

| Sample | Fresh artifact timestamp (UTC) | Latest verdict | Resolution and retained limitation |
|---|---|---|---|
| lh-big-pack-price | 00:46:59.390 | launch | Slider instruction now accurate; title still suggests answer direction. |
| lh-flow-times-minutes | 00:47:45.834 | launch | Fixed 72L scale makes both fills visibly grow; equal-duration prediction remains easier than volume computation. |
| lh-lead-time-stock | 00:48:02.444 | launch | Prediction/reveal define stock on hand when ordering; transfer recall requires demand plus reserve. Buffer is additive in expression, not separately colored. |
| lh-reuse-cost-per-use | 00:48:24.029 | launch | Equality reached and reveal gated at sixty; transfer recall asks new €18 crossover. Stage stops at matching threshold. |
| lh-scale-recipe-portions | 00:48:40.156 | launch | Numeric prediction and ten-portion transfer recall replace operation labels and constant-B recall. Base 75g/portion is inferred from 300÷4. |
| lh-turn-container-volume | 00:48:57.653 | launch | Original clear product/geometry relationship remains. Answer-giving hook and unlabelled edges remain nonblocking limitations. |
| lh-watts-hours-trade | 00:49:21.028 | launch | Historical fatal resolved: actual B labels now 5h/15h versus A 1h/3h. Equal pixel slopes use explicitly different horizontal spans, so labels still matter. |

## Batch 2: home — seven complete

Fresh be775a7 artifacts recorded after 2026-10-14T00:35Z. All sheet frames actually seen.

| Sample | Verdict | Material finding | Review |
|---|---|---|---|
| towel-spread-dries-first | revise | Folded numeric baseline absent; flux unexplained; generic recall omits the area comparison. | [Record](../towel-spread-dries-first/2026-10-14-learner-household.md) |
| wobbly-table-quarter-turn | revise | Find balance jumps to zero and disables slider; signed-gap crossing is unobserved; recall options do not answer level question. | [Record](../wobbly-table-quarter-turn/2026-10-14-learner-household.md) |
| square-bow-stays-tied | revise | Wrap action consumes loop length before walking; Walk 20 steps adds ten steps' visible loss; recall names no knot step. | [Record](../square-bow-stays-tied/2026-10-14-learner-household.md) |
| long-cord-knots-itself | revise | Bounded seeded frequency comparison clear; generic recall does not identify study-versus-drawer conditions. | [Record](../long-cord-knots-itself/2026-10-14-learner-household.md) |
| ruler-start-not-zero | revise | Arithmetic clear; extra green span ambiguous; recall asks for calculation but offers none. | [Record](../ruler-start-not-zero/2026-10-14-learner-household.md) |
| suitcase-rotate-block | revise | Geometry comparison clear; generic recall does not explain unusable narrow strips. | [Record](../suitcase-rotate-block/2026-10-14-learner-household.md) |
| laundry-sort-before-walk | revise | Carrying-capacity assumption arrives after prediction; no sorting shown; generic recall omits constraint. | [Record](../laundry-sort-before-walk/2026-10-14-learner-household.md) |

## Batch 3: study — seven complete

Fresh be775a7 artifacts recorded after 2026-10-14T00:35Z. All sheet frames actually seen.

| Sample | Verdict | Material finding | Review |
|---|---|---|---|
| spaced-beats-cram | revise | Graph/reveal distinction clear; repeated prediction recall omits invented-versus-research objective. | [Record](../spaced-beats-cram/2026-10-14-learner-household.md) |
| apply-not-quote | revise | Sorting manipulation clear; New values permutes same numbers; recall repeats wording instead of application. | [Record](../apply-not-quote/2026-10-14-learner-household.md) |
| calendar-needs-travel | revise | Minute-range conflicts clear; recall only repeats Travel/Meeting-only wording. | [Record](../calendar-needs-travel/2026-10-14-learner-household.md) |
| short-jobs-clear-a-queue | revise | Totals traceable; reveal obscures trade in individual waits; recall repeats fixture-bound labels. | [Record](../short-jobs-clear-a-queue/2026-10-14-learner-household.md) |
| alphabet-sort-search | revise | No target, comparison or discarded half shown; recall omits sortedness. | [Record](../alphabet-sort-search/2026-10-14-learner-household.md) |
| request-needs-the-object | revise | Checklist fills without resolving pictured draft ambiguity; recall repeats prediction. | [Record](../request-needs-the-object/2026-10-14-learner-household.md) |
| select-before-replace | revise | Selected position never marked; Replace remaining/Replace all labels differ; recall repeats prediction. | [Record](../select-before-replace/2026-10-14-learner-household.md) |

## Nine revised home/study rechecks — complete

Designated build 64b7b1e. Each lesson transcript was read before seeing every fresh sheet.png frame, with lesson-artifact findings appended before the revised metadata account. Exact lesson timestamps below include the home captures at 00:53:52–00:53:58 rather than rounding them to after 00:54. Then each phone-recall.md was read before actually viewing both phone-recall-question.png and phone-recall-answer.png. Recall findings were appended before reopening meta.json.

All nine recall artifacts exercise the actual revisit UI with locally seeded two-day history and scripted correct selections. They establish what that UI displayed; they provide no human retention or learning evidence. The review is phone-scoped; the coordinator's desktop/contract QA is a separate attestation.

| Sample | Lesson artifact UTC | Phone recall artifact UTC | Latest verdict | Resolution / remaining finding |
|---|---|---|---|---|
| towel-spread-dries-first | 00:53:52.914 | 00:58:01.405 | revise | Area/time transfer recall resolved. Folded numeric baseline and flux calculation remain untraceable on the first-lesson path. |
| wobbly-table-quarter-turn | 00:53:53.090 | 00:58:03.587 | revise | Contact-versus-level recall resolved. Signed-gap crossing is still asserted after jumping directly to zero. |
| square-bow-stays-tied | 00:53:52.819 | 00:58:05.755 | launch | Tie now leaves 20mm loops at zero steps; Walk20 advances to twenty with 4/14mm. Case labels and directional transfer recall resolve earlier objections. |
| long-cord-knots-itself | 00:53:58.742 | 00:58:07.994 | launch | Actual hypothetical-frequency recall distinguishes setup-bound observation from future-count/household guarantees. Bounded comparison remains clear. |
| ruler-start-not-zero | 00:53:57.306 | 00:58:10.159 | launch | Actual changed-start/end numerical recall requires subtraction. Closer span inspection narrows old green-line ambiguity to initial unlabelled endpoint indicator. |
| laundry-sort-before-walk | 00:53:58.820 | 00:58:12.331 | revise | Explicit finite-capacity travel transfer recall resolved. First-lesson capacity assumption still arrives after prediction and sorting remains absent. |
| alphabet-sort-search | 00:54:05.753 | 00:58:14.599 | launch | Target, scan baseline, midpoint elimination and candidate trace visible. Actual recall names alphabetical order as required condition. |
| apply-not-quote | 00:54:03.138 | 00:58:16.771 | launch | Prediction now distinguishes presence from order; Try values is accurate. Actual 7/1/4 transfer recall resolves wording-only task. Reveal's new-values wording remains minor. |
| calendar-needs-travel | 00:54:05.949 | 00:58:18.886 | launch | Actual 14:30/twenty-minute departure transfer resolves repeated prediction recall. Minute-range manipulation remains clear. |

All nine old recall objections are resolved by actual rendered question/feedback evidence. Six whole-lesson recommendations move from revise to launch; three retain specific first-lesson exploration objections. History remains in each individual record. No work beyond these nine was added in this final recheck pass.

## Open objections and handoff

All material findings sent promptly to the root coordinator for builder routing. The historical resource objections, including the B-duration fatal, are resolved only where the actual fresh recheck above supports resolution. No current fatal remains within these sampled artifacts.

Eight sampled lessons retain revise findings: towel-spread-dries-first (model traceability), wobbly-table-quarter-turn (crossing mechanism), laundry-sort-before-walk (prerequisite/title), plus the five unchanged samples suitcase-rotate-block (generic spatial recall), spaced-beats-cram (recall omits illustration-versus-evidence objective), short-jobs-clear-a-queue (individual-wait trade explanation and repeated recall), request-needs-the-object (checklist versus ambiguity resolution and repeated recall), and select-before-replace (invisible selection, mismatched command name and repeated recall). Their clear manipulations are acknowledged in the records. These are specific problems/hypotheses, not human-learning failure measurements. Later changes require actual new artifacts before resolution. The root coordinator alone owns board, progress and events updates.

Current coverage: 21/21 allocated samples reviewed, plus fresh rechecks of all seven resources and the designated nine home/study samples, including actual phone recall UI for those nine. Historical initial recommendations: nineteen revise, one fatal, one launch. Latest recommendations against the actual reviewed versions: eight revise, thirteen launch, zero fatal. These recommendations do not change review/publication status or attest to claims, human learning, QA or accessibility. No broader category-quality inference.
