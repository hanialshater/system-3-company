# Domain Launch Review r2: 2026-10-16: Life Hacks (lifehacks): what stands between the review and a pass, and how the pass scales to the held 200

owner: head-of-product (Priya), chair · attests: lifehacks-safety-reviewer (Sana), **pending** · predicts: analytics-steward, **pending** · ratifies in OP: founder
date: 2026-10-16
class: category-or-vertical (domain launch gate: incubating → active), continuation of `company/rituals/records/2026-10-15-domain-launch.md` (the r1 record). R1, R2 and R3 of r1 stand unless a ruling below says otherwise.
route: head-of-product (this record) → analytics-steward (prediction, W-1083) and lifehacks-safety-reviewer (slate attestation, W-1082; then the sweep and per-lesson attestations) → head-of-product (closes each table) → chief of staff (lifts `publish-holds.json` rows that this record passes, and only those) → release-manager (publishes through the normal gates) → founder (ratifies incubating → active in OP; approves every deploy separately)
recorded-by: head-of-product (Priya)
board: W-586 (this review), W-1082, W-1083, W-1087 (decided here), W-1171, W-1078, W-1085, W-1114, W-1128; project `lifehacks-engine-v2`
status: **no lesson passes yet.** Two inputs are missing, and both are judgement work in other roles: the safety attestation and the committed prediction. Nothing in this record publishes or deploys.

## 1. What I checked, and how

Read with scripts on the tree at HEAD f9265aa (scratch, not kept: `/tmp/claude-0/-home-user/3e472d64-8589-5167-8584-c47a01ab4321/scratchpad/hop-lh2/{scan,ready,tranche}.mjs`). They read every Life Hacks `meta.json` and `company/reviews/<slug>/`, apply `decide()` imported from `tools/publish-ready.mjs` (the W-843 learner-verdict rule) without the hold short-circuit, and run `node tools/qa-changed.mjs --format=json --no-worktree`. I did not run `publish-ready.mjs` itself, a server or a walkthrough. Judging lessons is not my job.

- `company/ops/publish-holds.json`: 224 holds. **200 are the Life Hacks domain hold** (one per lesson on disk, all `review`). The other 13 lines with the same wording are History's.
- **The premise "about 200 gate-clean lessons held only by this hold" is not true on the tree.** `company status` lists about 183 Life Hacks lessons as "Ready to publish", because `launchGates()` in `tools/company.mjs` checks only claims and whether evidence files exist. Under the W-843 rule (the newest learner review says `launch` and names the current version), the numbers are:
  - **34 of 200** are gate-clean: newest learner verdict `launch` on the current version, and every live claim verified.
  - 2 more have a `launch` verdict but open claims.
  - **164 have a newest verdict of `revise`, or a verdict on an older version.** The domain hold is not what stops these. Learner verdicts stop them: the r11 fix waves and the founder's F-36 reading of the kill rule.
  - 30 of the 200 are parked by cm-lifehacks for retirement review (`company/reviews/lifehacks-200/triage-r11-park-2026-10-15.md`).
- **`company publish <slug>` reads neither the holds nor learner verdicts** (`cmdPublish` runs only `launchGates`). So deleting hold rows in bulk would let a hand-run publish take lessons that are learner-`revise`. That is why rows below lift one by one, against conditions, and never as a block. (This is r1 Objection 5 again. The engineering fix is still not mine.)

## 2. The slate: what is on file and what is missing

The slate is r1's six counted wave-1 lessons, **plus `spaced-beats-cram` as a seventh row.** cm-lifehacks asked for that (r6 dispatch, lane-10 ask 1), and I accept it. It is a study (wave-1) lesson, so it may count toward the five. Its publication is the second half of the wave-2 opening rule (W-570 ruling 1).

