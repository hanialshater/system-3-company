*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, wave E r6): boyer-moore-skips-ahead
lesson version: v1
boundary: knows KMP never moves back in the text (kmp-never-steps-back); does not know that comparing from the pattern's end lets a search skip text (from meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/boyer-moore-skips-ahead/sheet.png, integrated build 3 at :3470)
Verdict: revise

## 1. From the artifact

- Predict: the hook "Must a search look at every letter of the text?" is a good tension. A KMP learner will believe "yes". The question is one long procedural sentence: "slide by the distance to the last copy of the text letter under the pattern's end in the pattern (or its full length)". I had to read it twice, and I could not run it in my head, so I guessed 27 or 24 from belief. That is fine for a prediction. The locked stage shows two lanes, the shift table (E6 X5 A4 M3 P2 L1 other 7) and zero counters. It doesn't leak.
- Explore, step 1 ("Compare"): the plain lane fails on H and moves by 1. The Horspool lane checks the pattern's last letter against S, shows a red ✗, puts a dashed ghost at the old place, and gives the caption "S is not in EXAMPLE: slide 7". The table cell "other 7" lights up. This is the moment the lesson is for, and it is on stage. The stage's layout also jumps: the stage grows tall, with a large blank area above the caption.
- Explore, step 2 ("Compare to the match"): everything else happens in one jump: 27 comparisons / 18 placements against 15 / 5 / never read 11. Dots under the text show which letters were read, and the gaps are visible. But I never see the other three Horspool slides, in particular the one after a partial match (ESIMPL… with E under the pattern's end: slide 6). That is the case the question's wording ("the text letter under the pattern's end", not the mismatched letter) is about, and as a KMP learner it is the one I'd get wrong.
- Reveal: "the first check met S ... the pattern jumped 7" points at what I saw. 15 / 5 / 11 / 27 / 18 match the readouts. "Each skip is justified by a letter it did read" is shown once (S), and "every placement covering it" is not drawn. Only the old and new placements appear, not the six placements ruled out between them.

## 2. Earlier findings

No earlier learner review. Boundary taken from meta.json.

## 3. Findings

1. **Revise:** the gate can be passed without the key moment. Both milestones ("first-skip", "both-matched") are reached by tapping only "Compare to the match", because skipped is computed over the completed run. A learner who taps that button first never sees "S is not in EXAMPLE: slide 7", yet the reveal opens with that sentence (the W-150 pattern). The first-skip milestone should come only from a step the learner watched. The builder chooses how.
2. Moderate: the partial-match slide (match E, L, P, M, then miss on I; slide by the E under the end = 6) is never captioned. The question's rule is stated in words and seen working only for the not-in-pattern case. One option: a third control that steps one placement at a time, with the same caption.
3. Minor: "rules out every placement covering it" (objective) is shown as a jump plus a ghost. Briefly shading the 6 skipped start positions would show the cause, not just the result.
4. Minor: two lanes means watching two places at once. Here the comparison is the point and the counters carry it, so I'd keep it, but the plain lane's per-step motion competes for the eye on step 1.
5. Minor: in step 1 the stage height jumps, leaving a big blank top area (layout shift).
6. Minor: the question is about 45 words of procedure. The table on stage already carries the rule, so the stem could be shorter.
7. Not mine: DRAFT, 0/8 claims checked (fact-checker).
- No FATAL.
