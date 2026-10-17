# reachable-v1: build note (C1, blind to the judge)

owner: learner-model-engineer · run: lme-c1-1017 · date: 2026-10-17 · board: W-1572 (item C1) · brief: mail 20261017T171622360Z-vp-personalization-ca855af7; company/personalization/batches/2026-10-17-batch-5.md §3, §6 C1, §10
files: `company/personalization/policies/reachable-v1.ts` (the candidate), `company/personalization/policies/reachable-v1.test.mjs` (unit tests, hand-made histories only)
reviewer named by the brief: learning-scientist-personalization (F5) reads the code against criterion 3 §2.2's text, not against the eval's file.
status: candidate only. **No simulated episode was run, and no harness or simulator was opened, imported, copied or run.**

## 1. Every file I read

Criterion and evidence text, at 709ca2d via `git show` (nothing later):
- company/personalization/eval/2026-10-17-criterion-3.md §1.1, §1.2, §2.2, §4 (plus its heading list, to find them).
- company/personalization/eval/2026-10-16-criterion-2.md §I.3, §I.4, §1.1, §1.2, §1.3, §4 (plus its heading list).
- company/personalization/evidence/2026-10-16-criterion-2-ranges.md (E1): grep for headings and the prior/pull/guess/predict lines, then its "Ranges table (for criterion 2's world)" in full. Not read line by line in full.
- company/personalization/evidence/2026-10-17-criterion-3-ranges.md (E3): its headings and table rows, then its "Ranges table (for criterion 3's world)" in full.
- company/personalization/model/model.ts: the export list, `FORBIDDEN_INPUTS`, `LessonDims`, `HistoryItem`.
- src/kit/progress.ts in full.
- Added by batch 5 §10 (df13ebe), at 709ca2d: company/personalization/eval/2026-10-16-phase-a-criterion.md, by grep only, the §4 rows "misconception pull" and "rating fidelity ρ", the bullets "How ρ is defined", "How the persona latents enter", "What the B2 rules give", the `B2_PULL_RANGE` C4 fill row (and one §8 table row the same grep returned, naming `simulatedRating`; I opened nothing it names). Criterion 2 §1.2 opening paragraph and row L6 and §4 "pull scale" were already read above.

