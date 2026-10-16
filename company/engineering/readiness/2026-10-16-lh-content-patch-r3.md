# Operational readiness: lh-content-patch-r3

change: Life Hacks lhfix-r3 (dispatch 2026-10-16-r5-lifehacks.md B1): patch r2 §2 as amended, patch r3 rows, r3 dispatch D1/D2 builder cells and r5 D3 in spec text (home-lessons.ts, studyCatalog.ts, resource-specs.json) and 21 lessons' meta.json; two Home lessons moved to engine 2 (laundry-gap-air-path, laundry-sort-before-walk); one chip label pair in RetrievalLesson.tsx; four one-function rows in HomeLesson.tsx (E1-E4); test list lines, one R2 re-pin and three new render tests in tests/lifehacks
change-tier: 2
paths: src/lib/lifehacks/home-lessons.ts, src/lib/lifehacks/studyCatalog.ts, src/lib/lifehacks/resource-specs.json, src/components/lifehacks/HomeLesson.tsx, src/components/lifehacks/RetrievalLesson.tsx, tests/lifehacks/home.test.mjs (laundry-sort pin only), tests/lifehacks/home-v2.test.mjs, tests/lifehacks/engines-v2.test.mjs (W2/W3 inventory lines only), tests/lifehacks/home-locked.test.mjs, src/demos/lifehacks/*/meta.json (21 lessons), company/reviews/*/build.md (21 lessons)
author: demo-builder
board: W-1257, W-1279, W-1234, W-1300, W-1251, W-1340, W-1344, W-1345, W-1347, W-1348; no new item placed by me
risks: none proposed (see 7)
links: branch lhfix-r3 from main 422f861; commits below; inputs company/reviews/lifehacks-200/content-patch-2026-10-16-r3.md (+ .run.mjs), content-patch-2026-10-16-r2.md §2, company/ops/dispatch-requests/2026-10-16-r3-lifehacks.md D1/D2, 2026-10-16-r5-lifehacks.md D3/D4/D5, 2026-10-16-r2-quality.md R2; revoke rules of 2026-10-16-lh-home-locked-stage-addendum-approval.md

**Not merged. Merge waits on principal-engineer-ops approving this record.** No deploy is asked for or implied. No claim is verified by me: 35 claims reset and 4 added, all unverified.

## Commits (each reverts on its own)

| Commit | What | Touches code? |
|---|---|---|
| 764ef10 | Home content: §2, patch r3 D1/D2, r3 D1/D2 cells, square-bow source; laundry-gap-air-path to engine 2 + W2 lists | spec JSON, test list lines |
| c715f7f | Study content: batch-by-setup, reverse-the-flashcard | spec JSON |
| d44fdab | keep-the-error-feedback: **RetrievalLesson.tsx FeedbackStage chip labels** `Try ${r.tries}, count only` / `Try ${r.tries}, marked`, with its c3/c4 | one line of a component |
| eccf80f | Resource content: lh-fixed-energy-charge principle and misconception | spec JSON |
| 8ffa8f1 | E1 tote lever arm `atan2(centre*k,150)` → `188` in w3Picture `balance`, + test | one line |
| 10c03f8 | E2 socks hollow label in mode B, + test, new claim | one expression |
| 92d06bf | E3 desk-supply-near-use neutral route picture, + test | route branch of Scene, gated on v2 + distance-use |
| 61b1ef8 | E4 SceneV2Props comment | comment only |
| 926cb9c | E5 laundry-sort-before-walk to engine 2 + R2 re-pin + W3 lists | spec JSON, test pin |
| (this commit) | build notes for the 21 touched lessons; this record | docs |

The RetrievalLesson.tsx change: FeedbackStage renders only for `retrieval.kind === "feedback"`, and `grep -c '"kind": "feedback"' src/lib/lifehacks/studyCatalog.ts` = 1 (keep-the-error-feedback). SSR render of RetrievalLesson for that lesson shows `Try 3, count only` and `Try 3, marked`.

## Done-when, with evidence (all run on lhfix-r3 at 926cb9c unless stated)

