# Build note: saved-or-die-same-600 (stopped before build)

builder: demo-builder (demo-builder-beh4) · 2026-10-16 · brief: `company/domains/briefs/behavioral.md` §4, "Rules every brief below follows" and "Ruling: how the stage word budget counts here" · numbers: `node company/domains/briefs/checks/behavioral-gain-loss-framing.mjs` (unchanged; all checks pass, exit 0) · dispatch: `company/ops/dispatch-requests/2026-10-16-r2-behavioral.md` B3 · claim: `node tools/claim.mjs next behavioral --agent=demo-builder-beh4` handed out this slug; still held

*No lesson code was written, so there is no artifact for evaluators yet.*

## Why I stopped: the briefed stage is over the 25-word budget under the category's own ruling
The ruling says: "A builder whose stage goes over 25 under it says so in build.md and stops. A builder does not trim claim-bearing text." This note is that statement.

Counted with the ruling's points 1 and 3 (words counted, numerals inside text labels not counted), using the brief's stage text word for word:

| Text on the stage (from the brief) | Words counted | If the "in" of "1-in-3" counts |
|---|---|---|
| Caption "An outbreak is expected to kill 600 people. Pick a programme." | 10 | 10 |
| A "200 people will be saved" | 4 | 4 |
| B "a 1-in-3 chance all 600 are saved, a 2-in-3 chance nobody is" | 9 | 11 |
| C "400 people will die" | 3 | 3 |
| D "a 1-in-3 chance nobody dies, a 2-in-3 chance all 600 die" | 8 | 10 |
| Toggle "Say both in the same words" | 6 | 6 |
| Cover over wording 2 "Answer the first wording" (locked frame only) | 4 | 4 |
| **Locked frame** (caption, A, B, cover, toggle) | **33** | 35 |
| **Busiest frame** (both wordings shown, before or after the toggle) | **40** | 44 |

- The four option texts and the toggle alone come to 30. The option texts are the frames, and the frames are what the lesson manipulates, so none of them can be turned into a numeral legend or cut by me. Even with no caption and a one-word toggle, the stage stays over 25.
- With the toggle on, the brief re-labels C and D in saved terms. If the original die wording stays visible beside the restatement, the count goes up, not down.
- Bar legends ("1 in 3", "2 in 3", counts of lives) are not counted under point 2. They are not the problem.

## What would unblock it (not my call)
- **head-of-product** (the ruling is pending its confirmation in any case): does the predict stimulus itself (the frame text the lesson manipulates) count toward the 25? If it is exempt the way an option list is, the briefed stage is 10 + 6 (+4 cover) and fits.
- **learning-designer / cm-behavioral**, if it counts: a re-layout, for example (1) show one wording at a time, with wording 1 shrinking to its chosen bar and a short "you chose" legend once answered, and the toggle bringing the restatement back; or (2) drop the caption to a hook line outside the stage. Option (1) changes the "both rows read the same" picture the reveal points at, so the reveal sentences may need checking against the script.
- Then a builder takes the brief again. Nothing else in the brief blocked me: the check script passes, W-1061 has no cm-books objection on file (`company/domains/behavioral-signoffs.md`, cm-books section has no W-1061 answer), and the outbreak needs no real disease, place or group.

## Notes for whoever builds it next (from reading the QA contract, `tests/qa/contract.spec.ts`)
- The contract counts the stage controls once, at the start of explore, then presses indexes 0 to n-1. If wording 2's C and D are *not rendered* until wording 1 is answered, n is 3 and the toggle is never pressed. Render all five controls from the start (C and D disabled, with the "Answer the first wording" cover over their text and bars), so the order A, B, C, D, toggle reaches all three milestones.
- "The toggle stays on once reached" should be done the way brief 1 does it: free toggling in explore, forced on at the reveal. A toggle that cannot be turned off again would be an enabled control that changes nothing (contract check 3).
- The held line: the brief and the check script name Rachev et al. 2021 (PMC8432807), with Tversky and Kahneman 1981 and Many Labs 1 named in meta.json only "as reported by Rachev et al.". The B3 item's done-when calls it "Tversky & Kahneman 1981, Many Labs 1 pointer". I read these as the same line with the same source.

---

# Build note v1: saved-or-die-same-600 (behavioral:gain-loss-framing), built 2026-10-16

builder: demo-builder (demo-builder-beh4b) · 2026-10-16 · worktree `/home/user/s3c-beh4`, branch `beh-b4` · dispatch: `company/ops/dispatch-requests/2026-10-16-r3-behavioral.md` B1 (W-1273, W-1270) · brief: `company/domains/briefs/behavioral.md` §4 and rules 1-8 · rule: `company/decisions/2026-10-16-stage-word-budget-counting.md` · numbers: `node company/domains/briefs/checks/behavioral-gain-loss-framing.mjs` (unchanged, all checks pass, exit 0) · lease: the main checkout's lock still named demo-builder-beh4; released and re-taken with `node /home/user/system-3-company/tools/claim.mjs release|take saved-or-die-same-600 --agent=demo-builder-beh4b`

