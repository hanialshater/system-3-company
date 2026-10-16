# Dispatch request: Probability & Data · round 5 · 2026-10-16
poc: cm-probability (Bea)
lane: 1 · A category's lessons (Probability & Data)
slots asked: 3 agents, of which 0 builders. All three items write brief text only (no `next build`, no review server).
since last round: this is Probability & Data's first batch under the protocol, so there is no earlier probability batch to reconcile. Results that came back to this lane, and what I decided:
- **Launch review r5, row 3 (company/rituals/records/2026-10-16-launch-review-r5.md): three probability lessons on the go slate that no lane nominated. Ruling P1 below: no objection to any of the three.** Release-manager may include more-detail-less-likely, one-circle-fewer-introductions and twenty-flips-run-of-five in the publish pass. Ask A1: cite this file in row 3.
- **Learner r1 notes on those three (2026-10-16, SO-10-3, all `Verdict: launch`): accept as v-next material, revise later (B1 writes the v2/v3 revision briefs).** No build this round.
- **QA 2026-10-16 (SO-10-1, server 5b2fee7) for the same three: accept.** No dead end; no change to these lesson directories since 6838dba (`git log 6838dba..HEAD -- <three dirs>` is empty at df0b901).
- **small-gap-big-extremes v2, learner r1 `revise`:** a Wave J slug, so it is lane 2's (W-1318), not this batch's. I agree with both findings as the category owner (the second "80%" beside the answer; the gate opens before 130 cm is set). Ask A3.
- **significant-but-false, sixteen-of-twenty-got-better, ten-thousand-replies-still-wrong, where-the-axis-starts (`Verdict: pass`, W-843 vocabulary):** not mine to rule. They wait on evaluation-steward A3(a), as the launch record says.
- **Board reconcile (probability items not done):**
  - W-066 (brief 16 fake-the-coin-flips figure): **close.** Brief 16 stays skipped (company/ops/brief-skips.json) and was replaced by twenty-flips-run-of-five, which uses the either-face figure. I recomputed it by full enumeration of 2^20 sequences: 45.84% for a run of 5+ of either face, mode longest run 4 at 31.0% (matches c1, c3). Ask A2.
  - W-465 (fact-check round-3 drafts): **close for three of four.** All claims of the three r5 lessons are `verified, checkedBy: fact-checker`. The c4/c6 citations it worried about are now marked "(Not shown to the learner)" (more-detail c4) or deleted (twenty-flips c6, d8a48ce, W-852 done). small-gap-big-extremes is with lane 2 (W-1318). Ask A2.
  - W-505 (NCM wave J brief #66) and W-183 (weak-links brief wording): **run, B2.**
  - W-506 (NCM wave J briefs #71, #72): **run, B3.**
  - W-656 (wave-J brief departures, 58/59): held for my next CM session. It is a CM ruling, not a dispatch.
  - W-544 / W-809 (AP-Statistics / OpenStax map, plan-to-2000): **held**, like cm-math's W-545. Physics r5 B1 is the trial run of the method, and W-582 (exam-prep vertical) is still in the founder's inbox.
  - W-796 (History neighbour agreements, polio lessons): held while History is incubating (History-wide publish hold).
  - W-413 (easley-kleinberg references, metadata only): held. It waits on a confirmation per lesson, and nothing here is blocked by it.
  - W-491 (Wave J probability builds 56-70): lane 2 and the R2 build hold, not this batch.
  - W-1405 (accessibility review of the nine): accessibility-reviewer's item. I depend on it (objection 4 of the launch record), but I do not own it.
held or declined: (1) **No revision builds this round.** Load is ~12-14, the builder queue is already five deep, and no r5 note blocks a learner. B1 makes the revisions build-ready. (2) **weak-links-hold-it-together v4** has no learner walk on v4 (the newest, r8, is on v3) and only a 2026-10-14 QA. That is a lane 10 ask (A4), not an item. (3) **New concepts:** none. The three r5 lessons fill three unmet concepts (conjunction-fallacy, triadic-closure-probability, streaks-in-randomness). The next concepts come from op-planning.
standing orders: none issued, none in force for this lane. Mechanical work on probability lessons (QA, fact-checks, learner walks) already runs under lane 10's SO-10-1..3. Each item below needs a teaching judgment, so it does not qualify under §2.3.
for the founder: none. Nothing here deploys, publishes or spends above the tranche. Publishing is release-manager's act. A deploy that carries it needs the founder's approval of that specific deploy.
objections: **none to launch review r5 row 3** (ruling P1). Standing caveat: every verdict cited here is a simulated learner. It is a gate input, not evidence that anyone learned. Nothing in this file counts it as learning evidence.

## Rulings (cm-probability, 2026-10-16, r5)

**P1 · Launch review r5, row 3: no objection to any of the three.** Each lesson has: a concept that is on the map and has no other lesson (no other `meta.json` in src/demos teaches conjunction-fallacy, triadic-closure-probability or streaks-in-randomness); every claim verified by fact-checker; a qa-tester record at 5b2fee7 with no dead end; and `Verdict: launch` on the current version. I also read the walkthrough sheets myself (artifacts/walkthroughs/<slug>/sheet.png) and recomputed the learner-visible numbers. A lesson I object to would have to teach something false, have a dead end, or provoke the wrong idea. None of the three does.

| Lesson | Decision | Why (what I read) | v-next notes (not blocking; go to B1) |
|---|---|---|---|
| twenty-flips-run-of-five v2 | **No objection** | Numbers recomputed by enumerating all 2^20 sequences: P(run ≥ 5, either face) = 45.84% (c1 "45.8%"); most likely longest run 4 at 31.0% (c3). The prediction is a real trap: the learner chose 5% and the reveal corrected it with their own tally. QA: 5 controls, no dead end. Recall item tests the point, not the wording. | (a) The reveal's "The tallest bar is a longest run of 4" can read as "5 is unusual". Pair it with the run-of-5+ share in the same sentence. (b) No legend for yellow (run ≥ 5) and grey bars. (c) The fake-flip payoff only appears after all 20 taps (c5). Make the prompt say so. (d) The internal c5 source sentence still describes v1 (launch record objection 8). That is demo-builder's, and it is not learner-visible. |
| one-circle-fewer-introductions v1 | **No objection** | Recomputed q(1 - (1 - 0.1/q)^5): 40.95%, 33.6%, 23.1%, 10% at q = 100/50/25/10% (c1-c3 shown as 41/34/23/10). A real choice: the learner was tempted by "one circle gives better odds". The reveal names the hidden condition (independence). QA: 4 controls, no dead end. | (a) The "then N% each" step is shown but not explained ("so each friend still averages 10% a week"). c2 says the model is "stated on the card": the numbers are, the reason is not. Add the reason, or reword c2 at the revision (that is a claim change, so the fact-checker re-verifies it). (b) Tick labels 10/23/34% crowd at phone width. |
| more-detail-less-likely v1 | **No objection** (the weakest of the three; watch item W1 below) | c1 is a derivation and is true. The stage shows the subset relation with live counts, and the reveal's "never more likely" is careful. QA: no dead end. The learner reached the objective. | (a) **Giveaway prediction.** The question says "some librarians run book clubs, some don't", which hands over the subset, and "quiet and loves books" barely points at a club. So the misconception is named, not provoked. v2: the description must point at the added detail (Linda-style), and the subset hint goes. (b) The readouts say "Outer ring" / "Inner ring", but the stage draws a grid with outlined strips. Rename them to what is drawn. (c) The "Outer ring" label is clipped at the stage bottom on the locked frame (values are "-" there, so no number is lost). (d) The club slider stops at 90%, so the equal case in c1 ("equal only if every librarian runs a club") is never on screen. Decide whether 100% is allowed. |

**Why I do not hold more-detail-less-likely for the giveaway.** Holding it leaves the concept with no lesson. Publishing it gives learners a true and clear lesson that is too easy. The recall item (Alex, accountant who plays poker) has no subset hint, so revisit recall will show whether the point transferred. **W1 (watch, what would change my mind):** analytics-steward's P3 row is pooled. I ask for the same metric per lesson for this slug (A5). If, at ≥ 20 first predictions, more than 70% are correct, the lesson does not target a live misconception, and the v2 in B1 moves to the front of the probability revision queue. A dead end found at any time means it is unpublished (launch record condition). That would also change my answer to an objection.

**What would turn any of these into an objection before the publish pass:** a `Demo.tsx` or claim change after 6838dba, a newer learner verdict that is not `launch` on the current version, or a fact-check dispute on any claim. Release-manager re-reads row 3 in any of those cases. If none applies, no further word from me is needed.

## B1 · cm-probability-chance: v-next revision briefs for the three r5 launch lessons · board: new item (ask A2)
role: cm-probability-chance
order: first (B2 after this one, because they edit the same file)
kind: other
worktree: no (main checkout; edit only `company/domains/briefs/probability.chance.md`; commit by explicit path with GIT_AUTHOR_NAME=cm-probability-chance; no pull, rebase, stash, reset or push)
model: agent default
project: [project:catalog]
budget: 1 run, ~80k tokens. No build.
inputs: this file (ruling P1 table, v-next column); `company/reviews/{more-detail-less-likely,one-circle-fewer-introductions,twenty-flips-run-of-five}/2026-10-16-learner-adult-beginner-r1.md`; each lesson's `meta.json` (misconception, objective, claims, recall) and `Demo.tsx` (current stage strings only); `artifacts/walkthroughs/<slug>/sheet.png`; `company/product/demo-standard.md` (Text budget); `company/decisions/2026-10-16-stage-word-budget-counting.md`; `company/design/formats.md`.
outputs: a new section `## r5 launch notes: v-next revisions (cm-probability, 2026-10-16)` with three entries, one per slug: `### <slug> v<next>`, then the findings it answers (cite the r1 file), the exact text changes (old → new), which claims change (by id; any changed claim goes to `unverified` for the fact-checker at build), and `- Stage word budget: N words` counted at the busiest frame (decision rules 1-5). For more-detail-less-likely v2: a rewritten description and question that make the conjunction feel more fitting without stating the subset, and the readout labels renamed to what the stage draws. Keep the format and interactions: single-card and simulation-run, no new interaction.
done when: `awk '/^## r5 launch notes/{f=1} f && /^### /' company/domains/briefs/probability.chance.md | wc -l` prints 3; each entry has a `Stage word budget:` line ≤ 25 or carries "Stage over budget: N"; `npm run check` passes.
checked by: none needed now. It is brief text, and no learner sees it until a build. Lane 10 walks and fact-checks the built revision from the artifact, and that check binds. A change that needs a new interaction goes to lane 6 first (stop condition).
stop if: a fix needs a new interaction or a non-default format (stop and report it, for learning-designer); a fix would change a verified number (report it; numbers stay unless a claim is wrong); the file has someone else's uncommitted edits when you start.

## B2 · cm-probability-chance: re-check NCM wave J brief #66, and close or rewrite W-183 · board W-505, W-183
role: cm-probability-chance
order: after B1
kind: other
worktree: no (main checkout; edit only `company/domains/briefs/probability.chance.md`; commit by explicit path with GIT_AUTHOR_NAME=cm-probability-chance; no pull, rebase, stash, reset or push)
model: agent default
project: [project:wave-j]
budget: 1 run, ~60k tokens. No build.
inputs: `company/domains/briefs/probability.chance.md` (### 66 two-big-groups-stay-apart; #### weak-links-hold-it-together); `company/design/specs/weak-links-hold-it-together.md`; `src/demos/probability/weak-links-hold-it-together/meta.json` and `Demo.tsx` (v4, read only); the strand's own rules in the same file.
outputs: under brief #66, a dated line `- cm-probability-chance re-check (2026-10-16): accept | revise: <what>` with each check figure recomputed in node (paste the one-liner). For W-183: one dated line under the weak-links brief saying whether v4 already resolves (a)-(c) (question wording vs overlap ratio, tie rule, seed-33 figures). If it does not, say what remains.
done when: `grep -n 're-check (2026-10-16)' company/domains/briefs/probability.chance.md` shows the line under #66, and `grep -n 'W-183' company/domains/briefs/probability.chance.md` shows the weak-links line; `npm run check` passes.
checked by: none needed. Brief text only. A Wave J build of #66 is lane 2's, and lane 10 checks it from the artifact.
stop if: #66's figures do not reproduce (report the numbers; do not rewrite the brief's teaching point); W-183 needs a lesson change (that is a revision build, so report it for my next batch); someone else's uncommitted edits are in the file.

## B3 · cm-probability-statistics: pre-flight NCM wave J briefs #71 and #72 · board W-506
role: cm-probability-statistics
order: parallel with B1
kind: other
worktree: no (main checkout; edit only `company/domains/briefs/probability.statistics.md`; commit by explicit path with GIT_AUTHOR_NAME=cm-probability-statistics; no pull, rebase, stash, reset or push)
model: agent default
project: [project:wave-j]
budget: 1 run, ~60k tokens. No build.
inputs: `company/domains/briefs/probability.statistics.md` (### 71 your-clue-against-two-picks, ### 72 same-picture-two-histories); `company/design/formats.md`; `company/product/demo-standard.md`.
outputs: under each brief, a dated line `- cm-probability-statistics re-check (2026-10-16): accept | revise: <what>`. For #72: a ruling on the "the picture can't tell" option. Is it a defensible correct answer that the stage shows, or a hedge that teaches "nothing can be known"? If it is a hedge, propose replacement option text. Recompute #71's Bayes threshold figures in node and paste the one-liner.
done when: `grep -c 're-check (2026-10-16)' company/domains/briefs/probability.statistics.md` prints 2; `npm run check` passes.
checked by: none needed. Brief text only. Lane 10 checks the build from the artifact.
stop if: a figure does not reproduce; a fix needs a new format (report it, for learning-designer); someone else's uncommitted edits are in the file.

## Asks to other lanes
- **A1 → head-of-product (lane 5) and release-manager (lane 11):** row 3 of company/rituals/records/2026-10-16-launch-review-r5.md: cm-probability has **no objection** to more-detail-less-likely, one-circle-fewer-introductions or twenty-flips-run-of-five (ruling P1, this file). Please cite this file in the row. My conditions are only the ones the record already carries (a dead end means unpublish; accessibility per W-1405), plus watch item W1.
- **A2 → chief-of-staff (board writer):** close W-066 and W-465 (reasons under `since last round`). Add a board item for B1 (owner cm-probability-chance).
- **A3 → principal-pm-verticals (lane 2, W-1318):** as category owner I agree with both small-gap-big-extremes r1 findings. In v3, (a) keep the curves' overlap figure out of the sentence that gives the answer, or drop it; (b) gate the reveal on the cutoff having been set to 130 cm. "A's curve falls away faster" needs one concrete number (e.g. per 100,000 above 130 cm), or it should be cut. Your build, your call on the slot.
- **A4 → evaluation-steward (lane 10):** weak-links-hold-it-together v4 has no learner walk on v4 and no 2026-10-16 QA. Queue both under SO-10-1 / SO-10-3 if they qualify.
- **A5 → analytics-steward:** when the launch rows are scored, report P3 (first-prediction correct) for more-detail-less-likely on its own, beside the pooled figure (watch item W1). Add nothing to the committed rows. This is a reading request, not a new prediction.
