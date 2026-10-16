# Dispatch request: Verticals and Wave J · round 2 · 2026-10-16
poc: principal-pm-verticals (Selin)
lane: 2, Verticals and the cross-category portfolio: Wave J, new-category pipeline steps 1-2
slots asked: 3 agents, of which 2 builders
since last round: Lane 2 had no round-1 batch. One result has come back since the map took effect. **Wave J physics #61-63** (builder-wavej-pr1, 3516c4e, merged 2e2ccd9): electron-speed-in-a-wire, second-speaker-decibels and what-pushes-the-car are in `review` with all 17 claims unverified. The builder's local QA contract passed 6/6 and reveal-fit passed 3/3 (phoneFit). **Accept.** The checks go to lane 10 (ask 1 below). The open 25-word stage budget (stages at 41/30/31 when number tokens are counted) goes to cm-physics (ask 4). Board W-1185.
held or declined: (1) **New Wave J builds are held this round**, including physics #64-68 (two-batteries-side-by-side, clap-at-the-cliff, scale-on-a-slope, longest-drinking-straw, power-line-voltage-loss), which are ready in company/domains/briefs/physics.md round 4. The reasons are below, under "The call this round". Release trigger: B1's 15 flips are published (or scheduled at a launch review), cm-physics has ruled the stage budget (ask 4), and Wave J tokens per published lesson is measured (ask 6). The first item next round would be a 5-brief physics build. (2) **domain-scout: W-977 and the unscouted-fields pass are held.** The founder has not chosen the next category (W-685), and review capacity is the constraint (failure mode: a vertical per week). W-008 and W-662 are held for the same reason. (3) which-sea-gets-the-rain is not flipped: its r10 verdict is revise, and no re-walk exists yet. It goes into B2.
standing orders: none. The one routine job in this lane, flipping gate-clean Wave J drafts, is not on §2.3's allowed list, and an "In review" lesson is visible to learners, so I keep it a batch item. Lane 10's checks of Wave J work run under Hilde's standing orders, not mine.
for the founder: none. Publishing is lane 11's job and no item deploys. Deploys still need the founder's approval each time.
objections: (a) **Mine, on the pause rule:** its cost half (over 200k per published Wave J lesson) cannot be checked today. The ledger shows wave-j at 1.4M, briefs only, because builds were attributed role-default and nothing has been recorded since 2026-10-15 09:02. Labelled Wave J usage records come to about 4.12M, deduplicated, over 27 published = **~153k per published lesson**. That excludes QA batch c, the r10/r11 learner walks, the fixes-2 revisions and today's PR1 builder. The true figure is plausibly 170-200k+. This is an estimate, not a measurement. It is recorded here and goes to the portfolio-manager (ask 6). (b) **Verdict wording:** I rule that the r10 verdict "pass" on the 15 drafts in B1 counts as a launch verdict. The 2026-10-15 founder digest counted those 47 r10 passes the same way, and launchGates does not read verdict text. The W-996 flip (4de027c) looked for "launch" and probably skipped these 15 on wording alone. evaluation-steward may object. If she does, B1 stops before it flips anything.

## The call this round (why flip and fix, not build)
- **Kill rule, launch half: not tripped.** On the first round of review (r10), 33 of the 45 Wave J drafts got launch or pass, 11 got revise and 1 got block. That is well above 15 of 30. Every one of these is a **simulated** review and none is market evidence.
- **Pace:** 27 of 144 are published (19%). 15 more are gate-clean and only need the status flip (B1). 4 need small design fixes and then a re-walk (B2). 3 are waiting for checks (ask 1). Publishing what is already built takes Wave J to 42 published (29%) for about 0.1M of spend. It also lowers tokens per published lesson, from the estimated ~153k labelled to about 100k. A new 5-lesson build would add about 0.35M (build plus checks) before any of it publishes. That pushes the ratio toward the 200k pause line while the ratio cannot even be measured.
- **The queue:** W-556 counts draft + review together, so flipping does not shrink it. Publishing does (ask 2). New builds only make it longer. The founder halved Wave J for exactly this reason (PR1 item 6).
- **But Wave J cannot reach 60% published without more builds.** Even if all 48 built lessons publish, that is only 33%. So builds resume next round on the trigger above. They are paused, not stopped.

