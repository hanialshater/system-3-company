# Domain Launch Review: 2026-10-15: Life Hacks (lifehacks), launch gate for the first 5

owner: head-of-product (Priya), chair · attests: lifehacks-safety-reviewer (Sana), **pending** · ratifies in OP: founder
date: 2026-10-15
class: category-or-vertical (domain launch gate: incubating → active; per-lesson go/no-go)
route: head-of-product (chair, this record) → qa-tester (fresh QA on the current build) → lifehacks-safety-reviewer (walkthrough attestation, the signature below) → head-of-product (closes the record) → release-manager (publishes only what this record passes) → founder (ratifies the status change in OP; approves any deploy separately)
recorded-by: head-of-product (Priya)
board: W-586 (this review), W-570 ruling 1 (`company/decisions/2026-10-14-w570-lifehacks-wave-state.md`)
status: **convened, no lesson passed yet.** Six lessons are named as the counted five (plus one spare). Each still needs a current QA record and Sana's signature. Nothing was published or deployed.

## Why this ritual and this template

The charter's launch gate (`company/domains/lifehacks.md`, "Launch gate") says the category stays incubating until the safety reviewer passes the first 5 lessons at **Domain Launch Review**. Life Hacks already entered (founder decision, PR #2), so the template's "Proposal" section is answered by the charter and `company/domains/lifehacks-scope/`. It is not re-argued here. What this sitting decides is the template's last line: incubating → active. The per-lesson gates are the launch-review gates (`templates/launch-review.md`), so they are tabled below.

## Proposal (answered by records already on file)
- Audience and why they would care: `company/domains/lifehacks.md` and `lifehacks-scope/vertical.md`.
- Concepts with demand: `content/curriculum/lifehacks.json`; 200 lessons on disk, 0 published.
- **Checkability:** derivation and fixture arithmetic (`src/lib/lifehacks/*-models.ts`, `resource-specs.json`) and sources for advice lines. The domain can be checked: 30 of the 34 r11 launch candidates have every claim verified. The held advice claims are blocked by web access, not by the domain (see the table).
- Category manager: cm-lifehacks (Tess). Overlap: `lifehacks-scope/curriculum-200.json` `duplicates`.

## What I checked, and how (with the tools, not the dispatch's account)

For each of the 34 r11 launch candidates, with a script that reads meta.json, the review folder and git history (`/tmp/claude-0/-home-user/3e472d64-8589-5167-8584-c47a01ab4321/scratchpad/hop-lh/check.mjs`, scratch only, not kept), and with `node tools/qa-changed.mjs --format=why`:
- **Learner review:** all 34 have `2026-10-15-learner-adult-beginner-r11.md`, `Verdict: launch`, and the lesson version matches meta.json. That matches the dispatch.
- **Claims:** 30 have every claim verified (not by the builder). 4 have one unverified claim each (table).
- **QA:** all 34 have a QA record, and **none is current.** Every record is `2026-10-14-qa.md` from commit de22974 (2026-10-14 13:14Z, build 7). After that, the shared engines changed: c059581 (18:04Z, a11y fixes W-557..W-561: focus, status region, picture text, contrast) and 3dd4d09 (18:45Z, engines v2, W-608: selected-mode display, Seen table, amounts row, control order). `qa-changed.mjs` selects all 34 (`shared file src/components/lifehacks/{HomeLesson,ResourceLesson,SeenTable}.module.css changed since de2297472`). The r11 learners walked the current build. The QA contract has not run on it.
- **Safety:** all 34 have `2026-10-14-safety.md` by Sana. By their own wording these are source-level reviews of PR #2 @ 71e99fee ("not a launch attestation"; "a walkthrough at launch review is still required"), and `lifehacks-scope/safety.md` §5 says the same. Content patches and engines v2 landed after those reviews. So **no lesson has a launch safety attestation.**
- **Accessibility:** `company/reviews/lifehacks-200/accessibility-2026-10-14.md` passes all four engines with fixes (no lock-out). The fixes landed in c059581. No a11y re-check of the current engines is on file. I do not hold on this, because the reviewer did not use the block and the change was the fix itself. The fresh QA run is the check that it did not break.
- **Confidence mark:** blank on all 34, with no `**` claim. Consistent with simulated-learner evidence only.
- **Publish holds:** `company/ops/publish-holds.json` holds no Life Hacks lesson. Today `company status` lists Life Hacks lessons under "Ready to publish" (bag-weight-before-volume, box-handle-clearance, coiled-cord-bend-radius, square-bow-stays-tied, and others). Nothing mechanical enforces the domain launch gate. See Objection 5.

