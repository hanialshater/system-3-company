# Probability batch slice B — implementation

owner: demo-builder
date: 2026-10-24
status: 50 draft implementations; independent QA and factual verification pending

Implemented the manager's exact 50 slice-B source entries. Each lesson owns `Demo.tsx`, a pure numeric `model.ts`, typed `spec.ts` and `meta.json`; the wrapper renders the existing Lesson and controls through the shared MiniLab controller/stage. No whole-catalog client import, new dependency, network request or storage is used.

## Cases and scope

The models cover queues, Markov chains, Metropolis acceptance, KL direction, partial pooling, Gaussian kernels and scalar filtering, bandits, discounting, risk/reliability/survival, causal sensitivity and IV, off-policy weighting, branching, pooling, sampling aliasing, spatial distance counts, next-reaction propensities and Moran fixation. Visuals include bars, curves, scatter plots, graphs, tables, timelines and intervals. Every case has two visibly changing frames and a meaningful contrast. All original source addresses and verbatim source lines are preserved in provenance; historical/empirical reports are not presented as verified facts.

Several source ideas are intentionally restricted to a checkable one-minute case: random-terrain shows a deterministic Gaussian-basis reconstruction with disclosed coefficients rather than claiming a sampled Gaussian field; gene-expression shows next-event rates rather than pretending to sample an entire biological process; guidance-scale is an explicitly labelled probability-power toy, not full classifier-free guidance; the mean-field Gaussian example uses the closed-form reverse-KL optimum; sequential tests use fixed sequences and illustrative boundaries without exact error claims. The deliberately chosen power-of-two arrival fixture states its tie rule and does not claim average-case benchmarking. The fixed insurer path is not a ruin-probability estimate. These limits are in the learner explanations and claim ledgers.

## Verification performed

`node --import ./tests/lifehacks/register.mjs --test company/reviews/probability-100-2026-10-24/slice-b-fixtures.test.mjs`: **50 passed, zero failed**. Fixtures retain independently specified scalar answers, validate every trace against the MiniLab schema, complete both milestones and test preservation after Reset. Full TypeScript passed before the final wrapper API refactor; root integration must typecheck the final controller API. No browser pass or learner evidence is claimed here.

The first finite-fixture pass corrected a mistaken hand-calculated KL expectation in the fixture: actual finite sums are 0.6921971093653198 and 3.2011343200619296. The model's probability sums and comparisons were unchanged. The aliasing example explicitly removes floating-point roundoff below 1e−12 from its mathematically zero sampled gap. Stage summaries retain the displayed precision.

`npm run check` in this disjoint worktree includes the inherited failures plus absent manager curriculum additions; final curriculum and registry belong to chief-of-staff integration. The initial delegated wrapper failed the source-structure check honestly; wrappers now render real `<Lesson>` and `<Control>` elements using the platform API. No gate was changed to suppress that finding.

## Remaining gates

Root owns integrated build, check-delta comparison and every-route phone/desktop contract. Independent fact-checkers own claims; independent artifact-first reviewers own pedagogy and phone fit. All claims remain unverified, evidence arrays empty, confidence empty and status draft. Publication, merge and deployment are not approved by this build note.

## Pre-integration self-review corrections (versions 2)

Reliability-diagram now labels 0.2 as a gap fraction rather than percentage points; the explanation converts it to 20 percentage points. Honest-DiD now retains both complete bounds (2–8 and 4–6), so case B never displays case A’s upper bound under the wrong label. Random-terrain now reconstructs two lines from the same disclosed fixed coefficients with different Gaussian-basis scales; this distinguishes the smoothing lesson from the separate RBF-kernel lesson without claiming a random field was sampled. All three versions bump to 2, their claim ledgers are refreshed as unverified, and all 50 finite fixture/schema tests still pass.
