# Dispatch request: lifehacks · round 2 · 2026-10-16
poc: cm-lifehacks (Tess)
lane: 1 · A category's lessons: briefs, builds, revisions from findings (Life Hacks)
slots asked: 4 agents, of which 3 builders
since last round:
- W3 builder (branch lhw3, /home/user/s3c-lhw3, tip 5d9de52, 11 Home lessons, tier-2 engine change: Home v2 accepts 2 options): **accept, merge held**. It is not merged until principal-engineer-ops approves company/engineering/readiness/2026-10-16-lh-home-w3-addendum.md (on the branch), reviewing tip 5d9de52 whole, never 8a9df55 alone. That is an ask to lane 8. The W-1192 follow-ups are routed under "asks to other lanes" below. The W3 hooks and titles that hint answers are my content, so they go into B1.
- Waves W1, W2, W6, W7, W9 merged: **accept**. None has had its r12 learner walk yet, so the project's kill rule (fewer than half of a wave reaching launch after one review round) cannot be read for any wave. Getting those walks is the most valuable check in the lane this round (ask to lane 10).
- Slate QA 17/17: **accept**. The Domain Launch Review is chaired by head-of-product (W-1171, W-1082, W-1083). It is not this lane's item.
- FC52, 128 verified and 4 disputed: **revise (B1 writes the rewordings, B4 applies them)**. The disputes block publishing (W-1179).
- Park list (25 lessons outside the charter, W-1091): **unchanged, waiting on the founder**. Nothing in this batch touches a parked lesson.
held or declined:
- **W5 (Home, storage, 15).** Held until W4 has merged. It runs under SO-lifehacks-1 then, so I am not asked again.
- **W8 (Resource, kitchen, 14).** Held. It comes last in the plan's order, and kitchen cannot publish before wave 3. It runs under SO-lifehacks-1 after W10 merges.
- **circle-tray-square-corners (W-753, W-844 circle part, W-994).** Declined: the lesson is parked for a premise problem (triage-r11-park-2026-10-15.md). The retirement review decides it, not a rewording.
- **Life Hacks Wave J briefs, ranks 6-14 (W-572).** Not in this batch. Wave J slugs belong to lane 2 under the POC map. W-569 (interaction-designer confirms the formats) is the only hold on ranks 6, 7 and 10. That confirmation is an ask to lane 6, listed below, because W-401 (HoP A2, binding) puts interleaved-practice and learning-styles-debunk first among new Life Hacks concepts.
- **W-613 (v2 lines for the ~186 unreviewed lessons).** Superseded by the r11 fix plan's per-wave lines (company/decisions/2026-10-15-lifehacks-r11-fix-plan.md §5). I will close it on the board at the next CM run.
standing orders:
- **SO-lifehacks-1 (new).** Trigger: a Life Hacks fix-plan wave merges to the integration branch. Role: demo-builder, worktree yes. Action: build the next unbuilt wave of the same template lane, in fix-plan §5 order (Home: W5 after W4. Resource: W8 after W10 has merged, so that Study and kitchen come in plan order). Size: one wave per dispatch, at most 2 SO builds in flight. Tag: [project:lifehacks-engine-v2]. Inputs: the wave's table in company/decisions/2026-10-15-lifehacks-r11-fix-plan.md §5, plus company/design/specs/lifehacks-engines-v2.md. Done check: every slug in the wave has a `build.md` dated that day under company/reviews/<slug>/, `npm run check` passes in the worktree, and `npm run test:lifehacks` passes. **Tier 1 only:** if the wave needs a change to shared engine code under src/components/lifehacks/ or src/lib/lifehacks/, the builder stops before merging and writes a readiness addendum for lane 8. That run then leaves the standing order and comes back to me. **Suspended** while the kill rule reads true for any reviewed wave (fewer than half its lessons with a launch verdict in r12), or while the ledger shows the line above 2.0M of 3.0M. Expiry: 2026-10-20 or 3 rounds, whichever comes first.
for the founder: the park list W-1091 (25 lessons outside the charter that the founder chose to land; retire or re-scope) still needs the founder's decision. Under §5 it is a scope call on founder-landed work. Nothing else: no deploy, no spend above the tranche, no waiver.
objections:
- **Raised by me, for portfolio-manager (lane 17): the line's real spend is unknown.** `node tools/ledger.mjs report --project=lifehacks-engine-v2` shows 0k spent because event usage ends at 2026-10-15T09:02Z. Waves W1-W9 were built after that, so the 3M kill rule ("or 3M spent before waves W1-W9 are reviewed") cannot be read today. B2, B3 and SO-lifehacks-1 each stop if a fresh import puts the line above 2.0M. Recorded here and in each item's stop-if.
- **Anticipated, chief of staff: is cm-lifehacks a dispatchable role in lane 1?** The POC map lists "the CM's strand managers; demo-builder". Life Hacks has no strand managers. B1 is the CM's own content work: the fix plan's objection table rules that builders do not write predict lines. Lane 8 likewise runs principal-engineer-ops' own runs. If the chief of staff refuses B1 on the role check, B4 waits a round, and I ask Leonie (lane 18) to add the CM's own runs to row 1 of the map. B2 and B3 do not depend on B1.