| Lesson | Claims | Learner (newest, version) | QA current? | Safety launch attestation | Analytics prediction |
|---|---|---|---|---|---|
| packing-cube-walls | 6/6 ✓ | r11 launch, v1 | **yes**: 2026-10-16-qa.md pass on 6838dba; not selected by `qa-changed` at HEAD | **missing** (only the 2026-10-14 source review, class none) | **missing** |
| pillowcase-set-kit | 6/6 ✓ | r11 launch | **yes** (same) | **missing** | **missing** |
| shelf-front-labels | 6/6 ✓ | r11 launch | **yes** | **missing** | **missing** |
| rolled-or-folded-volume | 6/6 ✓ | r11 launch, v2 | **yes** | **missing** | **missing** |
| suitcase-rotate-block | 6/6 ✓ | r11 launch, v2 | **yes** | **missing** | **missing** |
| rebuild-the-procedure | 4/4 ✓ | r11 launch | **yes** | **missing** | **missing** |
| spaced-beats-cram | all ✓ (c2 withdrawn) | r12 launch | **yes** (6838dba) | **missing** | **missing** |

- **QA: on file for all seven** (W-1081 done; W-1171). r1's QA condition is met. I checked it with `qa-changed` and did not take the dispatch's word for it.
- **Safety attestation: on file for none.** Owner: lifehacks-safety-reviewer, W-1082. No `*-safety-launch.md` exists anywhere under `company/reviews/`.
- **Committed prediction: on file for none.** Owner: analytics-steward, W-1083. r1's table says it is "owed before any of the five publishes". Use the format from `company/rituals/records/2026-10-16-launch-review-r5.md` P1/P2: event definitions, threshold, period, minimum sample, would_be_wrong_if.
- **Accessibility:** the sight half of W-598 is fixed for the five toggle lessons. d995f70 (TP-1, merged in 9302c25 on 2026-10-15 22:35Z) draws the layout in effect as selected, with `aria-pressed`. The 6838dba QA ran after that merge. The screen-reader half (W-1111, W-1114) is still open. See R5.

**What blocks the pass: two things, and nothing else on the record.** (1) Sana signs at least five of the seven rows (W-1082). (2) analytics-steward dates the prediction (W-1083). Neither needs a build or another sitting.

## Rulings

**R4. Wait for nothing else on the slate. Attest and publish on one SHA.** Sana walks a build where `qa-changed` does not select the seven. She records that SHA in each row. If an engine merge (for example lhfix-r3, cm-lifehacks r5 B1, which changes `HomeLesson.tsx`) lands before the slate publishes, SO-10-1 re-runs the seven first. Sana's signature then stands unless that merge changes what a slate lesson's stage or hero shows. She judges that from the diff and says so in the row.

**R5. W-1087 decided: do not wait for the aria-disabled fix (W-1114). The slate does not hold on it.**
- The visible defect that W-1087 was raised for (the chosen mode drawn dimmed) is fixed on main by TP-1, and QA passed the slate after the fix. W-1085's reason ("renders dimmed with aria-disabled and no aria-pressed") is out of date on main. Its remaining a11y content is W-1114.
- What is left is a wrong screen-reader announcement ("pressed, dimmed"). The accessibility reviewer, who owns that judgement, ruled it "a defect, not a lock-out", did not use the block, and wrote "if the deploy cannot wait, ship as is and record the open item" (`company/reviews/_accessibility/2026-10-15-w1111-pressed-mode-aria.md`).
- Waiting has no end date. W-1114 is blocked on W-1128, an amendment to the protected `tests/qa/contract.spec.ts`. That needs ratification, then a build, a re-QA and a re-walk. Nobody can date that chain today.
- **Conditions:** (a) the open item travels with the launch. release-manager's publish note for the slate names W-1114 as a known a11y defect. (b) When W-1114 lands, SO-10-1 re-runs the slate. Sana does not need to re-attest for it, because aria attributes change no safety content. (c) If the founder or the accessibility reviewer reclassifies it as a barrier, the slate stops at whatever point it has reached.

