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