## B1 · Content patch: FC52 and FC38 disputes, and answer-hinting hooks and titles for W1, W2, W3, W9 · board W-1179
role: cm-lifehacks
order: first
kind: other
worktree: no
model: agent default
project: [project:lifehacks-engine-v2]
budget: 1 run, ~180k tokens
inputs: company/reviews/{unlock-the-following-work,keep-the-error-feedback,breeze-is-not-extra-surface,drying-room-water-load,square-bow-stays-tied}/2026-10-16-fact-check.md (FC52 disputes, W-1179); company/reviews/lh-fixed-energy-charge/2026-10-14-fact-check.md c8 (W-1106); company/reviews/check-confidence-with-output/2026-10-14-fact-check.md .recall (W-755); board W-1118 (Study W1/W9 hooks, titles that point to the answer, lines that did not fit), W-1109 (Home W2 lines that did not fit, hinting titles, 'flux' and 'normalised gap' in recall), W-1192 (W3 hooks and titles that hint answers: read them from /home/user/s3c-lhw3 at tip 5d9de52, read-only), W-1088 (brief 2 confound line); company/decisions/2026-10-15-lifehacks-r11-fix-plan.md §3 (line rules) and §5
outputs: company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md (old and new text per slug and field, with the claim id where the text is a claim). Two sections: "merged (W1, W2, W9 + disputes)" and "lhw3 (W3)". Also the brief-2 amendment in company/domains/briefs/lifehacks.md (W-1088).
done when: the patch file exists. Every slug named in W-1179, W-1106, W-755, W-1118, W-1109 and the W3 hint list has a row with new text or a written "keep, because…". `npm run check` passes.
checked by: fact-checker (lane 10) re-verifies each changed claim after B4 applies it. learner-evaluator (lane 10) reads the new hooks in the r12 walks. Neither sees this patch's reasoning before their findings.
stop if: a dispute can only be fixed by changing the stage model (not the words). Then write it as a builder row with the model change named, and do not invent numbers. Also stop if a line touches heat, cords, loads or money advice in a way the charter's safety classes cover: mark it for the lifehacks-safety-reviewer (lane 10) and do not ship the wording as final.

## B2 · W10 Study digital wave (14 lessons) with TP-6 and TP-8 · board W-1092
role: demo-builder
order: parallel with B1
kind: wave
worktree: yes
model: agent default
project: [project:lifehacks-engine-v2]
budget: 1 run, ~450k tokens
inputs: company/decisions/2026-10-15-lifehacks-r11-fix-plan.md §2 (TP-6, TP-8) and §5 "W10" table (prediction lines are final; the builder fills [N] from the model and does not reword); company/design/specs/lifehacks-engines-v2.md; company/product/demo-standard.md; board W-1092
outputs: the 14 W10 lessons under src/demos/lifehacks/<slug>/ (Demo.tsx, meta.json with claims reset to unverified where the text changed), company/reviews/<slug>/build.md per lesson, a branch named lhw10
done when: all 14 slugs have a build.md dated that day. `npm run check` and `npm run test:lifehacks` pass in the worktree. No claim is marked verified by the builder. The correct option is not in the same position in more than 9 of the 14 specs (TP-8).
checked by: qa-tester, fact-checker (reset claims) and learner-evaluator (r12, walkthrough first), all lane 10
stop if: TP-6 needs a change to shared Study engine code (src/components/lifehacks/ or src/lib/lifehacks/). Then write a readiness addendum at company/engineering/readiness/2026-10-16-lh-study-w10-addendum.md for lane 8 and do not merge. Also stop if a prediction line does not fit the model: list it for cm-lifehacks and leave it unchanged, never improvise. Also stop if a fresh ledger import shows lifehacks-engine-v2 above 2.0M, or if an r12 walk of W1 or W2 lands with fewer than half launch before you start.

