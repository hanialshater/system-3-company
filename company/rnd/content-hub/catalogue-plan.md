# Content hub: real-catalogue compatibility and growth test

owner: rnd-engineer · date: 2026-10-24 · board: W-2172
tracking: GitHub #18 / draft PR #20

## Hypothesis

The existing React catalogue can be compiled into independently loaded artifacts, while a dependency index can identify changed demos without rebuilding the full catalogue. Compatibility failures must remain visible rather than be counted as successful builds.

## Committed prediction

Registered before executing the benchmark. The current default-branch source is 60eaf60a and contains 1,645 Demo.tsx/meta.json pairs, not yet the approximately 2,000 described in conversation. Test every available demo. The additional incoming authored demos are unavailable in this checkout; use 1,000 explicitly labelled source copies for a separate 2,645-record growth workload, never count them as new authored demos or independent compatibility coverage.

Predictions: one isolated demo-directory edit invalidates exactly that demo plus any genuine reverse dependencies; documentation invalidates none; a shared source edit invalidates all transitive consumers; restoring exact inputs reuses an artifact. The old spike's small import contract is insufficient for the whole modern catalogue, so a lab-only React compiler adapter must allow resolved local shared components and report all remaining compilation/runtime failures.

would_be_wrong_if: a changed transitive dependency is absent from an affected demo's cache identity; an unrelated demo is selected without a dependency reason; failed compilation is published; a browser read triggers compilation; growth copies are reported as authored coverage.

## Design

- Freeze a Git source revision into an isolated scratch repository; do not edit live demo, kit or production source.
- Compile all 1,645 real entries with the existing React/kit sandbox adapter and existing webpack/TypeScript dependencies, in bounded batches. Save successful content-addressed bundles/frames and per-demo errors. This full independent-artifact build is the measured rebuild-all baseline; it is not the monolithic Next build.
- Build a static local import/dependency index, including CSS/JSON, compiler and dependency lock identities. Compare reverse-index selection with independently recomputed content keys on single-demo, ten-demo, documentation, shared-source and restore edits.
- Warm builds reuse successful keys; retain failed outcomes separately. Measure scan/index time, compilation wall time, artifact sizes, Git status/commit timings and planning at 1,645 and 2,645 records. Synthetic growth fixtures may reuse content-identical compiled inputs; this is a deduplication workload, not 1,000 novel authored programs.
- Browser smoke: preselect at least one real demo per domain before inspecting compilation results. Load its artifact in a sandboxed frame on phone/desktop; check rendering and a prediction/explore transition where supported. A failed selected demo remains a failure. No full-catalogue editorial/QA or learning-quality claim.
- Record full-catalogue build failures as the compatibility result. Stop after one complete pass plus scoped-change checks and the selected browser sample. No paid infrastructure, extra npm dependencies, rollout or deployment.

## Acceptance

Correct scoped selection, reproducible cache reuse, immutable artifacts, explicit compatibility failures and a durable report are required. A production migration requires separate R&D/architecture acceptance and all existing System 3 gates. This test does not establish million-demo throughput or hostile-code safety.
