# Dispatch request: 200 additional algorithm demos

poc: cm-cs
lane: 1
project: [project:catalog]
owner: cm-cs (Lin) · 2026-10-16
intake: `company/decisions/2026-10-16-algorithms-200.md`
answer: **Agree with changes below.** Route through existing `cm-cs-algorithms` (Dev), then existing builders and independent quality roles. No new domain, role, dependency, deployment or publication permission is needed to prepare this PR.

## Audit and decision

- Current checkout: **153 CS lesson directories; coverage command reports 147/160 concepts**. These count different things. Existing algorithms include most introductory sorts, basic search, BFS/DFS, Dijkstra **and Bellman–Ford relaxation**, MST, max-flow residual undo, basic sequence DP, Fenwick/segment trees, AVL, hashing, strings and geometry. Read objective, misconception and claims in every nearest lesson, not just its title.
- The r5 saturation hold (`2026-10-16-r5-cs.md`, “held or declined”) required a named misconception and demand note before another brief. This expansion supplies a founder request, **not measured learner demand**. Every new brief must supply the missing misconception and an estimated demand reason. The hold is answered by these conditions, not silently discarded.
- Exactly **200 new slugs and 200 distinct primary objectives**. A renamed example, new numbers, different story or a second presentation of the same mechanism does not count. Mechanism variants qualify only when the learner confronts a different invariant, failure condition or operation. In particular, “teach Bellman–Ford” repeats `negative-edge-fools-dijkstra`; a negative-cycle witness can be distinct. A basic heap insertion, BST imbalance, path compression, range-min query, LIS pile count or residual-edge undo repeats current work.
- All stay `draft` until their normal gates pass. No simulated review becomes learner evidence. Source acquisition, checked fixtures, independent findings and review status remain distinguishable.

## B1 · Dev: coverage manifest and answer-checked briefs

role: cm-cs-algorithms
kind: other
order: first
worktree: no
budget: 1 run; 200 checked manifest rows and source registry
project: [project:catalog]
inputs: this file; category charter; existing CS curriculum and all lesson metadata; `company/domains/briefs/cs.algorithms.md`; `company/design/formats.md`; `company/product/demo-standard.md`; overlap report; r5 ruling above.

Outputs in the strand's existing scope:

1. A compact machine-readable coverage manifest at `company/domains/briefs/algorithms-200.json`, referenced from the existing algorithms brief file. Exactly 200 rows. Each row names slug, topic, primary concept/objective, misconception, tiny concrete input and checked answer, prerequisite/assumed knowledge, estimated demand and reason, approved format, source address, nearest-existing slug and exact distinction, and nearest-new slug and exact distinction. Use a shared source registry if repeated. Include a visible lesson title and a feasible learner action, not only a taxonomy label.
2. Curriculum entries with `subarea: "algorithms"`, topic tags, honest prerequisites, and levels. Use one primary concept per new objective; do not reorder another strand. IDs may reuse an existing primary concept only if its second lesson meets the charter and the distinctness rationale is explicit; otherwise add the missing narrow concept.
3. Retained runnable Node checks for every numerical answer and trace, under `company/domains/briefs/checks/`. Record assumptions and tie rules. A source citation alone cannot check a fixture. Retain output/counts so the handoff can be reproduced.
4. Coverage/overlap counts: before snapshot 153 CS lessons, 200 additions, 20 topics × 10; unique objectives/slugs/concepts; existing and intra-batch overlap dispositions. Run `node tools/overlap.mjs`; keyword overlap is a signal, not a waiver or veto. Flag cross-domain overlaps too, especially AI/numerical optimization and probability/streaming.

Proposed allocation (Dev may exchange a topic only while preserving 20 × 10 and explaining coverage):

