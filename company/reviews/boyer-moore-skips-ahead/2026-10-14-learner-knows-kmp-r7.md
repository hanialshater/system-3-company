*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (wave F r7): boyer-moore-skips-ahead
lesson version: v2
boundary: knows-kmp. Knows KMP never moves back in the text (kmp-never-steps-back); has never seen that comparing the pattern from its end lets a search skip text and read fewer characters than the text has (meta.json learner field, same boundary as r6).
Screenshots seen: yes (artifacts/walkthroughs/boyer-moore-skips-ahead/sheet.png, build 4 at :3480)
Verdict: launch

## Findings (written from the walkthrough, before the brief or the previous review)

Walked the phone transcript and sheet.png (4 frames: predict, step 1, step 2, reveal). Chose option 1 ("27, like the plain method").

1. **Prediction felt real.** As someone who knows KMP, my instinct is "you still have to touch every text letter", so 24 or 27 is a live guess. The three options are all numbered and glossed at the same precision. Mild lean: the hook "Must a search look at every letter of the text?" is a rhetorical question whose obvious intended answer is "no", and option 3's gloss "fewer than the text has" is the only option that answers it. It does not give the number, so I count it as a minor nudge, not a give-away.
2. **The stage shows the cause.** Step 1 is the key frame: the Horspool lane marks a cross under S (the letter under the pattern's end), the old placement stays drawn dashed, the new placement sits 7 to the right, and "other 7" lights up in the slide table. Under the plain lane only H has been read. I could see why one wrong letter justifies a jump of 7, because the dashed ghost and the new box show that no placement in between could have used that S. The dots under the read letters make "never read" visible: at the end the Horspool lane has big gaps with no dots.
3. **The interesting case gets skipped on the fast path.** "Compare to the match" jumps from 1 comparison to the finish. The partial match at placement 9 (4 matches, then a miss on I, slide 6 not 7) is the subtle point the reveal makes, but on this path I never saw it happen; I only see it afterwards as "E 6 (miss on I)" in the log. A learner who taps Compare one step at a time would see it. Not a blocker, because the log stays on the stage and the reveal quotes it word for word.
4. **The reveal quotes what I saw.** 15 comparisons, 5 placements, 11 never read, 27/18 for plain: all are on the stage readouts when the reveal opens. "S 7" and "E 6 (miss on I)" are in the visible log. Reveal ends on the idea ("each skip is justified by a letter it did read"), not on praise.
5. **Text load.** The question is long (about 35 words) and repeats the stage's header sentence. The stage itself stays inside budget. Two lanes means two places to watch, but the plain lane is a quiet baseline and the comparison is the point.

Where understanding first broke: it did not break. The one place that wobbled was the slide by 6 after a partial match: "the slide used the E under the pattern's end" makes sense to me only because I can find the E 6 entry in the table; I did not watch it happen.

## After reading the brief and the r6 review

The brief's gap is "comparing from the end lets you skip text and look at fewer characters than the text has". The stage shows that gap directly: dots under read letters, gaps where nothing was read, the readout "Never read: 11", and the first jump of 7 with its ghost placement. Show the why: met (the S cross plus "other 7" cell plus ghost). No answer before the commit: met, with the minor hook/option-3 echo noted in finding 1. The reveal quotes what you saw: met; every value is on the stage when the reveal opens. In Demo.tsx (the artifact, not build.md) the first-skip milestone now fires only from a watched single Compare press.

| r6 finding | Status |
|---|---|
| 1. Revise: gate passable without the key moment (first-skip computed over the finished run) | fixed (first-skip now reached only by a single watched Compare press, Demo.tsx line 202) |
| 2. Partial-match slide (E 6 after miss on I) never captioned | partly fixed: the slide log now records "E 6 (miss on I)" on the stage and the reveal quotes it; on the fast path it is still not watched happening (my finding 3) |
| 3. The six ruled-out placements are not shaded | not fixed (minor; the ghost and new box carry it) |
| 4. Two lanes compete for the eye | not changed; still acceptable |
| 5. Stage height jumps in step 1, blank top area | not fixed (sheet frame 02 still has the large blank area above the caption) |
| 6. Question stem is long procedure | partly fixed (about 35 words now, from about 45) |
| 7. Claims unchecked | mostly fixed: 7/8 checked; c9 still unverified (fact-checker) |

Why launch: a first-time learner with this boundary can get "you can skip text if a letter you read justifies the skip" from the stage itself, and the blocking r6 finding is fixed. Remaining items are minor. c9 must be verified before publish (fact-checker's gate, not mine).
