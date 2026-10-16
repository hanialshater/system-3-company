# AMD-011: QA contract round 1: pressed toggles, reverse-order soft locks, feed specs under QA_ONLY (W-1128, W-1242, W-1264)

status: proposed
number: AMD-011, reserved 2026-10-16 by the evaluation steward in README.md
date: 2026-10-16
proposed_by: evaluation-steward (Hilde); part 1 asked for by demo-builder (lh-tests commit fe38c6c) after the a11y ruling W-1111; part 2 from qa-tester's long-cord record (company/reviews/long-cord-knots-itself/2026-10-16-qa.md); part 3 from W-1264 / W-136
prepared_by: evaluation-steward
batch: company/ops/dispatch-requests/2026-10-16-r3-quality.md#B2
surface: `tests/qa/contract.spec.ts` (rule 3; new rule 6), `tests/qa/feed.spec.ts`, `tests/qa/lessons.ts`. Nothing else. No tools/company.mjs change, no gate change.
severable: yes. Part 2 never reads `aria-pressed`, so it does not need part 1. Part 3 touches only the feed specs and a new export in lessons.ts.
companion: `AMD-011-qa-contract-r1/`: `tests-qa.amd011.diff` (the whole protected change, `patch -p1` from the repo root), `checks.ts` (the same checks as plain functions), `fixture.spec.ts` (the fixtures; no server), `probe.spec.ts` + `lessons.ts` + `playwright.config.ts` (the measurement), `run.sh`, `probe-v31.jsonl` (one line per lesson, server 5b2fee7).
tests/qa edited by this draft: no (`git diff --quiet -- tests/qa` holds). Everything was run on copies outside tests/qa.

## Where this draft departs from its brief (read this first)

The batch item named the shape of parts 1 and 2. I measured both shapes on main before writing them in, and both were wrong.
I changed them within my role. The board should know that the text below is not what was asked for.