| Topic | Boundary from current portfolio |
|---|---|
| Boundary search and selection | Search predicates, duplicates, matrix order and feasible-answer bounds; not basic halving or quickselect again |
| Adaptive and network sorting | Run exploitation, sorting networks, constrained/external movement; not standard sorts already present |
| Ordered and augmented trees | Treap/splay/B-trees, rank/select and persistence; not BST shape or one AVL rotation |
| Priority queues and meldable heaps | Delete, decrease-key, melding and alternate heap invariants; not insert or heapify |
| Range and sliding-window queries | Difference arrays, 2D queries, sparse tables, lazy updates and offline query order; not prefix sum/Fenwick traversal/basic segment-min |
| Disjoint sets and offline connectivity | Rank, rollback, parity/potentials and time reversal; not path compression alone |
| Graph traversal and decomposition | Articulation, biconnectivity, Euler walks and traversal certificates; not BFS-vs-DFS or basic reachability |
| Path algorithms and witnesses | Negative cycles, all-pairs, 0–1, multi-source, bidirectional, DAG and widest paths; not negative-edge relaxation again |
| Spanning, matching and flow structure | Borůvka, MST uniqueness/replacement, matching certificates, layered flow and min-cost flow; not current MST/flow demonstrations |
| Dynamic programming on sequences | Word/regex/interleaving states, weighted intervals and distinct subsequences; not LCS/edit/LIS again |
| Dynamic programming on resources and subsets | Bounded/unbounded choice, subset/digit/profile/bitmask states; not 0–1 ratio trap or coin-way count |
| String indexing and automata | Z, Aho–Corasick, suffix structures, Manacher and automaton states; not KMP/Horspool/trie lookup/center growth |
| Computational geometry | Intersection/orientation, sweeps, closest pairs, clipping and triangulation; not hull, ray crossing or shoelace again |
| Number-theoretic algorithms | Extended GCD certificates, CRT, factorization, primality witnesses and segmented sieves; not Euclid/Fermat/fast power again |
| Numerical and linear-algebra algorithms | Pivoting, convergence, stable arithmetic and elimination; not Newton square root again; keep AI model fitting out |
| Randomized and streaming algorithms | Distinct-count, quantile, weighted sampling and randomized certificates; not reservoir-one, shuffle or Count-Min collision alone |
| Compression, coding and parsing | Arithmetic/dictionary coding, transform stages, parsing states and unambiguous decoding; not Huffman/RLE/LZ77 repeats |
| Combinatorial search and game search | Branch bounds, exact cover, alpha-beta and transpositions; not queens pruning or minimax draw again |
| Approximation and online algorithms | Approximation bounds and adversarial counterexamples; not nearest-neighbour TSP or current LRU eviction |
| Transforms, convolution and bitset algorithms | FFT butterflies, convolution alignment, subset transforms and parallel bitsets; not XOR cancellation or bit-mask flags |

**Source rule:** Each objective has an exact authoritative section or original paper, plus its executable local derivation. Existing `clrs-4e` and official author/book sources are suitable; for methods absent there, use their authors' papers or official implementations/docs. No invented section numbers, copied lesson prose or claims that an unopened URL was checked. Source text unavailable → record this accurately and leave claims unverified. The builder must be able to connect each learner sentence to its support.

done when: 200 checked rows, no duplicate objectives, 20 × 10 allocation, curriculum prerequisites resolve, overlap dispositions complete, `npm run check` passes. Do not build or verify lessons.

## Build contract for B2–B5

B2 topics 1–5 (50); B3 topics 6–10 (50); B4 topics 11–15 (50); B5 topics 16–20 (50). Chief of staff assigns exact slugs after the manifest exists; builders never claim the same slug.

Use existing lesson controls, `Lesson` predict → explore → reveal and recall. Reuse lesson-local visual/trace infrastructure outside protected kit paths; dependency changes are unnecessary. A common renderer is acceptable; a generic arithmetic card with 200 labels is not. Each lesson must run its named algorithm on the fixture, expose the relevant invariant or failure, and require a learner decision/action that changes the state. No result-bearing diagram before the prediction; controls stay reachable and milestones unlock on the QA path. Distinct arrays, matrices, graphs, strings and trees need appropriate readable representations.

Outputs: 200 `src/demos/cs/<slug>/{Demo.tsx,meta.json}` additions; truthful `draft` status, version 1, owner and algorithm/topic metadata; all claims initially unverified with trace/source addresses; actual observed-run reveal and recall; retained build notes/checks. A shared engine needs one engineering owner before parallel builders edit it; other builders own disjoint data/lesson files. Run the normal code checks once integrated and fix regressions before PR. Do not edit another batch's lesson.

