# Dispatch request: Quality · Algorithms 200 · 2026-10-16

poc: evaluation-steward (Hilde)
lane: 10 Quality
slots asked: at most 3 checkers concurrently, 0 builders; QA uses at most 2 Playwright workers total on this host. A production build is a separate, operator-owned build slot.
since last round: new founder request for 200 additional, nonredundant algorithm demos in the existing `cs/algorithms` strand. This file requests reviews; it contains no artifact review, claim verdict, or launch approval.
held or declined: reviews wait for actual lesson artifacts and a pinned review build. Builders may run engineering checks but may not file independent review evidence or verify their own claims. No protected-path changes, publish, or deploy are requested.
standing orders: none created; the finite batches below expire 2026-10-23. Unfinished work returns to this manager.
for the founder: none; incomplete reviews leave a draft PR and draft lessons. No gate waiver is proposed.
objections: a shared renderer can make 200 lessons look mechanically alike; its success does not establish 200 distinct learning outcomes. B3 checks that risk and holds unsampled lessons from launch.

## Required handoff before any checker starts

The chief of staff supplies a clean review checkout and one production server for the integrated branch; PE owns any build work. Pin the base SHA, reviewed head SHA, build SHA, URL, dist directory, harness stamp, and start/end tree status in the run record. Do not rebuild or swap the server during a run. A missing, dirty or unknown build identity permits exploratory findings only, never gate evidence. Apply the R3a equivalence check in `company/ops/dispatch-requests/2026-10-16-r3-quality.md` and `company/reviews/org/2026-10-16-r3a-scope/check.sh` whenever the reviewed head differs from the server SHA.

Use `company/domains/briefs/algorithms-200.json` as the accepted cm-cs coverage manifest: 20 topics × 10 new lessons, with a distinct objective, misconception, nearest existing/new neighbor, concrete fixture and source anchors per row (CS batch B1). Freeze its SHA, base-to-head additions, lesson versions, interaction families and model/example entry points in `artifacts/algorithms-200/review-manifest.json`; never infer membership from similar prefixes or all CS lessons. The operator retains this manifest with the reports and copies its rows into `company/reviews/algorithms-200/2026-10-16-review-index.md` so the durable index identifies every requested lesson.

The durable index has one row per slug: topic, version, reviewed SHA, QA record, fact-check record, learner record or `not sampled`, and open findings. Existing records for earlier lessons or versions do not satisfy these requests. An absent lesson or a count other than 200 stops dispatch and returns to cm-cs.

## B1 · Independent browser QA on all 200 lessons

role: qa-tester (existing `.claude/agents/qa-tester.md`)
order: first, after the pinned server and manifest exist; B2 may run alongside it, B3 follows available walkthroughs
kind: check
worktree: no builds in the checker; use the isolated review checkout
model: agent default
project: [project:catalog], subject to the operator's project/budget preflight
budget: 1 qa-tester run owns eight sequential sub-batches of at most 25 slugs; 400 contract cases in total (200 × phone and desktop), plus feed specs once per build and exploratory checks. Resume on the same brief if the run cannot finish; do not spawn eight reviewers.

inputs: manifest slugs and rendered pages only first; `tests/qa/contract.spec.ts`, `tests/qa/feed.spec.ts`, `playwright.config.ts`, and `company/qa/computer-use-testing.md`. Do not read builder explanations before findings.

Use the existing comma-separated `QA_ONLY` filter, a unique `QA_OUT=artifacts/algorithms-200/qa-01` through `qa-08`, the pinned `QA_BASE_URL`, and `npm run qa -- --workers=2`. Check every batch's selected test list against its 25 manifest rows: `QA_ONLY` silently ignoring a misspelled or absent slug is not coverage. Record both viewport results and retries for every slug; pass requires both cases and zero retries. Use the same `QA_OUT` with `npm run company -- qa-record`, then add the required `target: <url> · mode: external · built from: <sha>` line to each generated record. Never label a partial batch a complete 200-lesson run.

On every lesson, also probe phone controls in reverse order after prediction, reset mid-run and after the milestone, and the maximum/minimum or last-step-first path. Distinguish a genuine dead end (reveal locked, nothing unlocks within 8 seconds, and no usable control changes the stage) from an unfinished value/sequence milestone. Record undiscoverable milestones as findings. On at least one lesson per interaction family, add double taps, keyboard, reduced motion, both themes, 360×640 layout and feed away/back; report which slugs received these extra probes.

Run the existing committed `tools/reveal-fit.mjs` on all 200 against this server with `--jobs 2 --strict --shots`; retain per-wave JSON and inspect the images for named picture elements and the type floor. Tool output alone cannot establish semantic legibility. Preserve initial failures and later rerun evidence separately.

