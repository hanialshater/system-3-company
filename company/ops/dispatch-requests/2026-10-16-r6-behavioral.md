# Dispatch request: Behavioral Economics (lane 1, category) · round 6 · 2026-10-16
poc: cm-behavioral (Rasmus)
lane: 1, A category's lessons (Behavioral Economics and Irrational Behavior)
slots asked: 5 agents, of which 4 builders (at most 3 at once under the cap; B5 queues). **All five wait on the top-up.** At 14:55Z the chief of staff's ledger import showed `behavioral-econ` at 2.4M of its 1.8M budget (129%). Under `company/ops/token-budget.md` §4, `gate` fails for new dispatches with this tag until the founder and one PE approve a top-up. This batch is written so it can run in order once that approval is given. Estimates for the portfolio-manager are under "Pricing" below.
since last round (r5, `company/ops/dispatch-requests/2026-10-16-r5-behavioral.md`):
- **r5 B1 (content run): accept.** fcd3e95: the brief 4 script prints the merged recall "why", the r5 decision entry is in the brief, and the W-1338 record says no edits were lost. W-1213 shows done. FC pass 63 checked c9 against the script line and verified it (3d00312).
- **r4 B2 (zero-loses v2, sure-million matched branches, same-week objective): accept as built.** FC pass 63 (5221262) verified all in-scope claims (zero-loses c1/c2/c5/c10, sure-million c4/c5, same-week c3). The held lines stay held: zero-loses c6 and sure-million c6 render nowhere.
- **FC pass 63, saved-or-die v2 (3d00312): accept.** c1-c4 and c9 are verified. c5 is held (W-1438: the 2024 correction changes nothing, and c5 still waits on W-975 (d) and W-1059). FC's c2 wording note ("for example expected value" would be exact): **accepted.** The claim text gets the reword in B2. No learner text changes because of it.
- **Learner r2, saved-or-die v2: REVISE (W-1431). Revise, as B2 (v3).** All five findings are accepted. The decisions are in B1, and their exact strings are below. Lane 10 read it as "a quiz about wording, not one decision". **Accepted in part.** The title, the hook, the pre-commit toggle label and the answer option all announced "two wordings, same thing" before the learner decided anything. B2 removes all four. Showing one wording at a time (the saved row hidden while the die row is chosen) is an interaction change. It is not mine to design, so it goes to lane 6 as an ask (below), not into this build. The predict being about "someone" and not about the learner stays as it is. Category rule 1 needs the predict answer to be a derivation, and "you will flip" is not checkable.
- **Learner r1, sure-million v1: REVISE (W-1432). Revise, as B3 (v2).** Accepted. In every branch, the reveal now opens with the answer to the question that was asked ("expected utility pairs the sure $1M with the 11% chance"), and only then turns to the learner's own picks. That is all four branches, not only the matched ones, because the reviewer's "the same gap shows whenever a learner's own picks are not the person in the question" applies to the mixed branches too. Finding 5 ("1.1 times" unexplained) is not taken up: it is a note, and the words are not free.
- **Learner r2, zero-loses v2: LAUNCH. Accept. No revision.**
  - **W-1433 (the answer is the numerical middle in both the predict and the recall): declined.** The reviewer calls it a weak cue, not a blocking one. Both lures carry a real misconception (0 is the equilibrium; 35 is the crowd average). A fourth option would cost a v3 and a full lane-10 re-check of a lesson that has a launch verdict. What would change this: a second learner review, or real-learner data, showing that people pass by picking the middle.
  - **W-1429 (FC: with whole-number guesses, everyone guessing 1 is also an equilibrium): declined for the learner text, recorded in the brief.** The slider moves in whole numbers (`step={1}`), so the footnote is true. But "0 is this game's equilibrium guess" names the equilibrium that the linked lesson and the opened source (PMC5303671, "the Nash equilibrium of zero") teach. A guess of 1 loses here by about the same margin as 0 (0 misses by 22.9), so no answer and no reveal changes. FC called it "not a dispute". B1 writes the decision and the footnote into brief 3 so the next reader does not re-raise it. If the fact-checker later disputes it, the fix is "0 is the textbook equilibrium guess" (one word added).
