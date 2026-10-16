# Engineering Review: 2026-10-16: EDD-009 mastery half (two-part approval) and the beacon's kit boundary (C9)

owner: principal-engineer (Kenji) · tier: 2 (EDD-009 reads learner data and defines a learner-facing surface) · date: 2026-10-16 · board W-1132, W-1181 · batch company/initiatives/first-light/dispatch/2026-10-16-round-2.md#B5 · project [project:first-light]
attendees (in writing): learner-model-engineer (author). Parallel reviewers, who read the EDD itself and not this record: privacy-reviewer (§5), pedagogy-critic (Q1.7, Q1, Q3).
cites: company/engineering/notes/2026-10-16-first-light-reestimate-full-scope.md §7 (approve EDD-009 in two parts; the mastery part on 10-30 is the slip-rule date) and §3 (this review comes before the 10-26 to 11-09 window).

- EDD: [EDD-009](../edd/EDD-009-learner-model-v1-mastery-state.md), draft 1 (2026-10-16). Its status line is the author's and **I have not edited it.**
- Ruling: [privacy, `exp` beacon event](../../reviews/_privacy/2026-10-16-experiment-beacon-exp-event.md) C9 · PRD-004 R5 and §9 (as revised 2026-10-16 by growth-designer, round 2 B4)
- Code read (read only): `src/kit/progress.ts`, `src/kit/Lesson.tsx` (lines 55 to 75), `src/kit/types.ts` (`LessonEvent`), `src/components/Feed.tsx` (lines 60 to 70 and 250 to 262), `company/engineering/readiness/paths.json`
- ADR: none needed. Nothing here is expensive to reverse: the design stores nothing, and the flag hides it.
- Amendment: **none needed** for the mastery half or for C9 (see the C9 answer). `src/kit/Lesson.tsx` is not touched.

## Verdict

**verdict (mastery half: §1 to §6, §8 to §10 as they apply to mastery): approve with conditions.** This approval is **conditional on the privacy-reviewer's §5 confirmation** ("no new field, no new read"), which has not landed (no EDD-009 file is in company/reviews/_privacy/ on 2026-10-16). If her confirmation finds a new field or a new read, this verdict lapses to **revise**, and I re-read.
**verdict (personalization half, §7): not reviewed.** It is a stub, waiting on F-08 and F-19.

**C9 (where the `exp` sender sits): outside `src/kit/`. No kit amendment is needed.** Details below.

## Route (the two-part approval)

1. **Part 1, mastery (§1 to §6, §8 to §10): reviewed here, approve with conditions.** It becomes approved when (a) the privacy-reviewer confirms §5, (b) the author has answered conditions M-1 to M-4 in the EDD, and (c) pedagogy-critic has ruled on Q1 and Q3. I re-read only the changed lines of the EDD, not the whole document. **The slip-rule date (10-30) applies to part 1 only.** Challenges (PRD-004) and the mastery state need only this part.
2. **Part 2, personalization rules (§7): approved separately by 11-03 at the latest**, once F-08 exists and F-19 is decided. Otherwise personalization ships switched off (quality bar §4), and §7 stays a stub for release 1. Part 2 gets its own review record. Anything that moves feed cards changes the feed's contract and is tier 2. Nothing in part 1 pre-approves it.
3. The author records this route in EDD-009's `route:` and `status:` lines (lane 14). I do not edit them.

## Checklist

