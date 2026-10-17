# reachable-v3: build note (V3, blind to the judge)

owner: learner-model-engineer · run: lme-v3-1017 (a fresh run: not C1's or C2's agent, and not R4's or R5's) · date: 2026-10-17 · board: W-1572 (item V3) · brief: mail 20261017T195713064Z-vp-personalization-27397b57; company/personalization/batches/2026-10-17-batch-5.md §15.1 (ii) 1-4 and §3
files: `company/personalization/policies/reachable-v3.ts` (the candidate), `company/personalization/policies/reachable-v3.test.mjs` (unit tests, hand-made inputs only)

**status: NOT FROZEN. The brief's stop-if fired** (§4 G1 below). The spec as written cannot give every moved lesson a code: in the simplest histories a lesson moves earlier with no eligible code in {prerequisites, concept-known, refresh}. Closing that needs a change beyond §15.1 (ii) 1-4, which is not mine to choose. I committed the build so it survives, wrote no hash, and mailed vp-personalization. Nothing in this file is a frozen candidate, and nobody should score it or name it by hash until a decision on G1 exists.

No simulated episode was run, and nothing under company/personalization/eval/, company/personalization/model/sim/, /home/user/s3c-k6, or any readout, repro or score file was opened, imported, copied or run.

## 1. Every file I read

- The dispatch brief (company/ops/mailboxes/dispatcher/20261017T195713064Z-vp-personalization-27397b57.md), my onboarding doc (company/roles/learner-model-engineer.md), and my role memory (`node tools/memory.mjs read learner-model-engineer`; its entries name sim/eval files, and I opened none of them).
- company/personalization/policies/reachable-v2.ts, reachable-v2-build-note.md and reachable-v2.test.mjs, in full.
- company/personalization/policies/reachable-v1-params.md: its header, "What I read" section and the first table row. v3 adds no constant, so I needed no row.
- company/personalization/batches/2026-10-17-batch-5.md: the heading list, §3 and §15 (all of §15, which holds §15.1 (ii) 1-4).
- company/personalization/evidence/2026-10-17-edd010-reason-rule-truth.md: §1 and §7 only (and its heading list, to find them).
- tools/commit-own.sh (its header) and tools/mailbox.mjs (its header).

Code I ran: the unit tests, `tsc --strict` on the candidate, two scratch probes in my scratchpad on hand-made dims (to find and size G1; they import only reachable-v3.ts), `npm ci` and `npm run check`.

## 2. Every change from reachable-v2, line by line

`diff reachable-v2.ts reachable-v3.ts`. v2 is sha256 2666271f…3f906714. Every line not listed is byte-identical to v2. "v2 n" is a v2 line number, "v3 n" a v3 line number.