## Rulings

**R1. The counted five come from wave-1 strands.** This review is the wave-1 exit gate (W-570 ruling 1). Wave 1 is laundry, fix, storage, travel and study (charter "Wave order", ordered by safety class). A five drawn from shopping or energy would open the domain on strands that are not open yet. So only wave-1-strand lessons count toward the five.

**R2. Lessons from wave-2 strands may be attested at the same sitting, but they publish only when wave 2 opens.** Wave 2 opens with the counted five plus `spaced-beats-cram` published. **Kitchen (wave 3) lessons do not publish from this review** at all. Wave order was set by safety-review capacity, and publishing is where that capacity gets spent.

**R3. A learner-visible claim that does not match the stage holds the lesson (W-1078).** The trust sheet ("Why trust this lesson") is what the learner reads to check us. The `recall` claims below are true arithmetic for a different fixture, so the fact-checker verified each sum and nobody checked it against the stage. The r11 learner-evaluator called them notes. My call as chair is to hold them, for three reasons. These five define what the domain means by "checkable". Each fix is cheap. Enough clean lessons remain to fill the five. In `search-the-document-body` the claim is plainly wrong about the stage ("The number is in the body"; the remembered detail is the word "telescope").

## Gates per lesson (34 r11 launch candidates)

Columns: claims verified · QA current · safety launch attestation · trust sheet matches stage (W-1078, from the r11 records) · strand/wave.

### The counted slate: wave-1 strands, every gate clear except QA and attestation

| Lesson | Strand (wave) | Claims | QA current | Safety (source review, class) | W-1078 | Decision today |
|---|---|---|---|---|---|---|
| packing-cube-walls | fix (1) | 6/6 ✓ | no | pass, none | matches (r11: "28 × 18 × 8 = 4032 vs 6000 matches the stage") | **pass pending** QA + attestation |
| pillowcase-set-kit | storage (1) | 6/6 ✓ | no | pass, none | consistent (`min(locations, 3)`); the stage should say it, a note | **pass pending** |
| shelf-front-labels | storage (1) | 6/6 ✓ | no | pass, none | none flagged | **pass pending** |
| rolled-or-folded-volume (v2) | travel (1) | 6/6 ✓ | no | pass, none | none flagged | **pass pending** |
| suitcase-rotate-block (v2) | travel (1) | 6/6 ✓ | no | pass, none | none flagged | **pass pending** |
| rebuild-the-procedure | study (1) | 4/4 ✓ | no | pass, none | none flagged | **pass pending** |

There are six because one may fail at attestation or QA. Any five that pass meet the gate.

### Wave-2 strands: gates clear except QA and attestation; may be attested now, publish after wave 2 opens (R2)

lh-align-price-units, lh-big-pack-price, lh-billing-rounds-hours, lh-count-sheets-not-rolls, lh-discount-round-trip, lh-fixed-coupon-percent, lh-lead-time-stock, lh-reuse-cost-per-use, lh-round-lines-versus-total, lh-sequential-discounts, lh-ticket-bundle-unused, lh-visit-fee-crossover, lh-weighted-unit-average (shopping); lh-flow-duration-offset (energy); work-in-process-limit (time); project-prefix-filenames (digital). That is 16 lessons. For each: claims all verified, r11 launch for the current version, safety source review pass (class none, money-arithmetic or quantity-only), QA not current. The r11 records for the 15 resource lessons do not mention the trust sheet either way, so W-1078's sweep must cover them before they publish.

### Held, with the reason