- **Learner r1, same-week v1: REVISE (W-1447, `company/reviews/same-week-a-year-apart/2026-10-16-learner-no-econ-adult-r1.md`). Revise, as B4 (v2).** Findings 1 and 3 are accepted (the revise reason).
  - The reveal opens, in every branch, with the answer to the model question and the step the option-3 chooser lacks: "whatever the rate", one gap decides both pairs, so someone who waits at week 52 waits today. Only then does it turn to the learner's own picks. This is the same "answer first" pattern as briefs 1 and 4 this round. It also bridges the kit's verdict line to the take-first and reversing paths. `Lesson.tsx` is protected, so the verdict line itself is not touched.
  - The hook stops asking "would you". It asks the model question and then invites the learner's own try.
  - Finding 5 (the strip does not say what it forecasts): accepted if the stage budget allows "every date".
  - Finding 6 and QA's middle-tap note (W-1445): the three slider stops get labels.
  - Findings 2, 4 and 7 are notes. Finding 4 is already said in "Where it stops".
  - The boundary was below the intended learner (meta.json knows `present-value`), and the reviewer says so. The revise reason holds for the intended learner.
- **QA notes, b19b080 (W-1445): accepted, split by lesson.**
  - saved-or-die: the 360x640 clip of the last control and the "600" labels overflowing their buttons, and the 50 px landscape stage. These go into B2 as layout constraints (styles only). The shorter toggle label already helps. If landscape needs a kit change, B2 stops and it goes to lane 7.
  - zero-loses: the slider starts at 50, and a guess of 50 does not count until the slider moves away and back. 50 is the most common naive guess in this game, so this is real friction, not a corner. It becomes B5, a behaviour fix with no text or claim change. zero-loses stays v2, and only QA re-checks it.
  - same-week: the middle tap lands on week 13 with no signpost. Fixed in B4 (stop labels).
- **W-1430 (the present-bias script prints held line L in all four branches, while the page ships `HELD_LINE = false`): accepted, and moved from demo-builder to B1.** Check scripts are this role's (charter). It is a script-only change: print the shipped fallback strings as the branches, and keep L in a separate held section. The page does not change.
held or declined:
- **Brief 5 `same-fifty-two-labels`: still held** for W-1062 (learning-designer). It is also behind the budget stop now.
- **No sixth brief** before the Domain Launch Review reconvenes.
- **No held type (d) line returns** (rule 6). There is still no dated (d) statement (W-975, W-1059, W-1438).
- **zero-loses v3: none** (W-1429 and W-1433 declined; B5 changes behaviour only, no text). W-1434 (same-week learner walk) is answered by the r1 record above.
standing orders:
- **SO-1beh-1: renewed unchanged** (expiry 2026-10-20). It covers only the `same-fifty-two-labels` build, once W-1062 lands and its skip line goes. **It is suspended while `gate` fails for `behavioral-econ`.** The chief of staff runs nothing under it until a top-up is recorded in `budget.topUps`.
- No new standing order. Revision builds are never standing orders.
for the founder:
- **A top-up for `behavioral-econ` (spend above the approved budget, §5).** The portfolio-manager prices it from the estimates below, and the founder and one PE approve or refuse it in the approval record (token-budget.md §4). This round's ask is about 0.84M tokens: about 0.50M for B1-B5, plus about 0.34M for the lane-10 re-checks they trigger. Finishing the pilot (brief 5 built and checked, plus the DLR) adds about 0.3M. If it is refused, B1-B5 do not run. The four lessons stay in review as they are: zero-loses v2 with a launch verdict; saved-or-die v2, sure-million v1 and same-week v1 with revise verdicts. The pilot then stops against its kill criteria, and that is the founder's call, not mine.
objections: none new. Still open: W-1060 (cm-economics, brief 3 seed and crowd) and W-1061 (cm-books, brief 4 predict wording, non-gating). **cm-books should read the v3 predict below,** because it rewords the misconception option. An objection on either stops that slug's next build and is copied into its brief.

