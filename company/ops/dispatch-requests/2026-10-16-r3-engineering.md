# Dispatch request: engineering · round 3 · 2026-10-16
poc: principal-engineer (Kenji)
lane: 7 Engineering: kit, platform, backend, community PRs
slots asked: 5 agents, of which 2 builders (B1, B2). B3, B4 and B5 write records only and run no build or dev server (`--kind=other`). B5 is conditional (see its `order:`), so the live ask today is 4 agents, 2 builders.
since last round:
- **r2 B1, PR1 written position (W-1158): accept.** company/rituals/records/2026-10-16-project-review-positions-principal-engineer.md, revised in 617dfdb. The three reopened items are now the founder's (F-34). Nothing more is asked of lane 7 on PR1 until the forum answers.
- **r2 B3, A2 pilot design (W-088, acb6654) and my review of it: accept, with changes.** My review is company/engineering/reviews/2026-10-16-edd-003-a2-pilot-review.md. The verdict is approve with changes P-1 to P-7, and ADR-010 passes my review. ADR-010 stays `proposed` until the founder decides esbuild (F-35, W-485) and PE-ops approves R2. G1 clears once P-1, P-2 and P-5 are written into the addendum. That is **B3** below (W-1245), and my re-read of those lines is **B4**. No pilot build (R3 onward) runs until G2 to G5 hold.
- **r2 B5, hook review (W-1195, W-1200): accept.** company/engineering/reviews/2026-10-16-agent-hooks-wiring-review.md. The founder wired both hooks under F-31 (ef18e99), and the wiring-day checks are in company/engineering/reviews/2026-10-16-f31-wiring-day.md. Lane 7 has nothing open on them.
- **r2 B2, accounts merge pass (W-1164, W-966): not run, because its preconditions were not on disk. Carried as B5**, and conditional in the same way.
- **r2 B4, W-148 K2 tap targets: not dispatched in r2 (cap). Carried as B2**, with W-1263 folded in. W-1263 is the same defect: "Why trust this?" is 231x23 px.
- **W3 learner r14 (learner-evaluator, d40c662/0bc1d26 on lhw3), finding "engine 2 draws option A before commit" (W-1258): decided. Change it.** I read the code on main. The giveaway is real, and it comes from the engine, not from each lesson. The design spec already forbids it: company/design/specs/lifehacks-engines-v2.md R2 and its "Predict (locked)" row say "shared setup in A's arrangement; no result overlay; **nothing that implies the outcome**". Two places break that rule. `Scene` in src/components/lifehacks/HomeLesson.tsx line 121 draws `${c.ends.length} loose ends` (group-cables-with-ends) while locked. `w3Picture` line 307 draws `${fmt(hollow)} cm³ empty` (socks-use-shoe-space) at `mode` null. The Seen table and the result cells are already `?` while locked, so the leak is only the in-picture text. **The ruling (engine rule, tier 2):** while the stage is locked, the picture keeps A's arrangement, but every text in the picture that states a model quantity for either mode (a count, an amount or a result) is drawn as `?` or left out. The givens that the question itself states may stay. That rule, plus a test that enforces it, is B1. **Not part of the engine fix: the arrangement itself.** For example, jacket-last-first draws the jacket buried, with arrows, while locked. Those are lesson-content findings for cm-lifehacks (lane 1), together with the titles and questions r14 flags. No new EDD is needed: the spec already holds this rule, and the code drifted from it. The tier-2 gate is PE-ops' readiness addendum (lane 8), the same way as for W3.
- **W-1241, long-cord-knots-itself soft lock: accept the diagnosis, and fix it in B1.** CordStage (HomeLesson.tsx line 453) has a bug. "Tumble 3 m" sets `runs=2` but calls only `reach('long')`. "Tumble 0.3 m" then renders as pressed, and the `short` milestone is never reached, so the reveal never unlocks. This is the same file as W-1258, so one builder makes both changes and one readiness addendum covers them.
- **W-1247, the Home answer-range test (PE-ops W3 condition 1, which blocks W4): fix it in B1.** It is a test-only change, but it guards the same engine, and it costs nothing extra to land it in the same branch.

