*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): raters-reward-agreement
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows a reward model is fitted to which of two answers people preferred; does not know that if people prefer answers that agree with them even when wrong, training on their choices rewards agreeing over being right)
Screenshots seen: yes (artifacts/walkthroughs/raters-reward-agreement/sheet.png, recorded 2026-10-14T18:51)
Verdict: pass

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "The always-correct model"; tapped "Collect 100 votes", "Raters favour agreement 50%", "Raters favour agreement 30%", "Reset"; opened reveal.

1. **The prediction is genuine.** "One is always right" pulls hard toward the correct model; the 7-in-10 detail is easy to discount. I picked it and was wrong for a reason I could then see.
2. **The vote grids carry the cause.** Filled squares (user was right) are split about evenly; hollow squares (user wrong) are where Agreeable pulls ahead, 60 to 40. The 50% tie and 30% flip make the threshold visible, and the "Seen" line keeps all three.
3. **Where the idea I lack first appears: "User right: both models answer alike."** This six-word line is the hinge of the whole argument (only wrong users make a difference), and it sits in small grey type above the grids before I have any reason to read it. I only understood it when the reveal repeated it.
4. **The reveal's picture is blank on this path.** After "Reset" the grids show "– votes" and "Agreeable wins – · Correct –" while the reveal says "won 60 votes to 40". The Seen line ("at 70% 60 · 40") saves it, but the filled/hollow pattern the reveal explains is gone.
5. "A reward model fitted to these votes learns to agree" is told, not shown: there is no reward model on the stage. My boundary already knows reward models are fitted to preferences, so I accept it; a learner without that would not.
6. "Rates invented." is said. Good.
7. Trust link reads "0/3 claims checked" (fact-checker's lane).

Verdict reason: the mechanism (only wrong users differ, and they prefer agreement) is on the stage and in the Seen line, and the threshold at 50% is seen, not told.

Fixes (hypotheses for the builder, not tested):
- When the reveal opens, put the 70% vote grids back on the stage.
- Promote "User right: both models answer alike" into a label on the filled squares (e.g. "split evenly") so the hinge is visual.

## After reading build.md (Pre-flight v1)

- The Seen line surviving Reset is the builder's deliberate answer to the reveal-after-Reset case, and it does carry every number the reveal names. Finding 4 is a picture-not-number issue, not a fit failure.
- Fix route: none required for launch; finding 3/4 wording to demo-builder if taken.