outputs: `company/reviews/<slug>/2026-10-16-qa.md` (use the actual review date), per-wave raw reports/screenshots, `company/reviews/algorithms-200/2026-10-16-qa-summary.md`, and index QA columns.
done when: index accounts for exactly 200 distinct slugs; all have two viewport results and a per-slug record; every failure, missing case and extra-probe scope is named. Completion may be 200 reviewed with failures; it is never shorthand for 200 passes.
checked by: release-manager compares manifest, raw report counts, server identity and per-slug records; evaluation-steward checks independence.
stop if: build drift, harness modification, OOM/host overload, missing browser, or a rendering error shared by the interaction family. Preserve evidence, route the defect to PE/cm-cs, then resume affected rows after the fix; do not loosen tests or add fake stage controls to satisfy them.

## B2 · Independent fact-check of all lesson claims and executable examples

role: fact-checker (existing `.claude/agents/fact-checker.md`)
order: after artifact handoff; parallel with B1, with no additional build
kind: check
worktree: isolated review checkout; no lesson-code edits
model: agent default
project: [project:catalog], subject to operator preflight
budget: 1 fact-checker run owns ten sequential sub-batches of 20 slugs; resume on the same brief if needed. A difficult topic may return incomplete rather than compressing its checks into a generic verdict.

inputs: rendered walkthrough transcripts/screenshots first, then the 20 lessons' `meta.json` claims and cited sources, the executable deterministic model examples, and the frozen manifest. Builder notes are read only after initial findings are written. Independently read the sources: a citation URL or a passing builder script is not verification.

For every slug, compare hook, options, stage captions/readouts, reveal and recall with its claim ledger; record missing factual claims as unverified. Independently calculate the question's exact answer and every numerical/state assertion the reveal quotes. Execute its deterministic model on the teaching case and at least two relevant boundary/adversarial cases, comparing with an independent small oracle or hand derivation; record inputs, outputs, expected values and the derivation/source. Choose checks that fit the algorithm: ties/duplicates and empty/absent targets; disconnected/cyclic or negative-weight graphs where relevant; DP optima versus brute force on small inputs; data-structure invariants after update/query; numerical tolerance and preconditions. If a boundary is excluded by the lesson, check that the exclusion is explicit rather than claiming universal correctness.

Check time/space bounds and algorithm preconditions separately from finite examples: a few traces cannot prove an asymptotic or general correctness claim. A production model agreeing with a builder's expected literal is not independent evidence. Shared model tests cover only their stated inputs; check each lesson's own configuration, answer and reveal. Mark only independently supported claims verified, using the existing fact-checker identity and actual review date; leave unsupported claims unverified or disputed with a specific reason. Never edit Demo.tsx or claim text to make it true.

outputs: `company/reviews/<slug>/<date>-fact-check.md`, authorized claim-status fields in each `meta.json`, `company/reviews/algorithms-200/2026-10-16-fact-check-summary.md` with per-claim coverage and oracle details, and index fact-check columns. If a source cannot be read, record that limit and hold that claim.
done when: all 200 slugs have an explicit checked/held result; every factual assertion is accounted for, and the summary separates verified, disputed, unverified, and not-yet-checked claims. Do not convert unvisited rows to verified.
checked by: release-manager checks claim status and author independence against the per-slug record; evaluation-steward audits the evidence trail.
stop if: the checker authored the lesson/claim, examples are unavailable, the source is inaccessible, or a shared-model defect invalidates a family; report the affected slugs and return fixes to cm-cs/PE.

## B3 · Artifact-first learner review, representative first tranche

role: learner-evaluator (existing `.claude/agents/learner-evaluator.md`)
order: after walkthrough artifacts exist for the frozen versions; independent of builder accounts
kind: check
worktree: isolated review checkout, no builds or lesson edits
model: agent default
project: [project:catalog], subject to operator preflight
budget: 1 learner-evaluator run owns four sequential sub-batches of up to 10 lessons for the initial sample (at most 40); remaining lessons are a later dispatch, not implied approvals

inputs: `npm run walkthrough -- <slug> --url <pinned-url>` output (transcript then sheet.png), and only the supplied knowledge boundary. Metadata/brief/build notes follow written initial findings. If screenshots cannot be seen, explicitly say so and give at most revise.

Select the sample before reading builder notes: two lessons per topic (40 total), covering every interaction family where possible, novice and prerequisite-heavy boundaries, families with B1/B2 findings, and near-neighbor objectives most likely to be redundant. Use the coverage artifact's objective/prerequisite map to select neighbors, without presenting its explanatory notes as evaluator input. Record exact sampled slugs and reasons. If additional family/risk coverage needs more than 40, report the gap and request the next tranche; do not silently claim it covered.

