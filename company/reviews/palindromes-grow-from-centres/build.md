# Build note: palindromes-grow-from-centres

No earlier build note was on disk; this file starts at v2. Kept from evaluators until they report.

## Pre-flight v2

builder: demo-builder (wave E revisions, batch 4) · 2026-10-14 · answers r6 learner review `2026-10-14-learner-knows-two-pointers-r6.md`

Changes: the payoff is on stage. Each centre button now grows that centre in two aligned words, "aaaa" (the question) and "abaa" (one letter changed). In "abaa" three centres stop at a red dashed bracket ("letters differ"), and a readout "abaa tested 9 / 10" counts the substrings the fingers looked at. The centre buttons keep their labels (• or |); the per-centre counts (+1, +2) are drawn under each word instead. The racecar and Manacher sentences are dropped (claims c5, c6 removed); the 2n − 1 line now points at the button row (4 letters, 3 gaps, 7 centres).

1. **Title and hook.** "Palindromes grow from the middle" / "Count the palindromes hiding in "aaaa". Do you have to test every piece?" No count is named. No.
2. **Options.** "4" / "7" / "10". All bare numbers. Yes.
3. **Locked stage.** The two words as letter tiles, no brackets, no counts; seven centre buttons • | • | • | •; readouts "Centres grown 0 / 7", "aaaa found 0", "abaa found 0", "abaa tested 0 / 10". The "/ 10" is the substring total of either word, which is also the right answer for "aaaa". This is a weak pointer to "10"; I kept it because the "tested N of M" count is what the review asked for, and "10" as "every substring" is also the misconception's own number. Flagging it for the reviewer rather than calling it clean.
4. **Reveal values.** "all 7 centres", "1 + 1 + 2 + 2 + 2 + 1 + 1 = 10": (b) milestone all-centres; the sum is computed from the tapped centres, and the +n row stays under "aaaa". "All 10 of its substrings": derived from the word length, told context in claim c2. "found 6", "3 stopped", "looked at 9 of its 10": (a) computed from the tapped centres in "abaa", which equal all 7 once all-centres fires; the readouts show 6 and 9 / 10 and the red +0 / +1 counts. "its middle, "ba"": (b) the middle centre is one of the 7 required taps. "4 letters and 3 gaps give 7 centres": the button row.
5. **QA path.** The seven centre buttons are the only controls, in DOM order; pressing each once reaches first-centre and all-centres (2 of 2). When the reveal opens, the last centre's brackets, both +n rows and all four readouts are on the stage.
6. **Reset.** There is no Reset; taps only add centres. Expected reveal after the QA path: "You grew all 7 centres of "aaaa": 1 + 1 + 2 + 2 + 2 + 1 + 1 = 10. All 10 of its substrings are palindromes, and each was found once, from its own middle. / Change one letter and the mirrors break. In "abaa" the same 7 centres found 6, and 3 stopped at a red mismatch. The fingers looked at 9 of its 10 substrings: "abaa" itself was never tested, because its middle, "ba", had already failed. / 4 letters and 3 gaps give 7 centres: 2n − 1." (Read from the code; this batch does not run QA.)

## Pre-flight v3

builder: demo-builder (wave G revisions, batch 2) · 2026-10-14 · answers r7 learner review `2026-10-14-learner-knows-two-pointers-r7.md`

Changes: before the commit the readouts show bare counts ("Centres grown 0", "abaa tested 0"); the denominators "/ 7" and "/ 10" (two of the three options) appear only after the commit. Once all 7 centres are grown the tested readout reads "9 / 10, not "abaa"", so the untested substring is on stage, and the reveal quotes that readout. c7 text extended, unverified. Not changed: the +n rows' placement (minor).

1. **Title and hook.** "Palindromes grow from the middle" / "Count the palindromes hiding in "aaaa". Do you have to test every piece?" No count named, no option ruled out. No.
2. **Options.** "4" / "7" / "10". All bare numbers. Yes.
3. **Locked stage.** The two words as tiles, no brackets or counts, seven centre buttons • | • | • | •, readouts "Centres grown 0", "aaaa found 0", "abaa found 0", "abaa tested 0". No 7 and no 10 drawn as text. (The seven buttons are the stage itself; they carry no count.)
4. **Reveal values.** "all 7 centres", "1 + 1 + 2 + 2 + 2 + 1 + 1 = 10": milestone all-centres; computed from the taps; the +n row under "aaaa". "All 10 of its substrings": derived, claim c2. "found 6", "3 stopped": computed from taps; "abaa found 6" readout and red counts. "9 / 10, not "abaa"": computed, the same string as the tested readout after all-centres. ""ba"": the middle centre, one of the required taps. "4 letters and 3 gaps give 7 centres": the button row.
5. **QA path.** The seven centre buttons in DOM order, once each: first-centre, all-centres (2 of 2). At reveal the readouts read "7 / 7", 10, 6, "9 / 10, not "abaa"".
6. **Reset.** No Reset; taps only add. Expected reveal: "You grew all 7 centres of "aaaa": 1 + 1 + 2 + 2 + 2 + 1 + 1 = 10. All 10 of its substrings are palindromes, and each was found once, from its own middle. / Change one letter and the mirrors break. In "abaa" the same 7 centres found 6, and 3 stopped at a red mismatch. Your tested readout reads 9 / 10, not "abaa": the whole word was never tested, because its middle, "ba", had already failed. / 4 letters and 3 gaps give 7 centres: 2n − 1." (Read from the code; this batch does not run QA.)

## Pre-flight v4 (build 6 phone fit, W-287 10px label floor, 2026-10-14)

Build 6 measured, at 390×844 with the reveal open: stage-top crop 31 px (the tap note above the words was cut), reveal 89 words. Since W-287 the kit's picture shrink stops at the +n labels' 10 px floor (fitted 151/194), so the picture itself had to get shorter.

Changes: each word block is 86 viewBox units tall (was 104; viewBox 350×176, was 350×212). At most two brackets are ever drawn under a word (checked for every centre of "aaaa" and "abaa"), so the +n row moves up from top+100 to top+84 under them. Stage gaps 6 → 4 px. Text sizes, readouts, buttons and the reveal are unchanged. No claim text or described behaviour changed; nothing reopened. Status stays draft.

1–6. Unchanged from Pre-flight v3.
7. **Phone fit** (measured, `node tools/reveal-fit.mjs --url http://localhost:3530 palindromes-grow-from-centres`, dev server, 390×844): **stage-top crop 0 px** (build 6: 31 px), hidden below 0 px, reveal 89 words / 12 lines, stage 323 px (picture 126 of 161 natural, readouts 92, buttons 36, note 37) fully visible in a 618 px window. Named "10" and the tested readout "9 / 10, not "abaa"" visible; the tap note, both words and both +n rows are on screen. phoneFit true. Screenshot: artifacts/reveal-fit/palindromes-grow-from-centres.png.
