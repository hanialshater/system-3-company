# reachable-v2 vs reachable-v1: diff review, order rule check, O1 concept check (F5b, W-1590)

owner: learning-scientist-personalization (Oskar) · run: ls-f5b-1017 · date: 2026-10-17 · brief: company/ops/mailboxes/dispatcher/20261017T192533312Z-vp-personalization-3f8fe7db.md (batch 5 §11.1, company/personalization/batches/2026-10-17-batch-5.md) · reader: vp-personalization

## Inputs (sha256)

| File | sha256 |
|---|---|
| company/personalization/policies/reachable-v1.ts | da8b7e4c721b75b8502c2d768676d02910505421100495044e6947c34e4c5876 (matches the freeze) |
| company/personalization/policies/reachable-v2.ts | 2666271f06aeef20f2771bcd7d1ad35391e0852e879aa0c7040f477f3f906714 (matches the brief; same at `git show HEAD:` and at 3a5cd1f) |
| company/personalization/policies/default-order-rule.md | f064d3edffc5e573… |
| src/lib/feed-index.ts | ce9959df5b1b9934… |
| company/personalization/policies/reachable-v2.test.mjs | f4c25d00117377f7… (21 tests, 21 pass, `node --test`) |
| company/personalization/policies/reachable-v2-build-note.md | 2a94f8b2db4da229… (read only after rows R1-R10 were written) |
| Data, read-only | src/demos/*/*/meta.json (974 files), content/curriculum/*.json (14 files), src/kit/types.ts, src/lib/visibility.ts (header) |
| Context | company/personalization/evidence/2026-10-17-reachable-v1-fidelity.md (F5, my own; N12, N13, N19, N20) |

**Not opened:** anything under company/personalization/eval/ (criterion 3b, harnesses, readouts), company/personalization/model/sim/, the K5 report. **No simulated episode run.** The only code I ran: the v2 unit tests, and a scratch script (outside the repo) that calls v2's `rank` on hand-built `dims` from meta.json with an empty history, plus an independent re-implementation of the rule, to compare order hashes. That is a unit-level call with no world, no learner and no policy comparison.

## Rows

### Q1: is the diff limited to the tie order?

| # | Row | File, line | Kind |
|---|---|---|---|
| R1 | `diff -u v1 v2` shows exactly four hunks: header comment (v1 1-2 → v2 1-2); new `defaultOrder` with its doc comment and a blank line (v2 375-404, 30 added lines); the one call site (v1 379 `Object.keys(dims)` → v2 409 `defaultOrder(dims)`); the export (v1 473 `REACHABLE_V1 … "reachable-v1", "1"` → v2 503 `REACHABLE_V2 … "reachable-v2", "2"`). 482 − 4 replaced + 4 + 30 added = 512 lines, as `wc -l` gives. Every other line is byte-identical and in the same order. The types were not touched: v1 already had `status?: string` (line 27). | reachable-v2.ts 1-2, 375-404, 409, 503 | note (confirmed) |
| R2 | One mechanical consequence: the named export changed from `REACHABLE_V1` to `REACHABLE_V2`. Any importer must use the new name; that is the intended rename, not a behaviour change. `rank`, `decide` and `internals` keep their names. | reachable-v2.ts 503 | note |

### Q2: does `defaultOrder` follow steps 1-5?

| # | Row | File, line | Kind |
|---|---|---|---|
| R3 | Steps 1-4 match the rule. Step 1: `status === undefined \|\| "published"` → 0, else 1 (v2 380). Step 2: sort by rank, then `slug` with `<`/`>` (code-unit, no `localeCompare`) (v2 381-383). Step 3: a `Map` keyed by domain in order of first appearance in the sorted list, each queue keeping sorted order (v2 384-389). Step 4: round-robin by per-group cursors until all `sorted.length` entries are out (v2 390-401). It reads only `slug`, `domain`, `status`, and key order cannot enter (the sort is total on unique slugs). **Independent check:** on `dims` built from the 230 pilot lessons (probability and cs, status published or review) with no prerequisites and one concept per lesson, every value ties and v2's `rank` returns the order whose sha256 is `04bf48f41a703b88…16233853`, the rule's test vector; three different key orders give the same hash. My own re-implementation of feed-index.ts `interleave` (with `localeCompare`) gives the same hash, and the all-domain order over the 946 visible lessons, restricted to the pilot, equals it too. | reachable-v2.ts 379-403; default-order-rule.md "Facts" | note (confirmed) |
| R4 | Step 5 matches. `defaultIndex` is built over the full order (v2 410), then `order.filter(slug => !completed.has(slug))` (v2 425-426), so the full order is derived first and completed lessons removed after, keeping relative order. The tie-break `a.idx - b.idx` (v2 446) and the `default-order` reason's indices are positions in the full order; test "order rule step 5" pins both and shows remove-first would differ. | reachable-v2.ts 409-426, 446, 453; reachable-v2.test.mjs 317-334 | note (confirmed) |
| R5 | **Rule vs product: an absent status.** The rule (step 1) and v2 rank an entry with no `status` as published (0). feed-index.ts line 23 ranks it 1, since `undefined === "published"` is false. So on this one point the rule does not transcribe `interleave`. It is inert today: 0 of 974 meta.json lack `status`, and `DemoMeta.status` is a required field (src/kit/types.ts 43), so the product can never meet the case. v2 follows the rule, so this is not a v2 defect. If the rule is ever revised, its owner (vp-personalization) may align step 1's wording with feed-index; that would be a new candidate under G6, and nothing today needs it. | default-order-rule.md step 1; src/lib/feed-index.ts 23; reachable-v2.ts 380 | note |
| R6 | **Rule vs product: drafts, and step 5's "otherwise ineligible".** feed-index.ts removes drafts *before* `interleave` (`visibleDemos()`, line 40); the rule derives over the whole of `dims` and removes ineligible lessons *after*. These differ whenever `dims` holds a lesson the product does not serve. Checked: adding the one pilot draft (src/demos/probability/small-gap-big-extremes, status draft) to the 230-lesson `dims` changes the relative order of the 230 visible lessons under v2. v2 is faithful to the rule, and the rule's own facts assume the draft is out of `dims` ("the one draft is out"). So whether this matters depends on how criterion 3b builds `dims`, which I did not open. **Request K-e to personalization-eval, before the first score:** confirm 3b's `dims` holds no draft (or retired) lesson, or let the tie-order probe show it. If 3b's `dims` does hold one, this row becomes blocking (a rule revision and a reachable-v3, or an input fix that is the eval's call) and goes to vp-personalization first. The same holds for S1: the website must pass `dims` over the visible set only. | src/lib/feed-index.ts 39-41; default-order-rule.md step 5; reachable-v2.ts 409 | note (conditional on K-e) |
| R7 | v2's tests pin the rule on hand-made `dims` (8 order tests, including shuffles, a draft and status edge cases) but not the 230-slug vector. The rule assigns the product-index assertions to S1, so this is not a gap in C2's brief; the vector check in R3 is now on record here. | reachable-v2.test.mjs 299-372; default-order-rule.md "What is checked" | note |

Build-note §3 choices, one by one (each was also visible in the code before I read the note):

| # | Choice | Left open by the rule? | Consistent with feed-index.ts? | Kind |
|---|---|---|---|---|
| R8 | 1. `status === undefined` (absent or explicit) ranks 0; `""`, `"retired"`, `"Published"` rank 1 | Partly: the rule names "no status field"; explicit `undefined` and case are open | Non-published values: yes (feed-index tests `=== "published"`). Absent: no, see R5 (inert) | note |
| R9 | 2. Sort by `entry.slug`, output the dims key | Yes (the rule speaks of slugs; `rank` works on keys) | Yes when key === slug, which criterion 2 §I.3's `Record<slug, …>` type states; feed-index has no keys | note |
| R10 | 3. Duplicate slugs fall back to the stable sort (key order); no new tie-break. 4. Eligibility stays v1's (not completed only). 5. Cursors instead of `shift()` | 3: yes (the rule assumes uniqueness). 4: yes ("otherwise ineligible" is undefined), see R6. 5: implementation only | 3: feed-index would also keep input order on a `localeCompare` 0 (stable sort); unreachable when key === slug. 4: see R6. 5: same output, confirmed by the vector in R3 | note |

### Q3 (O1): does any concept span two domains?

| # | Row | File, line | Kind |
|---|---|---|---|
| R11 | **Confirmed, and two more.** Across all 974 meta.json, three `concept` values appear in two domains, all lessons published: `euclid-gcd` (src/demos/cs/euclid-leftover-rectangle, src/demos/math/euclid-square-cutting), `osmosis` (src/demos/chemistry/water-follows-the-crowd, src/demos/life/cell-shrinks-in-brine), `rule-of-72` (src/demos/economics/rule-of-72-shortcut, src/demos/math/seventy-two-doubling). The curriculum maps agree: the same three ids are listed in two files each (cs + math, chemistry + life, economics + math). **No concept is shared between probability and cs**, and only `euclid-gcd` touches a pilot domain. **Can it bite?** `conceptDomain` (v2 239-243) is read in two places only, v2 297 (`pKnownAt`) and v2 420 (`prereqFacts`), and both read it only for a *prerequisite* concept that has no concept state yet. No meta.json and no curriculum concept anywhere lists `euclid-gcd`, `osmosis` or `rule-of-72` as a prerequisite, bare or as `domain:concept`. So the key-order dependence cannot change any output on today's catalogue, **with pilot-only `dims` or with all-domain `dims`**. With pilot-only `dims` it is doubly inert: `euclid-gcd` then has one lesson and one domain. (Shared concepts do share one concept state across the two lessons, keyed by concept, not by key order; that is the design, not O1.) It would become live only if a future lesson listed one of these concepts as a prerequisite and `dims` carried both domains; that is a question for lesson-dims-owner and the category managers when it arises, then a v3 under G6. I did not see how 3b maps `domain:concept` prerequisites into `dims`; the conclusion holds for any mapping, because no source names the three concepts as prerequisites. | reachable-v2.ts 239-243, 297, 420; src/demos/*/*/meta.json; content/curriculum/*.json | note |

### Q4: F5's N12, N13, N19

| # | Row | File, line | Kind |
|---|---|---|---|
| R12 | All three sit in lines R1 shows unchanged. N12 (the averaged multiplier at first completion, later completions and after a right recall, v2 320, 330, 344-346) and N13 (the relearned share takes `s.mult`, v2 346 and 354) are in `estimate()`, which the diff does not touch. N19 (reason heuristic and inferred-estimate reasons, v2 448-495) is unchanged code. The only thing that moved near N19 is the *content* of the `default-order` reason's indices, which now refer to the rule's order; N19's two limits do not depend on the tie order. F5's bound for N13 (value about 0.1 against about 0.25 at base) rests on the values, not the order, so it still holds. All three remain notes, not blockers. F5's N20 (tie order = key order, conditional on K-a) is superseded by the written rule; its remaining condition is K-e (R6). | reachable-v2.ts 320-354, 448-495; 2026-10-17-reachable-v1-fidelity.md C8, C9, C19 | note |

### Added after reading the build note

| # | Row | File, line | Kind |
|---|---|---|---|
| A1 | The build note's O1 says each concept belongs to one domain "as the dims index presumably holds". On the source data that is not so: three concepts span two domains (R11). Its conclusion (no effect) still holds today, for the reason in R11 (none is a prerequisite), not because the concepts are single-domain. The note's other statements match what I found in the code: four hunks, choices 1-5, step 5 left to v1's lines, `internals` unchanged. I did not re-run its claim that 8 of the new tests fail on v1. | reachable-v2-build-note.md §4 O1, §2 | note (added after reading it) |

## Verdict

**There is no blocking row.** reachable-v2 differs from v1 only in the tie order and the mechanical lines around it, and it reproduces the rule's 230-slug vector. One row is conditional: R6 becomes blocking if criterion 3b's `dims` holds a draft or retired lesson (check K-e, personalization-eval, before the first score).

blocking 0, notes 13 (R1-R12, A1; R6 conditional on K-e)
