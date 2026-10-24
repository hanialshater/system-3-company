# Behavioral and causal/probability 200: independent quality route

owner: evaluation-steward
date: 2026-10-24
status: dispatch plan only; no artifacts reviewed, claims verified, or launch approved
route: evaluation-steward → qa-tester + fact-checker → learner-evaluator → chief-of-staff

## Scope and handoff

The founder requests a PR with exactly 100 additions from each supplied source list. The accepted selections are `company/domains/briefs/2026-10-24-behavioral-100.json` and `company/domains/briefs/2026-10-24-probability-100.json`. Freeze their hashes after selection, then reconcile every selected slug to a new lesson directory and metadata on the integrated branch. Stop on missing/duplicate slugs, missing source-entry addresses, an existing-lesson collision, or a count other than 100 + 100. A prefix search is not a manifest.

Before review, chief of staff supplies the integrated head SHA, base SHA, build SHA, clean/dirty tree status, lesson versions, manifest hashes, local model entry points, visual families, pinned production-server URL and dist directory. Record the unchanged QA harness stamp. Checkers do not build or replace that server. If the built SHA differs from the reviewed head, record and justify source equivalence before treating observations as gate evidence; otherwise report exploratory findings only.

Keep a durable index with exactly 200 rows: domain, source entry, slug, version, visual/model family, reviewed/build SHA, both QA viewport results, reset probe result, fact-check status, learner sample status, evidence paths and open findings. Unknown means unknown. The index must distinguish not run, failed, held and passed.

## B1: independent browser QA — qa-tester

Dispatch the existing `qa-tester` after the frozen integrated build exists. Give the manifest, rendered URLs and committed harness first, not builder notes. Use one server, at most two browser workers, unique output directories and sequential waves of at most 25 slugs. Run the unchanged contract explicitly:

```sh
QA_ONLY=<comma-separated-wave-slugs> QA_BASE_URL=<pinned-url> QA_OUT=artifacts/behavioral-probability-200/qa-01 npm run qa -- tests/qa/contract.spec.ts --workers=2
```

The existing `QA_ONLY` silently filters absent/misspelled slugs. Compare the selected test list and raw JSON results against the wave manifest before counting coverage. Expected total: **400 contract cases**, 200 slugs × phone and desktop, with every failure and retry named. Preserve original failures separately from reruns. A partial run is never a batch pass. The contract checks rendering/errors, locked controls before prediction, observable control effects, earned reveal, explanation length, horizontal overflow and minimum tap size; it does not prove correctness or learning.

Also probe **all 200** on a 390×844 phone: run the prediction case, visit its contrast, record both witnesses, Reset last, then open the reveal. Check that reveal eligibility and every quoted value remain truthful and visible; Reset cannot leave an old-run explanation against an empty stage. Probe Reset before completion and reverse control order for at least one lesson per model/visual family. Confirm a button is disabled when it would do nothing, and required milestones remain reachable by keyboard and the ordinary DOM-order path. Record which additional paths were actually exercised.

Run the committed reveal-fit tool against all 200 where available and retain its per-slug output/screenshots. Inspect screenshots for the named picture elements and type floor: output alone is not evidence that a diagram is readable. On at least one lesson per family, inspect 360 px width, both themes, keyboard and reduced motion. The unchanged contract's phone device is not a substitute for the explicit 390×844 reveal-fit probe.

Outputs: raw reports/screenshots; dated per-slug QA records using the existing company recording command; a batch summary and index. Each record names lesson version and `built from: <sha>`, URL and actual scope. Do not fabricate independent evidence from a builder's local run. Run existing feed tests separately with `QA_ONLY` unset: a drafts-only selection is unsuitable for the revisit test's published/review pool.

## B2: independent mathematics and claims — fact-checker

The existing `fact-checker` owns independent checks; the author of a model or claim does not verify it. All new claims begin **unverified**. This route verifies none. The source lists are discovery pointers, not a checked bibliography. Every empirical source and replication verdict remains outstanding until the checker opens its actual supporting source and records the exact supported claim and limits.

For every slug, inventory learner-facing assertions in title/hook, prediction/options, locked stage, explored frames, labels/readouts, reveal and recall against its metadata claim addresses. Record missing assertions as unverified. Recompute each prediction answer, both scenario summaries and all quoted numerical/state assertions using independent arithmetic or an independently written small oracle. Check at least two relevant boundary/adversarial cases per model family and each lesson's configuration: zero/small denominators, probability bounds, finite outputs, ties, signs, units, weighting, assumptions, conditional independence and random-seed disclosure where applicable. A literal copied from production output is not an oracle.

