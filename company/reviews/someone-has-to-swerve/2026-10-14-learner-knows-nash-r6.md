*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r6, first learner review): someone-has-to-swerve
lesson version: v1
boundary: knows Nash equilibrium as "no one wants to switch"; does not know that in chicken the stable outcomes are the two where players act differently (from meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/someone-has-to-swerve/sheet.png)
Verdict: launch

## 1. From the artifact
- Hook: "Surely the stable outcome has them do the same thing?" The "Surely" is a rhetorical tell that the answer is no, and the title "Same choice?" leans the same way. A wary learner picks "One of each" from the phrasing. Mild leak, not a blocker: the misconception still pulls, and the walkthrough learner chose Both swerve.
- Predict: "Which outcomes are stable?" is asked before "stable" is defined. The explore panel then defines it ("An arrow means someone would rather switch"). At predict, a beginner has to guess what "stable" means (safe? best for both?). "Both swerve" is the kindest-looking cell, which is the misconception the lesson wants. The stem's "swerve vs straight gives 0 and 3" is ambiguous about who gets 0 until you read the table.
- Locked stage: the 2×2 table with both players' payoffs. No arrows and no stability marks, so nothing leaks.
- Explore: tapping "Both swerve" draws two red arrows out of the cell ("you +2", "them +2") and "Not stable". The one-of-each cells get a bold border, no arrows, and "Stable: neither wants to switch". "Both straight" draws arrows out ("+10" each). The arrows are exactly the stand-in for "someone would rather switch". I could find the answer on stage by tapping.
- Layout: the arrow labels crowd the cell edges, and at "both straight" "them +10" and "you +10" sit on top of each other. On the reveal the table is cropped at the top (the column headers are gone).
- Reveal: it points at the arrows seen ("an arrow pointed out ... raises your 1 to 3") and at the two no-arrow cells. About 100 words. It ends on the idea ("identical players ... they act differently").

## 2. Earlier findings

No earlier learner review exists (only a fact-check). The boundary is taken from meta.json. At this boundary "stable" is already known as "no one wants to switch", so my section-1 point that "stable" is undefined at predict drops to minor.

## 3. Show the why you promised

The objective asks the learner to check each cell for a player who would rather switch, and to explain why only "one of each" is stable. On stage, every non-stable cell grows arrows out labelled with the gain from switching, and the stable cells have none. The learner makes this happen by tapping. The reveal points at the arrows. The cause is shown.

## 4. New findings

- Should fix: arrow labels collide ("them +10" over "you +10" at both straight), and the table is cropped at the top on the reveal.
- Minor: "Surely ..." in the hook tips off the answer. A plainer question ("Will identical drivers make the same choice?") keeps the tension.
- Minor: "swerve vs straight gives 0 and 3" in the stem does not say who gets which; "the swerver gets 0, the other 3" would remove the ambiguity.
- No FATAL.
