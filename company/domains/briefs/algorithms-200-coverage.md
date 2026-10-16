# Algorithms expansion coverage handoff

Owner: cm-cs-algorithms · 2026-10-16 · Dispatch: `company/ops/dispatch-requests/2026-10-16-algorithms-200-cs.md` B1.

200 new slugs, 200 distinct primary objectives and 200 new narrow concepts, in 20 topics with 10 lessons each. The original 160 CS concepts retain their order; 200 new concepts are appended with `subarea: algorithms`, topic tags, resolving prerequisites and explicit assumed knowledge. Demand 2 is an estimate from the founder's request, not measured learner demand. Source references are leads unless the acquisition field says opened; acquired source text still does not verify a learner claim.

| Topic | New lessons |
|---|---:|
| Boundary search and selection | 10 |
| Adaptive and network sorting | 10 |
| Ordered and augmented trees | 10 |
| Priority queues and meldable heaps | 10 |
| Range and sliding-window queries | 10 |
| Disjoint sets and offline connectivity | 10 |
| Graph traversal and decomposition | 10 |
| Path algorithms and witnesses | 10 |
| Spanning, matching and flow structure | 10 |
| Dynamic programming on sequences | 10 |
| Dynamic programming on resources and subsets | 10 |
| String indexing and automata | 10 |
| Computational geometry | 10 |
| Number-theoretic algorithms | 10 |
| Numerical and linear-algebra algorithms | 10 |
| Randomized and streaming algorithms | 10 |
| Compression, coding and parsing | 10 |
| Combinatorial search and game search | 10 |
| Approximation and online algorithms | 10 |
| Transforms, convolution and bitset algorithms | 10 |

The historical baseline is 969 total lesson directories, including 153 CS lesson directories; the reported 147/160 CS coverage counts concepts instead. These denominators are different. Every new row identifies an existing objective and misconception from its metadata, the new operation/invariant, and a related new objective. The retained baseline hash audit is `checks/algorithms-200-coverage-audit.json`. Integration later incorporated upstream commit `207e` with six additional non-CS lessons: its baseline is 975 total, still 153 CS, before these 200 additions. The original audit is retained as a historical snapshot rather than relabelled as the later base.

## Nonredundancy decisions

The standard `node tools/overlap.mjs` snapshot reports 979 lessons, 100 shared concept tags and 15 similar pairs. It was captured after the first 10 expansion lessons existed; it is not the 969-lesson historical baseline. Its unchanged output is retained in `checks/algorithms-200-existing-overlap-before.txt`. The manifest-aware overlap output excludes all 200 expansion slugs and records the original 969 baseline lessons. These are portfolio signals, not permission to repeat a mechanism. The manifest-aware check includes unbuilt rows and uses a stricter review sensitivity of 0.18 Jaccard (lower than the standard 0.28): three proposed pairs trigger. All three are retained with visible constraints recorded in `algorithms-200.json → overlapSignalReview`:

- Lower versus upper bound: distinct strict/non-strict boundary predicates and duplicate-run endpoints. Separate labels on the same trace would not pass.
- Regex versus glob star: repeat-the-previous-token transitions versus arbitrary-character transitions. The distinction must appear in the fixture.
- Suffix array versus Booth rotation: an index for suffix pattern intervals versus pruning cyclic-start candidates to return one least rotation. Rotation sorting alone would not teach Booth.

Other close mechanisms are explicitly bounded: new Bellman–Ford work extracts a negative-cycle witness; new palindrome work reuses capped mirror radii rather than growing every centre; new heap work removes, decreases, melds or changes heap invariants rather than inserting; new tree work uses augmented queries or persistence rather than a second AVL insertion. Weighted interval scheduling optimizes rewards rather than repeating unweighted earliest-finish scheduling. Cross-domain dispositions for AI optimization, sampling/statistics, number theory and transforms are retained in the manifest.

## Fixture and source state

All 200 fixture slots are reconciled with actual implemented model exports after their retained builder checks passed. Each row records the exact prediction question, primary and countercase initial frames, computed results, trace lengths, proof text, module/export derivation address, checker/result paths and model hash. `fixtureSpecification` remains the original tiny planning case; `fixture.input` describes the actual implementation when builders refined it. No independent quality role's verdict is inferred from a computed result.

The status is **builder-model-checked**, with zero pending builder fixtures. B2 topics 1–5 retain brute-force and structural-certificate checks; B3 topics 6–10 retain finite primary/countercase oracles; B4 topics 11–15 retain primary finite-fixture oracles and deterministic bounded model cases; B5 topics 16–20 retain their checker-defined finite oracle coverage. The addressed checker is authoritative about which assertions were executed: a captured countercase result alone is not a semantic oracle or proof of general algorithm correctness. All learner claims remain unverified and independent fact-check, design, learner and browser-QA gates remain open.

118 source leads are supplied; 7 row-specific references have acquired text (Python bisect, AtCoder lazy segment trees, RFC1951 and Eberly's ear-clipping paper). The rest are explicitly unopened. Several book/library index references still need method-level acquisition and exact locators; the source registry must not be mistaken for completed fact-checking. Independent fact-check, design, learner and QA gates remain open for all draft additions.

## Reproduction

`node company/domains/briefs/checks/algorithms-200-fixture-sync.mjs --write` reruns all four retained builder checkers, then reconciles actual exports into the manifest; without `--write`, it reruns the checks and rejects changed fixture metadata. Retained checker outputs are `checks/algorithms-200-{1,2,3,4}-results.json`; the sync summary is `checks/algorithms-200-fixture-sync-output.json`. These are builder evidence, not independent review records.

`node company/domains/briefs/checks/algorithms-200-manifest-check.mjs` checks 200 unique slugs/objectives/concepts, 20 × 10 allocation, title limits, resolving prerequisites and honest fixture metadata, including zero pending builder fixtures. Its retained output is `checks/algorithms-200-manifest-check-output.json`.

`node company/domains/briefs/checks/algorithms-200-overlap.mjs` reproduces the three lexical signals. Its retained output is `checks/algorithms-200-overlap-output.json`. This is an overlap signal, not a semantic proof.

`npm run check` passed during initial B1 with 979 then-current lessons, 5480 claims and the five existing Life Hacks disputed-claim warnings. Chief-of-staff owns integrated checks after all additions exist. No publication or deployment is authorized by this coverage handoff.