**R6. W-1078 (cm-lifehacks' D9 objection): D9 is accepted. Recall moves onto the stage's fixture for the five held wave-1 lessons. R3 stays as written.** I do not ask for transfer examples now. The cost cm-lifehacks names is real: the revisit tests recall of the stage, not transfer. I accept it for the first publish. A recall that uses its own new numbers stops holding a lesson only when the trust sheet labels it as a new example. That is a kit/trust-sheet change, and until it exists a mismatch holds, as R3 says. shoes-opposite-ends (r14 launch, recall 11 + 5 against a stage of 12 and 6) is in that position. The fact-checker classifies it in the W-1078 sweep (ask A4).

**R7. How the review scales: pass the category on the slate, then lift the remaining rows by risk class.** The founder asked for this shape. It also applies Sana's own lens: `company/domains/lifehacks-scope/safety.md` §1 says class none gets "no per-lesson review", only a 1-in-5 spot check at launch review plus any trigger lesson. Every one of the 200 already had a per-lesson safety source review on 2026-10-14 (PR #2 @ 71e99fee). So the sweep does not take the first look at these lessons. It tests whether that source review predicts what the walkthrough shows.

1. **Category pass (incubating → active).** When five slate rows say pass, and the prediction is dated, Life Hacks is active. The founder ratifies this in OP.
2. **Wave order still binds (r1 R1/R2).** Wave 2 (time, digital, shopping, energy) opens when the counted five **and** spaced-beats-cram are published. With spaced-beats-cram on the slate, that can be the same publish. Kitchen (wave 3) lifts nothing from this record.
3. **Low-risk class (L): no one-by-one safety review.** L means: safety class `none`, `quantity-only` or `none (study and work)`, verdict a plain pass, not a kitchen, energy or shopping lesson, and not on Sana's §6 trigger list (lifting, cords, elastic, drying, furniture, exits, load, care label, defensive digital). For each L stratum (one strand within one wave), Sana walks a **random sample of max(2, ⌈n/5⌉)** lessons on the current build. The sample is drawn by a seeded script, with the walked SHA as the seed, and the script and draw are recorded in her sweep record. She may add any lesson she wants. **If one sampled lesson fails, that stratum reverts to per-lesson attestation** and comes back to me. A later version bump in a swept stratum joins the next sweep's sample pool before it lifts.
4. **Per-lesson class (P): keep a walkthrough attestation on every lesson.** P means: kitchen (food, heat), energy (electricity), shopping (money), any `warning` / `review` / `electricity` / `money-arithmetic` class, any `pass with changes`, and any §6 trigger lesson. One batch record with one row per lesson is acceptable. Each row is its own walkthrough verdict.
5. **A row lifts only when all of these hold for the lesson at its current version.** Its safety gate (sweep stratum passed, or its own P row) is met. The newest learner verdict is `launch` for the current version (W-843). Every live claim is verified. QA is current (not selected by `qa-changed`). The fact-checker's W-1078 row says the trust sheet matches the stage. Its wave is open. It is not parked. The chief of staff lifts only rows that a named record shows meet every one of these. This record is the rule, and Sana's and the fact-checker's records are the evidence.

### The 200 hold rows under R7

`*` = gate-clean today (newest learner `launch` on the current version and all claims verified). `q` = `qa-changed` selects it at HEAD, so it needs re-QA before it lifts.

| Tranche | Rows | Safety gate | Lift now possible? | Rows that can lift in the next cycle |
|---|---|---|---|---|
| **S** slate (wave 1) | 7 | per-lesson (W-1082) | yes, on W-1082 + W-1083 | **7** |
| **T1-L** wave 1, low risk | 60 | sweep: fix 20→4, storage 16→4, laundry 10→2, study 10→2, travel 4→2 = **14 walks** | after the sweep | **7**: box-handle-clearance*q; shoes-opposite-ends*q (after A4); ruler-start-not-zero, ribbon-around-box-length, seasonal-bin-rotation, rug-chair-pullback, round-box-leftover-gap (*q, after B3's D9 fix, re-verify and re-QA) |
| **T1-P** wave 1, per lesson | 19 | per-lesson | no lesson is gate-clean | 0 |
| **T2-L** wave 2, low risk | 34 | sweep: time 19→4, digital 15→3 = **7 walks** | after wave 2 opens and the sweep | **2**: project-prefix-filenames* (QA current); search-the-document-body*q (after its W-1078 fix, held to cm-lifehacks' next revision batch) |
| **T2-P** wave 2, per lesson | 46 | per-lesson | after wave 2 opens | **17**: lh-align-price-units*, lh-big-pack-price*, lh-billing-rounds-hours* (QA current); lh-count-sheets-not-rolls, lh-discount-round-trip, lh-fixed-coupon-percent, lh-lead-time-stock, lh-reuse-cost-per-use, lh-round-lines-versus-total, lh-sequential-discounts, lh-ticket-bundle-unused, lh-visit-fee-crossover, lh-weighted-unit-average, lh-flow-duration-offset (*q, f1832fa QA stale); lh-idle-versus-active, lh-purchase-plus-running, lh-watts-hours-trade (*q, 10-14 QA only; pass with changes, so Sana confirms the line on the stage) |
| **K** kitchen (wave 3) | 4 | review class, second reader | no (wave 3) | 0 (lh-double-container-radius* waits for wave 3) |
| **Z** parked | 30 | none: retirement review | no | 0 |
| **Total** | **200** | 7 slate rows + 21 sample walks + 65 per-lesson rows (kitchen and parked excluded) | | **33** |

**Count: 33 rows can lift in the next cycle. The other 167 cannot,** and the hold is not the reason for 133 of them. Those 133 (53 T1-L, 19 T1-P, 32 T2-L, 29 T2-P) wait on a `launch` verdict for their current version. The other 34 are parked (30) or kitchen (4). As fix waves bring lessons to `launch`, their rows lift under the same rule with no new sitting: T1-L/T2-L by a top-up sample, T1-P/T2-P by a row each. Safety work, compared with one-by-one review: 21 sample walks plus 65 per-lesson walks, 86 in all, for the 159 non-kitchen, non-slate, non-parked rows, instead of 159.

**When.** S: as soon as W-1082 and W-1083 are on file. It needs no build. The deploy is the founder's. T1-L's 7: after the 14-walk sweep, B3 (lhw1078, in flight), the fact-checker's re-verify (SO-10-2 d) and SO-10-1 re-QA, so within the next one or two rounds if lane 10 has capacity. T2: after S is published (wave 2 opens), the same sitting can attest the 17 T2-P rows. 3 can publish at once, and 14 after re-QA.

Full lists of every tranche are in the Appendix.

## Attestation (lifehacks-safety-reviewer): slate (carries r1's table, plus row 7)

| Lesson | QA record (date, commit) | Walkthrough commit | Verdict | Record | Signed |
|---|---|---|---|---|---|
| packing-cube-walls | 2026-10-16, 6838dba | | | | |
| pillowcase-set-kit | 2026-10-16, 6838dba | | | | |
| shelf-front-labels | 2026-10-16, 6838dba | | | | |
| rolled-or-folded-volume | 2026-10-16, 6838dba | | | | |
| suitcase-rotate-block | 2026-10-16, 6838dba | | | | |
| rebuild-the-procedure | 2026-10-16, 6838dba | | | | |
| spaced-beats-cram | 2026-10-16, 6838dba | | | | |

Sweep and per-lesson rows go in Sana's own records (`company/reviews/lifehacks-200/safety-launch-sweep-<date>.md` and `company/reviews/<slug>/<date>-safety-launch.md`). She links each one here by adding a line under this table.

## Committed predictions (analytics-steward, before any slate lesson publishes)
| Metric | Prediction | Period | would_be_wrong_if |
|---|---|---|---|
| First revisit recall rate, the slate lessons that publish | **Owed (W-1083).** My expectation, for the steward to test or replace: at or above the feed median, because each recall answer is the number the learner just made on the stage (D9/R6) | 2 weeks | below the feed median on at least 30 first revisits per lesson, or pooled if the steward judges that per-lesson traffic is too thin. The steward sets the sample rule, not me |

## Decision: **wait (stay incubating), with two named inputs and a scaling rule**
- No row passes today. The pass needs two inputs: W-1082 (at least 5 of 7 slate rows signed) and W-1083 (prediction dated). When both are on file, the decision flips to **active** with no new sitting, and the chief of staff may lift exactly the signed slate rows.
- W-1087 is decided (R5): no wait for W-1114.
- The rule for the other 193 rows is R7. 33 can lift in the next cycle. The hold is not the binding constraint for most of the 200. Learner verdicts are.
- Signed: head-of-product (Priya), 2026-10-16. Attestation and prediction pending.

## Objections

| # | Objection | Raised by | What happened to it |
|---|---|---|---|
| 1 | "The founder wants output. Lift the 200 rows once the category passes, since other gates exist." | anticipated, from the dispatch's framing ("held only by the incubation hold") | **Declined, with the numbers.** `company publish` ignores holds and learner verdicts (§1). Lifting in bulk would make about 150 learner-`revise` lessons publishable by hand. Rows lift by R7.5. The cost: the founder sees 33 lessons ready in the next cycle, not about 200. The honest lever for the other 133 is the learner verdicts (fix waves; F-36), not this review. |
| 2 | Sampling 1 in 5 lets an unsafe lesson through. | anticipated, lifehacks-safety-reviewer's lane | **Declined as a reason to review all of them, accepted as a risk with a tripwire.** All 200 had a per-lesson source review on 10-14, and L excludes every trigger and every non-none class. The sample is random, and the reviewer may add lessons. One fail reverts the stratum. If the sweep finds one, I re-sit with the safety reviewer on whether the 10-14 source reviews can be trusted for class at all. |
| 3 | The founder's list of high-risk classes includes "money". Sana's lens puts plain money arithmetic at warning or none, with no per-lesson review. So per-lesson review for all of shopping is stricter than the lens. | head-of-product (on R7.4) | **Accepted as a cost, kept for the first wave-2 publish.** 33 shopping rows are per-lesson. Each row is a walkthrough, and a batch record keeps the overhead low. After the first 17 T2-P rows, if no row needed a change, I propose to Sana that shopping lessons of class none/quantity-only move to L. That decision is hers (class) and mine (gate). |
| 4 | Shipping the slate with "pressed, dimmed" announced to screen-reader users fails exactly those users. | accessibility-reviewer (W-1111 recommendation: ship before the slate if possible) | **Declined as a hold, carried as conditions (R5 a-c).** The reviewer ruled it a defect, not a barrier, and allowed shipping as is with the item recorded. The fix chain runs through a protected-path amendment (W-1128) with no date. If W-1128 is ratified before Sana signs, W-1114 should land first, because that costs one QA run. |
| 5 | Moving recall onto the stage tests recall, not transfer (cm-lifehacks D9 objection). | cm-lifehacks | **Accepted as a cost for the first publish (R6).** The alternative is a trust-sheet label for transfer examples. That route is asked of design-lead (A7), not ordered. |
| 6 | Engine merges keep making QA stale (lhfix-r3 will select every Home lesson). Attestations pinned to one SHA will churn. | head-of-product | **Accepted, answered by R4.** QA re-runs on any merge (it is cheap). Safety re-attests only when the lesson's visible content changed, and the reviewer judges that from the diff. |
| 7 | r1 Objection 5 (nothing mechanical enforces the gate) still stands. With the hold rows now lifting one by one, a hand-run `company publish` is the only remaining hole. | head-of-product (r1, restated) | **Accepted, routed (A8).** Not my scope: a gate change for the principal engineer, by decision record. |

## Asks for the chief of staff to dispatch

| # | Owner role | Item |
|---|---|---|
| A1 | lifehacks-safety-reviewer | **W-1082:** walkthrough attestation of the 7 slate rows on one SHA (R4), sign the table above. Walkthrough first, before this record or any build note. |
| A2 | analytics-steward | **W-1083:** commit the first-revisit-recall prediction for the slate (r5 P1/P2 format), dated before any slate publish. Write it in this record's prediction table or a linked record. |
| A3 | lifehacks-safety-reviewer | **R7 sweep, T1-L:** seeded random sample of 14 (fix 4, storage 4, laundry 2, study 2, travel 2) on the current build, sweep record per R7.3. T2-L (time 4, digital 3) at or after wave 2 opens. Then T2-P per-lesson rows for the 17 named, after their re-QA. Object here if the classes or the sample rule are wrong. Class is yours. |
| A4 | fact-checker | **W-1078 sweep:** one row per lesson in the 33 named rows: does the trust sheet / recall match the stage? Include shoes-opposite-ends (R6) and the 15 resource lessons r1 named. Then re-verify B3's five recall claims (SO-10-2 d). |
| A5 | qa-tester | **SO-10-1** re-QA of the `q` rows above (box-handle-clearance, shoes-opposite-ends, the five B3 lessons after merge, search-the-document-body after its fix, and the 14 stale T2-P rows), on the SHA Sana walks. Re-run the slate if any engine merge lands before it publishes (R4), and again when W-1114 lands (R5 b). |
| A6 | release-manager | When five slate rows are signed and A2 is dated: publish only the signed rows (wave-1 slate plus spaced-beats-cram), with W-1114 named as a known a11y defect in the publish note. Deploy only with the founder's approval of that deploy. |
| A7 | design-lead | Optional (R6): should the trust sheet label a recall that uses new numbers as "a new example", so transfer recalls stop needing D9-style moves? Kit-adjacent, so route to whoever owns `src/lib/trust.ts`. |
| A8 | principal-engineer | r1 Objection 5 / objection 7 here: `company publish` should refuse a lesson in an `incubating` domain, or with a hold, or without a W-843 launch verdict. Decision record. Not urgent while holds stay row by row. |
| A9 | chief-of-staff (self) | Board: W-1087 → done (R5). W-1085: the owner should close it or rewrite it as superseded by TP-1, with what remains in W-1114. W-1171 → done by this record. Lift hold rows only per R7.5 and the evidence records. Never lift a block. |
| A10 | founder (via chief of staff, information) | The binding constraint on Life Hacks output is learner verdicts (164 of 200 not `launch` on their current version), not this review. F-36's reading decides most of the remaining 133. |

## Appendix: tranche lists (HEAD f9265aa, 2026-10-16)

- **S (7):** packing-cube-walls, pillowcase-set-kit, shelf-front-labels, rolled-or-folded-volume, suitcase-rotate-block, rebuild-the-procedure, spaced-beats-cram.
- **T1-L (60).** storage (16): alphabet-sort-search, box-handle-clearance, desk-supply-near-use, duplicates-two-stations, file-fold-see-each-shirt, keys-fixed-drop-zone, labels-specific-address, mug-handle-packing, nested-box-retrieval, rectangular-bin-nesting, round-box-leftover-gap, rug-chair-pullback, seasonal-bin-rotation, shelf-gap-wasted-height, small-items-in-mesh, trays-slide-out-reach. study (10): apply-not-quote, check-confidence-with-output, cover-before-recall, cue-needs-a-boundary, explain-the-link, keep-the-error-feedback, note-gap-check, one-question-one-card, reverse-the-flashcard, separate-confusable-pairs. laundry (10): breeze-is-not-extra-surface, folded-shirt-stack-height, garment-overlap-hides-face, half-size-two-towels, sock-pairing-by-pattern, sock-pairs-not-all-combinations, square-bow-stays-tied, towel-over-two-bars, towel-spread-dries-first, towel-thickness-hidden-volume. fix (20): cm-to-inches, drawer-divider-cost, fragmented-time-does-not-fit, lh-around-versus-across, lh-coverage-whole-cans, lh-each-cut-allowance, lh-material-reuse-account, lh-offcuts-not-one-piece, lh-overlap-material-area, lh-subtract-openings-area, lids-match-by-size, margin-before-cut, measure-diagonal-for-square, measure-inside-not-outside, resize-photo-frame-ratio, ribbon-around-box-length, ruler-start-not-zero, spacer-protects-clearance, tape-mark-same-spacing, wrapping-paper-minimum-area. travel (4): fitted-sheet-corners-nest, jacket-last-first, shoes-opposite-ends, suitcase-layer-access.
- **T1-P (19).** travel: bag-weight-before-volume, socks-use-shoe-space (safety verdict line unreadable by script, so P until Sana says otherwise), tote-balance-sides. laundry: care-label-first-choice, drying-room-water-load, elastic-loop-release, group-cables-with-ends, humidity-evaporation-gap, laundry-gap-air-path, long-cord-knots-itself, wet-knit-hang-stretch. fix: coiled-cord-bend-radius, heavy-book-close-to-back, weight-spread-on-table, wobbly-table-quarter-turn. storage: door-swing-clearance, flat-pack-volume-dimensions, furniture-through-door, sofa-diagonal-room.
- **T2-L (34).** time (19): batch-by-setup, buffer-for-a-late-finish, calendar-needs-travel, choose-the-metric-first, count-setup-in-the-block, dependency-before-priority, do-not-starve-the-long-job, earliest-deadline-first, estimate-a-range, fit-before-fixed-slot, include-the-wrap-up, laundry-sort-before-walk, meeting-and-preparation, one-person-two-jobs, reserve-an-unassigned-slot, short-jobs-clear-a-queue, unlock-the-following-work, work-back-from-a-deadline, work-in-process-limit. digital (15): duplicate-before-experiment, equal-names-not-equal-files, file-modified-not-created, file-type-then-owner, iso-date-filename-sort, link-label-names-the-target, mail-exact-phrase, mail-minus-noise, mail-or-vs-and, project-prefix-filenames, search-the-document-body, shorter-folder-path, size-is-not-recency, tags-are-not-copies, version-nine-and-ten.
- **T2-P (46).** shopping (33): lh-align-price-units, lh-big-pack-price, lh-billing-rounds-hours, lh-buy-only-stock-gap, lh-capacity-batch-count, lh-count-sheets-not-rolls, lh-deposit-checkout-net, lh-discount-round-trip, lh-duplex-sheet-rounding, lh-fixed-coupon-percent, lh-free-shipping-gap, lh-indivisible-shares, lh-jug-rounding-extra, lh-lead-time-stock, lh-merge-overlapping-lists, lh-parcel-fee-repeats, lh-pay-for-used-quantity, lh-percentage-overage, lh-purchase-plus-running, lh-reuse-cost-per-use, lh-round-lines-versus-total, lh-round-replenishment, lh-round-snack-packs, lh-sequential-discounts, lh-split-order-fixed-fee, lh-ticket-bundle-unused, lh-two-for-one-boundary, lh-use-deadline-tickets, lh-visit-fee-crossover, lh-voucher-minimum, lh-weighted-bill-share, lh-weighted-unit-average, lh-weighted-volume-allocation. energy (12): lh-annual-label-cost, lh-duty-cycle-energy, lh-fixed-energy-charge, lh-fixed-volume-fill, lh-flow-duration-offset, lh-flow-times-minutes, lh-idle-versus-active, lh-same-energy-new-tariff, lh-small-leak-large-duration, lh-standby-days-add-up, lh-water-meter-units, lh-watts-hours-trade. digital (1): show-the-file-extension.
- **K (4):** lh-area-scales-square, lh-double-container-radius, lh-scale-recipe-portions, lh-turn-container-volume.
- **Z parked (30):** as listed in `company/reviews/lifehacks-200/triage-r11-park-2026-10-15.md` (5 premise and 25 out-of-scope).

## This would be wrong if
- a `*-safety-launch.md` or a dated prediction exists that my scripts missed (then the pass is closer than stated);
- `publish-ready.mjs`'s W-843 rule is not the operative publish gate for release-manager (then the 34 / 164 split overstates what learner verdicts block);
- the sweep's first stratum turns up a safety fail (then R7.3 is wrong for this domain, and I re-sit).
