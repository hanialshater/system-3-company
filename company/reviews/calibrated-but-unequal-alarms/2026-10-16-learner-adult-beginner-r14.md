*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: calibrated-but-unequal-alarms
lesson version: v1
boundary: adult beginner from the lesson's own learner field. Knows false alarms and misses, and that a calibrated score means "80% means 80%"; does not know that different base rates force calibrated scores to give unequal error rates, and has no picture of what a "threshold" or "base rate" does to a group of dots.
Screenshots seen: yes (artifacts/walkthroughs/calibrated-but-unequal-alarms/sheet.png, recorded 2026-10-16T11:19:29Z, phone viewport, option 1 chosen)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Brief: SO-10-3 run (batch=SO-10-3, tag [project:wave-j]). Transcript read cut at the trust-sheet appendix (ruling R1); no build notes in the brief.

1. **Where understanding first broke.** At step 2, when I moved the slider "Ringed in B" from 20 to 50. The slider is named as a choice about flagging ("how many of B are ringed"), but moving it also changed how many people in B reoffend: "32 reoffend" became "50 reoffend". From where I sit, flagging more people cannot make more people reoffend, so either the slider is not what its label says, or the model is broken. The reveal then says "At 50 ringed, B's base rate matches A's", which tells me the slider was really a base-rate control (how many in B are truly high risk), labelled as a ringing control. I lost the causal story exactly at the control that is supposed to carry the lesson's second half. A learner who reads the label literally comes away thinking "flag more of B and the errors equalise", which is a policy lesson the lesson does not intend and that is false in its own terms.

2. **What the prediction felt like.** Partly a trap I could not have reasoned out. The question text says only that the score labels people 80% or 20% and is true in both groups. The one fact that decides the answer, that half of A is ringed and only 20 of B, is shown as purple rings on a picture and a slider reading "20 of 100", with no line saying "Group A: 50 ringed". With only the text, "the same" is the logical answer, so being told "Not quite" felt like being caught by a detail I had not been given in words rather than by a wrong idea. The hook ("Who gets wrongly flagged?") helps a little.

3. **Whether the reveal answered the question I actually had.** Half. After step 1 my question was "why is A's false-alarm rate 20% and B's 6% if the score is honest for both?". The reveal's sentence "A has more reoffenders, so more of A is ringed, guilty or not" answers it, and the arithmetic on screen (10 of 50, 4 of 68) checks out as I read it. My second question, "so what would make it fair?", is answered with "Unless base rates match, no imperfect score is calibrated and equal on both errors". "Imperfect score" is new vocabulary at the last line, and since the slider seemed to be something a decision-maker sets, I read this as "make the base rates match", which is not a thing anyone can choose.

Notes:
- Two ring colours carry two meanings (purple = labelled high risk, red = flagged but did not reoffend). Only the red one is explained on screen in the explore frames.
- Only one slider position (50) is visited; nothing shows a middle value where errors are closer but unequal.

Verdict reason: the "Ringed in B" slider changes B's reoffence count while being labelled as a flagging choice; a learner cannot tell whether flagging or the group's base rate is moving, and the reveal's claim depends on that difference.

## After reading meta.json (claims and learner field; build.md not read)

- The misconception names "one threshold". The learner never sees a threshold: the score has two labels (80% and 20%), and nothing on screen moves a cut-off. My finding 1 is consistent with c3: the slider is meant to change B's base rate ("B has 50 ringed, where B's base rate matches A's"), because in this toy the number ringed and the number who reoffend move together (80% of ringed + 20% of the rest). The control's label ("Ringed in B", "change how many of B are ringed") names the mechanism, not the cause. The objective ("error rates match only when the base rates match") is only reachable if the learner reads the slider as a base-rate slider.
- c4 ("no imperfect score is both calibrated and equal on both errors") is the impossibility result; the lesson shows one example, not the general claim. Not my call whether the claim needs softening; flagged for the fact-checker only if they think the stage overreaches.
- c2 arithmetic matches what I checked on screen (4 of 68 = 5.9%, shown 6%).
- I did not read build.md. Verdict unchanged: revise, on the slider label / base-rate confusion.
