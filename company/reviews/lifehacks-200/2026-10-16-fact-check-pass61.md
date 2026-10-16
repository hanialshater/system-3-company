# FC pass 61: Life Hacks set A (SO-10-2, [project:lifehacks-engine-v2])

- **Checker:** fact-checker (independent instance; wrote none of these claims). 2026-10-16.
- **Order:** SO-10-2 trigger (d), the claims B4 reset (company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md, section 1), plus every other open claim of these 24 lessons. The other Life Hacks lessons belong to a parallel fact-checker run.
- **Target:** shared review server http://localhost:3591, `BUILT_FROM` = `git -C /home/user/s3c-qa rev-parse HEAD` = 5b2fee71701e8645e3cd6e2fde60bcea004833e8 at start and end. R3a (`company/reviews/org/2026-10-16-r3a-scope/check.sh 5b2fee7 src/demos/lifehacks/<slug> HEAD`): **24/24 pass** at main 2d6b4d5.
- **Method:** `npm run walkthrough -- <24 slugs> --url http://localhost:3591`. I read each transcript cut at the appendix first, then claims against studyCatalog.ts / home-lessons.ts / resource-specs.json / RetrievalLesson.tsx on main. I re-ran every number in node with the engine's own functions (queueResult, evaluateHome, homeRevealLine, recallColumn) through tests/lifehacks/register.mjs. Sources opened this pass: OpenStax College Physics 2e §14.6 Convection (CNXML m42229, sha256 8d5d1f356fe442d5…) and §13.6 (m42219, sha256 4d622c5f94e29a69…) via raw.githubusercontent.com/openstax/osbooks-college-physics-bundle. Blocked this pass: nhs.uk, gov.uk, ofgem.gov.uk, energy.gov, ginetex.net (proxy 403 / curl 000).
- **Batch size note:** 24 lessons and 33 claims, which is over SO-10-2's 15-lesson batch limit (claims are within 40). The caller assigned this set.

## Counts

33 claims: **23 verified, 6 disputed (3 new, 3 standing and unchanged), 4 held**.

## Verdicts

| Claim | Verdict | Basis / fix |
|---|---|---|
| batch-by-setup.c1 | **DISPUTED** | The key "2 minutes" is the finish-time saving (19 → 17), but the stage only shows **Total waiting**: 21 → 17, a 4-minute drop. That makes the "4 minutes" distractor what the stage reports. Fix: cm-lifehacks rewords the line to the stage's metric (key 4 minutes), or the stage and question show finish times; demo-builder implements. |
| breeze-is-not-extra-surface.c4 | VERIFIED | Text = spec = page; key supported by OpenStax §14.6 (opened): air flow replaces saturated air and evaporation continues. |
| breeze-is-not-extra-surface.recall | VERIFIED | 1.5 × 2 = 3, area unchanged; key unique. |
| care-label-first-choice.c4 | VERIFIED | Model p=3: hung 0, flat 3; definitional ("dry flat" ≠ hung). GINETEX not opened and not relied on. |
| care-label-first-choice.seen | VERIFIED | homeRevealLine p=3 exact. |
| check-confidence-with-output.c1 | VERIFIED | Text = spec = page; mode A "not checked". |
| choose-the-metric-first.c1 | VERIFIED | Hook true: waits 25 / 1 late vs 35 / 0 late. |
| cover-before-recall.c1 | VERIFIED | Text = spec = page. |
| dependency-before-priority.c1 | VERIFIED | Text = spec = page; 0 vs 1 breaches. |
| do-not-starve-the-long-job.c1 | VERIFIED | Short first: long ends 35 > 25, late; waits 15 vs 55. |
| drying-room-water-load.c3 | VERIFIED | = spec.formula; 12 × 250 = 3,000 g; no room shown. Non-blocking: "1 shirts" at p=1 (already a builder row). |
| drying-room-water-load.c6 | HELD | Health line; housing or public-health body hosts blocked. Passes 41 (PMC papers, "verified" in note) and 52 (held) disagree. That needs an evaluation-steward ruling. |
| earliest-deadline-first.c1 | VERIFIED | Quickest first: urgent ends 15 > 10. |
| estimate-a-range.c1 | VERIFIED | 25-minute run overlaps call by 5. |
| explain-the-link.c1 | VERIFIED | Text = spec = page. |
| fit-before-fixed-slot.c1 | VERIFIED | Only 30–55 fits. |
| folded-shirt-stack-height.c4 | VERIFIED | 4 cm → 8 cm. |
| garment-overlap-hides-face.c4 | VERIFIED | 1,800 → 3,600 cm² hidden. |
| half-size-two-towels.c4 | VERIFIED | 1.92 m² both ways. |
| humidity-evaporation-gap.c4 | VERIFIED | 20 vs 60. |
| humidity-evaporation-gap.recall | VERIFIED | 60 / 20 = 3; OpenStax §13.6 (opened): evaporation inhibited by high humidity. |
| include-the-wrap-up.c1 | VERIFIED | Done at 40. |
| keep-the-error-feedback.c1 | VERIFIED | Text = spec = page. |
| keep-the-error-feedback.c3 | **DISPUTED** | Chips say "First try" but report the stipulated try 3 (stage: "3 tries"; reveal: "Try 4"). After one retry the page shows "4 tries · ✗ ✓ ✗" beside "First try, marked: 1 wrong". Fix: cm-lifehacks words + demo-builder (RetrievalLesson.tsx FeedbackStage Chips) label them "Try 3, …" / "Starting try, …". |
| keep-the-error-feedback.c4 | **DISPUTED** | The rest re-runs as quoted. The appended "The two chips report the first try" is false in the fixture's numbering. Same fix as c3. |
| lh-duty-cycle-energy.c6 | HELD | Blocked hosts only (W-556 exclusion); safety-hedge ruling still open. |
| lh-fixed-energy-charge.c6 | HELD | Same. |
| lh-fixed-energy-charge.c7 | VERIFIED | Hook; €10 fixed charge = tariff A. |
| lh-fixed-energy-charge.c8 | VERIFIED | A(40) €18, A(20) €14, €9 = misconception; question names the bill. Non-blocking: reveal reports "At the prediction's 40kWh" and never the 20 kWh bill. |
| lh-pay-for-used-quantity.c6 | HELD | SO-10-2 stop-if (fact-checker-authored claim, W-1108). Independent arithmetic agrees (€0.50 vs €4/5 = €0.80; Singles). |
| cue-needs-a-boundary.seen | DISPUTED (standing) | Unchanged since pass 41 (recallColumn Match row; page "match 0/3"). W-610 / interaction-designer. |
| elastic-loop-release.c3 | DISPUTED (standing) | Unchanged since pass 54; page still "crossings 1 / 0". demo-builder. |
| elastic-loop-release.seen | DISPUTED (standing) | Same as c3. |

## Patch rows checked against the merged engine

All B4 rows for these lessons are applied on main as written (title, hook, question, options, answer, recall), except the rows B4's commit message says it deferred. The patch row's "4 minutes is the slip of removing both switches" (batch-by-setup) does not hold on the stage as built, which reports waiting rather than finish time. The patch did not catch this. The patch's own `queueResult` run gives the 19/17 finish times, and the stage displays the 21/17 waiting sums.
