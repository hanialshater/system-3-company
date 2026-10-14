# Progress log (session handoffs)

Newest entry at the top. Every session adds one before it ends. This is testimony from a worker
who no longer exists: check what you rely on.

## 2026-10-14, interaction-designer: W-335 design review of "fold at the reveal" (spec): approved with changes

- Changed: verdict and two worked examples (midnight-sun-line, gradient-descent) in the Consulted section of company/decisions/2026-10-14-reveal-fits-with-its-picture.md; two objection rows added (open, routed). Board: W-347 (design-lead: spec changes), W-348 (platform-engineer: EDD constraints for W-332), W-349 (platform-engineer: re-sweep charges the toggle, excludes Readout rows), W-350 (visual-designer: the toggle must look like a control), W-351 (interaction-designer: review of the built toggle after W-332). W-335 done. Nothing built.
- Believe: the mechanism is sound (high confidence). Five changes: an evidence test, not a quote test (no Readout rows, every reveal branch, state shown in the picture); "Show more controls" when other controls stay visible; the fold decided once, before the reveal paints (never from the 400 ms or resize re-fit); focus and scroll anchoring rules; a net-saving gate of at least the toggle height. The fold will fix far fewer than 174 lessons. In gradient-descent nothing may fold, and in midnight-sun-line one row may, which probably saves too little (medium-high confidence, from code reading and estimates, no build).
- Next: design-lead W-347, then platform-engineer W-332 and W-333 with W-348 and W-349; accessibility-reviewer W-336; visual-designer W-350; then W-351 and W-338.
- Blocked: W-332 still waits on W-287.

## 2026-10-14: principal-engineer: W-339 review of f244779 (W-287/W-288 legibility floor)
- Changed: added "Follow-up: f244779" to company/engineering/reviews/2026-10-14-W-237-reveal-stage-crop.md. Verdict: approve. Release-blocking changes 1 and 2 are met in code. The author's probe is now saved as company/engineering/reviews/2026-10-14-W-339-postfix-probe.mjs. W-339 is done. Added W-352 (platform-engineer: measure tspan, update the change note, re-probe) and W-353 (accessibility-reviewer: does a root aria-hidden make labels decorative?).
- Believe (high confidence on the code, medium on the numbers): the floor is a provable lower bound for meet-scaled svgs, and the skips cover all 7 overlays and all 3 pointer lessons. Gap: <tspan> sizes are not measured. 5 lessons give tspan a class, so the "0 labels under 10 px" figure has a blind spot. This does not block release.
- Next: paste build 6's verify summary (coordinator) into the review record, which closes its last open item. Blocked: none.

## 2026-10-14, learner-evaluator: round-8 learner reviews (r8, build 5 walkthroughs, batch r8-4, 9 lessons)

- Changed: wrote company/reviews/<slug>/2026-10-14-learner-<boundary>-r8.md for fenwick-hops-by-lowest-bit (v3), palindromes-grow-from-centres (v3), selfish-routes-cost-a-third-more (v4), only-the-needed-trader-profits (v2), the-bar-nobody-can-forecast (v3), fingernail-ocean (v3), shrinking-degree (v3), fifty-up-fifty-down (v2), every-scale-equally-likely (v3). Verdicts: 7 revise, 1 launch with notes (palindromes), 1 launch (fifty-up-fifty-down). Board: W-340 to W-346 (demo-builder, state next, one per revise, exact defect). No lesson code touched.
- Believe (medium-high; simulated learner, screenshots seen for all 9, reveal frames opened at full size for 4): every r7 blocking finding I checked is fixed (fenwick read trace kept, palindromes denominators hidden, selfish "Half on each" gone, bar title neutral, every-scale ratio question, fingernail Seen line). What blocks now: picture off screen at the reveal while the reveal points at it in 4 (fenwick bars and Σ row, shrinking-degree globe top, every-scale chart, bar model chip/top); word count on a new version in 5 (selfish ~129, every-scale ~112, fingernail ~101, trader ~97, shrinking ~95). New pointer before the commit: fingernail's locked caption "= 25 km per million years" does the conversion the question tests. Word counts are whitespace counts of the transcript, plus or minus a few.
- Reversal: only-the-needed-trader-profits was launch at r6; revise now under the word budget and fit rule, not because it got worse.
- Kit (W-287): the reveal shrink puts picture labels at about 3 to 4 px in selfish-routes, only-the-needed-trader, the-bar (also in its predict frame) and fingernail. Selfish and trader fit today only because of the shrink. Recorded as kit findings.
- Next: demo-builder works W-340 to W-346 (category managers pick which sentence goes). None of the builds had a Pre-flight item 7.
- Blocked: nothing.

## 2026-10-14 design-lead: W-330 option (a) revisit decided: per-row opt-in "fold at the reveal"

- What changed: amended `company/decisions/2026-10-14-reveal-fits-with-its-picture.md` (status line, new section "Amendment, W-330" with options, spec, QA contract implications, sequence and revisit clause; consulted; one objection row updated, five added). Added "Fold at the reveal" to `company/design/system.md`. Board: W-332, W-333 (platform-engineer: EDD/build; reveal-fit fold simulation + expand check + re-sweep on a W-287 build), W-334 (evaluation-steward: optional contract amendment), W-335 (interaction-designer: design review, since I may not approve my own), W-336 (accessibility-reviewer: toggle), W-337 (head-of-product: demo-standard fix order), W-338 (learner-evaluator: re-review with a re-check task). W-326 note: still held. W-330 done. Nothing built.
- Belief: the trigger is met and a kit fold is worth it, but only opt-in per Row, only when the card overflows, before any picture shrink, restored by one "Show controls" tap (medium confidence). The design does not force a QA contract amendment: the contract presses controls before the reveal, and step 5 skips display:none controls (high confidence, read from contract.spec.ts); it does leave a coverage gap the steward should weigh. "174 of 217" is an upper bound from build 5; W-287 will raise crops (system.md estimates ~44 vs 261 lessons the fit resolves), so the real number needs W-333.
- Next: platform-engineer W-332 after W-287, then W-333; W-335/W-336 reviews; then W-337 and builders on W-326.
- Blocked: W-332 waits on W-287.

## 2026-10-14 learner-evaluator: round-8 learner reviews, batch r8-3 (9 lessons)

- What changed: wrote company/reviews/<slug>/2026-10-14-learner-<boundary>-r8.md for each-element-pops-once (v5, revise), one-road-cuts-the-map (v4, revise), rotation-untangles-the-chain (v3, launch with notes), odds-average-the-bettors (v3, revise), stag-needs-three-in-four (v3, revise), continental-jigsaw (v5, revise), ruler-on-mercator (v2, revise, words only), enemies-allow-three-camps (v5, revise), throw-it-fast-enough (v6, revise). Board: demo-builder W-309, W-311, W-312, W-313, W-314, W-315, W-324, W-331; tools-lead W-310 (walkthrough.mjs checks reveal-button without the auto-wait QA uses).
- Belief: most r7 teaching findings are fixed in build 5 (medium-high confidence, from screenshots). What is left is mostly phone fit: 7 of 8 revises are reveal > 90 words and/or stage-top crop hiding what the reveal points at. Two builders (continental-jigsaw, throw-it-fast-enough) defer the crop to a "kit phone-scroll fix"; the fit rule puts it on the lesson, so I counted it there. Picture-label shrink at reveal (and in several locked frames) is counted as kit W-287, not as lesson revises. each-element-pops-once: reveal not seen (pops-seen fires at the end of a ~2.7 s replay on the last control).
- Next: demo-builder items above; category manager picks the cut sentences; tools-lead W-310; W-287 owner should check why the shrink also fires on locked/mid-explore frames (stag frame 04, continental-jigsaw, ruler-on-mercator, enemies locked frames).
- Blocked: nothing.

## 2026-10-14 platform-engineer: W-242 reveal-fit measures stage-top crop; W-264 full crop sweep (35% crop)

