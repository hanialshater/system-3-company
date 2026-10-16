*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: zero-loses-to-this-crowd
lesson version: v2
boundary: adult beginner: can take two thirds of a number and read a dot plot, has never heard of the p-beauty contest, level-k thinking or "equilibrium"
Screenshots seen: yes (artifacts/walkthroughs/zero-loses-to-this-crowd/sheet.png, recorded 2026-10-16T14:29:42Z)
Verdict: launch

Run: SO-10-3 batch SO-10-3 [project:behavioral-econ]. Walkthrough `npm run walkthrough -- zero-loses-to-this-crowd --url http://localhost:3591`, shared review server, built from 6838dbac0613a3d1f2f5353e83b27d5c0dbf4f2c (BUILT_FROM read at start; R3a check.sh exit 0). Transcript cut at the trust-sheet appendix.

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke:** at "0 is this game's equilibrium guess". I do not know what an equilibrium is, or why it would be 0. The sentence gives it as a fact, so I can go on without it, but the lesson never says why 0 (everyone keeps taking two thirds). So the reveal's "not at 0" lands as "the textbook answer is wrong here" without my knowing what the textbook answer was. The dotted underlines on "one step", "two steps", "Target" and "average" suggest definitions; the walkthrough did not open them, so I cannot say what they say.
2. **What the prediction felt like / is any option still a cue?** Options in one row: "0 | About 35 | About 23".
   - **Position:** "About 23" is last, not in the middle, so there is no middle-position cue on screen.
   - **"Between the other two":** in number order 23 sits between 0 and 35. A learner using "pick the middle number" gets it right. I do not think that is the main path, because the row is not sorted and the screen does not invite that reading. It is a weak cue, not a blocking one.
   - **The stage text before commit:** "40% near 33 (one step), 30% near 22 (two steps)". "About 35" sits by 33 and "About 23" by 22. A learner who matches numbers could read the options as "go with the one-step group or the two-step group". To pick 23 that way you still have to think one step past the crowd, which is the lesson's point, so I count this as the lesson working, not a cue.
   - **The question's framing** ("0 is this game's equilibrium guess. Against this simulated crowd...") strongly suggests that 0 is not the answer. A careful reader drops 0 on wording alone, so the real choice is 35 against 23, and the hook ("two thirds of the average") points to 23 if you take 35 as the average. That is honest arithmetic, and the stage gives you what you need for it.
   Net: no option is a strong cue, and option 0 is a weak lure. A learner who answers correctly has probably done the "two thirds of the crowd's average" step.
3. **Whether the reveal answered the question I had.** Yes. Having picked 0, my question was "why does the equilibrium lose?". The reveal shows both misses on the number line (52 missed by 28.8; 0 missed by 22.9 as a dotted bracket) and the target 23.2 next to the crowd average 34.8. "The winning guess sits near two thirds of the crowd's actual average" is the rule, in one line. One gap: the stage never shows a guess at about 23 winning. I take it on trust from the target marker. Moving the slider to 23 would show it, and nothing asks me to.
4. The slider starts at 50 and has nothing to do with my prediction. The harness moved it to 52 and the reveal talks about "your 52". For a learner who predicted 0, the comparison that counts is the separate "Mark the 0 guess", and that works.
5. Never stuck: "Show me why" unlocked after the three steps.

Verdict reason: no finding blocks a first-time learner; notes: "equilibrium" is unexplained (finding 1), and a guess at ~23 is never shown winning (finding 3).

## After reading build.md / meta.json

(pending: added in a second commit after the findings above are committed)
