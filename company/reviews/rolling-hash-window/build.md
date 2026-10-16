# Build note: rolling-hash-window

Builder: algo-pair-08 · 2026-10-14 · status draft. Kept from evaluators until they report.

## What was built
Per `company/design/specs/rolling-hash-window.md` and the coordinator's updated brief: text EBCDAFFABCDE, pattern ABCDE (5 letters, sum 15), A=1 ... F=6. The spec body still described CBADAB; the header note and the coordinator message gave the new example, and I laid the stage out afresh (12 tiles, 5-tile window outline, "-5 / +6" chips over the leaving and arriving tiles, equation line, history row of sums, letters-added counter for sliding vs re-adding).

## Node check (numbers on the stage)
Window sums 15 16 20 18 16 18 16 15; flags at windows 1 (EBCDA, false) and 8 (ABCDE, true). Letters added up: sliding 5 + 7x2 = 19, re-adding 8x5 = 40.

## Decisions
- **Flag at the start:** window 1 (EBCDA) is flagged before any slide, so the DOM order is Check letters, Slide, Slide to end. That makes the QA path one press per milestone (`false-flag-checked`, then `second-flag` by Slide to end). The spec's order (Slide first) would have left Check disabled.
- **A flag must be checked before moving on:** Slide and Slide to end are disabled on a flagged, unchecked window. Without this a learner who slid away from window 1 could never reach the false-flag milestone (no back button, and none is wanted). This also matches how Rabin-Karp works.
- Check and Slide to end act at once, with no animation, so they fit QA's 450 ms wait.
- "Letters added up" counts letters added to or subtracted from a sum, not letters compared in a check (claim c3 says so).
- The reveal shows the learner's real state: it names the false flag only if they checked it, and the match as confirmed only if they checked ABCDE.
- The plain-sum hash is the lesson's toy; Karp-Rabin use a polynomial hash. The reveal does not claim otherwise; c5 flags the citation for the fact-checker.

## Not done / for others
All claims `unverified`. Evidence blocks empty. The spec file and SVG still show the old CBADAB layout (interaction designer).


## 2026-10-14 wave D revision (demo-builder), from the r5 learner review