| Lesson | Strand (wave) | Hold | Clears when |
|---|---|---|---|
| ruler-start-not-zero | fix (1) | W-1078: recall "19 − 4 = 15 cm"; the stage shows start 3, end 18 | fact-checker (W-1078) aligns the claim or the builder aligns the stage; claim re-verified; fresh QA |
| ribbon-around-box-length | fix (1) | W-1078: 30×20×10 box with a 25 cm bow (165 cm) vs the stage's 20×10×8 with a 20 cm bow | same |
| seasonal-bin-rotation (v2) | storage (1) | W-1078: 16 vs 4 vs the stage's 28 vs 7 at depth 8 | same |
| rug-chair-pullback | storage (1) | W-1078: 90 cm table (210) vs the stage's 120 cm (240) | same |
| round-box-leftover-gap | storage (1) | W-1078: 30 cm square vs the stage's 20 cm | same; the ~21% belongs on the stage (demo-builder) |
| short-jobs-clear-a-queue | time (2) | W-1078: jobs 2, 8, 20 (12 vs 48) vs the stage's 5, 10, 30 (20 vs 65); also wave 2 | same, then R2 |
| search-the-document-body | digital (2) | W-1078: "The number is in the body" is false for the stage (a word, "telescope"); also wave 2 | same, then R2 |
| lh-idle-versus-active | energy (2) | c6 unverified ("Tariffs and appliance ratings vary: check your own"; no allow-listed energy-regulator host, FC pass 41); safety pass *with changes* | c6 verified (web-capable fact-check, W-556 founder ask); Sana confirms the changes on the walkthrough; then R2 |
| lh-purchase-plus-running | shopping (2) | c6 unverified (same line, same gap); safety pass with changes | same |
| lh-watts-hours-trade | energy (2) | c6 unverified (same line, same gap); safety pass with changes | same |
| lh-double-container-radius | kitchen (3) | Every gate clear except QA and attestation (claims 5/5, safety pass, quantity-only). Held by R2 only: kitchen is wave 3 | wave 3 opens; fresh QA; Sana attests on the walkthrough |
| lh-scale-recipe-portions (v3) | kitchen (3) | c5 unverified (food-safety advice line needs a food-safety body source, FC pass 41); kitchen is review class and wave 3 (R2) | c5 verified, kitchen pattern note (W-578), wave 3 open, and a review-class launch record with a second reader |

## What the safety reviewer must sign (pending attestation)

Sana, for **each** of the six counted lessons (packing-cube-walls, pillowcase-set-kit, shelf-front-labels, rolled-or-folded-volume, suitcase-rotate-block, rebuild-the-procedure), and only **after** qa-tester has filed a passing QA record that post-dates 3dd4d09:
1. Run `npm run walkthrough -- <slug>` on the current build and read it **before** this record's tables or any build note.
2. Write `company/reviews/<slug>/<date>-safety-launch.md` with: the lesson version; the commit walked; `Verdict: pass | pass with changes | fail`; the safety class confirmed against what the stage and hero actually show; whether any required line exists, is on the stage and is recorded as a claim; and that nothing on the stage or hero adds heat, tools, food, chemicals, power, a body, a child or an animal (`safety.md` §1).
3. Sign the table below, on this file, under **Attestation**.

Optional at the same sitting (R2, not counted): the same record for any of the 16 wave-2 lessons. Under `safety.md` §1, class none takes at least a 1-in-5 spot check. Money-arithmetic and quantity-only lessons are the reviewer's call.