- [x] **The problem is real.** Ruling 4 makes mastery a never-cut release-1 surface, and PRD-004 R5 waits on its words. No mastery state exists today, and the claims register holds no mastery strings (EDD §6.1, matching the code I read).
- [x] **At least two options, including doing nothing.** Five are considered (§6.2): nothing, the AMD-008 defaults verbatim, the pure function, a stored state, and knowledge tracing. The pure function is the smallest one that keeps the words true.
- [x] **Blast radius.** New code is only `src/lib/learner/mastery.ts`, a copy file and the callers: the account view, the challenge page, and the map optionally. The feed order does not change (§6.3 item 3). No lesson changes. The kit is not touched: `masteryOf` reads the `LessonProgress` type and takes the record as an argument. It needs only a type import from `@/kit/progress`, and that is not a kit change.
- [ ] **Readiness record approved by principal-engineer-ops.** EDD §9 answers sections 1 to 7 once. Under paths.json today, the code would be **tier 1**: `src/lib/learner/**` matches no rule. See finding F4.
- [x] **Rollback is one revert,** or the `mastery` flag off. Nothing is stored, so nothing has to be migrated back (§9.3, §10).
- [ ] **`npm run verify` on the integrated tree.** Not applicable yet: this is a design review, and no code exists.
- [x] **Measurements are committed before implementation** (§8: fixture replay, purity, time, monotonicity, order, anonymous equals signed-in, and the M4 scan). But see F3 on where they run.
- [x] **Security, privacy and licenses.** No dependency, no event and no stored field (§5). The privacy confirmation is pending, and this verdict is conditional on it.

**Stop-if check (batch B5):** the mastery half needs **no stored data** (§5: the state is computed on render and written nowhere). It needs **no new read of learner data**: it reads D1's `completedAt` and `recalls`, which `revisitDue` already reads in the same browser on every feed load (`Feed.tsx` line 66), and nothing else (`predictedCorrectly`, D2, D5 and the account row are all excluded). It needs **no `src/kit/` change** (§6.3 item 2, and confirmed against the code). None of the three stop conditions holds, so I approve, conditionally.

## Findings (problems, not fixes)

**F1. The signature holds E5 by construction. This is the right shape.** `masteryOf(p, dayMs)` has no `now`, so time cannot lower a state unless someone changes the signature, and the M3 time test catches that. Rendering the copy only from the `evidence` object means the words cannot claim more than the numbers in it. I would block any later change that adds `now` or an engagement input to `masteryOf`, and the §8 purity and time tests are the guard. This is a statement of why the design passes, not a problem.

**F2. E3 says "duplicates with the same `at` are one recall" but does not say which one wins when they disagree.** After a union merge, two rows can share `at` with different `correct` values. EDD-008's primary key de-duplicates on the server, but the local union write and an imported map can still carry both. Condition **M-1**.

**F3. §9.2 says the fixture and property tests run "in CI". They will not.** `.github/workflows/ci.yml` is protected. It runs check, typecheck, build and the QA contract, and not custom suites. This is the same gap as `test:accounts` and `test:platform` (r2 engineering batch; the AMD-001 (c2) readiness record). The tests run where `npm run verify` runs them, and only if the build run adds them to `verify`. Condition **M-2**.

**F4. The path map would put the mastery code at tier 1.** EDD-009 itself is tier 2 because it reads learner data and defines a learner-facing claim surface. Its code, `src/lib/learner/**`, matches no rule in `company/engineering/readiness/paths.json`, so it defaults to tier 1 and gets no readiness check. For `masteryOf` alone, tier 1 is tolerable, because the §8 tests are the real guard. But §7's personalization rules will live in the same folder, and they move feed cards. The map should say `src/lib/learner/**` is tier 2 (class `learner-data`) before part 2's code exists. I own the map, and principal-engineer-ops proposes entries. Ask **A-1**, not a condition of part 1.

**F5. §6.3 item 4 names a `mastery` flag, but no flag mechanism exists on main.** The only switch today is `NEXT_PUBLIC_EVENTS` (`progress.ts` line 75). Condition **M-3**: use the same build-time pattern the accounts flag uses on `accounts`, and add no flag framework. A second ad-hoc mechanism would be the architecture-astronautics failure my role watches for, and so would a general flags system built for two flags.

**F6. Clock skew between devices can move a recall across E2's one-day line.** `at` is the device's `Date.now()`. After a merge from a device with a wrong clock, a recall can count or not count by a few minutes. I accept this as a cost: the record is the evidence, the error is small, and it can only flip `played` to and from `recalled` at the edge, never invent a `held`. It is not a condition. It is recorded so that nobody rediscovers it as a bug.

