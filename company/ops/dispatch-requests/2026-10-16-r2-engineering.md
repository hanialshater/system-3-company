# Dispatch request: engineering · round 2 · 2026-10-16
poc: principal-engineer (Kenji)
lane: 7 Engineering: kit, platform, backend, community PRs
slots asked: 5 agents, of which 1 builder (B4). B1, B2, B3 and B5 write records only and run no dev server or build (`--kind=other`).
since last round:
- **backend-engineer, accounts M1 to M6 (W-1164; branch `accounts`, /home/user/s3c-acct, tip 6ff15ba; test:accounts 35 pass, 0 fail, 3 skipped): accept on engineering grounds. MERGE DECISION: not yet. It merges with accounts off once the conditions below are on disk, and not before.** The conditions are my 10-15 review's merge list (company/engineering/reviews/2026-10-15-accounts-f01-review.md, "Merge still needs …") and the readiness first pass (company/engineering/readiness/2026-10-16-accounts.md, "What would let me approve for merge"). Nothing is added and nothing is waived:
  1. **The privacy re-read of the M1 to M6 diff, including the M2 deviation** (a session refresh also moves `last_sign_in_at` forward, which changes what that column and the export's `lastSignInAt` mean). That is the privacy reviewer's ruling. It is an ask to lane 10 and not an item here. My engineering read of M2: it adds no column, the clock it gives is the one F-a asked for, and the idle purge is unreachable from any route (a test enforces this). I would accept it. If she prefers a rename or a separate carrier, that becomes a schema diff, and backend-engineer makes it before the merge.
  2. **Readiness approval for merge** (W-966, principal-engineer-ops). Her merge-blocking rows are A-1, A-2 (R2 and C11, ruled in 49aea2e), A-3's text, A-7's production-404 smoke line, A-12 and A-13. That is an ask to lane 8.
  3. **Rebase onto the integration branch, then on the rebased tree:** the C9 re-measure of first-load JS (`firstload`, before and after, 1 KB ceiling), `npm audit --omit=dev` = 0 with no added high or critical advisory (C11 as reworded), and `npm run verify`. On this branch `verify` already runs `test:accounts` (a735ac5). The three skipped tests must be named in the merge record, each with why it skips (needs a database, I expect). This is First Light engineering work, so it goes in lane 4's batch (backend-engineer) and cites this line. The chief of staff's integration verify counts toward it, as §4 integration.
  4. **My merge pass (B2 below)**, written into the 10-15 review as a dated "Merge" section.
  **Not merge conditions (go-live, already carried):** `fra1` not in place (G3, W-1149: a deploy-config change, so the founder approves it); a real policy version in place of the placeholder before the first real learner; the verify limit at 30 per 60 s (F-f); C8 and the Production project (A-4); a synthetic sign-in check (A-7, second half). **CI does not run `test:accounts`** because ci.yml is protected. That does not block the merge: accounts ships off, and `verify` runs the suite on every integration. It is a go-live condition, and it needs an amendment to ci.yml. That is an ask to lane 10 (evaluation-steward owns amendments). If no amendment is ratified by go-live, the release-manager's pre-deploy verify is the only place the suite runs, and that goes in the go-live record as a known gap.
- **Life Hacks W3 (lhw3, tip 5d9de52; Home v2 accepts 2 options): engineering ruling, no separate eng-review record.** paths.json places it at tier 2 (shared engine). What changed in shared code is a type widening (`options?: [string, string] | [string, string, string]`) and a validator that now accepts a length of 2 or 3. `Lesson.tsx` already takes any number of options, and nothing indexes `options[2]`. A mutation back to "exactly 3" fails the existing section-8 test. The QA contract ran 5 two-option lessons on both viewports. A separate review of a widened tuple would be ceremony, which my role counts as a defect. I record the engineering review as passed here. The gate that remains is principal-engineer-ops' readiness approval of company/engineering/readiness/2026-10-16-lh-home-w3-addendum.md at tip 5d9de52, reviewing the branch whole (cm-lifehacks has already asked lane 8). Conditions: (a) before any W3 lesson **publishes**, not before merge: interaction-designer confirms or objects to two options against company/design/specs/lifehacks-engines-v2.md §8 (ask to lane 6); (b) not a condition: the now-unreachable v1 cord reveal branch in HomeLesson.tsx goes in the next tier-1 Home cleanup, or gets a comment saying why it stays. If W4 needs any further change to the shared engine, it gets its own addendum, and this ruling does not cover it.
- **First Light full-scope re-estimate** (company/engineering/notes/2026-10-16-first-light-reestimate-full-scope.md): stands. I have not revised it this round. Lane 4's engineering items cite it. I am not asked twice.
- **AMD-001 (a), (b), (c1), (d): still proposed.** No lane-7 build starts on any of them until they are ratified (Lesson.tsx and tools/company.mjs are protected). (c2) and R1 are applied (0d76ae1), and with them A1 (the index/loaders split, W-946). So the scale-stage-1 tranche (2.45M, ledger 0k measured) now funds the A2 pilot of 50 lessons, with a checkpoint at 1.2M. B3 is the pilot's first step.
held or declined:
- W-441, W-442 (EDD-005 C1 and C2): held. They are needed only before the first lesson opts in to fold-at-reveal, and none has. They run in the round in which a CM asks for the first opt-in.
- W-148 K3, K4, K5, K7, K8 (focus, reading order, live region, reduced motion, SVG text): held. K3 and K5 change `src/kit/Lesson.tsx`, which is protected, and that is the same file as AMD-001 (a). The ask to lane 10 is to consider bundling them into one amendment, so that Lesson.tsx is amended once. K1 and K6 are already done (f346c15). K2 is B4.
- W-085 (SPIKE-001 on real iOS and Android): held. This host has no real device. It goes in the A2 pilot's EDD as a precondition on the pilot's warm-frame measure, not as a dispatch.
- W-226 (community PR #3): held, waiting on the PR author's changes 1 to 4 (company/engineering/community/prs/3.md). It is not ours to make.
- W-524, W-531 (host capacity COE and decision record): held. Rhea's operations area leads on these. I review when she asks.
- W-1149 (`fra1`), the accounts rebase and re-measure, EDD-009 review asks, W-1131 (the swap EDD): First Light work, in lane 4's batch. They are not repeated here.
- Board hygiene, an ask to the chief of staff (the board is not mine to edit): W-522 reads `next`, but the COE it asks for was finalised in ac53c46. Check it and move it. W-148's title still says K1 to K8, but K1 and K6 merged in f346c15.
standing orders: none issued. Nothing in this lane is mechanical in the §2.3 sense. Every item is a design, a tier ruling, a review, or a build whose done check needs a judgement (layout regressions after K2). Tier-2 work is excluded from standing orders by rule.
for the founder: none. B2 and B4 deploy nothing. The accounts merge ships with accounts off and changes no deploy path. `fra1` (W-1149) is a founder approval, and it comes through lane 4.
objections: one, from me, on routing. The POC map's row 7 lists platform-engineer, backend-engineer and community-engineer, but not the POC's own runs. Row 8 lists "principal-engineer-ops' own runs" explicitly. B1, B2 and B5 are principal-engineer runs: a forum position, a tier-2 merge pass and a tier-2 review of two hooks. My role holds those, and no other role may do them. If the chief of staff refuses them on the role check, they wait one round, and the ask to lane 18 (Leonie) is to add "principal-engineer's own runs (reviews, rulings, forum positions)" to row 7. Status: open until Leonie answers.

Asks to other lanes (not items):
- **Lane 10 (evaluation-steward):** (1) the privacy-reviewer re-reads the M1 to M6 diff on `accounts` (baeb0bd..6ff15ba) and rules on the M2 deviation. Inputs: the diff and EDD-008 §6.1 and §9 on the branch, nothing else. (2) An amendment so that ci.yml runs `test:accounts` (a go-live condition, not a merge condition). (3) Consider bundling W-148 K3 and K5 with AMD-001 (a), so that Lesson.tsx is amended once. (4) The checks named in B4.
- **Lane 8 (principal-engineer-ops):** the readiness approval for merge on `accounts` (W-966) once A-1 holds. Separately, the lhw3 W3 addendum (cm-lifehacks asked for it already, and this batch's ruling is the engineering half).
- **Lane 6 (design-lead → interaction-designer):** confirm or object to two-option Home v2 predicts against the engines-v2 spec §8, before any W3 lesson publishes.
- **Lane 4 (head-of-strategic-initiatives):** the accounts rebase, the C9 re-measure, the audit and `verify` (condition 3 above), assigned to backend-engineer and citing this batch. B2 waits for them.
- **Lane 9 (tools-lead), on your batch's "checked by: principal-engineer":** tier ruling from paths.json. Your B4 (serve.sh) and B5 (ops-signals library) are tier 1 and **need no engineering review**. Your self-check readiness records are the gate. Your B3's `tools/commit-own.sh` and `tools/git-hooks/pre-commit` are tier 1 too. The two `.claude/hooks/**` scripts (B1's agent-events.mjs and B3's no-pkill.mjs) are tier 2 by the map, and I review them once (B5 below) before the founder wires them in settings.json. While they stay unwired they are inert, so your runs do not wait for me.
- **Lane 18 (chief-of-staff-ceo-office):** the row-7 routing objection above.

## B1 · Project Review 1 written position (go / go with changes / object, per item) · board W-1158
role: principal-engineer
order: first
kind: other
worktree: no
model: agent default
project: [project:maintenance]
budget: 1 run, ~120k tokens
inputs: company/rituals/records/2026-10-16-project-review.md; company/ceo-office/2026-10-14-project-review-1-agenda.md (items 1, 5 and B); company/ceo-office/2026-10-14-project-review-1-premortems.md; company/engineering/notes/2026-10-16-first-light-reestimate-full-scope.md; `node tools/ledger.mjs report`
outputs: a dated "Written positions" row for principal-engineer in company/rituals/records/2026-10-16-project-review.md (or a file next to it, if the record's owner prefers that). One line per item: go / go with changes / object, with the evidence. Any PE evidence objection on cost or feasibility is marked as one, so that it reopens its item.
done when: the position is on disk before 2026-10-17 23:59 UTC, every approved item in the record has a line, and scale-stage-1's line states whether the A2 pilot's return lines (build ≤ 5 min, QA ≤ 30 s per changed lesson, `/` ≤ 10 stylesheets, warm frame ≤ 300 ms) are measurable on this host.
checked by: none needed. It is a forum member's position, and the forum (founder chair, portfolio-manager secretary) answers each objection in the record's table. No learner-facing artifact or gate input.
stop if: an item's figures cannot be reproduced from the ledger or the agenda. Then the line says "object (evidence)" with what is missing, and the run does not guess.

## B2 · Accounts merge pass (tier-2 engineering review, accounts off) · board W-1164 (with W-966)
role: principal-engineer
order: after lane 10's privacy re-read, lane 8's readiness approval for merge, and lane 4's rebase, re-measure, audit and verify on `accounts` are all on disk. If only some are, it does not start.
kind: other
worktree: no (it reads /home/user/s3c-acct and does not write there)
model: agent default
project: [project:first-light]
budget: 1 run, ~150k tokens
inputs: branch `accounts` at its rebased tip (diff against the integration branch); company/engineering/reviews/2026-10-15-accounts-f01-review.md (C1 to C11 and the rulings); company/engineering/readiness/2026-10-16-accounts.md (its approval section); the privacy re-read record in company/reviews/_privacy/; the firstload, audit and verify outputs in the merge record
outputs: a dated "Merge" section in company/engineering/reviews/2026-10-15-accounts-f01-review.md: each of C1 to C11 met, open or carried (with the board id), the C9 number, the audit result, the three skipped tests named, and the decision (merge / do not merge), with each objection answered
done when: the Merge section exists and gives a decision. If the decision is merge, the chief of staff can merge it as §4 integration, with no further question to lane 7.
checked by: none from lane 10 at this step. This is itself the tier-2 review, and the independent checks on the same diff are the privacy re-read (lane 10) and the readiness approval (lane 8), both preconditions.
stop if: any precondition is missing (write which one, and stop); C9 > 1 KB; an added high or critical advisory; verify red; a diff since 6ff15ba that the privacy re-read did not cover.

## B3 · A2 pilot design: bundler decision (ADR), per-lesson CSS, and the 50-lesson pilot plan · board W-088 (with W-669, W-085)
role: platform-engineer
order: parallel with B1
kind: other
worktree: no (records only, no build; it may read SPIKE-001's branch and results)
model: agent default
project: [project:scale-stage-1]
budget: 1 run, ~300k tokens (inside the agenda's 1.89M pilot line)
inputs: company/engineering/edd/EDD-003-lesson-storage-at-scale.md; SPIKE-001 results and the W-088 note (the spike used Next's internal webpack and terser copies); company/rituals/records/2026-10-13-eng-review-lesson-storage.md; W-669's measurements (672 stylesheets, 650 KB, about 182 KB of `/`'s HTML); the scale-stage-1 return lines and stop rule in company/ceo-office/2026-10-14-project-review-1-agenda.md item 5; package.json (read only)
outputs: (1) an ADR draft in company/engineering/adr/ (the next free number, status proposed) for the lesson bundler: options with licence, size and maintenance, the choice, and the decision record that CLAUDE.md requires before any new npm dependency; (2) an "A2 pilot" addendum to EDD-003 (stage 1): the 50 slugs and why those, how lesson CSS travels with its bundle (so that `/` carries at most 10 stylesheets), how each return line is measured on this host, the QA contract change the frame needs (drafted as an ask to evaluation-steward, not an edit to tests/qa), W-085's real-device measure as a precondition on the warm-frame line, and a run plan to the 1.2M checkpoint
done when: both files are on disk; the ADR names one bundler, gives its licence and its `npm audit` status; the addendum lists 50 slugs, gives one measure command per return line, and states the stop rule word for word from the agenda; `npm run check` passes.
checked by: none from lane 10 at this step. The design is reviewed in principal-engineer's tier-2 engineering review of the EDD addendum before any pilot build starts, and nothing a learner sees changes. The QA contract change goes to evaluation-steward as an amendment draft.
stop if: the only workable bundler needs a protected-path change outside an amendment, or a licence that is not permissive; the pilot cannot measure a return line on this host (write which line, and stop); or the design would put any stage-1 work on a First Light go/no-go item's path (the stop rule).

## B4 · W-148 K2: tap targets to 44 px (controls, slider hit area, topbar and footer links) · board W-148
role: platform-engineer
order: parallel with B3
kind: build
worktree: yes
model: agent default
project: [project:maintenance]
budget: 2 runs (build + one fix), ~350k tokens
inputs: company/reviews/_accessibility/2026-10-13-published-audit.md (K2 row, and the batch-2 K2 row); src/app/globals.css; the topbar and footer components in src/components/; tools/a11y-scan.mjs; tools/reveal-fit.mjs
outputs: the CSS change (`min-height: 44px` on `.control`, the range input's hit area, and the topbar and footer links including "Why trust this?" and "Map"), in globals.css and the app chrome; a tier-1 readiness record in company/engineering/readiness/ with the before and after numbers; the reveal-fit sweep at 390x844 (feed and /d), compared with today's baseline
done when: `node tools/a11y-scan.mjs` on the published set reports no tap target under 24 px and no `.control` under 44 px high; the reveal-fit sweep shows no lesson whose crop goes from 0 to more than 0 px (any lesson that does is listed); `npm run verify` passes in the worktree; and it is not merged until lane 10's checks are on disk.
checked by: accessibility-reviewer (lane 10) re-runs the scan on the built artifact, and qa-tester (lane 10) runs the QA contract on phone and desktop
stop if: the fix needs any file under `src/kit/**` (tier 2) or `src/kit/Lesson.tsx` (protected). Then write which rule and why, and stop. Also stop if more than 5 lessons gain a reveal crop above 0 px, or if verify cannot finish on the host (load and disk, W-524). Report the numbers rather than tune lessons.

## B5 · Tier-2 review of two agent hooks before they are wired (agent-events.mjs, no-pkill.mjs) · board W-1195 (with W-1200)
role: principal-engineer
order: after lane 9's B1 and B3 have landed their hook scripts and tests (unwired)
kind: other
worktree: no
model: agent default
project: [project:maintenance]
budget: 1 run, ~100k tokens
inputs: `.claude/hooks/agent-events.mjs` and `.claude/hooks/no-pkill.mjs` and their tests (tests/dispatch/agent-events.test.mjs, tests/dispatch/guards.test.mjs); the settings.json snippet in their readiness records; company/engineering/readiness/paths.json
outputs: an engineering review record in company/engineering/reviews/ (dated, one record for both hooks): whether either hook can block or slow every agent's tool call, what it does on a malformed stdin, its failure mode when events.jsonl is locked, and the decision (approve for wiring / changes)
done when: the record exists and gives a decision per hook. The founder's wiring approval (F-31, through the chief of staff) can then cite it.
checked by: none from lane 10 for the hook mechanics. This is the tier-2 review itself. Lane 10 checks anything in B1 that changes how dispatch-check reads events, as lane 9's batch already says.
stop if: either hook is already wired in `.claude/settings*.json` (then that is an unreviewed tier-2 change: report it to the chief of staff and stop); the scripts are not on disk.
