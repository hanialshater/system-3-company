*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: saved-or-die-same-600
lesson version: v1
boundary: adult beginner (the lesson's own boundary): knows what a sure thing and a 1-in-3 chance are; may know that losses feel larger than gains; has never been shown that "200 will be saved" and "400 will die" out of 600 are the same outcome.
Screenshots seen: yes (artifacts/walkthroughs/saved-or-die-same-600/sheet.png, recorded 2026-10-16T12:34:40.133Z; also 01-predict.png at full size)
Verdict: revise

Walked on the shared review server http://localhost:3591, built from bc0edc0ebf45440c75754a31a61c63a6f9bd10cb (R3 ancestor test passes for the lesson's last commit 9d75fb3). Transcript read cut at the trust-sheet appendix.

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke: it did not, because the predict question does the work for me.** The question begins "Judged by outcomes, not wording: someone picks the sure 200 saved. In the 'die' wording, which must they pick?" The premise "judged by outcomes, not wording" rules out option 3 ("Either: the two wordings are different offers") before I think. Between the remaining two, "sure" maps to "sure": I pick "The sure 400 die" by matching the word, not by seeing that 400 dead out of 600 is 200 alive. So the boundary item (I do not know the two wordings are the same outcome) is never tested: I can be right without knowing it. The lesson never catches the belief it is about.
2. **What the prediction felt like: a wording quiz, not a decision.** (Answers the SO-10-3 question.) The predict card reads as a translation puzzle about a third person ("someone"), while the hook and the stage say "Pick a programme". The stage itself reads as two decisions (one per wording) that the "Say both in the same words" button collapses into one. That collapse in step 5 is the strongest moment: the die row turns into a second copy of the saved row, with the same bars. But the learner arrives there already told what to expect, so it confirms a hint instead of resolving a question.
3. **Whether the reveal answered the question I actually had: partly.** After step 5 my question is "so why would anyone answer differently?" The reveal says "Your prediction held" and "You answered the same offer the same way twice". It never says that people do switch between the wordings. That is the surprising fact and the reason the lesson exists. Without it, the lesson ends at "these two sentences mean the same thing", which I accepted at the predict card. "Where it stops: you saw both wordings back to back" is cryptic for this boundary. I can't tell what the alternative was (one wording each? different people?).
4. **The reveal and the predict talk about different people.** The predict asked what "someone" must pick. The reveal reports my own taps ("You chose the 1-in-3 chance to save all 600, then the 1-in-3 chance that nobody dies") and says "Your prediction held". A learner who chose correctly at predict but answered inconsistently in the stage would get a confusing mix. Only one path (option 1, risky-then-risky) was recorded, so this is a hypothesis about the other paths.
5. **Small: the bar labels change meaning.** Pink = alive throughout. But the number next to the bar is the alive count in the saved row ("200", pink) and the death count in the die row ("400", grey). I read it correctly from colour on the second look. On the first look, "400" next to a mostly grey bar made me check whether 400 were alive.
6. The stage is legible at phone width. Taps, ticks and the "Show me why" unlock all worked in the recorded path.

Verdict reason: the predict question's own premise ("judged by outcomes, not wording") plus the sure-to-sure word match lets a learner answer correctly without the insight, and the reveal never states that wording changes people's choices, so no gap is opened and none is closed (findings 1 and 3).

## After reading build.md / meta.json

(pending: written below after findings were committed)
