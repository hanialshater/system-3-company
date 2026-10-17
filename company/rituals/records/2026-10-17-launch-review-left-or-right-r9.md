# Launch Review: 2026-10-17 (r9): math/left-or-right v3

chair: head-of-product (Priya) · slot hop-lor-r9 · tree read at `531ff6c8` (dispatched at `d238ac7b`; I fast-forwarded when the coordinator reported EXP-008, and the only change is EXP-008, its README line, board items and an analytics-steward memory entry) · executes: release-manager, board W-1660 (a separate run publishes from this record, and only once its preconditions hold) · attests: qa-tester, fact-checker, learner-evaluator, design-lead (by their records, cited below); cm-math-discrete (opener ruling) · preconditions owned by: cm-math-discrete (W-1657), demo-builder (W-1659), accessibility-reviewer (W-1658, met by `company/reviews/left-or-right/2026-10-17-accessibility.md`) · deploy-time precondition owned by: release-manager (W-1661) and qa-tester (W-1607/W-1615), with the environment question to the founder via chief-of-staff (W-1662) · no deploy

Brief: Knots batch 1, brief 4 (`company/domains/briefs/math.discrete.md`, version B2): a two-sided flip card. Turn over is a CSS `rotateY` of a card whose back face is the cleared mirror drawing, pre-reflected; Mirror is `scaleX(-1)` on a wrapper. The lesson is `draft`, v3. Model for this record: r8 (`company/rituals/records/2026-10-17-launch-review-knots-r8.md`). This record is **not** permission to publish a draft: `company publish` does not check status and has no dry run.

## Ruling 1: this review cannot move the lesson to review, so it stays open on its preconditions

Same reading as r7 and r8 ruling 1: head-of-product has no power over lesson status (`company/roles/head-of-product.md`). The draft → review grant is the demo-builder's (`tools/org/roles.mjs`), and the decision belongs to the strand manager, cm-math-discrete. This review decides on the artifact and the gates, and holds the go open.

The go below takes effect only when **all** of these are on disk (3 and 4 are met as of this record's commit; 1 and 2 are open):
1. cm-math-discrete's decision to move the lesson to review (W-1657): "yes" in the table below, or a ruling file named there.
2. `meta.json` reads `"status": "review"` at `version` 3 (demo-builder, W-1659).
3. An accessibility-reviewer record `company/reviews/left-or-right/<date>-a11y.md` on code that passes the same-code check (release step 3), naming no lock-out (W-1658). This is a precondition for the same reason as r8 ruling 2: the difference between "turned over" and "mirrored" is carried only by the crossing badges and the picture's label (learner walk finding 2). Whether a screen-reader or low-vision learner can tell the two apart has not been checked by the role that owns that question. QA v3 ran keyboard, reduced-motion and dark checks, which are QA observations and not an accessibility review. A record that finds problems short of a lock-out does not lapse the go; it is routed. A lock-out lapses it (accessibility-reviewer's own authority).
4. A committed analytics row before the publish: **met** by `company/experiments/EXP-008-launch-predictions-left-or-right.md` (analytics-steward, committed 5ed652dc, 2026-10-17 02:17Z, while the lesson was `draft` and before any deploy carrying it). Linked, not restated.

If cm-math-discrete declines, objects or asks for a change first, or the accessibility record names a lock-out, the go **lapses** (it does not become a no-go). It comes back to this chair after the change has had its QA, fact-check and re-walk.

### Preconditions (owners fill their own cells; nothing else in this record changes when they do)

| Lesson | Version this review is on | Move to review (cm-math-discrete, W-1657): yes / no / after change, where, date | Status `review` (demo-builder, W-1659) | Accessibility record (accessibility-reviewer, W-1658): file, result | Analytics row (analytics-steward) | WebKit/Safari record (deploy-time only, ruling 2; qa-tester W-1607/W-1615): file, result |
|---|---|---|---|---|---|---|
| math/left-or-right | v3 | | | **met**: `company/reviews/left-or-right/2026-10-17-accessibility.md` (commit e23181b1, tree d238ac7b, whose closure equals 531ff6c8), pass with conditions, no lock-out; L1 ruled not blocking (objection 14). Cell filled by the chair from the record, at the coordinator's report | **met**: EXP-008 (D1-D6, F5/F6, O1/O2) | |

