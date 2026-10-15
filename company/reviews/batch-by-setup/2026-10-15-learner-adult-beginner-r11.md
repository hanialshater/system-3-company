*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): batch-by-setup
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Compare setup overhead under an explicit switching cost.)
Screenshots seen: yes (artifacts/walkthroughs/batch-by-setup/sheet.png, recorded 2026-10-15T21:32)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "Group equal tags"; tapped Run queue, Swap first, Try target; opened reveal.

1. **The prediction is definitional.** "Which order needs fewer setup switches? Group equal tags / Alternate tags." Grouping is what "fewer switches" means. I did not have to believe anything.
2. **Where it first broke: two orders both had 1 switch but different "Wait".** Swap first (B1, A1, A2) gave Switches 1, Wait 19m. Try target (A1, A2, B1) gave Switches 1, Wait 17m. Both are grouped. All jobs are 5 minutes. I could not work out why one grouped order beats the other, and the lesson never says what "Wait" adds up. (I guessed later it might be the sum of start times, but that is me doing the builder's arithmetic.)
3. **Noise on the stage.** Every job is "5m/50due" and Late is 0 throughout, so the due marks and the Late counter do nothing. The reveal mentions "0 prerequisite breaches", which never appeared on this stage.
4. **The switch cost is hard to see.** The bars are tiny and the 2-minute gap between A and B is not visibly a gap. The hook says "Count the changes", but the lesson counts them for me.
5. **Reveal versus my question.** It says each tag change costs two minutes and grouping removes switches "in this model". My question (why 19 vs 17 for two grouped orders) is not answered. The caveat about real concentration cost is honest.
6. Where is the life hack? Tags A and B are abstract; one real example (all the emails, then all the calls) would help.

Fixes (for the builder):
- Ask something I could get wrong, e.g. how many minutes alternating costs compared with grouping.
- Show the switch cost as a visible gap; define "Wait" on stage or drop it; remove Late, due marks and "prerequisite" when they do nothing.

Verdict reason: the prediction is true by definition, and two grouped orders show the same switch count with different unexplained Wait totals, which leaves the learner confused about what grouping bought.

## After reading the brief (meta.json)

- Misconception field is 'Alternate tags', the foil label, not a belief. Objective ('compare setup overhead under an explicit switching cost') is half delivered: the switch count is shown, the overhead in minutes is not separated from the Wait total (finding 2).
- Fix route: demo-builder.