## Pricing (for portfolio-manager)
| Item | Tokens (estimate) | Basis |
|---|---|---|
| B1 content run (3 scripts, 4 brief entries) | ~70k | r5 B1 was ~35k for one script; this one changes three and drafts brief 2's strings |
| B2 saved-or-die v3 (demo-builder) | ~170k | text in 4 branches + predict + recall + title/hook + toggle + key styling, claims reset, measured counts; r4 B1 was the same scope |
| B3 sure-million v2 (demo-builder) | ~110k | 4 reveal strings, claims reset, measured counts |
| B4 same-week v2 (demo-builder) | ~140k | 4 reveal branches, hook, stop labels, strip text, claims reset |
| B5 zero-loses slider fix (demo-builder) | ~60k | one control's behaviour, no text or claims |
| Lane-10 re-checks (FC + learner + QA on three lessons; QA only on zero-loses) | ~340k | ~100k per full lesson re-check at this round's sizes; ~40k for a QA-only pass |
| **This round** | **~0.84M** | |
| Rest of the pilot (brief 5 build + checks, DLR) | ~0.3M | ~190k per lesson all-in (W-974), plus the review |

## B1 · Content run: briefs 1, 2 and 4 decisions (r6), scripts print the new strings, W-1430, brief 3 notes · board W-1431, W-1432, W-1447, W-1430, W-1429, W-1433
role: cm-behavioral
order: first. **Waits on the top-up.**
kind: other
worktree: no (main checkout; it writes only the brief file and the three check scripts. Commit by explicit path; no pull, rebase or stash)
model: agent default
project: [project:behavioral-econ]
budget: 1 run, ~70k tokens
inputs: this batch (the decisions and the exact strings below); `company/domains/briefs/behavioral.md` (briefs 1, 3, 4); `company/domains/briefs/checks/behavioral-allais-certainty-effect.mjs`, `behavioral-gain-loss-framing.mjs`, `behavioral-present-bias-reversal.mjs`; learner records `company/reviews/saved-or-die-same-600/2026-10-16-learner-adult-beginner-r2.md`, `company/reviews/sure-million-or-long-shot/2026-10-16-learner-adult-beginner-r1.md`, `company/reviews/zero-loses-to-this-crowd/2026-10-16-learner-adult-beginner-r2.md`, `company/reviews/same-week-a-year-apart/2026-10-16-learner-no-econ-adult-r1.md`; QA notes in the four `2026-10-16-qa.md` records (b19b080); FC pass 63 notes in the three fact-check records
outputs:
- **Brief 1 "Decision (r6)"** and its script. The reveal opens with the answer to the question, in all four branches. Shared opening S (29 words): "Take away the 89% each pair shares, and both pairs become 11% of $1M against 10% of $5M, so expected utility pairs the sure $1M with the 11% chance."
  - 1A+2A: S + " You took the sure $1M, then the 11% chance, and one utility function fits: a cautious one, for which $1M is worth more than 10/11 of $5M. The sure $1M, then the 10% chance, fits none: the certainty effect. Where it stops: you chose knowing the pairs were linked."
  - 1B+2B: S + " You took the 10% chance of $5M both times, and one utility function fits: a bolder one, for which $5M is worth more than 1.1 times $1M. The sure $1M, then the 10% chance, fits none: the certainty effect. Where it stops: you chose knowing the pairs were linked."
  - 1A+2B: S + " You took the sure $1M, then the 10% chance of $5M: no utility function fits your two choices, a departure from the model, not a slip. This lean to the sure thing is the certainty effect. Where it stops: you chose knowing the pairs were linked."
  - 1B+2A: S + " You took the 10% chance of $5M, then the 11% chance of $1M: no utility function fits your two choices, a departure from the model, not a slip. Yours is the reverse of the certainty effect. Where it stops: you chose knowing the pairs were linked."
  - My counts are about 78/79 (matched) and 75 (mixed), plus the 10-word longer verdict. The script's measurement is the one that counts. The held-line section keeps its c6 text for 1B+2A. If that text no longer reads with "Yours is the reverse…", the script marks c6 "needs rewording before any return" and does not change it. The predict, recall and stage are unchanged.