The stop note above was right under the reading it had. This section is the build that followed the confirmed rule and brief 4's declared stimulus. Every claim is `unverified`; I verified none.

## What was built
- Single card. Caption and key, then two choice rows: saved wording (the "200 people will be saved" option | the "a 1-in-3 chance all 600 are saved…" option), die wording (the "400 people will die" option | the "a 1-in-3 chance nobody dies…" option), then the toggle "Say both in the same words". The option text is the button label, word for word from the brief. There are no option letters and no wording headings on the stage.
- All five controls are rendered from the first frame, in DOM order A, B, C, D, toggle. C and D stay disabled under the cover "Answer the first wording" (their text and bars are `visibility: hidden`) until a saved-wording option is picked. The toggle is enabled once both rows are answered. Milestones: `saved`, `die`, `same`; `minInteractions` 3.
- Bars: each outcome is one bar of 600 cells (60 columns of 10, filled column by column, filled = alive), drawn at its natural pixel size (90 × 15 px, no viewBox). Legends are numerals only: "200", "400", "600", "1/3", "2/3".
- With the toggle on, C and D swap their text **in place** for A's and B's texts exactly. Their bars and the learner's marks stay as they were.
- `HELD_LINE = false`. c5 (Rachev et al. 2021, PMC8432807; Tversky & Kahneman 1981 and Many Labs 1 only "as reported by") is in meta.json as `unverified` and renders nowhere.
- No randomness. No EV, no 50/50 bet, no loss-aversion ratio, nothing asked to be computed.

### Decisions the brief left open (mine, within my role; reviewers may object)
1. **Choices are fixed when the toggle is first turned on.** After that the toggle switches freely until the reveal, which forces it on and freezes everything. Without this, a learner could see the restatement and then re-answer the die wording in saved words, and the reveal would quote a choice not made in the die wording. The cost: no changing an answer after seeing the same words. There is no Reset.
2. **The toggle is disabled until both rows are answered.** Otherwise the restatement could be shown before the die wording is answered, and the manipulation would be gone.
3. **The legends follow the wording on screen.** A saved-wording option labels lives (A "200", B "600" on its 1/3 bar). A die-wording option labels deaths (C "400" by the empty part, D "600" on its 2/3 bar). With the toggle on, C and D take the saved legends along with the saved text, so the two rows read the same in numerals too. The bars never change. The brief says legends are numerals only, but not which numeral sits where.
4. **"1-in-3" and "2-in-3" do not break at their hyphens.** Each such token is wrapped in a `white-space: nowrap` span; the text content is unchanged. Without this, "2-" ended one line and "in-3" began the next.
5. **Title and hook are mine** (the brief gives none): "Saved or die: two wordings" / "Pick a programme to fight an outbreak, then pick again when it is said in deaths." Recorded as claim c8.

## Stage word budget
Counted from the rendered lesson. A Playwright script at 390×844 read `innerText` of `[data-testid="stage"]` at each frame and counted tokens with a letter. It took stimulus as the text of the visible option-text spans. Script: `/tmp/claude-0/-home-user/3e472d64-8589-5167-8584-c47a01ab4321/scratchpad/s/count.mjs`, not committed. Screenshots: `artifacts/qa-beh4b/frame-*.png`.

| Frame | Rendered count |
|---|---|
| Locked (predict): caption, key, A, B, cover, toggle | stage 36 words (stimulus 15, other 21) |
| Explore start (same text as locked) | stage 36 words (stimulus 15, other 21) |
| Both wordings shown, toggle off | stage 45 words (stimulus 28, other 17) |
| Toggle on (C, D restated in place) | stage 47 words (stimulus 30, other 17) |
| Open reveal (toggle forced on), all four branches | stage 47 words (stimulus 30, other 17) |

- Busiest frame: **47 (stimulus 30, other 17)**. Other text is at most 21 (≤ 25), and the whole stage at most 47 (≤ 50). This equals the brief's and the script's counts.
- Other text is the caption (10), "= alive" (1), the cover (4, locked frame only) and the toggle (6). "✓", "=", "/" and the legends have no letters and count 0.
- Each rendered stimulus string matches the brief's declared text exactly (printed in the script output for every frame).
- The smallest stage text is 11 px (legends and key). Option text and the toggle are 12 px or more.

