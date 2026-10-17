# reachable-v2: build note (C2, blind to the judge)

owner: learner-model-engineer · run: lme-c2-1017 (a fresh run: not C1's agent, not R3's, not R4's) · date: 2026-10-17 · board: W-1572 (item C2) · brief: mail 20261017T184941262Z-vp-personalization-d2af9f95; company/personalization/batches/2026-10-17-batch-5.md §3, §11.1
files: `company/personalization/policies/reachable-v2.ts` (the candidate), `company/personalization/policies/reachable-v2.test.mjs` (unit tests, hand-made inputs only)
status: candidate only. **No simulated episode was run, and nothing under company/personalization/eval/, company/personalization/model/sim/, company/personalization/evidence/, or any readout or repro file was opened, imported, copied or run.**

## 1. Every file I read

- The dispatch brief (company/ops/mailboxes/dispatcher/20261017T184941262Z-vp-personalization-d2af9f95.md), my onboarding doc (company/roles/learner-model-engineer.md), and my role memory (`node tools/memory.mjs read learner-model-engineer`; its entries name sim/eval files, and I opened none of them).
- company/personalization/policies/reachable-v1.ts, reachable-v1-build-note.md and reachable-v1.test.mjs, in full.
- company/personalization/policies/default-order-rule.md, in full.
- company/personalization/policies/reachable-v1-params.md: its header and "What I read" section, and the first table row. It is unchanged, and v2 adds no constant, so I needed no row.
- src/lib/feed-index.ts lines 1-58 (`interleave` and its callers).
- company/personalization/model/model.ts: `FORBIDDEN_INPUTS` (lines 105-112) and the `LessonDims` and `HistoryItem` types (lines 175-197).
- company/personalization/batches/2026-10-17-batch-5.md: the heading list, §3 and §11.1.
- tools/commit-own.sh (its header).

The only code I ran: the unit tests, `tsc --strict` on the candidate, the same test file against a scratch copy of v1 (to check that the new tests tell the two apart: 8 fail on v1, 13 pass), `npm ci` and `npm run check`. `npm run check` runs the repo's existing personalization gate (`test:personalization`, including its policy-golden test of the existing sim policies). The brief requires that run. I looked only at its pass/fail result, and it neither reads nor runs reachable-v2.

## 2. Every change from reachable-v1, line by line

`diff reachable-v1.ts reachable-v2.ts` shows exactly four hunks. Every other line is byte-identical to v1 at sha256 da8b7e4c…4c5876.

| # | v1 line(s) | v2 line(s) | Change | Reason |
|---|---|---|---|---|
| 1 | 1-2 (header comment) | 1-2 | The name, run, item and build-note filename now say v2/C2/lme-c2-1017 and point to default-order-rule.md. | Mechanical (name). |
| 2 | (none) | 375-403 (plus blank line 404) | New function `defaultOrder(dims)`. Step 1: `status === undefined` or `"published"` gives rank 0, else 1. Step 2: entries sorted by rank, then by `slug` using `<`/`>` (UTF-16 code-unit order, no `localeCompare`). Step 3: grouped by `domain` in order of first appearance in the sorted list, with each group keeping sorted order. Step 4: round-robin over the groups until all are empty. It returns the dims keys in that order. | The change the rule asks for (steps 1-4). |
| 3 | 379: `const order = Object.keys(dims); // …(build note, choice 1)` | 409: `const order = defaultOrder(dims); // …(v2 build note)` | The default order now comes from the rule, not from key order. | The change the rule asks for. Step 5 is v1's unchanged next lines: `defaultIndex` is built over the **full** order, then `order.filter((slug) => !completed.has(slug))`. The full order is derived first and completed lessons are removed after, with relative order kept. The sort's tie-break `a.idx - b.idx` and the `default-order` reason's indices are now positions in the rule's full order. |
| 4 | 473: `REACHABLE_V1 = { name: "reachable-v1", version: "1", … }` | 503: `REACHABLE_V2 = { name: "reachable-v2", version: "2", … }` | Name and version. | Mechanical (name/version). |

Not changed, and no change was needed:
- **Types.** v1's local `LessonDims` already had `status?: string` (v1 line 27, from criterion 3 §2.2's list), so the "local type with optional `status`" the brief allows was already there.
- **`internals`.** I did not add `defaultOrder` to it. The tests pin the order through `rank`: they use hand-made dims in which every value ties exactly, so `rank` returns the tie order itself.

## 3. Choices the rule left open