For causal lessons, distinguish pooled association, adjusted comparison and identified causal effect. Check that any randomization, exchangeability, exclusion restriction, parallel trends, continuity or other identification assumption actually needed is stated; a DAG or before/after contrast does not establish it alone. For behavioral lessons, a toy payoff/utility computation cannot establish how people behave. Contested findings cannot be the universal right prediction answer, and reported study numbers cannot be presented as observations from fabricated participants. Check recall transfer separately from the teaching case.

Outputs: per-claim checked/held/disputed results and independent derivations/sources, per-slug fact-check records, explicit counts and unresolved source access limits. Unsupported, inaccessible and unvisited claims stay unverified. Do not edit lesson code or rewrite claim wording to make a verdict true; return the problem to the category manager/engineer. Since the requested delivery is a draft-content PR, incomplete fact-checking is reported honestly and does not authorize publication.

## B3: artifact-first sample — learner-evaluator

Dispatch the existing `learner-evaluator` after walkthroughs exist on the frozen build. Select the sample before reading builder accounts: **at least 20 lessons**, at least ten from each domain, at least one from every actual model/visual family, plus contested-evidence, causal-identification, long-copy and near-neighbor risks. Increase beyond 20 if necessary to cover every family; do not substitute a family average for an unvisited lesson. Write the exact sampled slugs and selection reasons to the index.

Give each reviewer only rendered walkthrough transcript/screenshots (including the full contact sheet) and the learner knowledge boundary first. No manager explanation, metadata objective, spec, build note or builder test account precedes written initial findings. After that, the reviewer may read the brief in a section labelled “After reading the brief.” If the artifact cannot be seen, record the limit and return at most revise. Any reviewer who built a sampled artifact must be replaced for that artifact.

Each versioned review starts: “Simulated learner. This review finds problems; it is not evidence that anyone learned.” Record specific problems, screenshot visibility and `Verdict: launch|revise|fatal`, never an absolute score. Inspect prediction leakage, what the action actually makes visible, the distinction between model and empirical claim, reveal/retained evidence, phone fit and recall transfer. Compare neighboring objectives for repetition: a new title, numbers or wrapper is not a distinct learning outcome. Route objective/collision findings to the category manager and shared-code findings to principal-engineer.

The sample leaves **at least 180 lessons unsampled** if exactly 20 are walked. Mark each as not sampled rather than implicitly approved. Mechanical QA and a simulated critique establish neither that a human learned nor that the remaining lessons pass learner-review gates.

## B4: inherited failure comparison and closeout

Chief of staff owns integration checks. The recorded starting `npm run check` baseline is **811 errors and four warnings**. Save the exact error/warning identities with the base SHA, then compare sorted identities after integration, not only totals. New errors need correction or an explicit unresolved finding; do not edit unrelated old lessons, weaken a gate, or hide inherited failures. Run `npm run verify`; if it stops at an inherited failing suite, report the stopping suite and independently run the relevant remaining typecheck/build/model/QA checks. A failed full command is still failed even when targeted checks pass.

Record exact requested/attempted/completed/passed/failed/held counts, sampled and unsampled learner rows, outstanding source claims, protected-path/dependency diff status and all build identities. A clean mechanical result is not “production-ready.” All 200 lessons remain draft until their individual existing gates are satisfied; no blanket launch, publication, merge or deployment follows from this route. No protected QA, kit, gate or independence-rule changes are requested.

## Objections and answers

- **Shared renderer may hide repeated pedagogy.** Answer: sample every actual family and inspect near-neighbor learning boundaries; return duplicate objectives to the managers rather than accepting 200 filenames as 200 lessons.
- **One happy-path contract misses reset and interpretation errors.** Answer: retain the unchanged contract and add explicitly scoped exploratory probes and independent math/claim review; do not silently broaden what a contract pass proves.
- **Outstanding sources could delay a PR indefinitely.** Answer: the authorized deliverable is reviewable draft content. Report unfinished checks and keep gates/status honest; a PR is not a verified publication.

## Next dispatches

Chief of staff may dispatch existing `qa-tester` with B1 once the pinned server and frozen index exist; existing `fact-checker` with B2; and existing `learner-evaluator` with B3 after artifacts are available. No new roles, subagents or standing-order authority are created by this document. Evaluation-steward audits independence and scope after their reports; release-manager applies ordinary per-lesson gates to any later publication proposal.