1. **Part 1 was "rule 3 skips controls with `[aria-pressed="true"]`" (W-1128's wording).** That newly fails
   **word-in-pieces** (ai, published) on phone and desktop. I checked this with the patched contract against the shared server.
   Its three piece buttons are real on/off toggles that start pressed, and switching them off is the milestone the reveal
   waits for. Skip them and rule 4 ("reveal unlocks after interaction") fails. The proposed part 1 still presses a pressed
   control. It only stops calling it dead when it **was pressed and changed nothing**. That can only remove entries from
   the dead list, so it newly fails no lesson (see part 1).
2. **Part 2 was "assert the reveal unlocks within N reverse-order presses".** On today's main that fails **189 of 969**
   lessons: 186 still locked but with working controls, plus 3 dead ends. Counting the 9 that unlock only after an animation
   ends, it is 198. That is far over the item's stop line of 20. (A first sample of 66 lessons showed it early: 13 failed.)
   But the 186 are not soft locks. Every one still has a control that changes the stage, and the reveal waits for a *value*,
   not a press count. For example,
   whose-cutoff-wins wants the cutoff to rest at 40 and then at 50, and best-of-twenty-on-one-test wants a particular run.
   A blind press budget is a goal-seeking test, and the contract has never been one. So under the item's own stop rule,
   "unlocks within N presses" is not proposed. Its count goes on record here and nowhere else: those lessons are not a finding for the
   CMs. The proposed part 2 asserts the thing that actually went wrong in long-cord-knots-itself: **after last-first presses
   the reveal is locked and no control changes anything** (a dead end). That version newly fails **3** lessons on main
   (see part 2), which is under 20.

## Part 1: a pressed toggle that changes nothing is not a dead control (W-1128)

### Claimed benefit
It unblocks W-1114, the accessibility fix ruled in company/reviews/_accessibility/2026-10-15-w1111-pressed-mode-aria.md
(ruling 1). The ruling: a selected mode button must not carry `aria-disabled`, because screen readers announce it as
"pressed, dimmed". Today rule 3 skips a control only if Playwright's `isDisabled()` is true, and `aria-disabled="true"`
counts for that. So the moment the builder drops `aria-disabled`, rule 3 presses the selected mode button. That press is
the deliberate no-op the ruling keeps, and rule 3 reports the button dead. demo-builder's probe (fe38c6c): packing-cube-walls
("Outer volume"), shelf-front-labels ("Labels on back") and wobbly-table-quarter-turn ("Start angle") fail on phone and
desktop. The contract is enforcing the wrong accessibility semantics.

### The change (rule 3, two lines; full hunk in the companion diff)
```ts
const wasPressed = (await c.getAttribute("aria-pressed")) === "true"; // AMD-011 part 1 (W-1128, ruling W-1111)
// ...press it exactly as today...
if (before === after && !wasPressed) dead.push(label || `#${i}`);
```
A control is still pressed, whatever its `aria-pressed`. The only thing that changes is that a control which was
`aria-pressed="true"` before the press and left the stage unchanged is not listed dead. That is the selected option of a
one-of-N row, which APG radio-group semantics allow to do nothing when pressed again.

### What it removes
One case of the "beautiful button that does nothing" check: a pressed toggle that is a no-op. What we lose: a *broken*
toggle that does nothing **only while pressed** goes unseen. Its unpressed partner is still checked, and so is the same
button whenever it is unpressed.

### Newly failing on today's main: **0**, by construction
The press sequence is unchanged and the dead list can only get shorter, so no lesson can newly fail rule 3. Rules 4 and 5
see the same stage as today. Measured anyway: in the part 2 probe over 969 lessons, 1 (two-said-blue, probability) had a
pressed control that changed nothing when pressed and was not aria-disabled. That is the case part 1 exempts, and today it
would be reported dead. Newly passing on main: at most that one, if today's DOM-order rule 3 ever reaches
its pressed control in the pressed state. Every Life Hacks pressed no-op on main still carries `aria-disabled`, because W-1114
is not built.

### Prediction and test
- prediction: with part 1 merged, demo-builder's W-1114 change (pressed mode buttons without `aria-disabled`) passes the
  contract on the three probe lessons and on every Home and Study v2 lesson. No lesson that passes today fails.
- would_be_wrong_if: (a) a lesson passes the contract only because a pressed toggle that should act is broken (the qa-tester's
  exploratory pass, or a learner walk, finds a pressed button that should do something and does not); or (b) W-1114's build
  still fails rule 3 on a pressed no-op. That would mean the control reports the state some other way, and this part does not fit it.
- fixture: `fixture.spec.ts` › "part 1". On a two-button mode row (A pressed, no `aria-disabled`, A is a no-op), today's rule 3
  reports "A · tall box" dead and part 1's does not. Part 1 still presses B and the reveal unlocks. On the word-in-pieces
  shape (three toggles that start pressed), part 1's rule 3 still presses them and the reveal unlocks.
- side_by_side: run the old and new rule 3 on the same build for the W-1114 slate before W-1114 merges. Differences are
  allowed only on controls that are `aria-pressed="true"` no-ops.

### Removal condition
Revisit (narrow it or drop it) when either: (a) no lesson on main renders a control with `aria-pressed="true"` that is a
no-op (one probe run shows 0); or (b) the mode rows move to a real radio group (`role=radio`, `aria-checked`). In case (b) the
exemption must follow the new attribute, or go if the selected radio is no longer a stage control.

## Part 2: reverse order never dead-ends (W-1242)

### Claimed benefit
It catches the class of the long-cord soft lock (W-1241). Today's contract presses the controls in DOM order. A learner who
taps the *second* button first ("Tumble 3 m") gets runs=2 but only reaches the 'long' milestone. Both buttons then render
pressed and `aria-disabled`, and the reveal never unlocks: a reload is the only way out. The contract passed it, and only the
qa-tester's exploration caught it (company/reviews/long-cord-knots-itself/2026-10-16-qa.md). The code is
`src/components/lifehacks/HomeLesson.tsx` CordStage (line ~453 at lhw3 5d9de52). Main's HomeLesson.tsx is byte-identical
(`diff` of `git show 5d9de52:…` and main's file is empty), so the bug is live on main.

### The change (new test, phone only, in the same describe as the contract test)
`test("reverse order never dead-ends")`. Fresh page, commit the last option (as rule 2 does), then:
1. Press the stage controls **last first**, for up to 2 sweeps (each sweep takes the first 16 from the end, the same cap as
   rule 3), skipping what rule 3 skips (missing, hidden, disabled). Stop as soon as the reveal button is enabled: **pass**.
2. Still locked: wait up to 8 s for the reveal to unlock or for some control to become usable. An animation may disable
   every control for a while: atoms-across-a-hair's auto-zoom takes 5 steps × 300 ms.
3. Still locked: press each usable control once. If any press changes the stage fingerprint (rule 3's) or unlocks the
   reveal, there is a way out: **pass**. The lesson asks for a value, not a count, which is the learner's job, not a lock.
4. Otherwise **fail**: "soft lock: after last-first presses the reveal is locked and no control changes anything". A
   screenshot `4-reverse` is saved.
N, the press budget, is 2 × min(controls, 16). The test has its own 90 s timeout (worst case: 32 presses × 450 ms, the 8 s
wait, one more pass).

### What it removes
Nothing is removed. It adds one phone test per lesson. Cost, measured with the probe (settle 250 ms, the contract uses
450 ms): mean 2.2 s per lesson, median 1.9 s, p95 4.7 s, max 11.2 s; 36 worker-minutes for 969 lessons.
At the contract's 450 ms settle, expect roughly 3 s per lesson: about 50 worker-minutes, or 25 minutes of wall clock on 2 workers,
for a full run. Changed-lesson runs scale with the lesson count. That is a cost line for AMD-007, which shares the QA budget. Desktop is skipped because the order of
presses does not depend on the viewport.

### What it does not catch (so nobody believes it does)
A lock where some control still changes the picture but no sequence can ever unlock the reveal. A lock reached only by a
different non-DOM order (forward-then-back, or the middle control first). A lock that needs a reload in the middle. Those stay
with the qa-tester's exploratory checklist (company/qa/computer-use-testing.md).

### Newly failing on today's main: **3**
Measured on the shared review server (:3591, /home/user/s3c-qa) with probe v3.1 (`probe.spec.ts` + `checks.ts`, the same
algorithm as the diff's test), phone, 2 workers, all **969** non-retired lessons on disk, drafts included. Server SHA
**5b2fee7** read at the start (13:04Z) and at the end (13:22Z): unchanged. 969/969 measured, 0 errors (`probe-v31.jsonl`).
Main at 6430c45 differs from 5b2fee7 in `src` only in same-week-a-year-apart and sure-million-or-long-shot (Demo.tsx, a few
lines each; behavioral r3 B3). Both were measured on 5b2fee7, so re-measure them once they are on the server.

| lesson | domain, status | what happens (read in the code after the probe) |
|---|---|---|
| long-cord-knots-itself | lifehacks, review | "Tumble 3 m" first: runs=2 reaches 'long' only; both buttons pressed and aria-disabled; 'short' unreachable (W-1241). |
| kmp-never-steps-back | cs, **published** | "Run to end" first: k reaches the end ('both-done'), then all three buttons are disabled (`over`); 'saw-miss' needs a stop on a miss, which can no longer happen. |
| rolling-hash-window | cs, **published** | "Slide to end" first jumps past the false-flag window; "Check letters" at the end is a true match, so 'false-flag-checked' cannot be reached; all buttons then disabled. |

The other 966: 780 unlock within the reverse sweeps, 9 more after the wait (animations: atoms-across-a-hair, dilute-until-none-left,
ph-log-scale and others), and 186 stay locked but have a working control (they pass; the list is in the jsonl).
An earlier v3 pass with no wait reported 20 dead ends. The wait cleared 17 of them, all auto-play animations. An earlier v3 pass
on bc0edc0 was invalid because the server was rebuilt to 5b2fee7 during it, so it is not used.

### Prediction and test
- prediction: once W-1241 is fixed (engineering r3 B1), long-cord-knots-itself passes part 2. Any new lesson that can soft-lock
  this way fails in CI before a human sees it.
- would_be_wrong_if: (a) part 2 fails a lesson that a learner can finish without reloading, which means a false dead end (most
  likely a slow animation over 8 s); or (b) a qa-tester or learner walk finds a soft lock of the long-cord kind (reveal locked,
  nothing changes) on a lesson that part 2 passed.
- fixture: `fixture.spec.ts` › "part 2", a copy of long-cord's tap order at 5d9de52. A → runs=1, reach('short'). B → runs=2,
  reach('long'). Pressed buttons are no-ops. The reveal needs both milestones. The reverse check **fails** it after 1 press, and
  still fails it after W-1114 (pressed buttons without `aria-disabled`, still no-ops). Today's DOM-order rule 3 **passes** the
  same page: that is the gap. The fixed tap order (B also reaches 'short') passes.
- side_by_side: the probe is the side-by-side. The new test's algorithm on all 969 lessons; each disagreement
  above was opened by hand.

### Removal condition
Remove part 2 if, 30 days after merge, it has failed nothing that the contract test or the qa-tester did not also find, **and**
the engines that can produce this class have an order-independence unit test (for Life Hacks: `tests/lifehacks/*` presses
CordStage/HomeMode last-first). The check then repeats a unit test at browser cost. Keep it while any engine without such a
test renders "pressed means done" action buttons.

## Part 3: the feed specs pick from the feed's own pool, never from QA_ONLY (W-1264)

### Claimed benefit
`feed.spec.ts` uses `lessons()[0]`, and `lessons()` is cut down to QA_ONLY. Under QA_ONLY two specs fail for reasons that have
nothing to do with the feed:
- "subject chips filter the feed": the allowed set becomes the QA_ONLY slugs of that domain, but the feed shows every listed
  lesson of the domain. It fails whenever QA_ONLY is set.
- "a finished lesson comes back as a spaced revisit": if the QA_ONLY lesson is a draft, the feed never lists it, so its revisit
  card never appears (2 min timeout).
Today the company works around this with R5: the feed specs run once per SHA without QA_ONLY. CI's changed-lesson path
(AMD-007) will run with QA_ONLY all the time.

### The change
`lessons.ts` gains `feedLessons()`: every non-retired lesson on disk, **not** filtered by QA_ONLY, sorted by slug, split into
`published` (listed in every deployment) and `listed` (published + review, which `src/lib/visibility.ts` shows unless
SHOW_REVIEW=off). `feed.spec.ts` takes `first` from `published[0]` and the chip's allowed set from `listed`. `lessons()` keeps
its behaviour.
**Why adapt and not skip:** the feed specs test the product around the lessons, and that product is the same whichever lessons a run
QAs. Skipping under QA_ONLY would leave the feed unchecked on exactly the runs CI makes most often. Adapting keeps them meaningful
on every run, at the cost of 5 tests.

### What it removes
R5's "feed specs once per SHA without QA_ONLY" step, and the rule that "a feed-spec failure under QA_ONLY is not a lesson failure".
Both go when part 3 merges. It also removes the feed specs' dependence on whichever lesson happens to sort first on disk.

### Newly failing on today's main: **0**
Measured on :3591 (bc0edc0, before the rebuild; feed code is unchanged in 5b2fee7), phone, with a verbatim copy of today's feed.spec.ts next to the patched one:

| spec | QA_ONLY unset | QA_ONLY=secret-in-the-counts (draft) | QA_ONLY=long-cord-knots-itself (review) |
|---|---|---|---|
| today | 5/5 | 3/5 (chips, revisit fail) | 4/5 (chips fail) |
| part 3 | 5/5 | 5/5 | 5/5 |

The patched tests/qa copy also ran phone + desktop with QA_ONLY: feed 10/10.

### Prediction and test
- prediction: feed specs pass under any QA_ONLY on a healthy build, and fail under QA_ONLY only when the feed is broken.
- would_be_wrong_if: a chip, revisit or provenance bug is missed because `published[0]` is never a lesson of the broken kind.
  Then the pool should rotate (for example, one lesson per domain), and this part should not go back to QA_ONLY.

### Removal condition
Drop `feedLessons()` and go back to one pool if the feed specs move out of `tests/qa` into a product suite with its own fixtures,
or if QA_ONLY is retired.

## Interim rules this replaces (mine, in the r3 batch), and a correction that applies now
- **R4 (reverse-order exploratory step), corrected today (it is my ruling, not a protected path):** step (ii), "on a reload, press
  only the last control, repeatedly; never unlocks = fail", is **withdrawn**. In a sample of 64 lessons on bc0edc0, the last control alone
  never unlocked 50 of them (78%), packing-cube-walls among them, because correct lessons ask for A *and* B. The qa-tester already
  read it that way (company/reviews/lakes-misplaced-east-west/2026-10-16-qa.md: "needs more than the last control … no soft lock").
  From now on R4 is: after committing, press the controls in reverse on-screen order. The record **fails only on a dead end**: the
  reveal is locked, nothing has unlocked after 8 s, and no control changes anything. "Locked but controls still act" is a note
  to the CM, not a fail. R4 ends when part 2 merges.
- **R5** ends when part 3 merges.

## Does it change how the proposer is judged?
No. The contract judges lessons, not the evaluation steward. But R4 and R5, which this replaces, are my own interim rules, and
parts 1 and 2 depart from the brief I wrote (see the top section). So I do not decide this. The constitutional review board
ratifies or rejects each part, and principal-engineer (lane 7) reviews the test code (the companion diff) first.

## Merge mechanics (after ratification only)
- Apply `AMD-011-qa-contract-r1/tests-qa.amd011.diff` with `patch -p1` under `S3_AMENDMENT=AMD-011`, with
  `Amendment: AMD-011` in the commit message (the CI rule). A part that is not ratified: drop its hunks (rule-3 lines = part 1,
  the new test = part 2, feed.spec.ts + `feedLessons` = part 3).
- Merge it **between** SO-10-1 runs. The QA harness commit changes, so with AMD-010 part 1 a run started before the merge is not
  recorded against the new contract.
- After merge: one full contract run. The 3 lessons under part 2 fail there unless they are fixed first: long-cord through
  engineering r3 B1 / W-1241; kmp-never-steps-back and rolling-hash-window through cm-cs. Two of them are published, so
  learners can hit these locks today, whatever the board decides about this amendment.

## Rollback
Revert the merge commit (with `Amendment: AMD-011`). The parts are independent hunks, so one part can be reverted alone.
Nothing outside tests/qa depends on them.

## Objections
None filed yet. The two departures from the brief are written above so that they can be objected to.

## Decision (constitutional review board)
(pending)