held or declined:
- W-441, W-442 (EDD-005 C1 and C2): still held. No lesson has opted in to fold-at-reveal yet.
- W-148 K3, K4, K5, K7, K8: still held. K3 and K5 need a Lesson.tsx amendment (AMD-001 (a) bundling, an ask to lane 10 since r2).
- W-085 (real-device SPIKE-001): held. There is no device on this host, and it is a precondition in the A2 addendum, not a dispatch.
- A2 pilot builds R3 to R7: held until G2 to G5. R2's approval is PE-ops' (lane 8), and the esbuild pin waits for the founder (F-35). B3 writes R2's readiness record, but it does not change package.json.
- AMD-001 (a), (b), (d): still proposed. No lane-7 build starts on any of them.
- **W-1241 and W-1247 are on the board with owners cm-lifehacks and demo-builder.** They run in lane 7 this round (B1), because the fix is shared engine code that I tier. Ask to the chief of staff: re-own both to platform-engineer when B1 is dispatched, so that lane 1 does not dispatch them a second time.

standing orders: none issued. Nothing in this lane is mechanical in the §2.3 sense. B1 and B2 are tier-2 or layout-judgement builds, B3 and B4 are design records, and B5 is a tier-2 merge decision.
for the founder: none new. F-35 (esbuild) and F-34 (PR1 reopened items) are already in the inbox. Nothing in this batch deploys, and the esbuild pin is not landed here.
objections:
- **Mine, routing (from r2): row 7 of the POC map does not list "principal-engineer's own runs".** In r2 the chief of staff dispatched B1 and B5 anyway, so they were not refused in practice. The ask to lane 18 (Leonie) to write this into row 7 still stands. B4 and B5 depend on it.
- **Mine, ordering between B1 and B2.** K2 raises `.control` to 44 px, and Life Hacks stages use those controls. If both merge blind, the reveal-fit baseline of one is wrong for the other. Answer: B1 merges first. B2 rebases onto it and re-runs reveal-fit before it asks lane 10 to check. This is in B2's `done when`.

Asks to other lanes (not items):
- **Lane 8 (principal-engineer-ops):** the readiness approval of B1's addendum (company/engineering/readiness/2026-10-16-lh-home-locked-stage-addendum.md, on B1's branch), reviewing the tip whole. After that, the R2 readiness record from B3 (esbuild pin), and only after the founder's F-35.
- **Lane 10 (evaluation-steward):** (1) After B1, qa-tester runs the QA contract on long-cord-knots-itself, elastic-loop-release, fitted-sheet-corners-nest (the 3 W3 lessons that failed QA, W-1241), group-cables-with-ends and socks-use-shoe-space, on a quiet host. Use B1's production build dist where it can be served without a rebuild, otherwise the review server once B1 is merged and the server is rebuilt. (2) After B2, accessibility-reviewer re-runs `tools/a11y-scan.mjs`, and qa-tester runs the contract on phone and desktop, on B2's built artifact. (3) Carried from r2: the ci.yml amendment for `test:accounts`, and bundling K3/K5 with AMD-001 (a).
- **Lane 1 (cm-lifehacks):** answer the 6 r14 revise findings, including any locked-stage arrangement that gives away the answer by its drawing rather than its text (jacket-last-first). Do not dispatch W-1241 or W-1247: they are in B1. W4 is unblocked from lane 7's side once B1 merges with PE-ops' approval.
- **Lane 4 (head-of-strategic-initiatives):** the `accounts` rebase, re-measure, audit and verify (the r2 condition 3) are still B5's precondition. If the chief of staff does them as §4 integration, that counts.
- **Lane 18 (chief-of-staff-ceo-office):** the row-7 objection above.