Not from 709ca2d:
- A1's sheet, company/personalization/policies/reachable-v1-params.md, at 4a4da38 (first version) and 48218b3 (P14 rewritten, P12 confirmed), via `git show`. The candidate transcribes **48218b3**. My `git merge` of the main working branch was refused by the permission system, so I read the sheet from its commit and did not merge.
- company/personalization/batches/2026-10-17-batch-5.md §0, §3, §4, §6 C1 (at HEAD of perso-cand-c1) and §10 (at df13ebe).
- The dispatch brief (company/ops/mailboxes/dispatcher/20261017T171622360Z-vp-personalization-ca855af7.md), my onboarding doc, my role memory (company/roles/memory/learner-model-engineer*: run entries on earlier simulator, readout reproduction and review-timing work. None describes the reachable oracle's code), and tools/commit-own.sh.

**Never opened, imported, copied or run:** anything under company/personalization/eval/harness/ (c2, c3 including reachable-oracle.mjs, root, records), readouts 1-3 and their repro files, the B2 memo, any simulator (company/personalization/model/sim/), any file named after "Code:" in the sections above. The only code I ran: the unit tests, `tsc --strict` on the candidate, a scratch smoke call of `rank` on a hand-made history, and the κ/prior-mean pins.

## 2. What the file does (criterion 3 §2.2 steps 1-6)

`rank(input)` rebuilds the estimate on every call and returns every eligible new lesson `{ slug, value, reason }`, best first. `decide(input) = rank(input)[0]`. Input: `{ now, history, dims, slots }` only.
1. Per domain, posterior over the prior-knowledge rate π on a 101-node grid (P10-P12), from the first prediction on each concept: P(right | π) = π(1 − slip) + (1 − π)(1 − E[pull | rating]) (P4, P14).
2. A time-ordered forward pass over completions and visible recalls. A completion sets P(known) = P(known before | prediction) + (1 − that) × P(encode). The revisit law updates P(known) on each recall: floor P5, relearn P6, strengthening P6b, miss multiplier P6a, kept share κ (P7-P9, P15).
3. For a concept not completed: its domain's posterior mean.
4. P(encode) = learnRate × (1 + feedback) × (1 − penalty × (1 − ∏ P(prerequisite known))) (P1-P3).
5. value = (1 − q) × P(encode) × κ(14; mult 1) + q × refresh. For a concept not completed, refresh = κ_m(14) − κ_m(6.5 + 14) (m = P13, assumed age priorAgeDays 0 + 6.5). For a completed concept, refresh = κ(14; its mult) − κ(a + 14; its mult), where a is the visible time since its last event.
6. Sort by value, highest first. Ties go to the default order.

Pins against A1's sheet (tests): κ(14) = 0.484, κ(7) 0.561, κ(30) 0.350, κ_m(6.5) 0.968, κ_m(20.5) 0.949, clamped prior mean 0.2064, and one wrong rating-2 prediction moving π̂ to 0.187. All match ±0.001.

## 3. Every point where §2.2's text left a choice

| # | Where | Choice | Why |
|---|---|---|---|
| 1 | Step 6 / "the default order derived from `dims` by the catalogue's rule" | **The key order of the `dims` object** (`Object.keys(dims)`), completed lessons removed. | My read set does not state the catalogue's rule, and the code that holds it is outside the set. C3 §1.1 D1 says the feed's list is the server's catalogue order, and C2 §I.3 says `dims` holds every catalogue lesson. If the judge's world builds `dims` in catalogue order, key order *is* that order. **This is the largest risk in the build:** with flat-domain values many lessons tie exactly, so ties decide much of the order. If the catalogue's rule is a sort that differs from the key order of `dims`, an RS7-style check would fail. The test `ties go to the default order` pins this behaviour. |
| 2 | Ties | **Exact float equality**, with no epsilon. | An epsilon would be a free constant. Lessons with identical terms produce identical arithmetic, so their values are exactly equal. |
| 3 | "Eligible new lesson" | Every `dims` key whose slug is not in `history`. **No filter on `status`, domain or pilot list.** | §2.2 names no filter. C3 §1.1 D3 says drafts and retired lessons are not modelled, and a pilot-domain list would be a constant outside the input. |
| 4 | Step 1, "every first prediction in that domain" | For each concept, only the prediction on its **first completion** (oldest `completedAt`; ties go to history order). If that item has no prediction, the concept adds nothing (a later prediction comes after study). `null` or absent is no evidence, never "wrong" (C2 §I.3 P2). | The only prediction that measures prior knowledge is the one made before the concept was studied. |
| 5 | Step 2, "the prediction's posterior" | Exact under the grid: P(known before \| all first predictions) = E_post[π·P(pred \| known) / P(pred \| π)]. A concept with no first prediction uses the domain posterior mean. For a second lesson on an already-completed concept, plain Bayes on the current P(known). | This conditions on the concept's own prediction once, without counting it twice through the domain mean. |
| 6 | Prerequisite concept with no lesson in `dims` | P(known) = 1, so no penalty. | C2 §1.2: the penalty applies when an **in-pilot** prerequisite is unknown. A concept missing from the catalogue is not in the world's set. |
| 7 | Step 2, encoding at a completion | P(encode) uses the prerequisites' P(known) **at that moment** of the forward pass. Prerequisites not yet completed use their domain posterior mean (all predictions). | §2.2 says "then encoding", and the time-ordered pass gives the state at the time. |
| 8 | Prior grid (P12) | 101 nodes, step 0.01, following the sheet. Each interior node takes the N(0.20, 0.15²) mass of its ±0.005 cell (Simpson's rule, 20 panels). Node 100 (π = 1) takes [0.995, μ + 12σ]. Node 0 (π = 0) takes 1 minus the rest, which holds the clamped mass. | This is the sheet's clamp [0, 1]. Simpson's rule needs only `Math.exp`, so no erf constants are needed. Prior mean 0.2064 matches the sheet. |
| 9 | L9 quadrature (P9, the sheet asks C1 to name it) | z in [−8, 8] at step 0.05 (321 nodes), normal weights normalised to sum 1. I average **kept**, not k. | The sheet's κ values (computed at step 0.001) are matched to 3 decimals, at about 50 times less cost per call. |
| 10 | Single-trace state per concept | Each concept carries one clock and one rate multiplier, set to the **expected** value given known. At a first completion: mult = (p0·m + (1 − p0)·P(encode)·1) / P(known). After a right recall: mult × (w·s(r) + 1 − w), where w = (1 − floor)·r / (floor + (1 − floor)·r) is the retrieval share (C2 L7). After a miss: mult × P6a (1.0). The clock resets to every event. | §2.2 does not say how to carry a mixture of traces. One expected trace keeps the estimate small and explainable. Clocks matter only for the refresh term of lessons that repeat a completed concept, which is small at base. |
| 11 | Revisit law in the filter | P(right \| known) = floor + (1 − floor)·κ(a; mult). P(right \| unknown) = floor. After a right answer on an unknown concept, or after any miss, the concept becomes known with P relearn (C2 L3, P6). A known concept stays known (binary state). | This is C2 §1.2 L3, L7 and the recall form, read as text. |
| 12 | 30-day window | The candidate itself drops recalls with `at < now − 30 days` (idempotent if the caller has already cut them). | The window still holds if a serving layer passes the full history (privacy F1). 30 is C2 §I.3's constant. |
| 13 | Feedback term | (1 + feedback) is applied to every new lesson, as step 4 writes it. | It is unconditional in §2.2's text. |
| 14 | Refresh for a not-completed concept | κ_m(14) − κ_m(6.5 + 14): the gain from resetting a prior trace's clock, keeping m (C3 L11). | Step 5 says "assumed trace age priorAgeDays + 6.5". |
| 15 | `slots` | Accepted and not read in the value. | Step 5 values a single pick, not a session. |
| 16 | Rating | `misconceptionStrength` (1, 2 or 3) if present, else a numeric `rating` field. The sheet's "absent" value applies otherwise. | §2.2 lists "rating" among the dims, and model.ts's rating field is `misconceptionStrength`. |
| 17 | P14 form | `E[pull | rating] = table[rating] + m̄`, with the table at 0.499 / 0.579 / 0.662 / 0.567 (absent) and m̄ = 0, transcribed from 48218b3. | The sheet keeps m̄ as a separate stated choice, so the code keeps it as a separate named term. |
| 18 | Reason codes | Each lesson is explained **against the next one in the ranking** (`versus`). Each term in turn (prerequisite factor, q, refresh) is swapped for the next lesson's value. The term whose swap closes the most of the gap is named: `prerequisites` (facts: own and versus prerequisite concepts, with P(known) and the **completed slugs** that taught them), `domain-estimate` (domain, counted right and wrong first predictions, estimate), `concept-known` (concept, completed slugs, right and wrong recalls in the window, P(known)), `refresh` (concept, last event's slug, days since). Equal values give `default-order` (both indices). The last lesson gets `last`. | "Name the term that decided the pick" is read as: decided it over the alternative it beat. The facts are only things a test can check against the input (test `reason facts are true`). Learner-facing copy is not written here (G7 and AMD-008 P3 belong to their owners). |

## 4. Interface and invariants (tested in reachable-v1.test.mjs, 14 tests, all pass)
No imports, no `Date`, no `Math.random`, no `process`/I/O (checked on the source with comments stripped). Same input gives the same output (replay). No state between calls (other learners' calls first change nothing). The input is not mutated (it runs on a deep-frozen input). Forbidden fields are ignored: every `FORBIDDEN_INPUTS` name plus `gapDays`, `settings`, `persona` and `fixedDue`, each at four values. Shifting every timestamp by a constant changes nothing. Recalls older than 30 days are ignored. Ties follow `dims` key order. Reason facts are checked true against the input. The file passes `tsc --strict` with no errors.

`internals` (κ and the prior mean) is exported for tests and F5 only. `rank` and `decide` do not use it.

## 5. Open (owners named)
- Choice 1 (default order = `dims` key order) is the main departure risk. personalization-eval's K5/K6 checks show whether it matches the catalogue's rule. If it does not, the fix is reachable-v2 (G6). Owner: personalization-eval (K5/K6) then vp-personalization.
- Choices 4, 5, 10 and 18 are readings of §2.2's text for F5. Owner: learning-scientist-personalization.
- P14's m̄ = 0 and the clamp are A1's stated choices (sheet 48218b3, Open 1). Owner: F5.

## 6. Freeze
Frozen content: `company/personalization/policies/reachable-v1.ts` as committed with this note. After the hash below is written, the file never changes; a change is reachable-v2.

sha256 of `company/personalization/policies/reachable-v1.ts` (file content, as `sha256sum` and `git show 96c2a40:<path> | sha256sum` both give): **da8b7e4c721b75b8502c2d768676d02910505421100495044e6947c34e4c5876**, committed in 96c2a40 on branch perso-cand-c1.