## Ruling 2: WebKit/Safari does not block the publish; it blocks every deploy that would carry the lesson

**The gap.** The card is correct only if both faces have `backface-visibility: hidden` and the card keeps `transform-style: preserve-3d`. If either fails, the frames from 90° to 180° show the reflected front, which is the **mirror** knot (principal-engineer condition C3, `company/engineering/reviews/2026-10-16-knots-left-or-right-card.md`; brief PE-C3; spec obligation 4, `company/design/specs/left-or-right.md`). That would be a false picture on the lesson's own question: the screen would show "turned over" as "mirrored", which is the misconception the lesson exists to correct. Claim c7 ("after Turn over the card's picture is the knot turned over ... not its mirror image") was verified from Chromium geometry. Its truth in Safari is unverified. Every browser check so far is Chromium: build.md, `c1-chromium-2026-10-17-v3.json` (61/61), K21 and QA v3. WebKit cannot run in this container: the binary is not installed and the egress proxy refuses the download (QA v3, header; build.md; W-1607, W-1615).

**What lowers the risk, and why it is not enough.** The builder set the `-webkit-` prefix inline, because the CSS minifier drops it from the module (build.md; `Demo.tsx` line 88-89). Both properties are long supported in Safari. That makes a failure unlikely. It does not make it checked, and iPhone Safari is a large share of the phones this product is for. I put this at roughly "unlikely, and severe if it happens". That is not a risk to put in front of learners unchecked. It also does not justify holding a repo status change.

**Why the line is at deploy and not at publish.** Publishing changes `meta.json` in the repo. No learner sees anything until a founder-approved production deploy (`company/ops/runbook-deploy.md`; F-48, git deployments are off). The harm can only happen at the deploy, so the check belongs at the deploy. Holding the publish would hold the lesson on something no one in the company can do today, and would protect no learner. The risk in this choice is real: a production deploy ships **every** published lesson, so an unrelated deploy could carry this one. That is why the precondition is written to bind any deploy, not one that names this lesson.

**The ruling.**
- (a) Publish may proceed when preconditions 1-4 hold. The WebKit gap is not one of them.
- (b) No production deploy may carry `math/left-or-right` with `status: published` until a WebKit/Safari record is on disk and its cell in the table above is filled. The record is either a qa-tester record of `company/reviews/left-or-right/c1-check.mjs` run with `ENGINE=webkit` (all four rest states of both knots, mid-flip frames), or a real iOS Safari check with screenshots of each rest state and a mid-flip frame. In both cases it must be on code that passes release step 3, and it must report 0 failures. The release-manager checks this before **every** production deploy while the gap is open, names it in the deploy request to the founder, and enters it under known issues in the release draft (W-1661).
- (c) If a production deploy is wanted before that record exists, the release-manager first reverts its own left-or-right publish commit (status back to `review`), deploys, and re-publishes afterwards. The release-manager may refuse a release (`tools/org/roles.mjs`), and this keeps it inside that authority. The founder may of course decide otherwise when approving a deploy. If they do, the release record says so in their words.
- (d) If the WebKit record shows the mirror frame or any rest-state failure, the go **lapses**, the publish is reverted before any deploy, and the lesson goes back to demo-builder with the record. It comes back to this chair after QA.
- (e) Getting WebKit is an environment decision: allow the Playwright WebKit download through the proxy, use a host that has WebKit, or have the founder open the lesson on an iPhone (a preview deploy needs its own approval). It goes to the founder through chief-of-staff (W-1662). The qa-tester runs it (W-1607/W-1615, annotated with this ruling).
- (f) Firefox is not run either (build.md). I do **not** make it a precondition: PE-C3's named risk is WebKit's prefix handling, and Gecko does not use that prefix. It is a known gap, recorded as objection 2.