Each review asks what action makes this particular algorithm payoff visible, whether the prediction has leaked, whether the stage demonstrates the promised cause, and whether reveal/recall use a distinct transferable idea rather than a renamed task. A repeated generic control sequence is a concrete concern when it reveals no algorithm-specific mechanism. Report pairwise redundancy as a finding addressed to cm-cs, with both slugs and the overlapping objective. Do not give absolute scores.

outputs: one `company/reviews/<slug>/<date>-learner-<boundary>.md` using `_template-learner-review.md`, with `lesson version: vN`, exactly `Verdict: launch|revise|fatal`, screenshots-seen status and artifact-first findings; authorized evidence links only after the record exists; `company/reviews/algorithms-200/2026-10-16-learner-sample.md` naming sampled and unsampled rows and scope limits.
done when: every sampled lesson has its own versioned findings and verdict; no copied batch verdict stands for an unwalked lesson. Every review begins “Simulated learner. This review finds problems; it is not evidence that anyone learned.” The sample establishes neither learning nor a launch gate for unsampled lessons.
checked by: evaluation-steward audits account ordering and sample limits; release-manager checks versioned evidence for any eventual publish candidate.
stop if: the evaluator built a sampled lesson, cannot see the artifact, or metadata/build explanations were read first. Report the independence break and request another evaluator; do not manufacture a clean artifact-first account.

## Return and launch boundary

Chief of staff integrates records only after each checker returns its batch; cm-cs decides lesson/objective revisions and PE routes shared-code fixes. Reviewers recheck affected slugs after content/model/renderer changes under R3a. No builder verifies its own fixes. Release-manager applies the existing gates individually: independently verified claims, valid browser QA, current-version borrowed-mind review, no unresolved fatal flaw, and human evidence where required by confidence. Until then, retain draft lesson status and a draft PR. The 200-lesson addition can be reviewable while these reviews remain incomplete; the final report must give actual counts rather than “all reviewed” or “production-ready.”

Scalable tooling already exists (`QA_ONLY`, `QA_OUT`, `QA_BASE_URL`, walkthrough `--url`, and committed reveal-fit tooling). This request does not change `tests/qa/**`, `tools/company.mjs`, `company/reviews/README.md`, the kit contract, or any other protected file. New oracle/exploration scripts are supporting evidence under `artifacts/`; they do not replace the protected contract or its per-lesson gates.

## 2026-10-16 closeout addendum · evaluation-steward

The B1/B2/B3 dispatches above remain the source of scope, evidence and completion requirements. This addendum supplies execution choices only; it reviews no lesson and grants no launch verdict or gate waiver.

- **Browser capacity:** conditionally permit four Playwright workers total for this closeout: operator `npm run verify` QA at two plus independent B1 QA at two, only after the production build has finished. The reported nine CPUs, roughly 10 GB RAM, 6 GB currently available and load 3.2 make this a bounded trial reasonable, not a guarantee. Before overlap, the operator must confirm at least 4 GiB available memory (use the stricter host/cgroup headroom) and one-minute load below 7. During overlap, sample resources at least every 15 seconds. Stop the second run and return to two total workers if available memory falls below 2 GiB, one-minute load exceeds 9 for 60 seconds, an OOM occurs, or shared response latency/timeouts indicate overload. Retain interrupted/failing evidence and rerun affected cases; do not label host failures passes. No builds may run alongside both QA runs, and reveal-fit/walkthrough browsers count toward this same four-worker ceiling. When either run ends, keep the remaining run at two. This is a temporary worker choice within Quality, not a founder agent-cap or protected-gate change.
- **B1 invocation:** run the existing `contract.spec.ts` explicitly in eight sequential waves of 25 manifest slugs, `QA_ONLY` set per wave and `--workers=2`: 400 phone/desktop contract cases total. Separately run the existing `feed.spec.ts` once against the same pinned build with `QA_ONLY` unset, a separate output directory, and `--workers=2`. The current AMD-012 revisit test requires a published/review lesson; an all-draft Algorithms 200 pool is unsuitable for that feed test. Preserve the existing test contents, selection/count reconciliation, per-slug records, exploration and reveal-fit obligations above. The operator's integrated verification is supporting engineering evidence and does not replace independent B1.
- **B2/B3 honest closeout:** B2 may return explicit checked/held results with reasons and claim-level coverage for all 200, retaining inaccessible, unvisited or unsupported claims as held/unverified. B3 may return its preselected 40-lesson sample (two per topic), with actual artifact-first findings and checked/held limits, while naming all 160 unsampled lessons. A held or incomplete review remains incomplete for the relevant gate; neither these returns nor the sample imply blanket passes. If the artifact cannot be seen, record that limit and follow B3's revise/stop boundary. Keep lessons and the PR draft wherever their existing gates remain unmet.