| # | v2 | v3 | Change | Reason |
|---|---|---|---|---|
| 1 | 1-2 | 1-2 | Header names v3, run lme-v3-1017, item V3, this note. | Mechanical (name). |
| 2 | (none) | 6 | Header line: of each history item only `slug` and `completedAt` are read. | Documents change (1). |
| 3 | 120-123 | (deleted) | `strengthen()` removed. | Used only by the recall branch, which (1) makes unreachable. |
| 4 | 158-167 | (deleted) | `pRightGivenPi()` and `expectedPull()` removed. | Used only by the prediction paths, which (1) removes. |
| 5 | 197-202 | (deleted) | `ratingOf()` removed. | Used only by the prediction paths. As a result v3 reads neither `misconceptionStrength` nor `rating` from dims (the Q-E1 rating gap is inert, as §15.1 says). |
| 6 | 216-232 | (deleted) | `knownBeforeFirstPrediction()` removed. | Used only for a first prediction. |
| 7 | 234 | 198 | `const { now, dims } = input;` becomes `const { dims } = input;` in `estimate`. | `now` was read there only for the 30-day recall cutoff, which is gone. `rank` still reads `now`. |
| 8 | 251-279 | 215-216 | Step 1's per-domain posterior loop (first prediction per concept, grid likelihood, right/wrong counts) removed. `domains` stays an empty Map, with a two-line comment. | Change (1): no prediction is read, so every domain uses `prior`, exactly as v2 does for a domain with no first prediction. |
| 9 | 283-290 | 221-224 | Events are completions only: `Ev.kind` is `0` and has no `correct`, and the recall push and the `cutoff` line are removed. The sort line is unchanged. | Change (1): no recall events. |
| 10 | 311-356 | 245-257 | In the forward pass, the `kind === 0` test and the whole `else if (s)` recall branch are removed. The completion branch keeps only v2's no-prediction arm: first completion `p0 = post.mean`, a later completion `p0 = s.p` with no Bayes update. The arithmetic is v2's, character for character. | Change (1): "each item goes through v2's existing no-prediction branch, with no recall events." |
| 11 | (none) | 307-318 | `type Row` and `function rankRows(input)`: v2's `rank` body from `const { now, dims, history } = input` up to and including `rows.sort(...)` moved unchanged into this function, which returns `{ est, order, rows }`. | Mechanical, so that `rank` and `moves` read the very same rows. |
| 12 | 405 | 361-367 | `rank` now calls `rankRows` and keeps v2's reason-building `rows.map` unchanged. | Mechanical (11). `rank`'s output is unchanged: tests 20-21 compare it with v2 byte for byte. |
| 13 | 503 | 423-527 (types 429-453, `pairCodes` 455-472, `CODE_ORDER` 474, `moves` 476-528) | New: `MoveCode`, `MoveFacts`, `MovingReason`, `pairCodes` (F6 §7's pair code), `CODE_ORDER` and the exported `moves(input)`. | Change (2) and (3). See §3. |
| 14 | 503 | 530 | `REACHABLE_V2 = { name: "reachable-v2", version: "2", rank, decide }` becomes `REACHABLE_V3 = { name: "reachable-v3", version: "3", rank, decide, moves }`. | Name, version, and the new function. |
| 15 | 505 | 532-538 | `internals` gains `rows(input)`, which returns each ranked row's `slug`, `value`, a copy of `terms` and `hasState`. The doc comment says F7 may read it. | Test hook: it lets the tests, and F7, re-run F6's pair test on `rank`'s own numbers without patching a scratch copy (F6 §7 had to). It is not in `REACHABLE_V3`. |

Not changed, though now partly unused: the `P` table is byte-identical to v2. Its entries `slip` (P4), `floor` (P5), `relearn` (P6), `missRateMult` (P6a), `strengthenHigh`/`strengthenLow` (P6b), `pullByRating` and `pullModifierMean` (P14) and `recallWindowDays` are no longer read. I left them so that the constant block matches A1's sheet line for line and no reader has to check a deletion. The input type (`HistoryItem` with `predictedCorrectly` and `recalls`) is unchanged, as the brief asks. `ReasonFacts` and `rank`'s `reason` are unchanged (O2).

## 3. Choices the spec left open

| # | Where | Choice | Why |
|---|---|---|---|
| 1 | "moved ... against v2's default order with finished slugs removed" | The default order is `defaultOrder(dims)` (v2's rule over all of dims) with history slugs removed, which is exactly the list v2's `rank` filters. A lesson has moved iff its index in `rank`'s output differs from its index in that list. Earlier means a smaller index in `rank`. | This is the only list `rank` compares against. The display's pins and non-pilot slots (F6 §1) belong to the glue, not to `rank`, so v3 cannot see them. |
| 2 | "passed cards" | F6 §1 on that list: x earlier passed y if def(y) < def(x) and rank(y) > rank(x). x later was passed by y if def(y) > def(x) and rank(y) < rank(x). A lesson whose index changed always has at least one such card (pigeonhole). | F6's definition, with `rank`'s positions in place of display slots. |
| 3 | Mapping of the q term to a code | q maps to `concept-known` only when **the moved lesson** has its own concept state, and to no code otherwise. F6 §7's `pairCode(u, l, mapBy = u)` maps by u. For an earlier move u is the moved lesson anyway. For a later move I map by the moved lesson (F6's `mapBy` argument), not by the lesson that passed it. | §15.1 (ii) 3 says the facts are about the lesson itself, and the later:concept-known copy is "you finished a lesson on this idea" (its own concept). Mapping by the other card would give later:concept-known to a lesson with no finished lesson on its idea. This is F6 §3's B2 fix ("read the later-direction q code from the moved card's own concept state"). A stateless q in F6's map is `domain-estimate`, which v3 does not have, so here it is no code. That is what produces G1. |
| 4 | "decisive against the most passed cards" | For each pair, T1's decisive code is `rank`'s own argmax over (prerequisites, q, refresh) with strict `>`, which keeps the first on ties, mapped as in choice 3. Each eligible code is scored by how many pairs it is decisive for. The code with the highest score wins, and ties go prerequisites > concept-known > refresh. An eligible code can score 0. | The brief's words, with T1 as F6 §1 defines it. |
| 5 | T0 | Pairs with `value(u) > value(l)` false count toward nothing. For passed pairs T0 always holds: equal values sort by default index, so a lower-default card cannot be passed at an equal value. | F6 §1 T0. |
| 6 | A moved lesson with no eligible code | `code: null`. The test that every moved slug has a code is written, and it fails (G1). | The brief: never a `default-order` line, and a test failure. I did not invent a code. |
| 7 | Output shape | `moves(input)` returns one `MovingReason` per ranked slug, in `rank` order: `{ slug, moved, direction, code, facts }`. Unmoved lessons have `direction: null` and `code: null`. | One entry per ranked slug, as the brief says. `null`s keep the shape fixed and contain no number. |
| 8 | Facts | Given for every ranked slug, moved or not, and independent of the code. `prerequisiteLessons`: lessons in dims whose concept is one of the lesson's prerequisites, in full default order, including finished ones. `finishedOnConcept` and `finishedOnPrerequisites`: history slugs that are in dims, each once, ordered by first completion, with ties in time going to default order. | "In-pilot" is read as "in `dims`", the only catalogue v3 sees. Ordering by time and then default order makes facts independent of history array order and dims key order (tested). The facts never name another ranked row's state (F6 N2). |
| 9 | "Keep rank/decide signatures" | Both are unchanged. `moves` has the same signature as `rank`. | The brief. |
| 10 | "Mechanical changes" | Dead code removed (rows 3-6, 9-10), the `rankRows` extraction (11-12), and `internals.rows` (15). | Dead branches would leave lines that mention recall and prediction arithmetic but never run. A reader checking "reads no prediction" would then have to prove they are unreachable. |

## 4. Gap that stops the freeze (stop-if: "any change beyond §15.1 (ii) 1-4")

**G1. An earlier move caused only by the lessons it passed being on finished ideas has no code.** In v3 every lesson with no concept state has the same q (prior mean 0.2064) and the same refresh (`refreshPrior`). Suppose such a lesson x has no unfinished prerequisite, and every lesson it passed is on a concept the learner has finished (q high, so their value drops). Then the only term that favours x in any pair is q. F6's map sends a stateless q to `domain-estimate`. v3 has no such code, and `concept-known` would be false about x, which has no finished lesson on its idea. The refresh term also favours x only while the passed lesson's own refresh is below `refreshPrior`, which is on the day of the finish (age 0) and not after.

Smallest case (test 34, pinned): dims a1, a2 (domain d1, concept A), c1 (d1, concept C, prerequisite A), b1, b2, e1 (d2, own concepts). a1 is finished 1, 3, 7, 14 or 30 days ago. The default order with a1 removed is b1, a2, b2, c1, e1, and `rank` gives b1, b2, e1, c1, a2. b2 moves earlier past a2 only, and its single contributing term is q. `code` is null at every age from 1 to 30 days. At age 0 refresh favours b2 and the code is `refresh`.

Size on my hand-made cases (test 33, a `todo` so the suite records it without passing it): 17 moved entries with no code across the 14 inputs it runs (9 cases plus 5 ages of the gap case; two cases share the same history), all **earlier**, all for lessons with no concept state and no prerequisite. That includes v2's own `historyA` (c-recursion, p-bayes). In two of the larger histories, 7 of 42 moved lessons had no code. It is not a corner case: it happens in the first history most learners will have (one finished lesson).

What would close it is a decision, not a build fix. I name the options without choosing among them.
- (a) A fourth code for this move, whose own-lesson fact is that the learner has finished no lesson on its idea (`finishedOnConcept` empty). That is a new code, so F7 and RC would have to test and write it. The true reason is a comparison with the lessons it passed (they are on finished ideas), which may sit at privacy-reviewer's Q-P5 ceiling.
- (b) Treat such a lesson as not moved for reasons, which breaks §12 G7 and T6. §15.1 refuses this.
- (c) Change the order so that a stateless lesson does not pass finished-concept lessons on q alone. That is a different policy, and a new v-number under M1, which §15.1 calls the last.
- (d) Map stateless q to `concept-known`. This is false about the lesson, so I reject it as the builder and list it only for completeness.

Owner: vp-personalization (decision), then learning-scientist-personalization (F7) for whatever is chosen. Until then v3 is not frozen.

## 5. Observations (not fixed, per the brief)

- **O1** (carried from v2's O1): `estimate()` builds `conceptDomain` in dims key order. In v3 every domain uses the same prior, so the domain a concept is mapped to no longer changes any value. Only the "no lesson in dims, so pKnown 1" branch reads the map, and that test does not depend on which domain is found. Key-order shuffles leave both outputs unchanged (test 28).
- **O2.** `rank`'s `reason` still has v2's variants. `domain-estimate` can still appear in `rank`'s neighbour reason (with 0 right, 0 wrong and the prior mean), and `concept-known` carries `recallsRight`/`recallsWrong`, which are always 0. §15.2 says the glue shows the `moves` reason, not `rank`'s, so I left it alone. If the glue ever reads `rank`'s reason, these fields are dead and the domain-estimate variant is the G1 case in another form.
- **O3.** Later moves of lessons with no concept state get `refresh` or `prerequisites`. For a stateless lesson, `refresh` comes from the other card's refresh term (an older finished idea due a refresh passes it). Its facts have nothing about its own idea, so §15.1's caution on refresh copy applies directly. This is for F7 and RC.
- **O4.** `pairCodes` uses exact floating comparisons (`> 0`, `>`), as F6 §7 does. Near-ties are F7's C9 count.

## 6. Tests (reachable-v3.test.mjs: 35 tests, 34 pass, 1 todo that fails, on Node 22.22.0)

Carried over from v2 (19 tests): the A1 pins, ranking and decide, replay, no state between calls, the deep-frozen input, forbidden fields, time translation, ties to the default order, the prerequisite reason, reason facts true against the input (graded counts now asserted 0, the domain estimate is the prior mean, and refresh times come from completions only), refresh on a finished concept, and the source scan. The scan also asserts that no code line after the types mentions `predictedCorrectly`, `.recalls`, `.rating` or `misconceptionStrength`. All seven order-rule tests are unchanged.
Dropped from v2, with reasons: "recalls older than 30 days are not read" (now no recall is read; tests 21 and 23 cover it) and the P14 pin (no domain estimate exists in v3).

New (16 tests):
- 20: cold start. `rank` with an empty history is `JSON.stringify`-identical to v2's on three dims sets.
- 21: on every case, v3's `rank` equals v2's `rank` on the same history with all predictions and recalls stripped, byte for byte.
- 22-23: flipping any `predictedCorrectly` (true, false, null, absent; one at a time and all at once), and adding, removing, inverting or flooding recalls, leaves both `rank` and `moves` unchanged.
- 24-25: `moves` lists the ranked slugs in `rank` order. `moved` and `direction` match an independent restatement of the default-order rule. The code equals an independent implementation of F6 §7's pair test plus the brief's selection rule (more than 10 moved entries, asserted).
- 26: codes are only the three (or null). The output has exactly the five keys and three fact keys, and contains no number at any depth.
- 27: the facts are the lesson's own, recomputed independently from dims and history. No fact is the lesson's own slug.
- 28-29: replay, no state between calls, deep-frozen input, six key-order permutations, time translation of both outputs, and forbidden fields (top level and on history items) plus `slots`.
- 30-32, 35: cold start on tied dims moves nothing; a worked prerequisites case; a worked later:concept-known case; the `REACHABLE_V3` names.
- **33 (todo, fails): every moved slug has a code that passes the pair test against at least one passed card.** It fails on G1. It runs on purpose and prints the failing slugs.
- 34: G1 pinned (§4).

`tsc --strict --noEmit --target es2022 --module esnext --moduleResolution bundler` on reachable-v3.ts: no errors (tsc 5.9.2, run from the scratchpad, per v2's note). The candidate has no import.

## 7. Freeze

**Not frozen** (§4 G1). No sha256 is recorded here on purpose. When vp-personalization decides G1, the next step is either a rebuild to the amended spec, which this run would then freeze with a second commit holding the hash, or a closed V3.

## 8. Hold on Q-A1 (chief of staff, relayed during this run)

The chief of staff asked that v3 not be frozen until vp-personalization decides Q-A1. The issue: after a pin, a card whose default slot was frozen can land only at or after the pin horizon, so the display can show it later while `rank`'s frame says it moved earlier. One option is for v3 to take the already-shown slugs as input and state direction in the frame of the unfrozen slots. This hold and G1 both block the freeze. Extending for Q-A1 is easy: `moves(input)` takes the same `ReachableInput` object as `rank`, so an optional field (for example `shown?: string[]`) can be added without changing either signature. The frame in choice 1 (§3) is the only code that would move: `defPos` and `rankPos` in `moves`, and the passed-card loop. It is worth deciding G1 and Q-A1 together, because a frame change changes which cards count as passed, and so changes G1's count.