This is my decision as the chair. It sets a condition on this go and does not change any gate. A deploy-time precondition only works if the release-manager reads it, so it is on the board (W-1661) and in the release steps below, not only here.

## Readings applied

- **Artifact before account.** I built `d238ac7b` into a private dist dir and ran `npm run walkthrough -- left-or-right` (phone, option 1: Turn over, Mirror, Figure-eight). I read the transcript and all five frames before any QA, learner, design or build record. The lesson closure is identical at `531ff6c8`. What I wrote from the frames, before the records:
  - The predict card asks a real question, and option 3 ("Only by picking it up and turning it over") is the tempting middle answer for this misconception.
  - Turn over: the outline flips left to right, the marks stay −,−,−, and the readout reads "Sum −3 Left-handed". To an untrained eye, the turned-over outline looks like a mirror image. Only the badges say otherwise. That is the lesson's whole point and its most likely stall.
  - Mirror: same flipped outline, every mark +, "Sum +3 Right-handed". The contrast between the two is visible.
  - The reveal opens on the figure-eight (the last chip tapped) at "Sum 0", while the seen line keeps "Trefoil: turned over −3 · mirror +3", and the first paragraph speaks of the trefoil. The seen line carries the numbers the sentence quotes, so the sentence is true of what was seen. The stage picture is the figure-eight, though.
  - On this path, "The figure-eight is different: it is its own mirror image" is told: I never mirrored the figure-eight. "No wiggling gets back ... as Max Dehn proved in 1914" is told too, and sourced.
  - It fits at the walkthrough's phone size with the trust link on screen: "8/8 claims checked".
- **QA counts only if a qa-tester wrote it on the version that ships** (W-1237 reading, r5). The contract record is `company/reviews/left-or-right/2026-10-17-qa.md` (`company qa-record`, phone and desktop passed, 0 retries, commit f79639a7). The exploratory record is `2026-10-17-qa-v3.md`, built from `e3aecea8`, which contains the v3 commit 0fa02697. It covers the contract 2/2, C1 61/61 in Chromium, the order matrix, fast presses, keyboard, reduced motion and dark: **pass with observations, no blocker**. WebKit, the feed swipe and feed.spec were not run. The 2026-10-16 QA was on v1 and is superseded.
- **Same-code check (import-closure method, r6 addendum).** The lesson loads `Demo.tsx`, `card.ts` and `styles.module.css`; `src/kit/Lesson.tsx`, `controls.tsx` and `milestones.tsx` (with `progress.ts` and `types.ts` behind them); `@/kit/knots` (`src/kit/knots/*.mjs`, `index.d.ts`, `package.json`); and the page `src/app/d/`. It also reads the theme variables (`var(--fg)` and others) and the shared row and chip rules in `src/app/globals.css`, so I include that file.
  - `git diff e3aecea8 531ff6c8` over that closure (the QA v3 build): only `meta.json`, with the c5 text gaining the quote "its hand stayed right" (W-1651, no learner-visible change) and the evidence links.
  - `git diff 8a67fe3e 531ff6c8` over that closure (the learner walk and the c3/c6 fact-check base): only `meta.json`.
  - `git diff 0fa02697 531ff6c8` over `Demo.tsx`, `card.ts` and `styles.module.css`: empty. v3 is the last learner-facing change.
- **Claims.** `node tools/company.mjs claims --open` lists none for this slug. All 8 claims are `verified` by fact-checker, each by an instance that did not write the claim:
  - c2, c4, c7 and c8: `2026-10-17-fact-check.md` (base d5235af7, v1). Their texts are unchanged since (compared with ad93e395).
  - c1: `-v2.md` (aae6d2d6). Its quoted sentence was kept verbatim by the opener ruling.
  - c3 and c6: `-v3.md` (8a67fe3e).
  - c5: `-c5-v3.md` (da5fb903), with both hand quotes.
  - c7's verification rests on Chromium geometry (ruling 2).
