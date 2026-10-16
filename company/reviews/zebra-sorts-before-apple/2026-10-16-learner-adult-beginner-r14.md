*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: zebra-sorts-before-apple
lesson version: v2
boundary: adult beginner from the lesson's own learner field. Knows binary numbers and alphabetical order; does not know that each character is stored as a number code or that every capital's code is smaller than every small letter's.
Screenshots seen: yes (artifacts/walkthroughs/zebra-sorts-before-apple/sheet.png, recorded 2026-10-16T11:20:06Z, phone viewport, option 1 chosen)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Brief: SO-10-3 run (batch=SO-10-3, tag [project:wave-j]). Transcript read cut at the trust-sheet appendix (ruling R1); no build notes in the brief.

1. **Where understanding first broke.** At step 5, "Ignore case: on". The words reorder to apple, Banana, Zebra, but the cards still read "a = 97", "B = 66", "Z = 90". Now apple (97) sits before Banana (66) under a stage that just told me "smallest number first". The status line says "a and A count as the same letter", but nothing shows what number apple is compared with (65, I guess). The reveal's "Each small letter is its capital plus 32" is the missing piece, and it arrives after the confusion, as a told fact. Not blocking: the main point was already made at step 4.

2. **What the prediction felt like.** A real trap with a fair setup. The question says "by each letter's stored number", which I know exists from binary but have never seen applied to letters. My dictionary instinct says apple first, and that is what I chose. The options (first, second, last) are clean.

3. **Whether the reveal answered the question I actually had.** Yes. Tapping each word to see Z = 90, a = 97, B = 66 and then pressing "Sort by code" gave me the answer with my own hands; the legend "A 65 … Z 90 · a 97 … z 122" explained it before the reveal did. The reveal's last sentence ("a program can sort with language rules instead") answers my practical follow-up, "so how do real lists get it right?", briefly but well enough for 60 seconds.

Notes (do not block a first-time learner):
- My binary knowledge (the lesson's stated prerequisite) is never used: no code is shown in binary. Not needed, but the link the boundary implies is not made.
- Only first letters are compared; a curious learner may wonder how "Banana" vs "Band" would go. Fine to leave out.

Verdict reason: no finding blocks a first-time learner; the ignore-case cards keeping their original codes is a note.

## After reading meta.json (claims and learner field; build.md not read)

- The objective and the misconception were both hit directly in my walk.
- c4 ("each small letter's code is its capital's code plus 32") is the fact that would explain the ignore-case frame, but it appears only in the reveal; on the stage the ignore-case cards keep their raw codes (finding 1). Placement question for the builder or critic, not a claim problem.
- c5 (language rules, collation) is told only; fine for the length.
- I did not read build.md. Verdict unchanged.
