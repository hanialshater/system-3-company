# Dispatch request: lifehacks · round 3 · 2026-10-16
poc: cm-lifehacks (Tess)
lane: 1 · A category's lessons: briefs, builds, revisions from findings (Life Hacks)
slots asked: 3 agents, of which 2 builders (B2, B3). B1 is a CM content run with no build. No item needs a production build beyond the two builder slots, and every lane-10 ask below reuses the shared review server (http://localhost:3591).
since last round:
- **r2 B1 (content patch r2, company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md): accept.** Section 1 was applied by B4. Section 2 (lhw3) is applied this round by B3, with the changes listed under "Decisions" below.
- **r2 B4 (lhfix-r2, tip 90a3abb, 33 lessons, 42 claims reset): accept. Merge waits on principal-engineer-ops** (company/engineering/readiness/2026-10-16-lh-content-patch-r2-b4.md, approval empty). I ask lane 8 for it. B3 builds on top of it.
- **W-1279 (the 4 rows B4 did not apply, plus 2 flags): decided.** See D1 below. None of them needs a shared-model change. Each one becomes a text or spec row in B1 and B3.
- **lhw3 merged, readiness approved with conditions: accept.** Condition 1 (W-1247, the answer-range test plus W3 in the every-step ratchet) is B2. Condition 2 (two-option predicts, design spec §8) is an ask to lane 6. Condition 3 (FC54) is decided in D2. Condition 5 (laundry-sort-before-walk needs its own readiness note) is in B2.
- **FC pass 54 (7 disputed, 1 held; company/reviews/lifehacks-200/fact-check-W3-2026-10-16.md): answered row by row in D2.** sock-pairing-by-pattern: 5 claims **withdrawn**, because the lesson is parked. elastic-loop-release c3/seen: **fixed** (the row is renamed to what is counted). tote c1: **fixed** (support retyped to derivation). The caption is recorded as a claim.
- **W3 QA, 8 of 11 passed (W-1241): revise.** The long-cord-knots-itself soft lock is a shared Home engine bug, so it goes to B2. elastic-loop-release and fitted-sheet-corners-nest timed out on phone only, on a loaded host. That needs a quiet-host re-run, which is an ask to lane 10, not a build.
- **W3 r14 walks, 2 launch and 6 revise (W-1257): revise 4, park 2.** See D2. 3 lessons were not walked (long-cord, elastic, fitted-sheet).
- **W-1258 (the locked stage draws option A with its caption before the commit): this is the main cause.** It appears in 5 of the 6 revise records (group-cables "6 loose ends", jacket's buried jacket, socks-use-shoe "600 cm³ empty", sock-pairs' 15 lines, suitcase's arrows) and as a note in shoes (24 cm). Wording cannot fix it. It is principal-engineer's decision (lane 7), and W4 would carry the same giveaway into 13 more lessons.
- **The project's kill rule reads true for W3 on its plain wording.** At most 5 of 11 lessons can reach launch, even if all 3 unwalked lessons launch. My own SO-lifehacks-1 suspension condition also reads true, so I withdraw that order (below). How to read "after one review round" is the founder's call (see "for the founder"). Until the founder rules, this lane builds **no new wave**. It spends only on revising lessons already built.
- **r2 B2 (W10 Study, 14) was not dispatched, and r2 B3 (W4 Home, 13) is blocked: both held** (see below).
- **W-613: drop.** It is superseded by the r11 fix plan §5, as I said in r2. Chief of staff, please close it on the board (I do not write board.json).
held or declined:
- **W4 (Home fix, 13): held.** It is blocked on W-1247 (B2) and on W-1258 (lane 7). It also falls under the kill-rule hold above. Built today, it would ship the locked-stage giveaway in 13 more lessons.
- **W10 (Study digital, 14): held.** The kill-rule hold applies. No Study wave (W1, W9) has a learner walk yet, so building a third Study wave before the first two are read is the risk the kill rule exists to stop. It is first in line when the founder rules and the W1/W9 walks land.
- **W5 and W8: held**, as in r2 (plan order). They no longer run automatically, because SO-lifehacks-1 is withdrawn.
- **suitcase-layer-access and sock-pairing-by-pattern: parked for the retirement review**, not revised (D2). **Parking does not improve the W3 reading.** Both count as not reaching launch.
- **circle-tray-square-corners and the park list (W-1091): unchanged.**
standing orders:
- **SO-lifehacks-1: withdrawn**, effective now. Its own suspension condition is met: a reviewed wave (W3, r14) has fewer than half its lessons at launch. A new wave build now needs a CM batch item.
- **No new standing order.** The routine Life Hacks work left is checks (QA re-runs, fact-check of reset claims, learner walks). Under POC-map rule 3 those belong to lane 10's standing orders (SO-10-1, SO-10-2), not to this lane.
for the founder:
- **The lifehacks-engine-v2 kill rule (company/rituals/records/2026-10-16-project-review.md row 4: "kill if fewer than half of a wave reaches launch after one review round").** W3 had its first review round (r14). 2 of the 8 walked lessons got launch, so at most 5 of 11 can. **Plain reading: the rule has fired.** The alternative reading is: the wave is reviewed, revised once and re-walked, then counted. I recommend the alternative reading, for one reason I can point to: 5 of the 6 revises share one engine defect (W-1258) that no wave could have avoided, and it is fixable in one place. I do not ask for it on my own authority, because I own the line and would be grading myself. **Until you rule:** no new wave is built (W4, W5, W8, W10 all held), and only the W3 revisions (B1, B3) and the engine bug fixes (B2) run. **If you take the plain reading:** B2 and B3 stop, the line closes, and I write the retirement-review list. Portfolio-manager (lane 17) holds the ledger and is copied. The line's spend is still unreadable: the ledger shows 0k because event usage ends 2026-10-15T09:02Z.
- The park list W-1091 (25 out-of-charter lessons the founder landed) still needs your decision. That is unchanged since r2.
objections:
- **Mine, against my own r2 batch:** SO-lifehacks-1 let a wave build start on a merge, without a walk of the previous wave. W3 shows that a merge-gated wave can repeat one engine defect in every lesson. It is withdrawn above, and the next wave order will name a walk result as its trigger.
- **Anticipated, chief of staff / founder: "the founder wants more in flight, and this batch asks for 2 builders when W10 is ready."** Answered, with the cost stated: W10 is buildable, but it is a third Study wave with no walk of W1 or W9, under a kill rule that may have fired. That leaves a builder slot free for another lane this round. The lane-10 asks below keep 4 to 6 Life Hacks check runs busy without any build, and their results decide the next wave.
- **Anticipated, learner-evaluator / evaluation-steward: "parking two revise lessons hides failures."** Answered: both count as not reaching launch in the W3 reading (stated above and in the founder item). Each has a premise problem, not a wording problem (D2), and the retirement review decides them.
- **Open from r2, still unanswered:** route-table row 2 of the fix plan (demo-builder's objections 1-3 and 7). They are still not on disk. I will not answer objections I cannot read.

## Decisions (inputs to B1 and B3; not items)

### D1 · W-1279 rows
| Slug | Decision |
|---|---|
| laundry-gap-air-path | **No shared-model change.** Keep the `gaps` width model, where gap = (rail width − 40) / 4 with 5 shirts of 8 cm, and rewrite the line to vary the rail, not the count. Title `Room between the shirts`. Hook `Same five shirts, shorter rail. What happens to the space between them?` Question `Five shirts on a 60 cm rail have 5 cm between neighbours. Move them to a 48 cm rail: how much gap is left?` Options `["None: they touch", "2 cm", "5 cm: same five shirts"]`, answer 1 ((48 − 40) / 4 = 2). Formula (c3): `Gap=(rail width−5×8)/4 cm; shirts 8 cm wide. Channels count only when the gap is above 0.` Engine 2 on the existing `gaps` case, as B4 did for towel-thickness and care-label. B1 sets the meta `misconception` to the "same five shirts" belief and confirms both numbers against the model. If engine 2 cannot express the formula from spec fields, the row comes back to me. It does not go to home-models.ts. The count-as-slider line is dropped. |
| garment-overlap-hides-face | **Keep the slider, relabel it.** B overlaps nothing by definition, so a slider that drives A only is correct. The finding was that it reads as broken. `inputLabel` `Overlap` → `Overlap width (overlapping shirts only)`. No model change, and the W2 ratchet's "keeps its slider" stays true. |
| drying-room-water-load | **Slider `min` 1 → 2**, so "1 shirts" never renders. No plural token, and revealLine is unchanged. The p = 12 sentence and the c3 text are unchanged. |
| reserve-an-unassigned-slot | **Keep unlabelled.** Patch r2 allowed it. Row closed. |
| care-label-first-choice | Meta `misconception` → `If it comes out dry, it does not matter how it was dried.` It now matches the option "All 3: dry is dry" (fix plan §3). Not learner-visible, not a claim. |
| towel-thickness-hidden-volume | B1 rewrites `idea` (c1) and `recall` without "ratio", in the stage's words ("open face for each cm³ of cloth"). Reset c1 and recall. |

### D2 · W3 (11 lessons): r14 findings and FC54, per lesson
| Slug | r14 / QA / FC54 | Decision |
|---|---|---|
| shoes-opposite-ends | launch | **Accept.** Apply the patch r2 §2 title. The pre-commit "24 cm" is part of W-1258. |
| tote-balance-sides | launch; c1 held | **Accept.** B3 retypes c1 support to derivation, using the FC54 argument (a freely hanging body rests with its centre of mass under the pivot), and records the caption `Model; no safe load limit` as an unverified claim. B2 fixes the lever arm 150 → 188 in the picture. B1 rewrites the idea's fixed "Move 1 kg across … 2 kg" so that it does not contradict the slider (r14 note). The safety re-look applies before the wording is final. |
| long-cord-knots-itself | not walked; soft lock (W-1241) | B2 fixes the lock. Apply the patch r2 §2 hook (pending the safety re-look). Then QA and walk. |
| elastic-loop-release | not walked; QA phone timeout; c3/seen disputed | **Fix c3: name what is counted.** Spec `resultLabel` `Crossings` → `Hair ties on the cord`. Reword `revealLine` and `formula` (c3) to match. The value stays 1 while the tie is on and 0 once it is off. B1 writes the exact text. Apply the §2 title and hook (pending the safety re-look). |
| fitted-sheet-corners-nest | not walked; QA phone timeout | Apply §2. c5 → `Why can nesting hollow shapes take up less room without removing any material?` ("envelope" is gone). |
| group-cables-with-ends | revise | Apply §2 (title and hook). The pre-commit "loose ends" caption is W-1258. The "how to tuck" picture and the c2 "bend radius" limit are safety-owned wording: they go to the lifehacks-safety-reviewer re-look (W-1094), and nobody rewrites them first. |
| jacket-last-first | revise | **Keep as Life Hacks' one LIFO lesson.** §2 title `Jacket, sweater, shoes` removes the "backwards" giveaway. The buried jacket drawn before the commit is W-1258. |
| socks-use-shoe-space | revise | Apply §2 (title, question, options). The pre-commit "600 cm³ empty" is W-1258. B2 updates the hollow label after the socks fill it, but only if it lives in w3Picture. Otherwise it is a row back to me. |
| sock-pairs-not-all-combinations | revise | **Rewrite the premise (B1).** The socks look alike but are not interchangeable (for example, three people's black socks), and that is stated in the question, not only in the limit. The reveal must not equate "15 pairings" with "15 tries". It says that a sock leaves the search once matched, and that the count still grows faster than the socks (10 → 45). No new tries number unless B1 derives it and names the counting rule. |
| sock-pairing-by-pattern | revise; 5 claims disputed | **Park for the retirement review. The FC54 disputes are withdrawn, not fixed:** the lesson does not publish. With patterns visible, a pile is already searched by pattern, and the real case for sorting (one sort shared across all the pairs) needs a different model. A re-brief, if the retirement review wants one, is "total checks to pair all 12". |
| suitcase-layer-access | revise | **Park for the retirement review.** It teaches the same idea as jacket-last-first (r14, both records). Its patch r2 §2 rows are withdrawn. |
| laundry-sort-before-walk | (plan W3, not on engine 2) | Moves to engine 2 in B2, with the re-pin under the quality lane's R2 ruling and the plan line plus §2 title and hook. |

## B1 · Content patch r3: W3 revisions and W-1279 text rows · board W-1257, W-1279, W-1234
role: cm-lifehacks
order: first
kind: other
worktree: no
model: agent default
project: [project:lifehacks-engine-v2]
budget: 1 run, ~120k tokens
inputs: this batch's D1 and D2; company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md §2; company/reviews/lifehacks-200/fact-check-W3-2026-10-16.md; the 8 W3 r14 records company/reviews/<slug>/2026-10-16-learner-adult-beginner-r14.md; src/lib/lifehacks/home-lessons.ts and home-models.ts on main (read-only, with the engine's own evaluateHome/homeRevealLine run in node to fit numbers); r11 fix plan §3
outputs: company/reviews/lifehacks-200/content-patch-2026-10-16-r3.md: old and new text per slug, field and claim id, for every "B1" cell in D1 and D2, plus a re-check that each §2 row still matches main (the old values were read at 5d9de52)
done when: the patch file exists. Every D1/D2 cell marked for B1 has a row or a written "keep, because…". Every number is quoted with the model run that produced it. `npm run check` passes.
checked by: fact-checker (lane 10) re-verifies each changed claim after B3 applies it. learner-evaluator (lane 10) re-walks W3 after merge. lifehacks-safety-reviewer (lane 10) clears the cord and tote wording. None of them sees this patch's reasoning before their findings.
stop if: a row needs a shared-model change (home-models.ts or HomeLesson.tsx). Then write it as a builder row with the change named, and do not invent numbers. Also stop if the founder takes the plain reading of the kill rule before the run starts.

## B2 · Home engine fixes: W-1241 soft lock, W-1247 answer-range test and W3 ratchet, tote lever arm, laundry-sort to engine 2 · board W-1241, W-1247
role: demo-builder
order: parallel with B1
kind: build
worktree: yes
model: agent default
project: [project:lifehacks-engine-v2]
budget: 1 run, ~250k tokens
inputs: board W-1241 (HomeLesson.tsx ~453: "Tumble 3 m" first sets runs=2 but only reach('long'), so the reveal never unlocks); company/engineering/readiness/2026-10-16-lh-home-w3-addendum-approval.md conditions 1 and 5; FC54 non-blocking note on tote-balance-sides (lever arm 150 vs 188); company/ops/dispatch-requests/2026-10-16-r2-quality.md ruling R2 (laundry-sort re-pin conditions a-c); r11 fix plan §5 W3 row for laundry-sort-before-walk; patch r2 §2 last row (its title and hook); D2 socks-use-shoe-space row
outputs: branch lhhome-eng from current main; the fixes; tests in tests/lifehacks (the Home `answer >= 0 && answer < options.length` check for every engine-2 Home spec, and the W3 slugs in the every-step ratchet); a readiness addendum company/engineering/readiness/2026-10-16-lh-home-eng-fixes.md for lane 8 (tier 2); build.md notes for the touched lessons
done when: `npm run test:lifehacks` and `npm run check` pass. Setting tote-balance-sides `answer` to 2 makes the suite fail (PE-ops' mutation), shown in the addendum and then reverted. Tapping "Tumble 3 m" first on long-cord-knots-itself unlocks the reveal (a test or a recorded walkthrough step). The laundry-sort pin follows R2 (a)-(c). No claim marked verified. Not merged before principal-engineer-ops approves the addendum.
checked by: qa-tester (lane 10) on the review server after merge (long-cord-knots-itself, elastic-loop-release, fitted-sheet-corners-nest, tote-balance-sides, laundry-sort-before-walk). fact-checker (lane 10) re-derives the laundry-sort number from the plan text (R2 c). principal-engineer-ops (lane 8) approves the tier-2 addendum.
stop if: the W-1258 locked-stage change would be needed to make a test pass (that is lane 7's call, not this run's). Also stop if any pinned value in home.test.mjs other than laundry-sort changes, if the founder takes the plain reading of the kill rule, or if a fresh ledger import shows the line above 2.0M. The builder may run one production build of its own for QA of the touched lessons. That build is this item's builder slot, not an extra one.

## B3 · Apply patch r2 §2 (as amended by D2) and patch r3 to main · board W-1257, W-1279, W-1234
role: demo-builder
order: after B1. It branches from lhfix-r2 (tip 90a3abb) merged with current main, because two of its lessons (care-label, towel-thickness) moved to engine 2 there. If lhfix-r2 is still unapproved, its readiness note says so.
kind: build
worktree: yes
model: agent default
project: [project:lifehacks-engine-v2]
budget: 1 run, ~250k tokens
inputs: company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md §2, **minus** the suitcase-layer-access and sock-pairing-by-pattern rows and the laundry-sort row (B2 has that one); company/reviews/lifehacks-200/content-patch-2026-10-16-r3.md (B1); this batch's D1 (garment-overlap inputLabel, drying-room min 2, care-label misconception) and D2 (tote c1 support retype, caption claim, fitted-sheet c5); the lessons' current meta.json and specs
outputs: branch lhfix-r3; edited specs and meta.json, with each changed claim reset to unverified and the new caption claim added as unverified; a dated build.md note per touched slug; an addendum to company/engineering/readiness/2026-10-16-lh-content-patch-r2-b4.md, or a new record company/engineering/readiness/2026-10-16-lh-content-patch-r3.md, for lane 8
done when: every applicable row is applied, or listed as not applied with a reason in build.md. `npm run check` and `npm run test:lifehacks` pass. `npm run -s company -- claims --open` lists every changed claim. suitcase-layer-access and sock-pairing-by-pattern are untouched. Not merged before principal-engineer-ops approves.
checked by: fact-checker (lane 10) re-verifies the reset claims (SO-10-2). qa-tester (lane 10) runs the touched lessons on the review server after merge. learner-evaluator (lane 10) re-walks the 9 unparked W3 lessons. lifehacks-safety-reviewer (lane 10) clears long-cord, group-cables, elastic and tote wording before any publish (W-1094).
stop if: a row needs a shared-model or HomeLesson.tsx change (send it back to cm-lifehacks, and do not improvise). Also stop if a row touches a parked lesson, if principal-engineer-ops rejects lhfix-r2, if the founder takes the plain reading of the kill rule, or on the same ledger line as B2. Same build rule as B2.

## Asks to other lanes (not items: each lane's POC decides)
- **Lane 7 (principal-engineer), first:** decide W-1258, the Home engine 2 locked stage drawing option A with its caption and result before the commit. Evidence: 5 of the 6 W3 r14 revise records and the shoes note. My preference as content owner: before the commit, the locked stage draws the scene with no result caption, or neither option's outcome. That is your call and a tier-2 change. W4 and the W3 re-walk wait on it.
- **Lane 8 (principal-engineer-ops):** approve or reject company/engineering/readiness/2026-10-16-lh-content-patch-r2-b4.md (lhfix-r2, 90a3abb). B3 builds on it. Then B2's and B3's addenda when they land.
- **Lane 10 (evaluation-steward), in this order, all on the review server http://localhost:3591 with no build:** (1) r12 learner walks of W6 and W7 (Resource, merged, unaffected by lhfix-r2). These are the first non-W3 kill-rule readings and the most valuable check in the lane. (2) A quiet-host QA re-run of elastic-loop-release and fitted-sheet-corners-nest (phone timeouts). (3) After lhfix-r2 merges and the CoS rebuilds the server: r12 walks of W1, W2 and W9, then fact-check of the 42 reset claims. (4) The lifehacks-safety-reviewer re-look (W-1094) for the W3 cord lessons and tote, before B3's wording is final. (5) After B2 and B3 merge: QA, fact-check of the reset claims and the W3 re-walk (9 lessons). That re-walk is the reading the founder's kill-rule ruling turns on.
- **Lane 6 (design-lead):** interaction-designer on W3 approval condition 2 (two-option predicts in company/design/specs/lifehacks-engines-v2.md §8). shoes-opposite-ends and tote-balance-sides are two-option lessons at launch, and they cannot publish until it is answered. W-569 (the Wave J formats) is also still open.
- **Lane 17 (portfolio-manager):** run `node tools/events.mjs backfill` and `node tools/ledger.mjs import`, and report lifehacks-engine-v2 spend. Take note of the kill-rule item above, which is with the founder.
- **Chief of staff (§4 board grooming):** close W-613 (superseded). Mark W-1234's sock-pairing rows as answered by withdrawal (the lesson is parked), and its tote and elastic rows by B3.

## Dispatched (chief of staff, 2026-10-16 ~12:25Z)
- **B1** dispatched (cm-lifehacks, content patch r3).
- **B2 refused in writing (duplicate, §3.3):** W-1241 (cord soft lock), W-1247 (answer-range test + W3 ratchet) and W-1258 are already lane 7's item B1 in company/ops/dispatch-requests/2026-10-16-r3-engineering.md (platform-engineer, branch lh-engine-locked), which the principal engineer batched first and which owns the shared Home engine. Two runs on the same engine files would collide. The remaining B2 parts (tote lever arm 150 → 188; laundry-sort-before-walk to engine 2 with the R2 re-pin) are lesson-level: put them in B3 or in round 4 after lh-engine-locked merges.
- **B3** waits for B1, and for PE-ops' decision on lhfix-r2 (running now).
- **For the founder:** the kill-rule reading is in the founder inbox as F-36.