- **Learner verdict.** I ran publish-ready `decide()` read-only on the slug's learner files, with meta version 3 and git ancestry, at `531ff6c8`: **ready**. The latest walk is `2026-10-17-learner-walk.md` (v3, verdict launch, built on 8a67fe3e). That walk saw "6/8 claims checked", because c3, c5 and c6 were reset at the time. All three have been verified since, without a change to learner text. `node tools/publish-ready.mjs` does not list the lesson today, because it is `draft`. `company/ops/publish-holds.json` does not name it.
- **Design.**
  - `company/design/reviews/2026-10-17-left-or-right-s4.md`: pass with changes. D1 and D2 were applied. The flip and the dip do not teach the misconception, which design-lead is "sure" of in Chromium, and WebKit is unmeasured. Short-phone crops were accepted.
  - `2026-10-17-left-or-right-v2-departures.md`: (1) accepted; (2) accepted as D3, which was applied in v3.
- **cm-math-discrete.** `company/domains/briefs/rulings/2026-10-17-left-or-right-opener.md` ruled a branch opener for the Mirror-then-Turn-over path. QA v3 confirmed it in a browser, in both orders and in the four-press order. The fact-checker verified it (c3, c5, c6).

## Per-lesson decision

| Lesson | Newest learner verdict vs meta | QA (qa-tester) | Claims | Design | Decision | One line of reason |
|---|---|---|---|---|---|---|
| math/left-or-right | launch, v3 (built 8a67fe3e); meta v3 | pass (qa-record + qa-v3, Chromium only) | 8/8 verified | S4 + v2-departures (D3) | **go, held open on preconditions 1-2 (3 and 4 met); deploy-time precondition per ruling 2** | On both orders the reveal states only what the learner saw. The trefoil's marks visibly survive a turn and flip under the mirror before the reveal unlocks. The open risk (WebKit) can only reach a learner through a deploy, and ruling 2 holds every deploy against it. |

**Go: 1, held open. No-go: 0.**

**Order.** The prerequisites in `content/curriculum/math.json` are the release-manager's to name in the release record, as in r8. This lesson names and draws both of its knots on its own stage, so a missing prerequisite does not hold it.

## Committed predictions (analytics steward, before launch)

Linked, not restated: `company/experiments/EXP-008-launch-predictions-left-or-right.md` (analytics-steward, Grace, committed 5ed652dc at 2026-10-17 02:17Z, before any publish or deploy carrying the lesson). It covers v3 only. Its version rule (a new version needs an amendment row before the deploy that carries it) binds W-1652, W-1653 and W-1656. Nothing in it is measurable until W-706 lands and a founder-approved deploy carries the lesson. Results go under EXP-008 `## Result`, never here.

## Open objections travelling with this launch