## B1 · Home engine: locked stage states no model quantity (W-1258), cord soft lock (W-1241), answer-range test and W3 ratchet (W-1247) · board W-1258 (with W-1241, W-1247)
role: platform-engineer
order: first
kind: build
worktree: yes
model: agent default
project: [project:lifehacks-engine-v2]
budget: 2 runs (build + one fix), ~400k tokens
inputs: src/components/lifehacks/HomeLesson.tsx (`Scene` line 121, `w2Picture`/`w3Picture` from line 141, `StageV2` line 346, `CordStage` line 440); src/lib/lifehacks/; tests/lifehacks/engines-v2.test.mjs (line 82 is the Study answer-range check) and home-v2.test.mjs (the W2 every-step ratchet); company/design/specs/lifehacks-engines-v2.md R2 and the "Predict (locked)" row; company/engineering/readiness/2026-10-16-lh-home-w3-addendum-approval.md (conditions 1 and 4); this batch's "since last round" ruling on W-1258
outputs: (1) the engine change. While the stage is locked (`mode` null on v2, `locked` on the special stages), no text in the picture states a count, amount or result for either mode. A's arrangement stays. A given that the question states may stay, and each one allowed is listed in the readiness addendum. (2) The CordStage fix: "Tumble 3 m" also reaches `short`, or tapping it first is otherwise unable to leave the reveal locked. (3) Tests, all in tests/lifehacks: (a) the W-1247 answer-range check `answer >= 0 && answer < options.length` for every engine-2 Home spec, plus W3's slugs in the every-step ratchet; (b) a locked-stage test. For every engine-2 Home spec, the locked picture's text contains none of that spec's A or B amount and result cells at `initial`, except the listed givens. If the TSX cannot be rendered in node tests, move the label text into a pure function in src/lib/lifehacks and test that function; (c) a test that the cord reveal unlocks after either press order. (4) The removal of the now-unreachable v1 cord reveal branch (r2 ruling (b)), or a comment saying why it stays. (5) A readiness addendum at company/engineering/readiness/2026-10-16-lh-home-locked-stage-addendum.md for lane 8, with rollback = one revert. (6) A branch named lh-engine-locked.
done when: `npm run test:lifehacks` passes, and three mutations each fail it. The mutations, each listed in the addendum with its failing test name: setting tote-balance-sides `answer` to 2; restoring `${c.ends.length} loose ends` while locked; restoring the reach('long')-only cord press. `npm run check` and `npx tsc --noEmit` pass. A production build in the worktree (its own `next build`, so it counts as a builder) passes `playwright test tests/qa/contract.spec.ts` with QA_ONLY = the 11 W3 lessons plus 3 W2 v2 lessons. The dist is left in the worktree for lane 10, and tsconfig.json is reverted if the build rewrote it. It is not merged until PE-ops approves the addendum.
checked by: principal-engineer-ops (lane 8) approves the readiness addendum. qa-tester (lane 10) re-runs the 5 lessons named in the asks, artifact first.
stop if: the fix needs `src/kit/**` or any protected path; a v1 Home lesson (not engine 2) changes what it renders (list it, and stop); more than 3 givens need allow-listing (then the picture design is the problem: write it for lane 6 and lane 1, and stop); the host cannot finish a production build (load, disk, W-524). Report the numbers. Do not edit any lesson's text or claims: that is lane 1.

## B2 · W-148 K2 + W-1263: tap targets to 44 px on controls and 24 px minimum on topbar and footer links, including "Why trust this?" · board W-148 (with W-1263)
role: platform-engineer
order: parallel with B1. It merges after B1 (see objections).
kind: build
worktree: yes
model: agent default
project: [project:maintenance]
budget: 2 runs (build + one fix), ~350k tokens
inputs: company/reviews/_accessibility/2026-10-13-published-audit.md (the K2 rows); board W-1263 (231x23 px at phone width); src/app/globals.css; src/components/DemoCard.tsx (the trust button, line 80) and the topbar and footer components in src/components/; tools/a11y-scan.mjs; tools/reveal-fit.mjs
outputs: the CSS and markup change in globals.css and the app chrome (tier 1 by paths.json: neither file is under `src/kit/**`, `src/app/d/**` or `src/app/layout.tsx`); a tier-1 readiness record in company/engineering/readiness/2026-10-16-k2-tap-targets.md with before-and-after numbers; the reveal-fit sweep at 390x844 (feed and /d) compared with today's baseline, including the Life Hacks lessons; a branch named k2-tap
done when: `node tools/a11y-scan.mjs` on the published set reports no tap target under 24 px (the trust button included) and no `.control` under 44 px high; the reveal-fit sweep lists every lesson whose crop goes from 0 to more than 0 px; `npm run check`, `npx tsc --noEmit` and a production build pass in the worktree, and the dist is left there for lane 10. After B1 merges: rebase, re-run reveal-fit, and report the delta. Not merged until lane 10's checks are on disk.
checked by: accessibility-reviewer (lane 10) re-runs the scan on the built artifact. qa-tester (lane 10) runs the QA contract on phone and desktop.
stop if: the fix needs `src/kit/**`, `src/app/d/**`, `src/app/layout.tsx` or `src/kit/Lesson.tsx` (tier 2 or protected: write which rule, and stop); more than 5 lessons gain a reveal crop above 0 px; the host cannot finish the build. Report the numbers rather than tune lessons.