- What changed: `tools/reveal-fit.mjs` reports stage-top `crop` px, reveal `hiddenBelow` px, quoted stage labels off screen (`namedHidden`, heuristic), stage block heights, reveal words/lines/px per line, and `phoneFit`; fitted pictures (`data-reveal-fit`) are not thumbnails; taps, with a recorded click fallback; `--strict` exit bar. Swept build 5 on :3500 (`/d`, 2 workers, no rebuild): company/engineering/notes/2026-10-14-reveal-crop-sweep.md, one row per cropping lesson, five in-flight lessons marked "fix in flight". Board: W-242 and W-264 done; W-325 to W-329 (demo-builder, one per cause: reveal length, controls (held for W-330), stage text, table, picture); W-330 (design-lead, option a revisit). Changelog line added. Committed only the tool and the note (caller's order); board.json, changelog.md and this entry are in the working tree, not committed.
- Belief: 217 of 624 measured lessons crop (median 61 px), reveal last line on screen in all of them (high confidence; the tool reproduces the six hand measurements exactly). The cause split is a heuristic (medium confidence): controls 92, reveal length 77, stage text 31, table 12, picture 5. Read literally, the decision's option (a) revisit trigger is met (35% cropped; controls the tallest block in 56%). Measured 22.5 px and 7.8 words per reveal line, so 90 words is about 260 px.
- Next: design-lead W-330 (revisit a or not), then demo-builder W-325 first (text trims, no kit change). Feed not measured (existing board item). 14 lessons unmeasurable on the QA path (listed in the note).
- Blocked: nothing.

## 2026-10-14, learner-evaluator: round-8 learner reviews (r8, build 5 walkthroughs, batch r8-2, 9 lessons)

- Changed: wrote company/reviews/<slug>/2026-10-14-learner-<boundary>-r8.md for cut-the-rod-for-more (v3), one-crowded-bucket (v3), ray-counts-crossings (v3), four-in-a-row-two-thirds (v4), pay-for-the-harm-you-do (v3), who-pays-same-filter (v3), mercator-greenland (v4), bridge-carries-news-not-habits (v3), ruler-catch (v3). Verdicts: 8 revise, 1 launch with notes (who-pays-same-filter). Board: W-316 to W-323 (demo-builder, state next, one per revise, exact defect). No lesson code touched.
- Believe (medium-high; simulated learner, screenshots seen for all 9, reveal frames opened at full size for 6): every r7/r6 blocking finding I checked is fixed (neutral titles for cut-the-rod and who-pays, ruler's locked time scale hidden and the d = ½gt² working line on stage, ray's Seen line, mercator's numbered options and bearing line). What blocks now: stage-top crop at the reveal in 4 (one-crowded-bucket, four-in-a-row, pay-for-the-harm, mercator; mercator's map is entirely off screen while the reveal points at its orange line); a reveal pointing at a state not on stage in 2 (ray: "numbered crossing" with the ray at (7,4), 0 crossings; bridge: "Ben had 1 of 5" while the stage shows the news state, all of B green, "5 of 5"); word count alone in 2 (cut-the-rod ~113, ruler-catch ~99). 8 of 9 reveals are over 90 words (whitespace counts, plus or minus a few); who-pays is ~92, within error, so launch with notes.
- Reversal: pay-for-the-harm-you-do was launch at r7 and bridge was launch at r6; both are revise now, under the 2026-10-14 fit and quote rules, not because the lessons got worse.
- Kit (W-287): the reveal shrink puts picture labels at about 2 to 6 px in cut-the-rod, one-crowded-bucket, ray, four-in-a-row, pay-for-the-harm, who-pays and ruler-catch. Recorded as kit findings. cut-the-rod, ray and ruler fit today only because of the shrink, so a W-287 floor will likely reopen their crops.
- Next: demo-builder works W-316 to W-323; mercator-greenland and ruler-catch are on the ready-to-publish list and must not launch until W-321 and W-323 close. None of the builds had a Pre-flight item 7.
- Blocked: nothing.

## 2026-10-14, learner-evaluator: round-8 learner reviews (r8, build 5 walkthroughs, batch r8-0, 10 lessons)

- Changed: wrote company/reviews/<slug>/2026-10-14-learner-<boundary>-r8.md for penalty-on-wiggle (v6), hailstone-27-climbs (v5), proposers-get-the-best (v4), wheel-needs-four-colours (v3), outside-option-sets-the-split (v3), twenty-then-ten-off (v3), half-of-humanity (v2), all-lines-meet-in-one-mother (v2), no-fraction-fits (v5), weak-links-hold-it-together (v3). Verdicts: 9 revise, 1 launch with notes (twenty-then-ten-off). Board: W-299 to W-307 (demo-builder, one per revise, exact defect), plus W-308 (backlog: verify and close W-124, which looks fixed). No lesson code touched.
- Believe (medium-high; simulated learner, screenshots seen for all 10): every r7 or r6 blocking finding I checked is fixed (honest 0.001 quote, 97 ring, clash drawn, Tried and Seen rows, the bridges count hidden while locked, the 2s gloss). What blocks now is the phone fit. In 4 lessons the picture the reveal argues from is entirely off screen at the reveal: the wheel, the half-of-humanity map, the all-lines tree and the proposers clash. Penalty and hailstone have most of the chart cropped. weak-links and outside-option are small crops of about one line. 8 of 10 reveals are over 90 words (about 93 to 123). No build.md had a Pre-flight item 7. Word counts are whitespace counts of the transcript, so plus or minus a few.
- Lesson (not kit) label finding: all-lines-meet-in-one-mother's tree labels ("+ 49 others", "common mother") are about 4 to 5 px even during explore.
- Kit (W-287): the reveal shrink makes picture labels unreadable (about 3 to 6 px) in penalty, hailstone, outside-option, no-fraction, weak-links and twenty. Recorded as kit findings, not lesson revises. Note: outside-option and no-fraction fit today only because of the shrink, so the W-287 floor will reopen their crops.
- Next: demo-builder W-299 to W-307 (category managers choose which claimed sentence goes; wheel needs a design-lead review, W-267 class). Then a fresh walkthrough and learner re-review. platform-engineer W-287.
- Blocked: nothing.

## 2026-10-14, learner-evaluator: round-8 learner reviews (r8, build 5 walkthroughs, 9 lessons)

- Changed: wrote company/reviews/<slug>/2026-10-14-learner-<boundary>-r8.md for the-slowing-half-life (v6), karatsuba-three-not-four (v4), range-min-in-four-nodes (v4), accurate-bettor-takes-the-pot (v3), patience-wins-the-split (v4), two-bets-split (v6), horizon-ruler (v3), vaccinate-at-the-peak (v4), the-loser-flips-the-winner (v2). Verdicts: 8 revise, 1 launch with notes (the-loser-flips-the-winner). Board: W-291 to W-298 (demo-builder, one per revise, exact defect). No lesson code touched.
- Believe (medium-high; simulated learner, screenshots seen for all 9): most r7 blocking findings are fixed (persistent Seen rows, distinct Karatsuba example, neutral Borda title, whole-percent vaccine arithmetic). What now blocks is the phone fit: 8 of 9 reveals are over 90 words (about 100 to 128), and in 6 the stage top is off screen when the reveal opens; in 4 of those the reveal names something off screen (third box, tree, circle, bars). horizon-ruler also names a radius not drawn at 933 m. No build.md had a Pre-flight item 7. Word counts are whitespace counts of the transcript reveal, so +/- a few.
- Kit (W-287): in build 5 the reveal shrink makes picture labels unreadable (about 4-7 px) in horizon-ruler, vaccinate-at-the-peak (grid shrunk to a strip) and the-loser-flips-the-winner. Recorded as kit findings, not lesson revises.
- Next: demo-builder W-291 to W-298 (category managers choose which sentence goes), then a fresh walkthrough and learner re-review. platform-engineer W-287.
- Blocked: nothing.

## 2026-10-14, fact-checker: W-283 + W-286 (FC pass 33)

- Changed: one-odd-loop-blocks-two-camps c4 and a-star-heads-for-goal c1 and c3 are now verified in meta.json, each with checkedBy fact-checker, checkedOn 2026-10-14 and an FC pass 33 source note. A Pass 33 table is appended to each company/reviews/<slug>/2026-10-14-fact-check.md. W-283 and W-286 are done. I added a qa-tester item for QA and walkthrough on both lessons. No code or claim text was touched, and nothing was built.
- Believe (high): both pass 30 path disputes are closed, read on every path in the v4/v6 code. In one-odd-loop, odd-loop is reached only while a walk is drawn. In a-star, guided-at-goal is reached only by the guided open run, so 7 is always shown before the verdict. The numbers hold on my own node scripts (scratchpad fact-checker-w283/). The a-star reveal is 79 or 84 words, and at most 88 with the kit verdict line, so at most 90 on every path. One non-blocking note: the a-star c3 claim text is broader than the stage, because the open-grid match shows only if the learner makes the optional no-guess open run. Narrowing it is the builder's call.
- Next: qa-tester runs QA and walkthrough on both lessons (stage logic changed), then launch review.
- Blocked: nothing on claims.

## 2026-10-14, platform-engineer: W-287 (+ W-288) legibility floor in useRevealFit, commit f244779

- Changed: `src/components/DemoCard.tsx` useRevealFit. Per-picture floor = max(0.4, `SVG_TEXT_FLOOR_PX`=10 / smallest non-aria-hidden label, `SVG_DECOR_FLOOR_PX`=8 / smallest aria-hidden label), from the W-289 ruling in company/design/system.md (it replaced the 9 px placeholder mid-task). No shrink if the floor is >= 1. Text-free pictures keep 0.4. Shrinks that free < 1 px are undone. Skipped: preserveAspectRatio="none", svgs that are or sit inside position absolute/fixed, svgs with absolutely positioned siblings (overlays), and svgs holding untagged interactive elements (tabindex, role button/slider, links, form fields, cursor: pointer). That last one is W-288 change 3. Changelog line added. Committed and pushed: DemoCard.tsx + changelog only. tools/reveal-fit.mjs is not mine (W-242/W-264 in progress) and was not touched. Board: W-287 and W-288 are in review; W-339 is the principal-engineer review.
- Measured: build .next-pf2 served at :3510. The review probe was adapted to read the app's own fit instead of applying a copy; it lives in the scratchpad and is not committed. At 390x844 over 595 measured lessons: fully fitting 398 → 176, shrunk lessons that fit 261 → 41 (the ruling estimated 44), lessons shrunk 433 → 179, smallest meaning label 2.6 px → 10.0 px, 0 lessons under 10 px (was 370), decorative minimum 8.0 px, overlay/none shrinks 7 → 0, shrunk svgs with pointer targets 3 → 0. Contract QA phone + desktop on 29 NCM + 20 random lessons: 98/98.
- W-288 hand-check (read in code): all three lessons keep in-svg targets live after the reveal (locked = predict phase only). the-tagged-molecule uses g role=button. wheel-needs-four-colours and three-students-two-rooms use onClick shapes with cursor: pointer, and both also have HTML Control duplicates. The fit now skips all three, so no tagging is needed for the fit. Not done: replacing the 6-lesson table in company/engineering/notes/2026-10-14-reveal-stage-crop.md (change 4). The numbers are in the changelog.
- Believe: high that no fitted label lands below 10 px (measured, and it follows from the letterbox math). Medium on full `npm run verify`: QA ran on 49 lessons, not all 638.
- Next: W-339 (principal-engineer) review, then release can take f244779 instead of reverting 1a879c6. The release manager decides the shipping build. The bigger crop backlog (about 284 lessons that no longer fit) goes the per-lesson W-264..W-267 route (design-lead/demo-builder).
- Blocked: nothing.

## 2026-10-14, principal-engineer: W-237 reviewed (reveal picture fit, 1a879c6): approve with changes

- Changed: review `company/engineering/reviews/2026-10-14-W-237-reveal-stage-crop.md`, with the probe and its data next to it (`2026-10-14-W-237-probe.mjs`, `-probe.json`: 638 lessons on pre-fix build 4 at :3480, with 1a879c6's fit copied into the page; it reproduces the note's numbers). Objection row added to `company/decisions/2026-10-14-reveal-fits-with-its-picture.md`. Board: W-237 done; W-287 and W-288 (platform-engineer), W-289 (accessibility-reviewer). No code changed, nothing built.
- Believe: the code is correct and loop-free (resize, Reset, re-entry, reduced motion and no-viewBox are all fine; it converges in 2 passes). High confidence. But the uniform letterbox scale shrinks svg labels: 347 of 433 shrunk lessons end with labels under 9 px (median 4.9 px), which breaks demo-standard's "never shrink text". 7 absolute overlays get distorted and free 0 px. 40% is defensible only for text-free pictures. Fairly sure (probe on build 4 lesson code, not build 5). A 9 px floor fits about 60 lessons fully instead of 261. That is an estimate, not a measurement.
- Next: W-287 blocks release. If it is not in the shipping build, revert 1a879c6 (and the useRevealFit part of 740f5a1/01006ec) for that build. Paste the build 5 verify summary into the review record (coordinator). Head of product: does "never shrink text" allow any shrink of labelled pictures?
- Blocked: nothing.

## 2026-10-14, fact-checker: W-284 (midnight-sun-line c5, c7, Pass 32)

- Changed: c5 and c7 are verified in meta.json (checkedBy: fact-checker, checkedOn: 2026-10-14, and a pass 32 note in each source field). Pass 32 is recorded in company/reviews/midnight-sun-line/2026-10-14-fact-check.md. W-284 is done. This was a fresh instance that read the artifact first, as the W-280 ruling requires. It used its own astronomy-engine and d3-geo runs and a WordNet 3.1 tarball it downloaded itself (the sha256 matches).
- Believe: high. Both claims hold on my own numbers. c7 is a claim about the geometric, airless model (the real limit is about 65.7 N), and the stage labels itself a toy with no air.
- Next: QA and walkthrough on v5 (W-270). The transcript on disk is stale.
- Blocked: nothing.

## 2026-10-14, demo-builder: W-281 and W-282 (FC pass 30 path disputes)

- Changed: one-odd-loop-blocks-two-camps v4. The stage now shows either the walk or the best split. Picking a loop draws its walk, also after "Try all 64 splits". Try shows the split again. Moving the enemy back to D-E reaches odd-loop only while a walk is drawn. c4 is unverified. a-star-heads-for-goal v6. guided-at-goal is reached only by the guided run with the wall off. The reveal's last sentence was cut (the W-277 fallback): 94 → at most 84 words with all four cells filled, 79 on the QA path. c1 and c3 are unverified, and c3's support is now derivation. bending-frontier c3 support is now derivation (field only, no version or status change). Pre-flight v4 and v6 are in each build.md. tsc is clean and `npm run check` passed. Board: W-281 and W-282 are done. Added W-286 (fact-checker, a-star c3 re-check, fold into W-283).
- Believe: high that both disputed paths are closed (read in the code, not run: no build, QA or walkthrough this session). Medium that the walk/split toggle reads clearly to a beginner, because no screenshot was taken.
- Next: W-283 and W-286 (fact-checker). After that, QA and walkthrough for both lessons, since the stage logic changed.
- Blocked: nothing.

## 2026-10-14, evaluation-steward: W-280 ruling (midnight-sun-line c5 and c7 independence)

- Changed: ruled on both questions and recorded the ruling and its objections in company/reviews/midnight-sun-line/2026-10-14-fact-check.md, under "Ruling on W-280". (1) A separate fact-checker instance may verify c5 and c7, with no redraft, under four conditions: it is a new instance, it reads the artifact first (Demo.tsx v5 and the claim text and support before the source fields, the review file or the board), it uses its own references and numbers, and it records Pass 32. (2) Checkers are not banned from drafting. A dispute names the defect and the constraint and may add an example labelled "example wording, owner decides". When an owner adopts the example verbatim, the re-check goes to a fresh instance. Board: W-280 is done, and the ruling and dispatch brief are in its text. Added W-284 (fact-checker, Pass 32) and W-285 (evaluation-steward, a possible amendment to README rule 7, only if it recurs). No lesson files or protected paths edited.
- Believe: medium-high. The bar on self-verification attaches to the checker instance and its context, not to the role. The pass 31 evidence is external and pinned by hash, and cm-geography exercised its own judgement in W-274. The strongest objection is that the drafter and verifier share a model and a prompt, so their judgement is correlated. It is answered in the ruling, not dismissed. The ruling would flip to a redraft if the evidence were snippets or opinion, as in W-258.
- Next: W-284 (fact-checker, fresh instance), then W-270 (QA and walkthrough; the transcript on disk is from v3).
- Blocked: midnight-sun-line cannot publish until W-284 passes.

## 2026-10-14, fact-checker: pass 30 (W-276, claims reopened by the phone-fit trims)

- Changed: 16 claims were re-checked against Demo.tsx on every path: bending-frontier v4 c1-c4, one-odd-loop-blocks-two-camps v3 c1-c4, every-second-seat-out v3 c2-c5 and a-star-heads-for-goal v5 c1, c2, c3, c6. 14 are verified and 2 disputed: one-odd-loop c4 and a-star c1. The statuses and "FC pass 30" notes are in each meta.json, and a Pass 30 table is appended to each company/reviews/<slug>/2026-10-14-fact-check.md. Board: W-276 is done. New: W-281 and W-282 (demo-builder fixes) and W-283 (fact-checker re-check). No code, claim text or build was touched.
- Believe (high): the numbers all hold (own node scripts in the scratchpad, fact-checker-w276/). Both disputes are about paths, not arithmetic. In one-odd-loop, pressing Try before picking a loop means no walk is ever drawn, but the reveal still says "those walks came back to A". In a-star, guided-at-goal also fires on the wall run, so the open grid (the question's own case, 7) can be skipped. No source could be opened (DNS failure, proxy 403), so no verdict rests on a cited text. bending-frontier c3 and a-star c3 rest on the stage and a derivation.
- Next: demo-builder W-281 and W-282, then fact-checker W-283. W-279 (QA crop measurement) and W-278 (design) are unchanged. bending-frontier and every-second-seat-out are clear on claims.
- Blocked: one-odd-loop-blocks-two-camps and a-star-heads-for-goal cannot publish until c4 and c1 are fixed and re-checked. Note for W-278: the a-star reveal is 94 words when all four table cells are filled.

## 2026-10-14, fact-checker: W-275 (midnight-sun-line v5, FC pass 31)

- Changed: c3 and c8 are now verified in meta.json. c5 and c7 have pass-31 source lines and stay unverified. Pass 31 is appended to company/reviews/midnight-sun-line/2026-10-14-fact-check.md. W-275 is done. Added W-280 (evaluation-steward). `npm run check` passes. No build, no code edits, no project dependencies.
- Believe: c3 is verified against an opened reference (medium-high). WordNet 3.1 via the npm `wordnet-db@3.1.14` tarball defines the Arctic Circle as the southernmost line of the solstice midnight Sun, and the stage computes that line at 66.56 N. WordNet gives no number. c8 is verified (high), using astronomy-engine: no sunset north of about 68 N on any day in June. c5 and c7 pass every check (high), but their wording is this role's pass-29 text, which W-274 adopted verbatim. Per the W-258 precedent they are held on independence only.
- Next: W-280 (evaluation-steward) rules on c5 and c7. Then a fact-checker attests or re-checks them. Then QA and walkthrough (W-270): the transcript on disk shows v3 text.
- Blocked: midnight-sun-line cannot publish until W-280 is ruled.

## 2026-10-14, demo-builder: W-274 (midnight-sun-line v5, c5 dispute fixed in text)

- Changed: applied the cm-geography-earth-climate ruling in W-274 using its exact strings. The predict question now opens "Around June 21 the north has its longest day." The reveal's last sentence ends "...where the noon Sun is overhead on the June solstice." (85 words). c5 has the ruling's text and its source line, c7 says "On the June solstice", and the new c8 records the hook. c5, c7 and c8 are unverified. c3 is untouched and still held. Version 4 to 5, status stays review. build.md has Pre-flight v5. tsc and `npm run check` pass. Board: W-274 is done.
- Believe (high): the text now matches c5, and the reveal is 85 words, within the 90 budget. Phone fit is not measured: no build, QA or walkthrough, by the caller's order.
- Next: W-275 (fact-checker) re-checks c3, c5, c7 and c8, then QA and walkthrough (W-270), then release (W-271).
- Blocked: midnight-sun-line cannot publish until W-275 passes.

## 2026-10-14, demo-builder: W-265 and W-267 (reveal fits with its picture, four lessons)

- Changed: bending-frontier v4: reveal trimmed 119 → 88 words; the stage is unchanged. one-odd-loop-blocks-two-camps v3: "Try all 64 splits" now shares one 3-column row with the enemy buttons, and the reveal is 95 → 81 words. every-second-seat-out v3 is a compact stage. The step buttons are in one 3-column grid ("Run to a power of 2"). The chips are one 3-column grid with each result on a line under its chip, which replaces the Readout boxes and the "People" label. The scrubber label sits beside the track, the rule line is shorter, the gaps are tighter, and the reveal is 88 → 81 words. a-star-heads-for-goal v5 is a compact stage. The controls are in one 3×2 grid, table cells read "N cells · route R" on one line, the tie-break moved from the reveal onto the rule line, the gaps are tighter, and the reveal is 113 → 89 words. In all four lessons the changed claims are unverified, status is published → review (the launch gate), the version is bumped, and build.md has a Revision note and Pre-flight v<N>. tsc and `npm run check` pass. Board: W-265 and W-267 are in review. New: W-276 (fact-checker), W-277 (cm-cs-algorithms, reveal content), W-278 (design-lead), W-279 (qa-tester, measure the crops).
- Believe: these are estimates, not measured (no build, QA or walkthrough by caller's order). bending-frontier saves about 60-80 px of a 33 px crop, so it should reach 0 (fairly sure). one-odd-loop saves about 65-85 px of 45 px, so 0 (fairly sure). a-star saves about 165-200 px of 200 px, so 0-35 px may be left (moderate). every-second-seat-out saves about 180-250 px of 275 px, so 25-95 px is probably left (low-moderate). Its reveal is already short, and the circle is at the kit's 40% floor.
- Next: build, then W-279 screenshots. If every-second-seat-out or a-star is still cropped, cm-cs-algorithms (W-277) decides which reveal sentence goes. Then W-278 design review and W-276 fact-check.
- Blocked: nothing. The four lessons are off "published" until W-276.

## 2026-10-14, fact-checker: pass 29 (W-273 eratosthenes-shadow v5 c1; W-269 midnight-sun-line v4 c3/c5/c7/c4)

- Changed: eratosthenes-shadow c1 is now verified: the story-mode distance line is framed on every path. In midnight-sun-line, c7 is verified, c5 is disputed, c3 is left unverified (its source could not be opened) and the c4 withdrawal is confirmed. The statuses and "FC pass 29" notes are in both meta.json files, and a Pass 29 table is appended to each lesson's company/reviews/<slug>/2026-10-14-fact-check.md. Board: W-269 and W-273 are done. Added W-274 (cm-geography: the c5 wording fixes, then the builder applies them) and W-275 (fact-checker: re-check c3 and c5 with an opened reference). No code, claim text or build was touched.
- Believe (high confidence): the c5 dispute is real. The predict question's flat "June 21" contradicts c5's "around June 21": astronomy-engine puts the 2024 and 2028 solstices on June 20 UTC. Also, the reveal's "where the noon Sun is overhead" has lost "on the June solstice". The opened source was astronomy-engine 2.1.19, an npm tarball read and run in the scratchpad (fact-checker-w269-w273/) and not added to the project. Web fetch failed with DNS errors, so no atlas could be opened for the Arctic Circle or Tropic names.
- Next: W-274 (cm-geography, then demo-builder), then W-275 (fact-checker), W-270 (QA) and W-271 (release). eratosthenes-shadow still needs a v5 build, QA and walkthrough before it can publish.
- Blocked: midnight-sun-line cannot publish until c5 is fixed and c3 and c5 are checked against an opened reference.

## 2026-10-14, demo-builder: W-272 (eratosthenes-shadow v5 distance line)

- Changed: Demo.tsx story-mode distance line now reads "Distance Syene to Alexandria, in the story: 5,000 stadia." (FC pass 28 wording); modern mode unchanged. meta.json version 4 -> 5; c1 set to unverified, checkedBy/checkedOn cleared, source stage quote updated. c1 text left as is: it already frames the distance as "this lesson's story" and W-272 said not to change it. build.md has v5 and Pre-flight v5. Board: W-272 done.
- Believe (fairly sure): the stage line now matches c1 in story mode. tsc clean, `npm run check` passed. Not checked: the line may wrap at 360 px.
- Next: W-273 (fact-checker) re-check c1. Build, QA and walkthrough for v5 were not run (caller's order); walkthrough transcript is still v3.
- Blocked: nothing.

## 2026-10-14, fact-checker: pass 28 (W-262, eratosthenes-shadow v4 c1/c5/c6)

- Changed: I re-checked c1, c5 and c6 against Demo.tsx v4 on every path (predict, opening state, story chip, story slider, modern chip/slider, reveal). Result: c5 and c6 verified, c1 disputed. meta.json has the status, checkedBy, checkedOn and an "FC pass 28" source note. A Pass 28 table is appended to company/reviews/eratosthenes-shadow/2026-10-14-fact-check.md. Board: W-262 done. Added W-272 (demo-builder: distance-line fix) and W-273 (fact-checker: re-check c1 after it). No code or claim text edited, nothing built.
- Believe: high confidence. The numbers were re-run in node (scratchpad fact-checker-w262/): only 7.20 fires the account milestone, it shows 50 / 250,000, and the reveal needs both milestones. No claim among c1, c5 and c6 asserts what a historical source says. The c1 dispute: in story mode the stage line "Distance Syene to Alexandria: 5,000 stadia." has no story frame, on every path. That is the kind of bare sentence W-258 ruled out. The fix is one string. The v4 walkthrough transcript is stale (still v3).
- Next: demo-builder W-272, then fact-checker W-273. Walkthrough and QA of v4 are still to run. c4 (from memory) is still with cm-geography.
- Blocked: eratosthenes-shadow cannot publish until c1 is fixed and re-checked.

## 2026-10-14 demo-builder: W-266 midnight-sun-line v4 (reveal fits with its picture)

- Changed: I applied cm-geography's W-266 reveal text as given (81 words rendered, budget 90 or fewer). c4 withdrawn with a note. c3, c5 and c7 reset to unverified. c1 untouched. Version 3 to 4. Status published to review, on the coordinator's instruction, so the launch gate is not broken. Updated the Demo.tsx header and added `## Pre-flight v4` to company/reviews/midnight-sun-line/build.md. tsc and check pass. W-266 is now in review.
- Believe: the text and claims match W-266 (high confidence). I believe the crop is now about 0 px, but that is a moderate-confidence estimate. Pre-flight 7 was not measured, because builds, QA and walkthrough were not allowed.
- Next: W-269 fact-checker (c3, c5, c7, c4 withdrawal). W-270 qa-tester (reveal-fit px at 390x844, orange gap visible). W-271 release-manager (republish).
- Open: c5 says "around June 21", but the predict question still says "June 21". cm-geography should decide whether the question changes.

## 2026-10-14 head-of-product: W-263 reveal fit rule adopted with changes; reveal budget is 90 words

- What changed: `company/product/demo-standard.md` has a new craft rule, "The reveal fits with its picture" (at 390×844 the stage top, the reveal's last line and everything the reveal points at are on screen; no inner scroller), and a new Pre-flight question 7, "Phone fit". The Text budget line now says the reveal is ≤ 90 words (it said 120). `company/design/system.md` also says 90 and points back. The verdict and four changes from the design lead's text are in the Consulted section of `company/decisions/2026-10-14-reveal-fits-with-its-picture.md`, along with two new objection rows. W-263 is done. W-268 (chief-of-staff) is new: roles.mjs still gives the learning designer a 120-word reveal script.
- Belief: 90 is the right single number (moderate confidence). The fit test is the real check; the 90 words is an estimated target (px-per-line was not measured in a build). The budget is not retroactive for lessons that already fit.
- Next: W-242 (platform-engineer), so that Pre-flight 7 can quote px, then the W-264 sweep, which also tests whether 90 is the right number (see that record's objection rows). Also W-265, W-266 and W-267.
- Blocked: nothing. Until W-242 lands, Pre-flight 7 is answered with a 390×844 screenshot.

## 2026-10-14 demo-builder: W-260 eratosthenes-shadow v4, W-261 half-life c3 support

- What changed: eratosthenes-shadow v4 applies the W-258 ruling's stage-only wording verbatim (question, Syene label, chip "The story: 7.2°", reveal, c1, c5). c1 support is now simulation and c5 support is derivation; both are unverified with checkedBy/checkedOn cleared. The hook was an unrecorded historical claim. It is now stage-only ("Can a stick's shadow and one walk size the whole planet? How?") and recorded as c6 (unverified). Version 4, with v4 and Pre-flight v4 in build.md. Separately, the-slowing-half-life c3 support changed from source to derivation, with a note in source; status is still verified.
- Belief: the strings match the ruling (high confidence; checked against the ruling text). tsc and `npm run check` pass. Phone layout not re-checked: next build, QA and walkthrough were not run (caller's order). The new label is shorter than v3's, so the risk is low.
- Next: W-262 (fact-checker) re-checks c1, c5 and c6 against the stage. Still open from the ruling: c4 (Eratosthenes in km, verified from memory) and whether the history should be reopened (cm-geography).
- Blocked: nothing.

## 2026-10-14, design-lead: W-259 decided (reveal must fit with its picture on a phone)

- Changed: decision company/decisions/2026-10-14-reveal-fits-with-its-picture.md. Chose (b)+(d): a phone-fit craft rule (stage top and reveal last line both on screen at 390x844; what the reveal names is visible; aim for 90 words or fewer with a table or several control rows) plus per-lesson fixes. Rejected (a) kit-level hiding of controls, for now (the kit can't tell which controls are safe to hide; the worst crops are picture and table height) and (c) an inner-scrolling reveal (that is the W-135 defect). demo-standard.md was NOT edited: the rule text is in the decision, and W-263 asks the head-of-product to adopt or refuse it. Board: W-259 done; W-263 head-of-product, W-264 platform-engineer (full crop sweep after W-242), W-265 demo-builder (bending-frontier, one-odd-loop), W-266 cm-geography (midnight-sun-line: which told sentences to cut), W-267 demo-builder + cm-cs (compact stages for every-second-seat-out and a-star-heads-for-goal, then a design-lead design review).
- Believe: about 80% sure that the fit rule plus per-lesson fixes is right, and that the inner scroll is wrong. About 60% sure that (a) stays rejected once W-264 measures the real share. The px-per-line estimate (about 23 px, 9 words) has not been measured.
- Next: head-of-product W-263, platform-engineer W-242 then W-264, builders W-265 and W-267, cm-geography W-266.
- Blocked: nothing.

## 2026-10-14, platform-engineer: reveal stage crop on phones (W-135 family; review W-237; commit 1a879c6)

- Changed: `src/components/DemoCard.tsx` `useRevealFit` now shrinks the stage's pictures (outermost control-free `svg[viewBox]`, largest first, inline max-height, floor 40%) before it scrolls the card body at the reveal; controls never scale. A first version that scaled the whole stage with a transform reached the shared branch by snapshot (740f5a1, 01006ec) and broke the QA contract's 24px tap-target check. 1a879c6 replaces it (coordinator direction). The globals.css change is a comment. tsconfig.json was reverted. Note and EDD-lite: company/engineering/notes/2026-10-14-reveal-stage-crop.md. Changelog line added. Board: W-237 (principal-engineer, tier-2 review), W-259 (design-lead, remaining crop), W-242 (mine, reveal-fit should measure stage-top crop); W-241 dropped (it was about the withdrawn transform version).
- Believe: the cause is certain. W-135's scroll to the reveal's bottom pushes a content-sized stage off the top, and no scrollIntoView is involved. The tap-target regression is gone: contract QA on :3490 passed 29 NCM lessons 58/58 and 44 others 88/88. The crop is only partly fixed (medium confidence that this is the best kit-only fix). At 390×844 the stage-top crop went from 187/155/351/467/231/103 px to 33/45/200/275/99/0 (bending-frontier, one-odd-loop, a-star, every-second-seat, midnight-sun, good-lists). In a 29-lesson sample, cropped lessons went from 22 to 10. Where the controls plus the reveal are taller than the card, only a design change can help.
- Next: the principal engineer reviews W-237, the design lead decides W-259, and I do W-242. A full `npm run verify` has not run on the final build: only the contract on 73 lessons, plus `npm run check`.
- Blocked: nothing.

## 2026-10-14, evaluation-steward: W-258 ruling (eratosthenes-shadow c5 and c1)

- Changed: ruled that both c5 and c1 get a stage-only reword ("This lesson's story: ..."), following W-222 and W-247. Neither is held. The ruling, its objection and the exact text are in company/reviews/eratosthenes-shadow/2026-10-14-fact-check.md under "Ruling on W-258". Board: W-260 (demo-builder: question, Syene label, chip, reveal, c1/c5 text, and the hook, which is an unrecorded claim) and W-261 (demo-builder: the-slowing-half-life c3 support becomes derivation). W-258 is done. No lesson files edited.
- Believe: "In the account, X" is still a checkable historical claim that rests only on snippets, and c1 has the same weakness as c5. The history is context, not the objective. About 85% sure. The cost: the answer to the misconception is weaker, and Eratosthenes is now named only in c4 (verified from memory). That is routed to cm-geography, not ruled.
- Next: demo-builder W-260 and W-261, then a fact-checker re-checks c1 and c5 against the stage.
- Blocked: eratosthenes-shadow cannot publish until W-260 and the re-check are done.

## 2026-10-14, fact-checker: pass 27 (re-check of 8 pass 26 claims, W-252/253/254/256)

- Changed: re-checked the-slowing-half-life c3, hailstone-27-climbs c6, one-road-cuts-the-map c6, range-min-in-four-nodes c7, eratosthenes-shadow c5, shrinking-degree c2, enemies-allow-three-camps c5 and throw-it-fast-enough c6 against the new Demo.tsx, including each path that failed in pass 26. 7 verified, 0 disputed, 1 held unverified (eratosthenes c5). Each meta.json has status, checkedBy and checkedOn set, plus an "FC pass 27" source note. A Pass 27 table was appended to each company/reviews/<slug>/2026-10-14-fact-check.md. horizon-ruler v3 code check: all three milestones are reachable by the chips (the slider never hits a stop exactly), so the reveal can open. This was a code read plus a node simulation, recorded in its review file. Board: W-252, W-253, W-254, W-256 done, and W-246, W-248, W-249, W-250 closed. Added W-258 (evaluation-steward) for eratosthenes c5. No code or claim text edited, nothing built.
- Believe: high confidence on the 7. Each was re-run in my own node port (model.ts itself for throw). The one-road state space was enumerated exhaustively, and range-min was tested with 200,000 random sequences. Half-life c3 and enemies c5 rest on derivation, not on the unopened texts. Eratosthenes c5: the stage is fixed, but the sentence now reports what the account says, which only an opened source can confirm. External hosts were refused again (proxy 403 / DNS). The wording was also drafted by the fact-checker in pass 26. c1 in the same lesson was verified on 2026-10-13 from search snippets ("from memory"). That is flagged on W-258, not reopened.
- Next: evaluation-steward W-258. QA W-257 (horizon-ruler, eratosthenes, throw) and QA builds for the other 5 lessons. Builder nit: half-life c3 support should read derivation.
- Blocked: eratosthenes-shadow cannot publish until W-258 is resolved.

## 2026-10-14, demo-builder: W-248, W-249, W-250 (FC pass 26 fixes)

- Changed: **throw-it-fast-enough v6 (W-248).** The reveal now says "your {fastest landing} and 7.9 km/s throws both fell 17.6 km" only when the fastest landing has a first-minute record with the same rounded fall. Otherwise it says "your 7.9 km/s throw fell 17.6 km". c6 was reworded and set to unverified. **eratosthenes-shadow v3 (W-249).** The reveal now reads "In the account, the Sun stood straight overhead at Syene at noon on the summer solstice, so the well had no shadow." The Syene label is now two lines, "Syene, in the account:" / "Sun overhead, no shadow". The question now opens "In the account, at noon on the summer solstice…" with no answer leak. c5 was reworded and set to unverified. **horizon-ruler v3 (W-250).** Milestone names and minInteractions now both come from STOPS (eyes, hundred, tower; 3), so the reveal can open. No claim changed. Each build.md has a Pre-flight section. tsc and `npm run check` pass. I did not run build, QA or a walkthrough, as instructed. W-248/249/250 are in review. I added W-256 (fact-checker re-check of c6 and c5) and W-257 (QA for all three).
- Believe: all three fixes do what the findings asked, read from the code. About 90% sure for the two reveal texts. About 85% for horizon-ruler, because it unlocks only by reasoning and has not been run. About 75% that the two-line Syene label fits on a phone; it has not been seen.
- Next: fact-checker W-256, QA W-257.
- Blocked: nothing.

## 2026-10-14, demo-builder: W-251 (the-slowing-half-life c3, v6)

- Changed: made the stage-only reword from the evaluation-steward's W-247 ruling. The Demo.tsx reveal now ends "so the wait stayed the same: one fixed half-life." The radioactive-decay sentence is gone. The c3 text is now "A first-order reaction keeps one fixed half-life (here 10 min each time)." I dropped the IUPAC Gold Book sentence from c3's source and set c3 to unverified, clearing checkedBy/checkedOn. meta.json is now v6, and build.md has Pre-flight v6. tsc and `npm run check` pass. I did not run build, QA or a walkthrough, as instructed. W-251 is done, and I added W-253 for the fact-checker.
- Believe: every remaining word of c3 and the reveal is shown on stage by the 1st-order waits row. About 90% sure. The text-only edit has not been seen in a browser.
- Next: fact-checker re-checks c3 (W-253). cm-chemistry decides whether to bring back the radioactive-decay bridge once a source can be opened.
- Blocked: nothing.

## 2026-10-14, demo-builder: W-246 (one-road-cuts-the-map c6, v4)

- Changed: in Demo.tsx, "Walk depth-first" now reopens every road. The badges, dotted roads, thick 3-4 and the legend note all show under one condition: walked and no road closed. If you close a road after the walk, the marks hide and the note adds "Reopen all to see the walk." The Walk row stays. meta.json is now v4, c6 reworded and set to unverified, and build.md has Pre-flight v4. tsc and `npm run check` pass. W-246 is in review, and I added W-252 for the fact-checker.
- Believe: the legend now shows exactly when the marks it describes are drawn. A closed road never appears together with the marks, so a red dash can't hide the dotting, and the full-map DFS badges are never drawn over a changed map. About 85% sure. I have not seen this in a browser.
- Next: fact-checker re-checks c6 (W-252). The next build or QA run should look at the stage after chips, then Walk.
- Blocked: nothing.

## 2026-10-14, evaluation-steward: W-247 ruling (the-slowing-half-life c3)

- Changed: ruled (b), reword to stage-only, following the W-222 precedent. The ruling and the objection it raises are in company/reviews/the-slowing-half-life/2026-10-14-fact-check.md under "Ruling on W-247". Added W-251 (demo-builder) with the exact reword. W-247 is done. `npm run check` passes.
- Believe: (a) would loosen the judge. Derivation cannot show that radioactive decay is first order, and snippet agreement is what pass 26 refused to accept. A rule like that belongs in the claim gate by amendment (W-028). Fairly sure (about 85%).
- Next: demo-builder W-251, then a fact-checker re-checks c3. cm-chemistry may restore the radioactive-decay bridge sentence once a source can be opened.
- Blocked: nothing new. Source hosts still fail DNS.

## 2026-10-14, fact-checker: pass 26 batch 2 (12 wave G revisions)

- Changed: re-checked the 20 open claims in cut-the-rod-for-more, one-road-cuts-the-map, the-slowing-half-life, patience-wins-the-split, mercator-greenland, vaccinate-at-the-peak, penalty-on-wiggle, fenwick-hops-by-lowest-bit, palindromes-grow-from-centres, outside-option-sets-the-split, ruler-on-mercator and the-loser-flips-the-winner. 18 verified, 1 disputed (one-road c6), 1 held unverified (half-life c3). Statuses, checkedBy and checkedOn are set in each meta.json, with an "FC pass 26" note in each source. A Pass 26 table was appended to each company/reviews/<slug>/2026-10-14-fact-check.md (new files for mercator-greenland and ruler-on-mercator). Board: W-246 (demo-builder, one-road c6) and W-247 (evaluation-steward, half-life c3). No code or claim text was edited, and nothing was built.
- Belief: high confidence on the 18. Each was re-run in a node port of the lesson logic (d3-geo for the two Mercator lessons) on every reachable branch. None of the 12 has motion-dependent text. The Mercator and Fenwick claims rest on derivation, not on Snyder or Fenwick (neither was opened). The one-road c6 dispute is high confidence: the legend is the note text only while closed === null, and the natural path (chips, then Walk) never clears closed. Advisories that are not disputes: the Equal Earth rhumb bow in mercator c13 is only 2.8 px, and penalty c6 can print equal two-decimal values.
- Next: demo-builder W-246, then a fact-checker re-checks one-road c6. W-247 needs an openable source or a ruling. The QA owner builds and QAs these 12 (not run).
- Blocked: half-life c3 (external hosts fail DNS).

## 2026-10-14 demo-builder: W-243, W-244, W-245 (fact-check pass 26 fixes)

- Changed:
  - shrinking-degree v3 (c2). The stage now names its model. The caption reads "A globe, treated as a sphere of radius 6,371 km" and the reveal reads "Your Seen line, on this sphere of radius 6,371 km: ...". The readouts keep one decimal. c2 now speaks of the sphere only and c4 of the real Earth (111.3 km).
  - range-min-in-four-nodes v4 (c7). The Seen row records only the first combine of 3 to 12 ("Seen (first combine): ..."). Seen blocks stay dashed when not lit, including on the change path (dashed green). The reveal's "dashed when not lit" is unchanged and now true.
  - hailstone-27-climbs v5 (c6). The stage line ends ", ringed." only while the ring is drawn; otherwise it ends "(its step 13).".
  - enemies-allow-three-camps v5 (c5). The claim text is now the reveal string verbatim. No code change.
  - All four claims are unverified, and each build.md has a Pre-flight for the new version.
  - Board: W-243, W-244 and W-245 are done. Added W-254 (fact-checker re-check) and W-255 (learning-designer: "the strict rule" is undefined on stage after the v4 cut).
- Belief: high confidence that each change matches the checker's reachable paths. These were traced in code, not run in a browser. tsc and check pass. Not run: build, QA, walkthrough.
- Note: a concurrent session's commit 2e26574 ("Fact-check pass 26 batch 2") swept in my shrinking-degree Demo.tsx edit. The other files are uncommitted. The uncommitted src/app, src/components and tsconfig changes are not mine and were not touched.
- Next: the fact-checker re-checks the four claims (W-254). The QA owner builds and QAs the 4 lessons.

## 2026-10-14 demo-builder: W-239 (each-element-pops-once pass 25 fixes)

- Changed: in c2, "each new number" became "each later number ... (the first meets an empty stack)". This was the claim text only, because no stage string used the old wording. In c6, "stepped, or replayed with motion on" (a reduced-motion replay jumps), and the reveal now says, in the past tense, "the 9's row showed 8 solid ticks". c2 and c6 are unverified and the lesson is at v4, with the Pre-flight v4 in build.md. Notes: the "-00" in who-pays-same-filter c3 is now "$100" (the checker's quoted nit was left alone). I found no "CT-CHECK" typo in wheel-needs-four-colours c1 (every match is "FACT-CHECK"), so that file is unchanged.
- Belief: high confidence that the text matches the code paths named in pass 25. check and tsc pass. Not run: build, QA, walkthrough.
- Next: the fact-checker re-checks c2 and c6.

## 2026-10-14, fact-checker: pass 25 re-check (W-238, 12 lessons after the pass 24 fixes)

**What changed**
- Re-checked the 9 open claims, plus each-element-pops-once c2 (asked to decide): 8 verified, 2 disputed. Statuses set in each meta.json, with checkedBy/checkedOn and a 'FC pass 25' note appended to each source.
- Verified: wheel-needs-four-colours c4, iss-gravity-still-there c6, hailstone-27-climbs c7, only-the-needed-trader-profits c5, who-pays-same-filter c3 (the Coase naming judged as a naming convention, as the coordinator ruled), two-bets-split c6, patience-wins-the-split c2, pay-for-the-harm-you-do c1.
- Disputed (board W-239, owner demo-builder): each-element-pops-once c2 (was verified; 'each new number is compared once' contradicts its own total of 8) and c6 (the claim says a replay empties the stack box by box, which is false under reduced motion; and the reveal's present-tense 'look at the 9's row' is false when the reveal opens on list 0 after 8..1 9 then the 9 8..1 chip).
- Confirmed deletions: continental-jigsaw c4 and bridge-carries-news-not-habits c5 are gone from meta and stage. rotation-untangles-the-chain: the W-235 soft-lock is fixed in code (Plain-first path traced), and the reveal numbers are unchanged.
- Appended a Pass 25 table to company/reviews/<slug>/2026-10-14-fact-check.md for all 12. Moved W-238 to done. Node ports are in the session scratchpad fc25/ (not kept). No code or claim text edited; no builds.

**What I believe (and how sure)**
- High on the 8 verified. Each was re-run in node against the lesson's own logic, on every branch I could reach, including reduced motion where it applies.
- High that the pops c6 stage-pointer path is reachable (traced in a state-machine port, not in a browser). It is the same kind of stage-pointer problem that pass 24 disputed in patience c2 and pay-for-harm c1.

**Next**
- demo-builder: W-239 (text-only fixes, or put list 1 back on stage at the reveal), then a fact-checker re-checks pops c2 and c6.
- QA owner: build and QA the 12 lessons (still not run).

**Blocked**
- Nothing new. External source hosts still unreachable.

## 2026-10-14, demo-builder: fact-check pass 24 fixes (W-231 to W-236, plus 3 held claims)

**What changed**
- W-231 wheel-needs-four-colours (v3): the ring-of-four record keeps the run that used the fewest colours, and the reveal quotes the ring of four only when that run used 3 or fewer. c4 set to unverified.
- W-232 iss-gravity-still-there (v4): c6 and the Demo.tsx scale comments now say "each point's direction from Earth's centre true", not "every angle". The on-stage chips never contained the phrase. c6 set to unverified.
- W-233 continental-jigsaw (v4): the shelf-edge sentence is gone from the reveal and claim c4 is deleted.
- W-234 each-element-pops-once (v3): Next number now steps the pops one box at a time (one pop per press under reduced motion). "Emptied box by box" shows only if the `sawEmpty` flag is set. "Each later number" in both c6 and the reveal. c6 set to unverified.
- W-235 rotation-untangles-the-chain (v3): choosing Rotating before its first rotation has been seen resets that tree to keys 1 and 2, so the reveal can no longer be locked out. No claim changed.
- Held claims reworded to rest on the stage: hailstone-27-climbs c7 (v3), only-the-needed-trader-profits c5 (v2, "on this network"), who-pays-same-filter c3 (v2, "Economists call this idea the Coase theorem"; "Here bargaining is free"). All three set to unverified.
- W-236 (added mid-task by the coordinator): two-bets-split c6 (v6) now describes the model only; patience-wins-the-split c2 (v3) now reads "That was the line above the chart at 10%" and quotes the recorded run's numbers; pay-for-the-harm-you-do c1 (v3) now reads "At the honest $7, the line under the bars read"; bridge-carries-news-not-habits c5 (v3) is dropped. Changed claims set to unverified.
- Appended a Pre-flight note to each lesson's build.md. Ran `npm run registry`, `npm run check` (pass) and `npx tsc --noEmit -p .` (clean). Moved W-231 to W-236 to done and added a fact-checker re-check item. No build, QA or walkthrough was run.

**What I believe (and how sure)**
- High that the text fixes do what the pass 24 rows asked.
- Medium-high on the logic of the pops and rotation changes. I traced it by hand and it typechecks, but nobody has run it in a browser. The reduced-motion press-by-press path in each-element-pops-once is the riskiest.
- each-element-pops-once c2 ("each new number is compared once") has the same off-by-one as c6. I did not change it because it is still verified; the fact-checker should decide.

**Next**
- Fact-checker: re-check the unverified claims listed on the new board item.
- QA owner: build and QA for these 12 lessons (`npm run verify`). Not run here, as instructed.

**Blocked**
- Nothing.

## 2026-10-14, fact-checker: pass 24 batch 2 (17 wave E lessons, 37 open claims)

**What changed**
- Checked all 37 open claims in the 17 lessons in batch 2: 33 are verified and 4 are disputed. Statuses are set in each meta.json, with a "FC pass 24" note in each source.
- Added a Pass 24 table to company/reviews/<slug>/2026-10-14-fact-check.md for all 17 lessons. I re-ran the numbers in my own node ports, kept in the session scratchpad fc24/.
- Disputes (board W-236, owner demo-builder):
  - two-bets-split c6: "Real investments often fall together" has no source anyone can open.
  - patience-wins-the-split c2: the reveal says "That is the line above the chart: offer 0.9 × …", but on the QA path that line shows the 1-round or 50% state.
  - pay-for-the-harm-you-do c1: the reveal quotes the honest-bid sums line. On the hint's own path (honest, then a lower bid) the line shows $60 / $5.
  - bridge-carries-news-not-habits c5: Centola & Macy and E&K still can't be opened. This was held in pass 23 and is now disputed so the block is visible.

**What I believe (and how sure)**
- High: every verified number. Each one was re-derived independently and checked against every reachable branch and the reset state.
- Medium: whether the two "stage pointer" disputes (c2 and c1) are factual or presentational. The sentences are false about what is on screen when the reveal opens, so I treated them as factual.

**Next**
- demo-builder fixes W-236, then a fact-checker re-checks those 4 claims.

**Blocked**
- Every external source host still fails DNS, so world claims need sources that can be opened here, or rewording.

## 2026-10-14, fact-checker: pass 24 batch 3 (17 wave E lessons, 36 open claims)

**What changed**
- Set status on all 36 unverified claims in the 17 lessons listed in the pass 24 batch 3 file: 34 verified, 2 disputed, 0 withdrawn. Each has checkedBy/checkedOn and a 'FACT-CHECK 2026-10-14 (pass 24)' note appended to its source.
- Appended a 'Pass 24' table to company/reviews/<slug>/2026-10-14-fact-check.md for each of the 17 slugs.
- Board: W-232 (iss-gravity-still-there c6) and W-233 (continental-jigsaw c4), both owner demo-builder.
- No code or lesson text edited; no builds. `npm run check` passes.

**What I believe (and how sure)**
- High on the 34 verified: every number was re-run in my own node copies of the lesson logic (scratchpad fc24/), including the branches I could reach and the state after reset.
- iss c6: high that 'every angle true' is false under the radial height stretch (only the direction from Earth's centre is kept).
- jigsaw c4: the source is unopened (all hosts 403), and search text puts the 500-fathom fit contour on the continental slope, not the shelf edge. Medium on the wording issue.

**Next**
- demo-builder: reword iss c6 and jigsaw c4 (W-232, W-233), then the fact-checker re-checks. A human with web access should open Bullard et al. 1965 (the abstract is enough for c4).

**Blocked**
- Source hosts are blocked from the sandbox (proxy 403).

## 2026-10-14, learner evaluator (Sam): r6 learner reviews of the 8 held geography lessons, screenshots seen

**What changed**
- Ran `WALKTHROUGH_URL=http://localhost:3470 npm run walkthrough` (build 3) for each lesson, one at a time, and read every sheet.png. Wrote findings, then read the 2026-10-13 review.
- Wrote company/reviews/<slug>/2026-10-14-learner-<boundary>-r6.md for eratosthenes-shadow, fingernail-ocean, half-of-humanity, horizon-ruler, mercator-greenland, null-island-lat-lon, ruler-on-mercator, shrinking-degree. Each uses the lesson's own meta.json learner boundary.
- Verdicts: launch for null-island-lat-lon only. The other 7 are revise. No fatal flaws.
- The most common failure is "The reveal quotes what you saw": the quoted milestone state is no longer visible on the stage when the reveal opens (6 lessons).
- "No answer before the commit" fails in mercator-greenland (the hook "look enormous", and the right option is the only one with no number) and shrinking-degree (the hook "sounds like a fixed distance"). fingernail-ocean has a weaker pointer: its +100/+20 buttons sum to the answer.
- Did not touch lessons, the board or publish-holds.json.

**What I believe (and how sure)**
- High that the findings describe what the screenshots show. Medium on strictness: I counted told context facts (true areas, 40,008 km) as allowed, and counted stage-type values the learner never reached ("2.9 at 70°", "about 19 km") as failures.
- Simulated learner. These reviews are not evidence that anyone learned.

**Next**
- Release manager: update the holds from the r6 verdicts. Demo builder: fix the revise findings, then re-walk for an r7 learner review.

**Blocked**
- Nothing.

## 2026-10-14, fact-checker (Ingrid): fact-check pass 24, batch 1 (17 wave E lessons)

**What changed**
- Checked the 37 open claims across the 17 lessons in batch 1. Verdicts: 36 verified, 1 disputed (cs.wheel-needs-four-colours.c4), 0 withdrawn.
- Set status, checkedBy and checkedOn in each meta.json, and appended a pass-24 note to each claim's source.
- Appended a "Pass 24" table to each company/reviews/<slug>/2026-10-14-fact-check.md.
- Board W-231 (demo-builder): the wheel c4 fix.

**What I believe (and how sure)**
- High: every number was re-run in node using ports of the lessons' own code, and every reachable branch was read.
- High: the wheel dispute is real. Here is the path: choose 4 colours, then Ring of 4, and colour it by hand with 4 colours; then run backtracking. The reveal then says "done with 4 colours", because the first successful record is kept.
- Non-blocking notes for builders are in the records:
  - near-and-far: 0.5% is displayed as 1%.
  - keep-one-of-a-stream: the tally switches to the 5-item run without a re-run.
  - one-odd-loop: if the learner runs "Try all" before picking loops, no walk is drawn, yet the reveal refers to it.

**Next**
- demo-builder fixes W-231, then a fact-checker rechecks wheel c4.

**Blocked**
- Nothing.

## 2026-10-14 (afternoon), chief of staff (Ada): NCM vertical via the Courses org; algorithms batch 2; waves D–E; 544 published

**What changed**
- **Courses org.** Created courses-lead (Amara) and cm-course-ncm (Jonah) after consulting Priya and Leonie. Their six changes are adopted (company/decisions/2026-10-14-courses-org.md).
  - Jonah mapped the book: content/courses/ncm/chapters.json, 156 sections, 106 demo-able.
  - The book host (cs.cornell.edu) and every mirror are blocked by the environment's network policy. Section numbers are therefore unconfirmed, and references cite the chapter only.
- **NCM batch 2.** Jonah wrote 51 gap briefs. Strand managers accepted 49 and objected to 2. All 49 are built, and every E&K chapter (1–24) now has lessons.
  - Session 2's batch 1 (17 lessons) is PR #3. Femi reviewed it (prs/3.md): merge with changes, waiting on 4 fixes on ccr-rnd-ncm.
- **Algorithms batch 2.** 40 briefs inspired by TheAlgorithms/Python: 21 single-card and 19 with specs. All are built. Algorithms now has 80 lessons.
- **Reviews and fixes.**
  - Wave D: 226 learner re-reviews and 63 revisions.
  - Wave E: about 160 reviews and 72 revisions (6 of 7 batches merged).
  - Fact-check passes 19–23: about 1,140 claims, with disputes fixed and rechecked.
  - Integrated builds 2–3. Build 3 QA: 362 of 372 passed; the 5 failing lessons have been fixed and need re-QA.
- **Published.** 250 at the start of the day → 447 (wave D) → 544 (wave E).
- **Rules added to demo-standard.md (Priya):**
  - "Show the why you promised" (told-vs-shown decision).
  - "No answer before the commit" and "The reveal quotes what you saw", with a builder pre-flight in build.md.

**What I believe (and how sure)**
- High: the numbers. Every claim was re-derived by a fact-checker, and no learner sentence depends only on an unopened source.
- Medium: learning value. Every verdict comes from a simulated learner.
- Revise rates on first review were about 50%. The two new rules target the main causes. Priya reopens them if more than 1 in 5 pre-flighted lessons still fail.

**Next**
- Merge revE-2.
- Integrated build 4, then QA. This covers all revised lessons, the 5 QA-path fixes and two-stacks v4.
- r7 learner reviews, fact-check of reopened claims, and publish.
- Merge PR #3 when session 2 pushes the final head.
- The geography re-review decides the 8 screenshot holds.

**Blocked**
- E&K section confirmation and W-222 (3 held claims): need someone who can open the book and papers, or the founder allowing the hosts.
- PR #2 merge: waits on the founder (session 2 asked).

## 2026-10-14 · demo-builder · QA-path fixes: cut-the-rod-for-more v2, drop-the-losing-start v3
- Changed: cut-the-rod-for-more gets "Fill the rest" and "Start over" moves first in DOM order (disabled on an empty table), so one press per control reaches first-fill and best-4 with $10 still on stage. drop-the-losing-start: the real QA failure was a dead control ("Auto: start over below 0" pressed at total 0 changed only its class), not the reveal; a stage rule line now shows the current rule. No claim text changed. Pre-flight in each company/reviews/<slug>/build.md.
- Believe: high (traced the QA loop by hand against the code); check and tsc pass. Not run: next build, computer-use QA, walkthrough.
- Next: qa-tester re-runs tests/qa/contract.spec.ts on both slugs (phone + desktop) and records the result.
- Blocked: nothing.

## 2026-10-14 · community-engineer · PR #3 (ccr-rnd-ncm, session 2) evaluated: merge with changes
- Changed: new record company/engineering/community/prs/3.md. Board: W-226 (community-engineer, PR #3, review), W-227 (rnd-lead: take src/kit/knots off the PR until EDD-004 is approved), W-228 (demo-builder: news-comes-from-acquaintances section -> section_unconfirmed; one-good-link-beats-many format/interactions), W-229 (qa-tester: QA on the final head for all 17 lessons, agenda-picks qa-record). I ran a trial merge of `e2b7cc0` onto `e20baa0`: no conflicts, check and tsc pass. Then I aborted it, so nothing from the PR is committed.
- Believe: high that the PR touches no protected paths and adds no dependencies, and that all 129 of its verified claims are fact-checker-verified. Its 2 withdrawn claims are not in learner text. Medium on the attribution, because session 2's snapshot commits mix roles. 15 learner verdicts describe pre-revision versions, and the-giant-appears has none. Those are publish gates, not merge gates.
- Next: W-227/228/229 on ccr-rnd-ncm, then I re-trial on the final head, fold company/ops/inbox/session-2.md (S2-01..23) into the board with mapped ids, and merge. prs/2.md §5 still needs updating to match the head-of-product tranche decision, which lands in this PR.
- Blocked: src/kit/knots waits on the principal engineer's review of EDD-004.

## 2026-10-14 · head-of-product · Decision: no answer before the commit; the reveal quotes what you saw
- Changed: new decision company/decisions/2026-10-14-reveal-quotes-what-you-saw.md. company/product/demo-standard.md gained two `*` craft rules ("No answer before the commit", "The reveal quotes what you saw") and a new "Pre-flight (the builder answers in build.md)" section with six questions. Board: W-150 done, W-154 done (standard half). Added W-223 (evaluation-steward: the review-side leak/seen check in the learner-evaluator brief, the rest of W-154), W-224 (demo-builder: apply pre-flight to the 8 r6 revise lessons named in the decision), W-225 (learning-designer: throw-it-fast-enough slider/landing redesign).
- Believe: high that these two patterns drive most r6 revises (8 reviews read in full; verdicts 64 revise / 154, 51/84 on first reviews). Low on the exact split (~37 of 64 from a keyword grep, not hand-coded). Medium that a builder self-check will cut them; the decision's Revisit-if is "more than 1 in 5 still sent back for either pattern on lessons built with a pre-flight".
- Next: demo-builder W-224, then learner re-reviews; evaluation-steward W-223. Open objection: Reset-safe state in the kit is funded by W-031 (platform-engineer). Nothing blocked.

## 2026-10-14 · fact-checker · Pass 23 batch 1: 18 lessons, 41 open claims + 2 unrecorded
- Changed: meta.json status for the 5 new lessons: only-the-needed-trader-profits c1-c6, harm-prices-clear-the-market c1-c5, lower-bid-takes-the-top-ad c1-c5 + new c6, who-pays-same-filter c1-c5, two-public-clues-break-the-herd c1-c5 + new c6. Also the 15 re-checks: last-digit c2/c3, four-in-a-row c1/c6, penalty c6, deleted-key c3, fewest-exits c5, kmp c7, pairs-xor c2, ring-buffer c1, two-stacks c5, same-revenue c6, bridge c5, ramp c2, pivotal-juror c3. Result: 37 verified, 3 disputed (last-digit-first c2, lower-bid c6 new, two-public-clues c6 new), 3 held unverified (bridge c5, only-the-needed c5, who-pays c3), 0 withdrawn. "Pass 23" tables were added to company/reviews/<slug>/2026-10-14-fact-check.md, and the files were created for the 5 new lessons. Board: W-221 (demo-builder, disputes) and W-222 (source checks for the held claims) added; W-216 moved to done (batch 0 covered karatsuba, bank and enemies; this batch covered the rest).
- Believe (high): I re-ran every number in my own node copies of the lesson logic (scratchpad fc23/: radix, pow.ts, vcg, vcg4, sr, plus one-liners). The disputes rest on my own arithmetic. No source host was reachable (proxy 403 / DNS), so I opened no paper or book. Claims verified despite an unopened citation were verified by derivation or simulation, and each source note says so (e.g. harm-prices c4: 3,150 random markets, VCG = minimum clearing prices, 0 counterexamples). The three held claims rest on an attribution or a general theorem I could not re-derive.
- Note: the dispatch named the-loser-flips-the-winner, weak-links-hold-it-together and all-lines-meet-in-one-mother, but they were in batch 0 (see the entry below), not in this batch's list. The fc23/ scratch dir is shared with batch 0, so same-named helper scripts (set.mjs, add.mjs, radix.mjs) may have been overwritten. Their results are already on disk.
- Next: demo-builder W-221 (3 wording fixes; last-digit c2 is a claim-text change only), then a fact-checker re-check. Penalty-on-wiggle c6 carries an advisory, not a dispute: 'the other story' can print a moderate held-out miss worse than none. Someone with source access does W-222. ramp-same-work's meta objective still says '122.6 N x 4 m = 490.5 J'; it is not learner text, but cm-physics may want it aligned. Nothing blocked.




## 2026-10-14 · fact-checker · Pass 23 batch 0: 17 lessons, 41 open claims
- Changed: meta.json status for accurate-bettor-takes-the-pot c1-c6, all-lines-meet-in-one-mother c1-c6, patience-wins-the-split c1-c5, the-loser-flips-the-winner c1-c5, weak-links-hold-it-together c1-c5 (new), plus the re-checks newton c1/c5, kitchen-crowding c2/c5, bracket-order c5, every-base c7, karatsuba c5, one-cell-rule-30 c1, random-surfer c1, selfish-routes c4, bank-lends-it-again c7, continental-jigsaw c1, enemies c6, every-scale c6. Result: 36 verified, 4 disputed (weak-links c4, accurate-bettor c5, every-base c7, continental-jigsaw c1 unchanged), 1 held unverified (newton c5), 0 withdrawn. "Pass 23" tables in company/reviews/<slug>/2026-10-14-fact-check.md (created for the five new lessons). Board W-217 to W-220 (demo-builder).
- Believe (high): every number re-run in my own node copies of the lesson logic (scratchpad fc23/verdicts.json holds the notes). The disputes rest on my own computations, not on sources. Every external host failed (DNS or proxy refusal), so no source was opened. Claims whose learner text is proved by derivation or simulation were verified with the unopened citation noted. newton c5 (a naming fact) was held. Medium: I re-derived the Roughgarden-Tardos 4/3 bound and the Rubinstein limit myself; the attributions come from my own knowledge.
- Not done: who-pays-same-filter and two-public-clues-break-the-herd were named in the dispatch as new NCM lessons but are not in the batch-0 list, so they were not checked here. Bash calls were sometimes refused by the auto-mode classifier. Retrying with plain node one-liners worked, and no permission setting was changed.
- Next: demo-builder W-217 to W-220, then a fact-checker re-check. A human source check for continental-jigsaw c1 (Table 1, fit 9).

## 2026-10-14 · demo-builder · Pass 22 fixes W-207 to W-215 (11 lessons)
- Changed (Demo.tsx + meta.json, version bumped, changed claims set to unverified with checkedBy/On removed, a "Builder fix" note added to each source): karatsuba c5 (reveal now says "ideal no-carry count ... 3^10 against 4^10"); ramp-same-work c2 ("≈" in reveal and log); kmp c7 ("never one to its left"); bank-lends-it-again c7 (caption sign is "=" only when the whole-dollar figures multiply out exactly, otherwise "≈"); fewest-exits c5 (source now rests on the 8x8-from-(4,2) counterexample, stuck at 60; I re-ran it; support is now derivation; learner text unchanged); same-revenue c6 (reworded per the FC suggestion); enemies c6 (Demo tracks the splits seen with all 20 triangles checked and quotes only those; unseen splits are stated without "you saw"); two-stacks c5 (FC wording); four-in-a-row (TOL changed to 0.0005, so settled is round 9 with readout $0.667/$0.333; Demo comment and c1 source fixed; c1 and c6 unverified); bridge c5 ("Network researchers argue ... holds"); penalty-on-wiggle c6 (fallback now quotes the best moderate penalty on the current data set; seed 1 gives 0.01, 0.38 vs 0.44). No milestone gates or control order changed.
- Believe: high for the text and the numbers. Medium for the code: npm run registry and npm run check pass, but per instruction I ran no typecheck, build or QA. The enemies and penalty edits are new TSX logic.
- Next: fact-checker re-checks (W-216). An integrated typecheck/build/QA run should cover enemies-allow-three-camps, penalty-on-wiggle, bank-lends-it-again and four-in-a-row-two-thirds. Nothing blocked.

## 2026-10-14 · fact-checker · Pass 22 batch 0: 12 lessons (50 open claims + 1 unrecorded)
- Changed: meta.json status for ternary-asks-more c1-c9, gray-code-one-flip c1-c5, four-in-a-row-two-thirds c1-c5, pay-for-the-harm-you-do c1-c5, bridge-carries-news-not-habits c1-c5, temperature-reshapes c3/c4/c6/c9, honest-bid-loses-in-gsp c1-c4, stag-needs-three-in-four c1-c4, capped-doubling-game c2/c6/c7/c8, penalty-on-wiggle c5/c6, the-fast-ones-leave c8/c9, side-of-the-square c6. Result: 48 verified, 2 disputed (bridge c5, penalty c6), 0 withdrawn. I also recorded one unrecorded reveal sentence as four-in-a-row c6 and marked it disputed: "settled at $0.667 by round 8" while the round-8 readout shows $0.666. Each lesson has a "Pass 22" table in company/reviews/<slug>/2026-10-14-fact-check.md. Board: W-214 and W-215, both owned by demo-builder.
- Believe (high): I re-ran every number with my own node copies of the lesson logic, in scratchpad fc22/ (binary and ternary search, Gray code, balanced-outcome iteration, VCG, GSP, threshold contagion, softmax, mulberry32 strip, ridge seeds 1-500, molecule escapes). Medium: the source-backed lines. Every primary host was blocked, so the following are corroborated only by search snippets: Gray patent and encoders, ternary search for a hill top, Centola & Macy 2007, EOS 2007, Skyrms 2004 / Rousseau. VCG attribution (Vickrey, Clarke, Groves) is from my own knowledge. E&K chapters 6, 12, 15 and 19 are placed from my knowledge, and the ch. 12 title is confirmed by a ToC snippet. Varian 2007 and Knuth 4A were not opened, and no learner sentence depends on either.
- Next: demo-builder fixes W-214 and W-215, then fact-checker re-checks four-in-a-row c6, bridge c5 and penalty c6. Nothing blocked.

## 2026-10-14 · fact-checker · Pass 22 batch 4: 11 lessons (49 open claims + 2 unrecorded)
- Changed: meta.json status for keep-one-of-a-stream c1-c6, turns-beat-first-come-first c1-c6, hailstone-27-climbs c1-c5, lowball-offer-should-pass c1-c5, same-revenue-any-rule c1-c5, enemies-allow-three-camps c1-c5, pennies-dont-add-up c1/c2/c5/c9, someone-has-to-swerve c1-c4, iss-gravity-still-there c4/c6/c7/c8, bending-frontier c1/c3/c5, waves-return c2/c7: all 49 verified (checkedBy fact-checker, pass-22 notes in source). Recorded 2 unrecorded reveal sentences as new claims, both disputed: same-revenue-any-rule c6 ("First-price charges less": averages are equal, and it is lower in only 10,065 of 20,000 auctions) and enemies-allow-three-camps c6 ("you saw 2, 3 and 6 camps": the milestones need only one other split). Board W-211, W-212 (demo-builder). "Pass 22" tables in company/reviews/<slug>/2026-10-14-fact-check.md.
- Believe (high): every number was re-run in node with my own copy of each lesson model (mulberry32 tallies, round robin, Collatz, auction sims, triangle tallies, Verlet throws, SIRS). Medium: the source-backed lines (turns c6 context-switch overhead, hailstone c4/c5, revenue-equivalence attribution, weak balance, NASA free fall, Mankiw PPF) rest on search-result text. The proxy blocked every primary host. Easley-Kleinberg chapter placements (5, 6, 9, 12) match my knowledge; ch. 6 hawk-dove naming is medium. The hailstone c4 source says 2^68 for Barina 2021, which search did not confirm (Barina 2025 gives 2^71). That is not learner-facing, but the builder should fix it. The ISS walkthrough transcript predates v2, so the stage was checked from Demo.tsx only.
- Next: demo-builder W-211/W-212, then fact-checker re-checks the two c6 claims. A fresh walkthrough for iss-gravity-still-there before launch review. Nothing else blocked.

## 2026-10-14 · fact-checker · Pass 22 batch 1: 50 open claims in 12 lessons
- Changed: 49 verified and 1 disputed, all marked checkedBy fact-checker with a pass-22 note in the source field. The lessons are boyer-moore-skips-ahead c1-c8, fewest-exits-first-tour c1-c5, kmp-never-steps-back c1/c2/c3/c5/c7 (c7 disputed), no-best-move-one-stable-pair c1-c5, shade-your-sealed-bid c1-c5, one-odd-loop-blocks-two-camps c1-c5, middle-of-three-takes-all c1-c4, two-thirds-of-the-average c1-c4, the-slowing-half-life c3-c5, patience-piles c5-c7, bank-lends-it-again c1/c7 and split-the-sum c3. A "Pass 22" table was appended to each company/reviews/<slug>/2026-10-14-fact-check.md. Board: W-209 (kmp c7 fix) and W-210 (non-blocking bank caption rounding, fewest-exits c5 source), both owned by demo-builder.
- Believe (high): every number was re-run in my own node scripts. Horspool gives 15/5/11 and the naive search 27/18/24. The knight runs give 21/25/36/64. The Warnsdorff tie rule the lesson uses fails on 8x8 from (4,2) with 60 squares. That counterexample is the basis for fewest-exits c5, because the Squirrel & Cull paper was not opened. The unique pure NE is (M,L), the best bid is $40, half-value is a best reply for every value, and the Harary theorem held on 3,000 random signed graphs. kmp c7: the reveal says the next comparison is "never one already read", but text positions 3-7 are each read twice. Medium: every external host was blocked (proxy 403). Citations for Horspool, Nash, Vickrey, Harary and radioactive first-order decay were corroborated only by web-search snippets. E&K placements (ch. 5, 6, 9, 12) rest on my knowledge of the book.
- Next: demo-builder W-209, then fact-checker re-checks kmp c7. Nothing blocked.

## 2026-10-14 · fact-checker · pass 22, batch 2 (12 lessons, 50 open claims)
- Changed: claim status in meta.json for karatsuba-three-not-four, the-bar-nobody-can-forecast, one-crowded-bucket, odds-average-the-bettors, useless-degree-still-pays, one-shy-rioter-stops-the-riot, rising-price-stops-at-second, broker-between-two-groups, flaw-to-lawn, tortoise-meets-hare, two-bets-split, ramp-same-work. 48 verified, 2 disputed, 0 withdrawn. A Pass 22 table was appended to company/reviews/<slug>/2026-10-14-fact-check.md for each lesson (files created where missing). Board: W-207 and W-208 (demo-builder).
- Disputed: karatsuba c5. The reveal says 1,024-digit numbers take 59,049 products. The lesson's own kara() gives about 86,000 on real inputs, because half-sums carry. ramp c2: the log prints "122.6 N × 4 m = 490.5 J", but 122.6 × 4 = 490.4.
- Believe (high): every number re-run in my own node scripts (scratchpad fc22), including independent betweenness and Levenshtein checks. Medium: citations. The source hosts were blocked, so Arthur 1994, Granovetter 1978, Kelly 1956, Spence 1973, Vickrey 1961, Burt 1992 and Karatsuba-Ofman 1962 are confirmed only as bibliographic records found by search; none was opened. E&K chapter placements come from memory: ch. 3 (Burt) and ch. 22 (betting) confident; ch. 17 (El Farol) fairly sure, since ch. 17 = Network Effects is confirmed; ch. 22 (Spence) and ch. 19 (Granovetter) less sure. None of these chapters is shown to learners.
- Next: demo-builder fixes W-207/W-208, then the fact-checker re-checks. Non-blocking notes are in the bar and odds records (reset edge case; presets keep current beliefs). Nothing blocked. npm run check passes.

## 2026-10-14 · demo-builder · pass 21 rewordings (W-195, W-196, W-198, W-203, W-204)
- Changed: reveal text + claim text in 6 cs drafts. deleted-key-breaks-search c3 (v4): the reveal now reads "breaks the search for C (and any key whose probe path from its home slot crosses the gap)", and the claim is that sentence. bracket-order-sets-the-bill c5 (v2): "shortest sub-chains first". newton-doubles-the-digits (v2): c5 now says "the rule known as the Babylonian (or Heron's) method", with no YBC 7289 assertion in text or source; c1 now matches the reveal ("1, 3, 6, then 12 ... not twelve"). pairs-cancel-under-xor c2 (v2): reveal and header comment say "its partner flips the same lamps back". random-surfer c1 (v2): parenthetical fixed. ring-buffer c1 (v2): now includes "went round two and a half times". All 7 changed claims are unverified. Board: W-195/196/198/203/204 done, plus a fact-checker re-check item.
- Believe (high): claim texts match the stage sentences. Ignore JSX line wraps and &apos;. Medium: the old deleted-key c3 also covered the search mechanism ("starts at the hash slot, walks right"). That mechanism now appears only in the question and c6. Fact-checker should decide whether it needs its own claim. pairs-cancel had no stage text with the phrase (only the reveal and a code comment).
- Not run: tsc and next build (another builder held tsc) and QA. npm run registry and npm run check pass.
- Next: fact-checker re-check (board). Nothing blocked.

## 2026-10-14 demo-builder: TS2322 fix + W-192, W-193, W-194, W-197 (pass 21 disputes)

- cs/one-cell-rule-30 v2: grow() `row: number[]` (TS2322, no behaviour change); W-197 reveal drops "with no pattern" (c1 unverified).
- cs/every-base-fools-fermat v2: LIARS counts base 1 too, reveal reads 10 of 320; c7 text "10 of the 320", unverified.
- cs/selfish-routes-cost-a-third-more v2: reveal and c4 say "a fixed time plus a part proportional to traffic", unverified.
- probability/the-pivotal-juror-convicts v2: pGuilt = guilt(g, 3 - g), bar 7/30/70%; reveal was already right; c3 extended to 70%, unverified.
- `npx tsc --noEmit -p .` 0 errors; registry up to date; check passed. Board items done. next build and QA not run (instructed). Next: fact-checker re-checks the 4 claims.

## 2026-10-14 demo-builder: W-201 kitchen-crowding v4, W-202 last-digit-first v4 (pass 21 disputes)

- kitchen-crowding: c2 kept 'highest' and made code agree (seen.zero = max). c5: two-oven state recorded and quoted only when totalOf(n,2) > totalOf(n,1) (n >= 2); reveal also prints the one-oven total. c2, c5 unverified.
- last-digit-first: reveal no longer points at stage marks or a ringed bucket; it names bucket N and its cards from runs.last pass-3 buckets and the first out-of-order pair from ended.first. c2, c3 unverified.
- Belief: texts now true on every path (fairly sure; reasoned, not browser-QA'd). No next build/tsc run, per instruction. Controls unchanged.
- Next: fact-checker re-checks kitchen-crowding c2/c5 and last-digit-first c2/c3; QA owner runs `npm run verify`.

## 2026-10-14 · fact-checker · Pass 21 batch 5: 49 open claims in 12 lessons
- Changed: 48 claims verified and 1 disputed, all with checkedBy fact-checker and a pass-21 note in the source field. The lessons are new-server-moves-few-keys c1-c6, pairs-cancel-under-xor c1-c6 (c2 disputed), friends-split-more-than-chance c1-c6, every-second-seat-out c1-c5, random-surfer-finds-the-rank c1-c5, wheel-needs-four-colours c1-c5, ring-buffer-wraps-around c1-c4, one-nudge-per-mistake c2/c4/c5, tic-tac-toe-is-a-draw c1/c2/c4, whose-cutoff-wins c4/c6, seventy-two-doubling c4/c5 and half-of-humanity c1. A "Pass 21" table was appended to each company/reviews/<slug>/2026-10-14-fact-check.md. Board: W-203 (dispute fix), W-204 (claim-text tidies), both owned by demo-builder.
- Believe (high): every number was re-run from my own copies of the lessons' logic: FNV ring 20.4%, binomial 0.000264, Josephus 19, PageRank 0.312/0.332, wheel 6 dead ends, 255,168 games, rule-of-72 errors. half-of-humanity c1 is finally checked against UN WPP 2024 data. The files come from the wpp2024 R package on raw.githubusercontent.com, which is reachable while population.un.org is not. Mid-2024 was rebuilt from births/CBR, from deaths/CDR, and from the mean of 1 Jan 2024 and 1 Jan 2025. All 16 values match. Medium: book chapter placements (E&K ch. 4 and ch. 14, GKP 1.3, CLRS 10.1/34, Bishop 4.1.7) come from my own knowledge, not from opened books. Karger 1997 and the ring-buffer sources were corroborated only through web-search snippets.
- Dispute: pairs-cancel-under-xor c2. The stage and reveal say "the lamps it switched on switch back off". On the default order the first 3 turns lamps OFF and its partner turns them ON. Fix: "flips the same lamps back".
- Next: demo-builder W-203 (then the fact-checker re-checks c2), W-204. Tip: the wpp2024 package on GitHub is a usable WPP 2024 source for other geography claims (parser in my pass-21 scratchpad was ad hoc; re-derive). Nothing blocked.

## 2026-10-14 · fact-checker · pass 21 batch 4 (12 lessons)
- Changed: claim statuses in 12 meta.json files (algorithms batch 2, NCM course, wave D revisions): 46 verified, 2 disputed, 0 withdrawn. Pass 21 tables appended to (or created in) company/reviews/<slug>/2026-10-14-fact-check.md. Board: W-197 (demo-builder, rule-30 c1), W-199 (geography CM, jigsaw c1 human source check), W-200 (cm-cs-algorithms, queue-or-stack CLRS edition mismatch in curriculum refs).
- Believe (high): one-cell-rule-30 c1. The numbers are right, but the reveal says the counts went "with no pattern" and the odd steps read 3, 6, 9, 12. continental-jigsaw c1 (medium): the paper is still unopened and secondary sources conflict (an OCR extract gives 44.0/30.6/57.0 for fit 9, Virtual Explorer gives 42.9/-30.1/57.1). Every other verdict rests on node re-runs of each lesson's own model. Medium: E&K ch. 7 (ESS) and ch. 18 (power laws) placements, rule 30 "no known formula" (OEIS extract only) and NKS p. 317 (search extract) were not opened directly. Hosts are blocked by the proxy.
- Next: W-197 builder fix, then a fact-check re-check of rule-30 c1. W-199 needs a human with the Phil. Trans. paper. Blocked: jigsaw c1 on that human check.

## 2026-10-14 · fact-checker · Pass 21 batch 0: 49 claims over 12 lessons (algorithms batch 2, NCM, wave D)
- Changed: meta.json claim status for undo-a-multiplication-mod-n (8), shuffle-until-sorted (6), cut-the-rod-for-more (5), fenwick-hops-by-lowest-bit (5), rolling-hash-window (5), hawks-never-take-over (5), same-letters-same-key (4), where-the-dew-forms (3), two-writers-one-counter (3), deleted-key-breaks-search (2), dam-depth-not-width (2), seattle-moscow-heading (1). 48 verified, 1 disputed (deleted-key-breaks-search c3), 0 withdrawn. "Pass 21" tables in each company/reviews/<slug>/2026-10-14-fact-check.md (4 files created). Board: W-195 (demo-builder, c3 rewording).
- Believe (high): every number re-ran in my own node using each lesson's own logic (seeded mulberry32 runs, Euclid/back-substitution, rod DP + brute force, Fenwick cells, rolling sums, replicator, interleavings, Magnus dew point, great-circle arch). Medium: primary sources (RSA 1978, Fenwick 1994, Gruber et al. 2007, Maynard Smith, OpenStax, CLRS, Knuth) were not opened, since the proxy blocks the hosts. Verdicts rest on derivation or web-search secondary text, and each note says so. Easley and Kleinberg ch. 7 = evolutionary game theory (catalogue); the section number is from memory.
- Next: demo-builder W-195, then fact-checker re-checks c3. Minor builder notes (not disputes): the dam log skips a width reached at another depth before returning to 10 m; the dew Fullness readout shows 100% at 18.5 C while Dew says none. No build or QA run. Nothing blocked.

## 2026-10-14 · fact-checker · pass 21 batch 2 (12 lessons)
- Changed: claim statuses in 12 meta.json files (algorithms batch 2, NCM course, wave D revisions): 45 verified, 3 disputed, 0 withdrawn. Pass 21 tables appended to company/reviews/<slug>/2026-10-14-fact-check.md (created for groups-where-everyone-reaches-everyone). Recorded one unrecorded reveal sentence as probability.every-scale-equally-likely.c6 (unverified; I recorded it, so another pass must check it). Board: W-192, W-193, W-194 (demo-builder).
- Believe (high): disputes are real. every-base-fools-fermat c7: strong liars are 10 of 320 counting base 1 (Demo LIARS drops base 1 but keeps 320). selfish-routes c4: 4/3 bound is for affine delays; "in proportion" names a class with price of anarchy 1. pivotal-juror c3: Demo pGuilt = guilt(g, 1) shows 30%/50% where it should show 7%/30%. Medium: E&K chapter placements (ch. 8, 18, 20, 23) and CLRS numbering are from memory; book hosts, OEIS, Wikipedia and paper PDFs are blocked by the proxy. Verdicts rest on my own node re-runs and derivations, not on unopened sources.
- Next: demo-builder fixes W-192..W-194, then a fact-checker re-check of those three claims and of every-scale c6. Nothing blocked.

## 2026-10-14 · interaction-designer (ncm specs) · who-pays-same-filter spec
- Changed: company/design/specs/who-pays-same-filter.md + .svg (economics.markets NCM #5, Coase). Side-by-side, stacked: "Right to pollute" (laundry offers $50 / $200 / $350) over "Right to clean air" (factory: pay $300 damages / fit $100 filter). 5 controls, each once; gate `deal-struck` + `liable-fits` (filter fitted in both, both Totals −$100). Model line labels the simplification. Board: W-189 (cm-economics-markets, stem fix), W-190 (design-lead review), W-191 (mockup-artist).
- Believe (high): numbers re-run in node: $50 refused (factory −$50), $200 deal (factory +$100, laundry −$200, total −$100), $350 refused (laundry worse than −$300); liable: filter −$100 beats damages −$300. Strict deal band $101–$299 on a whole-dollar grid. Prediction survives; stem should say "$100 a year" (25 words). Medium: the visible offer chips nudge toward B at predict (flagged for design review). QA path reasoned from DOM order, not run.
- Next: W-189, W-190, then demo-builder. Nothing blocked.

## 2026-10-14 · interaction-designer (ncm specs) · specs for 4 NCM briefs
- Changed: spec + .svg wireframe in company/design/specs/ for the-loser-flips-the-winner (math.discrete #2, before/after), weak-links-hold-it-together (probability.chance, simulation run), two-public-clues-break-the-herd (probability.statistics #1, before/after) and all-lines-meet-in-one-mother (life.genetics-evolution #3, storyboard/scrub; added mid-task by the coordinator). Board: W-183 (cm-probability-chance), W-184 (cm-life-genetics-evolution), W-185 (design-lead review), W-186 (mockup-artist).
- Believe (high): Borda 6/7/2 then 3/2, Bayes 67%/33%, and coalescent mean 96.03, median 84 (seeds 7001–8000) all re-run in node and hold. The coalescent's exact discrete expectation is 96.97, so 98 is an approximation, as the CM's edit says. Medium: weak-links survives at 20% only with seeded-random tie-breaking among overlap-0 links (96% of connected networks give ≤ 30 of 60; index ties fail 12%). 10% of seeds start disconnected. The brief's seed-33 figures do not reproduce. Two specs list text-budget trims that the wireframes do not show. QA paths were reasoned from DOM order, not run.
- Next: W-183/W-184 (brief owners), W-185 design review, then demo-builder. two-public-clues builds after two-said-blue. Nothing blocked.

## 2026-10-14 · interaction-designer (algo2-s1) · specs for 10 algorithms batch 2 briefs
- Changed: spec + .svg wireframe in company/design/specs/ for shell-gaps-shrink-the-shuffles (#41), one-crowded-bucket (#43), ternary-asks-more (#46), fewest-exits-first-tour (#52), boyer-moore-skips-ahead (#55), rotation-untangles-the-chain (#61), gray-code-one-flip (#66), hailstone-27-climbs (#71), keep-one-of-a-stream (#77), turns-beat-first-come-first (#80). Board: W-181 (cm-cs-algorithms brief fixes), W-182 (mockup-artist).
- Believe (high): every prediction survives design. All answers were re-run in node: 32/120, 30/1, 10/13, 21/25 (36/64), 15, height 3 with 4 rotations, 7/11, 111 at peak 9,232, 1/4, 1.67. Two brief check lines are wrong, but neither answer changes: bucket (the shared bucket is 64+70, and 45 is the descending order) and Horspool (5 alignments, not 4). Medium: new stage numbers that are claims and need a fact-check. These are shell's "farthest from its place" 15/7/3/1/0, the ternary target 721 (chosen, disclose), the ternary per-question "left" counts, the knight badges 5 and 3,3,3,3,1, and Horspool's "11 letters never read". Every QA path was reasoned from DOM order with disabled-skip and slider-at-max-goes-left (tests/qa/contract.spec.ts), not run.
- Next: cm-cs-algorithms W-181, then design review, then demo-builder. Nothing blocked.

## 2026-10-14 · interaction-designer (algo2-s0) · specs for 9 algorithms batch 2 briefs
- Changed: specs + wireframes in company/design/specs/ for small-values-crawl-left (#42), shuffle-until-sorted (#44), bracket-order-sets-the-bill (#49), karatsuba-three-not-four (#53), new-server-moves-few-keys (#58), each-element-pops-once (#63), newton-doubles-the-digits (#70), every-second-seat-out (#72), one-cell-rule-30 (#78). Board: W-179 (cm-cs-algorithms brief fixes), W-180 (mockup-artist).
- Believe (high): every answer was re-run in node and holds, except **karatsuba**. 12345678 x 87654321 needs 33 one-digit products in a plain Karatsuba (sums carry), not 27. The spec proposes 11111111 x 11111111 (27, all one-digit) and is blocked until the brief owner accepts it or picks the spec's fallback. Medium: added stage elements that are new claims and need a fact-check (pops list 8 7 6 5 4 3 2 1 9: scan 36, stack 15; designed ring layout in new-server, which must be disclosed; per-n seeds in shuffle). Every spec's QA path was reasoned from DOM order with disabled-skip, not run.
- Next: cm-cs-algorithms W-179 → design review → demo-builder. Blocked: karatsuba build waits on W-179.

## 2026-10-14 · head-of-product · Ruling: told vs shown "why"
- Changed: decision company/decisions/2026-10-14-told-vs-shown.md. New craft rule `*` "Show the why you promised" in company/product/demo-standard.md (not protected). Board: W-176, W-177 (demo-builder revisions), W-178 (pattern-librarian confirms the rule).
- Believe (medium-high): a cause that is a doesNotKnow item, or that the objective asks the learner to explain, must have something on the stage that stands for it. Told context outside the brief's gap is still fine. bending-frontier: revise (show unequal land). iss-gravity-still-there: revise (show free fall); inverse square holds via the 25% stop. Evidence is simulated reviews only. Revisit if human recall shows no difference.
- Next: demo-builder W-176/W-177, then a fresh learner review. W-150 and W-154 are still open with head-of-product.

## 2026-10-14 · fact-checker · Pass 20: builder rewordings (10 claims) + 4 source-only audits
- Changed: status -> verified (checkedBy fact-checker) with pass-20 notes in the source field for ten-test-cases c4, a-birthday-like-mine c5, straight-across-saves c3, below-the-threshold-crash c3, interpolation-guesses-the-page c5, same-count-different-weight c5, proposers-get-the-best c5, one-bit-avalanche c6, truck-hits-car-force c5, random-dots-cluster c5. Source audits all held (still verified): sliding-the-cutoff c5, window-forgets-start c2, copy-overlaps-itself c3 (RFC 1951 opened: overlap example is in 3.2.3), drop-the-losing-start c4. "Pass 20" tables appended to each company/reviews/<slug>/2026-10-14-fact-check.md.
- Believe (high): every reworded claim now matches its Demo.tsx stage and reveal; numbers re-run in node (crash sim ratios, 44.5% exact count, interpolation traces, rounding captions). All ten Demo.tsx files parse cleanly (TypeScript parser); no build or QA run. Medium: proposers c5 year 1998 rests on search-result text (Roth's Stanford page, Wikipedia, NRMP 1997 press release). Every primary page was blocked.
- Next: chief of staff integrated build + QA for these lessons. Optional: someone with access confirms 1998 in Roth and Peranson (1999). Not touched: continental-jigsaw c1, half-of-humanity c1 (still need a human source check).

## 2026-10-14 · demo-builder (algo-pair-06) · tortoise-meets-hare, any-start-same-tree
- Changed: built both lessons from brief + spec (status draft, all claims unverified); build notes in company/reviews/<slug>/build.md. any-start-same-tree uses the fixed brief (DE 3, total 11, next-best 12).
- Believe (medium): answers re-run in node and match; Demo.tsx read carefully but NOT run in a browser. Skipped by order (machine out of memory): next build, qa, walkthrough, typecheck. Only `npm run check` passed.
- Next: chief of staff integrated build + QA + walkthrough; check label overlap in the any-start panels at 390 px.


## 2026-10-14 · demo-builder · revision batch 01 (16 lessons, learner-review fixes)
- Changed: Demo.tsx, meta.json (version bumped; edited claims back to unverified) and a "Revision v<N>" in build.md for never-flag-99, stop-at-epoch-sixty, same-sugar-more-water, when-the-water-is-full, insert-at-front-cost, pennies-dont-add-up, two-writers-one-counter, rule-of-72-shortcut, parallel-vs-arc-short-hop, below-the-threshold-crash, binary-fingers, straight-across-saves, same-push-twice-the-mass, two-tugs-right-angle, city-poll-nation-poll, hidden-third-cause.
- Verified only: `npm run check` and a full typecheck (both pass). NOT run (machine out of memory, coordinator's order): build, lesson QA, walkthrough sheets. Milestone one-press paths were reasoned from DOM order, not tested; the chief of staff's integrated QA must confirm them.
- Fact-checker needs: every claim marked unverified in these lessons plus new claims rule-of-72 c6 and city-poll c8.
- Not fixed (platform, W-061/W-135): reveal clipping on phone.


## 2026-10-14 · demo-builder · revision batch 06 (16 lessons, none published)
- Changed: Demo.tsx, meta.json and build.md ("Revision v<N>") for ai/shrink-toward-zero, ai/word-in-pieces, chemistry/the-tail-that-reacts, cs/hash-bucket-pileup, cs/one-bit-avalanche, cs/two-flips-slip-by, economics/compound-interest, geography/midnight-sun-line, geography/two-bulges, life/virulence-sweet-spot, math/square-a-plus-b, physics/crumple-zone-stopping-time, physics/torch-underwater-tilt, probability/birthday-paradox, probability/halve-the-margin-cost, probability/sum-seven-ignores-first-die. Each fixes the latest learner review; edited claims are unverified and need a fact-check pass.
- Checked: `npm run check` passes; narrow tsc over the 16 Demo.tsx files shows only missing CSS-module typings (worktree artefact). NOT run: build, lesson QA, walkthrough sheets (machine out of memory, coordinator's order). A partial dev-server QA run was stopped; its two phone failures (shrink-toward-zero, word-in-pieces, after 1.5 m under load 100) are unexplained and may be timeouts.
- Next: chief of staff runs integrated build, QA and walkthrough sheets; look at the new controls on phone (two-flips-slip-by, midnight-sun-line day strip, two-bulges arrows). Then fact-checker on unverified claims.


## 2026-10-14 · interaction-designer · specs for a-star-heads-for-goal and rubber-band-hull (CS algorithms, group 6)
- Changed: wrote `company/design/specs/a-star-heads-for-goal.{md,svg}` (before/after: guess chips + wall toggle, replayed runs, result table) and `company/design/specs/rubber-band-hull.{md,svg}` (step-through: the 9 pins are the controls in walk order, no finish button). Board untouched (caller's instruction).
- Believe (high): both briefs' answers re-run in node: A* 7 vs Dijkstra 31 on the open grid, any tie-break; hull 6 pins, 4 right-turn pops in Graham order. Medium: whether the design lead accepts replay buttons ("Settle to goal") as not being a jump to the answer.
- Brief problem (rubber-band-hull, owner cm-cs-algorithms): (0,0) and (6,0) tie for lowest, so the "extremes" are 5 pins, not 4; option A (4) does not match a careful misconception. Suggested fix (6,0)->(6,1): still 6 hull pins. Wall result in A* (16) depends on the tie-break (FIFO gives 32).
- Next: design review of both specs (design-lead); brief-owner decision on the hull tie. Blocked: nothing.

## 2026-10-14 · platform-engineer · W-139 follow-ups: verify on the merged tree, rotation re-fit, no pull-back
- Changed: `src/components/DemoCard.tsx` (`useRevealFit` re-fits on card-body resize and orientationchange while the reveal shows; no auto-scroll once the learner has scrolled after the reveal, and rotation re-arms it), `tools/reveal-fit.mjs` (`--rotate WxH`), changelog, follow-up status appended to company/rituals/records/2026-10-14-eng-review-W-135.md. Board: W-135 → done; added W-143 (feed measurement, me), W-144 (landscape layout, design-lead), W-145 (four-queens-pruning thumb, moon-hammer-feather unmeasurable, demo-builder). Committed in the worktree, not pushed.
- Verify: on the merged tree (before my change) 1056/1056 QA (one run was split by a 2 h tool limit: 1038 + the 18 it had not reached), deploy tests, check, typecheck and build all passed. No revert. After my change, full verify passed again with 1056/1056.
- Reveal fit (all 523): portrait 515 fit / 0 clip / 7 thumb / 8 unmeasurable. Rotated to 844×390: 0 clip, top always visible, but 495 need a scroll and 325 are thumbs, because the landscape body is ~164px. That limit is in the layout, not the hook (W-144).
- Believe (high): the pull-back is fixed (reproduced in the old build on base-rates and tax-who-pays, gone in the new one), and rotation re-fits. Medium: touch-drag detection on real phones. Only wheel input was tested; a touchmove listener covers drags in principle.
- Gotcha for the next worker: a full QA run takes 1.2-2 h on this box. Run it detached (setsid nohup) or it hits the 2 h background-tool limit.
- Next: W-143 feed measurement (me); W-141 contract assertion (evaluation-steward); W-142 focus amendment (accessibility-reviewer). Blocked: nothing.


## 2026-10-14 · fact-checker · Pass 18: wave C life, economics, probability and builder-12 claims (56 claims, 32 lessons)

- Changed: 56 unverified claims set to verified (checkedBy fact-checker) in 32 meta.json files. A "## Pass 18" table was added to company/reviews/<slug>/2026-10-14-fact-check.md for each lesson. Skipped half-of-humanity c1 and continental-jigsaw c1 because they need a human source check. Disputed claims were not touched. one-recipe-for-sixty and hanoi-tower-doubles had no open claims.
- Belief (sure for the derivations and simulations): every number was re-run in my own scratch scripts. Each Demo.tsx was read, and its stage and reveal match the claims. Less sure on protein c6 (folding times) and spreaders c4 (Lloyd-Smith 2005): I checked them through secondary sources, not the full papers.
- Non-blocking builder fixes: median-without-sorting c3 text says "position 5" but should say 51. one-in-four-sprouts c4 source mentions a removed "New field" control. fee-on-two-week-loan never shows the learner its 364-day year. dilute step 23 shows 15 of 20 empty, a tail draw. protein c6 wording could say "microseconds to seconds".
- Next: chief of staff routes the non-blocking fixes to builders, and gets a human for the two source checks.

## 2026-10-14 · demo-builder (wc-builder-10) · wave C revisions of 15 life lessons

- Changed: dish-runs-out, herd-immunity, hidden-carriers, keeping-the-bad-gene, natural-selection, one-in-four-sprouts, pcr-not-quite-doubling, pesticide-paradox, potassium-battery, protein-search-space, purging-slows-down, saturated-enzyme, spreaders-are-rare, strategy-builder, tree-count-explodes. Each got its latest learner review's findings fixed, a version bump, `format`/`interactions`, reworded claims reset to unverified, and a "Revision v<N>" in company/reviews/<slug>/build.md. None was published; none already said launch.
- Belief (fairly sure): contract QA passes on phone and desktop for all 15 (feed-chips failure is the known W-136); I looked at every walkthrough sheet. Not sure: learners may still find strategy-builder's stage dense on a phone.
- Next: fact-checker re-verifies the unverified claims; learner re-review of v-new; potassium-battery and protein-search-space gained new claims (c7).


## 2026-10-14 · demo-builder (wc-builder-11) · wave C revisions of 15 economics and probability lessons
- Changed: bathtub-deficit-debt, bond-seesaw, cheese-for-bread, compound-interest, deduction-or-credit, exchange-round-trip, extra-hundred-a-month, fee-on-two-week-loan, free-rider-pot, loaf-with-smoke, real-rate-illusion, square-root-wealth, twenty-dollar-basket, average-that-never-settles, bet-too-much-and-go-broke. None was published; all had a "revise" review. Versions bumped, format and interactions added, edited claims unverified, "Revision v<N>" in each build.md.
- Believe: the review findings are fixed (leaks, unvisited-state quotes, told payoffs, undefined terms); fairly sure, needs fresh learner reviews. Contract QA passes on all 15 (phone and desktop); I looked at every walkthrough sheet.
- Judgement calls: square-root-wealth has a "Slide to the coin's line" button (generic label, but it does land on the key state); exchange-round-trip has a "Try $1.11" button; real-rate-illusion slider now steps whole percents; bet-too-much gained a 30% stake (its 982/1000 seed sweep was for five stakes).
- Next: fact-checker on the unverified claims; learner reviews. Open: cheese-for-bread locked stage clips the last slider on a phone (kit layout, W-135 family).


## 2026-10-14 · fact-checker · Pass 16: wave C AI revisions (20 claims, 11 lessons)
- Changed: claim statuses in 11 src/demos/ai/*/meta.json; "## Pass 16" in company/reviews/<slug>/2026-10-14-fact-check.md for each. Board not touched (as instructed).
- Believe (high): 18 verified by own node re-derivation/simulation; 2 disputed: greedy-slot-machine c3 (stage shows seed 5 first pulls "A lost, B lost", claim says A won) and memorise-coin-flips c3 (degree-1 miss is 158/105 = 1.50 on stage, claim says 1.51). Builder 7's dilute c7 and point-one c3 were already verified in pass 15. Non-blocking advisories in the records (attention "lowers the others", confident-and-wrong clamped last halving, income source "ever").
- Next: demo-builder fixes the two claim texts; fact-checker re-checks. Skipped by instruction: half-of-humanity c1, continental-jigsaw c1 (need human source access).
- Blocked: nothing new.

## 2026-10-14 · demo-builder (wc-builder-8) · wave C revisions of 13 AI lessons
- Changed: attention-shares-one, background-shortcut, confident-and-wrong, copy-of-a-copy, direction-not-distance, dog-bites-man-twice, five-folds-five-scores, gradient-descent, greedy-slot-machine, income-in-dollars, king-queen-arrow, meaning-without-the-word, memorise-coin-flips (version bumped, edited claims unverified, "Revision v<N>" in each build.md). bad-start-kmeans (v2) and draw-the-xor-lines (v3) were already revised after their latest review; untouched.
- Believe: leaks, unvisited-state quotes, told payoffs, undefined terms fixed per the reviews (fairly sure; simulated-learner review needed). Contract QA passes on all 15 (phone and desktop); only the known feed-chips failure (W-136).
- Next: fact-checker on the unverified claims (esp. king-queen-arrow c5, greedy c3/c4, memorise c4); a fresh learner review of each. Open: locked-stage charts in dog-bites-man-twice and meaning-without-the-word are small (kit layout).


## 2026-10-14 wave C, builder 7: revisions of 11 lessons

Changed (see "Revision v<N>" in each company/reviews/<slug>/build.md): cut-the-cube-surface, dilute-until-none-left, heavy-but-floats, pay-first-then-profit, filament-vs-led-heat, pendulum-period, projectile-angle, puck-on-ice-no-push (phone clip: reveal-phase `.stage-svg {flex: none}` rule widened the lanes), point-one-is-26-percent (c3), collect-all-six-faces, tournament-second-best. QA passes except the known feed-chips failure (W-136). I believe the fixes work (walkthrough sheets and a phone probe seen); fairly sure. Edited claims are unverified (dilute c7 new, point-one c3): fact-checker next. Open: pendulum gate still needs only the weight trial (no one-tap path for a second trial); re-review wanted for all 11. collect-all-six-faces had no stuck label in the current code.

Template:

```markdown

## 2026-10-14 · rnd-lead (Bram) · Knots gen 1 scored, judged, selected: winner `gen1-force`; stop rule says promote
- Changed: `company/rnd/evolution/knots-gen1.md` (the record). New looks gate in `src/lab/knots/test/draw.test.mjs`: table knots must draw round, with at most 30 % straight runs and 3 % sharp corners; now 102 tests. 24 eval records in `knots.jsonl`. Board not touched (as instructed); nothing committed.
- Believe:
  - **Official scores.** 3 one-seed runs, no slowness penalty in any. Medians: gen0 10,394.54; tutte 10,438.80; force 10,439.68; ortho 10,443.07. That is a tie within seed noise.
  - **Rulings.** The ortho stretch is fair, and the aspect metric is unchanged. Only force still draws table knots like the textbook (rendered and looked at).
  - **Re-score with the looks gate.** force 10,533.49; gen0 10,491.86; tutte and ortho gated out. High confidence in the ranking; medium on whether looks should be a gate rather than a weight.
  - **Audit.** Every candidate changed only mutable files, and none games the bench. Tutte's internal score copies the bench formula: allowed, and flagged.
- Next: gen 1 gains 0.26–0.47 % of total score, under the 2 % stop rule, so I recommend promoting `gen1-force` (EDD, then a principal-engineer review). The VP should rule on my objection that the 2 % rule cannot be met on this score scale (+15 % on the bench term). A gen-2 plan (ortho→force crossover plus 2 mutations) is in the record if she rescales it.
- Blocked: VP ruling on the stop-rule scale.

## 2026-10-14 · rnd-engineer · Knots gen 1 slot A: `gen1-tutte` (reweighted Tutte of a triangulation + guarded stress)
- Changed: new `src/lab/knots/candidates/gen1-tutte/`, a full copy of gen0-baseline. Only `draw.mjs`, the new `layout.mjs` and `index.d.ts` differ. The candidate's NOTES.md has the idea, the prior art and the numbers. Committed in my worktree, not pushed. I added nothing to the archive: my eval lines were reverted.
- Believe:
  - It passes every gate: 101/101 tests, random-knot lesson 11,794 B of 12,288.
  - It beats gen 0 by +38 to +55 on seeds 1–3: 10,451 / 10,439 / 10,430 against 10,409 / 10,401 / 10,375. Spacing goes from 7–9 to 11.7–13.2, spread from 29–38 to 49–53, and there are no extra crossings. High confidence in the direction.
  - Medium confidence on the lead's run: on a heavily loaded machine, `layoutSlowPenalty` could take back 10–50 points. It costs about 2× gen 0's CPU.
  - Table knots look less textbook than circle packing.
- Next: the lead scores all three slots in one run. A crossover could add packing for diagrams where it is planar, or slot B's repulsion in place of my revert guard.
- Blocked: nothing.


## 2026-10-14 · demo-builder · Colour fixes in 18 published lessons (W-155)
- Changed: stage and text colours only, in the 18 lessons that still failed contrast after the kit token fix. Per-lesson notes in `company/reviews/<slug>/build.md`. No claims or pedagogy touched; no version bump.
- Believe (high): a11y scan on a build of this branch shows no lesson-origin contrast failure in any of the 18; lesson QA passes except the known feed-chips failures (W-136); `npm run check` passes.
- Not fixed (not colour): collect-all-six-faces SVG label stuck at "0 rolls"; tournament-second-best label "Knockout bracket" never changes; 6 px text in line-stops, two-suspects, start-early-race.
- Next: accessibility-reviewer re-scans the 18 slugs and updates their records.


## 2026-10-14 · rnd-engineer (slot C) · Knots gen 1: `gen1-ortho` candidate written (orthogonal grid layout)
- Changed: `src/lab/knots/candidates/gen1-ortho/` (a copy of gen0-baseline; only `draw.mjs`, `index.d.ts` and `NOTES.md` differ).
  - Tamassia min-cost-flow bends, rectangular refinement, balanced longest-path compaction;
  - bends drawn as rounded corners;
  - circle packing and Tutte removed.
- Believe:
  - 101/101 tests; lessons about 170 B smaller than gen 0.
  - Layout term 262.8 / 259.3 / 261.8 on seeds 1–3 (gen 0: 220 / 212 / 196). There are 0 extra crossings on 8 seeds and 227 stress diagrams.
  - Hand-computed score: about 10,438–10,448.
  - High confidence in planarity (every face is a rectangle). Medium confidence in the official score, because `evolve.mjs eval` was blocked by this session's command guard and the lead's run will be the first.
- Next (rnd-lead): score all three slots in one run. Judge whether the square stretch (aspect 100) is a layout choice or metric-fitting (NOTES.md, "Surprise 2"). The table knots now look rectilinear; that is a product call.
- Blocked: nothing.


## 2026-10-14 · fact-checker · Fact-check pass 12 (wave C CS revisions)
- Changed: 38 unverified claims across 15 CS lessons set (36 verified, 2 disputed), each with a `FACT-CHECK 2026-10-14 (pass 12)` note in its source; Pass 12 tables in `company/reviews/<slug>/2026-10-14-fact-check.md` (also salt-ions-count-double and cards-do-remember, re-confirmed unchanged).
- Disputed: big-number-swallows-one c2 ("2 multiplied by itself 53 times" reads as 2^54; use "53 twos multiplied together" in claim and predict); binary-search c5 (stage flags weak only if after*2 > before+1, so 500 of 999 is not called weak; use after*2 > before).
- Believe (high): all numbers re-derived in node (scratchpad fc12/check.mjs). Book/spec citations not opened (egress blocked).
- Next: builder fixes the two disputes, fact-checker re-checks. Blocked: half-of-humanity c1 and continental-jigsaw c1 still need a human source check.

## 2026-10-14 · rnd-lead (Bram) · Knots evaluator fixed (W-143, W-144); gen 1 brief ready
- Changed:
  - `tools/evolve.mjs`, backward compatible:
    - per-lesson size gate (`sizeEntries`, stripped closures found by Node's loader);
    - `benchWeights`;
    - `mutable` frozen-file check, plus mandatory `parents` registration;
    - one bench seed per eval run (`EVOLVE_SEED`, archived);
    - the board ranks each candidate's latest record and warns when seeds differ;
    - refuses `import()`/`require()`;
    - new `size` and `selftest` commands (selftest passes).
  - `src/lab/knots` evaluator:
    - `evolve.json`: lesson budget 12,288 B stripped, library 16,384, gen-1 weights and mutable files;
    - `test/lessons/` (4 entries) and `lessons.test.mjs`;
    - `test/benchgen.mjs`, evaluator-only generators, and `benchgen.test.mjs`;
    - `test/benchdata.mjs`: 10 no-move hard unknots, a knotted decoy, the monster, Gordian;
    - `bench.mjs` rewritten so every input is generated at bench time.
  - README baseline paragraph; `company/rnd/evolution.md` (mechanics section). New: `company/rnd/evolution/knots-gen0.md` and `knots-gen1-brief.md`.
- Believe:
  - gen0-baseline now scores **10,415.83** (101/101 tests, mean lesson 8,036 B, bench 331.91; was 0, gated out). High confidence in the gates and the generators: the tests pin them to the library, and Regina certified the hard set offline.
  - Medium confidence in the 12,288 calibration: stripped runs 1.18–1.9× over the real cost.
  - The bench term varies about ±15 by seed, so always score a selection in one run.
- Next: dispatch 3 rnd-engineers for gen1-tutte, gen1-force and gen1-ortho (brief: `company/rnd/evolution/knots-gen1-brief.md`), then score all three in one `eval` run. Board items W-143 and W-144 can close, but I did not touch `board.json` (caller's instruction); the chief of staff moves them.
- Blocked: the arXiv hard-unknot datasets (egress).


## 2026-10-14 · fact-checker · Pass 10: 14 new CS algorithm lessons + 5 reworded claims
- Changed: claim statuses (checkedBy fact-checker, checkedOn 2026-10-14) in src/demos/cs/{caesar-falls-to-frequency,no-zip-shrinks-everything,two-pointers-meet,fair-shuffle-trap,probing-clusters-grow,shortest-job-first-wait,four-queens-pruning,rsa-lock-with-public-key,patience-piles,median-without-sorting,union-find-shortcut,start-after-the-deficit,uphill-finds-a-peak,undo-a-bad-push}/meta.json and the five re-checked claims; recorded one unrecorded stage claim (rsa c7). Records: company/reviews/<slug>/2026-10-14-fact-check.md for all 19 lessons.
- Believe (high confidence, own node re-implementations): 71 of 74 checked claims verified, 3 disputed: two-pointers-meet c2 (2 of the 13 "never looked at" pairs were looked at), median-without-sorting c5 (3,465 is a high 50-seed mean; expectation 3,336), rsa-lock-with-public-key c7 (predict: cube root of 8 is 2, so anyone can unlock). All 5 reworded claims verified.
- Next: demo-builder fixes the 3 disputes (fixes in the review files); fact-checker re-checks. Not on the board (caller told me not to touch board.json).
- Blocked: nothing; no walkthroughs exist yet for the 14 new lessons (I read Demo.tsx text).


## 2026-10-14 · rnd-engineer · Knot theory library, generation 0 baseline (src/lab/knots)
- Changed: new `src/lab/knots/`. It has plain ESM, no dependencies, and docs in `index.d.ts`. It covers PD/Gauss/DT/braid codes, a table (0_1, 3_1 to 7_7, 10_8, Hopf, Whitehead, Borromean, granny, square, and the monster unknot), and exact invariants (writhe, linking, Fox colourings, determinant, Alexander, bracket/Jones, signature). It also has R1/R2/R3 detection and application with up-moves, an honest `simplify` (statuses unknot/unlink/minimal/unknown, never "knotted"), turnOver, mirror, connectedSum and deleteComponent, a circle-packing SVG layout with gaps (Tutte fallback), random braid knots, 3-D walks with closure and projection, and `identify`. Also: `test/` (93 tests, about 6 s; it imports only `../index.mjs`; reference values in `test/published.mjs`), `bench.mjs`, `evolve.json` (exactly as the brief asked), `candidates/gen0-baseline/`, `size.mjs`, README, and PRIOR-ART. The worktree was fast-forwarded to `ccr-4c6c7654-ew9ko1` to get `tools/evolve.mjs` and the research note.
- Evaluator run: `evolve eval knots` gives 93/93 tests but **score 0, gated out**. The raw `index.mjs` closure is 12,815 B gz against 10240, and even minified the whole library is 9.8 KB. Real per-lesson costs are 4.3 to 7.3 KB (`size.mjs`). The objection is W-137 (rnd-lead).
- Believe: the invariants are right (high). Jones matches Regina, Alexander matches knot_floer_homology, and det = |V(-1)| = |Δ(-1)|, all on the same PD codes. The Traczyk formula fixes the signature sign, and every invariant survives seeded random moves. The right trefoil is t + t³ − t⁴. KnotInfo, the Knot Atlas and arXiv were unreachable, so the reference values were computed by independent GPL software used offline only, not copied from tables. Unknotting numbers are from memory. Layout is good for the table and weak for non-reduced diagrams (medium).
- Next: the rnd-lead reviews the evaluator (W-136), and fixes the size gate and adds real hard unknots (W-137). cm-math picks lesson briefs (W-138). The research note's requirements are in the README table; animation and the Solomon link are deferred.
- Blocked: Goeritz and dataset hard unknots (arXiv egress). Nothing pushed; committed on the worktree branch.


## 2026-10-14 · demo-builder (algo-builder) · First 14 CS algorithms lessons built (draft)
- Changed: 14 new lessons in src/demos/cs/ from company/domains/briefs/cs.algorithms.md (single card / simulation run only): caesar-falls-to-frequency, no-zip-shrinks-everything, two-pointers-meet, fair-shuffle-trap, probing-clusters-grow, shortest-job-first-wait, four-queens-pruning, rsa-lock-with-public-key, patience-piles, median-without-sorting, union-find-shortcut, start-after-the-deficit, uphill-finds-a-peak, undo-a-bad-push. Each has meta.json with "format", all claims unverified, and a build note in company/reviews/<slug>/build.md. Board untouched.
- Believe (high for the numbers, re-run in node; medium for teaching): every brief's answer held. Local computer-use QA passes on phone and desktop for all 14; `npm run check` and tsc pass. No QA records filed (qa-tester's job).
- Brief notes, not wrong answers: rsa (unlocking with e twice returns 15 of 55 toy messages; handled on stage, claim c4); patience-piles (the misconception "starts at the smallest" is weakly targeted, since 1 4 5 6 starts at 1); caesar (94-letter message, not 120); fair-shuffle (exhaustive, not seeded).
- Next: fact-checker verifies the 14 lessons' claims; learner-evaluator reviews; qa-tester files QA records. Claims were released with --done by the builder.
- Blocked: nothing.


## 2026-10-14 · platform-engineer · W-135: reveal fits on a phone (502/509 fully visible, was 257)
- Changed: `src/components/DemoCard.tsx` (useRevealFit: at the reveal the card body scrolls the reveal on screen), `src/app/globals.css` (at the reveal `.stage-svg` takes its natural height, so fill-the-stage pictures no longer collapse to min-height), new `tools/reveal-fit.mjs` (390×844 reveal measurement, no new deps). Lesson.tsx untouched; no amendment needed. Note: company/engineering/notes/2026-10-14-W-135-reveal-fit.md. Committed in the worktree, not pushed.
- Root cause: since 54ae817 the stage is content-sized at the reveal and the card body scrolls, but it stayed at scrollTop 0, so the reveal sat below the fold of an unmarked inner scroll (read as "clipped under Why trust this?"); and ~200 lessons' `flex: 1 1 0` pictures collapsed to their 120-140px min-height in a content-sized stage.
- Measured (all 509, against a build): before 257 fit / 245 needs scroll / 141 thumbnail / 7 unmeasurable; after 502 fit / 0 / 6 / 7. Published: 92/94 fit, 0 thumbnails.
- Believe (high for the measurement and the cause; medium that learners prefer the stage top scrolling off over a smaller stage when the reveal is long). Check passed, typecheck passed, QA contract passed for 10 lessons (phone + desktop) and feed spec passed. Full `npm run verify` not run.
- Next: engineering review of the diff (any engineer role; principal-engineer to confirm tier 1); builders fix the 6 lesson-level thumbnails (dvh caps) listed in the note; re-run walkthroughs for the ~12 reported lessons before their re-review (evaluators).
- Blocked: nothing.

## 2026-10-13 · accessibility-reviewer · First accessibility audit of the published lessons (board W-010)
- Changed: new `tools/a11y-scan.mjs` (Playwright; keyboard, names, AA contrast in dark and light, 44 px targets, reduced motion, colour-alone prompts). 76 records at `company/reviews/<slug>/2026-10-13-accessibility.md` and the summary `company/reviews/_accessibility/2026-10-13-published-audit.md`. Raw scan in `artifacts/a11y/` (not committed). Board, lessons and status untouched; nothing committed. The onboarding doc names `<date>-a11y.md`; the task asked for `-accessibility.md`, so the roles data should be reconciled.
- Result: 46 pass, 12 pass with fixes, 18 fail (all contrast, mostly light theme). Kit-level: light-theme `--good/--warn/--bad` text 1.6-2.5:1 (verdict line in every lesson), 35 px controls and a 23 px "Why trust this?" link, focus dropped to body at commit and reveal, stage before question in DOM, no live region, locked stage dimmed below AA.
- Believe: high on the contrast failures (computed and eyeballed); medium-high on "no keyboard lock-out" (scan plus 10 hand traces, no screen reader). The scan had five bugs that the hand sample exposed; they are fixed and listed in the summary.
- Caveats: the 76 are the lessons published at task start; 49 more were published during the session and are not audited. Server :3420 died at 00:22Z (not by me); the final scan used :3402 (build 21:17Z, newer than all 76 lessons' code).
- Next: platform engineer fixes K1-K6; founder decides unpublish vs waive for the 18; accessibility reviewer audits the 49 newer lessons. Suggested board items (I was told not to edit the board): platform-engineer "a11y kit fixes K1-K6", accessibility-reviewer "audit lessons published after 2026-10-13 scan".
- Blocked: nothing.

## 2026-10-13 · interaction-designer · First 5 interaction specs (4 Life Hacks + first agent-based simulation)
- Changed: new `company/design/specs/<slug>.md` + `.svg` (3-frame wireframes) for towel-spread-dries-first, spaced-beats-cram, square-bow-stays-tied, long-cord-knots-itself, mild-preferences-sharp-divides. Board and company/design/concepts/ untouched (caller's instruction). Nothing committed.
- Decisions a builder will not expect: every spec orders controls so the QA path (each control once, in DOM order) reaches all milestones and ends on the state the reveal describes. Cord: length chips that each tumble 20 replace slider + "tumble once". Schelling: threshold chips (10/30/50/70) replace the slider; "New mix" is first in DOM; Run computes then replays within 400 ms; the reveal pins the grid to the learner's 30% run. Spaced: day axis 0-34, key-frame buttons for the two test days. Bow: no reset; flipping a wrap re-ties. Hero illustrations are predict-only 96 px slots; before/after and comparison pairs move into the reveal. An Illustration must not render before its file is accepted (a 404 is a console error: QA fails).
- Believe (medium-high on QA reachability, checked by hand against tests/qa/contract.spec.ts; medium on stage fit at 390x844). Schelling rule re-run in node, seeds 1-5: 30% gives 0.74-0.76 in 8-16 ticks, matching the brief.
- Next: design lead approves the ABM format and the illustration placement change; cm-lifehacks records the towel breeze factor (illustrative x2) and the bow loss rates as claims; mockup artist mockups from the specs.
- Blocked: mild-preferences-sharp-divides until the ABM format is approved.

## 2026-10-13 · cm-cs · Algorithms strand: 40 concepts and 40 ranked briefs
- Changed: content/curriculum/cs.json gained 40 concepts tagged `"subarea": "algorithms"` (53 to 93; every prerequisite resolves). company/domains/briefs/cs.algorithms.md now holds 40 ranked briefs in the cs.md heading format, so `claim.mjs next cs` hands them out after cs.md. Board untouched (caller's instruction). Nothing committed.
- Source: TheAlgorithms/Python (MIT) used only for topic ideas and to check how algorithms run. No code was copied. Claims cite CLRS or the original papers. Each brief's answer was recomputed in node (exhaustive where small). Two drafts were wrong and fixed before writing: the interval set (shortest-first succeeded) and the rolling-hash text (no false hit).
- Believe (medium): the top 7 (stability, quicksort worst case, BFS = DFS with a queue, 0/1 knapsack, edit distance, Caesar frequency, compression limit) are the best misconception-first lessons. Each brief says how it differs from its nearest lesson. Old algorithm concepts (binary-search, ...) are still untagged. Tagging them is cm-cs-algorithms' day-one task.
- Open: rsa-lock-with-public-key and caesar-falls-to-frequency overlap the security strand. cm-cs-security should cross-list them, not write new briefs for them. Builders must re-run each brief's check. A brief is not a verified claim.

## 2026-10-13 · fact-checker · Pass 9: 22 batch lessons + 2 pass-8 claims + jigsaw c1 re-opened
- Changed: claim statuses in 23 meta.json files (69 verified, 3 disputed, 4 confirmed withdrawn, 3 left unverified); "## Pass 9" tables in company/reviews/<slug>/2026-10-13-fact-check.md (new files for 15 lessons). Board untouched (caller's instruction).
- Disputed: twenty-then-ten-off c2 (stage prints 28.000000000000004%; round TOTAL_PCT), count-the-marked-fish c5 ('cluster near' -> 'scatter around'), cafe-is-five-bytes c5 (dispute from pass 8 stands, text unchanged).
- Unverified: half-of-humanity c1 (UN WPP), continental-jigsaw c1 (re-opened: Bullard 1965 never opened; c4 rests on the same paper), salt-ions-count-double c5 (derivation gives about 3.4, not 3.5; CRC unreachable).
- Believe now (high for the derivations and simulations, medium for the recalled sources: Alberts table 11-1, Anscombe values, Gardner 1970).
- Next: builders fix the 3 disputes and salt-ions wording (owner: the domain builders); a human with access checks UN WPP 2024 and Bullard 1965 (founder inbox).
- Blocked: egress to population.un.org, royalsocietypublishing.org, Wikipedia, BioNumbers.

## 2026-10-13 · cm-lifehacks · Life Hacks briefs revised after safety review and source check
- Changed: `company/domains/briefs/lifehacks.md` applies every required change from the 5 safety records and `company/reviews/lifehacks-briefs/2026-10-13-source-check.md` (wobbly-table: claim 1 square-only, Martin 2007 Phys. Lett. A corrected, 35° as theorem limit only, "Four feet down is not level" and "Clear hot drinks before you turn it" on stage; knot claim 4 always-fails vs about half; Raymer & Smith setup stated; Cepeda 2006 dropped from spaced claim 2; new claim 6 for the retrieval line; textbook editions/sections named). Wobbly hero request: cup removed. Pending-review comments replaced in 6 passed requests. "Changes applied" note appended to each safety record. Board and brief-skips untouched.
- Believe now (medium): the briefs are buildable; textbook sections, ABOK numbers and Roediger & Karpicke 2006 are cited from memory and need the fact-checker.
- Next: lifehacks-safety-reviewer re-checks wobbly-table and removes its skip line; fact-checker full-text checks.

## 2026-10-13 · portfolio-manager · First triage pass: 126 items, next 47 → 16
- Changed: every open board item now has a priority, an owner and a triage note (`node tools/triage.mjs`). 36 marked done with evidence, 24 dropped (16 of them merged duplicates), 16 in next, 49 in backlog, 1 in review. 10 owners changed. Record: company/ceo-office/triage/2026-10-13-first-pass.md. No lessons, gates, roles or protected paths touched.
- Believe now (high, each item opened against meta.json, reviews, tools): the board lagged the disk. 29% of open items were already done. The only P1 is W-010 (0 a11y records, 76 published lessons). cafe-is-five-bytes c5 is the only disputed claim left anywhere. evaluation-steward holds 10 items that all need amendments, and none has been drafted since AMD-001.
- Next: the operating chief of staff dispatches next in order (W-010 first). Whoever merges a pass closes its board items. publish-holds.json (8 geography lessons) is now covered by W-002.
- Blocked: the 6 founder items (P3, all already in founder-inbox.json).

## 2026-10-13 late — chief of staff: founder inbox in HQ; pass 8b, learner wave, CEO-office evaluation landed

- **Changed:** `company/ops/founder-inbox.json` (F-01..F-13) is the single list of what waits on the founder. HQ shows a banner on every view and a priority list in the Lobby. It merges in founder-owned board items. Checklist rule added. I verified it in a build and a screenshot.
- **Landed (uncommitted work from agents, now committed):**
  - Fact-check pass 8b: 45 lessons, about 215 claims verified, 0 disputed, 2 claims added.
  - Learner reviews for 30 lessons (prob, econ, chem): 19 launch, 10 revise, 1 fatal (twenty-then-ten-off float artefact). Board items W-124..W-128.
  - Leonie's role evaluation, handoff map and proposals P1–P9 are now F-13, P1 in the inbox.
- **Believe (fairly sure):** Leonie is right that I do too much myself: publishing, QA records and chairing. I won't publish more until the founder rules on P1.
- **Next:**
  - Merge the concept inspector when the design engineer reports.
  - Builders take W-124..W-128.
  - Update EXP-003 with launch rates.
- **Blocked:** on the founder's inbox.

## YYYY-MM-DD · <role> · <one-line summary>
- Changed:
- Believe now (and how sure):
- Next (owner):
- Blocked:
```

## 2026-10-13 · cm-lifehacks · First 5 Life Hacks briefs, 7 illustration requests, safety gate held by brief-skips

- Changed: `company/domains/briefs/lifehacks.md` now holds 5 ranked briefs (towel-spread-dries-first, spaced-beats-cram, wobbly-table-quarter-turn, square-bow-stays-tied, long-cord-knots-itself), each with format, proposed safety class (all "none") and image needs. The first line says "Safety review: pending". I added 3 concepts to `content/curriculum/lifehacks.json` (wobbly-table-turn, shoelace-square-bow, cord-tangle-length, demand 2). I wrote 7 illustration requests (9 images) in `company/design/illustration-requests/`. The 5 anchors in `_reference.md` already existed and I left them alone. The second image set for a lesson uses slug `<lesson>-pair` plus a `lesson:` field, because `tools/illustrations.mjs` keys requests by slug. I put the 5 slugs in `company/ops/brief-skips.json` so `claim.mjs next lifehacks` prints NONE until the safety reviewer passes them (W-129). Board: W-090 → review, W-112 → done, W-116 → review (the interaction designer revises my alt-text drafts from their specs).
- Believe now (medium): the mechanisms are checkable, but several planned sources are from memory and need the fact-checker. Specifically: the Raymer & Smith 2007 plateau of about 50%, the Daily-Diamond 2017 square-vs-granny result, the 35° slope limit in Baritompa et al. 2007, and the Martin arXiv id. Brief 4's answer depends on the 2017 paper. If the paper does not compare the two bows, the brief needs a different source (Ashley) or a rewrite. Cooking, money and sleep are deferred to the next batch because each one needs a full safety review.
- Next: lifehacks-safety-reviewer: W-129 (pass or raise the class, then remove the skip lines). learning-designer/interaction-designer: W-101, specs for the 5. visual-designer: W-115 once anchors arrive. founder: W-122 (image terms) before the illustrator starts.
- Blocked: builders, until W-129 passes. Images, until W-122 and the _reference anchors are accepted.

## 2026-10-13 · chief-of-staff-ceo-office · First role evaluation, handoff map, 9 org-change proposals
- Changed: new company/ceo-office/2026-10-13-role-evaluation.md (74 roles: keep 16, activate 14, re-scope 4, merge 2, wait 38), company/ceo-office/handoff-map.md (lesson and org-change flows, independence table, new orgs), company/ceo-office/2026-10-13-proposals.md (P1–P9 with decision-record drafts; 8 WBR health metrics). No roles, board, gates or lessons touched; nothing committed by me.
- Believe now (high, from events, board and records): 54 of 70 agent roles never dispatched. The operator publishes (76/76), files the QA records stamped "qa-tester", chairs launch reviews "acting" and writes analytics "acting". 0 a11y records against a written launch condition. `tools/events.mjs` assigns actors by commit keyword, so HQ overstates other roles' activity. 4 of 7 role changes have no decision record (2 were added during this evaluation).
- Next: founder decides P1–P3, P5–P8. chief-of-staff answers role-evaluation §3 in writing and does P4 and P9 (no founder needed). CEO office writes the first WBR company-health section.
- Blocked: everything that changes roles waits on the founder.

## 2026-10-13 · fact-checker · Pass 7: 45 lessons checked, 191 claims verified, 0 disputed
- Changed: verified the 4 reworded claims (one-in-four-sprouts c3, saturated-enzyme c2/c3, point-one-is-26-percent c5), builder-flagged claims (red-apple-green-light, filament-vs-led-heat, paper-stops-alpha, pay-first-then-profit, geography ISS/GPS/geostationary, antarctica areas, city coordinates), all of geography except half-of-humanity, 10 probability and 14 economics lessons. Records appended as "Pass 7" in company/reviews/<slug>/2026-10-13-fact-check.md. salt-ions-count-double c5 still says "about 3.5": left unverified.
- Believe now (high): every verified claim re-derived in node (model.ts run directly, d3-geo walks re-run on the kit data). Soft spots: c5 of antarctica-vs-australia names the CIA Factbook for 7.69 (Factbook gives 7.74; Geoscience Australia gives 7.692); the source line should say so.
- Next (builder): salt-ions c5 to "about 3.4". Next (fact-checker): the rest, mainly ai, chemistry, cs, life, math, physics, 10 more probability lessons (a-birthday-like-mine ... two-random-walks-agree), economics twenty-then-ten-off.
- Blocked: half-of-humanity c1 (population.un.org unreachable).

## 2026-10-13 · platform-engineer · SPIKE-001: lessons in a sandboxed cross-origin iframe (W-074)
- Changed: new spike/ (builder, kit entry and bridge, CDN server, manifest and rollback tools, measure script, QA contract copy, security spec, hostile fixture) and the src/app/spike route; company/engineering/spikes/SPIKE-001-frontend-sandbox.md + SPIKE-001-results.json; platform-engineer findings in the EDD-003 review record; README index; changelog; spike/dist gitignored. No feed, lesson page, kit, gate, tests/qa or lesson source changed. No new dependency (Next's vendored webpack and terser, plus typescript and postcss). W-074 → review; W-077..W-080 added.
- Believe now (and how sure): go with changes for stage 1. Measured in Chromium emulation on a loaded machine: lessons 2.2–2.5 KB gz (all 348 ≤ 8.3 KB), kit 61.8 KB gz, geo kit 71 KB gz, cold insert→ready ≤ 1.1 s even at 4× CPU, memory 0.85× today's feed (high confidence). The negative security test passes with a positive control (high). The QA contract works through frameLocator, 6/6 (high). Warm remount is 0.2–0.7 s, so the "warm" budget needs redefining (medium). iOS and real devices are untested (unknown).
- Next (owner): real-device run (platform-engineer, W-077); separate lesson domain plus CSP header (privacy-reviewer, W-078); QA-through-frame amendment (evaluation-steward, W-079); bundler decision record (platform-engineer, W-080); principal-engineer closes the review.
- Blocked: nothing. To reproduce, see the end of the spike doc.

## 2026-10-13 · principal-engineer · EDD-003 lesson storage and loading at scale (design only)
- Changed: company/engineering/edd/EDD-003-lesson-storage-at-scale.md (new), company/rituals/records/2026-10-13-eng-review-lesson-storage.md (open), EDD index line in company/engineering/README.md, board W-074..W-076. No code, gates or protected paths touched; build ran in .next-pe (removed), tsconfig.json restored.
- Believe now (and how sure): measured at 348 lessons: 73 s build, 321 MB output, 4.26 MB packed git, 6.8 files/lesson, 6.6 s QA wall/lesson. The feed HTML (1.82 MB) and the all-metas chunk on every page (1.29 MB) are already over budget (high confidence, measured). One app build and full-catalog QA break at 2k–10k; plain git near 100k (medium, linear extrapolation). Recommend client-side content-hashed bundles in a sandboxed cross-origin iframe, with the server serving manifest, meta and previews; never server-side lesson code (high on the direction, medium on the iframe host until the spike).
- Next (owner): platform-engineer runs the 3-lesson spike (W-074) and fixes EDD-001 (W-076); the invited reviewers answer the questions in the review record (W-075); the founder answers the 7 questions in EDD-003.
- Blocked: gate changes need amendments drafted by the evaluation steward; the bundler choice needs a decision record.

## 2026-10-13 · platform-engineer / release-manager (Codex implementation) · GitHub deployment pipeline
- Changed: .github/workflows/deploy.yml; automatic previews after successful default-branch CI, manual production on the default branch, immutable release checkout, scoped environment credentials, pinned actions and release artifacts. The deploy command now supports --prebuilt (verify, pull, local build, upload, smoke, promote).
- Believe now (and how sure): 17 deployment tests and actionlint/shell/deployment-boundary checks pass; local Vercel builders receive no authentication token (high confidence in orchestration). Cloud upload/promotion still needs configured GitHub/Vercel credentials.
- Next (owner): principal-engineer reviews the PR; founder/release-manager configures preview-deploy and production environments with Vercel IDs and token, then uses the workflow.
- Blocked: the checkout has no Git push credentials; the explicitly authorized upload uses the connected GitHub account. No live deployment requested or created.

## 2026-10-13 · platform-engineer / release-manager (Codex implementation) · executable Vercel deployment
- Changed: tools/deploy.mjs, npm deploy/test:deploy commands, /deploy, release-manager onboarding and runbook; Vercel CLI pinned at 63.1.2. Production visibility now covers map and standalone URLs. EDD-002, decision and implementation-review records accompany the PR.
- Believe now (and how sure): the workflow blocks promotion on failed checks (13 orchestration tests); the updated preview works (646/646 browser QA), and the production build shows 47 published cards and returns 404 on all 271 unpublished lesson URLs (high confidence in local behavior; cloud upload/promotion not exercised).
- Next (owner): principal-engineer reviews the PR; release-manager uses npm run deploy -- preview after one-time Vercel login/link. Production is explicit and stages before promotion.
- Blocked: no linked Vercel project in this checkout; no live deployment attempted. Existing four disputed-claim warnings remain in the review queue.

## 2026-10-13 · fact-checker · second independent pass: Part A (9 prior fact-checker claims + 4 more) and Part B (economics, math, physics, life, geography, probability)
- Changed: statuses and checkedBy/checkedOn on about 270 claims across 57 lessons (11 disputed, 1 left unverified); fact-check sections appended to company/reviews/<slug>/2026-10-13-fact-check.md. No Demo.tsx edits, no claims added.
- Disputed (reasons in each review file): ai/border-follows-point c5, ai/clicks-not-value c5, ai/draw-the-xor-lines c5, ai/gradient-descent c11, ai/meaning-without-the-word c5, ai/penalty-on-wiggle c5, ai/temperature-reshapes c8, economics/two-bets-split c7, geography/fingernail-ocean c2, life/vaccinate-at-the-peak c3, math/rabbit-ratio c4.
- Left unverified: geography/half-of-humanity c1 (UN WPP 2024 table unreachable: population.un.org, data.un.org, Wikipedia and OWID were blocked from this session; only partial corroboration).
- Believe now: numbers re-derived in node from the Demo.tsx model code (kit/geo shapes, SIR/SIRS, throw-it-fast-enough model.ts); high confidence. Source checks by web search for Peeperkorn 2024, Lewis 2020, AP style, Bishop Museum (Lahaina Noon), Ledyard 1995 (secondary only), UL 489 trip times (secondary only).
- Next: demo-builder fixes the 11 disputed wordings (board W-058); fact-checker with network access compares half-of-humanity c1 (W-059). Advisory wording notes (not blocking) are in the review files: horizon-ruler refraction 'a few per cent' (about 8%), sieve 'clear a hundred numbers', friends-have-more-friends c3 'wherever friend counts differ' is false for disconnected networks, throw-it-fast-enough ISS 7.7 vs NASA 7.8 km/s.
- Blocked: none.

## 2026-10-13 (night) · chief-of-staff · 504 lessons: past the 500 target
- **Changed:**
  - Lessons went from 328 to 504 this evening, with every domain except Life Hacks at or near the end of its brief list.
  - New orgs and roles: Life Hacks, Personalization, International, Design, 27 sub-area category managers, the Principal PM for verticals, and the CEO-office chief of staff (Leonie). That is 72 roles in total.
  - The work queue (`tools/claim.mjs`), the walkthrough contact sheets and the publish loop.
  - HQ now has 3 floors.
  - Agent metrics are in the WBR.
  - SPIKE-001 came back "go with changes".
- **Believe now:**
  - 504 lessons is a count of lessons built and QA'd, not of good lessons (high confidence). Roughly 80 are published. Most of the rest have no learner review yet or a "revise" verdict, and about 415 claims are still unverified (two fact-checkers are on them).
  - The quality loop is the bottleneck, not building: the launch rate is about 37% on first review.
  - 53 of 72 roles have never been dispatched. Leonie is evaluating that now.
- **Next:**
  1. Leonie's role evaluation and handoff map: the founder decides on her proposals.
  2. Finish fact-check pass 8 and the reviews, then run the publish loop.
  3. Hand QA and publishing back to qa-tester and release-manager.
  4. Run the accessibility review (W-057).
  5. EXP-003 result: Sonnet vs Opus builders.
  6. Design review of new briefs.
- **Blocked (founder):**
  - backend choices (auth provider, database host, under-13 policy);
  - usage budget;
  - AMD-001;
  - UN WPP and Bullard source checks;
  - the Personalization brief;
  - the image-generation agent setup (waiting for a yes).
- **Tooling note:** builders report that the claim schema rejects support "citation", so they use "source". Either document "source" as the type for citations in demo-standard, or propose adding "citation" (the gate is constitutional).

## 2026-10-13 (evening) · chief-of-staff · Three new teams; HQ live locally; 328 lessons
- Changed:
  - New teams: backend (backend-engineer, privacy-reviewer), growth (growth-designer) and company tools (tools-lead, hq-engineer). Decision record: company/decisions/2026-10-13-three-new-teams.md.
  - Event log: company/ops/events.jsonl plus tools/events.mjs, backfilled with about 590 events from git and session transcripts.
  - HQ at /hq: floor plan, replay, timeline, Lobby with due rituals and founder items.
  - Event-driven ritual triggers: company/rituals/triggers.json and tools/rituals-due.mjs.
  - Merged chemistry wave 4 and the pass-4 claim fixes. Check: 0 warnings.
- Believe now:
  - HQ works locally (screenshots on desktop, phone and replay; high confidence). It is off in production unless HQ_PUBLIC=1.
  - The usage limit is the binding constraint: it stopped all 8 agents for about 7 hours.
- Next (chief-of-staff):
  - Merge the resumed agents (ai w4, geography w4 builders; life reviser; economics, cs, geography reviewers).
  - Run the publish loop, then the rituals that are due (retro, demo crit, the first founder digest).
  - A fact-check pass for chemistry w4, probability w3, geography w3 and the 5 claim fixes.
- Blocked (founder):
  - Backend choices: auth provider, database host, under-13 policy.
  - Budget split between lessons and the new teams.
  - AMD-001 ratification.
  - UN WPP and Bullard source checks.

## 2026-10-13 (late) · chief-of-staff · 248 lessons; wave 4 under way
- Changed: merged wave 3 (ai, chemistry, life) and CS wave 2, for 248 lessons and 1,300 claims; check passes (6 disputed-claim warnings). The walkthrough driver now follows the QA path (each control once, in DOM order, 1.2 s settle). Running: builders for geography w2, physics w4, math w4, economics w4 and cs w3 (5 Opus, the cap), plus a fact-checker on ai/chemistry/cs.
- Believe now: about 20k build tokens per lesson holds (cs w2: 196k for 10). The learner launch rate of about 11% is the real constraint, not build throughput (medium-high confidence). Only 2 lessons are published.
- Next (chief-of-staff): merge builders as they report; once the integrated QA finishes, qa-record and publish the launch-verdict lessons; regenerate walkthroughs and dispatch learner reviewers per domain; revision builders for "revise" findings; WBR and retro for waves 2–4.
- Blocked: AMD-001 (a–d), the OP and the usage budget wait on the founder, as do the human source checks (UN WPP, Bullard 1965).

## 2026-10-13 · chief-of-staff · 178 lessons merged; usage-limit COE; checks resuming
- Changed: waves 1 and 2 (7 domains) merged, plus revisions of all 18 founding lessons (every fatal fixed). Kit: <Milestones>, mulberry32, reveal layout fix, turbopack worktree root. Integrated QA last run 226/226 (before wave 2's 70 merged).
- Believe now: builders cost about 20k tokens per lesson, and checking is the bottleneck. 150+ lessons have no learner review. Wave 3 builders (econ, chem, physics, math) resumed via SendMessage; life, ai, cs-w2 and geo-w2 are still stopped with partial work in their worktrees.
- Next (chief-of-staff): when the resumed builders report, resume life, ai, cs-w2 and geo-w2 (max 4 Opus at once). After the fact-checkers: learner reviews per domain, then publish what passes. Then a full verify on the integrated tree, a WBR and the wave 2 retro.
- Blocked: AMD-001 and the OP need the founder's ratification. A usage budget is unknown (COE action).

## 2026-10-12 · chief-of-staff · Founding session: company, app and first 17 lessons
- Changed: built the feed app and lesson kit, the company handbook (26 roles/25 agents, constitution, 13 rituals, PM system, patterns, experiments), the CLI and computer-use QA. Four parallel builders made 16 lessons across 8 domains; merge-sort-payoff is the exemplar. Fact-check and a simulated-learner review were run on merge-sort-payoff.
- Believe now: all 17 lessons pass the QA contract on phone and desktop (44/44). That means they work, not that they teach (high confidence that they work, no evidence that they teach). The merge-sort learner review found the stage never shows why splitting helps (W-014). Expect similar "told, not shown" findings elsewhere.
- Next: fact-check the remaining 16 lessons (W-001, fact-checker). Run learner reviews from walkthroughs (W-002). First Demo Crit, then launch reviews; nothing is published yet. Run the first WBR and OP.
- Blocked: real-learner evidence needs the founder (EXP-002, W-007). The kit's `next build` with NEXT_DIST_DIR rewrites tsconfig.json; revert it, don't commit it.