## B1 · Flip 15 gate-clean Wave J drafts draft → review · board W-1185 (new item for the flip: chief of staff to add)
role: demo-builder
order: first
kind: build
worktree: yes
model: agent default
project: [project:wave-j]
budget: 1 run, ~120k tokens
inputs: each lesson's meta.json; its company/reviews/<slug>/2026-10-14-qa.md (release-build batch c, 235ba5e) and 2026-10-14-learner-adult-beginner-r10.md; the W-996 flip commit 4de027c as the pattern. The 15: ai raters-reward-agreement, sudden-skill-or-strict-score; chemistry two-routes-to-co2, which-step-to-speed; cs small-n-favours-the-slow-curve; economics savings-outlast-the-division; geography which-way-the-water-goes; life opposite-flows-swap-more, same-dose-levels-off; math the-equals-sign-balances; physics snap-the-magnet; probability significant-but-false, sixteen-of-twenty-got-better, ten-thousand-replies-still-wrong, where-the-axis-starts.
outputs: status `review` in the 15 meta.json files (nothing else changes: no version bump, no claim edits, no Demo.tsx/CSS); one commit naming the 15 and the evidence for each; `node tools/claim.mjs release <slug> --done` for every Wave J slug that is merged and still shows a STALE lock (list them in the commit body).
done when: `npm run company -- status` lists all 15 under "Ready to publish" with no gate failures; `npm run check` passes; `git diff` against the base touches only `"status"` lines in those 15 meta.json files (plus the claim locks).
checked by: qa-tester (lane 10). Before release-manager publishes, an official QA record must exist on the release build being published. The builder's contract run is not that record.
stop if: any of the 15 has Demo.tsx or styles.module.css changed since its r10 commit, a meta.json version different from the r10 header, or a claim not `verified`/`withdrawn`; the contract QA on a production build of HEAD fails for any of them (flip the rest, list the failures, put them on the board); evaluation-steward has objected to objection (b).