- **Brief 4 "Decisions (r6)"** and its script. Version 3:
  - title "600 lives: pick a programme"
  - hook "Pick a programme to fight an outbreak, then pick from a second pair."
  - predict "Someone prefers the sure 200 saved, then, worded in deaths, the 1-in-3 chance nobody dies. Could caring only about who lives explain both?"
  - predict options, in this order: "Yes: 200 saved and 400 dying are different offers" / "No: only the sure option both times fits" / "No: 400 dying leaves 200 alive" (answer: the third)
  - toggle "Count who lives" (it replaces "Say both in the same words"; the behaviour is unchanged)
  - key words unchanged ("■ = alive · ■ = die"), but each swatch is drawn exactly as the bars draw that outcome (finding 5)
  - reveal: each branch opens with "In the same words, 400 sure to die is 200 sure to be saved, and the two chances are one chance.", then the learner's picks. "a model that judges outcomes fits both" becomes "caring only about who lives fits both". "no model that judges only outcomes fits both of your choices" becomes "caring only about who lives cannot explain both of your choices". In A+D, "Sure for gains, gamble for losses: that pattern is called a framing effect." becomes "That pattern is called a framing effect." The other sentences stay as they are.
  - recall question "Someone prefers to take a treatment described as '90% survive', and to refuse it described as '10% die'. Could caring only about who lives explain both?"
  - recall options "Yes: '10% die' is the worse offer" / "No: only taking it both times fits" / "No: 10% dying leaves 90% alive"
  - recall why "Out of 1,000 patients, 900 live and 100 die under both descriptions. Someone who cares only about who lives can take it both times or refuse it both times, but cannot prefer to take it one way and refuse it the other."
  - objective: "a rule that judges outcomes" becomes "a rule that cares only about who lives"
  - c2 claim text: "for example expected value"
  - The script asserts the following: the predict has 25 stage words or fewer. Neither the predict nor the recall answer contains "wording", "words" or "description". The misconception option also carries a number. Every branch measures 90 or less with the new longer verdict (`Not quite: it was "No: 400 dying leaves 200 alive".`). Stage other text is 25 or less and the total is 50 or less, with the 3-word toggle.
- **Brief 3 "Notes (r6)":** the W-1429 and W-1433 declines, as written above.
- **Brief 2 script (W-1430):** the four branches print the shipped fallback strings in full. L moves to a held section that is labelled "not shipped".
- **Brief 2 "Decisions (r6)"** and its script. Version 2. These are my strings; the script's count rules.
  - Hook: "Someone waits a week for $10 more when it is a year away. Must they wait today? Then try it yourself."
  - Every fallback branch opens with: "Whatever the rate, steady discounting judges the pair only by its gap, one week for $10 more, which never changed: someone who waits at week 52 waits today." Then the existing lead sentence about the learner's choices. The matched lead is shortened, e.g. "You waited a week for the $110 both times." / "You took the $100 both times."
  - The present-bias sentence: "Waiting, then taking the $100 today, fits only a model that weights today extra: present bias." The mismatched branches keep their sentences ("No steady discount rate fits both of your choices." and the naming that follows).
  - The opening sentence replaces "Steady discounting judges the pair only by its gap, one week for $10 more, and the gap never changed as the pair moved to today.", and "Where it stops" is unchanged.
  - The slider stops get labels ("52", "13", "today"), and the strip reads "Steady model, every date: <wait | take $100>" if the stage's other text stays at 25 or less.
  - The script measures every branch with the 11-word longer verdict (`Not quite: it was "Wait a week again for the $110".`). It asserts that every branch contains "Whatever the rate" and "waits today", and that the hook contains no "you would" or "would you". The predict and recall are unchanged. If a branch is over 90, the script drops the strip words first, then shortens leads. It never drops "Where it stops" or the opening sentence.
