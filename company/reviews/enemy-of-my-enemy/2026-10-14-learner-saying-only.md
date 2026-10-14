# Learner review: The enemy of my enemy (boundary: saying-only)

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

Version reviewed: walkthrough recorded 2026-10-14T08:51Z (phone, option 1 = "At most 2", the right answer, so "Your prediction held"), sheet.png seen (all 14 frames), Demo.tsx read for the branches the script does not show.

Boundary used (the lesson's own): knows friend and enemy, and the saying "the enemy of my enemy is my friend". Has never seen "every trio balanced forces at most two camps".

## Findings (artifact only)

1. **Where it first asks for something I lack: the predict text itself.** Before I can answer I must hold three definitions at once (balanced trio, camp, "if every trio is balanced") and then answer "how many camps". The saying gives me one balanced trio shape (two enemies, one friend: "one + and two −"), but the card never connects the two, so the definition arrives as a rule to memorise rather than as my saying. It is a lot to read on a phone before the first tap.
2. **Answer visible before predicting?** Not directly. The stage is all "?" and every pair is "−". But the options are "At most 2 / Up to 3 / Up to 5", and the wording of the camp definition ("friends inside, enemies with everyone outside") reads naturally as two sides, so "At most 2" is the easy pick for someone who knows the saying. The hook "How far does that saying go?" hints at a limit.
3. **The readout "mixed" is undefined.** Frames 03 and 06-10 show CAMPS "mixed" with 3 to 6 trios unbalanced. A learner has never been told what it means (not a camp split). I read it as "some friend and some enemy", which is wrong.
4. **The shaded triangles do not separate.** Ten trios on a pentagon overlap; on the all-enemies and 3-camps frames the pink wash is one blob, so I cannot point at which three trios are unbalanced. The count ("3 of 10") is carried by the number alone, and the reveal's "one person from each camp makes a trio of three enemies" has no matching highlight to look at.
5. **The reveal proves less than it concludes.** Paragraph 2: three camps leave unbalanced trios. Paragraph 3: so, if every trio is balanced, there is one camp or two. That follows only if every balanced setting is a camp split at all, and the lesson never shows or argues it (in my own run the "mixed" states had 3, 4, 5 unbalanced, which is suggestive but not a reason). The question presupposes camps ("how many camps can there be"), then the reveal answers as if the presupposition were free.
6. **Told vs shown.** Shown: 0 unbalanced at ABC | DE and at ABCDE; 3 unbalanced at ABC | D | E; 10 at all enemies. Told: "for any number of people", the theorem name and year. The stage shows only five people, so "any number" is on trust.
7. **My explore did not follow the hint.** I was told "Get Unbalanced to 0, and try 3 camps". My path got to 0 only by flipping all the way to ABC | DE and ABCDE, and then I used the "3 camps" preset. A learner who never builds a 3-camp setting by hand never feels why it fails; they read it off a preset. The preset button is the shortcut, and it is what the reveal quotes.
8. **Reveal quotes only states reached.** "You got 0 unbalanced trios with two camps (ABC | DE) and one camp (ABCDE)" and "Your three camps ... left 3" both match frames 05, 11 and 13. Good.
9. **Pair chips in the middle are close together** (the five inner pairs sit within a short distance of each other near the centre in frames 02-11), so a mis-tap is plausible on a phone. I could not confirm tap size from the images; flagging as a thing to check, not a finding.
10. **No dead control seen.** Both presets disable themselves when they match the current state, which reads as intended.

Confidence: moderate. Finding 5 is the one I would argue for; findings 3 and 4 are concrete.

## Verdict for the current version: **revise** (no fatal flaw found)

Top finding: the reveal concludes "one camp or two" from "three camps never balance", which skips the claim that a balanced network is a camp split at all; the "mixed" state, which carries that gap, is never explained.

## After reading the brief

Read meta.json objective and misconception, and build.md, only after the findings above were written.

- The objective ties "one camp or two" to "three camps always contain a trio of three enemies". The build note says node enumeration found 0 balanced settings that are not camp splits (n = 5), so the claim is true; but that is in a claim in the trust sheet, not in anything a learner sees. Finding 5 stands as a gap in the learner's experience, not as a falsehood.
- The misconception ("several hostile camps") is addressed by the 3 camps preset, which the build note confirms is a preset. Finding 7 stands.
- The build note's "known limits" mention the chip row below the fold at predict and a faint legend tint in light theme; neither is the same as my findings 3 and 4 (undefined "mixed", overlapping tints), so those are new to the builder.
- Finding 9 (inner handles close together): the build note records handle centres at least 49 px apart with 44 px hit targets, so I withdraw it as a concern.

Verdict unchanged: revise.