**F7. Q4 (unsorted `recalls`) is real, but it is not mastery's.** Mastery is immune because E3 sorts. `revisitDue` is not immune: it reads the last array element (`progress.ts` line 54). The fix belongs to EDD-008's merge: write `recalls` sorted by `at`, outside the kit. The alternative is to sort inside `revisitDue`, and that is a tier-2 kit change. I prefer the merge-side fix (backend-engineer, EDD-008 Q4). It is not a condition of part 1.

**F8. The PRD-004 R5 words now match §3.3 and §3.4.** growth-designer adopted them in round 2 B4. I compared R5 with §3.3 row by row: same ids, same conditions, floors and the `due` flag. No change is asked.

## Conditions on part 1

| # | Condition | Owner | Before |
|---|---|---|---|
| M-1 | E3 names the tie rule for the same `at` with different `correct` values. **I recommend that wrong wins**, because it claims less (M7) and agrees with "only a wrong recall lowers a state". Add one §3.6 fixture for it. | learner-model-engineer | part 1 approval |
| M-2 | §9.2 is corrected: the suite runs in `npm run verify` (added to `verify` by the build run), not in CI. CI coverage would need a ci.yml amendment, which is evaluation-steward's call and not a condition here. | learner-model-engineer (text); platform-engineer (adds to `verify` in the build run) | part 1 approval (text); merge (script) |
| M-3 | The `mastery` flag uses the existing build-time env pattern (as `NEXT_PUBLIC_EVENTS` does, and as the accounts flag does on `accounts`). No new flag system. | learner-model-engineer (EDD text); platform-engineer (build) | part 1 approval |
| M-4 | §6.3 states that `masteryOf` imports only **types** from `src/kit/`, and that its callers read the progress map through the existing `loadProgress()`. There is no new kit export, and `progress.ts` is not changed for mastery. If the build finds it needs a kit change, it stops and comes back here. | learner-model-engineer | part 1 approval |

## C9 answer (the privacy ruling's kit boundary), dated 2026-10-16

**Where the `exp` sender sits: outside `src/kit/`. It does not need a kit amendment.** The sender is a small client module. I propose `src/lib/events-exp.ts`, which matches the tier-2 `event-api` rule `src/lib/events*` in paths.json, so the module gets a readiness check. Its callers are outside the kit too: the recall handler in `RevisitCard` (`src/components/Feed.tsx`, around line 256) and the challenge host (PRD-004). Neither is under `src/kit/`.

Rules for the build, so that "outside the kit" stays true and C4 and C8 hold:
1. **Do not use `track()`.** `track()` (`progress.ts` line 70) appends every event to `s3c:events:v1`, and C4 forbids storing `exp` locally. The sender calls `navigator.sendBeacon("/api/events", …)` itself.
2. **Do not add `exp` to `LessonEvent`** (`src/kit/types.ts`). That union is the kit's lesson-event contract. `ExpEvent` is its own type in the new module, and the route's per-type pick (C1 and C2, backend-engineer) imports it from there.
3. **The kill switches are in the sender:** the same `NEXT_PUBLIC_EVENTS !== "off"` test as `track()`, plus `navigator.globalPrivacyControl` and `navigator.doNotTrack === "1"` (C8). `track()` checks neither GPC nor DNT today. That is a gap for **every** event under P6.4, and closing it in `track()` is a kit change (`src/kit/**`, tier 2). It is not needed for C9. It goes to the C8 owner.
4. **Use kit APIs read-only.** The sender may call `loadProgress()` to learn whether this is the lesson's first revisit (`recalls.length === 0` before the append). That uses an existing export and does not change it.
5. A test in the build run asserts that the module does not import `track` and never writes `s3c:events:v1`. This is the C4 guard, and it runs in `verify` (see F3).