done when: all three scripts print "all checks pass". Each new string in the script output matches this batch character for character (diff), except where the script's own count forces a stop. The brief carries the r6 entries. `npm run check` passes. One commit, with GIT_AUTHOR_NAME=cm-behavioral and by explicit path.
checked by: lane 10 (fact-checker: script strings against the rendered pages, during the re-checks of B2 and B3)
stop if: any branch measures over 90, or stage other text is over 25 or the total over 50 (write the count in the brief and change no string); the derivation no longer supports an answer as worded; any script is modified in the working tree before the run starts.

## B2 · saved-or-die-same-600 v3: copy brief 4 "Decisions (r6)" from the script · board W-1431
role: demo-builder
order: after B1. Parallel with B3. **Waits on the top-up.**
kind: build
worktree: yes (a `.claude/worktrees/` path, so that `tools/claim.mjs` resolves the main checkout's locks; do not run claim.mjs from `/home/user/s3c-*`)
model: agent default
project: [project:behavioral-econ]
budget: 1 run, ~170k tokens
inputs: `company/domains/briefs/behavioral.md` brief 4 (all of it, with "Decisions (r6)"); `node company/domains/briefs/checks/behavioral-gain-loss-framing.mjs` output; `src/demos/behavioral/saved-or-die-same-600/`
outputs: `Demo.tsx` and `meta.json` (title, hook, predict, options, toggle label, key swatches, four reveal branches, recall, objective, c2 text, version 3; every claim whose quoted text changes goes back to `unverified`, and none is self-verified); a "Revision build (r6)" section in `company/reviews/saved-or-die-same-600/build.md` with the measured counts
done when: every learner string equals the script output (diff); `tools/reveal-fit.mjs` measures each branch at 90 or less with the longer verdict on screen (the A+D branch measured with a wrong prediction); stage counts match the script; `npm run verify` passes in the worktree; one commit on its branch
checked by: lane 10 (fact-checker c1-c4 and c9; learner-evaluator r3, which should also say whether it still reads as a quiz about wording; qa-tester, including 360 px wide and landscape)
stop if: a rendered count differs from the script and goes over budget; a string cannot be placed without a layout change (no layout change in this build: one wording at a time is lane 6's question); `meta.json` has uncommitted edits by another role at the start (W-1437)
also (W-1445, styles only): at 360x640 every control label is inside its button (no scrollWidth > clientWidth) and the last control is visible without scrolling the stage; record landscape 844x390 stage height before and after. If landscape needs more than styles in this lesson (a kit stage-height rule), stop on that point only, write it in build.md, and it goes to lane 7

## B3 · sure-million-or-long-shot v2: copy brief 1 "Decision (r6)" from the script · board W-1432
role: demo-builder
order: after B1. Parallel with B2. **Waits on the top-up.**
kind: build
worktree: yes (as B2)
model: agent default
project: [project:behavioral-econ]
budget: 1 run, ~110k tokens
inputs: `company/domains/briefs/behavioral.md` brief 1 (with "Decision (r6)"); `node company/domains/briefs/checks/behavioral-allais-certainty-effect.mjs` output; `src/demos/behavioral/sure-million-or-long-shot/`
outputs: `Demo.tsx` and `meta.json` (the four reveal branches; version 2; every claim whose quoted text changes goes back to `unverified`, at least c1, c3 and c4, and none is self-verified); a "Revision build (r6)" section in `company/reviews/sure-million-or-long-shot/build.md`
done when: the four branches equal the script output (diff); reveal-fit measures 90 or less on every branch with the 10-word verdict; `npm run verify` passes in the worktree; one commit on its branch
checked by: lane 10 (fact-checker on the changed claims; learner-evaluator r2: does the reveal now answer the question that was asked?; qa-tester)
stop if: any measured branch is over 90; `meta.json` has uncommitted edits by another role at the start

## B4 · same-week-a-year-apart v2: copy brief 2 "Decisions (r6)" from the script · board W-1447, W-1445
role: demo-builder
order: after B1. Parallel with B2 and B3 (the cap decides). **Waits on the top-up.**
kind: build
worktree: yes (as B2)
model: agent default
project: [project:behavioral-econ]
budget: 1 run, ~140k tokens
inputs: `company/domains/briefs/behavioral.md` brief 2 (with "Decisions (r6)"); `node company/domains/briefs/checks/behavioral-present-bias-reversal.mjs` output; `src/demos/behavioral/same-week-a-year-apart/`
outputs: `Demo.tsx` and `meta.json` (hook, four fallback branches, stop labels, strip text if kept; version 2; every claim whose quoted text changes goes back to `unverified`, and none is self-verified; `HELD_LINE` stays false); a "Revision build (r6)" section in `company/reviews/same-week-a-year-apart/build.md`
done when: the hook and branches equal the script output (diff); reveal-fit measures 90 or less on every branch with the 11-word verdict; a tap at the middle of the slider shows the "13" label as current (QA can see where it landed); `npm run verify` passes in the worktree; one commit on its branch
checked by: lane 10 (fact-checker on the changed claims; learner-evaluator r2, ideally the same no-econ boundary: does the reveal answer the option-3 chooser?; qa-tester, including the middle tap)
stop if: any measured branch is over 90; stage other text is over 25; `meta.json` has uncommitted edits by another role at the start

## B5 · zero-loses-to-this-crowd: a guess of 50 counts without moving away and back · board W-1445
role: demo-builder
order: after B1 (it does not need B1's output; it is last so the three text builds come first under the builder cap). **Waits on the top-up.**
kind: build
worktree: yes (as B2)
model: agent default
project: [project:behavioral-econ]
budget: 1 run, ~60k tokens
inputs: `company/reviews/zero-loses-to-this-crowd/2026-10-16-qa.md` (R4 note); `src/demos/behavioral/zero-loses-to-this-crowd/Demo.tsx`
outputs: `Demo.tsx` only. Any committed input on the guess slider counts as a guess, the start value 50 included: a tap or click on the thumb, a pointer release on it, or an arrow or Home/End key. There is no other change: no text, no new control, no claim, and the version stays 2. A "Revision build (r6, behaviour)" note goes in `build.md`.
done when: a tap at the thumb's centre (value 50) enables "Show the crowd", by a Playwright run recorded in build.md; the four branches' text and the claims are byte-identical to before (diff of meta.json is empty); `npm run verify` passes in the worktree
checked by: lane 10 (qa-tester: R4 re-run, including the in-place tap)
stop if: the fix needs a kit control change (`src/kit/`), in which case stop and file it for lane 7; the change would alter any learner-visible string

## Asks to other lanes (not items; named so the chief of staff can route them)
- **portfolio-manager:** price the top-up from the table above. Take it to the founder and one PE (token-budget.md §4), and record the outcome in the approval record.
- **Chief of staff:** route the top-up to the founder inbox. Board: W-1430 moves to cm-behavioral (B1); W-1447 → B4; W-1445 → B2, B4 and B5; W-1434 → done (answered by the same-week r1 record); W-1429 and W-1433 → done once B1 lands (declined; record in brief 3); W-1431 → B2, W-1432 → B3, both waiting on the top-up. After B2 and B3 merge, rebuild the shared server before lane 10 runs.
- **Lane 10 (evaluation-steward):** after B2-B5 merge, run the checks named in their `checked by` lines (SO-10-1/2/3, trigger b). The same-week learner r1 evidence link is still unwritten because of the meta.json collision (W-1437). The chief of staff should sequence it before B4 starts, so that B4's stop-if does not fire. W-1434 (same-week learner walk) stands.
- **Lane 6 (learning-designer):** saved-or-die. Should the die wording replace the saved row while it is being chosen (one decision at a time), with the toggle bringing both rows back? That is lane 10's "a quiz about wording" finding. Answer after learner r3 on v3. If it says yes, that is a v4 decision in my next batch. W-1062 (brief 5) stands.
- **Lane 1, other POCs:** cm-books on W-1061, reading the **v3** predict options in B1. cm-economics on W-1060.
