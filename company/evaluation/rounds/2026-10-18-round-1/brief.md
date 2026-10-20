# Round 1 reviewer brief — browser evidence only

Date: 2026-10-18. Owner: head-of-evaluation. Founder explicitly authorized provisional full-catalogue coverage after the first calibration: 1,283 demos, existing13batches, published first, one primary review/item plus10% independent overlap. Root manages queues and dispatch. This brief does not authorize publication, serving scores, source inspection or editing demos/models. Prior calibration failure remains historical evidence; provisional complexity does not block other dimensions or authorized coverage. Ratings remain shadow editorial evidence, not validated learning outcomes or official constitutional review records.

## Inputs and independence

Use your assigned queue from the existing round-1 manifest as DATA only: identifier, domain, expected version and history-safe preview URL. Do not inspect Demo.tsx, meta.json, source code, builder notes, prior reviews, rankings or other reviewers' records to rate a demo. Source hashes supplied by the manager are identity data only, not evidence of quality. Do not browse other queues to select attractive examples. If you built/revised an assigned item or know its prior ranking, report the conflict and leave reassignment to root.

Use computer-use browser tools against `http://127.0.0.1:3111/hq/personalization/review/<slug>` (or the exact review base assigned by root). Never substitute `/d/<slug>`: that can alter real learning history. Confirm the preview no-history banner on entry. If preview isolation is absent, stop that item and report blocked rather than risk customer progress. Disclose visible status/trust-count chrome and ignore it in ratings; this is partial blinding, never fully blind evidence. Do not open trust/process panels for scoring.

Declare the common learner boundary: everyday numeracy, simple charts, comparison of numbers and familiar household objects; no domain-specific theory assumed. State observed prerequisite demands without reading the builder's account. Begin records: “Simulated learner. This review finds problems; it is not evidence that anyone learned.”

## Real walkthrough for each item

1. Observe title/hook, locked stage and prediction choices. Commit an actual prediction; record the choice.
2. Explore the actual controls. Try one meaningful contrast and, where feasible, a boundary/reset or deliberately incorrect action. Record exact actions and visible effects, including retained state/counters.
3. Open the reveal through the actual required path. Record its connection to your observed result, any mismatch and any limitation.
4. Record tested viewport and available screenshots/observation references. Missing exploration/reveal is missing evidence, not permission to infer the ideal result. A full phase sequence is not exhaustive device/accessibility coverage.

Aim for a reasonable2–3minute walkthrough; use at most5minutes of exploration per demo before saving a partial/blocked record and proceeding. This limit is for active exploration, not a reason to abandon a working item during ordinary tool latency. Retry a transient page failure once if safe. Do not spend the whole batch troubleshooting one lesson. Distinguish route/infrastructure failure from an observed dead lesson control. Do not claim a runtime defect is global from one failed path.

Save one complete record immediately after EVERY item, append-only or distinct per-item file as root instructs. Include partial items too. Never wait until the end of100 to write evidence. Inform root of sustained route/tool failure; do not fabricate or silently drop items. Preserve any earlier record if later amended; identify the replacement and reason.

## Dimensional judgements

For quality prediction, interaction, payoff, clarity and transfer, use proposed ordinal0–4 with a specific observed reason, evidence reference and low/medium/high confidence EACH. Null = not observed/insufficient evidence. Zero requires observed absence/breakage; route404, missing phase or unreachable control is not automatically zero. A broken control may support a quality finding only when actually observed and distinguished from infrastructure.

General anchors:0 observed absent/broken;1 major observed weakness;2 adequate with material limitation;3 strong on tested path;4 exceptional evidence from multiple meaningful contrasts/boundary plus clear explanatory connection. Do not manufacture a4 because the title sounds interesting. Confidence medium normally means one direct path; high needs repeated/contrasting observation, not a confident writing style.

- Prediction: clear commitment, plausible alternatives, misconception surfaced without answer leakage.
- Interaction: learner actions visibly reveal the relevant mechanism, with causal contrasts rather than decorative animation.
- Payoff: reveal resolves the prediction and explains observed state/change; identify a stated limit.
- Clarity: actual task, controls, labels and feedback understandable in tested viewport. Do not generalize desktop clarity to phone.
- Transfer: observed reusable principle/application and applicability conditions. A suggested example is not evidence a learner can transfer.
- Accessibility: null unless you actually perform and record sufficient checks for the claimed level. AX labels/screenshots alone are insufficient. Name keyboard, focus, contrast, phone, zoom/reflow and motion evidence individually; untested modes stay unknown. Never infer accessibility from source or visual polish.