## B3 · W4 Home fix wave (13 lessons) on two-option Home v2 · board W-1192
role: demo-builder
order: parallel with B1, **only once lhw3 is merged** (PE-ops approval of the W3 readiness addendum). Until then it waits in this batch's order. It does not start on the unmerged branch.
kind: wave
worktree: yes
model: agent default
project: [project:lifehacks-engine-v2]
budget: 1 run, ~450k tokens
inputs: company/decisions/2026-10-15-lifehacks-r11-fix-plan.md §2 (TP-1, TP-2, TP-8) and §5 "W4" table (lines final; fill [N] from the model); company/design/specs/lifehacks-engines-v2.md; the merged two-option Home v2 code; company/reviews/wobbly-table-quarter-turn/2026-10-13-safety.md (its conditions stay: no cup in the hero, the 35-degree figure as a math limit only, the hot-drink note)
outputs: the 13 W4 lessons under src/demos/lifehacks/<slug>/, company/reviews/<slug>/build.md per lesson, branch lhw4
done when: all 13 have a build.md dated that day. `npm run check` and `npm run test:lifehacks` pass in the worktree. "Model; no safe load limit" is still on heavy-book-close-to-back. No 'turning moment' appears on screen. No builder-verified claims.
checked by: qa-tester, fact-checker and learner-evaluator (lane 10). lifehacks-safety-reviewer (lane 10) re-looks heavy-book-close-to-back, weight-spread-on-table and wobbly-table-quarter-turn before r12 (W-1094).
stop if: lhw3 is not merged when the run starts. Also stop if W4 needs any further shared Home engine change (then write the readiness addendum for lane 8 and do not merge). Also stop on a line that does not fit the model (list it for cm-lifehacks). Also stop on the same ledger and r12 conditions as B2.

## B4 · Apply the B1 content patch to merged lessons (W1, W2, W9 and the FC52/FC38 disputes) · board W-1179
role: demo-builder
order: after B1
kind: build
worktree: yes
model: agent default
project: [project:lifehacks-engine-v2]
budget: 1 run, ~220k tokens
inputs: company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md, section "merged" only; the lessons' current meta.json and specs
outputs: edited src/demos/lifehacks/<slug>/ specs and meta.json (each changed claim reset to unverified), a dated build.md note per touched slug, branch lhfix-r2
done when: every "merged" row in the patch is applied or listed as not applied with a reason in build.md. `npm run check` and `npm run test:lifehacks` pass. `npm run -s company -- claims --open` lists every changed claim.
checked by: fact-checker (lane 10) re-verifies the changed claims and closes the four FC52 disputes. qa-tester (lane 10) runs the touched lessons.
stop if: a row needs a stage-model change the patch does not specify. Also stop if a row touches a lesson on lhw3 (the W3 section is applied by the W3 builder after merge, not here) or a parked lesson.

## Asks to other lanes (not items: each lane's POC decides)
- **Lane 8 (principal-engineer-ops):** approve or reject company/engineering/readiness/2026-10-16-lh-home-w3-addendum.md on branch lhw3, reviewing tip 5d9de52 whole. This gates the lhw3 merge and B3. Later, the same for any addendum B2 writes.
- **Lane 6 (design-lead):** interaction-designer review of the two-option Home v2 (W-1192). Also W-569: confirm the formats of Life Hacks Wave J ranks 6, 7 and 10. That is the only hold left on interleaved-practice and learning-styles-debunk (W-401).
- **Lane 10 (evaluation-steward), in this order:** (1) r12 learner walks, walkthrough first, of merged waves W1, W2, W6, W7 and W9. These decide the kill rule and the fix plan's "wrong if" line, so they matter most. W6 and W7 (Resource) can go now. For W1, W2 and W9, walking after B4 applies the hook fixes avoids findings already known. (2) QA of each merged wave without a current QA record, and of lhw3 after merge. (3) A fact-check re-verify of the reset claims on lhw3 (W3) and on B4's changed claims, closing the four FC52 disputes. (4) The test pin for laundry-sort-before-walk (tests/lifehacks/home.test.mjs:63) against the W3 model. (5) lifehacks-safety-reviewer re-looks under W-1094 for the W3 cord lessons and the W4 load and door lessons. These suit a lane-10 standing order. A lane-1 standing order may not dispatch checkers (POC map rule 3).
- **Lane 17 (portfolio-manager):** run `node tools/events.mjs backfill` and `node tools/ledger.mjs import`, then report lifehacks-engine-v2 spend. The 2.0M stop line in B2, B3 and SO-lifehacks-1 depends on it.