## B2 · Build topics 1–5, exactly 50 additions
role: demo-builder
kind: build
order: after B1 and shared model contract
worktree: no
budget: 1 run, 50 new demos
project: [project:catalog]
inputs: B1 manifest rows for topics 1–5; build contract above; engineering shared-model contract
outputs: disjoint model module and the 50 matching Demo.tsx/meta.json lesson pairs, draft and unverified
done when: all 50 manifest slugs built with real traces/actions and local checks; integrated verification owned by chief of staff

## B3 · Build topics 6–10, exactly 50 additions
role: demo-builder
kind: build
order: after B1 and shared model contract; parallel with B2 within builder cap
worktree: no
budget: 1 run, 50 new demos
project: [project:catalog]
inputs: B1 manifest rows for topics 6–10; build contract above; engineering shared-model contract
outputs: disjoint model module and the 50 matching Demo.tsx/meta.json lesson pairs, draft and unverified
done when: all 50 manifest slugs built with real traces/actions and local checks; integrated verification owned by chief of staff

## B4 · Build topics 11–15, exactly 50 additions
role: demo-builder
kind: build
order: after B1 and shared model contract; within builder cap
worktree: no
budget: 1 run, 50 new demos
project: [project:catalog]
inputs: B1 manifest rows for topics 11–15; build contract above; engineering shared-model contract
outputs: disjoint model module and the 50 matching Demo.tsx/meta.json lesson pairs, draft and unverified
done when: all 50 manifest slugs built with real traces/actions and local checks; integrated verification owned by chief of staff

## B5 · Build topics 16–20, exactly 50 additions
role: demo-builder
kind: build
order: after B1 and shared model contract; within builder cap
worktree: no
budget: 1 run, 50 new demos
project: [project:catalog]
inputs: B1 manifest rows for topics 16–20; build contract above; engineering shared-model contract
outputs: disjoint model module and the 50 matching Demo.tsx/meta.json lesson pairs, draft and unverified
done when: all 50 manifest slugs built with real traces/actions and local checks; integrated verification owned by chief of staff

## Manager asks and final handoff

- **Design lead / interaction designer:** review the first small reference for each reused visual family (sequence/tree/graph/matrix/string) against approved single-card or comparison formats before expanding. No new format is requested. If a family cannot support a genuine learner action, revise it, rather than reskinning all 200. Check 390 px readability, control targets and unrevealed state.
- **Engineering manager:** route shared rendering work to an existing builder/platform owner if it crosses lesson-local files; retain existing package/contract and avoid dependencies. This is not a scaling-infrastructure project.
- **Evaluation steward:** after artifacts exist, dispatch fact-checker, design-reviewer, learner-evaluator and qa-tester independently, artifact first. Check shared engine behavior across visual families and contract QA for all slugs; sources/claims and unique objectives need per-lesson coverage. Tests alone do not imply pedagogical approval. Keep unfinished gates and real findings attached to their slugs.
- **Chief of staff:** owns board/progress/events and PR integration. Record this agreement and route B1 now, then B2–B5 without waiting for another budget ritual. Reviewable completion is 200 additions plus coverage manifest and truthful quality state. Do not mark published or deploy. Existing W-704 remains a separate maintenance item and is not part of the 200.

Confidence: high about the portfolio boundary and routing; medium about equal 10-per-topic feasibility until Dev checks individual objectives. If one group cannot supply ten genuinely different lessons, exchange a topic with another algorithms group and document why; do not pad.

## Dispatched

- B1 → cm-cs-algorithms (`algorithms-200-coverage`): all 200 slugs and objectives frozen; final source/overlap/curriculum closeout in progress. The numerical fixture checks are delegated to B2–B5 and will be reconciled in the manifest before closeout.
- B2 → demo-builder in isolated worktree `algorithms-batch-a`: first topic integrated as 951b7b51; remaining topics in progress.
- B3 → demo-builder in isolated worktree `algorithms-batch-b`: in progress.
- B4 → demo-builder in isolated worktree `algorithms-batch-c`: in progress.
- B5 waiting for the next free builder slot (cap 3).

- Closeout: B2–B5 integrated, exactly 200 draft lesson pairs and 20 pure topic modules; all 200 specs pass bounded validation with no claim/overlap warnings. All four retained fixture scripts pass; CM reconciled 406 cases and 200 builder-checked fixtures. Independent claims and learner gates remain open.
