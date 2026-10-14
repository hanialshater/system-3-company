*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, wave E r6): palindromes-grow-from-centres
lesson version: v1
boundary: knows two fingers moving apart or together over a list (two-pointers-meet) and what a palindrome is; does not know palindromes can be counted by growing centres, or that n letters have 2n − 1 centres. (From meta.json learner field; there is no earlier learner review.)
Screenshots seen: yes (artifacts/walkthroughs/palindromes-grow-from-centres/sheet.png)
Verdict: revise

## 1. From the artifact
- Predict: clean, and it pulls. "4" (one per letter) is my honest first answer, and the locked stage shows only four a's and a row of 7 centre buttons (a | a | a | a). Having 7 buttons hints at "gaps count", but not at 10.
- Shown well: each tap grows nested green brackets from a letter or a dashed gap, the button turns into "+1"/"+2", and PALINDROMES FOUND climbs 1, 2, 4, 6, 8, 9, 10. "Letter 2: 2 palindromes" with an inner and outer bracket makes "one centre, several palindromes" visible. Gaps as centres land well: the dashed line between two a's is clear. 1 + 1 + 2 + 2 + 2 + 1 + 1 is readable off the button row at the end.
- **Top finding: the mirror never breaks, so the lesson's payoff is told.** Every caption is "…then the word ends". In "aaaa" every substring is a palindrome, so growing centres here *does* test every substring. The stage cannot show the thing the hook asks about ("Do you have to test every piece?"). The answer "you never test a substring whose middle already failed" and the "racecar: 28 substrings, 10 palindromes" contrast are both reveal text only. The brief's misconception is "you must test every substring", so the step that defeats it has to be seen. Cheap fix on the same stage: a second word preset (e.g. "abaa" or "racecar") where at least one centre stops with "letters differ" and a red bracket. A readout "substrings checked: N of M" would make the saving countable.
- Minor: "2n − 1 centres" is told as a formula, but 7 = 4 + 3 is on stage, and the reveal could point at the button row instead.
- Minor: "Manacher's algorithm … linear" is a new idea in the last line. It is fine as claimed context, but cuttable for budget (the reveal is near 120 words).
- Minor: the stage is mostly empty space above the letters on the phone frame.
- No FATAL.

## 2. Earlier findings
None: this is the first learner review.

## 3. Against the brief (read after section 1)
doesNotKnow 1 (count by growing centres) and 2 (2n − 1 centres, counting gaps) are both shown. The objective's "until the mirror breaks" and the misconception ("must test every substring") are not, because "aaaa" never breaks a mirror. Under "Show the why you promised" the stopping condition is the cause the objective names, so this is a revise, not a minor.
