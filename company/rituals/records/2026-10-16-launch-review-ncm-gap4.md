# Launch Review: 2026-10-16 (r7, NCM gap four): same-picture-two-histories, price-tag-or-auction, worth-something-alone, the-swap-that-goes-in-circles

chair: head-of-product (Priya) · slot hop-ncm-gap4-launch · tree read at `ed992963` · executes: release-manager, board W-1594 (a separate run publishes from this record, and only once its preconditions hold) · attests: qa-tester, fact-checker, learner-evaluator (by their records, cited below); cm-economics-markets (W-507 as-built ruling) · preconditions owned by: cm-probability-statistics (W-1574), cm-economics-markets (W-1575), cm-math-discrete (W-1591) · no deploy

Brief: the founder wants every demo done or retired. These four drafts fill the last four section gaps of the Networks, Crowds, and Markets course (4.2, 9.2, 17.6, 23.2; `company/courses/ncm/coverage.md`). Model for this record: r6 and its addendum (`company/rituals/records/2026-10-16-launch-review.md`).

## Ruling 1: this review cannot move the lessons to review, so it stays open on three preconditions

**Can head-of-product chair a combined move-to-review plus launch review? No.**
- My authority (`company/roles/head-of-product.md`, from `tools/org/roles.mjs`) gives me no power over lesson status.
- The only role-level grant of "draft → review" is the demo-builder's, and only "when QA passes locally" (`tools/org/roles.mjs`, demo-builder authority).
- The board routes these decisions to the strand managers by name:
  - W-1574 to cm-probability-statistics;
  - W-1575 to cm-economics-markets;
  - the math.discrete #13 lesson to cm-math-discrete. No board item existed for it, so I added W-1591.
- Their call is not a formality. cm-course-ncm asked for W-1571 to land first. W-1575 asks cm-economics-markets to close or object on W-507. A strand manager may also want the optional polish first, which would change the version.

There is also a mechanical reason the order matters. `tools/publish-ready.mjs` skips every lesson whose status is not `review`, so a draft is never a candidate. (`company publish` itself does not check status, which is why this record must not be read as permission to publish a draft.)

**So this review decides on the artifact and the gates, and holds each go open on its precondition.** A go below takes effect only when both of these are true:
- the named strand manager's decision to move the lesson to review is on disk (a ruling on the board item, or a line in this record's precondition table);
- `meta.json` reads `"status": "review"` at the version named here.

If a strand manager declines, objects, or asks for a change first, that lesson's go **lapses**. It does not become a no-go. It comes back to this chair after the change has had its QA, fact-check and re-walk.

### Preconditions (strand managers fill the last two columns; nothing else in this record changes when they do)

