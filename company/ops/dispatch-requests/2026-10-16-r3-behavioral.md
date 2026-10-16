# Dispatch request: Behavioral Economics (lane 1, category) · round 3 · 2026-10-16
poc: cm-behavioral (Rasmus)
lane: 1, A category's lessons (Behavioral Economics and Irrational Behavior)
slots asked: 3 agents, of which 3 builders (at most 2 at once: B3 runs after B2)
since last round (r2, `company/ops/dispatch-requests/2026-10-16-r2-behavioral.md`):
- **r2 B1 (cm-behavioral):** done (skip lines released, ruling written). head-of-product has since **confirmed the ruling with one addition** (`company/decisions/2026-10-16-stage-word-budget-counting.md`, 9b8bce0): numerals count 0, control labels count, kit text outside the stage does not, and a stimulus declared word for word in the brief is exempt from the 25 inside a 50-word ceiling. Copied into `company/domains/briefs/behavioral.md` (rules 6-8 and the ruling's status line).
- **r2 B2 `zero-loses-to-this-crowd`: accept** into review, with a **revision (B2 below)**. Built and merged, stage at 25, every claim `unverified`. Builder's open questions decided in brief 3 (W-1267): the measured reveal is 95 words (89 + the kit verdict), so the held line c6 is cut (`HELD_LINE = false`); option B gets the gloss "between the other two" (equal precision); the slug stays (the feed never shows it, and a rename would take the lesson outside the founder's five named slugs).
- **r2 B3 `saved-or-die-same-600`: stopped correctly, rebuilt (B1 below).** The builder's stop note (`company/reviews/saved-or-die-same-600/build.md`, fdc1ec3) was right under the earlier reading. Brief 4 now declares its four option texts and the two toggle restatements as stimulus, word for word; the toggle restates **in place** of C and D; no option letters or wording headings on the stage; bar legends numerals only. Counted from the brief and by the check script: busiest frame 47 (stimulus 30, other 17), within 25 and 50. It has no skip line (none was ever added for W-1270), so nothing is released or kept in brief-skips.json.
- **Briefs 1-2 (FC pass 54b, W-1244): revise (B3 below).** Both held c6 lines take the fallback: brief 1's source speaks of the whole problem set, not the certainty effect; brief 2's "with real payments" is not in the opened passage. Finding a reachable source is research-lead's (W-902), not this lane's. Brief 2's matched-branch sentence is reworded so the take/take branch no longer describes a switch the learner did not make, and its alt text slip is fixed.
- **New category rule (brief file rule 6):** every held type (d) line ships cut until a dated type (d) statement covers it, the fact-checker verifies it, and the measured reveal recounts at 90 or less. Rule 7: the 90 is reveal-fit's count, which includes the kit verdict the scripts leave out.
held or declined:
- **Brief 5 `same-fifty-two-labels`: still held** for W-1062 (learning-designer on option C). No change; its skip line stays.
- **No sixth brief** before the Domain Launch Review reconvenes (decision §1).
- **Slug rename of brief 3: declined** (brief 3, decision 3), so no directory move is asked for.
standing orders:
- **SO-1beh-1: renewed unchanged** (expiry 2026-10-20). It no longer fires for `saved-or-die-same-600`, because B1 dispatches it explicitly (do not dispatch both); it still covers `same-fifty-two-labels` once W-1062 lands and its skip line goes. It never covers revision builds.
for the founder: none. (Inside the approved tranche 1; no deploy, no gate waiver.)
objections: none new. Still open on the board and in `company/domains/behavioral-signoffs.md`: W-1060 (cm-economics, brief 3 seed and crowd), W-1061 (cm-books, brief 4 predict wording, non-gating). An objection on either stops that slug's build and is copied into its brief.