## B3 · EDD-003 A2 addendum: write P-1, P-2, P-5 (clears G1); then the R2 readiness record for the esbuild pin · board W-1245
role: platform-engineer
order: parallel with B1
kind: other
worktree: no (records only. No build, no package.json edit)
model: agent default
project: [project:scale-stage-1]
budget: 1 run, ~150k tokens (inside the 1.2M checkpoint line)
inputs: company/engineering/reviews/2026-10-16-edd-003-a2-pilot-review.md (conditions P-1 to P-7, the rollback line under "Checklist", finding 1); company/engineering/edd/EDD-003-lesson-storage-at-scale.md (the A2 pilot addendum); company/engineering/edd/EDD-003-a2-pilot-slugs.txt; company/engineering/adr/ADR-010-lesson-bundler-esbuild.md; company/decisions/2026-10-16-dep-esbuild.md
outputs: (1) P-1, P-2 and P-5 written into the addendum as dated lines: separate lesson, CSS and kit hashes; the changed-lesson selector rule; the three checkpoint figures (a), (b), (c), with (b) computed by the tool; line 1's pass criterion; "pilot-migrated (built, hosted and passing the frame QA copy on the pilot path; not served)" everywhere, including the slug file. (2) The R2 readiness record at company/engineering/readiness/2026-10-16-a2-esbuild-pin.md for PE-ops, with rollback = drop the pin (one root line and one `dev` flag), delete `tools/lesson-build/`, and revert `/spike`. P-3, P-4 and P-7 are carried as R8 checks.
done when: `grep -n migrated` on the addendum and the slug file shows every hit as "pilot-migrated", with at least one hit in each file; the addendum has a P-1, a P-2 and a P-5 line, each citing the review; the R2 record exists with a rollback section; `npm run check` passes.
checked by: none from lane 10. These are design records. principal-engineer re-reads G1 (B4), and principal-engineer-ops approves R2 (lane 8).
stop if: P-1's separate hashes cannot be specified without changing the frame-document design in §7.3 (write which part, and stop); anything would put stage-1 work on a First Light go/no-go path (the stop rule).

## B4 · Re-read of G1 (P-1, P-2, P-5 lines only) in the A2 addendum · board W-1245
role: principal-engineer
order: after B3
kind: other
worktree: no
model: agent default
project: [project:scale-stage-1]
budget: 1 run, ~50k tokens
inputs: the P-1, P-2 and P-5 lines B3 wrote in EDD-003's A2 addendum; company/engineering/reviews/2026-10-16-edd-003-a2-pilot-review.md
outputs: a dated "G1 re-read" section in company/engineering/reviews/2026-10-16-edd-003-a2-pilot-review.md: met / not met per condition, with the line quoted
done when: the section exists and says whether G1 is met
checked by: none needed. This is the tier-2 reviewer closing his own condition. Nothing a learner sees changes, and the independent gate after it is PE-ops' R2.
stop if: B3 changed anything outside the P-1, P-2 and P-5 lines and the R2 record. Then review the whole addendum again rather than sign the lines alone, and say so.

## B5 · Accounts merge pass (tier-2 engineering review, accounts off) · board W-1164 (with W-966)
role: principal-engineer
order: conditional. Dispatch it only when all three of these are on disk: (1) the `accounts` rebase onto the integration branch, with `npm run verify`, the C9 firstload re-measure and `npm audit --omit=dev` (by lane 4 or chief-of-staff §4 integration); (2) the privacy reviewer's A-6 re-read (the logger fix) in company/reviews/_privacy/; (3) PE-ops' approval for merge in company/engineering/readiness/2026-10-16-accounts.md. If any one is missing, it waits, and it does not start partly.
kind: other
worktree: no (it reads /home/user/s3c-acct and writes nothing there)
model: agent default
project: [project:first-light]
budget: 1 run, ~150k tokens
inputs: branch `accounts` at its rebased tip; company/engineering/reviews/2026-10-15-accounts-f01-review.md (C1 to C11); company/engineering/readiness/2026-10-16-accounts.md (its approval section); company/reviews/_privacy/2026-10-16-accounts-m1-m6-reread.md and the A-6 re-read; the firstload, audit and verify outputs
outputs: a dated "Merge" section in company/engineering/reviews/2026-10-15-accounts-f01-review.md: each of C1 to C11 marked met, open or carried (with its board id); the C9 number; the audit result; the three skipped tests named, each with why it skips; and the decision (merge / do not merge), with each objection answered
done when: the Merge section exists and gives a decision. If the decision is merge, the chief of staff merges it as §4 integration, with no further question to lane 7.
checked by: none from lane 10 at this step. This run is the tier-2 review itself. The independent checks on the same diff, the privacy re-read (lane 10) and PE-ops' approval (lane 8), are its preconditions.
stop if: any precondition is missing (write which one, and stop); C9 > 1 KB; an added high or critical advisory; verify red; a diff after the re-read tip that the privacy re-read did not cover.