| # | Objection | Raised by | Status |
|---|---|---|---|
| 1 | The 3D card is unverified in WebKit/Safari. If `backface-visibility` or `preserve-3d` fails, Turn over shows the mirror knot, a false picture on the lesson's own question. c7 is verified in Chromium only. | demo-builder (build.md), qa-tester (QA v1, v3), design-lead (S4), principal-engineer (C3) | **Accepted, made a deploy-time precondition, not a publish hold** (ruling 2). Owners: release-manager W-1661, qa-tester W-1607/W-1615, founder via chief-of-staff W-1662. |
| 2 | Firefox is not run either. | demo-builder (build.md), W-1607 | **Declined as a precondition** (ruling 2 (f)). Gecko does not use the `-webkit-` prefix that C3 names as the risk. The gap is recorded here and stays on W-1607 for the first host that has Firefox. If a Firefox run shows the mirror frame, ruling 2 (d) applies to it as well. |
| 3 | On the QA path, "the figure-eight is its own mirror image" is told, not shown. On the eightMirror path, "summed to 0 both ways, and it is its own mirror image" invites the rule "Sum 0 means its own mirror image". | learner walk finding 4; chair (walkthrough, before reading it) | **Declined as a hold, kept for the next version.** The trefoil argument, which is the hook, is seen. The figure-eight sentence is sourced (c2). The learner judged it non-blocking. Whether the wording needs a guard is cm-math-discrete's ruling (W-1652). It is the first fix if the lesson is revised. |
| 4 | Exploring the figure-eight first and following the panel leaves the reveal locked with no hint. On the Mirror-first path, the seen line never records the turn-over that the branch opener leads with. | learner walk findings 1, 5 | **Declined as a hold, next version** (W-1653, demo-builder). This is the same class as r8 objection 6: the trefoil is the default chip and the hook's knot. |
| 5 | The turned-over outline looks like a mirror image; only the badges separate it from the mirror. | learner walk finding 2; chair | **Answered: that is the lesson.** The reveal names it ("turning over is a way of moving it"). EXP-008 D3 tests which form of the misconception learners bring. The accessibility review (precondition 3) checks whether the badge-only cue reaches every learner. |
| 6 | Below 390×844 the reveal crops the picture (tens of px at 360×740; most of it at 360×640), and at 360×640 the chip row starts below the stage window. | qa-tester (QA v3, layout) | **Declined as a hold.** The standard binds at 390×844, where QA v3 found no crop. design-lead ruled the short-phone crops in S4 and v2-departures. Whether 360 should bind is my open question W-1593. I am not changing the standard inside a launch. |
| 7 | The chips stay live at the reveal. Tapping Figure-eight swaps the picture while the sentence and seen line speak of the trefoil. The QA path itself opens the reveal on the figure-eight. | qa-tester (QA v3 obs 2); chair (walkthrough) | **Declined as a hold.** The seen line is designed to keep the trefoil's quoted numbers on stage for exactly this ending (cm-math-discrete spec ruling 4, brief). design-lead ruled the live stage at the reveal as product behaviour (W-1610 (b), r8 objection 5). |
| 8 | Fast presses (Turn over then Mirror within about 200 ms) give the branch opener, so "Turn over then Mirror always shows the standard opener" is true only when the card settles. | qa-tester (QA v3) | **Accepted, no change.** The opener follows the states that rested on screen, which is what the learner saw. EXP-008 O1 cannot be read until W-1655 is settled. |
| 9 | After "Show me why", keyboard focus falls to `<body>`. | qa-tester (QA v3) | **Routed, as r8.** It is kit behaviour (W-1618). The accessibility reviewer weighs it under precondition 3. |
| 10 | The recall answer repeats the stem's word "right-handed". | analytics-steward (EXP-008 objection 3) | **Routed, non-blocking** (W-1656, cm-math-discrete). A changed card needs an EXP-008 amendment before its deploy. |
| 11 | "No wiggling gets back" rests on authority (Dehn 1914); the stage cannot wiggle. | learner walk finding 7 | **Accepted, non-blocking.** It is a claim with a published source (c1), labelled as told context. Only human learners can show whether it sticks. |
| 12 | The go rests on simulated walks and a Chromium-only browser record. | standing caveat | **Stands.** Confidence stays unset. Nothing here claims that anyone learned. |
| 13 | The lesson has no row in the F-46 closeout ledger (`company/product/2026-10-16-closeout-ruling.md`). | chair | **Answered, as r7 and r8 objection 9.** It is path-P by evidence, and a publish closes it. If the go lapses and is not re-earned before the 10-19 checks, the lesson needs a ledger row. |
| 14 | L1: Turn over is silent to a screen reader. The status region changes only when the sum or hand changes, so a screen-reader learner hears "pressed" and nothing else. Also L2 (a chip press drops focus to `<body>`), L3 (kit pressed-state border 2.26:1 in light) and L4 (11.5 px glyph at 360 wide). | accessibility-reviewer (`2026-10-17-accessibility.md`) | **L1 declined as a hold, first fix of the next version; L2-L4 routed by the reviewer.** I weighed L1 because it touches the lesson's own contrast: Turn over is the half that is meant to change nothing. A screen-reader learner still gets the state: `aria-pressed` on the toggle, and the picture's label names "turned over" with its marks and sum. Silence after Turn over is also the true result, since the sum and hand did not change. That is a weaker cue than the sighted learner's, not a barrier, and the reviewer, who owns the lock-out call, found none. The fix (card state in the status text) is new learner-visible text, so it comes with claims and a re-check, which a next version can carry with W-1652/W-1653. Precondition 3 is met. |