## B1 · Build brief 4 `saved-or-die-same-600` (gain-loss-framing) under the confirmed word-budget rule · board W-1273, W-1270
role: demo-builder
order: first
kind: build
worktree: yes
model: agent default
project: [project:behavioral-econ]
budget: 1 run, ~90k tokens
inputs: company/domains/briefs/behavioral.md brief 4 (including "Stage word budget and declared stimulus") and "Rules every brief below follows" (1-8); `node company/domains/briefs/checks/behavioral-gain-loss-framing.mjs` output (stage counts, reveal branches); company/decisions/2026-10-16-stage-word-budget-counting.md; company/reviews/saved-or-die-same-600/build.md ("Notes for whoever builds it next"); company/product/demo-standard.md; company/product/lesson-metadata.md; company/design/formats.md (Single card). Lease: the previous builder's claim is still held (`node tools/claim.mjs list`); run `node tools/claim.mjs release saved-or-die-same-600` then `node tools/claim.mjs take saved-or-die-same-600`
outputs: src/demos/behavioral/saved-or-die-same-600/{Demo.tsx,meta.json,styles.module.css}; company/reviews/saved-or-die-same-600/build.md (append a new dated build section; keep the stop note above it), with `## Stage word budget` as "stage N words (stimulus M, other N−M)" for each frame, counted from the rendered lesson
done when: merged on a worktree branch with `npm run check` passing; the check script passes unchanged; the rendered stage at its busiest frame has other text ≤ 25 and total ≤ 50, and the stimulus strings match the brief word for word; the toggle restates C and D in place; all five controls rendered from the start (C, D disabled under the cover); the held framing line (c5, Rachev et al. 2021 PMC8432807, with Tversky & Kahneman 1981 and Many Labs 1 named only "as reported by") is in meta.json as `unverified` and does not render (`HELD_LINE = false`); every claim `unverified`, none self-verified; no loss-aversion ratio, no 50/50 bet, no EV asked; reveal-fit "fit" with revealWords ≤ 90
checked by: lane 10 (evaluation-steward: fact-checker, learner-evaluator, qa-tester)
stop if: the rendered count has other text > 25 or total > 50 (write the table, stop, route to cm-behavioral); the check script fails; cm-books objects on W-1061; the stage needs a real disease, place or group; the builder would need to change any declared stimulus or claim-bearing text

## B2 · Revision build `zero-loses-to-this-crowd` (v2): held line cut, option B gloss · board W-1267
role: demo-builder
order: parallel with B1
kind: build
worktree: yes
model: agent default
project: [project:behavioral-econ]
budget: 1 run, ~40k tokens
inputs: company/domains/briefs/behavioral.md brief 3, "Decisions on the built lesson" (items 1, 2, 5) and rules 6-8; `node company/domains/briefs/checks/behavioral-beauty-contest-level-k.mjs` output (predict and recall option texts); src/demos/behavioral/zero-loses-to-this-crowd/; company/reviews/zero-loses-to-this-crowd/build.md. Work from the brief section, not `claim.mjs next`; the stale lease (agent "unknown") is closed with `node tools/claim.mjs release zero-loses-to-this-crowd --done`
outputs: src/demos/behavioral/zero-loses-to-this-crowd/{Demo.tsx,meta.json}; a dated v2 section in company/reviews/zero-loses-to-this-crowd/build.md (reveal-fit numbers and stage count)
done when: merged on a worktree branch with `npm run check` passing; `HELD_LINE = false` and no reveal branch renders c6 (c6 stays in meta.json, `unverified`); predict option B reads "About 23, between the other two" and the recall's option B "About 30, between the other two", matching the script; reveal-fit "fit" with revealWords ≤ 90 on the QA path; stage still 25 by the confirmed rule; no claim self-verified; nothing else changed
checked by: lane 10 (fact-checker, learner-evaluator, qa-tester; brief 3 has had none yet)
stop if: the check script fails; cm-economics objects on W-1060; the change would add a word to the stage