Experience intensity uses0 absent,1 incidental,2 supporting,3 central,4 central across multiple distinct observed contrasts, with null for unknown. Higher is NOT better. Give separate reason/evidence/confidence for surprise (expectation reversal), visualExplanation (graphics carry mechanism), playfulness (reversible discovery), practicalValue (concrete use), depth (distinct mechanisms/boundaries). Do not measure enjoyment, dwell or learning by intuition. Add one specific whyCool sentence linking an action to a visible payoff and one material caveat.

Complexity remains PROVISIONAL: report conceptualChallenge gentle/balanced/demanding/unknown against the boundary, plus separate prerequisiteNovelty and notationRepresentationBurden low/moderate/high/unknown with reasons. Gentle: one supported relation; balanced: linked relations or supported invariant; demanding: multiple dependent abstractions/conditional or worst-case reasoning needed for core result. Separate optional extensions. Units, unfamiliar notation and clipping can burden use without making the core idea conceptually demanding. Interface friction belongs in findings, not a complexity upgrade. Do not force consensus; first calibration showed these judgements unstable.

## Minimum incremental record

Follow root's machine-readable schema exactly. Required content: assignment ID/slug/expected version/manager identity pins; reviewer and date; learner statement/boundary; safe preview URL; actual viewport; phase coverage booleans; actions and visible outcomes; per-dimension score/reason/evidence/confidence; experience descriptors; provisional challenge and notation burden; whyCool/caveat; fatalFindings; missingEvidence; reviewState; approximate effort. Unknown fields explicit null. If no reliable phase was reached, record blocked/unknown with reason and no invented scores. If only some phases were reached, record partial-real-walkthrough and score only independently supported dimensions. Source-only inference is prohibited.

Do not produce an overall numerical average, rank, bucket or serving recommendation. Do not mark an item published/approved, or remove a hold. Report suspected false claims, dead controls or misleading mechanisms as specific findings for existing owners, without authoritatively fact-checking from memory. Overlap reviewers work independently and do not read the primary record. Completion means every assigned item accounted for with honest evidence or explicit blocked/partial status, not every field filled with a number.

## Canonical storage fields for this run (root clarification)

The canonical per-item filename is exactly `<slug>.json` under `reviews/primary/` or `reviews/overlap/`. Context amendments belong under `reports/` and must not be counted as independent reviews. Schema identity is `catalogue-review-record-v1`. Alongside the descriptive content above, these exact machine fields are mandatory:

- `reviewer`: your current reviewer ID; `reviewKind`: `primary` or `overlap` from assignment.
- `slug`, `demoVersion`, `batchId`, `url`: pinned assignment values; `sourceRevision`: inventory revision.
- `status`: `walkthrough-reviewed`, `partial`, `blocked`, or `inaccessible`. A descriptive `reviewState` is optional and does not replace `status`.
- `coverage`: object with boolean keys `prediction`, `exploration`, `reveal`; set true only for phases genuinely performed.
- `observations`: exact actions, visible outputs, reveal facts, and visual findings.
- `quality`: `prediction`, `interaction`, `payoff`, `clarity`, `transfer`, `accessibility`.
- `experience`: `surprise`, `visualExplanation`, `playfulness`, `practicalValue`, `depth`.
- Every dimension is an object `{score, reason, evidence, confidence}`; score integer0–4 or null.
- `complexity`: object with `level`, `reason`, `conceptualDemand`, `interfaceBurden`; add the finer challenge/prerequisite/notation descriptors above when supported.
- `whyCool`, `caveat`, `effort`, `notApprovedForServing: true`.

Include actual viewport/theme and simulated-learner boundary as metadata. Canonical counts require matching identity/version, complete actual phase coverage and evidence for all scored dimensions. Schema repairs to one's own records may add missing metadata only after checking actual saved phase evidence; preserve judgments and disclose the repair. Do not alter another reviewer's record.