## Reveal-fit numbers
- `node tools/reveal-fit.mjs --url http://localhost:4061 saved-or-die-same-600 --shots --out artifacts/qa-beh4b/reveal-fit.json`: **fit**, crop 0 px, no thumb, phoneFit true, pass 1, revealWords 69 (QA path: predict option 1, then B, D, toggle). Tool clean, head aedfe36.
- Measured reveal tokens per branch, kit verdict included (my script, the same token rule as reveal-fit): A+C 64, A+D 75, B+C 77, B+D 74. These are with the verdict that run happened to get; the "Not quite: it was “The sure 400 die”." verdict is 4 tokens longer than "Your prediction held.". The worst case is A+D with a wrong prediction, 72 + 7 = **79** (≤ 90).
- Phone fit for all four branches × both verdicts (`fit.mjs` in the same scratchpad folder): stage top at 174 px, stage overflow 0, reveal bottom at most 769 of 844. In the locked frame the stage does not overflow (the first build clipped the toggle by about 5 px; spacing was tightened, and no type or tap target got smaller).

## Things a reviewer should look at
- Whether the cells read as 600 people at 1.5 px pitch. On a phone the bars read as proportion bars, and the cells are texture. Making the cells bigger would mean taller bars or a re-layout.
- The cover text "Answer the first wording" is centred across the gap between the two covered buttons.
- The pink alive cells on a chosen (pink) button have less contrast than on an unchosen one.
- Decision 1 above (choices fixed at the first toggle).