- `npm run test:lifehacks`: **133 pass, 0 fail** (130 on main; +3 new: E1, E2, E3). `npx tsc --noEmit`: exit 0. `npm run check`: passed (969 lessons, 5302 claims; warnings only sock-pairing-by-pattern and cue-needs-a-boundary disputed, both outside this change).
- Patch r3 run script, `node --import ./tests/lifehacks/register.mjs company/reviews/lifehacks-200/content-patch-2026-10-16-r3.run.mjs HEAD`: exit 0, ratchet ok for all 5 slugs. Its output equals the run before my edits line for line, except elastic-loop-release's title/hook lengths (the §2 title and hook, not in `PATCH`). Every number patch r3 quotes is reproduced (laundry-gap 48/60/45/80 → B 2/5/1.25/10, A 0; towel p=2 and p=1; tote p=3/5/1; elastic A=1 B=0, sliderMatters=false; sock-pairs 15/3, 45/5, 6/2, 28/4). A field-by-field compare of every `PATCH.set` field with the spec on disk: 0 differences. The three seen claims patch r3 quotes (laundry-gap, elastic, sock-pairs) end with the quoted sentence.
- D3 numbers: `queueResult` batch-by-setup [0,1,2] waiting 21, starts 0/7/14; [0,2,1] waiting 17, starts 0/5/12. `resourcePair` lh-fixed-energy-charge 20 kWh [14, 6], 40 kWh [18, 12], 100 kWh [30, 30]. FeedbackStage fixture `r.tries` = 3. All as D3 quotes.
- `npm run -s company -- claims --open` lists all **39** changed or new claims (scripted diff of every touched meta.json against 422f861: 39 changed/new, 39 listed, 0 not unverified). New: laundry-gap-air-path.seen, laundry-sort-before-walk.seen, socks-use-shoe-space.picture, tote-balance-sides.caption.
- **v1 renders: unchanged.** SSR snapshot of all 69 Home lessons (same method as the lh-engine-locked record): locked, unlocked with no mode, A and B at min, initial and max, plus reveal and predict props; before = 422f861, after = 926cb9c. **39 of 39 lessons that are v1 on both sides render byte-identically** (laundry-gap-air-path and laundry-sort-before-walk left v1 here, by design). 422f861 contains lh-engine-locked, whose record found 0 of 41 v1 changes against acb4025, so the chain to acb4025 holds by transitivity; I did not render acb4025 itself. Every engine-2 difference traces to a row: titles in aria labels, the garment-overlap slider label, the drying-room slider min, E1 (tote A and locked tilt), E2 (socks B label), E3 (desk-supply neutral and A only; B identical), the two moved lessons.
- **Locked pictures:** home-locked.test.mjs (at initial, every engine-2 spec by filter, so both moved lessons are included) passes. My stricter scratch sweep at **every slider step**, 1,108 locked or pre-press pictures: 8 draw a number equal to some cell at that step, none a result: box-handle-clearance "40/46 cm opening" (the slider input, untouched lesson, predates this branch), tote "5 kg" at p=5 (the stated left-side given; unreachable while locked), laundry-sort "8m one-way" at p=8 (the question's 8 m, equal to the trip count only at that step). At initial: 0.
- **Parked lessons:** `git diff 422f861 HEAD -- src/demos/lifehacks/sock-pairing-by-pattern src/demos/lifehacks/suitcase-layer-access` is empty, and both spec entries in home-lessons.ts are JSON-identical to main.
- **W-1247 answer range is live:** setting laundry-gap-air-path and laundry-sort-before-walk `answer` to 3 fails the suite (`laundry-gap-air-path: answer 3 is not one of its 3 options`, 132 pass / 1 fail). Reverted; tree clean.
- E1 mutation: with 150 restored, the new test fails (`p=3 a: rotated dot at x=156.25, pivot at 150`).
- QA: one release build (`NEXT_DIST_DIR=.next-lh3`, tsconfig.json edit by next reverted), served by tools/serve.sh on 4073, `QA_ONLY` = the 21 touched lessons, `--workers=2`: 50 passed, 2 failed; the 2 are feed.spec "subject chips filter the feed" on phone and desktop, which compares against the QA_ONLY subset and passes 10/10 when run without QA_ONLY. All 42 contract tests passed. Server stopped, dist deleted. The harness stamp was clean (no tests/qa edits).

## Judgment calls for the approver (read these)

1. **E2 changed a test literal outside laundry-sort.** home-locked.test.mjs's non-vacuity test asserted that socks-use-shoe-space in **mode B** draws `600 cm³ empty`. Row E2 makes mode B draw `400 cm³ still empty` at the initial 200 (the row names that value). I changed the line to assert A draws `600 cm³ empty` and B `400 cm³ still empty`. The test's purpose (after a press, pictures do state numbers) is kept. The batch's stop-if forbids moving "any pinned test value other than laundry-sort's". I read it as covering pins that move to fit the code, not a literal that the row itself redefines. If you read it strictly, revert 10c03f8: it reverts alone, and the rest stands.
2. **E5 fields the batch did not name.** Engine 2 needs `amounts`, and the plan's 8 m needs `values` [4] → [8] (R2 says the old 64 "holds only at 4 m"). So I set: values [8]; initial 10 (the question's ten); amounts one row `Trips` (A = p, B = 1); the defaults for modeLabels, resultLabel (`Travel`) and the reveal sentence; formula c3 rewritten for 8 m. The idea, limit and recall are unchanged. The meta `misconception` is not one of the new options. I did not write one; that is for cm-lifehacks.
3. **E3 label scope.** `N m to the tape` is drawn only while neutral. After a press, A keeps `Nm one-way` with its round trips, and B is unchanged. The row's heading says "v2 + neutral only", and the label would be false for B's copy at the desk. The tape mark moved to the far station in neutral and A, because the render had it inside the desk rect (the row's condition).
4. **D3 chip label and E1-E4 are component changes.** They are the only ones. No change to home-models.ts, engine-v2.ts, studyModels.ts or any other component. `git diff 422f861 HEAD --stat -- src/lib/lifehacks/home-models.ts src/lib/lifehacks/engine-v2.ts src/lib/lifehacks/studyModels.ts` is empty.

## laundry-sort-before-walk (W-1251; your W3 condition 5)

- What moved: engine 1 → 2 in commit 926cb9c only, as row E5 and quality ruling R2 describe. Prediction line = r11 fix plan W3 row (company/decisions/2026-10-15-lifehacks-r11-fix-plan.md line 120), options 16 m / 80 m / 160 m, key 160 m (index 2). Title and hook are from patch r2 §2's last row.
- R2 (a) same commit as the engine-2 change, with the plan row cited in the test comment: yes. (b) No other pinned value in home.test.mjs changes: `git diff 422f861 HEAD -- tests/lifehacks/home.test.mjs` shows only the laundry-sort line, replaced by value(10,false) = 160, value(10,true) = 16, value(8,false) = 128, value(8,true) = 16. These are the plan's 2 × 8 m × count and R2's own figures. (c) The fact-checker re-derives 160 from the plan text when checking c3/c4/seen: open, lane 10.
- Lists: added to the W3 every-step sweep (home-v2.test.mjs `W3`) and the r11 W3 inventory (engines-v2.test.mjs). The locked-picture tests take every engine-2 spec by filter, so it is covered with no list edit. It passes both.
- Picture: the v1 route picture, now under the v2 stage. Neutral draws ten dashed there-and-back pairs and `8m one-way`, both stated in the question. On a phone the ten pairs form a dense hatch: readable as "many trips", not countable. This is not a giveaway (no result is drawn), but the walk may flag it. If so, it is an engine picture row.
- Reveal at the start: `One-item trips: trips 10; travel 160 m. Grouped trip: trips 1; travel 16 m.` (seen claim, unverified). QA contract passed on phone and desktop.
- Rollback: `git revert 926cb9c`. It restores the v1 lesson, the old pin (64/8) and the lists, and does not interact with the other commits.

## The check

1. **What can fail.** (a) A changed line reads wrong to a learner. That is content, and it is caught by the fact-checker and the re-walk after merge. (b) The E3 gate leaks into v1 route lessons. It is gated on `v2!==undefined && model==='distance-use'`, and the snapshot shows the v1 lessons identical. (c) A merge conflict in the test lists (home-v2.test.mjs W2/W3, engines-v2.test.mjs) if another branch touched them; the chief of staff's merge note expects it. Worst case: a mis-keyed predict ships to learners, which needs a publish and a founder-approved deploy first. Who sees it: only agents, until then.
2. **How we would know.** `npm run test:lifehacks` in verify/CI: the answer-range, every-step, locked-picture, claims-match and seen-claim tests. `npm run check` (claims gate). `company claims --open` lists the 39. QA contract on the rebuilt shared server (lane 10, SO-10-1).
3. **How to roll back.** `git revert <sha>` per row (table above). Each takes seconds, no data is lost, and the founder is not needed (nothing is deployed).
4. **Capacity.** One release build (~4 min at load 4-10) and one `next start` for ~6 min; QA with 2 workers for 1.5 min; dist deleted (0 bytes left). No new process left running. No CI or Vercel use beyond a normal push. Agent spend: one builder run.
5. **Security.** No routes, query parameters, scripts, secrets or permissions.
6. **Data.** None. No learner data, no event API change.
7. **Risks.** None added or closed. It narrows the open picture-giveaway concern for desk-supply (D5). If you keep a register line for the "locked picture leaks" class, the every-step sweep above is evidence that the remaining coincidences are inputs and givens.

## Approval (tier 2; written by principal-engineer-ops)

- Decision: approved with conditions. See "2026-10-16 principal-engineer-ops verdict" below.
- Conditions, each with a board id: below.
- What would make me revoke it: below.
- Objections raised, and what happened to each: below.

## 2026-10-16 principal-engineer-ops verdict

approver: principal-engineer-ops (Rhea), slot pe-ops-tier2-approvals · W-1455 · not my area (demo-builder's change; the content authority is cm-lifehacks) · read at 15:20-15:40Z

**Decision: approved with conditions** for merge to main. This is not a publish approval and not a deploy approval. All 39 changed or new claims are unverified, and the lessons stay `review`.

**What I checked myself, not taken from the record:**
- `npm run test:lifehacks` on lhfix-r3 (e51c558): **133 pass, 0 fail**. The worktree is clean.
- The component diff (`git diff 422f861 HEAD -- src/components`) is exactly the five rows the record names: the SceneV2Props comment (E4), the E3 route branch gated on `v2!==undefined&&model==='distance-use'`, E1 `150 → 188`, the E2 label expression, and the D3 chip label pair. There are no other component changes.
- **No published lesson is touched.** Main published 6 Life Hacks lessons after the branch point (00b4b1e: packing-cube-walls, pillowcase-set-kit, rebuild-the-procedure, rolled-or-folded-volume, shelf-front-labels, spaced-beats-cram). None of them is among the 18 lesson folders this branch changes, all 18 are `status: review`, and none of the 6 slugs appears in the branch's src/lib, src/components or tests diff except as one unchanged context line (pillowcase-set-kit in home.test.mjs).
- The one lesson both sides touched since 422f861 is socks-use-shoe-space. On main the only change is a QA link in `evidence.qa`. `git merge-tree HEAD e51c558` against main is **clean**.

**Judgment call E2 (the test literal): accepted.** The stop-if guards against moving a pinned value so that it fits the code. Here dispatch row E2 itself defines the new mode-B text (`400 cm³ still empty` at p = 200). The assertion it replaces checks picture text for non-vacuity, not a model number, and the edit keeps the test's purpose and widens it (A is now asserted too). The new E2 test pins 400 / 0 / 600 and checks that neutral draws no label. A strict reading would revert 10c03f8, and I do not ask for that.

**Judgment call E5 (unnamed fields): accepted for merge, not settled as content.** `values [8]` and `initial 10` come from the plan's 8 m and the question's ten. The `amounts` row and the defaults are what engine 2 needs to run, and the idea, limit and recall are unchanged. These are content choices made by a builder, and the content authority is cm-lifehacks. So they are a condition before publish, not before merge.

**Conditions** (I cannot write board.json in this slot, so each has an owner and the board ids already cited, and the chief of staff places new items):
1. **Before any of the 21 lessons publishes:** cm-lifehacks confirms E5's fields for laundry-sort-before-walk (values, initial, the `Trips` amounts row, resultLabel, the reveal sentence) and writes the meta `misconception` that now matches none of the options. Owner cm-lifehacks. Board W-1251.
2. **Before publish:** the fact-checker re-derives 160 m from the plan text (R2 (c)) and checks the 39 unverified claims. A learner re-walk covers the two lessons moved to engine 2, and on the phone it judges whether laundry-sort's ten-pair hatch reads as a giveaway. Owner evaluation-steward (lane 10). Board W-1300, W-1251.
3. **After merge, on main:** run `npm run test:lifehacks` and `npm run check` again (main has moved since 422f861), and record the counts in the merge note. Owner: chief of staff (integrator).
4. Merge this as the branch (it merges clean) or commit by commit. If 10c03f8 is ever reverted, 926cb9c and the rest still stand (the record's rollback table).

**What would make me revoke it:** any v1 Home render that differs from 422f861 after merge; any change reaching a `published` lesson; a locked or pre-press picture that draws a result (home-locked.test.mjs red); any of the 39 claims marked verified by the builder.

## Objections
| # | Objection | Raised by | What happened to it |
|---|---|---|---|
| 1 | E2 moves a pinned test literal outside laundry-sort, against the batch stop-if as written. | demo-builder (self-flagged) | Answered: accepted. The row defines the new literal, the assertion is non-vacuity picture text and not a model pin, and the test's purpose is kept. |
| 2 | E5 sets fields the batch did not name, and the meta misconception no longer matches any option. | demo-builder (self-flagged) | Answered: accepted for merge. Condition 1 sends the fields and the misconception to cm-lifehacks before publish. |
| 3 | The record's v1 "unchanged" chain to acb4025 is by transitivity, not a direct render. | principal-engineer-ops | Accepted as sufficient. lh-engine-locked's record measured 0 of 41 against acb4025, and this branch measures 39 of 39 against 422f861. A direct render adds little. |