## B2 · Wave J design-review fixes for 4 drafts (then they are re-walked) · board W-834, W-832, W-835
role: demo-builder
order: parallel with B1 (separate worktree; disjoint slugs)
kind: build
worktree: yes
model: agent default
project: [project:wave-j]
budget: 1 run, ~220k tokens
inputs: company/rituals/records/2026-10-14-design-review.md (findings 2, 4, 5 and the rows for these lessons); company/product/demo-standard.md; each lesson's r10 review and build.md. **tug-of-war-scale** W-834: tension labels in mixed domain ink (system.md), at 11 px or more. **secret-in-the-counts** W-832 part: the reveal must not open on emptied evidence (put Reset first or restore the quoted state). **winning-bid-overpays** W-835 part: give the red/green winner dots a shape cue, and drop or move the dead "Step: one auction" button. Not the AVG GUESS question: that is W-836, for lane 10. **which-sea-gets-the-rain** W-832 part: the colouring must not reset at the reveal. Read its r10 revise findings and W-710 first. Leave the W-673 locked-label departure to cm-geography.
outputs: Demo.tsx/CSS changes; version +1 in each meta.json; any claim whose learner-visible text changes is reset to `unverified`, and any new sentence is recorded as an unverified claim; reveal-fit at 390x844 (crop 0, phoneFit true); local contract QA; a dated build.md entry for each. Status stays `draft`.
done when: each of the 4 meta.json files shows the new version; tools/reveal-fit.mjs output is recorded in each build.md; `npm run check` passes; W-834, and the named parts of W-832 and W-835, are listed as fixed in the commit body.
checked by: learner-evaluator (r11 re-walk on the new version) and fact-checker (any reset claims, plus W-836), both lane 10. See ask 3.
stop if: a fix would change what the lesson teaches or its reveal beyond the design finding (stop and report it for that category's CM); which-sea's fix collides with the W-673 departure; reveal-fit crops at 390x844 and cannot be fixed within 90 words.

## B3 · Lane POC's own written work: PR1 position, behavioral sign-offs · board W-1160, W-976, W-1041
role: principal-pm-verticals
order: parallel with B1
kind: other
worktree: no
model: agent default
project: [project:leadership] for W-1160; [project:behavioral-econ] for W-976 and W-1041 (split the reported tokens by item)
budget: 1 run, ~150k tokens
inputs: company/rituals/records/2026-10-16-project-review.md; company/ceo-office/2026-10-14-project-review-1-premortems.md; company/decisions/2026-10-15-behavioral-economics-dlr-decision.md; company/product/verticals/2026-10-15-behavioral-economics.md; the W-902 replication notes in company/research/notes/; this batch's objection (a).
outputs: a written position (go / go with changes / object) on each PR1 item in the record's position section, filed by **2026-10-17 23:59 UTC**. Item 6 (wave-j) carries objection (a) as a "go with changes": the cost half of the pause rule needs a measured line. Also: the W-976 boundary sign-offs in the behavioral DLR decision; the W-1041 updates to the behavioral vertical's §6 and the DLR Checkability section; and a note on whether W-922 is superseded by the PR1 approvals.
done when: the PR1 record has a principal-pm-verticals position for every item, dated before the deadline; the DLR decision record shows signed rows #4, #7-#12, #11 and the nudges reserve; the behavioral vertical doc's §6 cites the W-902 verdicts.
checked by: none needed. A position goes to the PR1 forum, which answers it, and any PE evidence objection reopens the item. The boundary rows also need the neighbouring CMs' co-sign, which is theirs to give.
stop if: the chief of staff reads poc-map row 2 as not including the POC's own runs. In that case refuse this item, and Leonie confirms (ask 7). The PR1 deadline would then pass unfiled, and that has to be shown in the founder digest.

## Asks to other lanes (not lane 2 runs; the chief of staff takes each to its POC)
1. **evaluation-steward (lane 10), W-1185:** Wave J physics #61-63. Fact-check 17 claims: electron-speed-in-a-wire c1-c6, second-speaker-decibels c1-c5, what-pushes-the-car c1-c6. Also official QA records on a release build, and an adult-beginner learner walk of each (walkthrough first; build.md only after findings). Tag [project:wave-j].
2. **head-of-product (lane 5) and release-manager (lane 11):** once B1 lands and qa-tester has the release-build records, take the 15 to a launch review and run `company publish`. This is the step that actually cuts the W-556 queue and Wave J's cost per published lesson. A deploy remains a separate founder approval.
3. **evaluation-steward (lane 10), after B2:** r11 re-walks of tug-of-war-scale, secret-in-the-counts, winning-bid-overpays and which-sea-gets-the-rain on their new versions. Fact-check any reset claims and W-836 (AVG GUESS $99.2). Answer objection (b) if you disagree.
4. **cm-physics (lane 1), W-1185:** rule on the 25-word stage budget for #61-63, and on whether number and unit tokens count. That ruling binds #64-70 before they are built.
5. **CMs (lane 1), departures already flipped or about to be:** cm-ai W-682, cm-life W-678, cm-probability W-656, cm-cs W-658, cm-geography W-673. A "revise" ruling pulls that slug back into a lane 2 revision next round. I keep the Wave J slugs and they leave them out of their own batches (poc-map row 2).
6. **portfolio-manager (lane 17), W-1172:** re-own `wave-j` to principal-pm-verticals in projects.json (poc-map row 2 flag). Re-attribute the 2026-10-14 "Build wave J: <domain>" runs, the Wave J fact-check runs and their review shares to wave-j, so that `ledger.mjs report --project=wave-j` gives tokens per published lesson. Objection (a) depends on this. **chief-of-staff (lane 19), W-585/W-815:** record the 144-slug list in company/ops/waves.json, then run `events.mjs backfill` and `ledger.mjs import`. Without both, the pause rule's cost half cannot be checked.
7. **chief-of-staff-ceo-office (lane 18):** confirm that row 2 covers the POC's own runs, as rows 8, 17 and 18 say for theirs (B3).

## What next round looks like (if the trigger holds)
B1-style flips for the B2 four once their re-walks pass; one physics build of #64-68 (5 briefs, claim.mjs next physics); domain-scout only after the founder answers W-685.