**Two findings for the C2 and C8 owners, found while placing the sender (not conditions of this review):**
- **`spacedDays` will be dropped by C2 as the code stands.** The existing recall event computes `spacedDays = Math.round((now − completedAt) / 86_400_000)` (`Feed.tsx` line 257). That is elapsed days since play, not a schedule value. C2 accepts only 1, 3, 7 or 21. A learner whose first revisit comes on day 2 or day 5 would send a value the server silently drops. The constant also ignores `?revisitMinutes`, so QA would always send 0. The `exp` sender must send the **schedule step** for this recall (`REVISIT_SCHEDULE_DAYS[successes before this recall]`), not reuse that computation. → growth-designer (sender spec) and backend-engineer (C2 test with a day-5 recall).
- **C8's "stopped without a rebuild" is not met by a constant.** C2 makes the registered-experiment list a server constant with an end date. That stops collection at a set date, but an early stop then needs a deploy, and every deploy needs the founder's approval. As I understand it (not checked from this host), any run-time switch also needs a redeploy on Vercel (an env var read per request) or a new dependency with a decision record (an edge config). → privacy-reviewer and backend-engineer decide whether "a founder-approved deploy" is an acceptable early stop. I do not decide it.

## Decision

**Approve with conditions (part 1, mastery), conditional on the privacy-reviewer's §5 confirmation. Part 2 is not reviewed. C9: outside the kit, no amendment.** Objections that travel with it:

| # | Objection | Raised by | Status |
|---|---|---|---|
| 1 | "Approving before the privacy confirmation lets the build start on an unconfirmed data claim." | principal-engineer (against this review) | **Answered by the condition.** Part 1 is not approved until §5 is confirmed. No build run starts before then. The build also waits for EDD-008's progress on a preview (EDD §10.3), so the order costs no days. |
| 2 | "Lesson-level state only (§3.7) under-delivers AMD-008 M1's 'concept'." | EDD objection 3, carried | **Not an engineering objection.** It is evaluation-steward's Q2. A concept roll-up would be a new rule and comes back here, as R-m2 says. |
| 3 | "The lenient `held` after a wrong answer (Q1) may overclaim." | EDD Q1 | **Not mine to settle.** It goes to pedagogy-critic. Either answer is one table row and one fixture, and it does not change the architecture. |
| 4 | "Putting the `exp` sender beside `track()` duplicates the beacon transport, so the two can drift." | principal-engineer (against the C9 answer) | **Accepted as the cost.** The alternative is a kit change that adds an option to `track()`, which is tier 2 in `src/kit/**` and would touch the lesson-event contract for an experiment that has an end date. The drift risk is two lines (the switch test and the URL), and C9 rule 5's test pins the sender. If a third sender ever appears, the shared transport moves to `src/lib/events*` with its own EDD note. |
| 5 | EDD objection 1 (no credit for predictions) and objection 2 (a state that can go down) | learner-model-engineer, self-raised | **No engineering objection to either.** Objection 1 makes the read smaller, which I prefer. Objection 2 is held by the monotonicity property test in §8. |

## Asks (for the board, through the chief of staff; I did not edit board.json)

- **A-1, principal-engineer-ops:** propose a `src/lib/learner/**` tier 2 rule (class `learner-data`) for paths.json before EDD-009 part 2's code exists (F4). I approve the entry when it is proposed.
- **learner-model-engineer (lane 14):** M-1 to M-4 in the EDD text, and the two-part route in the EDD's route and status lines.
- **growth-designer:** `exp.spacedDays` is the schedule step, not the elapsed days (C9 findings).
- **backend-engineer:** add a C2 test for a day-5 first revisit (expect the schedule value 1, not 5). Also EDD-008 Q4: sort `recalls` by `at` in the merge write (F7).
- **privacy-reviewer, with backend-engineer:** decide whether C8's early stop may be a founder-approved deploy. Also confirm EDD-009 §5, which this verdict depends on.
- **C8 owner (backend-engineer per the ruling's next move 2):** `track()` sends no GPC or DNT check for any event. Fixing it is a `src/kit/**` tier-2 change and needs its own small review.

## Kudos (optional)
- @learner-model-engineer: EDD-009's signature without `now` makes "time never lowers a state" a type-level fact instead of a promise, and the §3.6 fixtures make the review a check, not a reading.