## B3 · Revision builds `sure-million-or-long-shot` and `same-week-a-year-apart`: fallback text for c6, take/take wording, alt text · board W-1244
role: demo-builder
order: after B2 (keeps at most 2 behavioral builders at once)
kind: build
worktree: yes
model: agent default
project: [project:behavioral-econ]
budget: 1 run, ~50k tokens
inputs: company/domains/briefs/behavioral.md brief 1 ("Decision ... W-1244") and brief 2 ("Decision ... W-1244" and "Revision-build changes (W-1244)"), rule 6; `node company/domains/briefs/checks/behavioral-allais-certainty-effect.mjs` and `node company/domains/briefs/checks/behavioral-present-bias-reversal.mjs` output (fallback branches and the reworded matched sentence); company/reviews/sure-million-or-long-shot/2026-10-16-fact-check.md and company/reviews/same-week-a-year-apart/2026-10-16-fact-check.md (the c6 and notes sections); both lesson directories
outputs: src/demos/behavioral/sure-million-or-long-shot/{Demo.tsx,meta.json}; src/demos/behavioral/same-week-a-year-apart/{Demo.tsx,meta.json}; a dated revision section in each lesson's build.md
done when: merged on a worktree branch with `npm run check` passing; both lessons `HELD_LINE = false`, every reveal branch equal to the script's fallback text; same-week's matched branches read "Waiting, then taking the $100 today, would fit only a model that gives today extra weight, called present bias." and its c3 is set back to `unverified` with a note that its text changed (the builder does not re-verify it); same-week's alt text at the today stop reads "The pair: $100 today, $110 in a week"; c6 in both stays in meta.json as `unverified` and renders nowhere; reveal-fit "fit" for both; no other claim's status changed
checked by: lane 10 (fact-checker re-checks c3 of same-week; qa-tester re-runs both)
stop if: either check script fails; a reveal branch on screen differs from the script's fallback text; the change touches any verified claim other than same-week c3

## Asks to other lanes (not items; named so the chief of staff can route them)
- **Lane 10 (evaluation-steward):** (1) brief 3 `zero-loses-to-this-crowd` after B2 merges: fact-check (10 claims; c6 held, not rendered), learner review and QA, walkthrough first, never build.md first; the learner-evaluator says whether "between the other two" reads as a middle-option cue; (2) brief 4 after B1 merges: the same three, and evaluators count the stage from the artifact (declared stimulus is listed in the brief); (3) after B3: fact-checker re-checks same-week c3, qa-tester re-runs both pilot lessons; (4) learner review and QA for briefs 1-2 if not yet recorded; (5) the type (d) part of the step-9 statement (W-975) and W-1059, which decide whether any held line can return under rule 6.
- **Lane 6:** design-lead on brief 3's format (100 players: Single card or Simulation run; W-1267 item 4); learning-designer on brief 3's 3 px dots and on W-1062 (brief 5 option C), which releases brief 5.
- **research-lead (W-902):** an opened, reachable source for (a) the certainty-effect item of Ruggeri et al. 2020, item level, and (b) "with real payments" for Augenblick, Niederle & Sprenger 2015. Without them both lines stay cut; neither is needed for the pilot to teach.
- **Lane 1, other POCs:** cm-economics on W-1060, cm-books on W-1061 (their sections of company/domains/behavioral-signoffs.md).
- **Lane 7 (tools):** a stage word count in `tools/reveal-fit.mjs` under the confirmed rule, as head-of-product's decision asks, so stage counts stop being hand counts.
- **Chief of staff (board):** W-1273 → done (stimulus declared, ruling marked confirmed; build is B1). W-1270 → done (unblocked; no skip line was needed; build is B1). W-1267 → done as decisions (builder work is B2; the agent-based format and 3 px dots stay open for lane 6, so add them as one design-lead/learning-designer item if they are not already on the board). W-1244 → done as decisions (builder work is B3).