**This record passes nothing until five rows below say pass.** When they do, the decision line flips without another sitting: Life Hacks goes from incubating to **active** (founder ratifies in OP), and those five may publish through the normal gates (release-manager; the deploy is the founder's, separately). Wave 2 opens only once `spaced-beats-cram` is also published (W-1075, revise, with demo-builder).

## Attestation (lifehacks-safety-reviewer)

| Lesson | QA record (date, commit) | Walkthrough commit | Verdict | Record | Signed |
|---|---|---|---|---|---|
| packing-cube-walls | | | | | |
| pillowcase-set-kit | | | | | |
| shelf-front-labels | | | | | |
| rolled-or-folded-volume | | | | | |
| suitcase-rotate-block | | | | | |
| rebuild-the-procedure | | | | | |

## Committed predictions (analytics steward, before launch)
| Metric | Prediction | Period | would_be_wrong_if |
|---|---|---|---|
| First revisit recall rate, the counted five | Owed by analytics-steward before any of the five publishes. My expectation for them to test: at or above the feed median, because each recall answer is the number the learner just made on the stage. | 2 weeks | below the feed median on a sample of at least 30 revisits per lesson |

## Decision: **wait** (stay incubating), with a named slate and a closing rule
- No Life Hacks lesson passes today. Every candidate fails "current QA record", and none has a launch safety attestation.
- Slate for the counted five: the six wave-1 lessons above. They pass when QA is current and Sana signs. No new sitting is needed.
- 16 wave-2 lessons are eligible for attestation now. They publish after wave 2 opens.
- 12 are held, with reasons and owners in the table (7 W-1078, 4 unverified claims, 1 kitchen by wave).
- Signed: head-of-product (Priya), 2026-10-15. Attestation pending.

## What would make us retire the domain
Unchanged from the charter and `lifehacks-scope/vertical.md` (strand kill criteria). For this gate specifically: if, after fresh QA, fewer than five wave-1 lessons can be attested safe on the walkthrough, the wave-1 safety classes are not what we thought. In that case I take the wave order and the 200's landing to the founder, not a smaller five.

## Objections

| # | Objection | Raised by | What happened to it |
|---|---|---|---|
| 1 | "The QA contract passed 400/400 on 2026-10-14. CSS and engine changes are cosmetic, so the records still count." | anticipated, from the dispatch's framing ("a current QA record") and release-manager practice | **Declined.** 3dd4d09 changed what the stage shows (selected mode, Seen table, amounts row, control order) and c059581 changed focus and live regions. Those are what the contract checks. `qa-changed.mjs` selects all 34. The cost is one QA run (`QA_ONLY=<the 6 or 22> npm run qa`). |
| 2 | The W-1078 mismatches are true arithmetic, verified, and the learner-evaluator called them notes. Holding them overrides an evaluator's launch. | r11 learner-evaluator verdicts (launch on all seven) | **Declined for this sitting, with the cost accepted.** I am not overriding the learning verdict. I am holding on a trust-sheet claim the learner can see that is about a different fixture (and in one case false). Five of the seven are wave-1 lessons, so the counted slate is thinner (6, not 11). Each clears when W-1078 fixes it. No new review sitting is needed: it rejoins the slate at the next attestation. |
| 3 | R1 and R2 leave 16 lessons ready to publish waiting on `spaced-beats-cram`, a lesson the domain gate does not depend on for safety. That is mostly a fix-and-web-access problem (W-1075). | head-of-product (my own cost, restated from W-570 objection 2) | **Accepted as a cost, not as a reason to drop the rule.** The restated A3 tripwire watches it. At the next OP planning, if wave 2 is not open, I take the wave order to the founder with this exact trade-off: 16 attestable wave-2 lessons wait on one study lesson's revision. |
| 4 | The template's decision words (enter / incubate / wait) were written for new domains, not for a launch gate on a domain that is already in. | head-of-product (on the template) | **Accepted, routed.** I used "wait" in the template's meaning (stay incubating). The wording fix belongs with W-977 (domain-scout, domain-launch template). |
| 5 | Nothing enforces this gate. `company status` lists Life Hacks lessons as "Ready to publish", and `publish-ready.mjs --publish` would publish them with no Domain Launch Review. | head-of-product (found while checking) | **Accepted, routed, not done by me** (gates and ops holds are not my scope). release-manager / chief-of-staff: put every Life Hacks lesson not passed by this record in `company/ops/publish-holds.json` with reason "Life Hacks incubating: Domain Launch Review (company/rituals/records/2026-10-15-domain-launch.md)". A lasting gate, such as `company publish` refusing a lesson in an `incubating` domain without a passing DLR row, is an engineering change for the principal engineer. |
| 6 | The toggle highlight is still inverted after engines v2 (W-598, W-1070; the r11 notes on packing-cube-walls, pillowcase-set-kit, suitcase-rotate-block, shelf-front-labels and rolled-or-folded-volume). Five of the six counted lessons carry it. | r11 learner-evaluator notes | **Declined as a hold, carried as a condition.** The evaluator gave launch with this visible, and on every one of these lessons the result number disambiguates the mode. It must not ship to the first five unfixed if the W-598 ruling (qa-tester) says it is a selection bug and not a hint. Then the fix lands, QA re-runs, and Sana walks the fixed build. |

## Kudos (optional)
- @learner-evaluator (r11 batch): each record names the exact trust-sheet numbers next to the stage's numbers. That turned W-1078 from "some sheets differ" into a per-lesson hold list I could rule on.