## Pre-flight v1
1. **Title and hook.** "Saved or die: two wordings" / "Pick a programme to fight an outbreak, then pick again when it is said in deaths." They name the two wordings, pair no options and state no answer: no.
2. **Options.** "The sure 400 die" / "The 1-in-3 chance nobody dies" / "Either: the two wordings are different offers" (the brief's text). All carry numbers except C, the "different offers" option, which is a reading, not an amount. The brief fixes these words.
3. **Locked stage.** It draws the caption, the key, the saved wording's two options with their bars ("200"; "1/3 600", "2/3"), the cover over the die wording, and the disabled toggle. Nothing in the die wording is visible, so nothing matches the right option: no.
4. **Reveal values.** "You chose X, then Y": the learner's two marks (milestones `saved`, `die`), still marked on the stage at the reveal and fixed from the first toggle on. "In the same words, 400 sure to die is 200 sure to be saved…": the restated die row, on screen (milestone `same`, toggle forced on at the reveal). The consistent/inconsistent sentence is computed from the two marks.
5. **QA path.** A, B, C, D, toggle, each pressed once, reaches `saved` (A), `die` (C), then `same`. All three are reached. The toggle is enabled at that point because both rows are answered. The quoted marks and the restated row are visible at the reveal. Contract QA passed on phone and desktop.
6. **Reset.** There is no Reset control. The choices fix when the toggle is first turned on, so the reveal always matches the marks on screen. QA-path reveal text (B+D, after the verdict): "You chose the 1-in-3 chance to save all 600, then the 1-in-3 chance that nobody dies. In the same words, 400 sure to die is 200 sure to be saved, and the two chances are one chance. You answered the same offer the same way twice: a model that judges outcomes fits both of your choices. Where it stops: you saw both wordings back to back."
7. **Phone fit.** reveal-fit: fit, 69 words on its path, crop 0 px. The reveal points at the two rows and the restated die row ("200", "saved", "chance", "600", "nobody" are all reported visible). Screenshots: `artifacts/reveal-fit/saved-or-die-same-600.png`, `artifacts/qa-beh4b/frame-reveal-AD.png`.

## Checks run (2026-10-16)
- `node company/domains/briefs/checks/behavioral-gain-loss-framing.mjs`: all checks pass (exit 0), unchanged.
- `npm run check`: passed. `npm run typecheck`: clean. `next build` (NEXT_DIST_DIR=.next-beh4b): exit 0.
- `QA_BASE_URL=http://localhost:4061 QA_OUT=artifacts/qa-beh4b npx playwright test --workers=2 -g saved-or-die-same-600`: 2 passed (phone, desktop). No page or console errors in my own runs of all four branches either.
- Status set draft → review. No QA record or evidence entry was written. That belongs to the qa-tester's run (lane 10).

---

# Revision build (r4), 2026-10-16: v2

builder: demo-builder (beh1) · worktree `/home/user/s3c-beh1`, branch `beh-r4-b1` · dispatch: `company/ops/dispatch-requests/2026-10-16-r4-behavioral.md` B1 (W-1315, W-1306) · brief: `company/domains/briefs/behavioral.md` §4 "Decisions (r4)" 1-8 and rules 6-8 · numbers: `node company/domains/briefs/checks/behavioral-gain-loss-framing.mjs` (unchanged, "all checks pass", exit 0) · W-1061: no cm-books objection on the board or in `company/domains/behavioral-signoffs.md`, so no stop.

## What changed
- **Predict** (decision 2): the script's question, its three options in the script's order, `answer: 2`.
- **Reveal** (decisions 1, 3): all four branches copied from the script. The mixed branches open "Unless the two were a toss-up for you, ..."; the matched branches read "Same offer, same answer twice: ... that is called a framing effect." "Where it stops" unchanged. `HELD_LINE = false`; c5 renders nowhere.
- **Key** (decision 4): "■ = alive · □ = die", as text. "■" is coloured like the filled cells and "□" like the grey cells (CSS `keyOn` / `keyOff` replace the old drawn swatch). Bar legends unchanged.
- **Recall** (r4): question, options and `answer: 2` from the script. **The recall "why" is mine** (the script does not print one): "Out of 1,000 patients, 900 live and 100 die under both descriptions. A model that judges outcomes can take it both times or refuse it both times, but cannot prefer to take it one way and refuse it the other." It says "prefer" so it stays true for an indifferent chooser (the c2/c3 lesson). It is quoted in c9.
- **Objective** (decision 7) and `"version": 2`.
- **Claims reset to `unverified`** (quoted text changed): c1 (now quotes the key), c2 (strict qualifier and the new predict), c3 (new branch sentences), c4 (adds the matched-branch naming), c9 (new recall). c5 stays `unverified` and renders nowhere. c6, c7, c8 unchanged and still as FC pass 57 left them. I verified none.

## One change outside the letter of "styles only if the key needs it": the tick floats
With the longer verdict (2 lines on a phone) and the 89-word A + D branch, the card body overflowed by 17-18 px at 390×844 and the kit scrolled it, so the caption's first line slid under the hook (screenshot taken before the fix; the stage itself did not overflow, and `reveal-fit` on its own B + D path did not see it). The fix: the chosen-tick now floats right and comes first in the option's DOM, so only the first text line makes room for it. The B and D texts wrap in 3 lines instead of 4, and the stage goes from 321 to 292 px. No text, font size, tap target, bar or control changed; the words are identical. I chose this over tighter padding, which saved only 8 px. If lane 10 reads this as outside the item, the alternative is a cm-behavioral call on the text.

## Stage count per frame (rendered, 390×844; tokens with a letter, stimulus = the visible option-text spans)
| Frame | Stage | Stimulus | Other |
|---|---|---|---|
| Locked (predict): caption, key, A, B, cover, toggle | 37 | 15 | 22 |
| Both wordings shown, toggle off | 46 | 28 | 18 |
| Toggle on (C, D restated in place) | 48 | 30 | 18 |
| Open reveal, every branch (toggle forced on) | 48 | 30 | 18 |

Busiest frame 48 (other 18): other ≤ 25 and total ≤ 50. This equals the script's counts. The key string "■ = alive · □ = die" is found exactly in the stage text on every frame.

## Measured reveal per branch (reveal-fit's token rule: tokens with a letter or digit, the kit verdict included)
| Branch | Prediction on screen | Verdict | Measured | Script | Branch text exact |
|---|---|---|---|---|---|
| A + C | option 1 (wrong) | Not quite: it was "No: same programmes, two wordings". | 82 | 82 | yes |
| A + D | option 1 (wrong) | Not quite ... | **89** | 89 | yes |
| B + C | option 1 (wrong) | Not quite ... | 86 | 86 | yes |
| B + D | option 1 (wrong) | Not quite ... | 87 | 87 | yes |
| A + D | option 3 (right) | Your prediction held. | 83 | - | yes |
| B + C | option 2 (wrong) | Not quite ... | 86 | 86 | yes |

Every branch ≤ 90. After the tick fix: card body scroll 0, stage top 174 px in every branch, reveal bottom at most 781 of 844 (A + D, wrong prediction). No page or console errors.

## Gates run
- `npx playwright test --workers=2 -g saved-or-die-same-600` against a production build on :4071: 2 passed (phone, desktop).
- `node tools/reveal-fit.mjs --url http://localhost:4071 saved-or-die-same-600 --strict`: fit 1, crop 0, phoneFit 1, pass 1.
- `npx tsc --noEmit`, `npm run check`: pass.
- Measuring scripts (not committed): `/tmp/claude-0/-home-user/3e472d64-8589-5167-8584-c47a01ab4321/scratchpad/b1/m.mjs` and `clip.mjs`.

## Believed, not checked
- The recall card's on-screen rendering: I compared meta.json's recall with the script source, not a rendered recall card.
- Landscape and a smaller phone (360 px wide) were not measured after the tick change.