| # | Where | Choice | Why |
|---|---|---|---|
| 1 | Step 1, "an entry with no `status` field" | `status === undefined` counts as no status, whether the property is absent or explicitly `undefined` (test pins both). Any other value, including `""`, `"retired"` and `"Published"`, is not `"published"` and ranks 1. | In TypeScript an optional field reads as `undefined` whether it is absent or set that way. JSON input cannot tell the two apart either. Case-folding would be a rule the file does not state. |
| 2 | Step 2 sorts by `slug`, but `rank` works on keys | Sort and group by **`entry.slug`** and `entry.domain`, and output the **dims key**, because every other v1 line indexes `dims[key]` and compares keys with history slugs. In well-formed dims, key === slug. | The rule reads `slug`, never key order. Outputting keys keeps v1's other lines untouched. If key and slug ever differ, the order still follows the rule's field. |
| 3 | Step 2, "slugs are unique, so the sort is total" | If two entries ever shared a slug (only possible if key !== slug), `Array.prototype.sort` is stable and they would fall back to key order. I added no rule for it. | The rule assumes uniqueness, and a tie-break of my own would be a new rule. Recorded so the case is known. |
| 4 | Step 5, "any otherwise ineligible lessons" | Eligibility stays v1's: a lesson is eligible if its key is not a slug in `history` (v1 build note choice 3, with no status or domain filter). | The brief allows only the tie order to change, and v1 has no other eligibility rule. |
| 5 | Step 4, the round-robin loop | Index cursors per group and a count of what is left, rather than `shift()` as in feed-index.ts. | It gives the same output without mutating arrays, and the loop ends after exactly `sorted.length` pushes. |

## 4. Observations (not fixed, per the brief: "do not fix anything else")

- **O1. One other place still reads key order.** `estimate()` (v2 line 240, unchanged from v1) builds `conceptDomain` with `for (const key of Object.keys(dims))`, keeping the **first** domain seen for each concept. If one concept appears in lessons of two different domains, the domain used for an uncompleted prerequisite's estimate (and the `prerequisites` reason's pKnown) depends on key order. When each concept belongs to one domain, as in every hand-made dims in the tests and as the dims index presumably holds, key order has no effect. The tests show this: shuffling key order (6 permutations of two dims sets) changes nothing. This is not the tie order, so it is not part of this change. It is also not a change that "seems needed" for the rule, since the rule covers only the tie order. Owner if it matters: lesson-dims-owner (does any concept span two domains?), then vp-personalization (a v3 under G6).
- **O2.** feed-index.ts uses `localeCompare`, and the rule uses code-unit order. The rule file states that the two agree on today's slugs (`^[a-z0-9-]+$`) and that S1 asserts this. The test `slugs sort by code unit, not locale` pins the code-unit behaviour on slugs outside that pattern (uppercase, digits, `é`).
- **O3.** F5's notes N12, N13 and N19 are not addressed in v2 (batch 5 §11.1). I did not read F5.

## 5. Tests (reachable-v2.test.mjs, 21 tests, all pass on Node 22.22.0)

Carried over from v1 (13 tests). The A1 pins (κ, prior mean, P14 0.187), the ranking and decide checks, replay, no state between calls, a deep-frozen input left unchanged, the forbidden fields (every `FORBIDDEN_INPUTS` name plus `gapDays`, `settings`, `persona` and `fixedDue`, each at four values, and `slots`), time translation, the 30-day recall window, the prerequisite reason, reason facts checked true against the input, refresh on an already-completed concept, and the source scan (no imports, no `Date`, `Math.random`, `process` or I/O, and only `now`/`history`/`dims`/`slots` read from the input). One rewrite: v1's "ties go to the default order (dims key order)" now checks against the rule's hand-worked order of v1's dims, and it asserts that reversing key order changes **nothing** (in v1 it reversed the tie order).

New (8 tests):
- **Steps 1-4 on hand-made dims.** Three domains, review and draft lessons, two entries without status, and an uppercase slug. The expected order is worked by hand in a comment, and every adjacent pair carries a `default-order` reason with the right indices.
- **Key-order shuffles.** Six permutations each (identity, reverse, two rotations, a fixed scramble, key-descending) of the order dims and of v1's dims with a history, all giving output deep-equal to the base.
- **Step 5.** Derive first, then remove: two completed lessons are removed from the full order. The test also shows that the remove-first order would differ, and checks that reason indices refer to the full order.
- **Status edge cases.** Explicit undefined, `""`, `"retired"` and `"Published"`.
- **A late domain.** A domain seen first among non-published lessons goes last in the round-robin.
- **Code-unit vs locale order.**
- **Non-order fields.** Changing fields that are neither order fields nor value inputs leaves the order unchanged.

`tsc --strict --noEmit --target es2022 --module esnext --moduleResolution bundler` on reachable-v2.ts: no errors (tsc 5.9.2).

## 6. Freeze

Frozen content: `company/personalization/policies/reachable-v2.ts` as committed in the first commit on perso-cand-c2. After the hash below is written, the file never changes, and a change would be reachable-v3 (batch 5 §4 G6).

sha256 of `company/personalization/policies/reachable-v2.ts` (file content, as `sha256sum` and `git show 3a5cd1f:<path> | sha256sum` both give): **2666271f06aeef20f2771bcd7d1ad35391e0852e879aa0c7040f477f3f906714**, committed in 3a5cd1f on branch perso-cand-c2.
