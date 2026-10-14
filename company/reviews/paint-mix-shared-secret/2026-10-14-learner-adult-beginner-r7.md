*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (wave F r7): paint-mix-shared-secret
lesson version: v2
boundary: adult-beginner. Knows multiplication and how a clock wraps from the last hour back to the first; has never seen how two people can agree on a secret number while someone hears everything they send (meta.json learner field; there is no r6, and the tag matches the earlier r1 and r2 files).
Screenshots seen: yes (artifacts/walkthroughs/paint-mix-shared-secret/sheet.png, build 4 at :3480)
Verdict: launch

## Findings (written from the walkthrough, before the brief or the previous review)

Walked the phone transcript and sheet.png (7 frames). Chose option 1 ("Same mark, 2"); the prediction held.

1. **The prediction is a guess, not a reasoned bet, but a fair one.** As a beginner I cannot multiply by 8 fifteen times round a 23-clock in my head, so I chose between "same" and "different" on instinct and then picked 2 or 8 at random. Nothing on the locked stage points at 2: the clock shows both hands at 1, and the header names 8 and 19 only. Two of the three options say "same mark", which nudges towards "same", but "Different marks" is a real option for someone who thinks different secrets give different results. Met: no answer before the commit.
2. **The stage shows that they meet, and the Check button shows why.** Bob's hand hops to 8, then finishes at 2; Alice's goes to 19, then 2. The hop dots trace each route. The last control, "Check: start number ×5, 90 times", draws a dashed circle on 2: that is the picture of "both of them really multiplied by 5 ninety times". This is the cause, on stage, and the reveal points at it ("your check (×5, 90 times) also stopped on 2").
3. **The link "8 is 5 six times" drops off the stage.** The locked header says "Alice: 5 six times gives 8. Bob: 5 fifteen times gives 19." After the first tap it is replaced by "Multiply, then wrap past 22 back to 0." So at the moment the hands meet, the stage no longer reminds me that Bob's ×8 is secretly six ×5s. I needed the reveal to put 6 × 15 = 90 together. The Check button gives the 90, but the "6 × 15" is only in the reveal.
4. **The dots are unlabelled.** Green and grey dots pile up round the clock. I guessed green is Bob's hops and grey is Alice's, but nothing says so, and by the end there are about 20 dots on a small clock.
5. **Eve is told, not shown.** "Eve hears 8, 19" sits in the middle of the clock, which is good. But "she could try every secret; real systems use enormous clocks" is a told sentence; nothing on the stage lets me try to be Eve. If Eve's difficulty is part of what the lesson promises, it is not shown.
6. **Reveal quotes what I saw.** 2, 8, 19 and the ×5, 90 check are visible on the stage when the reveal opens. About 75 words. Ends on the name of the idea (Diffie-Hellman), which is a label rather than the idea itself, but the paragraph before carries the idea.
7. **Locked frame:** the clock is cut off at the bottom and no controls are visible; minor.

Where understanding first broke: at the meeting point. I saw both hands on 2 and believed it, but "why" came from the reveal's 6 × 15 sentence more than from the stage, because the stage had dropped the "5 six times gives 8" line.

## After reading the brief and the previous review (r2, 2026-10-14)

The objective asks for "both are 5 multiplied 90 times, while Eve heard only 8 and 19". On stage: the 90 is a control and lands visibly on the dashed 2; "Eve hears 8, 19" is in the clock face. The 6 × 15 step is in the reveal; the stage stands for it through the Check button, so I count "Show the why" as met, narrowly (finding 3). Eve's inability to recover the secret is not in the brief's gap and is one sentence of context (finding 5), which the standard allows if it is claimed. The trust link reads 8/8 claims checked.

| r2 finding | Status |
|---|---|
| Button row clipped in explore frames (Alice: finish, Check below the fold) | not fixed: frames 02 to 04 still show a cut-off button edge under the first row |
| A and B hands overlap at 2 | not fixed, minor; the "15/15 · at 2" and "6/6 · at 2" readouts disambiguate |
| One multiply-then-wrap step never shown as arithmetic | not fixed, minor |

(r1's base-5 and clipped-reveal findings were already fixed at r2 and stay fixed.)

Why launch: a first-time learner sees three routes (Bob, Alice, ×5 ninety times) meet on the same mark while Eve's numbers sit in plain view. That is the idea, and it is on the stage. Cheap improvements, not blockers: keep the "5 six times gives 8 / fifteen times gives 19" line visible while stepping (finding 3), label the hop dots (finding 4), and fit the control rows above the fold.