## Decision

**go: math/left-or-right (v3). It takes effect only when preconditions 1 and 2 of ruling 1 are met (3, accessibility, and 4, analytics, are met). No deploy may carry it as published until the WebKit/Safari cell is filled (ruling 2). Until then this review is open.** Signed: head-of-product (Priya), 2026-10-17.

## For the release-manager (the publish run, W-1660; the deploy guard, W-1661)

Run these steps once, and only when the precondition cells are filled and met. Do not use `publish-ready --publish`.

1. **Preconditions.** cm-math-discrete's cell says "yes" (or a "yes" ruling is named on W-1657). `meta.json` reads `"status": "review"` and `version` 3. If the version differs, the go lapses.
2. **Accessibility.** `company/reviews/left-or-right/` holds an accessibility-reviewer record built from code that passes step 3, and it names no lock-out. If it is missing or names a lock-out, do not publish.
3. **Same code.** This must print nothing:
   `git diff e3aecea8793d581b44bf3a1c1611a3e04cc981ab HEAD -- src/demos/math/left-or-right/Demo.tsx src/demos/math/left-or-right/card.ts src/demos/math/left-or-right/styles.module.css src/kit/Lesson.tsx src/kit/controls.tsx src/kit/milestones.tsx src/kit/progress.ts src/kit/types.ts 'src/kit/knots/*.mjs' src/kit/knots/index.d.ts src/kit/knots/package.json src/app/d/ src/app/globals.css`
   If the lesson has gained an import, recompute the closure first. Any output: the go lapses.
4. **Claims unchanged.** In `git diff e3aecea8793d581b44bf3a1c1611a3e04cc981ab HEAD -- src/demos/math/left-or-right/meta.json`, the only claim-text change allowed is c5's added quote "reveal branch 'its hand stayed right'", which was verified at -c5-v3. No `predict` or `recall` field and no `version` may change. Every claim must be `verified` or `withdrawn`. Otherwise the go lapses.
5. **Learner verdict.** `node tools/publish-ready.mjs` lists the slug as a candidate (it will once the status is `review`). If it does not, the go lapses.
6. **Analytics row.** EXP-008 stands (committed 5ed652dc). There must be no deploy carrying the lesson dated before it.
7. **Publish.** `node tools/company.mjs publish left-or-right` (the gates run inside it), then `npm run check`. Add a changelog line citing this record, cm-math-discrete's decision, the a11y record, and the line "**WebKit/Safari unverified: no production deploy may carry this lesson until r9 ruling 2's cell is filled**". **No deploy.**
8. **Every later production deploy while the WebKit cell is empty** (W-1661): before asking the founder, check this record's WebKit cell. If it is empty, either revert the left-or-right publish commit first (ruling 2 (c)), or tell the founder in the deploy request that this deploy would carry a lesson unverified in Safari, and record their words in `company/ops/releases.json`. Put the gap under known issues in the release draft either way.

If any condition fails, do not publish and come back to the chair (board, owner head-of-product).

## Kudos (optional)
- @qa-tester: the QA v3 order matrix and the fast-press section showed the branch opener follows what rested on screen, so I could rule on objection 8 without a probe of my own. The header's plain "I did not try to download it" kept the WebKit gap honest.