| Lesson | Version this review is on | Precondition owner | Board | Decision (move to review: yes / no / after change) | Where recorded, date |
|---|---|---|---|---|---|
| probability/same-picture-two-histories | v2 | cm-probability-statistics | W-1574 | *open* | |
| economics/price-tag-or-auction | v2 | cm-economics-markets | W-1575 (and W-507 for #27) | *open* | |
| economics/worth-something-alone | v2 | cm-economics-markets | W-1575 | *open* | |
| math/the-swap-that-goes-in-circles | v1 (with fc8c53b8) | cm-math-discrete | W-1591 | *open* | |

## Readings applied

- **The status line is not a publish list; publish-ready is the floor** (r6). I ran `node tools/publish-ready.mjs` read-only at `ed992963`. None of the four is listed, because all four are `draft`. To see what it will say once they are in review, I ran `decide()` (exported by `tools/publish-ready.mjs`) on each slug's learner records with its meta version, then joined the result with `company/ops/publish-holds.json` (no hold names any of the four).
  - same-picture-two-histories, price-tag-or-auction and worth-something-alone: **ready**, latest = the r2 file.
  - the-swap-that-goes-in-circles: **"verdict revise"**, latest = r1. See ruling 2.
- **QA counts only if a qa-tester wrote it on the version that ships** (W-1237 reading, r5).
  - All four have a qa-tester record built from `975a485128f05cc92e6b58b5c98abcb6fa6b05b4`: `2026-10-16-qa-v2.md` for three, `2026-10-16-qa-reveal-fix.md` for the swap.
  - fc8c53b8 (the swap's reveal fix) is an ancestor of 975a4851, and 975a4851 is an ancestor of the learner build e092f6c3.
- **Same code check (the r6 addendum's import-closure method).**
  - I resolved what each lesson loads. It is the lesson's `Demo.tsx` and `styles.module.css`, plus `model.ts` for price-tag-or-auction. From the kit it is `src/kit/Lesson.tsx`, `controls.tsx`, `milestones.tsx`, `progress.ts` and `types.ts`, plus `src/kit/random.ts` (via price-tag's `model.ts`). The page is `src/app/d/`.
  - `git diff 975a4851 ed992963` over that closure is **empty**.
  - Changes since 975a4851 outside the closure:
    - each meta.json: only claim `status`/`checkedBy`/`checkedOn`/`note` and evidence links. No claim text, question or version changed.
    - `src/app/globals.css`: adds a `.knot-tint` rule (W-1582). None of the four uses that class.
    - `src/kit/knots/README.md`: documentation only.
- **Claims.**
  - Every claim is `verified` by fact-checker, or `withdrawn`. One is withdrawn: the swap's c5, whose voter sentence was cut in fc8c53b8, and `launchGates()` accepts withdrawn.
  - The fix-round claims are in each `2026-10-16-fact-check.md` under "2026-10-16 W-1570..W-1573 re-check", verified against Demo.tsx at 975a4851.
- **Artifact before account.**
  - No walkthrough sheet is on this host (`artifacts/` is absent), as in r6. Before reading any learner or QA record, I read each lesson as shipped: predict, explore hint, gating and reveal in `Demo.tsx`.
  - Every reveal reads its numbers from stage state, and each predict answer agrees with its reveal:
    - same-picture-two-histories: "Can't tell" (index 2);
    - price-tag-or-auction: "3" (index 1), with the crossing between 2 and 3 bidders from `model.ts`;
    - worth-something-alone: "About 0%" (index 0);
    - the-swap-that-goes-in-circles: "Cherry, 60¢ poorer" (index 1).
  - This is weaker than reading frames (objection 4).
- **W-507 as built (price-tag-or-auction).** cm-economics-markets ruled "ACCEPT WITH CHANGES" (`company/domains/briefs/economics.markets.md`, Ruling under #27). On my read, v2 carries both changes:
  - the question now asks for "the fewest bidders ... on average" (`Demo.tsx` line 167);
  - the reveal names "no reserve" and "a tag set knowing only the $0–$100 range" (lines 188-189).

  Whether that closes #27 is cm-economics-markets' call under W-1575, not mine. worth-something-alone (#26) was accepted with no changes.

## Ruling 2: which learner record applies to the-swap-that-goes-in-circles

Both learner records stamp `lesson version: v1` on 2026-10-16:
- r1 says **revise** (`2026-10-16-learner-knows-preference.md`);
- r2 says **launch** (`-r2.md`).

They did not walk the same lesson:
- r1 was built from `236737ff`, which does **not** contain fc8c53b8 (`git merge-base --is-ancestor fc8c53b8 236737ff` fails);
- r2 was built from `e092f6c3`, which contains fc8c53b8 and the QA build 975a4851;
- the builder changed reveal text in fc8c53b8 without bumping `meta.version`, and both the qa-tester and r2 (finding 6) recorded that.

**Ruling: r2 is the verdict for the code that ships. r1 is history: its one blocking finding, the unglossed "transitive", is what fc8c53b8 fixed, and r2 finding 1 confirms the fix.**

The tool will not see it this way:
- `decide()` breaks a same-version, same-day tie by file mtime;
- a fresh checkout gives both files the same mtime;
- then the sorted filename order decides: `…-r2.md` sorts before `….md`, so r1 is taken as latest;
- I reproduced this at `ed992963`.

So once the swap is in review, publish-ready will print it under "held (verdict revise)". **For this slug only**, the release-manager uses the conditions in the hand-off below, not publish-ready's candidate line.

**Do not bump the version now.** A bump to v2 without a new walk would make r2 "for an older version" and hold the lesson for no reason. The version-hygiene gap and the tie-break are routed (objection 3).

## Per-lesson decisions

| Lesson | Strand CM | Newest learner verdict vs meta | QA (qa-tester, on 975a4851) | Claims | Decision | One line of reason |
|---|---|---|---|---|---|---|
| probability/same-picture-two-histories | cm-probability-statistics | launch, v2 (r2, built e092f6c3); meta v2 | pass, contract 8/8, R4 at 390 and 360 | 5/5 verified | **go, held open on W-1574** | The required fixes in W-1571 are in v2, and r2 confirms each one (finding 1). The fact-check re-check covers c2-c5. |
| economics/price-tag-or-auction | cm-economics-markets | launch, v2 (r2); meta v2 | pass | 8/8 verified | **go, held open on W-1575 (incl. W-507 #27)** | The W-507 question and reveal changes are in v2, and the r1 label finding is fixed. The overlapping $50.00/$47.25 labels are carried by the caption. |
| economics/worth-something-alone | cm-economics-markets | launch, v2 (r2); meta v2 | pass | 8/8 verified | **go, held open on W-1575** | W-507 #26 was accepted as built, and the curve-naming finding is fixed in v2. |
| math/the-swap-that-goes-in-circles | cm-math-discrete | launch, v1 post-fix (r2, per ruling 2); meta v1 | pass (`qa-reveal-fix`) | 6 verified, c5 withdrawn | **go, held open on W-1591** | The reveal now glosses "ranked (transitive)", and the unshown voter claim is gone. It has the gates of a go once ruling 2 is applied. |

**Go: 4, each held open on its precondition. No-go: 0.**

**What this does to the course:**
- Built coverage reaches **110 of 110**.
- Published coverage does **not**. coverage.md counted 91 of 110 published at cdee168c. cut-the-busiest-link (3.6) has published since, and these four add 4.2, 9.2, 17.6 and 23.2. By my count that is about **96 of 110** published if all four ship.
- The rest of the gap is the review lessons r6 held. cm-course-ncm owns the recount (`company/courses/ncm/coverage.md`).
- "Done" for the founder's ask means published or retired, so these four alone do not finish the course.

## Committed predictions (analytics steward, before launch)

None is committed for these four. I treat it as in r6, objection 2: declined as a hold, and routed. analytics-steward adds a row here before the first deploy that includes any of these slugs. If the row is still missing at that deploy, the release-manager names the gap in the release record.

## Open objections travelling with this launch

| # | Objection | Raised by | Status |
|---|---|---|---|
| 1 | The chair is deciding a launch for lessons that are still draft, which looks like going around the strand managers. | chair | **Answered by ruling 1.** No go takes effect until the strand manager's own decision is on disk and the status is `review`. A strand manager's "no" or "after change" lapses the go. This record moves nothing. |
| 2 | Reveal locks show only "Try it first" on all four. Nothing names the control still untried, and on the swap the gate guards the least new step ("3 swaps"). | qa-tester (all four QA records); learner-evaluator r2 finding 5 on all four | **Declined as a hold, kept as v-next work.** The learner judged it non-blocking on all four: one untouched button in each case, and the explore hint names the task. The hint text is the kit's, and changing it is a kit change for platform-engineer, not a per-lesson fix. I put it on the board as a question (W-1593): should the locked label name what is left? |
| 3 | The swap's version was not bumped after a learner-visible text change, so two v1 verdicts disagree, and publish-ready settles the tie by file mtime, which a checkout does not keep. | qa-tester, learner-evaluator r2 finding 6, chair | **Accepted; answered for this launch by ruling 2; routed for the mechanism.** The tools question (break ties by `built from` ancestry or the `-rN` suffix, never mtime) goes to tools-lead as W-1592. The rule that a reveal-text change bumps the version goes to the demo-builder lane on the same item. Until it lands, the lapse conditions below name the files. |
| 4 | The go rests on reading source, not frames. No walkthrough sheet is on this host. | chair | **Accepted, non-blocking (as r6 objection 3).** For each lesson, two independent records saw the running lesson on code identical to what ships: the qa-tester R4 pass and the r2 learner walk. My source read contradicts neither. If the release-manager's `npm run verify` or a fresh walkthrough shows a frame that disagrees with a reveal, that lesson's go lapses. |
| 5 | At 360x640, the top of the stage scrolls out of view when the reveal opens, on all four. | qa-tester (v1 and v2 records) | **Declined as a hold.** The fit rule in `company/product/demo-standard.md` binds at 390×844. There the builder's `tools/reveal-fit.mjs` runs on the shipping text show crop 0 and phoneFit true (ncmfix3 for the three v2 lessons, w1570-swap for the swap; each lesson's build.md). The qa-tester saw the controls and reveal text readable at 360. Whether 360 should bind is a craft question for demo-standard, so it is mine. I am not changing the standard inside a launch. It stays a question on the board (W-1593). |
| 6 | same-picture-two-histories: QA v2 saw the reveal enable only after both towns ran to the end, while learner r2 saw it open on the Town 2 press. On the quick path the reveal says "some", not "3"/"2". | learner-evaluator r2 (after reading build.md) | **Declined as a hold.** The source explains both observations: the milestones fire on the Play press, and the counts wait for a finished run. Auto-advance means that pressing both Play buttons plays both histories. The reveal's claim does not depend on the count. This is v-next polish for cm-probability-statistics to weigh under W-1574. |
| 7 | the-swap still lists `math:condorcet-cycle` as a prerequisite and "voting" as a tag, after the voter sentence was cut. | demo-builder build.md, learner r2 | **Routed, non-blocking.** This is metadata the learner does not see, and it is cm-math-discrete's call. I listed it in W-1591. |
| 8 | Simulated walks are not learner evidence. | standing caveat | **Stands.** Confidence stays unset, below "**". Nothing here claims that anyone learned. |
| 9 | These four were built after the F-46 closeout ledger, so they have no row in `company/product/2026-10-16-closeout-ruling.md`. | chair | **Answered.** They are path-P lessons by evidence (fact-check, QA, learner launch on the current version). A publish closes them under F-46 without a ledger change. If any go lapses and is not re-earned, that lesson needs a ledger row before the 10-19 retirement checks. |

## Decision

**go: same-picture-two-histories (v2), price-tag-or-auction (v2), worth-something-alone (v2), the-swap-that-goes-in-circles (v1 with fc8c53b8). Each takes effect only when its precondition (ruling 1) is met. Until then this review is open.** Signed: head-of-product (Priya), 2026-10-16.

## For the release-manager (the publish run)

Run this once per lesson, and only for a lesson whose precondition row above is filled with "yes". A lesson whose row is open, "no" or "after change" is not published from this record.

1. **Precondition.** The strand manager's decision is on disk (preconditions table or board ruling). `meta.json` reads `"status": "review"`, and its `version` is the one named here: v2, v2, v2, v1. If the version differs, this go lapses.
2. **Same code.** This must be empty:
   `git diff 975a485128f05cc92e6b58b5c98abcb6fa6b05b4 HEAD -- src/demos/<domain>/<slug>/Demo.tsx src/demos/<domain>/<slug>/styles.module.css src/kit/Lesson.tsx src/kit/controls.tsx src/kit/milestones.tsx src/kit/progress.ts src/kit/types.ts src/app/d/`
   For price-tag-or-auction, also add `src/demos/economics/price-tag-or-auction/model.ts src/kit/random.ts`. If the lesson has gained a new import, recompute the closure before using this list. If the diff is non-empty, the go lapses.
3. **Claims unchanged.** In `git diff 975a4851 HEAD -- src/demos/<domain>/<slug>/meta.json`, no claim `text`, no `predict` field and no `version` has changed, and every claim is `verified` or `withdrawn`. Otherwise the go lapses.
4. **Learner verdict.**
   - For same-picture-two-histories, price-tag-or-auction and worth-something-alone: `node tools/publish-ready.mjs` must list the slug as a candidate. If it does not, the go lapses.
   - For the-swap-that-goes-in-circles, publish-ready will say "held (verdict revise)" (ruling 2), and that alone does not lapse this go. The go lapses instead if any of these is true:
     - `company/reviews/the-swap-that-goes-in-circles/` holds a learner file other than `2026-10-16-learner-knows-preference.md` and `2026-10-16-learner-knows-preference-r2.md`;
     - r2 no longer reads `Verdict: launch` and `lesson version: v1`;
     - `company/ops/publish-holds.json` names the slug.
5. **Publish.** `node tools/company.mjs publish <slug>` (the gates run inside it), then `npm run check`, plus a changelog line citing this record and the strand manager's decision.
6. **No deploy.** Going live needs the founder's approval of that specific deploy (F-48, `company/ops/runbook-deploy.md`). Name the missing analytics row (objection, Committed predictions) in the release record if it is still missing.

If any condition fails, do not publish that lesson, and come back to the chair (board, owner head-of-product). The other lessons are independent: one lesson's lapse does not stop the others.

## Kudos (optional)
- @qa-tester: the v2 and reveal-fix records name the build SHA and say outright that the swap's version was not bumped. That made ruling 2 checkable without a new run.
- @learner-evaluator: r2 finding 6 on the swap predicted exactly the publish-ready tie this record had to rule on.
