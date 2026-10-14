# Final learner review: same-songs-different-hits

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

date: 2026-10-14 · reviewer: Learner Evaluator (borrowed mind) · FINAL pre-publish
boundary: knows some songs are better liked than others and can read percentages and ranks (1st of 8); has never seen rich-get-richer / preferential attachment
artifacts: walkthrough regenerated at c9e4df0d (phone, option 0 path); sheet.png and single frames seen: yes. Demo.tsx reveal branches read (reveal text is current).
Kit note (not charged to the lesson): on phone the reveal frame crops/scales the stage.

## Part 1: findings from the artifact (before meta.json, earlier reviews, build.md)

**Idea the learner lacks:** when people follow earlier picks, early luck compounds, so the same songs produce different hits in different worlds and the best song can finish near the bottom.

**Answer visible before predicting.** Soft. Hook "How alike are the worlds?" is neutral now. "Worst of the 8 worlds" with 2nd / 4th / 7th makes "7th" the dramatic choice; I picked 2nd, the mild one, and the stage corrected me by +100 listeners (world 3 already 7th). Wording "worst of 8 worlds" is a selection (the minimum of 8 draws) that the learner is not told is not typical.

**Where understanding first broke.** The stage line "Pick weight = appeal x (1 + earlier picks) · appeal 1.0-1.7" is a formula I cannot evaluate. Eight panels of ~6 px bars are not readable on a phone; the rank under each panel carries the lesson, not the bars.

**What the prediction felt like.** A guess at an extreme; the answer arrives in the first tap.

**Told vs shown.** The cause is in the brief (each pick makes the song more likely to be picked again). Stand-ins: the rule line, the On/Off toggle (the same worlds flip to 1st-2nd with copying off), and, only if the learner steps with +100, world 3 sitting at 7th from 100 listeners to 1,000, which is early lock-in. The milestones are the two 1,000 states, so a learner can press "All 1,000" and "Off" and never see when the ranking was decided, and Off jumps straight to the final state. "Early luck compounds" is then a told sentence; the toggle contrast stands in for it but does not show the compounding. The reveal does not point at any one stage item.

**Reveal quotes only reached states?** It quotes "35-48% of the picks" and "at most 18%". Those percentages are not printed on the stage; they live in the bar heights and aria text. A learner cannot check them. The ranks (1st to 7th, 1st to 2nd, 4 of 8 vs 4 of 8) are on the stage and are correct.

**Earlier worry resolved.** The reveal now says outright that the best song won 4 of 8 worlds both ways, and that copying made the result unpredictable (tail and concentration). That removes the misleading read of the picture. "Quality still tilts the odds" is told with no stage support (4 of 8 first versus a 1-in-8 chance is not given to the learner).

**Verdict: launch with notes.** Close to revise on the told-only compounding; I did not find a fatal flaw because the toggle does show the effect of copying and the early path is available.

**Top remaining finding:** the reveal's 35-48% / 18% shares and "early luck compounds" are not readable on the stage, and the gate does not require the +100 step that shows lock-in. Route: demo-builder / learning-designer (decide whether to gate an early checkpoint).

## Part 2: after meta.json, the earlier review and build.md

- Earlier findings: reveal hides that quality still wins half the worlds (fixed); jargon "seeds" (fixed); hook leak (fixed); early lock-in not forced and Off jumps to the end (builder says needs a design choice; unchanged); worst-of-8 selection (unchanged, disclosed in claim c1 only).
- meta objective says the best song can finish near the bottom and that without copying the outcome is close to quality; both are delivered.