- Version: v3.
- What changed: Text is now FEBCDAFFABCDE so the first action is a slide; the false flag EBCDA is window 2. Options bare (All 5 / Just 2 / About 3). Counter hidden while locked. 'kept: already in the sum' bracket under the shared letters. 'Slide to end' reports 'N slides × 2 letters'. Retitled. Window-width control not added (reviewer's minor 4).
- Claims reopened (status unverified): c1, c2, c3, c5; new c6.
- Not run here (shared machine, OOM risk): build, typecheck, QA, walkthrough. Syntax parse and `npm run check` pass. Needs a local QA pass before evaluators see it.


## 2026-10-16 v4: Slide to next flag (W-1353, demo-builder, batch 2026-10-16-r5b-cs.md#B1)

- Defect: from window 1 (FEBCD), "Slide to end" jumped to window 9 (ABCDE) and skipped window 2 (EBCDA, sum 15), which was flagged and never checked. `false-flag-checked` became unreachable, and after the true match was checked every control was disabled. It also broke the lesson's own rule that a flag must be checked before moving on.
- Fix (cm-cs ruling W-1353): the long slide stops at the next window that is flagged and not yet checked (the last window if none is), and is renamed **Slide to next flag**. From window 1 it stops at window 2 (Slide and the long slide are then blocked until Check letters). From window 2 or 3, after the check, it goes to window 9. `second-flag` is reached only on arrival at window 9. The jump caption still counts the slides taken. A one-slide jump shows the plain equation "20 − 6 + 1 = 15".
- Unchanged: predict, reveal text, claims c1 to c6 (text and status), the explore hint ("… then slide to the end" stays true: from the false flag the long slide goes to the end). meta.json version 3 → 4. No new learner-facing factual sentence.
- Phone screenshot at window 2 after the long slide: all three buttons fit one row ("Slide to next flag" is the longest label); only Check letters is enabled.

### Reverse-order walk (phone), press → state
Measured on the worktree build (/home/user/s3c-cs5b, branch cs-r5b-softlocks, `next build` into .next-cs5b, `next start` on :3547), Playwright Pixel 7 viewport. The walk script follows AMD-011 part 2's orderCheck (fresh page, commit the last predict option, press stage controls last first for up to 2 sweeps, skipping disabled ones, stop when the reveal enables; 450 ms settle; 8 s wait if still locked) and logs each press with the state after it. The script lives outside the repo; nothing from tests/qa or the amendment was copied into the lesson.

- start: svg="Window FEBCD, sum 20" · text: Toy hash: A=1 B=2 … F=6. Window hash = sum. Pattern ABCDE = 15. | Window FEBCD: sum 20 · pattern 15 | Sums: 20 · · · · · · · · | No flag: the sum differs from the pattern's. | Letters used: sliding 5 · adding each window again 5 · controls: [Slide, Check letters(off), Slide to next flag] · reveal locked
- sweep 1 press "Slide to next flag" → svg="Window EBCDA, sum 15, flag" · text: Toy hash: A=1 B=2 … F=6. Window hash = sum. Pattern ABCDE = 15. | 20 − 6 + 1 = 15 | Sums: 20 15 · · · · · · · | Flag: the sum equals 15. Check the letters. | Letters used: sliding 7 · adding each window again 10 · controls: [Slide(off), Check letters, Slide to next flag(off)] · reveal locked
- sweep 1 press "Check letters" → svg="Window EBCDA, sum 15, false flag" · text: Toy hash: A=1 B=2 … F=6. Window hash = sum. Pattern ABCDE = 15. | 20 − 6 + 1 = 15 | Sums: 20 15 · · · · · · · | E ≠ A at letter 1: false flag. | Letters used: sliding 7 · adding each window again 10 · controls: [Slide, Check letters(off), Slide to next flag] · reveal locked
- sweep 1 press "Slide" → svg="Window BCDAF, sum 16" · text: Toy hash: A=1 B=2 … F=6. Window hash = sum. Pattern ABCDE = 15. | 15 − 5 + 6 = 16 | Sums: 20 15 16 · · · · · · | No flag: the sum differs from the pattern's. | Letters used: sliding 9 · adding each window again 15 · controls: [Slide, Check letters(off), Slide to next flag] · reveal locked
- sweep 2 press "Slide to next flag" → svg="Window ABCDE, sum 15, flag" · text: Toy hash: A=1 B=2 … F=6. Window hash = sum. Pattern ABCDE = 15. | 6 slides × 2 letters. Last: 16 − 6 + 5 = 15 | Sums: 20 15 16 20 18 16 18 16 15 | Flag: the sum equals 15. Check the letters. | Letters used: sliding 21 · adding each window again 45 · controls: [Slide(off), Check letters, Slide to next flag(off)] · reveal UNLOCKED
- RESULT reverse rolling-hash-window: reveal unlocked, no reload

### Forward (DOM-order) walk (phone), press → state
- start: svg="Window FEBCD, sum 20" · text: Toy hash: A=1 B=2 … F=6. Window hash = sum. Pattern ABCDE = 15. | Window FEBCD: sum 20 · pattern 15 | Sums: 20 · · · · · · · · | No flag: the sum differs from the pattern's. | Letters used: sliding 5 · adding each window again 5 · controls: [Slide, Check letters(off), Slide to next flag] · reveal locked
- sweep 1 press "Slide" → svg="Window EBCDA, sum 15, flag" · text: Toy hash: A=1 B=2 … F=6. Window hash = sum. Pattern ABCDE = 15. | 20 − 6 + 1 = 15 | Sums: 20 15 · · · · · · · | Flag: the sum equals 15. Check the letters. | Letters used: sliding 7 · adding each window again 10 · controls: [Slide(off), Check letters, Slide to next flag(off)] · reveal locked
- sweep 1 press "Check letters" → svg="Window EBCDA, sum 15, false flag" · text: Toy hash: A=1 B=2 … F=6. Window hash = sum. Pattern ABCDE = 15. | 20 − 6 + 1 = 15 | Sums: 20 15 · · · · · · · | E ≠ A at letter 1: false flag. | Letters used: sliding 7 · adding each window again 10 · controls: [Slide, Check letters(off), Slide to next flag] · reveal locked
- sweep 1 press "Slide to next flag" → svg="Window ABCDE, sum 15, flag" · text: Toy hash: A=1 B=2 … F=6. Window hash = sum. Pattern ABCDE = 15. | 7 slides × 2 letters. Last: 16 − 6 + 5 = 15 | Sums: 20 15 16 20 18 16 18 16 15 | Flag: the sum equals 15. Check the letters. | Letters used: sliding 21 · adding each window again 45 · controls: [Slide(off), Check letters, Slide to next flag(off)] · reveal UNLOCKED
- RESULT forward rolling-hash-window: reveal unlocked

### Other checks
- AMD-011 probe v3.1 run unchanged against :3547: `"unlocked":true,"deadEnd":false,"presses":4` at both 250 ms and 450 ms settle. On main (probe-v31.jsonl) it was `"deadEnd":true`.
- QA contract (tests/qa, QA_ONLY, phone and desktop) passes for this lesson.
- Reveal now always shows the false-flag sentence (c4), because the long slide can no longer skip window 2. Checked in the forward walk's reveal: "EBCDA summed to 15 too, but checking the letters caught it (E is not A)."
